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
import indexHeader from '@/components/index/header.vue';
import navSwiper from '@/components/index/navSwiper.vue';
import newGoodCourse from '@/components/index/newGoodCourse.vue';
import foot from '@/components/foot/foot.vue';


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

  },
  methods: {
  },
  components: {
    indexHeader,
    navSwiper,
    newGoodCourse,
    foot
  },
};
</script>

<style scoped>
</style>
