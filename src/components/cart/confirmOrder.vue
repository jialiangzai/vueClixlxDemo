<template>
    <div class="confirmOrder">
      <div class="bgColor">
          <h1 class="main-shopcart">确认订单</h1>
      </div>
      <div class="main">
            <div class="info">
                <div class="head">商品信息</div>
                <div class="info-main"  v-for="(item,index) in courseInfo" :key="index">
                    <div class="courseInfo">
                        <div class="coursebg">
                            <img :src="item.courseCover" alt="">
                        </div>
                        <div class="courseName">
                           {{item.courseName}}
                        </div>
                        <div class="coursePrice">
                            <span class="nowprice">￥{{item.discountPrice}}</span>
                            <span class="oldprice">￥{{item.salePrice}}</span>
                        </div>
                    </div>
                </div>
                <div class="choose">
                    <el-divider></el-divider>
                    <h3>支付方式 <span class="pay" v-if="payment">{{payment.description}}</span></h3>
                    <div class="choosebg">
                        <div :class="'payment ' + item.code" @mouseup="mouseup(item)" v-for="(item) in payMethod" :key="item.code">
                            <i class="icon iconfont icon-zhifubaozhifu" v-if="item.code === 'alipayment'"></i>
                            <span v-if="item.code === 'alipayment'">支付宝</span>
                            <i class="icon iconfont icon-weixin" v-if="item.code === 'wxpayment'"></i>
                            <span v-if="item.code === 'wxpayment'">微信</span>
                        </div>
                    </div>
                </div>
                <div class="codeimg" v-if="qrCode">
                    <img :src="qrCode" alt="">
                </div>
                <ul class="foot">
                    <li class="foot-item">应付<span class="unique">￥{{totalPrice}}</span></li>
                    <li>
                        <button class="btn" @click="toPayment">确认订单</button>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script>
import {settlement,zfbpay,queryOrderWithAli,wxpay,queryOrderWithWX} from '@/common/api/payment.js'
import {deleteShopCars} from '@/common/api/shopcar.js'
import {createToken} from '@/common/api/token.js'
export default{
    data(){
        return{
            setArr:[],
            courseInfo:[],
            payment: {},
            totalPrice:'',
            orderNumber: "",
            qrCode:'',
            timeInterVal: "",
            payMethod: [],
            ids:[],
            counter: 0,
            isFinished: false,
            token:'',

        }
    },
    created(){
        this.order()
    },

    methods:{
        queryOrderWithAli(){
            if(this.isFinished){
                return;
            }
            queryOrderWithAli({orderNumber: this.orderNumber}).then(res => {
                if(res.meta.code === "200"){
                    clearInterval(this.timeInterVal)
                    this.$confirm('订单支付成功！', '提示信息', {
                        confirmButtonText: '个人中心',
                        cancelButtonText: '返回首页',
                        type: 'success'
                    }).then(() => {
                        this.$router.push('/about/order')
                    }).catch(() => {
                        this.$router.push('/')
                    });
                    this.isFinished = true
                    sessionStorage.removeItem("selectedArr");
                    this.removeShopCartCourses()
                }
            })
        },
        queryOrderWithWX(){
            if(this.isFinished){
                return;
            }
            queryOrderWithWX({orderNumber: this.orderNumber}).then(res => {
                if(res.meta.code === "200"){
                    clearInterval(this.timeInterVal)
                    this.$confirm('订单支付成功！', '提示信息', {
                        confirmButtonText: '个人中心',
                        cancelButtonText: '返回首页',
                        type: 'success'
                    }).then(() => {
                        this.$router.push('/about/order')
                    }).catch(() => {
                        this.$router.push('/')
                    });
                    this.isFinished = true
                    sessionStorage.removeItem("selectedArr");
                    this.removeShopCartCourses()
                }
            })
        },
        removeShopCartCourses(){
            this.setArr.forEach(item => {
                this.ids.push(item.id)
            })
            createToken().then(res => {
                this.token = res.data.token
                deleteShopCars(this.ids,this.token)
            })
        },
        toPayment(){
            if(!this.payment.code){
                this.$message({
                    message: '请选择支付方式',
                    type: 'error'
                })
            }
            if(this.payment.code === 'alipayment'){
                let data = {courses: this.setArr, payModes: this.payment.code}
                zfbpay(data).then(res => {
                    this.qrCode = res.data.payurl
                    this.orderNumber = res.data.orderNumber;
                    this.timeInterVal = setInterval(this.queryOrderWithAli, 5000)
                })
            }else if(this.payment.code === 'wxpayment'){
                let data = {courses: this.setArr, payModes: this.payment.code}
                wxpay(data).then(res => {
                    this.qrCode = res.data.payurl
                    this.orderNumber = res.data.orderNumber
                    this.timeInterVal = setInterval(this.queryOrderWithWX, 5000)
                })
            }
        },
        //鼠标弹起时触发
        mouseup(payment){
            this.payment = payment
        },
        order(){
            let selectedArr = sessionStorage.getItem("selectedArr");
            if(!selectedArr){
                this.$message({
                    message: '系统错误',
                    type: 'error'
                });
                this.$router.push('/')
                return;
            }
            this.setArr = JSON.parse(selectedArr);
            console.log(this.setArr);
            settlement(this.setArr).then(res => {
                this.payMethod = res.data.payModes
                this.courseInfo = res.data.courses
                this.totalPrice = res.data.totalPrice
            })
        }
    }
}

