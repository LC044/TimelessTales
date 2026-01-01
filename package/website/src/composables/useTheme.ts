import { ref, watch, computed, onMounted, onUnmounted, provide, inject, type InjectionKey } from 'vue';

// ----------------- 主题配置 -----------------
export interface ThemeColor {
  name: string;
  label: string;
  primary: string;
  secondary: string;
  rgb: string;
}

export const themeColors: ThemeColor[] = [
  { name: 'sky', label: '天空蓝', primary: '#1E88E5', secondary: '#64B5F6', rgb: '30, 136, 229' },
  { name: 'emerald', label: '森系绿', primary: '#10B981', secondary: '#34D399', rgb: '16, 185, 129' },
  { name: 'violet', label: '梦幻紫', primary: '#8B5CF6', secondary: '#A78BFA', rgb: '139, 92, 246' },
  { name: 'rose', label: '落日红', primary: '#F43F5E', secondary: '#FB7185', rgb: '244, 63, 94' },
  { name: 'amber', label: '复古橘', primary: '#F59E0B', secondary: '#FBBF24', rgb: '245, 158, 11' },
];

// ----------------- 核心逻辑 -----------------
export function useTheme() {
// 状态初始化（从 localStorage 读取或默认值）
  // 🚨 新增：记录用户选择的模式
  const savedMode = (localStorage.getItem('theme-mode') as 'auto' | 'light' | 'dark') || 'auto'; 
  const currentMode = ref<'auto' | 'light' | 'dark'>(savedMode); 
  
  const savedColor = localStorage.getItem('theme-color') || 'sky';
  const initialTheme = themeColors.find(t => t.name === savedColor) || themeColors[0];
  const currentTheme = ref<ThemeColor>(initialTheme);
  
// 引入一个响应式变量，用于在系统主题改变时强制触发 isDarkMode 重新计算
  const systemPreferenceChange = ref(0); 
  
  // isDarkMode 状态：计算属性
  const isDarkMode = computed(() => {
    // 访问这个 ref，使其成为 isDarkMode 的依赖
    systemPreferenceChange.value; 

    if (currentMode.value === 'dark') return true;
    if (currentMode.value === 'light') return false;
    
    // 'auto' 模式下，检查系统偏好设置
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
// 4. 计算 CSS 变量
  const themeStyle = computed(() => {
    return {
      '--theme-primary': currentTheme.value.primary,
      '--theme-rgb': currentTheme.value.rgb,
      '--text-color': isDarkMode.value ? '#ffffff' : '#1e293b'
    };
  });

  // 2. 切换主题色及持久化 (setTheme 保持不变)
  const setTheme = (themeObj: ThemeColor) => {
    currentTheme.value = themeObj;
    localStorage.setItem('theme-color', themeObj.name);
  };
  
  // 设置系统主题变化的事件监听器
  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const listener = () => {
      // 只有在用户选择 'auto' 模式时才响应系统变化
      if (currentMode.value === 'auto') {
        // 🚨 触发响应式更新：改变 ref 的值，isDarkMode 就会立即重新计算
        systemPreferenceChange.value++; 
      }
    };

    // 注册监听器
    mediaQuery.addEventListener('change', listener);
    
    // 在组件销毁时移除监听器，防止内存泄漏
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', listener);
    });
  });

  // --- 关键修改点 END ---

  // 1. 切换模式 (setMode 保持不变)
  const setMode = (mode: 'auto' | 'light' | 'dark') => {
    currentMode.value = mode;
    localStorage.setItem('theme-mode', mode);
    // 🚨 当用户手动切换模式后，强制重新计算一次，以防 mediaQuery 监听器还未初始化
    systemPreferenceChange.value++;
  };

  // 3. 实时应用 'dark' class 到 HTML 根元素 (watch 保持不变)
  watch(isDarkMode, (newVal) => {
    const root = document.documentElement;
    root.classList.toggle('dark', newVal);
  }, { immediate: true });
  
  return {
    isDarkMode, // computed
    currentMode, // ref, 用户选择的模式
    currentTheme,
    setMode,
    setTheme,
    themeStyle,
    themeColors
  };
}

const ThemeKey = Symbol('theme') as InjectionKey<ReturnType<typeof useTheme>>;

export function provideTheme() {
  const theme = useTheme();
  provide(ThemeKey, theme);
  return theme;
}

export function injectTheme() {
  const theme = inject(ThemeKey);
  if (!theme) {
    throw new Error('injectTheme must be used within a component that calls provideTheme');
  }
  return theme;
}
