import traceback

from fastapi import FastAPI, Depends, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import asyncio
import aiohttp
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from datetime import datetime, timedelta
import logging
import os
from typing import List, Optional

from sqlalchemy.orm import selectinload

# 导入自定义模块
from .db import init_db, get_db, UserInfo, Repo, SyncStatus, AsyncSessionLocal
from .config import (
    GITHUB_USERNAME, GITHUB_TOKEN, FETCH_INTERVAL_HOURS,
    GITHUB_REST_API, GITHUB_GRAPHQL_API
)

# ------------------------------
# 基础配置
# ------------------------------
router = APIRouter()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("github_sync_db")


# 全局变量：调度器
scheduler: Optional[AsyncIOScheduler] = None


# ------------------------------
# GitHub API请求工具（异步）
# ------------------------------
def get_github_headers() -> dict:
    """获取GitHub API请求头（支持Token）"""
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "timelesstales"
    }
    if GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"
    return headers


async def fetch_rest_api(session: aiohttp.ClientSession, url: str) -> dict:
    """异步请求GitHub REST API"""
    try:
        async with session.get(url, headers=get_github_headers(), timeout=15) as resp:
            if resp.status != 200:
                raise Exception(f"HTTP {resp.status}: {await resp.text()}")

            # ✅ 提取 Link 头
            link_header = resp.headers.get("Link")
            if link_header:
                logger.debug(f"Link Header: {link_header}")

            # 返回数据与分页信息
            data = await resp.json()
            return {
                "data": data,
                "link": link_header
            }

    except Exception as e:
        logger.error(f"REST请求失败（{url}）: {str(e)}")
        logger.error(traceback.format_exc())
        raise


async def fetch_graphql_api(session: aiohttp.ClientSession, query: str) -> dict:
    """异步请求GitHub GraphQL API"""
    try:
        async with session.post(
                GITHUB_GRAPHQL_API,
                json={"query": query},
                headers=get_github_headers(),
                timeout=15
        ) as resp:
            if resp.status != 200:
                raise Exception(f"HTTP {resp.status}: {await resp.text()}")
            data = await resp.json()
            if "errors" in data:
                raise Exception(f"GraphQL错误: {data['errors'][0]['message']}")
            return data
    except Exception as e:
        logger.error(f"GraphQL请求失败: {str(e)}")
        raise


