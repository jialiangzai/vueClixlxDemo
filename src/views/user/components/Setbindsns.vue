<template>
  <div class="setbindsns">
    <div class="setbindsns-header">
      <p>账号信息</p>
      <p class="header-complete">完成 <span>0/4</span></p>
    </div>
    <div class="setbindsns-container">
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/phone.png" alt="" />
        </div>
        <div class="item-center">
          <p class="item-phone"><span>手机</span> 未绑定</p>
          <p>可用手机号加密登录在线网校，可通过手机号找回密码</p>
        </div>
        <!-- <div class="item-btn" @click="goHone">操作</div> -->
      </div>
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/pwd.png" alt="" />
        </div>
        <div class="item-center">
          <p class="item-phone"><span>密码</span></p>
          <p>用于保护账号信息和登录安全</p>
        </div>
        <!-- <div class="item-btn">修改密码</div> -->
      </div>
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/mime.png" alt="" />
        </div>
        <div class="item-center">
          <p class="item-phone"><span>用户名</span></p>
          <p>可用用户名加密码登录在线网校</p>
        </div>
        <!-- <div class="item-btn">绑定用户</div> -->
      </div>
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/email.png" alt="" />
        </div>
        <div class="item-center">
          <p class="item-phone"><span>邮箱</span> 未绑定</p>
          <p>可用邮箱加密登录在线网校，可用邮箱找回密码</p>
        </div>
        <!-- <div class="item-btn">操作</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.setbindsns {
  width: 800px;
  height: 700px;
}
.setbindsns-header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
  display: flex;
}
.header-complete {
  margin-left: 40px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(161, 153, 159, 1);
}
.header-complete span {
  color: #ff1626;
}
.setbindsns-container {
  width: 100%;
  height: 700px;
}
.setbindsns-item {
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
  height: 90px;
  width: 100%;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  border-top: 1px solid rgba(112, 112, 112, 0.3);
}
.item-img {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-img img {
  width: 28px;
  height: 40px;
}
.item-phone {
  color: #ff1626;
  margin-bottom: 5px;
}
.item-phone span {
  font-weight: 700;
  font-size: 18px;
  color: #333333;
  margin-right: 5px;
}
.item-center {
  width: 550px;
}
.item-btn {
  padding: 5px 20px;
  border: 1px solid rgba(112, 112, 112, 1);
  border-radius: 15px;
}
</style>