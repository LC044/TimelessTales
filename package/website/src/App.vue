<template>
  <div 
    :class="[isDarkMode ? 'dark' : '']" 
    :style="themeStyle"
    class="min-h-screen font-sans transition-colors duration-300 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
  >
    <!-- 顶部导航 -->
    <NavBar />
    <div class="container-main dark:bg-gray-900  dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <transition name="fade-slide" mode="out-in">
        <RouterView />
      </transition>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue';
import HomePage from './views/HomePage.vue'
import { provideTheme } from '@/composables/useTheme';
// 🚨 关键：确保调用了 provideTheme()
const {
  isDarkMode,
  currentTheme,
  themeStyle,
  themeColors,
  setTheme
} = provideTheme();
// 这行代码将主题状态注入到整个应用树中，供所有子组件使用。
</script>

<style>

.container-main{
  max-width: 100vw;
  width: 100%;
}
/* 进入时动画 */
.fade-slide-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
/* 离开时动画 */
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

