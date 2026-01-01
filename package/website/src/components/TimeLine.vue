<template>
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold text-center text-pink-600">拾光物语 ✨</h1>
      <div class="mt-6 space-y-6 border-l-4 border-pink-500 pl-4">
        <div v-for="(event, index) in loveEvents" :key="index" class="relative">
          <div class="absolute -left-5 w-3 h-3 bg-pink-500 rounded-full"></div>
          <h2 class="text-xl font-semibold">{{ event.date }}</h2>
          <p class="text-gray-700">{{ event.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface LoveEvent {
    date: string;
    description: string;
  }

  const loveEvents = ref<LoveEvent[]>([
    { date: "2023.05.20", description: "💖 我们在一起啦！" },
    { date: "2023.08.14", description: "✈️ 第一次旅行，三亚的海真的美！第一次旅行，三亚的海真的美！第一次旅行，三亚的海真的美！第一次旅行，三亚的海真的美！第一次旅行，三亚的海真的美！" },
    { date: "2023.12.24", description: "🎄 第一个圣诞节，一起烤了蛋糕！" },
    { date: "2023.05.20", description: "💖 我们在一起啦！" },
    { date: "2023.08.14", description: "✈️ 第一次旅行，三亚的海真的美！" },
    { date: "2023.12.24", description: "🎄 第一个圣诞节，一起烤了蛋糕！" },
    { date: "2023.05.20", description: "💖 我们在一起啦！" },
    { date: "2023.08.14", description: "✈️ 第一次旅行，三亚的海真的美！" },
    { date: "2023.12.24", description: "🎄 第一个圣诞节，一起烤了蛋糕！" },
    { date: "2023.05.20", description: "💖 我们在一起啦！" },
    { date: "2023.08.14", description: "✈️ 第一次旅行，三亚的海真的美！" },
    { date: "2023.12.24", description: "🎄 第一个圣诞节，一起烤了蛋糕！" },
  ])
  </script>
  
  <style scoped>
  /* 可选：添加一些动画 */
  </style>
  