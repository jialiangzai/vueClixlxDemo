<template>
  <div class="home">
    <!-- <h2>Home Page</h2> -->
    <indexHeader></indexHeader>
    <navSwiper></navSwiper>
  </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import navSwiper from '@/components/index/navSwiper.vue';
import axios from 'axios';

export default {
  // data() {
  //   return {},
  // },
  created() {
    axios({
      url: 'api/u/loginByJson',
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      // "Content-Type":"application/x-www-form-urlencoded"
      },
      data: {
        username: 'test',
        password: 123456,
      },
    }).then((res) => {
      console.log(res);
    });
  },
  components: {
    indexHeader,
    navSwiper,
  },
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
};
</script>

<style>
</style>
