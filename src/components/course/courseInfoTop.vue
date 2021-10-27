<template>
    <div class="courseInfoTop">
        <div class="info-container">
           <ul class="route">
               <li class="route-item">课程</li>
               <li class="route-item">·</li>
               <li class="route-item">免费课</li>
               <li class="route-item">·</li>
               <li class="route-item">2021Android从零入门到实战</li>
           </ul>
           <div class="name">2021Android从零入门到实战</div>
           <div class="info">
               <div class="Avat">
                   <img src="image/Avat62.png" alt="">
               </div>
               <ul class="teacherName">
                   <li class="name-item">张老师</li>
                   <li class="name-item">金牌讲师</li>
               </ul>
               <ul class="access">
                   <li class="access-item">难度</li>
                   <li class="access-item">入门</li>
                   <li class="access-item">·</li>
                   <li class="access-item">时长</li>
                   <li class="access-item">1个小时</li>
                   <li class="access-item">·</li>
                   <li class="access-item">学习人数</li>
                   <li class="access-item">100人</li>
                   <li class="access-item">·</li>
                   <li class="access-item">综合评分</li>
                   <li class="access-item">10.00</li>
               </ul>
           </div>
        </div>
        <div class="info-nav">
            <div class="nav-container">
                <ul class="chapter">
                    <li class="chapter-item active">章节</li>
                    <li class="chapter-item">下载笔记代码</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.body,html{
    background: #F8FAFC;
}
.courseInfoTop{
    width: 100%;
    height: 280px;
    background-image: url('/image/courseInfobg1920.png');
}
/* 背景部分开始 */
.courseInfoTop .info-container{
    margin: 0 auto;
    width: 1300px;
    height: 200px;
    color: #FFFFFF;
    z-index: 5;
}
.route{
    margin-left: 50px;
    padding-top: 20px;
    display: flex;
    font-size: 14px;
}
.route .route-item{
    margin-right: 10px;
}
.name{
    margin: 30px 0 10px 50px;
    font-size: 24px;
}
.info{
    display: flex;
    margin-left: 50px;
}
.teacherName{
    margin: 8px 0 0 8px;
}
.access{
    margin: 15px 0 0 100px;
    display: flex;
}
.access .access-item{
    margin-right: 10px;
}
/* 背景部分结束 */

/* 导航栏开始 */
.info-nav{
    width: 100%;
    height: 80px;
    background: #F8FAFC;
    
}
.nav-container{
    margin: 0 auto;
    width: 1300px;
    height: 100%;
    z-index: 5;
}
.chapter{
    display: flex;
    font-weight: 600;
    color: #333333;
    margin-left: 50px;
    font-size: 20px;
}
.chapter-item{
    line-height: 80px;
    margin-right: 50px;
}
.active{
    color: #388FFF;
    /* padding-bottom: -30px; */
    border-bottom:2px solid #388FFF;

}
/* 导航栏结束 */
</style>