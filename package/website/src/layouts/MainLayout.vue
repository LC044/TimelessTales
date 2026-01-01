<!-- src/layouts/MainLayout.vue -->
<template>
  <div 
    :class="[isDarkMode ? 'dark' : '']" 
    :style="themeStyle"
    class="min-h-screen font-sans transition-colors duration-300 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
  >
    <!-- 顶部导航（原 App.vue 中的 NavBar） -->
    <NavBar />
    <div class="container-main dark:bg-gray-900 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <!-- 页面内容挂载点：所有子页面渲染在这里 -->
      <transition name="fade-slide" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入导航栏、页脚组件
import NavBar from '@/layouts/NavBar.vue';
import Footer from '@/layouts/Footer.vue';
// 导入主题逻辑（保持原有的主题功能）
import { provideTheme } from '@/composables/useTheme';

// 提供主题状态（供子组件（如 NavBar）注入使用）
const {
  isDarkMode,
  currentTheme,
  themeStyle,
  themeColors,
  setMode,
  setTheme
} = provideTheme();
</script>

<style scoped>
.container-main {
  max-width: 100vw;
  width: 100%;
}
/* 页面过渡动画（原 App.vue 中的样式） */
.fade-slide-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>