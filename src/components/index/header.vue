<template>
  <!-- 首页头部组件 -->
  <div
    class="header"
    @mouseleave="
      isUserInfo = false;
      isCar = false;
    "
  >
    <div class="index-header">
      <div class="header-content">
        <!-- 头部logo -->
        <div class="content-logo">
          <img src="/image/logo.png" alt="" />
        </div>
        <!-- 头部导航 -->
        <div class="content-nav">
          <ul>
            <li>
              <router-link to="/" class="aaa" style="cursor: pointer"
                >首 页</router-link
              >
            </li>
            <li>
              <router-link to="/course" style="cursor: pointer"
                >课 程</router-link
              >
            </li>
            <li>
              <router-link to="/member" style="cursor: pointer"
                >会 员</router-link
              >
            </li>
          </ul>
        </div>
        <!-- 搜索、购物车、登录注册 -->
        <div class="searBuyLogin">
          <div class="content-search">
            <input type="text" placeholder="请输入要搜索的课程" />
            <i class="el-icon-search" style="cursor: pointer"></i>
          </div>
          <div class="content-Shopping" style="cursor: pointer">
            <el-badge :value="carNum" class="item" v-if="carNum">
                <router-link to="/cart">
                    <i class="el-icon-shopping-cart-1"></i> 
                </router-link>               
            </el-badge>
            <i
              class="el-icon-shopping-cart-1"
              v-else
              @mouseenter="isCar = true"
            ></i>
          </div>
          <div class="content-login-success" v-if="isLogin">
            <div @click="goAbout" style="cursor: pointer">我的课程</div>
            <div @mouseenter="isUserInfo = true">
              <img
                class="avator"
                :src="userInfo.avatar"
                alt=""
                v-if="userInfo.avatar"
              />
              <img
                class="avator"
                :src="avatorImg"
                alt=""
                v-else
              />
              <!-- 头像信息 -->
            </div>
          </div>
          <div class="content-login" v-else @click="goLogin">登录 / 注册</div>
        </div>
      </div>
    </div>
    <!-- 登陆注册对话框 -->
    <el-dialog
      :visible.sync="open"
      width="300px"
      :before-close="handleClose"
      append-to-body
    >
      <div slot="title">
        <div class="dialog-register" v-if="isregister">快速注册</div>
        <div class="dialog-title" v-else>
          <div
            class="title-item"
            v-for="(item, index) in loginNav"
            :key="item.id"
            :class="loginCurrent === index ? 'active' : ''"
            @click="gochange(index)"
          >
            <p>{{ item.title }}</p>
            <span></span>
          </div>
        </div>
      </div>
      <div class="dialog-container">
        <div v-if="isregister">
          <el-form
            :model="registerForm"
            :rules="registerRules"
            ref="registerForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="mobile" class="captcha">
              <el-input
                v-model="registerForm.mobile"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="captcha" class="captcha">
              <el-input
                v-model="registerForm.captcha"
                style="width: 150px"
                placeholder="请输入验证码"
              ></el-input>
              <div
                class="sendcaptcha"
                @click="sendCaptch"
                :class="isSend ? 'send' : ''"
              >
                {{ captcha }}
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="regiterBtn"
                @click="submitRegisterForm('registerForm')"
                >立即注册</el-button
              >
            </el-form-item>
          </el-form>
          <div class="backLogin" @click="backLogin">账号登陆</div>
        </div>
        <div v-else>
          <div v-if="loginCurrent === 0">
            <el-form
              :model="phoneForm"
              :rules="phoneRules"
              ref="phoneForm"
              class="demo-ruleForm"
            >
              <el-form-item prop="username" class="captcha">
                <el-input
                  v-model="phoneForm.username"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password" class="captcha">
                <el-input
                  v-model="phoneForm.password"
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="regiterBtn"
                  @click="submitPhoneForm('phoneForm')"
                  >立即登录</el-button
                >
              </el-form-item>
            </el-form>
            <div class="backLogin" @click="backRegiter">快速注册</div>
          </div>
          <div v-else>
            <el-form
              :model="identifyForm"
              :rules="identifyRules"
              ref="identifyForm"
              class="demo-ruleForm"
            >
              <el-form-item prop="mobile" class="captcha">
                <el-input
                  v-model="identifyForm.mobile"
                  placeholder="请输入手机号"
                ></el-input>
              </el-form-item>
              <el-form-item prop="captcha" class="captcha">
                <el-input
                  v-model="identifyForm.captcha"
                  style="width: 150px"
                  placeholder="请输入验证码"
                ></el-input>
                <div
                  class="sendcaptcha"
                  @click="sendCaptch"
                  :class="isSend ? 'send' : ''"
                >
                  {{ captcha }}
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="regiterBtn"
                  @click="submitIdentifyForm('identifyForm')"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
            <div class="backLogin" @click="backRegiter">快速注册</div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 注册成功显示 -->
    <!-- 划过头像显示 -->
    <div class="user-info" v-show="isUserInfo">
      <div class="user-info-top">
        <div class="u-i-t-top">
          <img
            :src=" userInfo.avatar "
            alt=""
          />
          <div class="avator-info">
            <p>
              {{ userInfo.nickName}}
            </p>
          </div>
        </div>
        <div class="u-i-i-bottom">
          <div v-for="item in avatorList" :key="item.id">
            <router-link :to="item.linkUrl">
              <div class="info-item">
                <img :src="item.imgUrl" alt="" />
                <p>{{ item.title }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="user-info-bottom">
        <div class="logout" @click="goLogout">退出登录</div>
      </div>
    </div>

    <!-- 购物车 -->
    <div class="shopcar" v-show="isCar">
      <div class="shopcar-top">
        <div class="s-t-left">我的购物车</div>
      </div>
      <div class="shopcar-center">
        <img src="/image/header/car.png" alt="" />
        <p class="car-empy">购物车空空如也</p>
        <p>快去选购你喜欢的课程吧</p>
        <p class="course-center">课程中心</p>
      </div>
      <div class="shopcar-bottom">
        <p>我的订单</p>
        <div class="car">
          <img src="/image/header/car-select.png" alt="" />
          <p class="course-center">我的购物车</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendRegisterOrLoginCaptcha } from "@/common/api/sms";
