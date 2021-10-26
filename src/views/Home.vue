<template>
  <div class="home">
    <!-- <h2>Home Page</h2> -->
    <indexHeader></indexHeader>
    <navSwiper></navSwiper>
    <newGoodCourse></newGoodCourse>
    <foot></foot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import indexHeader from '@/components/index/header.vue';
import navSwiper from '@/components/index/navSwiper.vue';
import newGoodCourse from '@/components/index/newGoodCourse.vue';
import foot from '@/components/foot/foot.vue';
import http from '../common/api/requests';

// import axios from 'axios';

export default {
  metaInfo: {
    title: '鹿线课堂', // set a title
    meta: [
      {
        // set meta
        name: '关键字,web前端',
        content: '描述',
      },
    ],
  },
  created() {
    this.userLogin();
  },
  methods: {
    ...mapMutations(['user_login']),
    // 请求用户登录数据
    async userLogin() {
      const res = await http.$axios({
        url: 'api/u/loginByJson',
        method: 'POST',
        data: {
          username: 'test',
          password: 123456,
        },
        header: {
          'Content-Type': 'application/json',
          // "Content-Type":"application/x-www-form-urlencoded"
        },
      });
      // console.log('用户登录信息',res);
      // 登录成功,保存用户信息
      this.user_login(res);
    },
  },
  components: {
    indexHeader,
    navSwiper,
    newGoodCourse,
    foot
  },
};
</script>

<style>

</style>
