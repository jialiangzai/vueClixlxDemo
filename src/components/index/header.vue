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
          <img src="/image/logo.png" alt="" @click="goHome()" />
        </div>
        <!-- 头部导航 -->
        <div class="content-nav">
          <ul>
            <li>
              <router-link
                to="/"
                style="cursor: pointer"
                :class="active === '1' ? 'active' : ''"
                >首 页</router-link
              >
            </li>
            <li>
              <router-link
                to="/course"
                style="cursor: pointer"
                :class="active === '2' ? 'active' : ''"
                >课 程</router-link
              >
            </li>
            <li>
              <router-link
                to="/member"
                style="cursor: pointer"
                :class="active === '3' ? 'active' : ''"
                >会 员</router-link
              >
            </li>
          </ul>
        </div>
        <!-- 搜索、购物车、登录注册 -->
        <div class="searBuyLogin">
          <!--头部搜索框-->
          <div class="content-search">
            <input
              type="text"
              @keyup.enter="toSearch()"
              placeholder="请输入要搜索的课程"
              v-model="keywords"
            />
            <i
              class="el-icon-search"
              style="cursor: pointer"
              @click="toSearch()"
            ></i>
          </div>
          <div class="content-Shopping" style="cursor: pointer">
            <el-badge :value="cartNum" class="item" v-if="cartNum">
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
              <img class="avator" :src="avatorImg" alt="" v-else />
              <!-- 头像信息 -->
            </div>
          </div>
          <div class="content-login" v-else @click="goLogin">登录 / 注册</div>
        </div>
        <!-- 划过头像显示 -->
        <div class="user-info" v-show="isUserInfo">
          <div class="user-info-top">
            <div class="u-i-t-top">
              <img
                class="avator"
                :src="userInfo.avatar"
                alt=""
                v-if="userInfo.avatar"
              />
              <img class="avator" :src="avatorImg" alt="" v-else />
              <div class="avator-info">
                <p>
                  {{ userInfo.nickName ? userInfo.nickName : nickname}}
                </p>
              </div>
            </div>
            <div class="u-i-i-bottom">
              <div v-for="(item,index) in avatorList" :key="item.id">
                <router-link :to="item.linkUrl">
                  <div class="info-item" :class="courseColor === index ? 'course-color': ''" @mouseenter="changeColor(index)" @mouseleave="deleteColor()">
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
            <p class="course-center" @click="goCourse">课程中心</p>
          </div>
          <div class="shopcar-bottom">
            <p>我的订单</p>
            <div class="car">
              <img src="/image/header/car-select.png" alt="" />
              <p class="course-center" @click="goShopCart">我的购物车</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 登陆注册对话框 -->
    <el-dialog
      :visible.sync="loginDialog"
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
            <p class="title-desc">{{ item.title }}</p>
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
                placeholder="短信登录仅限中国大陆用户"
              ></el-input>
            </el-form-item>
            <el-form-item prop="captcha" class="captcha">
              <el-input
                v-model="registerForm.captcha"
                style="width: 150px"
                placeholder="请输入短信验证码"
                @keyup.enter.native="showVerify('registerForm')"
              ></el-input>
              <div
                class="sendcaptcha"
                @click="sendCaptch"
                :class="phoneSend ? 'send' : ''"
              >
                {{ Phonecaptcha }}
              </div>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked" class="privacy"
                >同意<a href="javascript:;">《小鹿线官网》</a>&<a
                  href="javascript:;"
                  >《隐私政策》</a
                ></el-checkbox
              >
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="regiterBtn"
                @click="showVerify('registerForm')"
                >立即注册</el-button
              >
            </el-form-item>
						<div @click="goReset('registerForm')" v-show="false"></div>
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
                  placeholder="请输入登录手机号/邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password" class="captcha">
                <el-input
                  v-model="phoneForm.password"
                  placeholder="请输入密码"
                  show-password
                  @keyup.enter.native="showVerify('phoneForm')"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="regiterBtn"
                  @click="showVerify('phoneForm')"
                  >立即登录</el-button
                >
              </el-form-item>
							<div @click="goReset('phoneForm')" v-show="false"></div>
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
                  placeholder="请输入注册手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item prop="captcha" class="captcha">
                <el-input
                  v-model="identifyForm.captcha"
                  style="width: 150px"
                  placeholder="请输入短信验证码"
                  @keyup.enter.native="showVerify('identifyForm')"
                ></el-input>
                <div
                  class="sendcaptcha"
                  @click="sendLoginCode"
                  :class="isSend ? 'send' : ''"
                >
                  {{ captcha }}
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="regiterBtn"
                  @click="showVerify('identifyForm')"
                  >登录</el-button
                >
              </el-form-item>
								<div @click="goReset('identifyForm')" v-show="false"></div>
            </el-form>
            <div class="backLogin" @click="backRegiter">快速注册</div>
          </div>
				 <div class="container">登录即同意进入小鹿线官网</div>
        </div>
      </div>
    </el-dialog>
    <!--  注册成功弹出  -->
    <el-dialog
      :visible.sync="regiterSuccess"
      width="300px"
      :before-close="handleRegiterClose"
      append-to-body
    >
      <div class="regiter-success">
        <div class="tip-img">
					<img src="/image/header/tip.png" alt="" />
					<div>恭喜您注册成功</div>
				</div>
        <div class="start-study" @click="goStudy">去登录</div>
      </div>
    </el-dialog>
