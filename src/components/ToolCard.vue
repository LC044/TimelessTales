<template>
  <div class="bg-light-bg1 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow hover:bg-dark-warm-gray">
    <!-- 卡片图标区 -->
    <div class="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mb-4">
      <!-- <span class="text-2xl font-bold text-red-800">{{ icon }}</span> -->
      <img :src="icon"></img>
    </div>
    <!-- 卡片内容区 -->
    <h3 class="text-textDark font-semibold text-lg mb-2">{{ title }}</h3>
    <p class="text-textLight text-sm mb-4">{{ desc }}</p>
    <!-- 链接区（带箭头图标） -->
    <a :href="link" class="text-accentPink text-sm flex items-center hover:underline" target="_blank">
      {{ linkText }}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
    icon: String,   // 卡片首字母图标
    title: String,  // 工具名称
    desc: String,   // 工具描述
    linkText: String,// 链接文字
    link:String
});
</script>