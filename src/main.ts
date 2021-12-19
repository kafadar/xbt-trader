import Vue from 'vue';

import App from './App.vue';

import store from './store';
import router from './router';

import './assets/tailwind.css';

Vue.config.productionTip = false;

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

formatter.format(2500);
Vue.filter('money-prettify', (value: number): string => formatter.format(value));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
