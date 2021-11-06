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
    title: 'WEB前端_前端课程_小鹿线',
    meta: [
      {
        name: '前端,前端课程,免费课程,WEB前端,前端工具,前端框架,html,css,javascript,js,html5,css3,nodejs,vuejs,reactjs,typescript,webpack,git,小鹿线',
        content: '小鹿线注重于web前端开发，专注前端开发，关注用户体验，提供全面详细的前沿前端教程及前端课程，精心雕琢每一门前端课程，是将要从事前端和正在致力于前端的开发者好的选择。',
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
