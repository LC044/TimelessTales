<template>
  <div :class="[isDark ? 'dark' : '', 'h-screen w-screen overflow-hidden flex flex-col font-sans']">
    <header class="flex-none z-50 shadow-sm relative">
      <div class="max-w-full px-4 sm:px-6 py-2 flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-2 select-none">
          <div class="p-1 bg-primary-500 rounded-lg shadow-md shadow-blue-500/30">
            <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h1 class="text-md font-bold text-gray-900 dark:text-white hidden sm:block">多合一网页<span class="text-primary-500">缩略图</span></h1>
        </div>

        <div class="flex-1 w-full max-w-xl relative group">
          <input
            v-model="inputUrl"
            @keyup.enter="loadUrl"
            type="text"
            placeholder="输入网址 (例如: https://siyuan.ink)"
            class="block w-full pl-4 pr-20 py-1.5 text-sm border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
          >
          <button
            @click="loadUrl"
            class="absolute inset-y-1 right-1 px-3 bg-primary-500 hover:bg-primary-600 text-white text-xs font-medium rounded-md transition-colors"
          >
            加载
          </button>
        </div>

        <div class="flex items-center gap-2">
          <div class="flex rounded-lg p-0.5">
            <button
              v-for="device in devices"
              :key="device.id"
              @click="toggleDeviceVisibility(device)"
              :class="[
                'p-0 rounded-md bg-white dark:bg-gray-700 transition-all duration-200 border border-transparent hover:border-gray-300 dark:hover:border-gray-600 flex items-center justify-center w-8 h-8',
                device.visible
                  ? 'text-primary-500 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              ]"
              :title="device.visible ? '隐藏 ' + device.name : '显示 ' + device.name"
            >
            <span :class="device.icon"></span>
              <!-- <component :is="device.icon" class="w-4 h-4" /> -->
            </button>
          </div>
          <button
            @click="resetLayout"
            class="p-1.5 text-xs font-medium text-white bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-600 rounded-lg transition"
            title="重置位置"
          >
            重置位置</button>
        </div>
      </div>
    </header>

    <main
      class="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
      @mousedown.self="startPan"
      @mousemove="onMouseMove"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
      ref="canvasRef"
    >
      <div v-if="!currentUrl" class="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div class="text-center opacity-40">
          <h2 class="text-3xl font-bold text-gray-400 dark:text-gray-600">DRAG & DROP CANVAS</h2>
          <p class="mt-2 text-gray-400">输入网址，拖动设备，自由组合截图</p>
        </div>
      </div>

      <div
        v-for="device in devices"
        :key="device.id"
        v-show="device.visible"
        class="absolute transition-transform duration-75 ease-linear origin-center select-none will-change-transform"
        :style="{ 
          transform: `translate(${device.x}px, ${device.y}px)`, 
          zIndex: device.zIndex 
        }"
        @mousedown.stop="startDrag($event, device)"
        @contextmenu.stop.prevent="showContextMenu($event, device)"
      >
        <div class="group relative flex flex-col items-center">
          
          <div class="absolute -top-10 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-default">
            <div class="bg-gray-800 text-white text-xs py-1 px-3 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto">
              <span class="font-bold mr-1">{{ device.name }}</span>
              <span class="opacity-50">|</span>
              <button 
                @click.stop="toggleInteraction(device)"
                :class="[
                  'hover:text-blue-300 transition-colors flex items-center gap-1',
                  device.isInteractive ? 'text-green-400' : ''
                ]"
                :title="device.isInteractive ? '锁定内容（允许拖拽）' : '操作内容（禁止拖拽）'"
              >
                <svg v-if="!device.isInteractive" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                <svg v-else class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                {{ device.isInteractive ? '操作' : '查看' }}
              </button>
              <span class="opacity-50">|</span>
              <button 
                v-if="device.canRotate" 
                @click.stop="rotateDevice(device)"
                class="hover:text-blue-300 transition-colors flex items-center gap-1"
                title="切换横竖屏"
              >
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                {{ device.isLandscape ? '横屏' : '竖屏' }}
              </button>
              <span v-if="device.canRotate" class="opacity-50">|</span>
              <button @click.stop="toggleDeviceVisibility(device)" class="hover:text-red-400 transition-colors">关闭</button>
            </div>
          </div>

          <div v-if="device.type === 'desktop'" class="cursor-move">
            <div class="relative bg-gray-800 dark:bg-gray-700 rounded-t-xl border-[12px] border-gray-800 dark:border-gray-700 shadow-2xl">
              <div class="absolute top-[-8px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rounded-full z-10"></div>
              <div class="relative bg-white overflow-hidden w-[640px] h-[360px]">
                 <div v-if="!device.isInteractive" class="absolute inset-0 z-20 bg-transparent"></div>
                 <iframe 
                  :src="currentUrl" 
                  class="w-[1920px] h-[1080px] border-0 origin-top-left transform scale-[0.3333]"
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                ></iframe>
              </div>
              <div class="bg-gray-200 dark:bg-gray-600 h-8 rounded-b-md flex items-center justify-center border-t border-gray-300 dark:border-gray-500">
                 <div class="w-4 h-4 rounded-full bg-gray-400"></div>
              </div>
            </div>
            <div class="w-24 h-12 bg-gray-300 dark:bg-gray-600 shadow-inner mx-auto"></div>
            <div class="w-32 h-2 bg-gray-300 dark:bg-gray-600 rounded-full shadow-lg mx-auto"></div>
          </div>

          <div v-else-if="device.type === 'laptop'" class="cursor-move flex flex-col items-center animate-fade-in-up">
            <div class="relative bg-gray-800 rounded-t-xl border-[10px] border-gray-800 shadow-2xl">
              <div class="relative bg-white overflow-hidden w-[400px] h-[250px]"> <div v-if="!device.isInteractive" class="absolute inset-0 z-20 bg-transparent"></div>
                <iframe 
                  :src="currentUrl" 
                  class="w-[1280px] h-[800px] border-0 origin-top-left transform scale-[0.3125]" sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div class="w-[460px] h-3 bg-gray-300 dark:bg-gray-600 rounded-b-lg shadow-xl border-t border-gray-400 flex justify-center">
               <div class="w-16 h-1.5 bg-gray-400 rounded-b-md mt-[-1px]"></div>
            </div>
          </div>

          <div v-else-if="device.type === 'tablet'" class="cursor-move">
            <div 
              class="relative bg-gray-800 rounded-[1rem] p-1.5 shadow-2xl border border-gray-700 transition-all duration-500"
              :class="device.isLandscape ? 'w-[320px] h-[230px]' : 'w-[230px] h-[320px]'" >
              <div :class="[
                'absolute bg-gray-600 rounded-full z-10',
                device.isLandscape ? 'left-2 top-1/2 -translate-y-1/2 w-3 h-3' : 'top-2 left-1/2 -translate-x-1/2 w-3 h-3'
              ]"></div>
              
              <div class="relative bg-white overflow-hidden w-full h-full rounded-2xl">
                <div v-if="!device.isInteractive" class="absolute inset-0 z-20 bg-transparent"></div>
                <iframe 
                  :src="currentUrl" 
                  class="border-0 origin-top-left transition-all duration-500"
                  :style="{
                    width: device.isLandscape ? '1024px' : '768px',
                    height: device.isLandscape ? '768px' : '1024px',
                    transform: `scale(${device.isLandscape ? (230/768) : (230/768)})` // 调整缩放比例
                  }"
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          <div v-else-if="device.type === 'mobile'" class="cursor-move">
            <div 
              class="relative bg-gray-900 shadow-2xl border-1 border-gray-700 ring-2 ring-black transition-all duration-500"
              :class="[
                // 调整视觉尺寸 (宽度更小，高度相对更短)
                device.isLandscape ? 'w-[280px] h-[130px] rounded-[1rem] p-1' : 'w-[130px] h-[280px] rounded-[1rem] p-1'
              ]"
            >
              <div :class="[
                'absolute bg-black rounded-full z-30 flex justify-center items-center gap-2 pointer-events-none',
                device.isLandscape ? 'left-0 top-1/2 -translate-y-1/2 w-3 h-8 flex-col' : 'top-0 left-1/2 -translate-x-1/2 w-8 h-3'
              ]">
                  <div class="w-1.5 h-1.5 rounded-full bg-blue-900/50"></div>
              </div>

              <div 
                class="relative overflow-hidden w-full h-full bg-black transition-all flex flex-col" 
                :class="device.isLandscape ? 'rounded-[0.8rem] pl-0' : 'rounded-[0.8rem] pt-0 mt-0'" 
              >
                 <div v-if="!device.isInteractive" class="absolute inset-0 z-20 bg-transparent"></div>
                 
                 <div class="flex-1 w-full bg-white relative overflow-hidden rounded-t-lg">
                    <iframe 
                      :src="currentUrl" 
                      class="border-0 origin-top-left transition-all duration-500"
                      :style="{
                        width: device.isLandscape ? '844px' : '390px',
                        height: device.isLandscape ? '390px' : '844px',
                        // 修正后的缩放因子 (130 / 390 = 0.333)
                        transform: `scale(${device.isLandscape ? (130/390) : (130/390)})` 
                      }"
                      sandbox="allow-scripts allow-same-origin"
                      loading="lazy"
                    ></iframe>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Context Menu -->
      <div
        v-if="contextMenu.visible"
        :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }"
        class="fixed z-[9999] bg-white dark:bg-gray-800 shadow-xl rounded-md py-1 border border-gray-200 dark:border-gray-700 min-w-[120px]"
        @click.stop
      >
        <button
          @click="duplicateDevice"
          class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          复制设备
        </button>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue';

