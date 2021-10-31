<template>
    <div class="courseinfo"> 
        <indexHeader></indexHeader>
        <courseInfoContainer></courseInfoContainer>
        <foot></foot>
    </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import foot from '@/components/foot/foot.vue';
import courseInfoContainer from '@/components/course/courseInfoContainer.vue'
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
  created(){
  },
  components: {
    indexHeader,
    courseInfoContainer,
    foot
  },
};
</script>
