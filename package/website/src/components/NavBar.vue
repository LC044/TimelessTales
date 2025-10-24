<template>
  <header class="header bg-light-bg dark:bg-gray-900 transition-colors duration-300">
    <!-- 左侧：LOGO 或标题 -->
    <div class="logo-wrapper destop-only">
      <img src="/src/assets/logo.png" alt="Logo" class="logo" />
      <h1 class="site-title text-gray-800 dark:text-gray-100">拾光物语</h1>
    </div>
    <nav class="nav-bg bg-light-bg dark:bg-gray-800 shadow-md rounded-full px-4 py-1 flex justify-center items-center space-x-2 fixed left-1/2 transform -translate-x-1/2 transition-colors duration-300">
      <!-- 导航链接 -->
      <RouterLink
        v-for="(item, index) in navLinks"
        :key="index"
        :to="item.href"
        class="relative px-1 py-1 text-gray-700 dark:text-gray-200 hover:text-accent-fresh-mint dark:hover:text-accent-fresh-mint transition-colors"
        active-class="font-medium"
      >
        {{ item.label }}
        <span
          v-if="$route.path === item.href || ($route.path.startsWith(item.href) && item.href !== '/')"
          class="absolute bottom-0 left-0 w-full h-0.5 bg-accent-fresh-mint"
        ></span>
      </RouterLink>
          <!-- 主题切换下拉菜单 -->
    <div class="ml-4 relative" v-click-outside="closeThemeMenu">
        <button 
            class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            @click="toggleThemeMenu"
        >
            <i class="mgc_moon_line  hidden dark:inline"></i>
            <i class="mgc_sun_line dark:hidden"></i>
        </button>
        
        <!-- 下拉菜单 -->
        <div 
            v-if="showThemeMenu"
            class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-20 transition-all duration-200"
        >
            <button 
            class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            @click="setTheme('light')"
            >
            <i class="mgc_sun_line mr-2"></i>浅色模式
            </button>
            <button 
            class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            @click="setTheme('dark')"
            >
            <i class="mgc_moon_line mr-2"></i>深色模式
            </button>
            <button 
            class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            @click="setTheme('auto')"
            >
            <i class="mgc_phone_line mr-2"></i>跟随系统
            </button>
        </div>
    </div>
    </nav>

  </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { onClickOutside } from '@vueuse/core'  // 需安装 @vueuse/core: npm i @vueuse/core

// 导航数据
const navLinks = [
  { label: '首页', href: '/' },
  { label: '文档', href: '/blog' },
  { label: '项目', href: '/project' },
  { label: '工具', href: '/tools' },
  { label: '更多', href: '/more' },
]

// 主题相关状态
const theme = ref(localStorage.getItem('theme') || 'auto')
const showThemeMenu = ref(false)
const route = useRoute()

// 处理点击外部关闭菜单
const themeMenuRef = ref(null)
onClickOutside(themeMenuRef, () => {
  showThemeMenu.value = false
})

// 切换主题菜单显示状态
const toggleThemeMenu = () => {
  showThemeMenu.value = !showThemeMenu.value
}

// 关闭主题菜单
const closeThemeMenu = () => {
  showThemeMenu.value = false
}

// 设置主题
const setTheme = (newTheme) => {
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)
  updateTheme()
  showThemeMenu.value = false
}

// 更新主题到DOM
const updateTheme = () => {
  const isDark = theme.value === 'dark' || 
                (theme.value === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  document.documentElement.classList.toggle('dark', isDark)
}

// 监听主题变化和系统主题变化
watchEffect(() => {
  updateTheme()
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
})

// 初始化主题
updateTheme()
</script>

<style scoped>
.header {
  position: sticky;
  width: 100vw;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 0 1rem;
  height: 60px;
}

.nav-bg {
  height: 40px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
}

.logo {
  height: 32px;
  width: auto;
}

.site-title {
  font: 1.5em sans-serif;
  margin-left: 10px;
  padding-left: 0;
  font-weight: bold;
}

/* 解决导航链接激活状态样式问题 */
:deep(.router-link-active) {
  font-weight: bold;
  color: #9333ea !important;
}

@media (max-width: 767px) {
  .destop-only {
    display: none;
  }
  .nav-bg {
    width: 90vw;
  }
}

/* 深色模式下的额外样式调整 */
.dark .header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>