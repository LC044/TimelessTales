<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <!-- 工具栏 -->
    <div class="toolbar mb-4 md:mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div class="input-url w-full md:flex-1 flex gap-3 items-center">
        <input 
          type="text" 
          v-model="urlInput" 
          placeholder="在此输入 URL（例如 https://example.com）" 
          @keyup.enter="applyUrl"
          class="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all text-sm"
        />
        <button 
          class="btn px-4 py-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm font-medium" 
          @click="applyUrl"
        >
          加载 URL
        </button>
        <button 
          class="btn secondary px-4 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium" 
          @click="clearUrl"
        >
          清除
        </button>
      </div>

      <div class="controls flex flex-wrap gap-3 items-center w-full md:w-auto">
        <label class="text-xs text-gray-600">整体缩放</label>
        <input 
          type="range" 
          min="10" 
          max="150" 
          v-model.number="globalScale"
          class="w-28 md:w-32 accent-blue-200"
        />
        <div class="w-2"></div>
        <button 
          class="btn secondary px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-xs font-medium" 
          @click="resetAll"
        >
          重置全部位置
        </button>
      </div>
    </div>

    <!-- 工作区 -->
    <div 
      class="workspace relative w-full rounded-xl border border-gray-200 bg-white/80 shadow-sm overflow-hidden"
      ref="workspace"
      :style="{ height: 'calc(100vh - 130px)' }"
    >
      <DevicePreview
        v-for="dev in devices"
        :key="dev.id"
        :url="url"
        :label="dev.label"
        :viewW="dev.w"
        :viewH="dev.h"
        :initX="dev.initX"
        :initY="dev.initY"
        :scalePercent="globalScale"
        @update:position="pos => updatePos(dev.id, pos)"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import DevicePreview from '@/components/DevicePreview.vue'

export default {
  name: 'App',
  components: { DevicePreview },
  setup() {
    const urlInput = ref('https://siyuan.ink')
    const url = ref('')
    const globalScale = ref(35) // 全局缩放百分比
    const workspace = ref(null)

    // 设备列表及视口尺寸
    const devices = ref([
      { id: 'desktop', label: '台式机 - 大屏', w: 1920, h: 1080, initX: 300, initY: 40 },
      { id: 'laptop', label: '笔记本', w: 1366, h: 768, initX: 820, initY: 300 },
      { id: 'pad', label: 'Pad', w: 820, h: 1180, initX: 160, initY: 300 },
      { id: 'mobile', label: '手机', w: 390, h: 844, initX: 350, initY: 420 }
    ])

    function applyUrl() {
      url.value = urlInput.value.trim()
    }

    function clearUrl() {
      urlInput.value = ''
      url.value = ''
    }

    function updatePos(id, pos) {
      const d = devices.value.find(x => x.id === id)
      if (d) {
        d.initX = pos.x
        d.initY = pos.y
      }
    }

    function resetAll() {
      devices.value = [
        { id: 'desktop', label: '台式机 - 大屏', w: 1920, h: 1080, initX: 300, initY: 40 },
        { id: 'laptop', label: '笔记本', w: 1366, h: 768, initX: 820, initY: 300 },
        { id: 'pad', label: 'Pad', w: 820, h: 1180, initX: 160, initY: 300 },
        { id: 'mobile', label: '手机', w: 390, h: 844, initX: 350, initY: 420 }
      ]
      globalScale.value = 35
    }

    return { urlInput, url, applyUrl, clearUrl, devices, updatePos, resetAll, globalScale, workspace }
  }
}
</script>

<style scoped>
/* 仅保留无法用Tailwind实现的特殊样式 */
.workspace {
  /* background-image: 
    linear-gradient(rgba(229, 231, 235, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(229, 231, 235, 0.5) 1px, transparent 1px); */
  background-size: 20px 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .workspace {
    height: calc(100vh - 200px) !important;
  }
}
</style>