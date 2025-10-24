# TimelessTales 后端代码

## 使用说明

在`./data`目录创建`.env`文件并写入下面几个环境变量

```text
BLOG_URL=http://localhost:8088
BLOG_API=http://localhost:8088
BLOG_TOKEN=
SIYUAN_TOKEN=
GITHUB_USERNAME=
GITHUB_TOKEN=
```

参数说明：
- BLOG_URL: VanBlog地址，[部署方式](https://vanblog.mereith.com/)（推荐使用域名，外部可见）
- BLOG_API: VanBlog的api地址，（推荐使用内网地址，仅内部使用）
- BLOG_TOKEN: VanBlog的API token，[获取方式](https://vanblog.mereith.com/advanced/token.html)
- SIYUAN_TOKEN: 思源笔记的token
- GITHUB_USERNAME: GitHub的用户名
- GITHUB_TOKEN: GitHub的token（可选，没有token会限制请求频率）

### 安装依赖

Python版本>=3.10(开发版本是3.12)

```bash
pip install -r requirements.txt
```

### 运行

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```