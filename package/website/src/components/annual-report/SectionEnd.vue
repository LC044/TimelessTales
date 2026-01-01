<script setup lang="ts">
import ReportPage from './ReportPage.vue';
import { RotateCw, Share2 } from 'lucide-vue-next';

const emit = defineEmits(['replay']);

const currentYear = new Date().getFullYear();
</script>

<template>
  <ReportPage>
    <div class="flex flex-col items-center justify-center h-full text-center gap-8">
        
        <!-- Logo Text -->
        <h1 class="text-4xl font-bold text-primary-amber tracking-widest">行影集</h1>
        
        <!-- Ending Text -->
        <div class="space-y-2">
            <p class="text-xl text-light-text2 dark:text-gray-300">一帧一画，皆是岁月</p>
            <p class="text-sm text-light-text3 dark:text-gray-500">{{ currentYear }} · 未完待续</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-4 mt-8">
            <button 
                @click="$emit('replay')"
                class="flex items-center gap-2 px-3 py-3 bg-white dark:bg-white/10 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/20 transition-colors"
            >
                <RotateCw class="w-4 h-4" />
                <span>再看一次</span>
            </button>
            
            <button 
                class="flex items-center gap-2 px-3 py-3 bg-primary-amber text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
            >
                <Share2 class="w-4 h-4" />
                <span>分享报告</span>
            </button>
        </div>

    </div>
  </ReportPage>
</template>
