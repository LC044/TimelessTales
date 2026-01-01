<template>
  <div class="annual-container w-full h-screen overflow-hidden bg-bg-light dark:bg-dark-navy text-light-text1 dark:text-dark-text-warm-gray">
    <!-- Scroll Wrapper -->
    <div ref="scrollWrapper" class="scroll-wrapper snap-y snap-mandatory overflow-y-auto h-screen w-full relative">
       <slot />
    </div>
  </div>
</template>

<style scoped>
.scroll-wrapper {
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.scroll-wrapper::-webkit-scrollbar { display: none; }
</style>
