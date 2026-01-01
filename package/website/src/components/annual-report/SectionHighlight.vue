<script setup lang="ts">
import ReportPage from './ReportPage.vue';
import type { MemoryMetrics } from '@/types/annualReport';
import { User, MapPin, Calendar, Zap } from 'lucide-vue-next';

const props = defineProps<{
  memory: MemoryMetrics;
}>();

const items = [
  {
    icon: User,
    label: '年度出镜最多的人',
    value: `${props.memory.topPersonCount} 次`,
    desc: '陪伴是最长情的告白',
    color: 'text-pink-500',
    bg: 'bg-pink-100 dark:bg-pink-900/30'
  },
  {
    icon: MapPin,
    label: '年度打卡最多的地点',
    value: props.memory.topLocation,
    desc: '心安之处即是故乡',
    color: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    icon: Calendar,
    label: '年度最忙碌的一天',
    value: props.memory.maxPhotoDay,
    subValue: `${props.memory.maxPhotoDayCount} 张`,
    desc: '那一天的快乐，不曾褪色',
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    icon: Zap,
    label: '年度最爱功能',
    value: props.memory.topFeature,
    subValue: `${props.memory.topFeatureCount} 次`,
    desc: '留住流动的时光',
    color: 'text-yellow-500',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30'
  }
];
</script>

<template>
  <ReportPage>
    <div class="flex flex-col h-full w-full justify-center">
        <h2 class="text-2xl font-bold text-center mb-10 text-light-text1 dark:text-white">
            高光时刻
        </h2>

        <div class="flex flex-col gap-6">
            <div 
                v-for="(item, index) in items" 
                :key="index"
                class="flex items-center gap-4 p-2 rounded-xl hover:bg-white/30 dark:hover:bg-white/5 transition-colors"
                :style="{ animationDelay: `${index * 150}ms` }"
            >
                <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" :class="item.bg">
                    <component :is="item.icon" class="w-6 h-6" :class="item.color" />
                </div>

                <div class="flex-1">
                    <div class="flex items-baseline justify-between">
                        <span class="text-lg font-bold text-light-text1 dark:text-gray-100">{{ item.label }}</span>
                    </div>
                    <div class="flex items-baseline gap-2 mt-1">
                        <span class="text-xl font-bold text-primary-amber">{{ item.value }}</span>
                        <span v-if="item.subValue" class="text-sm text-light-text3 dark:text-gray-400">{{ item.subValue }}</span>
                    </div>
                    <div class="text-xs text-light-text3/70 dark:text-gray-500 mt-1">{{ item.desc }}</div>
                </div>
            </div>
        </div>
    </div>
  </ReportPage>
</template>
