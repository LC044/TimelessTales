// src/store/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    visitCount: 119793,    // 共享的访问量
    visitorCount: 294829    // 共享的访问人数
  }),
  // 可选：定义修改数据的方法
  actions: {
    setVisit(count) {
      this.visitCount = count
    },
    setVisitor(count) {
      this.visitorCount = count
    }
  }
})