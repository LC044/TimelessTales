#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
@Time        : 2025/10/14 22:02 
@Author      : SiYuan 
@Email       : siyuan044@gmail.com
@File        : TimelessTalesAPI-blog.py 
@Description : 
"""

from fastapi import APIRouter, Depends, HTTPException
from fastapi import FastAPI, HTTPException
import requests
from pydantic import BaseModel
from typing import Optional, Dict, Any
from starlette.responses import JSONResponse
import os
from dotenv import load_dotenv

load_dotenv()
blog_url = os.getenv('BLOG_URL', 'http://localhost:8088')
router = APIRouter()


class TimelineResponse(BaseModel):
    statusCode: int
    data: Optional[Dict[str, Any]] = None


@router.get("/public/timeline", response_model=TimelineResponse)
async def get_timeline():
    """从a.com/api/public/timeline获取数据并返回给客户端"""
    try:
        # 目标API地址
        target_url = f'{blog_url}/api/public/timeline'

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


@router.get("/public/meta", response_model=TimelineResponse)
async def get_timeline():
    try:
        # 目标API地址
        target_url =  f'{blog_url}/api/public/meta'

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

@router.get("/public/viewer", response_model=TimelineResponse)
async def get_timeline():
    try:
        # 目标API地址
        target_url =  f'{blog_url}/api/public/viewer'
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