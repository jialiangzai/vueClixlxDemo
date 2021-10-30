<template>
    <div class="confirmOrder">
        <div class="main">
            <h1>确认订单</h1>
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
import {mapState} from 'vuex'
import {settlement,zfbpay,queryOrderWithAli,wxpay,queryOrderWithWX} from '@/common/api/payment.js'
import {deleteShopCar,deleteShopCars} from '@/common/api/shopcar.js'
export default{
    data(){
        return{
            setArr:[],
            courseInfo:[],
            payment: {},
            totalPrice:'',
            end:{},
            orderNumber: "aa",
            qrCode:'',
            timeInterVal: "",
            payMethod: [],
            ids:[]
        }
    },
    created(){
        this.getNumberId()
        this.order()
    },
    computed:{
        ...mapState({
            selectedArr:state => state.cart.selectedArr
        })
    },
    methods:{
        queryOrderWithAli(){
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
                    this.removeShopCartCourses()
                }
            })
        },
        queryOrderWithWX(){
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
                    this.removeShopCartCourses()
                }
            })
        },
        removeShopCartCourses(){
            this.setArr.forEach(item => {
                this.ids = item.id
            })
            deleteShopCars(this.ids)
        },
        toPayment(){
            if(this.payment.code === 'alipayment'){
                this.end = {courses:this.setArr,payModes:"alipayment"}
                zfbpay(this.end).then(res => {
                    this.qrCode = res.data.payurl
                    this.orderNumber = res.data.orderNumber;
                    this.timeInterVal = setInterval(this.queryOrderWithAli, 5000)
                })
            }else if(this.payment.code === 'wxpayment'){
                this.end = {courses:this.setArr,payModes:"wxpayment"}
                wxpay(this.end).then(res => {
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
        getNumberId(){
            this.selectedArr.forEach(item => {
                 this.setArr.push({'number':item.counter,"id":item.courseId})
            })
        },
        order(){
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
.main{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
}
.main h1{
    padding: 30px 0;
}
.info{
    width: 1200px;
    padding:5px 0 ;
    background: #F3F5F7;
    border-radius: 10px;
}
.info-main{
    width: 1100px;
    margin: 10px auto;
    background: #FFFFFF;
    border-radius: 10px;
}
.head{
    padding: 20px 0 0 50px;
    font-size: 18px;
    color: #333333;
}
/* 课程信息 */
.courseInfo{
    display: flex;
    width: 1050px;
    height: 200px;
    margin: 0 auto;
}
.coursebg{
    margin: 15px 0;
    width: 280px;
    height:150px ;
}
.coursebg img{
    width: 100%;
    height: 100%;
}
.courseName{
    margin:0 10px;
    width: 400px;
    height: 200px;
    font-size: 16px;
    color: 07111B;
    line-height:200px ;
    word-break:keep-all;      
    white-space:nowrap;       
    overflow:hidden;           
    text-overflow:ellipsis;
}
.coursePrice{
    margin-left: 100px;
    width: 200px;
    height: 200px;
    line-height: 200px;
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
    font-size: 16 px;
    font-weight: 400;
    padding-left: 50px;
}
.choosebg{
    margin-top: 10px;
    display: flex;
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
}
.wxpayment{
    border: #01af37 solid 1px;
    color: #01af37;
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
    margin-right: 50px;
    width: 150px;
    height: 50px;
    border: none;
    color: #FFFFFF;
    font-size: 20px;
    border-radius: 5px;
    background: #F01414;
    cursor: pointer;
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