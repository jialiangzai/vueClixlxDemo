<template>
  <div class="member">
      <!-- 公共头部 -->
      <MyHeader></MyHeader>
      <!-- 中间内容部分 -->
      <div class="member-content">
        <div class="content-bgpic">
          <img src="../assets/image/member/bgpic.png" alt="">
        </div>
        <div class="content-buy">
          <div class="buy-txt">欢 迎 加 入 本 站 会 员</div>
          <div class="buy-item">
            <div class="item-nom item-low">
              <div class='item-title'>
                <span class="item-title-title">初级VIP</span>
                <span class="item-title-img"><img src="../assets/image/member/king.png" alt=""></span>
              </div>
              <div class="item-sales">会员课程9.0折</div>
              <div class="item-price">￥<span class="item-price-num">100</span></div>
              <div class="item-time">1个月</div>
              <div class="item-start">立即开通</div>
              <div class="item-desc">初级VIP</div>
            </div>
            <div class="item-nom item-mid">
              <div class='item-title'>
                <span class="item-title-title">高级VIP</span>
                <span class="item-title-img"><img src="../assets/image/member/king.png" alt=""></span>
              </div>
              <div class="item-sales">会员课程5.0折</div>
              <div class="item-price">￥<span class="item-price-num">600</span></div>
              <div class="item-time">6个月</div>
              <div class="item-start item-start-mid">立即开通</div>
              <div class="item-desc">高级VIP(6个月)</div>
            </div>
            <div class="item-nom item-top">
              <div class='item-title'>
                <span class="item-title-title">优创会员</span>
                <span class="item-title-img"><img src="../assets/image/member/king.png" alt=""></span>
              </div>
              <div class="item-sales">会员课程免费</div>
              <div class="item-price">￥<span class="item-price-num">1000</span></div>
              <div class="item-time">1个月</div>
              <div class="item-start item-start-top">立即开通</div>
              <div class="item-desc">优创会员(1个月)</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 公共底部 -->
      <MyFooter :webconfig="webconfig"></MyFooter>
  </div>
</template>

<script>
import MyHeader from '../components/index/header.vue'
import MyFooter from '../components/foot/foot.vue'
import {webConfig} from '@/common/api/webConfig.js'
export default {
  data(){
    return{
      webconfig:{}
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
    async __init(){
      let res = await webConfig()
      console.log('网页配置', res.data.data )
      this.webconfig = res.data.data
    }
  },
  components:{
    MyHeader,
    MyFooter
  }
};
</script>

<style scoped>
  .member-content{
    width: 100%;
    margin: 0 auto;
  }
  .content-bgpic{
    width: 100%;
    height: 150px;
  }
  .content-bgpic img{
    width: 100%;
    height: 100%;
  }
  .content-buy{
    padding: 1px 0 0 0;
    width: 1300px;
    margin: 0 auto;
  }
  .buy-txt{
    width: 323px;
    height: 40px;
    font-family: 'Microsoft YaHei';
    font-size: 32px;
    font-weight: 700;
    margin:  35px auto;
    background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-animation: hue 30s infinite linear;
  }
  @-webkit-keyframes hue {
    from {
      -webkit-filter: hue-rotate(0deg);
    }
    to {
      -webkit-filter: hue-rotate(-360deg);
    }
  }
  .buy-item{
    /* position: relative; */
    width: 1300px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 0 100px 0;
  }
  .buy-item .item-nom{
    width: 280px;
    height: 420px;
    border-radius: 12px;
    background: url('../assets/image/member/low.png') no-repeat center;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .buy-item .item-nom:hover{
    transform: translate(-5px,-5px);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .buy-item .item-mid{
    background: url('../assets/image/member/mid.png') no-repeat center;
  }
  .buy-item .item-top{
    background: url('../assets/image/member/top.png') no-repeat center;
  }
  /* 会员卡片内部样式 */
  .item-title{
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 26px;
    color: white;
  }
  .item-title .item-title-img{
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 10px;
  }
  .item-title-img img{
    width: 100%;
    height: 100%;
  }
  .item-sales{
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%,30px);
    font-size: 20px;
    color: white;
  }
  .item-price{
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%,100px);
    font-size: 30px;
    color: #ffffff;
  }
  .item-price .item-price-num{
    font-size: 60px;
  }
  .item-time{
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%,190px);
    font-size: 20px;
    color: #ffffff;
  }
  .item-start{
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%,260px);
    font-size: 20px;
    width: 140px;
    height: 30px;
    background: #ffffff;
    text-align: center;
    line-height: 30px;
    border-radius: 15px;
    color: #2691FF ;
    box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.3);
  }
  .item-desc{
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%,330px);
    font-size: 15px;
    color: #ffffff;
  }
  .item-start-mid{
    color: #FFA73B;
  }
  .item-start-top{
    color: #FF422C;
  }
</style>
