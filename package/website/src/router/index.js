import { createRouter, createWebHistory } from 'vue-router';



import HomePage from '@/views/HomePage.vue';
import BlogPage from '@/views/BlogPage.vue';
import More from '@/views/More.vue';
import ProjectPage from '@/views/ProjectPage.vue';
// import ThoughtPage from '@/views/ThoughtPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/blog', component: BlogPage },
  { path: '/more', component: More },
  { path: '/project', component: ProjectPage },
//   { path: '/thought', component: ThoughtPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
