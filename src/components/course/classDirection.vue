<template>
    <div class="course">
        <div class="course-main">
            <div class="course-list">
                <ul class="title">
                    <li class="title-name">课程方向:</li>
                    <li class="all-list"><a href="#"><span class="all">全部</span></a></li>
                    <li class="item"><a href="#">前端开发</a></li>
                    <li class="item"><a href="#">移动开发</a></li>
                    <li class="item"><a href="#">前沿技术</a></li>
                    <li class="item"><a href="#">求职面试</a></li>
                </ul>
                <ul class="title">
                    <li class="title-name">课程分类:</li>
                    <li class="all-list"><a href="#"><span class="all">全部</span></a></li>
                    <li class="item"><a href="#">HTML+CSS</a></li>
                    <li class="item"><a href="#">JavaScript</a></li>
                    <li class="item"><a href="#">Jquery</a></li>
                    <li class="item"><a href="#">前端算法</a></li>
                    <li class="item"><a href="#">HTML+CSS3</a></li>
                    <li class="item"><a href="#">Mui+HTML5plus</a></li>
                    <li class="item"><a href="#">WEBPack</a></li>
                    <li class="item"><a href="#">git</a></li>
                    <li class="item"><a href="#">ES6</a></li>
                    <li class="item"><a href="#">VUE</a></li>
                </ul>
                <ul class="title">
                    <li class="title-name">课程难度:</li>
                    <li class="all-list"><a href="#"><span class="all">全部</span></a></li>
                    <li class="item"><a href="#">零基础</a></li>
                    <li class="item"><a href="#">初阶</a></li>
                    <li class="item"><a href="#">进阶</a></li>
                    <li class="item"><a href="#">高阶</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>


<style scoped>

.course {
	width: 100%;
	height: 220px;
	background: #F3F5F9;
}
.course-main{
    width: 1300px;
    height: 100%;
    margin: 0 auto;
}
.course-list{
    margin-left: 50px;
}
.title{
    display: flex;
    padding-top: 40px;
}
.title .title-name{
    width: 90px;
    height: 24px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 21px;
    color: #333333;
    opacity: 1;
}
.title .all-list{
    width: 40px;
    height: 25px;
    line-height: 25px;
    background: #7FD4FF;
    border-radius: 4px;
    padding: 0 10px;
    align-items: center;
    text-align: center;
}
.title .all{
    opacity: 1;
    color: #2C80FF;
}
.title .item{
    height: 25px;
    line-height: 25px;
    margin: 0 15px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 21px;
    color: #515759;
    opacity: 1;
}
</style>