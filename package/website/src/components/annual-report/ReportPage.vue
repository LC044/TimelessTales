<template>
  <div class="report-page page-item relative w-full h-full flex flex-col justify-center items-center overflow-hidden" :class="props.maxWidth ? 'p-0' : ''">
    <!-- Gradient Background (Global) -->
    <div class="absolute inset-0 bg-gradient-to-b from-bg-top to-bg-bottom dark:from-dark-navy dark:to-dark-gray-blue z-0"></div>
    
    <!-- Content Wrapper -->
    <div class="content-wrapper relative z-10 w-full flex flex-col gap-6 md:px-0 h-full justify-center" :class="props.maxWidth ? '' : 'max-w-lg px-4'">
      <transition name="page-fade" appear>
        <div class="w-full h-full flex flex-col justify-center relative">
            <slot />
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps<{
  maxWidth?: string;
}>();

</script>

<style scoped>
.page-fade-enter-active { transition: all 0.8s ease-out; }
.page-fade-leave-active { transition: all 0.5s ease-in; }
.page-fade-enter-from { opacity: 0; transform: translateY(20px); }
.page-fade-leave-to { opacity: 0; transform: translateY(-20px); }
</style>
