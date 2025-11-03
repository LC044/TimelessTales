<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-colors duration-300">
    <!-- 页面标题 -->
    <h1 class="text-[clamp(1.5rem,5vw,2.5rem)] font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
      火车票信息编辑
    </h1>
    
    <!-- 深色模式切换按钮 -->
    <div class="flex justify-center mb-6">
      <button 
        @click="toggleDarkMode"
        class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
        aria-label="切换深色模式"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </button>
    </div>
    
    <!-- 主要内容区域：桌面端左右布局，移动端上下布局 -->
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 表单编辑区：桌面端在左侧 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 transition-colors duration-300">
          <form @submit.prevent="handleSaveImage" class="space-y-5">
            <!-- 1. 出发/到达信息 -->
            <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center">
                <span class="w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mr-2 text-sm">
                  🚄
                </span>
                出发/到达
              </h3>
              <!-- 移动端单列，平板以上双列 -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">出发站</label>
                  <input 
                    v-model="form.fromStation" 
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：上海虹桥"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">出发站拼音（全小写）</label>
                  <input 
                    v-model="form.fromPinyin" 
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：shanghaihongqiao"
                    pattern="[a-z]+"
                    title="仅允许小写字母"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">到达站</label>
                  <input
                    v-model="form.toStation"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：南京南"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">到达站拼音（全小写）</label>
                  <input
                    v-model="form.toPinyin"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：nanjingnan"
                    pattern="[a-z]+"
                    title="仅允许小写字母"
                    required
                  >
                </div>
              </div>
            </div>

            <!-- 2. 车次/时间信息 -->
            <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center">
                <span class="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mr-2 text-sm">
                  🕒
                </span>
                车次/时间
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">车次</label>
                  <input
                    v-model="form.trainCode"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：G2025"
                    pattern="[GDKZT][0-9]+"
                    title="以G/D/K/Z/T开头，后接数字"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">日期时间</label>
                  <input
                    v-model="form.dateTime"
                    type="datetime-local"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    @change="formatDateTime"
                    required
                  >
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">选择后自动格式化为“YYYY年MM月DD日 HH:MM”</p>
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">检票口</label>
                  <input 
                    v-model="form.gate" 
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：5A"
                    pattern="[0-9]+[A-Za-z]"
                    title="数字+字母格式，例5A、12B"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">座位类型</label>
                  <select 
                    v-model="form.seatType" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                    required
                  >
                    <option value="一等座">一等座</option>
                    <option value="二等座">二等座</option>
                    <option value="商务座">商务座</option>
                    <option value="无座">无座</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 3. 座位/价格信息 -->
            <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center">
                <span class="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mr-2 text-sm">
                  💺
                </span>
                座位/价格
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">车厢号</label>
                  <input 
                    v-model="form.carriage" 
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：07"
                    pattern="[0-9]{1,2}"
                    title="1-2位数字，例7、12"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">座位号</label>
                  <input 
                    v-model="form.seatNumber" 
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：12F"
                    pattern="[0-9]{1,2}[A-Fa-f]"
                    title="1-2位数字+A-F字母，例12F、5A"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">票价（元）</label>
                  <input 
                    v-model="form.price" 
                    type="number" 
                    step="0.5" 
                    min="0"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：443.5"
                    required
                  >
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">支持小数点后1位，例443或443.5</p>
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">票号</label>
                  <input 
                    v-model="form.serial" 
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：283K104567"
                    required
                  >
                </div>
              </div>
            </div>

            <!-- 4. 乘客/售票信息 -->
            <div>
              <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center">
                <span class="w-6 h-6 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mr-2 text-sm">
                  🧑
                </span>
                乘客/售票
              </h3>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">乘客姓名</label>
                  <input
                    v-model="form.passengerName"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：张三"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">身份证号</label>
                  <input
                    v-model="form.idNumber"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：3201021990****5678"
                    title="18位身份证号，最后一位可填X"
                    required
                  >
                </div>
                <div class="form-group col-span-1">
                  <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">底部售票信息</label>
                  <input 
                    v-model="form.footerInfo" 
                    type="text" 
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="例：65773311920607K104567　北京南售"
                    required
                  >
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">格式：一串数字+“　XX售”（中间为全角空格）</p>
                </div>
              </div>
            </div>

            <!-- 保存图片按钮：移动端更大点击区域 -->
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-medium transition-colors mt-4 flex items-center justify-center gap-2 text-lg shadow-lg shadow-blue-500/20"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              保存火车票为图片
            </button>
          </form>
        </div>
        <!-- 预览区：桌面端在右侧 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 transition-colors duration-300">
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
            <span class="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-2 text-sm">
              👀
            </span>
            实时预览
          </h3>
          <div class="flex ticket-container" ref="ticketContainer">
            <!-- 火车票组件：根据屏幕尺寸动态调整缩放比例 -->
            <TrainTicket class="ticketRef"
              ref="ticketRef"
              :scale="ticketScale"
              :serial="form.serial"
              :gate="form.gate"
              :fromStation="form.fromStation"
              :fromPinyin="form.fromPinyin"
              :toStation="form.toStation"
              :toPinyin="form.toPinyin"
              :trainCode="form.trainCode"
              :dateTime="form.dateTime"
              :carriage="form.carriage"
              :seatNumber="form.seatNumber"
              :price="form.price"
              :seatType="form.seatType"
              :idNumber="form.idNumber"
              :passengerName="form.passengerName"
              :footerInfo="form.footerInfo"
              :is-dark="isDarkMode"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import TrainTicket from '@/components/TrainTicket.vue';
