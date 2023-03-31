import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome';
import Chatroom from '../views/Chatroom';

import useValidate from '../auth/validate';

const { validate } = useValidate();

const requireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem('uid');
  const client = window.localStorage.getItem('client');
  const accessToken = window.localStorage.getItem('access-token');

  if (!uid || !client || !accessToken) {
    console.log('ログインしていません');
    next({ name: 'Welcome' });
    return;
  }

  await validate();

  next();
  console.log('requireAuthが呼ばれています！');

  next();
};

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    beforeEnter: requireAuth,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
