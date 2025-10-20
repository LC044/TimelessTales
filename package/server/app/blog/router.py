#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
@Time        : 2025/10/17 15:14
@Author      : SiYuan
@Email       : siyuan044@gmail.com
@File        : server-router.py
@Description : 
"""

from fastapi import APIRouter
from .public import router as public_router
# from .admin import admin_router

# blog模块的总路由
blog_router = APIRouter(tags=["Blog"])

# 包含public子路由，前缀为"/public"
blog_router.include_router(public_router, prefix="/public")

# 包含admin子路由，前缀为"/admin"
# blog_router.include_router(admin_router, prefix="/admin")
