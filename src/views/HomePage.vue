<template>
    <div class="mx-auto mt-20 min-w-0 max-w-7xl overflow-hidden lg:mt-[-4.5rem] lg:h-dvh lg:min-h-[800px] lg:px-8">
      <div class="relative mx-auto block size-full min-w-0 max-w-[1800px] flex-col flex-wrap items-center lg:flex lg:flex-row">
        <div class="hero-content item">
            <h2 class="greeting p-2 text-4xl">Hi, I’m <span class="font-bold">SiYuan</span> <span class="wave">👋</span></h2>
            <h1 class="title p-2 text-4xl">An undergraduate student </h1>
            <p class="subtitle p-2 text-4xl">studying computer science with a research focus on databases.</p>

            <!-- 社交链接/图标列表 -->
            <ul class="social-links">
                <li class="center flex aspect-square size-10 text-4xl rounded-full">
                  <a href="https://github.com/LC044" target="_blank" rel="noreferrer">
                    <i class="mgc_github_2_line text-light-text1"></i>
                  </a>
                </li>
                <li class="center flex aspect-square size-10 text-4xl rounded-full text-white">
                  <a href="mailto:sixyuan044@gmail.com" target="_blank" rel="noreferrer">
                    <i class="mgc_mailbox_line text-light-text1"></i>
                  </a>
                </li>
                <li class="center flex aspect-square size-10 text-4xl rounded-full text-white">
                  <a href="https://blog.lc044.love" target="_blank" rel="noreferrer">
                    <i class="mgc_comment_2_line text-light-text1"></i>
                  </a>
                </li>
                <!-- ... -->
            </ul>
        </div>

        <div class="item">
            <!-- 角色插画 -->
            <img src="/avatar.png" alt="avatar" class="hero-avatar" />
        </div>
        <!-- 卡片列表（网格布局） -->
      </div>

    </div>
    <div class="center inset-x-0 bottom-0 mt-12 flex flex-col lg:absolute lg:mt-0 center text-neutral-800/80 dark:text-neutral-200/80" style="opacity: 1; transform: none;">
      <small class="text-center">司然后能行，行所以致远。</small>
      <span class="mt-8 animate-bounce text-center">
        <i class="mgc_down_line text-3xl inline-block">
        </i>
      </span>
    </div>
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
      <ToolCard
        icon="/icon/EasyBox.png"
        title="EasyBox"
        desc="PC 端通用工具合集软件，致力于打造一款生活、工作、学习、娱乐等多方面功能集合的软件"
        linkText="查看详情"
        link= "https://memotrace.cn/tools/easybox/"
      />
      <ToolCard
        icon="/icon/TraceBoard.png"
        title="TraceBoard"
        desc="统计键盘使用情况，可视化按键点击情况——记录打工人日常"
        linkText="查看详情"
        link= "https://memotrace.cn/tools/traceboard/"
      />
      <ToolCard
        icon="/icon/PostgreSQL.svg"
        title="BenchMarkSQL"
        desc="基于BenchmarkSQL5.0开发，新增自动化测试脚本以及测试报告查看服务"
        linkText="查看详情"
        link= "https://github.com/LC044/BenchmarkSQL"
      />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ToolCard from "../components/ToolCard.vue"; // 引入卡片组件
defineProps({
  msg: String,
})

const count = ref(0)
</script>



<style scoped>

.fullscreen-div {
    position: relative;
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    /* width: 100vw; */
    height: 100vh;
    max-width: 1080px;
}
.content {
    display: flex;
    gap: 20px;
}
.item {
    flex: 1;
    /* display: flex; */
    flex-direction:column;
    justify-content: center;
    align-items: center;
}

/* 主内容区域布局 */
.hero {
  position: relative;
  height: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  /* background-color: #b02c2c; 根据需求可改成纯白 #fff */
  flex-direction: column;
  align-items: center; /* 在大屏可改为居中 */
  justify-content: center;
  gap: 1.5rem;
  overflow: hidden; /* 以防止头像溢出 */
}
.hero-content{
    text-align: left;
}
/* 文本样式 */
.greeting {
  font-size: 2rem;
  color: #888;
  margin: 0;
}

.wave {
  display: inline-block;
  animation: wave 1s infinite alternate;
}
/* 小波浪动画 */
@keyframes wave {
  from { transform: rotate(0deg); }
  to { transform: rotate(20deg); }
}

.title {
  font-size: 2.5rem;
  margin: 0;
  color: #222;
}

.subtitle {
  font-size: 1rem;
  color: #666;
}

/* 社交图标列表 */
.social-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 1rem 0 0;
}

.social-links li a {
  /* font-size: 2rem; */
  color: #666;
  transition: transform 0.2s, color 0.2s;
}
.social-links li a:hover {
  transform: scale(1.1);
  color: #e67e99;
}

/* 角色插画 (示例：固定在右下角 / 也可在右侧绝对定位) */
.hero-avatar {
  width: 300px;
  max-width: 40vw;
  object-fit: contain;
  animation: floatUpDown 3s ease-in-out infinite alternate;
  justify-content: center;
  align-items: center;
}

/* 漂浮动画示例 */
@keyframes floatUpDown {
  from { transform: translateY(0); }
  to { transform: translateY(-20px); }
}

/* 响应式处理：小屏幕将插画挪到下方 / 调整文本对齐 */
@media (max-width: 767px) {
  .fullscreen-div {
      position: relative;
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      /* width: 100vw; */
      height: 100vh;
      max-width: 1080px;
  }
  .content {
      display: flex;
      gap: 20px;
  }
  .item {
      flex: 0;
      display: flex;
      flex-direction:column;
      justify-content: center;
      /* align-items: center; */
  }
  .hero {
    align-items: center; /* 垂直方向居中 */
    text-align: center;
  }
  .hero-avatar {
    position: static;
    margin-top: 2rem;
    width: 200px;
    max-width: 60vw;
    animation: none; /* 也可以保留动画 */
  }
}
</style>
