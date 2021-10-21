<template>
  <!-- 首页导航和轮播组件 -->
  <div class="navSwiper">
    <div class="navSwiperContent">
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '首页导航和轮播组件',
    };
  },
};
</script>

<style scoped>
  .navSwiper{
    padding-top: 1px;
    width: 100vw;
    height: 900px;
    background: url(../../assets/image/transitionbg.png);
  }
  .navSwiperContent{
    width: 1600px;
    height: 560px;
    border: 1px solid;
    margin: 70px auto;
  }
</style>
