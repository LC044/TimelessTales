<script setup lang="ts">
import ReportPage from './ReportPage.vue';
</script>

<template>
  <ReportPage>
    <div class="flex flex-col h-full w-full justify-center items-center px-6">
        <div class="max-w-md text-center space-y-8 leading-loose text-lg text-light-text1 dark:text-gray-200 font-light">
            <p class="animate-fade-in-up delay-100">
                这一年，你用镜头收藏了三餐四季<br>
                定格了步履与温柔<br>
                记录了相聚与欢喜
            </p>
            <p class="animate-fade-in-up delay-300">
                那些按下快门的瞬间<br>
                是时光留给你的独家印记<br>
                不曾褪色，永不消散
            </p>
            <p class="animate-fade-in-up delay-500">
                愿你往后岁岁年年<br>
                眼里有光，心中有爱<br>
                镜头里有无限美好
            </p>
        </div>

        <div class="mt-12 text-center animate-fade-in-up delay-700">
            <div class="text-sm text-primary-amber font-medium">—— TrailSnap 致你的时光信笺</div>
        </div>
    </div>
  </ReportPage>
</template>

<style scoped>
.delay-100 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.8s; }
.delay-500 { animation-delay: 1.4s; }
.delay-700 { animation-delay: 2.0s; }

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 1.5s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
