<template>
  <div class="loading">
    <index-header></index-header>
    <div class="loading-container">
      <div class="loading-main">
        <img src="/image/loading.gif">
      </div>
    </div>
    <foot :webconfig="webconfig"></foot>
  </div>
</template>

<script>
import indexHeader from '@/components/index/header.vue';
import foot from '@/components/foot/foot.vue';
import {
  getInfo,
  getShopCarCounter,
  createToken,
  getAccessToken
} from "@/common/api/auth";
import  {Loading} from 'element-ui'
import  {Encrypt,Decrypt} from '@/utils/aes.js';
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "index.vue",
  data(){
    return {
      webconfig:{}
    }
  },

  components:{
    indexHeader,
    foot
  },
  created() {
    // 解析地址后面路径
    this.goWeiLogin()
  },
  methods:{
    ...mapActions([
      "saveUserInfoAction",
      "saveLoginAction",
      "saveCartNumAction",
    ]),
    ...mapMutations(["saveLoginDialog"]),
    goWeiLogin(){
      if(!sessionStorage.getItem('token')){
        if(this.$route.query.code && this.$route.query.logintype && this.$route.query.t){
          try{
            const code = Decrypt(this.$route.query.code)
            getAccessToken({
              code
            }).then(res=>{
              if(res.meta.code === '200'){

                // 获取用户信息
                this.getUserInfo();
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

              }else {

                this.$message({
                  message: res.meta.msg,
                  type: "warning",
                });
              }
              console.log(res)
            })

          }catch (e) {
            console.log(e)
          }
        }else{
          console.log('微信登录失败')
        }
      }
    },
    // 获取个人信息
    getUserInfo(params) {
      createToken().then(ress=>{
        getInfo({
          token:ress.data.token
        })
            .then((res) => {
              // this.saveUserInfoActions()
              if (res.meta.code === "200") {
                sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
                this.saveUserInfoAction();
                this.$router.push('/user/setbindsns')
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
          if (res.meta.code === "200") {
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
  }
}
</script>

<style scoped>
.loading {

}
.loading-container {
  min-height: 700px;
  position: relative;
}
.loading-main {
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
</style>
