#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
@Time        : 2025/10/17 15:14
@Author      : SiYuan
@Email       : siyuan044@gmail.com
@File        : server-public.py
@Description : 
"""

from fastapi import APIRouter, Depends, HTTPException
from fastapi import FastAPI, HTTPException
import requests
from pydantic import BaseModel
from typing import Optional, Dict, Any
from starlette.responses import JSONResponse
import os

blog_api = os.getenv('BLOG_API', 'http://localhost:8088')
blog_url = os.getenv('BLOG_URL', '')
# print(blog_url)
router = APIRouter()


class TimelineResponse(BaseModel):
    statusCode: int
    data: Optional[Dict[str, Any]] = None


@router.get("/timeline", response_model=TimelineResponse)
async def get_timeline():
    """从a.com/api/public/timeline获取数据并返回给客户端"""
    try:
        # 目标API地址
        target_url = f'{blog_api}/api/public/timeline'
        # 发送请求到目标API
        response = requests.get(target_url, timeout=10)
        # 检查请求是否成功
        response.raise_for_status()
        # 返回获取到的数据
        timeline_data = response.json()
        if timeline_data['data']:
            articles_dic = timeline_data['data']
            for year,articles in articles_dic.items():
                for article in articles:
                    if article.get('pathname'):
                        article['link'] = f'{blog_url.rstrip('/')}/post/{article.get('pathname')}'
                    else:
                        article['link'] = f'{blog_url.rstrip('/')}/post/{article.get('id')}'
        return JSONResponse(content=timeline_data, status_code=response.status_code)
    except requests.exceptions.RequestException as e:
        # 处理请求相关的异常
        raise HTTPException(
            status_code=500,
            detail=f"获取数据失败: {str(e)}"
        )
    except Exception as e:
        # 处理其他异常
        raise HTTPException(
            status_code=500,
            detail=f"服务器错误: {str(e)}"
        )

@router.get("/meta", response_model=TimelineResponse)
async def get_meta():
    try:
        target_url =  f'{blog_api}/api/public/meta'
        response = requests.get(target_url, timeout=10)
        response.raise_for_status()
        return JSONResponse(content=response.json(), status_code=response.status_code)
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"获取数据失败: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"服务器错误: {str(e)}"
        )

@router.get("/viewer", response_model=TimelineResponse)
async def get_viewer():
    try:
        # 目标API地址
        target_url =  f'{blog_api}/api/public/viewer'
        # 发送请求到目标API
        response = requests.get(target_url, timeout=10)
        # 检查请求是否成功
        response.raise_for_status()
        # 返回获取到的数据
        return JSONResponse(content=response.json(), status_code=response.status_code)
    except requests.exceptions.RequestException as e:
        # 处理请求相关的异常
        raise HTTPException(
            status_code=500,
            detail=f"获取数据失败: {str(e)}"
        )
    except Exception as e:
        # 处理其他异常
        raise HTTPException(
            status_code=500,
            detail=f"服务器错误: {str(e)}"
        )


@router.get("/article/{article_id}", response_model=TimelineResponse)
async def get_article(article_id:int):
    try:
        # 目标API地址
        target_url = f'{blog_api}/api/public/article/{article_id}'
        # 发送请求到目标API
        response = requests.get(target_url, timeout=10)
        # 检查请求是否成功
        response.raise_for_status()
        # 返回获取到的数据
        return JSONResponse(content=response.json(), status_code=response.status_code)
    except requests.exceptions.RequestException as e:
        # 处理请求相关的异常
        raise HTTPException(
            status_code=500,
            detail=f"获取数据失败: {str(e)}"
        )
    except Exception as e:
        # 处理其他异常
        raise HTTPException(
            status_code=500,
            detail=f"服务器错误: {str(e)}"
        )
