<template>
    <div class="fixed">
        <div class="container">
            <div class="main">
                <div class="cart">购物车</div>
                <div class="nav">
                    <span class="left">全部课程</span>
                    <span class="right"><a href="#">查看更多订单</a></span>
                </div>
                <ul class="head">
                    <li class="item check">
                         <input type="checkbox" name="all" id="all" class="all" >
                         <span class="text">全选</span>
                    </li>
                    <li class="item classInfo">课程信息</li>
                    <li class="item price">单价</li>
                    <li class="item count">数量</li>
                    <li class="item total">金额</li>
                    <li class="item function">操作</li>
                </ul>
                <ul class="haveorder" v-for="i in 3" :key="i">
                    <li class="order-item">
                        <input type="checkbox" name="one" id="one" class="one" >
                    </li>
                    <li class="order-item info" >
                        <div class="courseimg" >
                            <img src="/image/classbg.png" alt="">
                        </div>
                        <div class="course-name">晋级TS高手搞定复杂项目晋级TS高手搞定复杂项目</div>
                    </li>

                    <li class="order-item">￥299.00</li>
                    <li class="order-item num">1</li>
                    <li class="order-item totoalprice">￥299.00</li>
                    <li class="order-item delete">
                        <i class="el-icon-delete"></i>
                        <span class="deletd-text"><a href="#">删除</a></span>
                    </li>
                </ul>
                <div class="noOrder" v-if="false">
                    <img src="/image/norder365.png" alt="">
                    <div class="order-alert">哎呦！暂无订单</div>
                </div>
                <el-divider class="line"></el-divider>
                <ul class="foot">
                    <li class="foot-item">已选课程<span class="unique">1</span></li>
                    <li class="foot-item">合计<span class="unique">299.00</span></li>
                    <li > 
                        <button class="btn">结 算</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


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
}
</style>