import {
  loginByJson,
  register,
  loginByMobile,
  logout,
  getInfo,
  getShopCarCounter,
} from "@/common/api/auth";
import { Loading } from "element-ui";
import { mapState,mapActions } from "vuex";
export default {
  data() {
    return {
      msg: "我是头部",
      carNum: 1,
      isCar: false,
      // isLogin: false,
      isUserInfo: false,
      avatorImg: "/image/common/avator.png",
      username: "小鹿线-默认",
      // userInfo: null,
      loginNav: [
        {
          id: 0,
          title: "账号登录",
        },
        {
          id: 1,
          title: "验证码登录",
        },
      ],
      loginCurrent: 0,
      open: false,
      isregister: false,
      isSend: false,
      registerForm: {}, // 注册
      captcha: "短信验证码",
      registerRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
          },
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      }, // 注册
      phoneForm: {}, // 账号登陆
      phoneRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      }, // 账号
      identifyForm: {}, // 验证码登陆
      identifyRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
          },
        ],
        captcha: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      avatorList: [
        {
          id: 1,
          imgUrl: "/image/header/course.png",
          title: "我的课程",
          linkUrl: "/about/my-course",
        },
        {
          id: 2,
          imgUrl: "/image/header/order.png",
          title: "订单中心",
          linkUrl: "/about/order",
        },
        {
          id: 3,
          imgUrl: "/image/header/mess.png",
          title: "我的消息",
          linkUrl: "/about/message",
        },
        {
          id: 4,
          imgUrl: "/image/header/setting.png",
          title: "个人设置",
          linkUrl: "/user/setbindsns",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLogin: (state) => state.user.isLogin,
    }),
  },
  methods: {
    ...mapActions(['saveUserInfoAction','saveLoginAction']),
    // 去我的课程
    goAbout() {
      this.$router.push({
        path: "/about",
      });
    },
    // 打开对话框
    goLogin() {
      this.open = true;
    },
    // 关闭对话框
    handleClose() {
      this.open = false;
    },
    // 确认注册
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          var regiterloading = Loading.service({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          register(this.registerForm)
            .then((res) => {
              console.log(res);
              if (res.meta.code == "200") {
                this.$message({
                  message: "注册成功，去登录吧！",
                  type: "success",
                });
                this.isregister = false;
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  regiterloading.close();
                });
              } else if (res.meta.code == "10005") {
                this.$message({
                  message: res.meta.msg,
                  type: "success",
                });
                this.isregister = false;
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  regiterloading.close();
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                message: "注册失败啦，请重新登陆！",
                type: "error",
              });
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                regiterloading.close();
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 用户名和密码登陆成功
    submitPhoneForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          var phoneloading = Loading.service({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          loginByJson(this.phoneForm)
            .then((res) => {
              if (res.meta.code === "10006") {
                // 存储token
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  phoneloading.close();
                });
                this.open = false;
                let accessToken = res.data.accessToken;
                // 存储到access中
                sessionStorage.setItem("token", accessToken);
                sessionStorage.setItem("isLogin", JSON.stringify(true));
                // 获取用户信息
                this.getUserInfo({
                  token: accessToken
                });
                this.getCarNum();
                this.saveLoginAction()
                this.$message({
                  message: "登录成功，赶紧去学习吧！",
                  type: "success",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                phoneloading.close();
              });
              this.$message({
                message: "登录失败啦，请重新登陆！",
                type: "error",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 验证码登陆
    submitIdentifyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.identifyForm);
          var identLoading = Loading.service({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          // alert('submit!');
          loginByMobile(this.identifyForm)
            .then((res) => {
              console.log(res);
              if (res.meta.code === "10006") {
                // 存储token
                let accessToken = res.data.accessToken;
                // 存储到access中
                sessionStorage.setItem("token", accessToken);
                sessionStorage.setItem("isLogin", JSON.stringify(true));
                // 获取个人信息
                this.getUserInfo({
                  token: accessToken,
                });
                this.saveLoginAction()
                // 获取购物车数据
                this.getCarNum();
                //  this.saveIsLoginAction(true)
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  identLoading.close();
                });
                this.open = false;
                this.$message({
                  message: "登录成功，赶紧去学习吧！",
                  type: "success",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                identLoading.close();
              });

              this.$message({
                message: "登录失败啦，请重新登陆！",
                type: "error",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 发送验证码
    sendCaptch() {
      if (this.registerForm.mobile || this.identifyForm.mobile) {
        let mobile = this.registerForm.mobile || this.identifyForm.mobile;
        let time = 60;
        let timer;
        this.isSend = true;
        this.captcha = "重新发送60秒";
        clearInterval(timer);
        timer = setInterval(() => {
          time--;
          if (time <= 0) {
            clearInterval(timer);
            time = 30;
            this.captcha = "发送验证码";
            this.isSend = false;
            sendRegisterOrLoginCaptcha({
              mobile: mobile,
            })
              .then((res) => {
                if (res.meta.code === 200) {
                  console.log("发送成功");
                }
                // console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.captcha = `重新发送${time}秒`;
          }
        }, 1000);
      } else {
        this.$message({
          message: "请先填写手机号哟",
          type: "warning",
        });
      }
    },
    // 获取个人信息
    getUserInfo(params) {
      console.log(sessionStorage.getItem("token"),"123456");
      getInfo(params)
        .then((res) => {
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
          this.saveUserInfoAction()
          // this.saveUserInfoActions()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取购物车数据
    getCarNum() {
      getShopCarCounter().then((res) => {
        console.log(res)
        if (res.meta.code == 200) {
          this.carNum = res.data.counter;
        }
      });
    },
    // 返回登陆页面
    backLogin() {
      this.isregister = false;
    },
    // 去快速注册页面
    backRegiter() {
      this.isregister = true;
    },
    // 登陆页面 切换
    gochange(index) {
      this.loginCurrent = index;
    },
    // 退出登录
    goLogout() {
      logout()
        .then((res) => {
          console.log(res);
          this.$message({
            message: "退出登录，欢迎下次登录",
            type: "success",
          });
          this.isLogin = false;
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userInfo");
          sessionStorage.removeItem("isLogin");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
* {
  list-style: none;
  text-decoration: none;
}
.header {
  width: 100%;
  height: 100px;
  position: relative;
}

.index-header {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100px;
  /* background: skyblue; */
  background: white;
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
.content-nav {
  width: 300px;
  height: 75px;
}
.content-nav ul {
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
.content-nav ul li a {
  font-size: 18px;
  font-family: MicrosoftYaHei;
  color: #808080;
}
.aaa {
  font-weight: bold;
}
.searBuyLogin {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 752px;
}
.content-search {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  width: 460px;
  height: 40px;
  border-radius: 8px;
  background: #f0f2f4;
}
.content-search input {
  padding: 0 10px;
  width: 430px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  color: #808080;
  background: #f0f2f4;
  font-size: 18px;
  outline: none;
}
.content-search i {
  font-size: 24px;
}
.content-Shopping i {
  font-size: 24px;
}
.content-login {
  height: 31px;
  font-size: 18px;
  color: #808080;
  text-align: center;
}
.content-login-success {
  height: 53px;
  color: #808080;
  text-align: center;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #707070;
}
.avator {
  height: 53px;
  width: 53px;
  cursor: pointer;
}
.dialog-title {
  width: 400px;
  height: 30px;
  display: flex;
  align-items: center;
}
.title-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(120, 125, 130, 1);
}
.title-item span {
  margin-top: 5px;
  width: 15px;
  height: 2px;
  /* background-color: red; */
}
.active {
  color: #3689ff;
}
.active span {
  background-color: rgba(54, 137, 255, 1);
}
.dialog-register {
  width: 200px;
  height: 30px;
  color: #3689ff;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
}
.captcha {
  width: 100%;
  background: rgba(245, 245, 245, 1);
  position: relative;
}
.captcha el-input {
  background: rgba(245, 245, 245, 1);
}
.sendcaptcha {
  position: absolute;
  top: 0;
  right: 20px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #3689ff;
  cursor: pointer;
}
.send {
  font-size: 12px;
  color: rgba(120, 125, 130, 1);
}
.regiterBtn {
  width: 100%;
  border-radius: 20px;
}
.backLogin {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #3689ff;
  cursor: pointer;
}
.user-info {
  width: 200px;
  height: 194px;
  background-color: #fff;
  border: 1px solid rgba(248, 250, 252, 1);
  position: absolute;
  top: 100px;
  right: 100px;
  z-index: 999;
  display: block;
}
.user-info-top {
  display: flex;
  width: 100%;
  height: 160px;
  border-bottom: 1px solid rgba(248, 250, 252, 1);
  flex-direction: column;
}
.u-i-t-top {
  display: flex;
  height: 60px;
  width: 100%;
  align-items: center;
}
.u-i-t-top img {
  width: 40px;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
}
.avator-info {
  width: 120px;
  height: 60px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.avator-info p {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.u-i-i-bottom {
  display: flex;
  height: 100px;
  width: 200px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.info-item {
  width: 90px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  background: rgba(248, 250, 252, 1);
  border-radius: 3px;
  cursor: pointer;
}
.info-item img {
  width: 14px;
  height: 16px;
}
.user-info-bottom {
  position: relative;
  width: 100%;
  height: 30px;
}
.logout {
  line-height: 30px;
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #93999f;
  cursor: pointer;
}
.shopcar {
  width: 200px;
  height: 220px;
  background: #fff;
  position: absolute;
  top: 100px;
  right: 200px;
  z-index: 999;
  padding: 0 10px;
  box-sizing: border-box;
}
.shopcar-top {
  height: 30px;
  line-height: 30px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid rgba(51, 51, 51, 0.2);
  box-sizing: border-box;
}
.s-t-left {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.shopcar-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  font-size: 10px;
  box-sizing: border-box;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #a2a2a2;
  /* opacity: 0.56; */
  border-bottom: 1px solid rgba(51, 51, 51, 0.2);
}
.shopcar-center img {
  width: 60px;
  height: 54px;
  margin-bottom: 5px;
}
.car-empy {
  font-size: 14px;
  color: #787d82;
  margin-bottom: 5px;
}
.course-center {
  color: #3481ff;
  cursor: pointer;
}
.shopcar-bottom {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #93999f;
}
.shopcar-bottom .car {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.car img {
  width: 13px;
  height: 13px;
  margin-right: 5px;
}
</style>