<!--    行为验证-->
    <Verify
        ref="verify"
        :captcha-type="'blockPuzzle'"
        :img-size="{width:'400px',height:'200px'}"
        @success="success"
        @error="error"
    />

  </div>
</template>

<script>
import  Verify from '../verifition/Verify'
import { sendRegisterOrLoginCaptcha } from "@/common/api/sms";
import {
  loginByJson,
  register,
  loginByMobile,
  logout,
  getInfo,
  getShopCarCounter,
  createToken
} from "@/common/api/auth";
import  {Loading} from 'element-ui'
import  {Encrypt} from '@/utils/aes.js';

import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      courseColor: -1, // 鼠标移上显示颜色
      crtType:"usernamePasswordLogin",
      regiterSuccess: false, // 对话框
      checked: false, // 同意协议
      active: "1",
      msg: "我是头部",
      // carNum: 0,
      isCar: false,
      // isLogin: false,
      isUserInfo: false,
      avatorImg: "/image/common/avator.png",
      nickname: "小鹿线-默认",
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
      isregister: false,
      isSend: false,
      registerForm: {}, // 注册
      captcha: "短信验证码",
      registerRules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
          },
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ]
      }, // 注册
      phoneForm: {}, // 账号登陆
      phoneRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      }, // 账号
      identifyForm: {}, // 验证码登陆
      identifyRules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
          },
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
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
      keywords: "",
      phonetimer: null,
      registerTiemr: null,
      Phonecaptcha:'短信验证码',
      phoneSend: false
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLogin: (state) => state.user.isLogin,
      cartNum: (state) => state.user.cartNum,
      loginDialog: (state) => state.user.loginDialog,
    }),
  },
  created() {
    this.getCarNum();
    this.copySearch();
  },
  components:{
    Verify
  },
  methods: {
    ...mapActions([
      "saveUserInfoAction",
      "saveLoginAction",
      "saveCartNumAction",
    ]),
    ...mapMutations(["saveLoginDialog"]),
    // 行为验证码
    success(e){
      switch (this.crtType){
        // 用户名登录
        case "usernamePasswordLogin":
          this.phoneForm.captchaVerification = e.captchaVerification
          this.submitPhoneForm('phoneForm')
          break;
        // 手机号登录
        case "mobileCaptchaLogin":
          this.identifyForm.captchaVerification = e.captchaVerification
          this.submitIdentifyForm('identifyForm')
          break;
        // 注册
        case "registerLogin":
          this.registerForm.captchaVerification = e.captchaVerification
          this.submitRegisterForm('registerForm')
          break;
      }
    },
    error(e){
      console.log(e)
      this.$message({
        message: '验证失败，请重新验证',
        type: 'error'
      })
    },
    showVerify(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.verify.show()
        }else {
          console.log('识别')
        }
      })

    },
		// 清空表单
		goReset(){
			 this.phoneForm = {}
			 this.registerForm = {}
			 this.identifyForm = {}

		},
		// 点击开始学习
		goStudy(){
			this.isregister = false
			this.regiterSuccess = false
      //this.loginDialog = true
      // this.$store.commit("saveLoginDialog", true);
		},
		// 注册成功弹出
		handleRegiterClose(){
			this.regiterSuccess = false
      // this.$store.commit("saveLoginDialog", false);
      //this.loginDialog = false
		},
    //点击图标返回首页
    goHome() {
      this.$router.push("/");
    },
    //关键字搜索
    toSearch() {
      if (!this.keywords) {
        this.$message({
          message: "请输入关键字进行搜索！",
          type: "error",
        });
        return;
      }
      this.$router.replace({
        path: "/course",
        query: { keywords: this.keywords },
      });
    },
    // 去我的课程s
    goAbout() {
      this.$router.push({
        path: "/about",
      });
    },
    // 打开对话框
    goLogin() {
      this.goReset()
      this.$store.commit("saveLoginDialog", true);
    },
    // 关闭对话框
    handleClose() {
      this.goReset()
      this.$store.commit("saveLoginDialog", false);
      clearInterval(this.phonetimer);
      clearInterval(this.registerTiemr);
    },
    // 确认注册
    submitRegisterForm(formName) {
      if (this.checked) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var regiterloading = Loading.service({
              lock: true,
              text: "Loading",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)",
            });
            let mobile = Encrypt(this.registerForm.mobile)
            let captchaVerification = this.registerForm.captchaVerification
            register({
              mobile,
              captcha:this.registerForm.captcha,
              captchaVerification
            })
              .then((res) => {
                if (res.meta.code == "200") {
                  this.$message({
                    message: "注册成功",
                    type: "success",
                  });
                  this.isregister = false;
									this.regiterSuccess = true
									this.saveLoginAction();
									// this.$store.commit("saveLoginDialog", false);
                  this.$nextTick(() => {
                    // 以服务的方式调用的 Loading 需要异步关闭
                    regiterloading.close();
                  });
                } else if (res.meta.code == "10005") {
                  this.$message({
                    message: res.meta.msg,
                    type: "info",
                  });
                  this.isregister = false;
                  this.$nextTick(() => {
                    // 以服务的方式调用的 Loading 需要异步关闭
                    regiterloading.close();
                  });
                } else {
                  this.$message({
                    message: res.meta.msg,
                    type: "error",
                  });
                  this.isregister = false;
                  this.$nextTick(() => {
                    // 以服务的方式调用的 Loading 需要异步关闭
                    regiterloading.close();
                  });
                }
              })
              .catch((err) => {
                this.$message({
                  message: res.meta.msg,
                  type: "error",
                });
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  regiterloading.close();
                });
              });
          } else {
            return false;
          }
        });
      } else {
        this.$message({
          message: "请勾选同意隐私协议",
          type: "error",
        });
      }
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
          let username = Encrypt(this.phoneForm.username)
          let password = Encrypt(this.phoneForm.password)
          let captchaVerification = this.phoneForm.captchaVerification
          loginByJson({
            username,
            password,
            captchaVerification
          })
            .then((res) => {
              if (res.meta.code === "10006") {
                // 存储token
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  phoneloading.close();
                });
                this.$store.commit("saveLoginDialog", false);
                let accessToken = res.data.accessToken;
                // 存储到access中
                sessionStorage.setItem("token", accessToken);
                sessionStorage.setItem("isLogin", JSON.stringify(true));
                this.getCarNum();
                this.saveLoginAction();
                this.$message({
                  message: "登录成功，赶紧去学习吧！",
                  type: "success",
                });
                // 获取用户信息
                this.getUserInfo();
                // window.location.reload()
              } else {
                this.$message({
                  message: res.meta.msg,
                  type: "error",
                });
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  phoneloading.close();
                });
                this.$store.commit("saveLoginDialog", false);


              }
            })
            .catch((err) => {
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                phoneloading.close();
              });
              this.$message({
                message: res.meta.msg,
                type: "error",
              });
            });
        } else {
          return false;
        }
      });
    },
    // 验证码登陆
    submitIdentifyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var identLoading = Loading.service({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          // alert('submit!');
         let mobile = Encrypt(this.identifyForm.mobile)
          let captchaVerification = this.identifyForm.captchaVerification
          loginByMobile({
            mobile,
            captcha:this.identifyForm.captcha,
            captchaVerification
          })
            .then((res) => {
              if (res.meta.code === "10006") {
                // 存储token
                let accessToken = res.data.accessToken;
                // 存储到access中
                sessionStorage.setItem("token", accessToken);
                sessionStorage.setItem("isLogin", JSON.stringify(true));
                // 获取个人信息
                // 获取购物车数据
                this.getCarNum();
                //  this.saveIsLoginAction(true)
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  identLoading.close();
                });
                this.getUserInfo();
                this.$store.commit("saveLoginDialog", false);
                this.$message({
                  message: "登录成功，赶紧去学习吧！",
                  type: "success",
                });
                // window.location.reload()
              } else {
                this.$message({
                  message: res.meta.msg,
                  type: "error",
                });
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  identLoading.close();
                });
                this.$store.commit("saveLoginDialog", false);
                this.saveLoginAction();



              }
            })
            .catch((err) => {
              this.$nextTick(() => {
                // 以服务的方式调用的 Loading 需要异步关闭
                identLoading.close();
              });
              this.$message({
                message: res.meta.msg,
                type: "error",
              });
            });
        } else {
          return false;
        }
      });
    },
    // 发送注册验证码
    sendCaptch(){
      let reg = /^1[3456789]\d{9}$/
      if(!reg.test(this.registerForm.mobile)){
        this.$message({
          message: '手机号输入错误，请检查',
          type: 'warning'
        })
      }else {
        if(this.registerForm.mobile) {
          let mobile = this.registerForm.mobile;
          // this.isSend = true;
          this.phoneSend = true
          this.Phonecaptcha = "重新发送60秒";
          this.sendCode(mobile);
          let time = 60;
          clearInterval(this.phonetimer);
          console.log(1)
          this.phonetimer = setInterval(() => {
            time--;
            if (time <= 0) {
              clearInterval(this.phonetimer);
              time = 60;
              this.captcha = "发送验证码";
              this.isSend = false;
            } else {
              this.Phonecaptcha = `重新发送${time}秒`;
            }
          }, 1000);
        }else {
          this.$message({
            message: "请先填写手机号哟",
            type: "warning",
          });
        }
      }

    },
    // 登录验证码3
   sendLoginCode() {
      let reg = /^1[3456789]\d{9}$/
      if(!reg.test(this.identifyForm.mobile)){
        this.$message({
          message: '手机号输入错误，请检查',
          type: 'warning'
        })
      }else {
        if(this.identifyForm.mobile) {
          let mobile = this.identifyForm.mobile;
          this.isSend = true;
          this.captcha = "重新发送60秒";
          this.sendCode(mobile);
          let time = 60;
          let timer;
          clearInterval(this.registerTiemr);
          this.registerTiemr = setInterval(() => {
            time--;
            if (time <= 0) {
              clearInterval(this.registerTiemr);
              time = 60;
              this.captcha = "发送验证码";
              this.isSend = false;
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
      }

    },
    // 发送请求
    sendCode(mobile) {
      sendRegisterOrLoginCaptcha({
        mobile: mobile,
      })
        .then((res) => {
          if (res.meta.code === "200") {
            this.$message({
              message: "发送成功",
              type: "success",
            });
          } else {
            this.$message({
              message: res.meta.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: err.meta.code,
            type: "error",
          });
        });
    },
    // 获取个人信息
    getUserInfo(params) {
      createToken().then(ress=>{
        getInfo({
          token:ress.data.token
        })
            .then((res) => {
              // this.saveUserInfoActions()
              if (res.meta.code == "200") {
                sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
                this.saveUserInfoAction();
                // window.location.reload()
              } else {
                this.$message({
                  message: res.meta.msg,
                  type: "error",
                });
              }
            })
            .catch((err) => {});
      })

    },
    // 获取购物车数据
    getCarNum() {
      if (sessionStorage.getItem("token")) {
        getShopCarCounter().then((res) => {
          if (res.meta.code == "200") {
            this.saveCartNumAction(res.data.counter);
          } else {
            this.$message({
              message: res.meta.msg,
              type: "error",
            });
          }
        });
      }
    },
    // 返回登陆页面
    backLogin() {
      this.isregister = false;
			this.goReset()
      if(this.loginCurrent === 1){
        this.crtType = "mobileCaptchaLogin"
      }else {
        this.crtType = "usernamePasswordLogin";
      }
    },
    // 去快速注册页面
    backRegiter() {
      this.isregister = true;
			this.goReset()
      this.crtType = "registerLogin"
    },
    // 登陆页面 切换
    gochange(index) {
			this.goReset()
      if(index === 1) {
        this.crtType = "mobileCaptchaLogin"
      }else if(index === 0){
        this.crtType = "usernamePasswordLogin";
      }
      // this.registerForm = {};
      // console.log(this.$refs.registerForm);
      this.loginCurrent = index;
    },
    // 退出登录
    async goLogout() {
      this.$confirm("您确定要退出登录吗？", "提示信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          logout()
            .then((res) => {
              this.$message({
                type: "success",
                message: "退出成功!",
              });
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("userInfo");
              sessionStorage.removeItem("isLogin");
              this.$router.push("/");
              this.$router.go(0);
              this.saveUserInfoAction({
                avatar: "/image/common/avator.png",
                nickName: "小鹿线-默认",
                gender: 1,
                city: "北京",
                id: 1,
              });
              this.saveLoginAction();
            })
            .catch((err) => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });

          return;
        });
    },
    //给搜索赋值
    copySearch() {
      this.keywords = this.$route.query.keywords;
    },
    // 去课程页
    goCourse(){
      // 去课程页
      this.$router.push({
        path: '/course'
      })
    },
    //去购物车
    goShopCart(){
      this.$router.push({
        path: '/cart'
      })
    },
    // 划过头像显示
    changeColor(index){
      this.courseColor = index
    },
    deleteColor(){
        this.courseColor = -1
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (to.fullPath === "/home") {
          this.active = "1";
        } else if (to.fullPath === "/course") {
          this.active = "2";
        } else if (to.fullPath === "/member") {
          this.active = "3";
        }
        this.copySearch();
      },
    },
  },
};
</script>

