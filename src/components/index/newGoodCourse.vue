<template>
  <!-- 首页新上好课组件 -->
  <div class="newGoodCourse">
      <!-- 新上好课整体容器 -->
      <div class="courseContent">
          <!-- 顶部标题 -->
          <div class="contentTitle">
              <div class="hot">
                  <div class="hot-left">HOT</div>
                  <div class="hot-right"></div>
              </div>
              <div class="txt">
                  <div class="txt-top">新上好课</div>
                  <div class="txt-bottom"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

</script>

<style scoped>
    .newGoodCourse{
        width: 1300px;
        height: 644px;
        margin: 15px auto 0 auto;
    }
    .courseContent{
        position: relative;
        width: 1300px;
        height: 644px;
        border: 1px solid;
        margin: 15px auto 0 auto;
    }
    .contentTitle{
        display: flex;
        position: absolute;
        top: 18px;
        left: 0;
        /* width: 200px; */
        /* width: 300px; */
        margin-left: 8px;
        background: green;
    }
    /* 内容-标题hot样式 */
    .contentTitle .hot{
        width: 110px;
        height: 38px;
        overflow: hidden;
    }
    .contentTitle .hot .hot-left{
        float: left;
        width: 98px;
        height: 38px;
        font-size: 20px;
        text-align: center;
        line-height: 37px;
        color: #ffffff;
        border-radius: 8px 0 8px 8px;
        background: linear-gradient(90deg, #FF727F 0%, #FC685C 100%);
    }
    .contentTitle .hot .hot-right{
        float: left;
        width: 0;
        height: 0;
        border: 6px solid #FC685C;
        border-right-color: transparent;
        border-bottom-color: transparent;
    }
    .contentTitle .txt{
        width: 154px;
        height: 38px;
        background: cyan;
        margin-left: 10px;
    }
    .contentTitle .txt .txt-top{
        font-size: 34px;
        line-height: 31px;
    }
</style>
