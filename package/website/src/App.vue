<template>
  <!-- 顶部导航 -->
  <NavBar />
  <div class="container-main dark:bg-gray-900  dark:from-gray-900 dark:to-gray-800 min-h-screen">
    <transition name="fade-slide" mode="out-in">
      <RouterView />
    </transition>
  </div>
  <Footer />
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue';
import HomePage from './views/HomePage.vue'
</script>

<style>
.container-main{
  max-width: 100vw;
  width: 100%;
}
/* 进入时动画 */
.fade-slide-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
/* 离开时动画 */
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

