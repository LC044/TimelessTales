<template>
    <!-- 根容器：保持原始尺寸，通过外部传入的scale控制缩放 -->
  <div class="ticket-container" :style="{ transform: `scale(${scale})`, transformOrigin: 'top left'}">
    <div class="ticket relative text-[32px] text-gray-800 w-full max-w-[856px] h-[540px] rounded-[14px] shadow-[0_6px_24px_rgba(0,0,0,.12),0_2px_6px_rgba(0,0,0,.08)] border border-[#b8cfe0] overflow-hidden p-[5px_65px_0_50px]" 
        role="img" 
        aria-label="火车票">

      <!-- 顶部：票号/检票口 -->
      <div class="topbar flex items-center justify-between tracking-[0.3px]">
        <div class="serial text-[#e35757] font-semibold">{{ serial }}</div>
        <div class="gate">检票：{{ gate }}</div>
      </div>
      <div class="bgmain">
      <div class="h-[250px]">
        <!-- 主信息：出发站 / 车次 / 到达站 -->
        <div class="main grid grid-cols-[1fr_auto_1fr] gap-[10px] px-[0px_40px_0_20px]">
          <div class="station from items-center">
            <div class="flex items-end flex-grow-0">
              <div
                class="name text-[45px] tracking-[0.5px] max-w-[240px]"
                :class="{'two-char': fromStation.length === 2}"
              >
                {{ fromStation }}
              </div>
              <div class="big-fix px-[4px] py-[0px] text-[40px] self-start">站</div>
            </div>
            <div class="pinyin ml-[10px] text-[24px] text-[#3a5874]">{{ fromPinyin }}</div>
          </div>
          <div class="train-code text-center text-[50px] pb-0 flex items-center justify-center">{{ trainCode }}</div>
          <div class="station to items-center">
            <div class="flex items-end flex-grow-0">
              <div
                class="name text-[45px] tracking-[0.5px] max-w-[240px]"
                :class="{'two-char': toStation.length === 2}"
              >
                {{ toStation }}
              </div>
              <div class="big-fix px-[4px] py-[0px] text-[40px] self-start">站</div>
            </div>
            <div class="pinyin ml-[10px] text-[24px] text-[#3a5874]">{{ toPinyin }}</div>
          </div>
        </div>
        <!-- 第二行：时间 / 车厢座位 / 价格 / 座位类型 -->
        <div class="second-row flex justify-between pr-[120px]">
          <div class="datetime">{{ dateTime.year }}<span class="small-fix text-[24px]">年</span>{{ dateTime.month }}<span class="small-fix text-[24px]">月</span>{{ dateTime.day }}<span class="small-fix text-[24px]">日</span> {{ dateTime.time }} <span class="small-fix text-[24px]">开</span></div>
          <div class="seat">{{ carriage }}<span class="small-fix text-[24px]">车</span>{{ seatNumber }}<span class="small-fix text-[24px]">号</span></div>
        </div>
        <div class="second-row flex justify-between pr-[120px]">
          <div class="datetime">￥{{ price }}<span class="small-fix text-[24px]">元</span></div>
          <div class="seat">{{ seatType }}</div>
        </div>
      </div>
      <!-- 详情与二维码 -->
      <div class="detail-area relative grid grid-cols-[1fr_170px] gap-[16px]">
        <div>
          <p class="muted mt-[6px]">仅供报销使用</p>
          <div class="code">{{ idNumber }} {{ passengerName }}</div>
          <!-- 添加虚线边框,文字居中对齐 -->
          <div class="details text-[20px] text-center leading-[1.5] border-dashed border-[3px] border-[#999] mx-[28px]">
            <p>报销凭证 遗失不补</p>
            <p>退票改签时须交回车站</p>
          </div>
        </div>
        <!-- 二维码，放到右下角 -->
        <div class="qr self-end justify-self-end w-[148px] h-[148px] border-3 border-black bg-white p-[6px] shadow-[inset_0_0_0_3px_#fff]" aria-hidden="true">
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="120" fill="#fff"/>
            <!-- 三个定位符 -->
            <g fill="#000">
              <rect x="4" y="4" width="32" height="32"/>
              <rect x="8" y="8" width="24" height="24" fill="#fff"/>
              <rect x="12" y="12" width="16" height="16"/>

              <rect x="84" y="4" width="32" height="32"/>
              <rect x="88" y="8" width="24" height="24" fill="#fff"/>
              <rect x="92" y="12" width="16" height="16"/>

              <rect x="4" y="84" width="32" height="32"/>
              <rect x="8" y="88" width="24" height="24" fill="#fff"/>
              <rect x="12" y="92" width="16" height="16"/>
            </g>
            <!-- 随机模块 -->
            <g fill="#000">
              <rect x="48" y="8" width="4" height="4"/>
              <rect x="56" y="8" width="4" height="4"/>
              <rect x="64" y="8" width="4" height="4"/>
              <rect x="72" y="8" width="4" height="4"/>
              <rect x="48" y="16" width="4" height="4"/>
              <rect x="60" y="16" width="4" height="4"/>
              <rect x="68" y="16" width="4" height="4"/>
              <rect x="76" y="16" width="4" height="4"/>
              <rect x="44" y="24" width="4" height="4"/>
              <rect x="52" y="24" width="4" height="4"/>
              <rect x="60" y="24" width="4" height="4"/>
              <rect x="68" y="24" width="4" height="4"/>
              <rect x="76" y="24" width="4" height="4"/>
              <rect x="44" y="32" width="4" height="4"/>
              <rect x="52" y="32" width="4" height="4"/>
              <rect x="60" y="32" width="4" height="4"/>
              <rect x="72" y="32" width="4" height="4"/>
              <rect x="80" y="32" width="4" height="4"/>

              <rect x="44" y="44" width="4" height="4"/>
              <rect x="52" y="44" width="4" height="4"/>
              <rect x="60" y="44" width="4" height="4"/>
              <rect x="68" y="44" width="4" height="4"/>
              <rect x="84" y="44" width="4" height="4"/>
              <rect x="92" y="44" width="4" height="4"/>

              <rect x="48" y="52" width="4" height="4"/>
              <rect x="56" y="52" width="4" height="4"/>
              <rect x="64" y="52" width="4" height="4"/>
              <rect x="84" y="52" width="4" height="4"/>

              <rect x="48" y="60" width="4" height="4"/>
              <rect x="56" y="60" width="4" height="4"/>
              <rect x="64" y="60" width="4" height="4"/>
              <rect x="72" y="60" width="4" height="4"/>

              <rect x="44" y="68" width="4" height="4"/>
              <rect x="52" y="68" width="4" height="4"/>
              <rect x="60" y="68" width="4" height="4"/>
              <rect x="68" y="68" width="4" height="4"/>
              <rect x="76" y="68" width="4" height="4"/>
              <rect x="84" y="68" width="4" height="4"/>

              <rect x="48" y="76" width="4" height="4"/>
              <rect x="56" y="76" width="4" height="4"/>
              <rect x="64" y="76" width="4" height="4"/>
              <rect x="72" y="76" width="4" height="4"/>
              <rect x="84" y="76" width="4" height="4"/>

              <rect x="44" y="84" width="4" height="4"/>
              <rect x="52" y="84" width="4" height="4"/>
              <rect x="72" y="84" width="4" height="4"/>
              <rect x="80" y="84" width="4" height="4"/>
              <rect x="88" y="84" width="4" height="4"/>

              <rect x="44" y="92" width="4" height="4"/>
              <rect x="60" y="92" width="4" height="4"/>
              <rect x="68" y="92" width="4" height="4"/>
              <rect x="76" y="92" width="4" height="4"/>
              <rect x="84" y="92" width="4" height="4"/>

              <rect x="52" y="100" width="4" height="4"/>
              <rect x="60" y="100" width="4" height="4"/>
              <rect x="68" y="100" width="4" height="4"/>
              <rect x="76" y="100" width="4" height="4"/>
            </g>
          </svg>
        </div>
      </div>
      </div>


      <!-- 底部出票信息，放到最下边 -->
      <div class="footer absolute w-[856px] left-[-50px] bottom-[-8px] h-[65px] flex justify-between items-center bg-[#94CAE0] text-[25px] text-[#2a2a2a]">
        <div class="from px-[50px]">{{ footerInfo }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps,ref,computed } from 'vue';

