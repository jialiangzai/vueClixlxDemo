<template>
    <div class="courseinfo">    
        <router-view />
        <indexHeader></indexHeader>
        <courseInfoTop></courseInfoTop>
        <courseContainer></courseContainer>
        <foot></foot>
    </div>
    
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import courseInfoTop from '@/components/course/courseInfoTop.vue'
import foot from '@/components/foot/foot.vue';
import courseContainer from '@/components/course/courseContainer.vue'
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
    courseInfoTop,
    courseContainer,
    foot
  },
};
</script>
