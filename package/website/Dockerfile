# 第一阶段：构建前端项目
FROM node:22.14-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY ./package.json ./
# 复制项目文件
COPY . .
RUN corepack enable
RUN npm install -g pnpm --force
# RUN corepack prepare pnpm@10.18.3 --activate
RUN pnpm config set network-timeout 600000 -g
RUN pnpm config set registry https://registry.npmmirror.com -g
RUN pnpm config set fetch-retries 20 -g
RUN pnpm config set fetch-timeout 600000 -g
RUN pnpm config set ignore-scripts false
RUN pnpm install --verbose
# 构建生产版本（会生成dist目录）
RUN pnpm run build



# 第二阶段：用Nginx托管静态文件
FROM nginx:alpine as production-stage

# 从构建阶段复制dist目录到Nginx的静态文件目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 复制自定义Nginx配置（解决路由和API代理问题）
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口（Nginx默认端口）
EXPOSE 80

# # 启动Nginx
CMD ["nginx", "-g", "daemon off;"]