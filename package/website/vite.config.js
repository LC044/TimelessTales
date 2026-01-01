import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // 这里定义 @ 代表 src 目录
        },
    },
    server: {
        host: '0.0.0.0', // 允许外部访问，设置为 'localhost' 只允许本地访问
        port: 5175, // 设置你想要的端口
        proxy: {
            '/api': {
                // target: 'http://nas.siyaun.ink:8088/',
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api/, 'api'); }
            }
        }
    },
});
