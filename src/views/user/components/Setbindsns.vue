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
          <p class="item-phone"><span>手机</span> {{geTel(userInfo.mobile)}}</p>
          <p>可用手机号加密登录在线网校，可通过手机号找回密码</p>
        </div>
         <div class="item-btn" @click="changePhone">修改绑定</div>
      </div>
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/pwd.png" alt="" />
        </div>
        <div class="item-center">
          <p class="item-phone"><span>密码</span></p>
          <p>用于保护账号信息和登录安全</p>
        </div>
         <div class="item-btn" @click="changePwd">修改密码</div>
      </div>
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/mime.png" alt="" />
        </div>
        <div class="item-center">
          <p class="item-phone"><span>用户名</span></p>
          <p>可用用户名加密码登录在线网校</p>
        </div>
         <div class="item-btn" @click="changeUser">绑定用户</div>
      </div>
      <div class="setbindsns-item">
        <div class="item-img">
          <img src="/image/user/email.png" alt="" />
        </div>
        <div class="item-center">
          <p class="item-phone"><span>邮箱</span> 未绑定</p>
          <p>可用邮箱加密登录在线网校，可用邮箱找回密码</p>
        </div>
         <div class="item-btn">操作</div>
      </div>
    </div>

    <!--    修改手机号-->
    <el-dialog
        title="修改手机号"
        :visible.sync="phoneOpen"
        width="500px"
        :before-close="handlePhoneClose">
      <div class="phoneDialog">
        <div class="tip">为保障您的账号安全和收费课程的正常学习，小鹿希望您能为帐号绑定手机号，更换手机号后请及时换绑。（1个手机号只能绑定1个小鹿线帐号）</div>
        <el-form ref="form" :model="phoneForm" label-width="80px">
          <el-form-item label="手机号">
            <el-col :span="24"><el-input v-model="phoneForm.mobile" placeholder="请输入手机号"></el-input></el-col>
          </el-form-item>
          <el-form-item label="验证码">
            <el-row>
              <el-col :span="16"><el-input v-model="phoneForm.captcha" placeholder="请输入验证码"></el-input></el-col>
              <el-col :span="8"><el-button class="sendCode" @click="sendCodes">{{captcha}}</el-button></el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="12"><el-button type="primary" @click="onSubmit">确认</el-button></el-col>
              <el-col :span="12"><el-button>取消</el-button></el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { sendModifyMobileCaptcha } from "@/common/api/sms";
import {
  modifyMobile,
  createToken,
  getInfo,
  logout
} from "@/common/api/auth";
import  {Encrypt} from '@/utils/aes.js';
import { Loading } from "element-ui";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      phoneOpen:false,
      phoneForm: {},
      sendTimer: null,
      captcha: '发送验证码'
    };
  },
  computed:{
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    ...mapActions(['saveUserInfoAction']),
    // 隐藏中间四位
    geTel(tel){
      let reg = /^(\d{3})\d{4}(\d{4})$/;
      return tel.replace(reg, "$1****$2");
    },
    // 修改手机号绑定
    changePhone(){
      this.phoneOpen = true
    },
    sendCodes(){
      if(this.phoneForm.mobile){
      let mobile = Encrypt(this.phoneForm.mobile);

      this.captcha = "重新发送60秒";
      console.log(this.phoneForm)
      this.sendCode(mobile);
      let time = 60;
      clearInterval(this.sendTimer);
      this.sendTimer = setInterval(() => {
        time--;
        if (time <= 0) {
          clearInterval(this.sendTimer);
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
    },
    // 发送请求
    sendCode(mobile) {
      sendModifyMobileCaptcha({
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
    onSubmit(){
        if(this.phoneForm.mobile){
          this.phoneForm.mobile = Encrypt(this.phoneForm.mobile)
          this.phoneForm.userId = this.userInfo.id
          createToken().then(res=>{
            let token = res.data.token
            modifyMobile({
              token:token,
              ...this.phoneForm
            }).then(res=>{
              console.log(res)
              if(res.meta.code === '200'){
                this.$message({
                  title: '修改成功，请重新登录',
                  icon:'none'
                })
               this.goLogout()
                this.phoneOpen = false
              }
            })
          })
        }
    },
    handlePhoneClose(){
      this.phoneOpen = false
    },
    // 修改密码
    changePwd(){
      if(this.userInfo.username){
        this.$message({
          title: '请先设置用户名',
          icon: 'error'
        })
      }
    },
    // 修改用户
    changeUser(){

    },
    goLogout(){
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
    },


  },
};
</script>

<style scoped>
.sendCode {
  width: 100%;
  border:none;
}
.phoneDialog .tip {
  width: 400px;
  margin: 0 auto 20px;

}
.setbindsns {
  width: 1000px;
  height: 700px;
  padding-top: 20px;
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
  width: 800px;
}
.item-btn {
  padding: 5px 20px;
  border: 1px solid rgba(112, 112, 112, 1);
  border-radius: 15px;
}
</style>
