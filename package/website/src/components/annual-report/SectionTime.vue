
<template>
  <ReportPage :class="{ 'animate-in': isActive }" ref="sectionRef">
    <div class="flex flex-col items-center justify-center h-full text-center px-4 py-8 overflow-y-auto">
      
      <!-- Big Number -->
      <div class="relative shrink-0">
         <h2 class="text-[clamp(3rem,10vw,5rem)] font-bold text-primary-amber leading-none tracking-tight tabular-nums">
            {{ displayValue.toLocaleString() }}
         </h2>
         <div class="absolute -bottom-2 left-0 right-0 h-1 bg-primary-amber/20 rounded-full"></div>
      </div>

      <!-- Annotation -->
      <div class="mt-6 space-y-2 max-w-md mx-auto animate-fade-in-up shrink-0">
        <p class="text-lg text-light-text2 dark:text-gray-200 leading-relaxed">
            这一年，你用镜头收藏了
            <span class="text-primary-amber font-bold">{{ data.totalPhotos }}</span> 个珍贵瞬间
        </p>
      </div>

      <!-- Calendar Grid -->
      <div class="mt-8 grid grid-cols-3 gap-x-2 gap-y-4 w-full max-w-lg mx-auto animate-fade-in-up" style="animation-delay: 0.5s;">
        <div v-for="month in calendarData" :key="month.name" class="flex flex-col">
          <h3 class="text-xs font-bold text-primary-amber mb-1 pl-1 text-left">{{ month.name }}</h3>
          <div class="grid grid-cols-7 gap-1">
            <div 
              v-for="day in month.days" 
              :key="day.key"
              class="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              :class="{
                'invisible': day.type === 'empty',
                'bg-primary-amber shadow-[0_0_4px_rgba(255,255,255,0.8)] scale-110': day.type === 'day' && day.hasPhoto,
                'bg-gray-300/30 dark:bg-white/10': day.type === 'day' && !day.hasPhoto
              }"
            ></div>
          </div>
        </div>
      </div>
      
      <p class="text-xs text-light-text3 dark:text-gray-400 mt-6 animate-fade-in-up shrink-0" style="animation-delay: 1s;">
          相机陪你走过了 {{ data.accompanyDays }} 天
      </p>
      
    </div>
  </ReportPage>
</template>

<script setup lang="ts">
import ReportPage from './ReportPage.vue';
import type { TimeMetrics } from '@/types/annualReport';
import { ref, onMounted, watch, computed } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

const props = defineProps<{
  data: TimeMetrics;
}>();

// Calendar Logic
const calendarData = computed(() => {
  // Use the year from the first photo date, or default to current year
  const firstDateStr = props.data.photoDates?.[0] || props.data.firstPhotoDate;
  const year = firstDateStr ? new Date(firstDateStr).getFullYear() : new Date().getFullYear();
  
  const months = [];
  const photoDatesSet = new Set(props.data.photoDates || []);

  for (let m = 0; m < 12; m++) {
    const monthIndex = m; 
    const date = new Date(year, monthIndex, 1);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDayOfWeek = date.getDay(); // 0 (Sun) - 6 (Sat)
    
    const days = [];
    // Placeholders
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ type: 'empty', key: `empty-${m}-${i}` });
    }
    
    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({ 
        type: 'day', 
        day: d, 
        hasPhoto: photoDatesSet.has(dateStr), 
        key: dateStr 
      });
    }
    
    months.push({
      name: `${monthIndex + 1}月`,
      days
    });
  }
  return months;
});

// CountUp Logic
const displayValue = ref(0);
const isActive = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !isActive.value) {
      isActive.value = true;
    }
  },
  { threshold: 0.5 }
);

// 监听 isActive 触发动画
watch(isActive, (newVal) => {
  if (newVal) {
    startCountUp();
  }
});

const startCountUp = () => {
  const start = 0;
  const end = props.data.totalPhotos;
  const duration = 2000; // 2 seconds
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // EaseOutExpo function
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    
    displayValue.value = Math.floor(start + (end - start) * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

onMounted(() => {
    // Small delay to start animation after slide transition
    // setTimeout(() => {
    //     startCountUp();
    // }, 500);
});
</script>

<style scoped>
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
