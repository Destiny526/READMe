import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Chat from '@/views/Chat.vue';
import Profile from '@/views/Profile.vue';

/**
 * 路由配置
 * 简单理解：这个文件就像是项目的导航地图
 */
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'chat',
        name: 'Chat',
        component: Chat
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;