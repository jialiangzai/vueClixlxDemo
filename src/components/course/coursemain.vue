<template>
    <div class="coursemain">
        <div class="main-container">
            <div class="container-top">
                <ul class="all">
                    <li class="item"><a href="#">综合</a></li>
                    <li class="item">|</li>
                    <li class="item"><a href="#">最新课程</a></li>
                    <li class="item">|</li>
                    <li class="item"><a href="#">最多购买</a></li>
                    <li class="item">|</li>
                    <li class="item">
                        <a href="#">
                            价格
                            <span class="arrow">
                                <img class="up" src="/image/up-arrow8.png" />
                                <img class="down" src="/image/up-arrow8.png" />
                            </span>
                        </a>
                    </li>  
                </ul>
                <ul class="right">
                    <li class="right-item"><a href="#"><img src="/image/choose20.png" alt=""></a></li>
                    <li class="right-items">免费课程</li>
                    <li class="right-item"><a href="#"><img src="/image/choose20.png" alt=""></a></li>
                    <li class="right-items">会员免费课程</li>
                </ul>
            </div>
            <div class="container-body">
                <div class="newCourseContent">
                    <ul class="courseUl">
                        <li class="courseItem" v-for="i in 8" :key="i" @click="goDetail(i)">
                            <div class="courseInfo">
                                <div class="courseBg">
                                    <img class="courseImg" src="/image/classbg.png" alt="">
                                    <div  class="courseDesc">
                                        <div>晋级TS高手</div>
                                        <div>搞定复杂项目</div>
                                    </div>
                                </div>
                                <div class="courseName">晋级TypeScript高手，成为抢手的前端开发人才</div>
                                <div class="courseDegree">中级 · 87人报名</div>
                                <div class="coursePrice">
                                    <div class="courseMemberbg"><span class="courseMember">会员专享</span></div>
                                    <div class="price">¥ 3688.00</div>
                                </div>
                            </div>
                        </li>           
                    </ul>
                </div>
            </div>
            <div class="pages">
                <el-pagination
                class="page"
                background
                layout="prev, pager, next"
                :total="1000">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    methods:{
        goDetail(i){
             this.$router.push('/course-info?id='+i)
        }
    }
}
</script>


<style scoped>
/* 搜索条件开始 */
.coursemain{
    width: 100%;
}
.main-container{
    width: 1300px;
    height: 100%;
    margin: 0 auto;
    /* background: chartreuse; */
}
.container-top{
    display: flex;
    justify-content: space-between;
}
.all{
    display: flex;
    margin-left: 50px;
    padding-top: 50px;
    font-size: 16px;
    color: #515759;
}
.all .item:first-child{
    margin-right: 20px;
}
.all .item{
    margin:0 15px;
}
.right{
    display: flex;
    margin-left: 50px;
    padding-top: 50px;
    font-size: 16px;
    color: #515759;
}
.right .right-item{
    margin-right: 10px;
}
.right .right-items{
    margin-right: 50px;
}
.arrow{
    background: chartreuse;
    position: relative;
}
.up{
    position: absolute;
    top: 5px;
    left:2px;
}
.down{
    position: absolute;
    top: 15px;
    left:2px;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg); 	/* IE 9 */
    -moz-transform:rotate(180deg); 	/* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg); 	/* Opera */
}
/* 搜索调价结束 */
/* 课程内容开始 */
.newCourseContent {
	width: 1300px;
	margin: 15px auto 0px auto;
}
.newCourseContent .courseUl {
	display: flex;
	flex-wrap: wrap;
}
.newCourseContent .courseUl .courseItem {
	width: 310px;
	height: 280px;
	margin: 0 20px 20px 0;
}
.newCourseContent .courseUl .courseItem:hover{
    cursor: pointer;
}
.newCourseContent .courseUl .courseItem:nth-child(4n+0){
    margin-right: 0 !important;
}
.courseCard {
	width: 1300px;
	height: 600px;
	margin: 20px 0 0 0;
}
.courseInfo {
	width: 100%;
	height: 280px;
	background: #ffffff;
	box-shadow: 2px 4px 4px rgba(27, 39, 94, 0.1);
	opacity: 1;
	border-radius: 8px;
}
.courseBg {
	position: relative;
	width: 100%;
	height: 160px;
}
.courseImg {
	width: 100%;
	height: 100%;
}
.courseDesc {
	position: absolute;
	top: 45px;
	left: 15px;
	font-size: 24px;
	color: #ffffff;
}
.courseName {
	margin: 10px;
	font-weight: bold;
	font-size: 14px;
	color: #333333;
}
.courseDegree {
	margin-left: 10px;
	font-size: 12px;
	color: #808080;
}
.coursePrice {
	display: flex;
	font-size: 14px;
	margin: 10px;
}
.courseMemberbg {
	position: relative;
	left: 5px;
	width: 80px;
	height: 25px;
	color: #ffffff;
	background: linear-gradient(90deg, #ff928e 0%, #fe7062 99%);
	border-radius: 24px 0px 24px 0px;
}
.courseMember {
	position: absolute;
	line-height: 25px;
	left: 10px;
}
.price {
	line-height: 25px;
	left: 90px;
	color: #ff727f;
	margin-left: 10px;
}
/* 课程内容结束 */
/* 分页开始 */
.pages{
    width: 500px;
    margin: 50px auto !important;
}
.page{
    width: 100%;
    /* margin: 50px auto !important; */

}
/* 分页结束 */
</style>