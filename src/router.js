import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Course from '@/views/Course.vue';
import Member from '@/views/Member.vue';
import About from '@/views/about/About.vue';

Vue.use(Router);

const routes = [
  { path: '/', component: Home },
  { path: '/course', component: Course },
  { path: '/member', component: Member },
  { path: '/about', component: About },
];

export default new Router({
  routes,
  mode: 'history',
});
