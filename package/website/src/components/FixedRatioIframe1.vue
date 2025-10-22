<template>
  <div ref="wrapper" class="iframe-wrapper">
    <div
      class="iframe-scale-container"
      :style="scaleStyle"
    >
      <iframe
        class="iframe-content"
        :src="src"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 1920
  },
  height: {
    type: Number,
    default: 1080
  }
})

const wrapper = ref(null)
const scale = ref(1)

const updateScale = () => {
  if (!wrapper.value) return
  const w = wrapper.value.clientWidth
  const h = wrapper.value.clientHeight
  const scaleW = w / props.width
  const scaleH = h / props.height
  // 保持比例，不拉伸
  scale.value = Math.min(scaleW, scaleH)
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})

const scaleStyle = computed(() => ({
  width: props.width + 'px',
  height: props.height + 'px',
  transform: `scale(${scale.value})`,
  transformOrigin: 'top left'
}))
</script>

<style scoped>
.iframe-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; /* 避免溢出 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.iframe-scale-container {
  position: absolute;
  top: 0;
  left: 0;
}

.iframe-content {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
