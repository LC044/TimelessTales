<template>
  <footer class="bg-gray-50 border-t border-gray-200 py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- 版权信息 -->
        <div class="mb-4 md:mb-0">
          <p class="text-sm text-gray-500">
            © 2023-2025 SiYuan.
          </p>
        </div>

        <!-- 新增：网站访问统计信息 -->
        <div class="mb-4 md:mb-0 text-center md:text-left">
          <p class="text-sm text-gray-500">
            <!-- 大数用逗号隔开 -->
              <i class="mgc_user_3_line"></i> {{ counterStore.visitorCount.toLocaleString() }} | <i class="mgc_eye_2_line"></i> {{ counterStore.visitCount.toLocaleString() }}
          </p>
        </div>

        <!-- 备案信息 -->
        <div class="flex items-center space-x-4">
          <!-- ICP备案 -->
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-600 hover:text-blue-600 flex items-center"
          >
            <span>陕ICP备2023017789号</span>
          </a>
          <!-- 公安备案 -->
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61019002002696"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-600 hover:text-blue-600 flex items-center"
          >
            <img src="https://img.alicdn.com/tfs/TB1X1Idn.Y1gK0jSZTEXXXDQVXa-200-200.png"
                alt="公安备案图标"
                class="h-4 w-4 mr-1">
            <span>陕公网安备61019002002696号</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref,onMounted } from 'vue';
import { useCounterStore } from '@/api/blog' // 导入Pinia Store
import axios from 'axios'
export default {
  name: 'SiteFooter',
  setup() {
    // 获取Store实例
    const counterStore = useCounterStore()
    const fetchData = async () => {
    try {
      // 发起GET请求（使用之前配置的代理路径）
      const response = await axios.get('/api/blog/public/viewer')
      const status = response.data.statusCode
      if (status !== 200) {
        throw new Error(response.data.message || '请求失败，请稍后再试')
      }
      // 将结果存入响应式变量
      const data = response.data.data
      counterStore.setVisit(data.viewer)
      counterStore.setVisitor(data.visited)
      } catch (err) {
        // 处理错误
        console.error('请求错误:', err)
      } finally {
        // 结束加载状态
      }
    }

    // 可选：组件挂载时自动请求
    onMounted(fetchData)
    return { counterStore }
  }
}


</script>