# ------------------------------
# 核心逻辑：同步GitHub数据到数据库
# ------------------------------
async def sync_github_to_db(db: AsyncSession) -> None:
    """从GitHub拉取数据，写入/更新数据库"""
    sync_status = SyncStatus(sync_time=datetime.now(), status="processing")
    try:
        async with aiohttp.ClientSession() as session:
            # 1. 拉取用户信息
            user_raw = await fetch_rest_api(session, f"{GITHUB_REST_API}/users/{GITHUB_USERNAME}")
            if user_raw:
                user_raw = user_raw['data']
            # 2. 拉取仓库列表（过滤fork）
            repos_raw = await fetch_rest_api(
                session,
                f"{GITHUB_REST_API}/users/{GITHUB_USERNAME}/repos?sort=pushed&per_page=100"
            )
            if repos_raw:
                repos_raw = repos_raw['data']
            repos_raw = [repo for repo in repos_raw if not repo.get("fork", False)]

            # 3. 批量拉取仓库commit数（并发提高效率）
            repo_commit_tasks = []
            for repo in repos_raw:
                repo_full_name = repo["full_name"]
                default_branch = repo.get("default_branch", "main")
                task = fetch_rest_api(
                    session,
                    f"{GITHUB_REST_API}/repos/{repo_full_name}/commits?sha={default_branch}&per_page=1&author={GITHUB_USERNAME}"
                )
                repo_commit_tasks.append((repo, task))

            # 处理仓库commit数结果
            repos_processed = []
            total_commits = 0
            for repo, task in repo_commit_tasks:
                try:
                    commit_resp = await task
                    # 从Link头获取总commit数
                    link_header = commit_resp['link']
                    commit_count = 0
                    if 'rel="last"' in link_header:
                        last_page = link_header.split("page=")[-1].split(">")[0]
                        commit_count = int(last_page)
                    elif commit_resp:
                        commit_count = 1
                except Exception:
                    logger.info(traceback.format_exc())
                    commit_count = 0

                total_commits += commit_count
                repos_processed.append({
                    "github_repo_id": repo["id"],
                    "name": repo["name"],
                    "description": repo.get("description"),
                    "html_url": repo["html_url"],
                    "language": repo.get("language"),
                    "stargazers_count": repo["stargazers_count"],
                    "forks_count": repo["forks_count"],
                    "updated_at": repo["updated_at"],
                    "created_at": repo["created_at"],
                    "pushed_at": repo["pushed_at"],
                    "default_branch": repo.get("default_branch", "main"),
                    "commit_count": commit_count
                })

            # 4. 拉取近一年commit数（GraphQL）
            one_year_ago = (datetime.now() - timedelta(days=365)).isoformat() + "Z"
            graphql_query = f"""
            query {{
              user(login: "{GITHUB_USERNAME}") {{
                contributionsCollection(from: "{one_year_ago}") {{
                  contributionCalendar {{
                    weeks {{
                      contributionDays {{
                        contributions {{ type }}
                      }}
                    }}
                  }}
                }}
              }}
            }}
            """
            # graphql_data = await fetch_graphql_api(session, graphql_query)
            # weeks = graphql_data["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]
            # yearly_commits = 0
            # for week in weeks:
            #     for day in week["contributionDays"]:
            #         yearly_commits += sum(1 for c in day["contributions"] if c["type"] == "COMMIT")

            # 5. 写入数据库（先删旧数据，再插入新数据，避免重复）
            # - 删除旧用户信息和关联仓库
            old_user = await db.execute(select(UserInfo).where(UserInfo.login == GITHUB_USERNAME))
            old_user = old_user.scalars().first()
            if old_user:
                await db.delete(old_user)
                await db.flush()  # 刷新会话，确保删除生效

            # - 插入新用户信息
            new_user = UserInfo(
                login=user_raw["login"],
                name=user_raw.get("name"),
                avatar_url=user_raw["avatar_url"],
                bio=user_raw.get("bio"),
                location=user_raw.get("location"),
                blog=user_raw.get("blog"),
                html_url=user_raw["html_url"],
                public_repos=user_raw["public_repos"],
                public_gists=user_raw["public_gists"],
                updated_at=datetime.now()
            )
            db.add(new_user)
            await db.flush()  # 刷新获取用户ID，用于关联仓库

            # - 插入新仓库信息
            for repo in repos_processed:
                new_repo = Repo(
                    github_repo_id=repo["github_repo_id"],
                    name=repo["name"],
                    description=repo["description"],
                    html_url=repo["html_url"],
                    language=repo["language"],
                    stargazers_count=repo["stargazers_count"],
                    forks_count=repo["forks_count"],
                    updated_at=repo["updated_at"],
                    created_at=repo["created_at"],
                    pushed_at=repo["pushed_at"],
                    default_branch=repo["default_branch"],
                    commit_count=repo["commit_count"],
                    owner_id=new_user.id  # 关联用户
                )
                db.add(new_repo)

            # 6. 记录同步成功状态
            sync_status.status = "success"
            sync_status.message = "数据同步完成"
            sync_status.total_commits = total_commits
            # sync_status.yearly_commits = yearly_commits
            # logger.info(f"同步成功：总commit={total_commits} | 近一年commit={yearly_commits}")

    except Exception as e:
        # 记录同步失败状态
        sync_status.status = "failed"
        sync_status.message = str(e)
        logger.error(f"同步失败: {str(e)}")
        logger.error(traceback.format_exc())

    # 提交事务（无论成功失败，都记录同步状态）
    db.add(sync_status)
    await db.commit()


# ------------------------------
# 定时任务初始化（确保只启动一次）
# ------------------------------
async def run_sync_task():
    """定时同步任务的执行函数（获取数据库会话并调用同步逻辑）"""
    async with AsyncSessionLocal() as db:
        await sync_github_to_db(db)


async def init_scheduler():
    """初始化定时调度器"""
    global scheduler
    # 避免调度器重复启动（主进程/非热重载模式）
    if scheduler and scheduler.running:
        logger.warning("调度器已运行，无需重复启动")
        return
    if os.getenv("UVICORN_WORKER_ID") is not None:
        logger.info("跳过调度器启动（当前为uvicorn子进程）")
        return

    # 创建调度器并添加任务
    scheduler = AsyncIOScheduler()
    # 1. 立即执行一次同步
    scheduler.add_job(run_sync_task, "date", run_date=datetime.now(), id="sync_immediate")
    # 2. 按间隔执行同步
    scheduler.add_job(
        run_sync_task,
        "interval",
        hours=FETCH_INTERVAL_HOURS,
        id="sync_interval",
        replace_existing=True
    )
    scheduler.start()
    logger.info(f"定时调度器启动成功，同步间隔：{FETCH_INTERVAL_HOURS}小时")