// 定义组件属性，所有参数都设置了默认值
const props = defineProps({
   // 缩放比例（0.1-2.0之间较合理，避免过度模糊）
  scale: {
    type: Number,
    default: 1,
    validator: (value) => {
      return value > 0 && value <= 2; // 限制缩放范围，避免过度失真
    }
  },
  // 票号
  serial: {
    type: String,
    default: '192J093984'
  },
  // 检票口
  gate: {
    type: String,
    default: '8B'
  },
  // 出发站
  fromStation: {
    type: String,
    default: '上海虹桥'
  },
  // 出发站拼音
  fromPinyin: {
    type: String,
    default: 'Shanghaihongqiao'
  },
  // 到达站
  toStation: {
    type: String,
    default: '西安北'
  },
  // 到达站拼音
  toPinyin: {
    type: String,
    default: 'Xi\'anbei'
  },
  // 车次
  trainCode: {
    type: String,
    default: 'G1925'
  },
  // 日期时间
  dateTime: {
    type: String,
    default: '2017-06-06 16:46'
  },
  // 车厢号
  carriage: {
    type: String,
    default: '03'
  },
  // 座位号
  seatNumber: {
    type: String,
    default: '04D'
  },
  // 价格
  price: {
    type: String,
    default: '239.0'
  },
  // 座位类型
  seatType: {
    type: String,
    default: '二等座'
  },
  // 身份证号
  idNumber: {
    type: String,
    default: '14041111985****0854'
  },
  // 乘客姓名
  passengerName: {
    type: String,
    default: '李小二'
  },
  // 底部出票信息
  footerInfo: {
    type: String,
    default: '65773311920607J093984　郑州东售'
  }
});

