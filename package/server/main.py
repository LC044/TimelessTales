#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
@Time        : 2025/10/14 20:38 
@Author      : SiYuan 
@Email       : sixyuan044@gmail.com
@File        : TimelessTalesAPI-main.py 
@Description : 
"""
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException

from app import blog

app = FastAPI()

# 配置允许跨域的源（生产环境建议指定具体域名，不要用 "*"）
origins = [
    "http://localhost:8080",  # Vue开发环境地址
    "http://localhost:5173",  # Vite开发环境地址
    "https://your-production-domain.com"  # 生产环境前端域名
]

# 添加CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 允许的源
    allow_credentials=True,  # 允许携带Cookie
    allow_methods=["*"],     # 允许所有HTTP方法
    allow_headers=["*"],     # 允许所有请求头
)

# 示例接口
@app.get("/users")
async def get_users():
    return {"data": ["user1", "user2"]}

app.include_router(blog.router, prefix="/api/blog", tags=["Users"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
