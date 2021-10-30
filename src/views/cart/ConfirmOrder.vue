<template>
    <div class="course">
        <indexHeader></indexHeader>
        <confirmOrder></confirmOrder>

    </div>
    
</template>


<script>
import indexHeader from '@/components/index/header.vue';
import confirmOrder from '@/components/cart/confirmOrder.vue';

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
    confirmOrder,
    foot
  },
};
</script>