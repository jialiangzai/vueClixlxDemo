<template>
  <div class="home">
    <!-- <h2>Home Page</h2> -->
    <indexHeader></indexHeader>
    <navSwiper></navSwiper>
    
  </div>
</template>

<script>
import indexHeader from "@/components/index/header.vue";
import navSwiper from "@/components/index/navSwiper.vue";
import http from "../common/api/requests";
import { mapMutations } from 'vuex'
// import axios from 'axios';

export default {
  // data() {
  //   return {},
  // },
  metaInfo: {
    title: "鹿线课堂", // set a title
    meta: [
      {
        // set meta
        name: "关键字,web前端",
        content: "描述",
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
      let res = await http.$axios({
        url: "api/u/loginByJson",
        method: "POST",
        data: {
          username: "test",
          password: 123456,
        },
        header: {
          "Content-Type": "application/json",
          // "Content-Type":"application/x-www-form-urlencoded"
        },
      });
      // console.log('用户登录信息',res);
      // 登录成功,保存用户信息
			this.user_login(res)
    },
  },
  components: {
    indexHeader,
    navSwiper,
  },
};
</script>

<style>
</style>
