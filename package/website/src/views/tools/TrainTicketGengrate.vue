<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 transition-colors duration-300">
    <!-- 主要内容区域：减小max-width和间距 -->
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- 表单编辑区：压缩内边距和间距 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 transition-colors duration-300">
          <form @submit.prevent="handleSaveImage" class="space-y-3">
            <!-- 1. 出发/到达信息 -->
            <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h3 class="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                <span class="w-5 h-5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mr-2 text-xs">
                  🚄
                </span>
                出发/到达
              </h3>
              <!-- 优化网格间距 -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">出发站</label>
                  <input 
                    v-model="form.fromStation" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：上海虹桥"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">出发站拼音</label>
                  <input 
                    v-model="form.fromPinyin"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="shanghaihongqiao"
                    pattern="[a-zA-Z]+"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">到达站</label>
                  <input
                    v-model="form.toStation"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：南京南"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">到达站拼音</label>
                  <input
                    v-model="form.toPinyin"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="nanjingnan"
                    pattern="[a-zA-Z]+"
                    required
                  >
                </div>
              </div>
            </div>

            <!-- 2. 车次/时间信息 -->
            <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h3 class="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                <span class="w-5 h-5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mr-2 text-xs">
                  🕒
                </span>
                车次/时间
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">车次</label>
                  <input
                    v-model="form.trainCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：G2025"
                    pattern="[GDKZT][0-9]+"
                    title="以G/D/K/Z/T开头，后接数字"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">日期时间</label>
                  <input
                    v-model="form.dateTime"
                    type="datetime-local"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    @change="formatDateTime"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">检票口</label>
                  <input 
                    v-model="form.gate" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：5A"
                    pattern="[0-9]+[A-Za-z]"
                    title="数字+字母格式，例5A、12B"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">座位类型</label>
                  <select 
                    v-model="form.seatType" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none text-sm"
                    required
                  >
                    <option value="一等座">一等座</option>
                    <option value="二等座">二等座</option>
                    <option value="商务座">商务座</option>
                    <option value="无座">无座</option>
                    <option value="硬座">硬座</option>
                    <option value="软座">软座</option>
                    <option value="特等座">特等座</option>
                    <option value="软卧">软卧</option>
                    <option value="硬卧">硬卧</option>
                    <option value="动卧">动卧</option>
                    <option value="高级软卧">高级软卧</option>
                    <option value="一等卧">一等卧</option>
                    <option value="二等卧">二等卧</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 3. 座位/价格信息 -->
            <div class="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h3 class="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                <span class="w-5 h-5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mr-2 text-xs">
                  💺
                </span>
                座位/价格
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">车厢号</label>
                  <input 
                    v-model="form.carriage" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：07"
                    pattern="[0-9]{1,2}"
                    title="1-2位数字，例7、12"
                    required
                  >
                </div>
                <!-- 铺位类型选择 -->
                <div class="form-group" v-if="sleeperTypes.includes(form.seatType)">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">铺位类型</label>
                  <select 
                    v-model="form.berthType" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none text-sm"
                    required
                  >
                    <option value="">选择铺位</option>
                    <option value="上">上铺</option>
                    <option value="中">中铺</option>
                    <option value="下">下铺</option>
                  </select>
                </div>
                <div class="form-group">
                  <label v-if="sleeperTypes.includes(form.seatType)" class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">铺位号</label>
                  <label v-else class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">座位号</label>
                  <input 
                    v-model="form.seatNumber" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：12F"
                    pattern="[0-9]{1,2}[A-Fa-f]"
                    title="1-2位数字+A-F字母，例12F、5A"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">票价（元）</label>
                  <input
                    v-model="form.price"
                    type="number"
                    step="0.5"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：443.5"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">票号</label>
                  <input
                    v-model="form.serial"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：283K104567"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">优惠类型</label>
                  <select
                    v-model="form.discountType"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none text-sm"
                  >
                    <option value="">无优惠</option>
                    <option value="student">学生票（学+惠）</option>
                    <option value="child">儿童票（儿）</option>
                    <option value="military">残疾军人票（军）</option>
                    <option value="disabled">残疾人票（残）</option>
                    <option value="elder">老人优惠票（老）</option>
                    <option value="discount">普通优惠票（惠）</option>
                    <option value="group">团体票（团）</option>
                    <option value="worker-group">务工团体票（工）</option>
                    <option value="student-group">学生团体票（学+团）</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 4. 乘客/售票信息 -->
            <div>
              <h3 class="text-base font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center">
                <span class="w-5 h-5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mr-2 text-xs">
                  🧑
                </span>
                乘客/售票
              </h3>
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">乘客姓名</label>
                  <input
                    v-model="form.passengerName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：张三"
                    required
                  >
                </div>
                <div class="form-group">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">身份证号</label>
                  <input
                    v-model="form.idNumber"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：3201021990****5678"
                    title="18位身份证号，最后一位可填X"
                    required
                  >
                </div>
                <div class="form-group col-span-1">
                  <label class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">底部售票信息</label>
                  <input 
                    v-model="form.footerInfo" 
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    placeholder="例：65773311920607K104567　北京南售"
                    required
                  >
                </div>
              </div>
            </div>

            <!-- 保存按钮：减小尺寸和间距 -->
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mt-3 flex items-center justify-center gap-2 text-base shadow-md shadow-blue-500/20"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              保存为图片
            </button>
          </form>
        </div>
        <!-- 预览区：压缩尺寸和间距 -->
         <!-- 预览区：压缩尺寸和间距 -->
        <div class="bg-white flex flex-col dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 transition-colors duration-300">
          <!-- 标题 + 二选一样式按钮 -->
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-base font-semibold text-gray-700 dark:text-gray-200 flex items-center">
              <span class="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-2 text-xs">
                👀
              </span>
              实时预览
            </h3>
            <!-- 二选一样式按钮组：紧凑并排 -->
            <div class="flex gap-1.5">
              <button
                @click="selectedStyle = 'red'"
                class="px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center justify-center"
                :class="selectedStyle === 'red' 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'"
              >
                红色样式
              </button>
              <button
                @click="selectedStyle = 'blue'"
                class="px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center justify-center"
                :class="selectedStyle === 'blue' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'"
              >
                蓝色样式
              </button>
            </div>
          </div>
          <!-- 优化预览区缩放 -->
          <div class="preview-container flex-grow flex items-center justify-center">
            <div class="w-full">
              <TrainTicket
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
                :berthType="form.berthType"
                :price="form.price"
                :seatType="form.seatType"
                :idNumber="form.idNumber"
                :passengerName="form.passengerName"
                :footerInfo="form.footerInfo"
                :discountType="form.discountType"
                :style="selectedStyle"
              />
            </div>
          </div>
          <!-- 隐藏的原始尺寸车票，保持功能不变 -->
          <div 
            class="fixed top-0 left-0 w-[856px] h-[540px] bg-white z-[-1] opacity-0 pointer-events-none"
            id="hidden-ticket-area"
          >
            <TrainTicket
              ref="hiddenTicketRef"
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
              :berthType="form.berthType"
              :price="form.price"
              :seatType="form.seatType"
              :idNumber="form.idNumber"
              :passengerName="form.passengerName"
              :footerInfo="form.footerInfo"
              :discountType="form.discountType"
              :style="selectedStyle"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import TrainTicket from '@/components/TrainTicket.vue';
