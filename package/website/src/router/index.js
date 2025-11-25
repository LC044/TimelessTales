import { createRouter, createWebHistory } from 'vue-router';



import HomePage from '@/views/HomePage.vue';
import BlogPage from '@/views/BlogPage.vue';
import More from '@/views/More.vue';
import ProjectPage from '@/views/ProjectPage.vue';
import Responsive from '@/views/tools/Responsive.vue';
import TrainTicketGengrate from '@/views/tools/TrainTicketGengrate.vue';
import ToolPage from '@/views/tools/ToolPage.vue';
// import ThoughtPage from '@/views/ThoughtPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/blog', component: BlogPage },
  { path: '/more', component: More },
  { path: '/project', component: ProjectPage },
  { path: '/tools', component: ToolPage },
  { path: '/tools/responsive', component: Responsive },
  { path: '/tools/trainticket', component: TrainTicketGengrate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
 if (to.path) {
   if (window._hmt) {
     window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
   }
 }
 next();
});

export default router;
