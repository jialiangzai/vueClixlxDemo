<template>
    <div class="course">
        <indexHeader></indexHeader>
        <Layout></Layout>
    </div>
</template>


<script>
import indexHeader from '@/components/index/header.vue';
import Layout from '@/components/cart/layout.vue';
import Foot from '../../components/foot/foot.vue';

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
    Layout,
    Foot
  },
};
</script>
<style scoped>

</style>