// 2017-06-06 16:46 拆分成年、月、日、时间四个属性
const dateTime =  computed(() => {
  return {
    year: props.dateTime.slice(0, 4),
    month: props.dateTime.slice(5, 7),
    day: props.dateTime.slice(8, 10),
    time: props.dateTime.slice(11)
  };
});


</script>

<style scoped>
/* 确保内容在水印上方 */
.ticket > * {
  position: relative;
  z-index: 1;
}

/* 解决缩放后可能的模糊问题（优化文字渲染） */
.ticket {
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  position: relative;
  /* 移除自身背景色，改用伪元素同时承载底色+条纹（避免覆盖） */
}

.ticket::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1; /* 确保在内容下方，但在无其他背景覆盖 */
  
  /* 合并：先设置底色，再叠加条纹 */
  background-color: #e8f3f7; /* 票证基础底色 */
  background-image: 
    linear-gradient(
      -45deg, 
      rgba(180, 200, 220, 0.3) 1px, 
      transparent 1px, 
      transparent 4px 
    );
  background-size: 4px 4px; /* 条纹密度 */
}

/* 用伪元素单独承载背景图，便于控制透明度 */
.bgmain::before {
  content: "";
  position: absolute;
  inset: 0; /* 覆盖整个元素，但仅显示图片部分 */
  z-index: -2; /* 置于内容下方，不遮挡文字 */
  opacity: 0.05;
  /* 核心设置：保持图片原始比例，仅在底部显示 */
  background-image: url('./CRH-Dr3OhT7q.jpg');
  background-size: contain; /* 关键：保持图片原始宽高比，不拉伸 */
  background-repeat: no-repeat; /* 不重复 */
  background-position: bottom; /* 图片固定在元素底部 */
}
/* 2字时的两端对齐样式 */
.two-char {
  /* 宽度：按单字~45px估算，2字总宽≈90px（可根据实际字体微调） */
  min-width: 145px;
  /* 文本两端对齐 */
  text-align: justify;
  text-align-last: justify;
}
</style>