<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
    <!-- 主内容区 -->
    <main class="container mx-auto px-4 py-8">
      <!-- 搜索栏 -->
      <div class="mb-10 max-w-2xl mx-auto">
        <div class="relative">
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="搜索工具..."
            class="w-full py-3 px-5 pl-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
          >
          <i class="mgc_search_3_line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      <!-- 工具分类展示 -->
      <div class="space-y-12">
        <template v-for="(category, categoryIndex) in filteredCategories" :key="categoryIndex">
          <section>
            <!-- 分类标题 -->
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 group">
              <span class="category-icon w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <i :class="category.icon"></i>
              </span>
              {{ category.name }}
              <span class="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {{ category.tools.length }} 个工具
              </span>
            </h2>

            <!-- 工具网格 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <template v-for="(tool, toolIndex) in category.tools" :key="toolIndex">
                <a
                  :href="tool.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="tool-card group"
                >
                  <div class="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 flex h-full transform group-hover:-translate-y-1">
                    <!-- 左侧图标区域 -->
                    <div class="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <i :class="tool.icon" class="text-5xl"></i>
                    </div>
                    <!-- 右侧文本区域 -->
                    <div class="flex flex-col flex-grow">
                      <h3 class="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                        {{ tool.name }}
                      </h3>
                      <p class="text-gray-500 dark:text-gray-400 text-sm flex-grow">
                        {{ tool.description }}
                      </p>
                    </div>
                  </div>
                </a>
              </template>
            </div>
          </section>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// 深色模式切换
// const isDarkMode = ref(false);

// onMounted(() => {
//   // 检查用户偏好
//   if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     isDarkMode.value = true;
//     document.documentElement.classList.add('dark');
//   }
// });

// const toggleDarkMode = () => {
//   isDarkMode.value = !isDarkMode.value;
//   document.documentElement.classList.toggle('dark');
// };

// 搜索功能
const searchQuery = ref('');

// 工具数据 - 按类别分组
const toolCategories = ref([
  {
    name: "开发工具",
    icon: "mgc_code_line",
    tools: [
      {
        name: "多合一网页缩略图",
        icon: "mgc_web_line",
        description: "PC 端、手机端、pad 端、移动端 四合一网站响应式截图生成，网站预览缩略图生成",
        url: "/tools/responsive"
      },
      {
        name: "API测试工具",
        icon: "mgc_bug_line",
        description: "测试和调试RESTful API的工具",
        url: "https://postman.com"
      },
      {
        name: "JSON格式化",
        icon: "mgc_braces_line",
        description: "格式化和验证JSON数据",
        url: "https://jsonformatter.org"
      },
      {
        name: "颜色选择器",
        icon: "mgc_palette_line",
        description: "选择和生成颜色代码的工具",
        url: "https://htmlcolorcodes.com"
      }
    ]
  },
  {
    name: "设计资源",
    icon: "mgc_palette_line",
    tools: [
      {
        name: "图标库",
        icon: "mgc_icon_line",
        description: "提供丰富的SVG图标资源",
        url: "https://fontawesome.com"
      },
      {
        name: "图片压缩",
        icon: "mgc_compress_line",
        description: "压缩图片文件大小",
        url: "https://tinypng.com"
      },
      {
        name: "字体库",
        icon: "fas fa-font",
        description: "免费商用字体资源",
        url: "https://fonts.google.com"
      }
    ]
  },
  {
    name: "日常工具",
    icon: "fas fa-tools",
    tools: [
      {
        name: "在线翻译",
        icon: "fas fa-language",
        description: "多语言互译工具",
        url: "https://translate.google.com"
      },
      {
        name: "单位转换",
        icon: "fas fa-exchange-alt",
        description: "各种单位之间的转换",
        url: "https://convertunits.com"
      },
      {
        name: "密码生成",
        icon: "fas fa-key",
        description: "生成高强度随机密码",
        url: "https://passwordsgenerator.net"
      },
      {
        name: "时间戳转换",
        icon: "fas fa-clock",
        description: "Unix时间戳与日期互相转换",
        url: "https://epochconverter.com"
      }
    ]
  },
  {
    name: "学习资源",
    icon: "fas fa-graduation-cap",
    tools: [
      {
        name: "在线课程",
        icon: "fas fa-laptop-code",
        description: "各种编程和技术课程",
        url: "https://coursera.org"
      },
      {
        name: "文档查询",
        icon: "fas fa-book",
        description: "编程语言和框架文档",
        url: "https://devdocs.io"
      }
    ]
  }
]);

// 过滤分类和工具
const filteredCategories = computed(() => {
  if (!searchQuery.value) return toolCategories.value;
  
  const query = searchQuery.value.toLowerCase();
  
  return toolCategories.value
    .map(category => {
      // 过滤分类下的工具
      const filteredTools = category.tools.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query)
      );
      
      // 只返回有匹配工具的分类
      return { ...category, tools: filteredTools };
    })
    .filter(category => category.tools.length > 0);
});
</script>

<style scoped>
/* 自定义动画和过渡 */
.tool-card {
  @apply block;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

</style>

<style>
/* 全局样式 */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: #165DFF;
  }
  
  .dark {
    color-scheme: dark;
  }
}

@layer components {
  .text-primary {
    color: var(--color-primary);
  }
  
  .bg-primary {
    background-color: var(--color-primary);
  }
}
</style>