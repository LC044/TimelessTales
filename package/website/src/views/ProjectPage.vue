<template>
  <div class="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="text-center py-10">
      <div class="inline-block w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin"></div>
      <p class="mt-3 text-gray-600 dark:text-gray-300">加载 GitHub 数据中...</p>
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMsg" class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
      <p>{{ errorMsg }}</p>
    </div>

    <!-- 内容区域（加载完成且无错误时显示） -->
    <template v-else>
      <!-- 1. GitHub 用户基本信息区 -->
      <div class="mb-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm dark:shadow-gray-900/50 transition-all duration-300">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <!-- 头像 -->
          <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700">
            <img
              :src="userInfo.avatar_url"
              :alt="`${userInfo.login}的GitHub头像`"
              class="w-full h-full object-cover"
            >
          </div>
          <!-- 基本信息 -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{{ userInfo.name || userInfo.login }}</h1>
            <p class="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl" v-if="userInfo.bio">
              {{ userInfo.bio }}
            </p>
            <div class="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <a :href="userInfo.html_url" target="_blank" class="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <i class="mgc_github_line mr-1"></i> GitHub主页
              </a>
              <span v-if="userInfo.location" class="flex items-center text-gray-500 dark:text-gray-400">
                <i class="mgc_map_pin_line mr-1"></i> {{ userInfo.location }}
              </span>
              <a v-if="userInfo.blog" :href="userInfo.blog" target="_blank" class="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <i class="mgc_link_line mr-1"></i> 个人网站
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 贡献日历及主题控制区 -->
      <div class="mb-10">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-0">GitHub 贡献日历</h2>
          <div class="flex items-center gap-3">
            <div class="flex gap-2">
              <button
                v-for="color in presetColors"
                :key="color"
                :style="{ backgroundColor: color }"
                class="w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110 border border-gray-200 dark:border-gray-700"
                :title="color"
                @click="currentColor = color"
              ></button>
            </div>
            <div class="flex items-center gap-2">
              <input type="color" v-model="currentColor" class="w-8 h-8 p-0 border-0 cursor-pointer rounded">
              <input type="text" v-model="currentColor" class="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-900/50">
          <img 
            :src="`https://ghchart.rshah.org/${currentColor.replace('#', '')}/${userInfo.login}`"
            alt="GitHub贡献日历"
            class="w-full h-auto rounded dark:opacity-90"
          >
        </div>
      </div>

      <!-- 3. 核心数据统计区 -->
      <div class="mb-10">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">GitHub 数据统计</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm dark:shadow-gray-900/50 text-center transition-all duration-300">
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">{{ userInfo.public_repos }}</div>
            <div class="text-gray-500 dark:text-gray-400">总仓库数</div>
          </div>
          <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm dark:shadow-gray-900/50 text-center transition-all duration-300">
            <div class="text-4xl font-bold text-yellow-500 dark:text-yellow-400 mb-1">{{ totalStars.toLocaleString() }}</div>
            <div class="text-gray-500 dark:text-gray-400">累计星标</div>
          </div>
          <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm dark:shadow-gray-900/50 text-center transition-all duration-300">
            <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">{{ totalForks.toLocaleString() }}</div>
            <div class="text-gray-500 dark:text-gray-400">累计分支</div>
          </div>
          <!-- 新增：总 commit 次数 -->
          <div class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm dark:shadow-gray-900/50 text-center transition-all duration-300">
            <div class="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-1">{{ totalCommits.toLocaleString() }}</div>
            <div class="text-gray-500 dark:text-gray-400">总 commit 数</div>
          </div>
        </div>
      </div>

      <!-- 4. 最近活跃仓库 -->
      <div class="mb-10">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">最近活跃仓库</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="repo in recentRepos"
            :key="repo.id"
            class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm dark:shadow-gray-900/50 hover:shadow-md dark:hover:shadow-gray-700/30 transition-all duration-300"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                <a :href="repo.html_url" target="_blank" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {{ repo.name }}
                </a>
              </h3>
              <span v-if="repo.language" class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                {{ repo.language }}
              </span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-3" v-if="repo.description">
              {{ repo.description }}
            </p>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
              <span class="flex items-center"><i class="mgc_star_line mr-1"></i> {{ repo.stargazers_count }}</span>
              <span class="flex items-center"><i class="mgc_fork_line mr-1"></i> {{ repo.forks_count }}</span>
              <span class="flex items-center"><i class="mgc_time_line mr-1"></i>
                {{ formatDate(repo.created_at) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 5. 原有工具组内容 -->
    <div v-for="(group, groupIndex) in toolGroups" :key="groupIndex" class="mb-10">
      <div class="flex items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ group.category }}</h2>
        <button
          class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded text-xl ml-2"
          @click="toggleExpand(group)"
        >
          <i class="mgc_down_line" v-if="group.isExpanded"></i>
          <i class="mgc_left_line" v-if="!group.isExpanded"></i>
        </button>
      </div>
      <transition name="expand">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-if="group.isExpanded">
          <ToolCard
            v-for="(tool, toolIndex) in group.tools"
            :key="toolIndex"
            :icon="tool.icon"
            :title="tool.title"
            :desc="tool.desc"
            :linkText="tool.linkText"
            :link="tool.link"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ToolCard from "../components/ToolCard.vue";

// Interfaces
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  blog: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  commit_count?: number;
}

interface Contribution {
  type: string;
}

interface ContributionDay {
  contributions: Contribution[];
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  weeks: ContributionWeek[];
}

interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

interface ContributionStats {
  contributionsCollection: ContributionsCollection;
}

interface ToolItem {
  icon: string;
  title: string;
  desc: string;
  linkText: string;
  link: string;
}

interface ToolGroup {
  category: string;
  isExpanded: boolean;
  tools: ToolItem[];
}

// 配置项
const MAX_RECENT_REPOS = 6 // 最多显示的最近仓库数量

// 状态管理
const userInfo = ref<Partial<GitHubUser>>({}) // 用户基本信息
const allRepos = ref<GitHubRepo[]>([]) // 所有仓库数据
const isLoading = ref(true)
const errorMsg = ref('')

// 主题色配置
const currentColor = ref('#8B0000')
const presetColors = ref([
  '#0F52BA', '#8B0000', '#2E4E3A', '#4B0082', '#8B4513'
])

// 计算属性：统计数据
const totalStars = computed(() => {
  return allRepos.value.reduce((sum, repo) => sum + repo.stargazers_count, 0)
})
const totalForks = computed(() => {
  return allRepos.value.reduce((sum, repo) => sum + repo.forks_count, 0)
})

// 计算属性：最近活跃仓库（按更新时间排序）
const recentRepos = computed(() => {
  return [...allRepos.value]
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, MAX_RECENT_REPOS)
})

