<template>
  <ReportPage>
    <div class="flex flex-col h-full w-full justify-center">
        <!-- Text -->
        <div class="mb-6 text-center">
             <h2 class="text-2xl font-bold text-light-text1 dark:text-white mb-2">
                藏在照片里的温柔
             </h2>
             <p class="text-sm text-light-text3 dark:text-gray-400">
                收藏的是偏爱，分享的是欢喜
             </p>
        </div>

        <!-- 3x3 Grid -->
        <div class="grid grid-cols-3 gap-3 w-full max-w-[360px] mx-auto aspect-square">
            <div 
                v-for="(item, index) in gridItems" 
                :key="index"
                class="relative rounded-lg overflow-hidden shadow-sm bg-gray-100 dark:bg-white/5 cursor-pointer group"
                :class="{'hover:shadow-md': item.content || item.group}"
            >
                <!-- CASE 1: Carousel Module -->
                <div 
                  v-if="item.type === 'carousel' && item.group" 
                  class="w-full h-full relative"
                  @mouseenter="pauseCarousel(item.group)"
                  @mouseleave="resumeCarousel(item.group)"
                  @click="handleCarouselClick(item.group)"
                >
                   <transition-group name="fade">
                     <img 
                        v-for="(photo, pIndex) in item.group.photos"
                        :key="photo"
                        v-show="carouselState[item.group.id] === pIndex"
                        :src="photo" 
                        class="absolute inset-0 w-full h-full object-cover"
                        alt="Carousel Memory"
                     />
                   </transition-group>
                   
                   <!-- Overlay Hint -->
                   <div class="absolute inset-0 bg-black/20 flex flex-col items-center justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span class="text-[10px] text-white bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {{ item.group.locationName }} · {{ item.group.photos.length }}张
                      </span>
                   </div>
                   
                   <!-- Icon Indicator -->
                   <div class="absolute top-1 right-1 opacity-60 group-hover:opacity-0 transition-opacity">
                      <div class="w-2 h-2 rounded-full bg-primary-amber animate-pulse"></div>
                   </div>
                </div>

                <!-- CASE 2: Static Photo -->
                <div
                  v-else-if="item.type === 'static' && item.content"
                  class="w-full h-full relative overflow-hidden"
                  @click="openPreview(item.content)"
                >
                   <img
                      :src="item.content" 
                      class="w-full h-full object-cover animate-breathe"
                      :style="{ animationDelay: `${(item.staticIndex || 0) * 0.5}s` }"
                      alt="Memory"
                   />
                   <div class="absolute inset-0 border-2 border-transparent group-hover:border-primary-amber transition-colors duration-300 rounded-lg pointer-events-none"></div>
                </div>

                <!-- CASE 3: Empty Placeholder -->
                <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                   <div class="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                </div>
            </div>
        </div>

        <!-- Bottom Hint -->
        <div class="text-center mt-6 opacity-0 animate-fade-in-delay">
            <span class="text-xs text-light-text3/50 dark:text-gray-600">点击轮播照片切换更多回忆</span>
        </div>

        <!-- Preview Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" @click="showModal = false">
            <img :src="previewPhoto" class="max-w-full max-h-full rounded-lg shadow-2xl" />
        </div>
    </div>
  </ReportPage>
</template>

<script setup lang="ts">
import ReportPage from './ReportPage.vue';
import type { EmotionMetrics, CarouselGroup } from '@/types/annualReport';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  data: EmotionMetrics;
}>();

// --- Data Preparation ---
// Grid has 9 slots (3x3).
// Slots 0, 4, 8 are dynamic carousels.
// Slots 1, 2, 3, 5, 6, 7 are static photos.

const staticPhotos = computed(() => {
  // Combine starred and shared, take up to 6 for static slots
  const combined = [...props.data.starredPhotosList, ...props.data.sharedPhotosList];
  return combined.slice(0, 6);
});

const carouselGroups = computed(() => props.data.emotionCarouselGroups || []);

// Grid items configuration
interface GridItem {
  type: 'static' | 'carousel';
  content?: string; // For static
  group?: CarouselGroup; // For carousel
  currentIndex?: number; // For carousel
  staticIndex?: number; // Helper to track static photo usage
}

const gridItems = computed(() => {
  const items: GridItem[] = [];
  let staticIdx = 0;
  let carouselIdx = 0;

  for (let i = 0; i < 9; i++) {
    // Carousel slots: 0, 4, 8 (Indices in 0-8 range)
    if ([0, 4, 8].includes(i) && carouselIdx < carouselGroups.value.length) {
      items.push({
        type: 'carousel',
        group: carouselGroups.value[carouselIdx],
        currentIndex: 0
      });
      carouselIdx++;
    } else {
      // Static slot
      if (staticIdx < staticPhotos.value.length) {
        items.push({
          type: 'static',
          content: staticPhotos.value[staticIdx],
          staticIndex: staticIdx
        });
        staticIdx++;
      } else {
        // Fallback placeholder if run out of photos
        items.push({ type: 'static', content: '' }); 
      }
    }
  }
  return items;
});

// --- Carousel Logic ---
const carouselState = ref<Record<string, number>>({}); // Map group ID to current photo index
let carouselIntervals: Record<string, any> = {};

const initCarousels = () => {
  carouselGroups.value.forEach(group => {
    carouselState.value[group.id] = 0;
    // Start interval with random offset to avoid synchronized switching
    setTimeout(() => {
      startCarouselInterval(group);
    }, Math.random() * 2000);
  });
};

const startCarouselInterval = (group: CarouselGroup) => {
  if (carouselIntervals[group.id]) clearInterval(carouselIntervals[group.id]);
  
  carouselIntervals[group.id] = setInterval(() => {
    nextPhoto(group);
  }, 3500); // Switch every 3.5s
};

const nextPhoto = (group: CarouselGroup) => {
  const total = group.photos.length;
  if (total <= 1) return;
  carouselState.value[group.id] = (carouselState.value[group.id] + 1) % total;
};

const pauseCarousel = (group: CarouselGroup) => {
  if (carouselIntervals[group.id]) {
    clearInterval(carouselIntervals[group.id]);
    delete carouselIntervals[group.id];
  }
};

const resumeCarousel = (group: CarouselGroup) => {
  startCarouselInterval(group);
};

const handleCarouselClick = (group: CarouselGroup) => {
  // Manual switch
  nextPhoto(group);
  // Reset timer
  pauseCarousel(group);
  resumeCarousel(group);
};

onMounted(() => {
  initCarousels();
});

onUnmounted(() => {
  Object.values(carouselIntervals).forEach(clearInterval);
});

// --- Modal Logic ---
const showModal = ref(false);
const previewPhoto = ref('');

const openPreview = (url: string) => {
  if (!url) return;
  previewPhoto.value = url;
  showModal.value = true;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Breathing Animation for Static Photos */
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.animate-breathe {
  animation: breathe 6s ease-in-out infinite;
}

.animate-fade-in-delay {
    animation: fadeIn 1s ease-out forwards;
    animation-delay: 2s;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
</style>
