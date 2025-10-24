<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-1">时间线</h1>
    <p class="text-center text-gray-500 dark:text-gray-400 mb-5">
      {{ category_num }} 分类 × {{ article_num }} 文章 × {{ tag_num }} 标签 × {{ word_num }} 字
    </p>
    <div v-for="yearGroup in years" :key="yearGroup.year" class="mb-12">
      <div class="flex items-center mb-4">
        <h2 class="text-2xl font-semibold">{{ yearGroup.year }}</h2>
        <span class="ml-2 text-gray-500 dark:text-gray-400">{{ yearGroup.articles.length }} 篇</span>
        <!-- 缩小button点击区域 -->
        <button
          class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded text-lg"
          @click="toggleExpand(yearGroup)"
          aria-label="切换展开状态"
        >
          <i class="mgc_down_line" v-if="yearGroup.isExpanded"></i>
          <i class="mgc_left_line" v-if="!yearGroup.isExpanded"></i>
        </button>
      </div>
      <!-- 使用transition实现平滑展开折叠效果 -->
      <transition name="expand">
        <ul class="space-y-2" v-if="yearGroup.isExpanded">
          <li v-for="(article, index) in yearGroup.articles" :key="index">
            <a
              :href="article.link"
              class="block p-2 bg-gray-50 dark:bg-gray-900 transition-all border-b border-dashed border-gray-300 dark:border-gray-700 mt-2 hover:border-gray-800 dark:hover:border-gray-500 hover:shadow-sm" 
              target="_blank"
            >
              <span class="text-gray-500 dark:text-gray-400 mr-3">{{ article.date }}</span>
              <span class="text-gray-800 dark:text-gray-200">{{ article.title }}</span>
            </a>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useCounterStore } from '@/api/blog' // 导入Pinia Store
import axios from 'axios'
const category_num = ref(6)
const article_num = ref(21)
const tag_num = ref(2)
const word_num = ref(197220)
// 声明默认展开状态常量
const DEFAULT_EXPANDED = true;
// 获取Store实例
const counterStore = useCounterStore()
const years = ref([
  {
    year: '2025',
    isExpanded: DEFAULT_EXPANDED, // 每年分组的展开状态，默认展开
    articles: [
      { date: '09-29', title: 'TPCC测试方法—benchmarksql', link: 'https://blog.lc044.love/post/31' },
      { date: '09-04', title: '绿联NAS+Docker：解锁PaddleOCR高效文字识别新姿势', link: 'https://blog.lc044.love/post/30' },
      { date: '07-16', title: 'openGauss通信协议', link: 'https://blog.lc044.love/post/29' },
      { date: '07-04', title: 'openGauss-JDBC 调试方法', link: 'https://blog.lc044.love/post/27' },
      { date: '06-06', title: '服务器网关切换后域名解析故障排查实录', link: 'https://blog.lc044.love/post/26' },
      { date: '05-29', title: 'openGauss事务机制（二）', link: 'https://blog.lc044.love/post/25' },
      { date: '05-29', title: 'openGauss事务机制（一）', link: 'https://blog.lc044.love/post/24' },
      { date: '05-21', title: 'openGauss编译指南', link: 'https://blog.lc044.love/post/23' },
      { date: '05-18', title: 'Motor: Enabling Multi-Versioning for Distributed Transactions on Disaggregated Memory', link: 'https://blog.lc044.love/post/22' },
      { date: '05-14', title: '分布式系统中的Paxos协议', link: 'https://blog.lc044.love/post/21' },
      { date: '05-13', title: '二叉树的前中后序遍历', link: 'https://blog.lc044.love/post/20' },
      // { date: '05-10', title: '留痕使用说明', link: 'https://blog.lc044.love/post/19' },
      { date: '05-09', title: '[学习笔记] SPDK NVMe of RDMA', link: 'https://blog.lc044.love/post/18' },
      // { date: '04-26', title: '万字长文带你了解微信4.0', link: 'https://blog.lc044.love/post/17' },
      { date: '03-29', title: '探究方式', link: 'https://blog.lc044.love/post/16' },
      { date: '03-26', title: '基于 PyQt5 实现分组列表滚动吸顶效果', link: 'https://blog.lc044.love/post/15' },
      { date: '03-22', title: '基于文件名修改图片的拍摄日期', link: 'https://blog.lc044.love/post/14' },
      // { date: '03-20', title: '万字长文带你了解Windows微信', link: 'https://blog.lc044.love/post/13' },
    ]
  },
  {
    year: '2024',
    articles: [
      { date: '11-12', title: '使用 PyQt5 实现自定义可拖拽列表组件', link: 'https://blog.lc044.love/post/12' },
      { date: '11-11', title: 'Python批量合并多个PDF', link: 'https://blog.lc044.love/post/11' },
    ]
  },
  {
    year: '2023',
    articles: [
      { date: '11-16', title: '看什么看', link: '/what-to-look' },
    ]
  }
]);

