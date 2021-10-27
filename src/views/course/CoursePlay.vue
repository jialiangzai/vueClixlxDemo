<template>
    <div class="courseplay">
        <router-view></router-view>
        <indexHeader></indexHeader>
        <coursePlayMain></coursePlayMain>
        <foot></foot>
    </div>
</template>


<script>
import indexHeader from '@/components/index/header.vue';
import foot from '@/components/foot/foot.vue';
import coursePlayMain from '@/components/course/coursePlayMain.vue'
export default {
  metaInfo: {
    title: '鹿线课堂',
    meta: [
      {
        name: 'keyWords',
        content: 'My Example App',
      },
    ],
  },
  components: {
    indexHeader,
    coursePlayMain,
    foot

  },
};
</script>