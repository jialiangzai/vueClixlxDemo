<template>
    <div class="course">
        <indexHeader></indexHeader>
        <!-- <courseDirection></courseDirection> -->
        <coursemain></coursemain> 
        <foot></foot>

    </div>
    
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import coursemain from '@/components/course/coursemain.vue';
import foot from '@/components/foot/foot.vue';

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
    coursemain,
    foot
  },
};
</script>
