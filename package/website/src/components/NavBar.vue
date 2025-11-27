<template>
  <header class="header bg-light-bg dark:bg-gray-900 transition-colors duration-300">
    <div class="logo-wrapper destop-only">
      <img src="/src/assets/logo.png" alt="Logo" class="logo" />
      <h1 class="site-title text-gray-800 dark:text-gray-100">拾光物语</h1>
    </div>
    
    <nav class="nav-bg bg-light-bg dark:bg-gray-800 shadow-md rounded-full px-4 py-1 flex justify-center items-center space-x-2 fixed left-1/2 transform -translate-x-1/2 transition-colors duration-300">
      <RouterLink
        v-for="(item, index) in navLinks"
        :key="index"
        :to="item.href"
        class="relative px-1 py-1 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
        active-class="font-medium"
      >
        {{ item.label }}
        <span
          v-if="$route.path === item.href || ($route.path.startsWith(item.href) && item.href !== '/')"
          class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 rounded-full"
        ></span>
      </RouterLink>

      <div class="relative">
        <button 
          @click="showThemeMenu = !showThemeMenu"
          class="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 transition-colors"
        >
          <Palette class="w-5 h-5" />
        </button>
        
        <div 
          v-if="showThemeMenu" 
          ref="themeMenuRef" 
          class="absolute right-0 top-12 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          <div class="space-y-4">
            
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase mb-2">显示模式</h3>
              <div class="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                
                <button 
                  @click="setMode('light')" 
                  :class="['flex-1 flex items-center justify-center py-1.5 rounded-md text-xs font-medium transition-all', currentMode === 'light' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 dark:text-slate-400']"
                >
                  <Sun class="w-3.5 h-3.5 mr-1" /> 浅色
                </button>
                
                <button 
                  @click="setMode('auto')" 
                  :class="['flex-1 flex items-center justify-center py-1.5 rounded-md text-xs font-medium transition-all', currentMode === 'auto' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 dark:text-slate-400']"
                >
                  <Palette class="w-3.5 h-3.5 mr-1" /> 自动
                </button>
                
                <button 
                  @click="setMode('dark')"
                  :class="['flex-1 flex items-center justify-center py-1.5 rounded-md text-xs font-medium transition-all', currentMode === 'dark' ? 'bg-slate-600 shadow-sm text-white' : 'text-slate-500 dark:text-slate-400']"
                >
                  <Moon class="w-3.5 h-3.5 mr-1" /> 深色
                </button>
              </div>
            </div>
            
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase mb-2">主题颜色</h3>
              <div class="grid grid-cols-5 gap-2">
                <button
                  v-for="color in themeColors"
                  :key="color.name"
                  @click="setTheme(color)"
                  class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center"
                  :style="{ backgroundColor: color.primary, borderColor: currentTheme.name === color.name ? 'var(--text-color)' : 'transparent' }"
                  :title="color.label"
                >
                  <Check v-if="currentTheme.name === color.name" class="w-4 h-4 text-white drop-shadow-md" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        </div>
    </nav>
  </header>
</template>

<script setup>
import { injectTheme } from '@/composables/useTheme.js'
import { ref } from 'vue'
import {
  Palette, Sun, Moon, Check
} from 'lucide-vue-next';
import { useRoute } from 'vue-router'
import { onClickOutside } from '@vueuse/core' 

// 导航数据
const navLinks = [
  { label: '首页', href: '/' },
  { label: '文档', href: '/blog' },
  { label: '项目', href: '/project' },
  { label: '工具', href: '/tools' },
  { label: '更多', href: '/more' },
]

// 关键步骤：注入全局状态和修改函数
const {
  isDarkMode,
  currentMode, // 🚨 新增：用户选择的模式状态
  currentTheme,
  themeColors,
  setMode, // 🚨 修改：替换 toggleDarkMode
  setTheme 
} = injectTheme();

const showThemeMenu = ref(false);
const themeMenuRef = ref(null); // 菜单容器的引用

// 实现：点击菜单外部自动关闭
onClickOutside(themeMenuRef, () => {
  if (showThemeMenu.value) {
    showThemeMenu.value = false;
  }
});

// 移除 watchEffect 和 updateTheme，主题逻辑完全由 useTheme.js 集中管理

</script>

<style scoped>
/* 样式保持不变 */
/* ... (样式代码) ... */

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
/* 注意：这里使用 :deep(.router-link-active) 可能会与全局主题冲突，
   请确保您已经在 App.vue 中定义了 .router-link-active 的主题色映射，
   或者直接使用 'bg-primary-500' 等类名。 
*/
/* :deep(.router-link-active) {
  font-weight: bold;
  color: var(--theme-primary) !important; 
}
*/

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