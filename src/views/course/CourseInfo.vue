<template>
    <div class="courseinfo"> 
        <indexHeader></indexHeader>
        <courseInfoContainer></courseInfoContainer>
        <Foot :webconfig='webconfig'></Foot>
    </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import Foot from '@/components/foot/foot.vue';
import courseInfoContainer from '@/components/course/courseInfoContainer.vue'
import {webConfig} from '@/common/api/webConfig.js'
export default {
  data(){
   return{
       webconfig:{}
   }
  },
  metaInfo: {
    title: '鹿线课堂',
    meta: [
      {
        name: 'keyWords',
        content: 'My Example App',
      },
    ],
  },
  created() {
    this.__init()
  },
  methods: {
    async __init(){
      let res = await webConfig()
      this.webconfig = res.data.data
    }
  },
  components: {
    indexHeader,
    courseInfoContainer,
    Foot
  },
};
</script>