// 新增：总 commit 次数（所有原创仓库的 commit 累加）
const totalCommits = computed(() => {
  return allRepos.value.reduce((sum, repo) => {
    // 仓库默认分支的 commit 总数（需仓库有默认分支且公开）
    return sum + (repo.commit_count || 0)
  }, 0)
})

// 工具函数：格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-')
}

const fetchGithubData = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`请求失败: ${response.status}`)
    return await response.json()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    errorMsg.value = `获取数据失败: ${message}，请稍后重试`
    console.error('GitHub API请求错误:', err)
    return null
  }
}

// 初始化：加载GitHub数据
onMounted(async () => {
  isLoading.value = true
  errorMsg.value = ''

  // 1. 获取用户基本信息
  // const userData = await fetchGithubData(`https://api.github.com/users/${GITHUB_USERNAME}`)
  const data = await fetchGithubData(`/api/github/data`)
  if (!data) {
    isLoading.value = false
    return
  }
  userInfo.value = data.user_info as GitHubUser

  // 2. 获取用户仓库列表（只获取公开仓库）
  // const reposData = await fetchGithubData(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
  if (data) {
    allRepos.value = data.repos // 过滤掉fork的仓库
  }

  isLoading.value = false
})

// 原有工具组逻辑
const DEFAULT_EXPANDED = true;
const toggleExpand = (group: ToolGroup) => {
  group.isExpanded = !group.isExpanded;
};

const toolGroups = ref<ToolGroup[]>([
  {
    category: "PC工具",
    isExpanded: DEFAULT_EXPANDED,
    tools: [
      {
        icon: "/logo.png",
        title: "TrailSnap",
        desc: "AI旅行相册，上传旅行照片，自动生成旅行相册和旅行日志。电子车票存档，让回忆变成永恒",
        linkText: "查看详情",
        link: "https://github.com/LC044/TrailSnap"
      },
      {
        icon: "/icon/EasyBox.png",
        title: "EasyBox",
        desc: "PC 端通用工具合集软件，致力于打造一款生活、工作、学习、娱乐等多方面功能集合的软件，有PDF工具箱、图片工具箱、文档转换等",
        linkText: "查看详情",
        link: "https://blog.siyuan.ink/post/32"
      },
      {
        icon: "/icon/TraceBoard.png",
        title: "TraceBoard",
        desc: "统计键盘使用情况，可视化按键点击情况——记录打工人日常",
        linkText: "查看详情",
        link: "https://blog.siyuan.ink/post/33"
      },
      {
        icon: "/icon/PostgreSQL.svg",
        title: "BenchMarkSQL",
        desc: "基于BenchmarkSQL5.0开发，新增自动化测试脚本以及测试报告查看服务",
        linkText: "查看详情",
        link: "https://github.com/LC044/BenchmarkSQL"
      }
    ]
  },
  {
    category: "入门学习",
    isExpanded: DEFAULT_EXPANDED,
    tools: [
      {
        icon: "/icon/ProMakr.png",
        title: "ProMakr 简记",
        desc: "一个使用QT开发的markdown编辑器",
        linkText: "查看详情",
        link: "https://github.com/LC044/ProMakr"
      },
      {
        icon: "/icon/社交聊天.svg",
        title: "DB_Chat",
        desc: "一款局域网聊天软件，基于UDP广播实现局域网内设备发现，TCP实现聊天消息传输",
        linkText: "查看详情",
        link: "https://github.com/LC044/DB_Chat"
      }
    ]
  }
]);
</script>

<style>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 图标样式 */
.mgc_github_line, .mgc_map_pin_line, .mgc_link_line,
.mgc_star_line, .mgc_fork_line, .mgc_time_line {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-cols-2.md\:grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .grid-cols-1.md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>