# TimelessTales 后端代码

## 使用说明

在当前目录创建`.env`文件并写入下面几个环境变量
``text
BLOG_URL=http://localhost:8088
BLOG_TOKEN=
SIYUAN_TOKEN=
GITHUB_TOKEN=
``

参数说明：
- BLOG_URL: VanBlog地址
- BLOG_TOKEN: VanBlog的API token
- SIYUAN_TOKEN: 思源笔记的token
- GITHUB_TOKEN: GitHub的token

### 安装依赖

```bash
pip install -r requirements.txt
```

### 运行

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```