</script>


<style scoped>
.confirmOrder{
    width: 100%;
    height: 1000px;
}
.bgColor{
  width: 100%;
  height: 200px;
  background-color: red;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
.main-shopcart{
    width: 1200px;
    margin: 0 auto;
    height: 42px;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 35px;
    color: #FFFFFF;
    padding: 30px 0;
    opacity: 1;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.main{
    width: 1200px;
    margin: -100px auto 0 auto;
  /*background-color: red;*/
}
.main h1{
    color: #FFFFFF;
    padding: 30px 0 30px 47px;

}
.info{
    width: 1200px;
    padding: 5px 0px 20px 0px;
    background: #F3F5F7;
    border-radius: 10px;
    box-shadow: 0px 5px 15px 3px #888888;
}
.info-main{
    margin: 10px 20px;
    background: #FFFFFF;
    border-radius: 10px;
    padding: 20px;
}
.head{
    padding: 20px;
    font-size: 18px;
    color: #333333;
}
/* 课程信息 */
.courseInfo{
    display: flex;
    width: 100%;
    height: 160px;
    margin: 0 auto;
}
.coursebg{
    width: 280px;
    height: 160px;
}
.coursebg img{
    width: 100%;
    height: 100%;
}
.courseName{
    margin:0 20px;
    width: 400px;
    height: 160px;
    font-size: 16px;
    color: #07111B;
    line-height:160px ;
    word-break:keep-all;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
.coursePrice{
    margin-left: 100px;
    height: 160px;
    text-align: right;
    line-height: 160px;
}
.coursePrice .nowprice{
    font-size: 18px;
    font-weight: 600;
    color: 1C1F21;
}
.coursePrice .oldprice{
    padding-left: 10px;
    font-size: 14px;
    text-decoration: line-through;
    color: #93999F;

}
/* 支付开始 */
.choose{
    width: 1200px;
    margin: 0 auto;
}
.choose h3{
    color: #222;
    font-size: 16px;
    font-weight: 400;
    padding: 0 20px;
}
.choosebg{
    margin-top: 10px;
    display: flex;
    margin: 20px;
}
.payment{
    width: 130px;
    height: 50px;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 10px;
    line-height: 50px;
    display: flex;
    padding: 0 10px;
    align-items: center;
}
.payment i{
    font-size: 35px;
    margin-right: 10px;
}
.payment span{
    line-height: 50px;
    color: #222222;
    font-weight: bold;
}
.alipayment{
    border: #01a8eb solid 1px;
    color: #01a8eb;
    box-shadow: 0px 1px 2px 1px #01a8eb;
}
.wxpayment{
    border: #01af37 solid 1px;
    color: #01af37;
    box-shadow: 0px 1px 2px 1px #01af37;
}

/* 支付结束 */
/* 结算 */
.foot{
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #333333;
    margin-bottom: 10px;
}
.foot-item{
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
}
.foot-item:first-child{
    margin-top: 3px;
}
.old{
    margin-left: 10px;
}
.unique{
    margin-left: 5px;
    font-size: 24px;
    color: #F01414;
}
.btn{
    margin-right: 20px;
    width: 150px;
    height: 50px;
    border: none;
    color: #FFFFFF;
    font-size: 20px;
    border-radius: 5px;
    background: #F01414;
    cursor: pointer;
    box-shadow: 0px 3px 5px 2px #ff727f;
}
.pay{
    font-size: 24px;
    padding-left: 10px;
    color:#F01414 ;
}
.codeimg{
    margin:0 auto;
    border: #d2d2d2 solid 1px;
    width: 150px;
    height: 150px;
}
.codeimg img{
    width: 100%;
    height: 100%;
}
</style>