// 定义响应式变量
const loading = ref(false)   // 加载状态
const error = ref(null)      // 错误信息

// 切换展开/折叠状态的方法
const toggleExpand = (yearGroup) => {
  yearGroup.isExpanded = !yearGroup.isExpanded;
};

// 发起请求的函数
const fetchData = async () => {
  // years.value = null
  if (loading.value) return // 防止重复请求
  error.value = null
  loading.value = true

  try {
    // 发起GET请求（使用之前配置的代理路径）
    const response = await axios.get('/api/blog/public/timeline')
    const status = response.data.statusCode
    if (status !== 200) {
      throw new Error(response.data.message || '请求失败，请稍后再试')
    }
    // 将结果存入响应式变量
    const data = response.data.data
    console.log(data)
    // 步骤1：提取对象的所有年份键（得到 ["2023", "2024", "2025"]）
    const yearKeys = Object.keys(data);
    // 步骤2：将年份键转为数字，并按倒序排序（得到 [2025, 2024, 2023]）
    const sortedYears = yearKeys
      .map(year => Number(year)) // 字符串转数字（避免 "202" 比 "2023" 大的字符串排序坑）
      .sort((a, b) => b - a); // 倒序排序（b - a 是倒序，a - b 是正序）
    // 步骤3：遍历排序后的年份，再遍历对应文章
    const new_years = []
    sortedYears.forEach(year => {
      const yearStr = String(year); // 转回字符串，匹配原始对象的键
      const articles = data[yearStr]; // 当前年份的所有文章
      new_years.push({
        year: yearStr,
        isExpanded: DEFAULT_EXPANDED, // 每年分组的展开状态，默认展开
        articles: articles
      })
      // 遍历当前年份的每篇文章
      articles.forEach((article, index) => {
        // const pathname = article.pathname
        // if (pathname!=''){
        //   article.link = `https://blog.lc044.love/post/${pathname}`
        // }else{
        //   article.link = `https://blog.lc044.love/post/${article.id}`
        // }
        // 2025-10-24T16:31:03.078Z，转成时区时间 MM-DD 格式
        const utcDate = new Date(article.createdAt);
        article.date = `${String(utcDate.getMonth() + 1).padStart(2, '0')}-${String(utcDate.getDate()).padStart(2, '0')}`;
      });
  });
    years.value = new_years
  } catch (err) {
    // 处理错误
    error.value = err.message || '请求失败，请稍后再试'
    console.error('请求错误:', err)
  } finally {
    // 结束加载状态
    loading.value = false
  }
  try {
    // 发起GET请求（使用之前配置的代理路径）
    const response = await axios.get('/api/blog/public/meta')
    const status = response.data.statusCode
    if (status !== 200) {
      throw new Error(response.data.message || '请求失败，请稍后再试')
    }
    // 将结果存入响应式变量
    const data = response.data.data
    const tags = data.tags
    tag_num.value = tags.length
    const categories = data.meta.categories
    category_num.value = categories.length
    article_num.value = data.totalArticles
    word_num.value = data.totalWordCount
    counterStore.setVisit(data.meta.viewer)
    counterStore.setVisitor(data.meta.visited)
  } catch (err) {
    // 处理错误
    error.value = err.message || '请求失败，请稍后再试'
    console.error('请求错误:', err)
  } finally {
    // 结束加载状态
    loading.value = false
  }
}

// 可选：组件挂载时自动请求
onMounted(fetchData)

</script>

<style>
/* 展开折叠过渡动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