import html2canvas from 'html2canvas';

// 判断是否为移动设备
const isMobile = ref(false);

// 监听窗口大小变化，动态更新设备类型
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 640; // 小于sm断点(640px)判定为移动端
};

// 火车票宽度和缩放比例
const ticketWidth = ref(0);
const ticketScale = ref(1);

// 计算火车票宽度和缩放比例
const calculateTicketDimensions = () => {
  if (ticketContainer.value) {
    // 获取容器宽度
    const containerWidth = ticketContainer.value.offsetWidth;
    // 计算火车票宽度为容器宽度的80%
    const newWidth = Math.min(containerWidth,800);
    ticketWidth.value = newWidth;
    // 计算缩放比例：火车票宽度 / 856
    ticketScale.value = newWidth / 856;
  }
};

// 初始化时检查一次
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);

  // 初始计算尺寸
  nextTick(() => {
    calculateTicketDimensions();
    // 监听窗口大小变化，重新计算尺寸
    window.addEventListener('resize', calculateTicketDimensions);
  });
});

// 表单初始数据
const form = reactive({
  serial: '283K104567',
  gate: '5A',
  fromStation: '上海虹桥',
  fromPinyin: 'shanghaihongqiao',
  toStation: '南京南',
  toPinyin: 'nanjingnan',
  trainCode: 'G2025',
  dateTime: '2023-10-01 08:30',
  carriage: '07',
  seatNumber: '12F',
  price: '443.5',
  seatType: '一等座',
  idNumber: '3201021990****5678',
  passengerName: '张三',
  footerInfo: '65773311920607K104567 北京南售'
});

// 火车票组件ref
const ticketRef = ref(null);
const ticketContainer = ref(null);
// 格式化日期时间
const formatDateTime = () => {
};

// 修正保存图片的逻辑
const handleSaveImage = async () => {
  try {
    // 1. 等待DOM完全更新（增加延迟确保渲染完成）
    await new Promise(resolve => setTimeout(resolve, 500)); // 延迟500ms，确保组件渲染

    // 2. 获取外层容器的DOM（比直接获取组件根元素更稳定）
    const ticketDom = ticketContainer.value;
    if (!ticketDom) {
      alert('未找到火车票元素，请重试');
      return;
    }

    // 3. 调整html2canvas配置，解决克隆问题
    const canvas = await html2canvas(ticketDom, {
      scale: isMobile.value ? 3 : 2,
      useCORS: true,
      allowTaint: true, // 允许跨域图片（如果有）
      logging: false,
      scrollX: 0, // 避免滚动偏移导致元素丢失
      scrollY: 0,
      windowWidth: ticketDom.offsetWidth,
      windowHeight: ticketDom.offsetHeight,
      ignoreElements: (el) => {
        // 忽略可能干扰的隐藏元素
        return el.style.display === 'none';
      }
    });

    // 4. 生成并下载图片
    const imgUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = `${form.trainCode}_${form.passengerName}_火车票.png`;
    link.click();
    link.remove();
  } catch (error) {
    alert('图片保存失败，请重试！');
    console.error('保存图片错误：', error);
  }
};
</script>