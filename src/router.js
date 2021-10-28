import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Course from '@/views/course/Course.vue';
import CourseInfo from '@/views/course/CourseInfo.vue'
import CoursePlay from '@/views/course/CoursePlay.vue'
import Member from '@/views/Member.vue';
import About from '@/views/about/About.vue';
import MyCourse from '@/views/about/components/MyCourse.vue';
import Collean from '@/views/about/components/Collean.vue';
import Order from '@/views/about/components/Order.vue';
import Message from '@/views/about/components/Message.vue';
import User from '@/views/user/User.vue';
import Setbindsns from '@/views/user/components/Setbindsns.vue';
import Setprofile from '@/views/user/components/Setprofile.vue';
import Setavator from '@/views/user/components/Setavator.vue';
import Cart from '@/views/cart/Cart.vue';


Vue.use(Router);

const routes = [
  { path: '/', component: Home },
  { path: '/course', component: Course },
  { path:'/course-info',component:CourseInfo},
  { path:'/course-play',component:CoursePlay},
  { path: '/member', component: Member },
  {
    path: '/about', component: About, name: 'About',
    redirect: '/about/my-course',
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
        component: Order,
      },
      {
        path: 'message',
        component: Message,
      },
    ]
  },
  {
    path: '/user', component: User,
    redirect: '/user/setbindsns',
    children: [
      {
        path: 'setbindsns',
        component: Setbindsns,
      },
      {
        path: 'setprofile',
        component: Setprofile,
      },
      {
        path: 'setavator',
        component: Setavator,
      }
    ]

  },
  {path: '/cart', component: Cart}
];

export default new Router({
  routes,
  mode: 'hash',
});
