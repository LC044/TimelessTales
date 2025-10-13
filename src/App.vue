<template>
  <!-- 顶部导航 -->
  <NavBar />
  <div class="container">
    <transition name="fade-slide" mode="out-in">
      <RouterView />
    </transition>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import HomePage from './views/HomePage.vue'
</script>

<style>
.container{
  max-width: 100vw;
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

