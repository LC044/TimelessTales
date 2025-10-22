<template>
    <header class="header">
        <!-- 左侧：LOGO 或标题 -->
        <div class="logo-wrapper destop-only">
            <!-- 可以使用一张 Logo 图片，也可以是文字 -->
            <img src="/src/assets/logo.png" alt="Logo" class="logo" />
            <h1 class="site-title">拾光物语</h1>
        </div>
        <nav class="nav-bg bg-light-bg shadow-md rounded-full px-4 py-1 flex justify-center space-x-2 fixed left-1/2 transform -translate-x-1/2">
            <RouterLink
            v-for="(item, index) in navLinks"
            :key="index"
            :to="item.href"
            class="relative px-1 py-1 bg-blue text-light-text3 hover:text-accent-fresh-mint"
            active-class="transition ease-in-out text-accent-fresh-mint"
            >
            {{ item.label }}
            <!-- route.href等于item.href 或者 $route.href 包含 item.href -->
            <span
            v-if="$route.href === item.href || ($route.path.startsWith(item.href)&& item.href !== '/')"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-accent-fresh-mint"
            ></span>
            </RouterLink>
        </nav>
    </header>
  </template>
  
<script setup>
  import { ref } from 'vue'
  import RippleButton from '@/components/RippleButton.vue'
  // 示例导航数据，可根据需要替换
  const navLinks = [
    { label: '首页', href: '/' },
    { label: '文档', href: '/blog' },
    { label: '项目', href: '/project' },
    { label: '工具', href: '/tools' },
    { label: '更多', href: '/more' },
  ]
</script>
  
<style scoped>
.header {
    position: sticky;
    width: 100vw;
    top: 0;
    z-index: 10;
    /* background: linear-gradient(to right, #E3B5C6, #D8C6B8); */
    /* background: linear-gradient(to right, #E3B5C6, #D4C2D8); */
    /* box-shadow: 0 2px 10px rgba(0,0,0,0.05); */
    display: flex;
    flex-direction: column;
    justify-content: center; /* 垂直居中 */
    margin: 0 auto;
    padding: 0 1rem;
    height: 60px;
}
.nav-bg{
    /* background: linear-gradient(to right, #D8C6B8, #D4C2D8); */
    /* width: 600px; */
    height: 40px;
}
.logo-wrapper {
    display: flex;
    align-items: center;
    /* padding-top:10px; */
}

.logo {
    height: 32px;
    width: auto;
}
/* 过渡动画 */
.router-link-active {
    font-weight: bold;
    color: #9333ea;
}
.site-title{
    font: 1.5em sans-serif;
    margin-left: 10px;
    padding-left: 0px;
    color: #000; /* 深棕色 */
    font-weight: bold;
}

@media (max-width: 767px) {
    .destop-only{
        display: none;
    }
    .nav-bg{
        /* background: linear-gradient(to right, #D8C6B8, #D4C2D8); */
        width: 767px;
    }
}
</style>
  