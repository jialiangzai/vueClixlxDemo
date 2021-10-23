<template>
  <!-- 首页头部组件 -->
  <div class="index-header">
    <div class="header-content">
      <!-- 头部logo -->
      <div class="content-logo">
        <img src="../../assets/image/logo.png" alt="" />
      </div>
      <!-- 头部导航 -->
      <div class="content-nav">
        <ul>
          <li>
            <router-link to="/" class="aaa">首  页</router-link>
          </li>
          <li>
            <router-link to="/course">课  程</router-link>
          </li>
          <li>
            <router-link to="/member">会  员</router-link>
          </li>
        </ul>
      </div>
      <!-- 搜索、购物车、登录注册 -->
      <div class="searBuyLogin">
        <div class="content-search">
          <input type="text" placeholder="请输入要搜索的课程" />
          <i class="el-icon-search"></i>
        </div>
        <div class="content-Shopping">
          <i class="el-icon-shopping-cart-1"></i>
        </div>
        <div class="content-login">登录 / 注册</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '我是头部',
    };
  },
};
</script>

<style scoped>
* {
  list-style: none;
  text-decoration: none;
}

.index-header {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100px;
  /* background: skyblue; */
  background:  white;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 0px;
  z-index: 20;
}
.header-content {
  position: relative;
  display: flex;
  width: 1300px;
  justify-content: space-around;
}
.content-logo {
  width: 160px;
  height: 55px;
  margin: 10px 0;
}
.content-logo img {
  height: 100%;
}
.content-nav{
  width: 300px;
  height: 75px;
}
.content-nav ul{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 75px;
  margin: 0;
  padding: 0;
  /* height: 100%; */
  color: black;
}
.content-nav ul li a{
  font-size: 18px;
  font-family: MicrosoftYaHei;
  color: #808080;
}
.aaa{
  font-weight: bold;
}
.searBuyLogin{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 752px;
}
.content-search{
  display: flex;
  align-items: center;
  padding: 5px 10px;
  width: 460px;
  height: 40px;
  border-radius: 8px;
  background: #F0F2F4;
}
.content-search input{
  padding: 0 10px;
  width: 430px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  color: #808080;
  background: #F0F2F4;
  font-size: 18px;
  outline: none;
}
.content-search i{
  font-size: 24px;
}
.content-Shopping i{
  font-size: 24px;
}
.content-login{
  height: 31px;
  font-size: 18px;
  color: #808080;
  text-align: center;
}
</style>
