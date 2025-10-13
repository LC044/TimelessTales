<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- 外层循环：遍历分类 -->
    <div v-for="(group, groupIndex) in toolGroups" :key="groupIndex" class="mb-10">
      <!-- 分类标题 -->
      <h2 class="text-2xl font-bold mb-4 text-gray-800">{{ group.category }}</h2>

      <!-- 内层循环：遍历该分类下的工具卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ToolCard from "../components/ToolCard.vue";

// 按工具类型分组的数据
const toolGroups = ref([
//   {
//     category: "聊天管理",
//     tools: [
//       {
//         icon: "/icon/wechatmsg.png",
//         title: "留痕",
//         desc: "微信聊天数据管理工具，致力于打造一个操作最简单、功能最全面、创意最丰富的聊天记录管理工具",
//         linkText: "使用教程",
//         link: "https://github.com/LC044/WeChatMsg"
//       }
//     ]
//   },
  {
    category: "PC工具",
    tools: [
      {
        icon: "/icon/EasyBox.png",
        title: "EasyBox",
        desc: "PC 端通用工具合集软件，致力于打造一款生活、工作、学习、娱乐等多方面功能集合的软件，有PDF工具箱、图片工具箱、文档转换等",
        linkText: "查看详情",
        link: "https://memotrace.cn/tools/easybox/"
      },
      {
        icon: "/icon/TraceBoard.png",
        title: "TraceBoard",
        desc: "统计键盘使用情况，可视化按键点击情况——记录打工人日常",
        linkText: "查看详情",
        link: "https://memotrace.cn/tools/traceboard/"
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
    tools: [
        {
        icon: "/icon/Report.svg",
        title: "AnnualReport",
        desc: "微信年度聊天报告模板",
        linkText: "查看详情",
        link: "https://github.com/LC044/AnnualReport"
      },
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
        desc: "使用pyqt开发模仿微信界面的聊天程序",
        linkText: "查看详情",
        link: "https://github.com/LC044/DB_Chat"
      },
      {
        icon: "/icon/测试.svg",
        title: "MiniC",
        desc: "MiniC语言编译器前端，生成抽象语法树，产生线性IR，生成控制流图",
        linkText: "查看详情",
        link: "https://github.com/LC044/MiniC"
      },
      {
        icon: "/icon/时钟.svg",
        title: "network-clock ",
        desc: "esp32+python打造个性化桌面摆件",
        linkText: "查看详情",
        link: "https://github.com/LC044/network-clock"
      }
    ]
  },
]);
</script>

<style scoped>
/* 可选：美化分类标题 */
</style>