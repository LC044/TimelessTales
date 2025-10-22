import { createRouter, createWebHistory } from 'vue-router';



import HomePage from '@/views/HomePage.vue';
import BlogPage from '@/views/BlogPage.vue';
import More from '@/views/More.vue';
import ProjectPage from '@/views/ProjectPage.vue';
import Responsive from '@/views/tools/Responsive.vue';
import ToolPage from '@/views/tools/ToolPage.vue';
// import ThoughtPage from '@/views/ThoughtPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/blog', component: BlogPage },
  { path: '/more', component: More },
  { path: '/project', component: ProjectPage },
  { path: '/tools', component: ToolPage },
  { path: '/tools/responsive', component: Responsive },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
