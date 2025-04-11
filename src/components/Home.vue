<template>
    <div class="fullscreen-div">
        <div class="hero-content item">
            <h2 class="greeting">Hi, I’m Innei <span class="wave">👋</span></h2>
            <h1 class="title">A NodeJS Full Stack &lt;Developer /&gt;</h1>
            <p class="subtitle">An independent developer coding with love.</p>

            <!-- 社交链接/图标列表 -->
            <ul class="social-links">
                <li><a href="#" target="_blank" rel="noreferrer"> 
                <i class="fab fa-github"></i>
                </a></li>
                <li><a href="#" target="_blank" rel="noreferrer"> 
                <i class="fab fa-twitter"></i>
                </a></li>
                <li><a href="#" target="_blank" rel="noreferrer">
                <i class="fab fa-weibo"></i>
                </a></li>
                <!-- ... -->
            </ul>
        </div>
        <div class="item">
            <!-- 角色插画 -->
            <img src="/avatar.png" alt="avatar" class="hero-avatar" />
        </div>
    </div> 
</template>

<script setup>
import { ref } from 'vue'

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
    display: flex;
    flex-direction:column;
    justify-content: center;
    /* align-items: center; */
}

/* 主内容区域布局 */
.hero {
  position: relative;
  height: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  background-color: #b02c2c; /* 根据需求可改成纯白 #fff */
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
  font-size: 1.2rem;
  color: #999;
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
  font-size: 2rem;
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
  font-size: 1.2rem;
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
}

/* 漂浮动画示例 */
@keyframes floatUpDown {
  from { transform: translateY(0); }
  to { transform: translateY(-10px); }
}

/* 响应式处理：小屏幕将插画挪到下方 / 调整文本对齐 */
@media (max-width: 767px) {
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
