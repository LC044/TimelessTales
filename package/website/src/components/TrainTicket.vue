<template>
  <div ref="wrapper" class="export-target">
  <!-- 外层自动适配比例的容器 -->
  <div class="ticket-wrapper">
    <!-- 根容器：保持原始尺寸，通过内部scale计算自动缩放 -->
    <div
      class="ticket-container"
      :style="{
        transform: exporting ? 'none' : `scale(${scale})`,
        transformOrigin: 'top left',
        width: BASE_WIDTH + 'px',
        height: BASE_HEIGHT + 'px'
      }"
    >
      <div
        class="ticket relative text-[32px] text-gray-800 w-full h-full rounded-[14px] shadow-[0_6px_24px_rgba(0,0,0,.12),0_2px_6px_rgba(0,0,0,.08)] border border-[#b8cfe0] overflow-hidden p-[5px_65px_0_50px]" 
        role="img"
        aria-label="火车票">

        <!-- 顶部：票号/检票口 -->
        <div class="topbar flex items-center justify-between tracking-[0.3px]">
          <div class="serial text-[#e35757] font-semibold">{{ serial }}</div>
          <div class="gate">检票：{{ gate }}</div>
        </div>

        <div class="bgmain">
          <div
            class="absolute inset-0 z-[-2] opacity-5 bg-bottom bg-no-repeat bg-contain"
            :style="{ backgroundImage: 'url(/CRH-Dr3OhT7q.jpg)' }"
          ></div>
          <div class="h-[250px]">
            <!-- 主信息：出发站 / 车次 / 到达站 -->
            <div class="main grid grid-cols-[1fr_auto_1fr] gap-[10px] px-[0px_40px_0_20px] items-center">
              <div class="station flex flex-col from items-center">
                <div class="flex items-center flex-grow-0">
                  <div
                    class="name text-[45px] tracking-[0.5px] max-w-[240px]"
                    :class="{'two-char': fromStation.length === 2}"
                  >
                    {{ fromStation }}
                  </div>
                  <div class="big-fix px-[4px] py-[0px] text-[35px]">站</div>
                </div>
                <div class="pinyin ml-[10px] text-[24px]">{{ fromPinyin }}</div>
              </div>
              <!-- 中间列：车次 + 箭头 -->
            <div class="train-center flex flex-col items-center justify-center">
              <div class="train-code text-center text-[50px] leading-none pb-1">
                {{ trainCode }}
              </div>
              <!-- 箭头 -->
              <!-- CSS 箭头 -->
              <div class="arrow mt-[6px] relative h-3 w-full">
                <div class="line h-[4px] bg-gray-600 w-full"></div>
                <div class="arrow-head absolute right-0 top-[-7px] h-4 w-4 border-t-[4px] border-gray-600 rotate-45"></div>
              </div>
            </div>
              <div class="station to flex flex-col items-center">
                <div class="flex items-center flex-grow-0">
                  <div
                    class="name text-[45px] tracking-[0.5px] max-w-[240px]"
                    :class="{'two-char': toStation.length === 2}"
                  >
                    {{ toStation }}
                  </div>
                  <div class="big-fix px-[4px] py-[0px] text-[35px]">站</div>
                </div>
                <div class="pinyin ml-[10px] text-[24px]">{{ toPinyin }}</div>
              </div>
            </div>

            <!-- 第二行：时间 / 车厢座位 / 价格 / 座位类型 -->
            <div class="second-row flex justify-between pr-[100px]">
              <div class="datetime">
                {{ dateTime.year }}
                <span class="small-fix text-[24px]">年</span>
                {{ dateTime.month }}
                <span class="small-fix text-[24px]">月</span>
                {{ dateTime.day }}
                <span class="small-fix text-[24px]">日</span>
                {{ dateTime.time }}
                <span class="small-fix text-[24px]">开</span>
              </div>
              <div class="seat">{{ carriage }}<span class="small-fix text-[24px]">车</span>{{ seatNumber }}<span class="small-fix text-[24px]">号</span><span v-if="berthType">{{ berthType }}</span><span v-if="berthType" class="small-fix text-[24px]">铺</span></div>
            </div>
            <!-- 价格和座位类型行：添加优惠标识 -->
            <div class="second-row flex justify-between pr-[100px] items-center">
              <div class="datetime flex items-center gap-[12px]">
                ￥{{ price }}<span class="small-fix text-[24px]">元</span>
              </div>
              <div>
                <!-- 优惠标识 -->
                <span v-for="(text, index) in discountTexts" :key="index" class="discount-badge">{{ text }}</span>
              </div>
              <div class="seat flex items-center gap-[12px]">
                {{ seatType }}
              </div>
            </div>
          </div>

          <!-- 详情与二维码 -->
          <div class="detail-area relative grid grid-cols-[1fr_170px] gap-[16px]">
            <div>
              <p class="muted mt-[6px]">仅供报销使用</p>
              <div class="code">{{ idNumber }} {{ passengerName }}</div>
              <!-- 虚线框 -->
              <div class="details text-[20px] text-center leading-[1.5] border-dashed border-[3px] border-[#999] mx-[28px]">
                <p>报销凭证 遗失不补</p>
                <p>退票改签时须交回车站</p>
              </div>
            </div>

            <!-- 二维码 -->
            <div class="qr self-end justify-self-end w-[148px] h-[148px] border-black  p-[6px] " aria-hidden="true">
              <!-- 简化二维码 -->
              <img src="@/assets/qrcode.png" alt="二维码" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <!-- 底部出票信息 -->
        <div class="footer absolute w-[856px] left-[-50px] bottom-[-8px] h-[65px] flex justify-between items-center bg-[#94CAE0] text-[25px] text-[#2a2a2a]">
          <div class="from px-[50px]">{{ footerInfo }}</div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>

