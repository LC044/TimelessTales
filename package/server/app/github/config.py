#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
@Time        : 2025/10/20 20:21
@Author      : SiYuan
@Email       : siyuan044@gmail.com
@File        : server-config.py
@Description : 
"""

import os

# 配置项集中管理，方便修改
GITHUB_USERNAME = os.getenv('GITHUB_USERNAME', '')  # 你的GitHub用户名
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', '')           # 可选：GitHub Token（提高API限额）
FETCH_INTERVAL_HOURS = 1    # 定时同步间隔（小时）
DATABASE_URL = "sqlite+aiosqlite:///./data/github_data.db"  # SQLite数据库路径
GITHUB_REST_API = "https://api.github.com"
GITHUB_GRAPHQL_API = "https://api.github.com/graphql"