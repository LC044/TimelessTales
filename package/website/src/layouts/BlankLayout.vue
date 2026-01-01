<!-- src/layouts/BlankLayout.vue -->
<template>
  <div class="min-h-screen font-sans bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200">
    <transition name="fade-slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script setup lang="ts">
// 空白布局无需导航/页脚，仅提供基础容器
import { provideTheme } from '@/composables/useTheme';
// 提供主题状态（确保深色模式在空白布局下也生效）
provideTheme();
</script>

<style scoped>
/* 复用过渡动画 */
.fade-slide-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>