import { ref, computed, onMounted, onUnmounted } from 'vue'

// 基础尺寸
const BASE_WIDTH = 856
const BASE_HEIGHT = 540

const wrapper = ref(null)
const scale = ref(1)
const exporting = ref(false)

// 自适应缩放
function updateScale() {
  if (wrapper.value) {
    const width = wrapper.value.clientWidth
    scale.value = width / BASE_WIDTH
    console.log('Updated scale:', scale.value)
    console.log('Wrapper width:', width)
  }
}
onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})

// 定义属性
const props = defineProps({
  serial: { type: String, default: '192J093984' },
  gate: { type: String, default: '8B' },
  fromStation: { type: String, default: '上海虹桥' },
  fromPinyin: { type: String, default: 'Shanghaihongqiao' },
  toStation: { type: String, default: '西安北' },
  toPinyin: { type: String, default: "Xi'anbei" },
  trainCode: { type: String, default: 'G1925' },
  dateTime: { type: String, default: '2017-06-06 16:46' },
  carriage: { type: String, default: '03' },
  seatNumber: { type: String, default: '04D' },
  berthType: { type: String, default: '' },
  berthNumber: { type: String, default: '' },
  price: { type: String, default: '239.0' },
  seatType: { type: String, default: '二等座' },
  idNumber: { type: String, default: '14041111985****0854' },
  passengerName: { type: String, default: '李小二' },
  footerInfo: { type: String, default: '65773311920607J093984　郑州东售' },
  // 修改：支持传入数组（多个优惠类型）或字符串（单个优惠类型）
  discountType: {
    type: [String, Array],
    default: '',
    validator: (value) => {
      // 允许的优惠类型（支持单个或数组）
      const validTypes = ['student', 'discount', 'child', 'elder', 'military', 'disabled', 'group', 'worker-group', 'student-group', '']
      if (Array.isArray(value)) {
        return value.every(item => validTypes.includes(item))
      }
      return validTypes.includes(value)
    }
  }
})

// 拆分时间
const dateTime = computed(() => {
  return {
    year: props.dateTime.slice(0, 4),
    month: props.dateTime.slice(5, 7),
    day: props.dateTime.slice(8, 10),
    time: props.dateTime.slice(11)
  }
})

// 修改：计算优惠显示文字（支持多个）
const discountTexts = computed(() => {
  const texts = []
  const types = Array.isArray(props.discountType) ? props.discountType : props.discountType ? [props.discountType] : []
  
  types.forEach(type => {
    switch(type) {
      case 'student':
        texts.push('学', '惠') // 学生票同时添加"学"和"惠"
        break
      case 'discount':
        texts.push('惠')
        break
      case 'child':
        texts.push('儿')
        break
      case 'elder':
        texts.push('老')
        break
      case 'military':
        texts.push('军')
        break
      case 'disabled':
        texts.push('残')
        break
      case 'group':
        texts.push('团')
        break
      case 'worker-group':
        texts.push('工')
        break
      case 'student-group':
        texts.push('学', '团')
        break
      default:
        // 支持直接传入文字（如['优', '惠']）
        if (type && !validTypes.includes(type)) {
          texts.push(type)
        }
    }
  })
  return texts
})

defineExpose({ wrapper, exporting  }) // ✅ 暴露内部DOM给父组件访问
</script>

<style scoped>
.export-target {
  transform: scale(1); /* 确保导出是原始比例 */
}
.ticket-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
  aspect-ratio: 856 / 540; /* 保持原始宽高比 */
}

.ticket-container {
  transform-origin: top left;
  transition: transform 0.2s ease;
}

/* 票样式 */
.ticket > * {
  position: relative;
  z-index: 1;
}
.ticket {
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  position: relative;
}

/* 背景条纹 */
.ticket::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-color: #e8f3f7;
  background-image: linear-gradient(
    -45deg,
    rgba(180, 200, 220, 0.3) 1px,
    transparent 1px,
    transparent 4px
  );
  background-size: 4px 4px;
}

/* 背景图 */
/* .bgmain::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  opacity: 0.05;
  background-image: url('/CRH-Dr3OhT7q.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
} */

/* 两字站名样式 */
.two-char {
  min-width: 145px;
  text-align: justify;
  text-align-last: justify;
}
.train-arrow {
  width: 100%; /* 与“G2025”文字宽度完全一致 */
  height: 0;
  border-left: 8px solid transparent; /* 左透明边框（数值越小箭头越细） */
  border-right: 8px solid transparent; /* 右透明边框（与左边数值一致） */
  border-top: 8px solid #3a5874; /* 箭头颜色（与拼音同色） */
  margin-top: 6px; /* 箭头与文字的间距（可按需调整） */
}
/* 新增：优惠标识圆圈样式 */
.discount-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 3px solid #1f1d1d;
  border-radius: 50%;
  font-size: 24px;
  /* font-weight: 600; */
  line-height: 1;
  text-align: center;
  /* background-color: rgba(227, 87, 87, 0.08); */
}
</style>
