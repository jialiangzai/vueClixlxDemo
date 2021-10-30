<template>
    <div class="confirmOrder">
        <div class="main">
            <h1>支付中心</h1>
            <div class="info">
                <div class="head">订单：2110291939571959</div>
                <div class="choose">
                    <el-divider></el-divider>
                    <h3>支付方式</h3>
                    <div class="choosebg">
                        <div class="zfb">
                            <img class="zfb-img"  alt="">
                        </div>
                        <div class="wx">
                            <img class="wx-img"  alt="">
                        </div>
                    </div>
                </div>
                <el-divider></el-divider>
                <ul class="foot">
                    <li class="foot-item">应付金额<span class="unique">￥299.00</span></li>
                    <li > 
                        <router-link to="/Payment">
                            <button class="btn">立即付款</button>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

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
/* 支付方式 */
.choose{
    width: 1200px;
    height: 250px;
    margin: 0 auto;
}
.choose h3{
    color: #222;
    font-size: 16 px;
    font-weight: 400;
    padding-left: 50px;
}
.choosebg{
    position: relative;
    margin-top: 10px;
    
}

.zfb{
    position: absolute;
    top: 10px;
    left: 200px;
    background: url('./../../../public/image/choose.png') no-repeat 92px -270px;
    width: 300px;
    height: 150px;
    border-radius: 10px;
    cursor: pointer;
}
.zfb img{
    width: 100%;
    height: 100%;
    border:none
}
.wx{
    position: absolute;
    top: 10px;
    left: 700px;
    width: 300px;
    height: 150px;
    background: url('./../../../public/image/choose.png') no-repeat 92px -389px;
    cursor: pointer;
}
.wx img{
    width: 100%;
    height: 100%;
    border:none
}
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
</style>