#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
@Time        : 2025/10/20 20:21
@Author      : SiYuan
@Email       : siyuan044@gmail.com
@File        : server-db.py
@Description : 
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from datetime import datetime

from .config import DATABASE_URL

# 1. 初始化异步引擎和会话
engine = create_async_engine(
    DATABASE_URL,
    echo=False,  # 生产环境设为False，避免打印SQL日志
    connect_args={"check_same_thread": False}  # SQLite必填，避免线程问题
)

# 异步会话工厂
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False
)

# 2. 基础模型类
Base = declarative_base()


# 3. 数据模型定义
class UserInfo(Base):
    """GitHub用户信息表"""
    __tablename__ = "user_info"

    id = Column(Integer, primary_key=True, index=True)
    login = Column(String(50), unique=True, nullable=False)  # GitHub用户名（唯一）
    name = Column(String(100), nullable=True)  # 真实姓名
    avatar_url = Column(String(255), nullable=False)  # 头像URL
    bio = Column(Text, nullable=True)  # 个人简介
    location = Column(String(100), nullable=True)  # 地理位置
    blog = Column(String(255), nullable=True)  # 个人博客
    html_url = Column(String(255), nullable=False)  # GitHub主页URL
    public_repos = Column(Integer, default=0)  # 公开仓库数
    public_gists = Column(Integer, default=0)  # Gists数量
    updated_at = Column(DateTime, default=datetime.now)  # 数据更新时间

    # 关联：一个用户对应多个仓库
    repos = relationship("Repo", back_populates="owner", cascade="all, delete-orphan")


class Repo(Base):
    """GitHub仓库信息表"""
    __tablename__ = "repo"

    id = Column(Integer, primary_key=True, index=True)
    github_repo_id = Column(Integer, unique=True, nullable=False)  # GitHub官方仓库ID（避免重复）
    name = Column(String(100), nullable=False)  # 仓库名
    description = Column(Text, nullable=True)  # 仓库描述
    html_url = Column(String(255), nullable=False)  # 仓库URL
    language = Column(String(50), nullable=True)  # 主要开发语言
    stargazers_count = Column(Integer, default=0)  # 星标数
    forks_count = Column(Integer, default=0)  # Fork数
    updated_at = Column(String(50), nullable=False)  # GitHub更新时间（ISO格式）
    created_at = Column(String(50), nullable=False) # 仓库创建时间
    default_branch = Column(String(50), default="main")  # 默认分支
    commit_count = Column(Integer, default=0)  # 默认分支commit总数
    owner_id = Column(Integer, ForeignKey("user_info.id"), nullable=False)  # 关联用户表

    # 关联：多个仓库属于一个用户
    owner = relationship("UserInfo", back_populates="repos")


class SyncStatus(Base):
    """同步状态表（记录每次同步结果，方便排查问题）"""
    __tablename__ = "sync_status"

    id = Column(Integer, primary_key=True, index=True)
    sync_time = Column(DateTime, default=datetime.now)  # 同步时间
    status = Column(String(20), nullable=False)  # 同步状态：success/failed
    message = Column(Text, nullable=True)  # 成功/失败信息
    total_commits = Column(Integer, nullable=True)  # 本次同步的总commit数
    yearly_commits = Column(Integer, nullable=True)  # 本次同步的近一年commit数


# 4. 数据库依赖（获取异步会话）
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session  # 提供给接口使用
        finally:
            await session.close()  # 用完关闭会话


# 5. 初始化数据库表结构（第一次启动时执行）
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)  # 创建所有表
    print("数据库表结构初始化完成！")
