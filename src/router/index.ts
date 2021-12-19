import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Trading from '@/views/Trading/Main.vue';
import Confirm from '@/views/Confirmation.vue';

import Buy from '@/views/Trading/Buy.vue';
import Sell from '@/views/Trading/Sell.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Trading,
    children: [
      {
        name: 'buy',
        path: '/buy',
        component: Buy,
      },
      {
        name: 'sell',
        path: '/sell',
        component: Sell,
      },
    ],
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Confirm,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
