<template>
    <header class="header">
        
      <nav class="nav-bar">
        <!-- 左侧：LOGO 或标题 -->
        <div class="logo-wrapper">
          <!-- 可以使用一张 Logo 图片，也可以是文字 -->
          <img src="/src/assets/logo.png" alt="Logo" class="logo" />
          <h1 class="site-title">拾光物语</h1>
        </div>
        <div class="nav-item">
            <!-- 中间：常规导航链接（PC端可见 / 移动端隐藏） -->
            <ul class="nav-links desktop-only">
            <li v-for="(link, i) in navLinks" :key="i">
                <a :href="link.href" class="nav-link">{{ link.label }}</a>
            </li>
        </ul>
        </div>
        <!-- 右侧：汉堡按钮（移动端可见） -->
        <div class="hamburger mobile-only" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
  
      <!-- 移动端下拉菜单 / 侧边菜单 (可根据需要修改动画方式) -->
      <transition name="slide-fade">
        <ul class="mobile-menu" v-if="isMenuOpen">
          <li v-for="(link, i) in navLinks" :key="i">
            <a :href="link.href" class="nav-link">{{ link.label }}</a>
          </li>
        </ul>
      </transition>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isMenuOpen = ref(false)
  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
  }
  
  // 示例导航数据，可根据需要替换
  const navLinks = [
    { label: '首页', href: '#' },
    { label: '文档', href: '#' },
    { label: '手记', href: '#' },
    { label: '图库', href: '#' },
    { label: '历史', href: '#' },
    { label: '更多', href: '#' }
  ]
  </script>
  
  <style scoped>
  /* 可以根据需要自定义断点 */
  @media (min-width: 768px) {
    .mobile-only { 
      display: none; 
    }
    .desktop-only { 
      display: flex; 
    }
  }
  
  @media (max-width: 767px) {
    .mobile-only { 
      display: block; 
    }
    .desktop-only { 
      display: none; 
    }
  }
  
  .header {
    position: sticky;
    width: 100vw;
    top: 0;
    z-index: 10;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center; /* 垂直居中对齐 */
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 1rem;
    height: 60px;
  }
  .nav-item{
    position: absolute; /* B元素绝对定位 */
    left: 50%; /* 左侧50% */
    transform: translateX(-50%); /* 向左移动自身宽度的一半 */
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
  }
  
  .logo {
    height: 32px;
    width: auto;
  }
  
  .nav-links {
    display: flex;
    gap: 1rem;
  }
  
  .nav-link {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .nav-link:hover {
    color: #e67e99; /* 柔和的粉色或其他风格色 */
  }
  
  /* 汉堡按钮 */
  .hamburger {
    width: 24px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
  }
  
  .hamburger span {
    display: block;
    height: 2px;
    background-color: #333;
    transition: all 0.3s;
  }
  
  /* 移动端下拉菜单 */
  .mobile-menu {
    position: absolute;
    top: 60px; /* 与导航栏高度相同 */
    right: 0;
    background-color: #fff;
    border: 1px solid #eee;
    width: 150px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .mobile-menu li {
    list-style: none;
  }
  
  .mobile-menu li a {
    display: block;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #f0f0f0;
    text-decoration: none;
    color: #333;
  }
  
  .mobile-menu li a:hover {
    background-color: #f7f7f7;
  }
  
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter-from, .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  .site-title{
    font: 1.5em sans-serif;
    margin-left: 10px;
    padding-left: 0px;
  }
  </style>
  