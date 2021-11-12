<template>
  <div class="home">
    <!-- <h2>Home Page</h2> -->
    <indexHeader></indexHeader>
    <navSwiper></navSwiper>
    <newGoodCourse></newGoodCourse>
  </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import navSwiper from '@/components/index/navSwiper.vue';
import newGoodCourse from '@/components/index/newGoodCourse.vue';
import foot from '@/components/foot/foot.vue';
import {webConfig} from '@/common/api/webConfig.js'

export default {
  data() {
    return {
      webconfig: {},
    }
  },
  metaInfo() {
    return {
      title: this.webconfig.title, // set a title
      meta: [{ // set meta
        name: this.webconfig.keywords,
        content: this.webconfig.description
      }]
    }
  },
  created() {
    this.__init()
  },
  methods: {
    async __init() {
      let res = await webConfig()
      // console.log(res)
      this.webconfig = res.data.data
    }
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
