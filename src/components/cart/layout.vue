<template>
    <div class="fixed">
        <div class="container">
            <div class="main">
                <div class="cart">购物车</div>
                <div class="nav">
                    <span class="left">全部课程</span>
                    <span class="right">
                        <router-link to="/about/order">
                            <a href="#">查看更多订单</a>
                        </router-link>
                    </span>
                </div>
                <ul class="head">
                    <li class="item check">
                        <el-checkbox v-model="allChecked" @change="selectAll">全选</el-checkbox>
                    </li>
                    <li class="item classInfo">课程信息</li>
                    <li class="item price">单价</li>
                    <li class="item count">数量</li>
                    <li class="item total">金额</li>
                    <li class="item function">操作</li>
                </ul>
                <div v-if="orderList.length > 0">
                    <ul class="haveorder" v-for="(item,index) in orderList" :key="index" >
                        <li class="order-item">
                            <el-checkbox v-model="item.checked" @change="selectSingleProduct($event, item)"></el-checkbox>
                        </li>
                        <li class="order-item info" >
                            <div class="courseimg" >
                                <img :src="item.courseCover" alt="">
                            </div>
                            <div class="course-name">{{item.courseName}}</div>
                        </li>

                        <li class="order-item">￥{{item.discountPrice}}</li>
                        <li class="order-item num">{{item.counter}}</li>
                        <li class="order-item totoalprice">￥{{item.discountPrice * item.counter}}</li>
                        <li class="order-item delete" >
                            <a href="javascript:;" @click="deleteOrder(item.id)">
                                <i class="el-icon-delete"></i>
                                <span class="deletd-text">删除</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="noOrder" v-else>
                    <img src="/image/norder365.png" alt="">
                    <div class="order-alert">哎呦！暂无订单</div>
                </div>
                <el-divider class="line"></el-divider>
                <ul class="foot">
                    <li class="foot-item">已选课程<span class="unique">{{getCount}}</span></li>
                    <li class="foot-item">合计<span class="unique">{{price}}</span></li>
                    <li > 
                        <router-link to="/confirmOrder">
                            <button class="btn" @click="getSelecteds">去结算</button>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {getShopCarList,deleteShopCar} from '@/common/api/shopcar.js'
import {createToken} from '@/common/api/token.js'
export default{
    data(){
        return{
            orderList:[],
            allChecked:false,
            selectedProducts:[],
            token:'',
            count:0,
            price:0,
        }
    },
    created(){
        this.getShopCarList()
    },
    watch:{
        selectedProducts:{
            handler(newval,oldval){
                this.price = 0
                    newval.forEach(item => {
                        this.price += item.discountPrice * item.counter
                    })
            },
            immediate: true
        },
    },
    computed:{
        getCount(){
            return this.selectedProducts.length
        },
    },
    methods:{
        // 去结算
        getSelecteds(){
            let arr = new Array();
            this.selectedProducts.forEach(item => {
                arr.push({'number':item.counter,"id":item.courseId})
            })
            sessionStorage.setItem('selectedArr',JSON.stringify(arr))
            
        },
        //全选
        selectAll(e){
            if(e){
                this.orderList.forEach(item => {
                    item['checked'] = true
                })
            }else{
                this.orderList.forEach(item => {
                    item['checked'] = false
                })
            }
        },
        //数量 、价格变化
        selectSingleProduct(e, item){
            if(e){
                this.selectedProducts.push(item);
            }else{
                for(let i = 0;i < this.selectedProducts.length;i++){
                    if(item.id === this.selectedProducts[i].id){
                        this.selectedProducts.splice(i,1);
                    }
                }
            }
        },
        //获取购物车数据
        getShopCarList(){
            createToken().then(res => {
                this.token = res.data.token
            })
            getShopCarList().then(res => {
                let list = res.data.list
                list.forEach(item => {
                    item['checked'] = false
                })
                this.orderList = list;
            })
        },
        //删除购物车数据
        deleteOrder(id){
            this.$confirm('确定是否删除该订单', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteShopCar({id:id,token:this.token}).then(response => {
                    if (response.meta.code === '200') {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getShopCarList()
                    }
                })
            }).catch(err => {})
        }
    }
}
</script>

<style scoped>
.fixed{
    width: 100%;
    height: 100%;
    background: #FFFFFF;
}
.container{
    width: 1200px;
    margin: 0 auto;
    background: #EBEDF2;
}
.main{
    padding:20px 50px
}
.cart{
    width: 96px;
    height: 42px;
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 0px;
    color: #333333;
    opacity: 1;
}
.nav{
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #E6E6E6;

}
.nav .left{
    width: 80px;
    height: 26px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 0px;
    color: #FF4400;
    opacity: 1;
    border-bottom: 2px solid #FF4400;
}
.nav .right{
    width: 108px;
    height: 24px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 0px;
    color: #333333;
    opacity: 0.5;
}

/* 头部开始 */
.head{
    display: flex;
    margin: 10px 0;
    width: 100%;
    height: 35px;
    line-height: 35px;
    background: #FCFCFC;
    opacity: 1;
    border-radius: 0px;
}
.head .item{
    width: 150px;
    font-size: 14px;
    color: #333333;
}
.check .all{
    margin-right: 10px;
}
.check .text{
    width: 1487px;
    height: 40px;
    
}
.classInfo{
    width: 400px!important;
    color: #333333;
}
/* 头部结束 */

/* 订单开始 */
.haveorder{
    display: flex;
    width: 100%;
    height: 200px;
    background: #FCFCFC;
    margin-bottom: 10px;
}
.haveorder .order-item{
    height: 200px;
    line-height: 200px;
    margin:  5px;
}
.order-item:first-child{
    width: 30px;
}
.order-item{
    width: 150px;
    font-size: 16px;
    color: #333333;
}
.totoalprice{
    color: #E2231A;
}
.num{
    width: 120px !important;
    padding-left: 15px;
}
.info{
    display: flex;
    width: 470px !important;
    height: 200px;
    line-height: 200px;
}
.courseimg{
    margin:40px 20px 40px 0;
    width: 200px;
    height: 120px;
}
.courseimg img{
    width: 100%;
    height: 100%;
}
.info .course-name{
    width: 300px;
   word-break: keep-all;
   white-space: nowrap; 
   overflow: hidden;
   text-overflow: ellipsis;
}
.delete{
    cursor: pointer;
}
.deletd-text{
    margin-left: 5px;
}

/* 订单结束 */

/* 暂无订单开始 */
.noOrder{
    width: 100%;
    height: 100%;
    margin:200px 350px;
}
.order-alert{
    width: 168px;
    height: 31px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 0px;
    color: #B5B9BC;
    opacity: 1;
    margin:20px 120px;

}
/* 暂无订单结束 */
.foot{
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #333333;
    margin-bottom: 10px;
}
.foot-item{
    width: 120px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
}
.unique{
    margin-left: 5px;
    font-size: 24px;
    color: #FF4400;
}
.btn{
    width: 120px;
    height: 40px;
    margin-left: 20px;
    border: none;
    color: #FFFFFF;
    font-size: 22px;
    border-radius: 5px;
    background: #FF4400;
    cursor: pointer;
}
</style>