interface Device {
  id: string;
  type: string;
  name: string;
  icon: string;
  visible: boolean;
  x: number;
  y: number;
  zIndex: number;
  canRotate: boolean;
  isLandscape: boolean;
  isInteractive: boolean;
}

const inputUrl = ref('https://siyuan.ink');
const currentUrl = ref('');
const isDark = ref(false);
const maxZIndex = ref(10); // 用于管理层级

// 根据图片调整的初始设备状态和位置
const initialDevices: Device[] = [
  // Desktop - 中心偏右后方
  { id: 'desktop-1', type: 'desktop', name: 'Desktop', icon: "mgc_computer_line", visible: true, x: 300, y: 100, zIndex: 1, canRotate: false, isLandscape: true, isInteractive: false },
  // Laptop - 右下方，部分在Desktop下方
  { id: 'laptop-1', type: 'laptop', name: 'Laptop', icon: "mgc_laptop_line", visible: true, x: 750, y: 380, zIndex: 2, canRotate: false, isLandscape: true, isInteractive: false },
  // Tablet - 左前方
  { id: 'tablet-1', type: 'tablet', name: 'Tablet', icon: "mgc_pad_line", visible: true, x: 180, y: 380, zIndex: 3, canRotate: true, isLandscape: false, isInteractive: false },
  // Mobile - 左前方，部分在Tablet下方
  { id: 'mobile-1', type: 'mobile', name: 'Mobile', icon: "mgc_cellphone_line", visible: true, x: 380, y: 450, zIndex: 4, canRotate: true, isLandscape: false, isInteractive: false },
];

