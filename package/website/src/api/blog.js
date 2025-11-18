import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    visit: 0,
    visitor: 0,
    // 新增缓存状态
    timelineCache: null, // 缓存时间线数据
    metaCache: null,     // 缓存元数据（分类、标签等）
    cacheTime: 0         // 缓存时间戳（可选，用于过期控制）
  }),
  actions: {
    setVisit(visit) {
      this.visit = visit;
    },
    setVisitor(visitor) {
      this.visitor = visitor;
    },
    // 新增：缓存时间线数据
    setTimelineCache(data) {
      this.timelineCache = data;
      this.cacheTime = Date.now();
    },
    // 新增：缓存元数据
    setMetaCache(data) {
      this.metaCache = data;
    },
    // 新增：清除缓存（支持手动刷新）
    clearCache() {
      this.timelineCache = null;
      this.metaCache = null;
      this.cacheTime = 0;
    }
  }
});