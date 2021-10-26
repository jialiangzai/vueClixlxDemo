import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Course from '@/views/Course.vue';
import Member from '@/views/Member.vue';
import About from '@/views/about/About.vue';
import MyCourse from '@/views/about/components/MyCourse.vue';
import Collean from '@/views/about/components/Collean.vue';
import Order from '@/views/about/components/Order.vue';
import Message from '@/views/about/components/Message.vue';


Vue.use(Router);

const routes = [
  { path: '/', component: Home },
  { path: '/course', component: Course },
  { path: '/member', component: Member },
  { path: '/about', component: About ,name:'About',
  redirect:'/about/my-course',
  children: [
    {
      path: 'my-course',
      component: MyCourse,
    },
    {
      path: 'collean',
      component: Collean,
    },
    {
      path: 'order',
      component:Order,
    },
    {
      path: 'message',
      component: Message,
    },
  ]
}
];

export default new Router({
  routes,
  mode: 'history',
});
