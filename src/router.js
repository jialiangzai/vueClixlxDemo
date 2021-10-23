import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Course from '@/views/Course.vue';
import Member from '@/views/Member.vue';

Vue.use(Router);

const routes = [
  { path: '/', component: Home },
  { path: '/course', component: Course },
  { path: '/member', component: Member },
];

export default new Router({
  routes,
  mode: 'history',
});