<style scoped>
.course-color {
  color: #3689ff !important;
}
.container {
	font-size: 12px;
font-family: Microsoft YaHei;
font-weight: 400;
color: #9199A1;
text-align: center;
margin-top: 10px;
}
.regiter-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
 align-items: center;
  z-index: 3000;
}
.tip-img {
	display: flex;
  flex-direction: column;
  justify-content: center;
	align-items: center;
}
.tip-img div {
	margin: 20px 0;
}
.regiter-success img {
  width: 250px;
  height: 180px;
}
.start-study {
  line-height: 40px;
  text-align: center;
  width: 200px;
  height: 40px;
  background: #3689ff;
	font-size: 18px;
  border-radius: 31px;
	color: #fff;
}
.privacy {
  font-size: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(145, 153, 161, 1);
}
.privacy a {
  color: #3689ff;
  text-decoration: none;
}
.active {
  font-weight: bold;
  color: #3481ff;
  /* color: #3689ff; */
}
* {
  list-style: none;
  text-decoration: none;
}
.header {
  width: 100%;
  height: 100px;
  position: relative;
}
.title-desc {
  cursor: pointer;
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
  width: 1200px;
  justify-content: space-around;
}
.content-logo {
  width: 160px;
  height: 55px;
  margin: 10px 0;
  cursor: pointer;
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

.searBuyLogin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 752px;
}
.content-search {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  width: 350px;
  height: 35px;
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
  font-size: 16px;
  outline: none;
}
.content-search i {
  color: #808080;
  font-size: 22px;
}
.content-Shopping i {
  color: #808080;
  font-size: 24px;
}
.content-login {
  height: 31px;
  font-size: 18px;
  color: #808080;
  text-align: center;
  cursor: pointer;
}
.content-login-success {
  height: 53px;
  color: #808080;
  text-align: center;
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #707070;
}
.avator {
  height: 53px;
  width: 53px;
  cursor: pointer;
  border-radius: 50%;
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
  cursor: pointer;
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
  box-shadow: 0px 5px 15px 3px #888888;
  position: absolute;
  top: 87px;
  right: -40px;
  z-index: 999;
  display: block;
  border-radius: 10px;
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
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
}
/*有会员了之后高度微调*/
.avator-info p {
  height: 60px;
  line-height: 60px;
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
  border-radius: 3px;
  cursor: pointer;
  background-color: rgba(0,0,0,.1) !important;
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
  top: 87px;
  right: 130px;
  z-index: 999;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0px 5px 15px 3px #888888;
  border-radius: 10px;
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
.active {
  position: relative;
  color: #3689ff !important;
}
.active::after{
  content: '' !important;
  position: absolute !important;
  bottom: -38px !important;
  left: -15px;
  width: 70px;
  height: 2px;
  background-color: #3689ff;
  border-radius: 5px  !important;
}
</style>
