<template>
    <div class="confirmOrder">
        <div class="main">
            <h1>确认订单</h1>
            <div class="info">
                <div class="head">商品信息</div>
                <div class="info-main"  v-for="i in 4" :key="i">
                    <div class="courseInfo">
                        <div class="coursebg">
                            <img src="/image/classbg.png" alt="">
                        </div>
                        <div class="courseName">
                            2021必修 React17+React021必修 React17+React Ho Hook+TS4 最佳实践，仿 Jira 企业
                        </div>
                        <div class="coursePrice">
                            <span class="nowprice">￥311.82</span>
                            <span class="oldprice">￥399</span>

                        </div>
                    </div>
                </div>
                <el-divider></el-divider>
                <ul class="foot">
                    <li class="foot-item">商品总金额<span class="old ">￥299.00</span></li>
                    <li class="foot-item">应付<span class="unique">￥299.00</span></li>
                    <li > 
                        <router-link to="/Payment">
                            <button class="btn">提交订单</button>
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
/* 课程信息 */
.courseInfo{
    display: flex;
    width: 1050px;
    height: 200px;
    margin: 0 auto;
}
.coursebg{
    margin: 10px 0;
    width: 300px;
    height:180px ;
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