import { toPng } from "html-to-image";
const selectedStyle = ref('blue');
// 表单初始数据（保持不变）
const form = reactive({
  serial: '283K104567',
  gate: '5A',
  fromStation: '上海虹桥',
  fromPinyin: 'Shanghaihongqiao',
  toStation: '南京南',
  toPinyin: 'Nanjingnan',
  trainCode: 'G2025',
  dateTime: '2023-10-01 08:30',
  carriage: '07',
  seatNumber: '12F',
  price: '443.5',
  seatType: '一等座',
  idNumber: '3201021990****5678',
  passengerName: '张三',
  footerInfo: '65773311920607K104567 北京南售',
  discountType: '',
  berthType: '',
  berthNumber: '',
});

// 定义卧铺类型列表
const sleeperTypes = ref([
  '软卧', '硬卧', '动卧', '高级软卧', '一等卧', '二等卧'
]);

// 监听座位类型变化，重置铺位信息
watch(() => form.seatType, (newVal) => {
  if (!sleeperTypes.value.includes(newVal)) {
    form.berthType = '';
    form.berthNumber = '';
  }
});

// 计算最终座位号
const finalSeatNumber = computed(() => {
  if (sleeperTypes.value.includes(form.seatType) && form.berthNumber && form.berthType) {
    return `${form.berthNumber}${form.berthType}`;
  }
  return form.seatNumber;
});

// 火车票组件ref
const hiddenTicketRef = ref(null);

// 保存图片逻辑（保持不变）
const handleSaveImage = async () => {
  try {
    const node = hiddenTicketRef.value?.$el;
    const dataUrl = await toPng(node, {
      cacheBust: true,
      backgroundColor: "#fff",
      quality: 1,
      pixelRatio: 3,
    });

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${form.trainCode}_${form.passengerName}_火车票.png`;
    link.click();
    link.remove();
  } catch (error) {
    alert('图片保存失败，请重试！');
    console.error('保存图片错误：', error);
  }
};

// 日期时间格式化（补充缺失的方法）
const formatDateTime = (e) => {
  if (e.target.value) {
    // 转换为YYYY-MM-DD HH:mm格式
    form.dateTime = e.target.value.replace('T', ' ');
  }
};
</script>

<style lang="css">
/* 优化预览区样式 */
.preview-container {
  width: 100%;
  overflow: hidden;
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .preview-container {
    max-width: 90vw;
    margin: 0 auto;
  }
}

/* 减小表单元素默认间距 */
.form-group {
  margin-bottom: 0;
}

/* 优化选择框样式，使其更紧凑 */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23374151' viewBox='0 0 16 16'%3E%3Cpath d='M8 11l4-4H4l4 4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 12px;
}
</style>