const devices = reactive<Device[]>(JSON.parse(JSON.stringify(initialDevices)));

// --- 核心功能逻辑 ---

const loadUrl = () => {
  if (!inputUrl.value) return;
  let url = inputUrl.value;
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  currentUrl.value = url;
};

const toggleDeviceVisibility = (device: Device) => {
  device.visible = !device.visible;
  if (device.visible) bringToFront(device);
};

const resetLayout = () => {
  // 恢复初始位置和可见性，并移除所有新增设备
  devices.splice(0, devices.length, ...JSON.parse(JSON.stringify(initialDevices)));
};

const rotateDevice = (device: Device) => {
  device.isLandscape = !device.isLandscape;
};

const contextMenu = reactive({
  visible: false,
  x: 0,
  y: 0,
  deviceId: ''
});

const showContextMenu = (event: MouseEvent, device: Device) => {
  contextMenu.visible = true;
  contextMenu.x = event.clientX;
  contextMenu.y = event.clientY;
  contextMenu.deviceId = device.id;
};

const closeContextMenu = () => {
  contextMenu.visible = false;
};

const duplicateDevice = () => {
  const device = devices.find(d => d.id === contextMenu.deviceId);
  if (device) {
    const newDevice = JSON.parse(JSON.stringify(device));
    newDevice.id = device.type + '-' + Date.now();
    newDevice.x += 30;
    newDevice.y += 30;
    newDevice.zIndex = ++maxZIndex.value;
    devices.push(newDevice);
  }
  closeContextMenu();
};

const toggleInteraction = (device: Device) => {
  device.isInteractive = !device.isInteractive;
};

// --- 拖拽系统实现 ---

let draggedDevice: Device | null = null;
let startX = 0;
let startY = 0;
let initialLeft = 0;
let initialTop = 0;

const bringToFront = (device: Device) => {
  maxZIndex.value++;
  device.zIndex = maxZIndex.value;
};

const startDrag = (event: MouseEvent, device: Device) => {
  // 如果点击的是内部按钮等交互元素，不触发拖拽
  if ((event.target as HTMLElement).closest('button')) return;
  
  draggedDevice = device;
  bringToFront(device);
  
  startX = event.clientX;
  startY = event.clientY;
  initialLeft = device.x;
  initialTop = device.y;
  
  event.preventDefault(); // 阻止默认行为防止选中文本
};

const onMouseMove = (event: MouseEvent) => {
  if (!draggedDevice) return;
  
  const dx = event.clientX - startX;
  const dy = event.clientY - startY;
  
  draggedDevice.x = initialLeft + dx;
  draggedDevice.y = initialTop + dy;
};

const stopDrag = () => {
  draggedDevice = null;
};

// 画布平移 (这里我们让画布不可平移，鼠标只用于拖拽设备)
const startPan = () => {
  // 阻止在画布背景上开始拖动，因为图片中的背景是静态的
};

onMounted(() => {
  window.addEventListener('click', closeContextMenu);
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});

onUnmounted(() => {
  window.removeEventListener('click', closeContextMenu);
});
</script>

<style scoped>
/* 移除点阵背景，使用纯白色背景 */
.bg-white {
  background-color: white;
}
.dark .bg-gray-900 {
  background-color: #1a202c; /* Tailwind gray-900 */
}
</style>