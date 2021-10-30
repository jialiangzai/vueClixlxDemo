<template>
    <div class="course">
        <indexHeader></indexHeader>
        <payment></payment>

    </div>
    
</template>


<script>
import indexHeader from '@/components/index/header.vue';
import payment from '@/components/cart/payment.vue';

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
    payment,
    foot
  },
};
</script>