# ------------------------------
# 服务启动/关闭事件
# ------------------------------
@router.on_event("startup")
async def startup_event():
    """服务启动时执行：初始化数据库 + 启动调度器"""
    await init_db()  # 创建表结构
    await init_scheduler()  # 启动定时任务


@router.on_event("shutdown")
async def shutdown_event():
    """服务关闭时优雅关闭调度器"""
    if scheduler and scheduler.running:
        scheduler.shutdown()
        logger.info("调度器已优雅关闭")


# ------------------------------
# 前端接口（从数据库返回数据）
# ------------------------------
@router.get("/data", summary="获取GitHub数据（从数据库）")
async def get_github_data(db: AsyncSession = Depends(get_db)):
    """返回用户信息、仓库列表、总commit数、近一年commit数"""
    # 1. 查询用户信息（含关联的仓库）
    user_result = await db.execute(
        select(UserInfo).where(UserInfo.login == GITHUB_USERNAME).options(selectinload(UserInfo.repos))
    )
    user = user_result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="数据库中无GitHub用户数据，请等待同步完成")

    # 2. 查询最新同步状态（获取总commit和近一年commit）
    sync_result = await db.execute(
        select(SyncStatus).order_by(SyncStatus.sync_time.desc()).limit(1)
    )
    latest_sync = sync_result.scalars().first()
    if not latest_sync or latest_sync.status != "success":
        raise HTTPException(status_code=503, detail="暂无有效同步数据，请稍后重试")

    # 3. 整理返回格式（与前端原格式兼容）
    return {
        "user_info": {
            "login": user.login,
            "name": user.name,
            "avatar_url": user.avatar_url,
            "bio": user.bio,
            "location": user.location,
            "blog": user.blog,
            "html_url": user.html_url,
            "public_repos": user.public_repos,
            "public_gists": user.public_gists
        },
        "repos": [
            {
                "id": repo.github_repo_id,
                "name": repo.name,
                "description": repo.description,
                "html_url": repo.html_url,
                "language": repo.language,
                "stargazers_count": repo.stargazers_count,
                "forks_count": repo.forks_count,
                "updated_at": repo.updated_at,
                "created_at": repo.created_at,
                "pushed_at": repo.pushed_at,
                "default_branch": repo.default_branch,
                "commit_count": repo.commit_count
            }
            for repo in user.repos
        ],
        "total_commits": latest_sync.total_commits,
        "yearly_commits": latest_sync.yearly_commits,
        "last_sync_time": latest_sync.sync_time.strftime("%Y-%m-%d %H:%M:%S")
    }


@router.get("/sync/status", summary="获取同步状态")
async def get_sync_status(db: AsyncSession = Depends(get_db)):
    """返回最新同步状态、最后同步时间、下次同步时间"""
    # 1. 查询最新同步记录
    latest_sync = await db.execute(
        select(SyncStatus).order_by(SyncStatus.sync_time.desc()).limit(1)
    )
    latest_sync = latest_sync.scalars().first()

    # 2. 获取下次同步时间（从调度器）
    next_sync_time = None
    if scheduler and scheduler.running:
        interval_job = scheduler.get_job("sync_interval")
        if interval_job:
            next_sync_time = interval_job.next_run_time.strftime("%Y-%m-%d %H:%M:%S")

    # 3. 整理返回
    if not latest_sync:
        return {
            "status": "no_data",
            "message": "尚未执行过同步",
            "next_sync_time": next_sync_time
        }
    return {
        "status": latest_sync.status,
        "last_sync_time": latest_sync.sync_time.strftime("%Y-%m-%d %H:%M:%S"),
        "next_sync_time": next_sync_time,
        "message": latest_sync.message,
        "total_commits": latest_sync.total_commits,
        "yearly_commits": latest_sync.yearly_commits
    }


# ------------------------------
# 运行服务
# ------------------------------
if __name__ == "__main__":
    import uvicorn

    # 禁用热重载（或用--workers 1），避免调度器重复启动
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False, workers=1)