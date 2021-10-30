<template>
    <div class="coursemain">
        <div class="course">
            <div class="course-main">
                <div class="course-list">
                    <ul class="title">
                        <li class="title-name">课程方向:</li>
                        <el-tag 
                            class="category-poniter" 
                            effect="plain" 
                            @click="handlerFirst()">
                            全部
                        </el-tag>
                        <el-tag class="category-poniter"
                            v-for="(item,index) in firstArr" :key="index"
                            @click="handlerFirstCategory(item,index)"
                            effect="plain" 
                            :type="buttonType(index)"
                        >{{item.categoryName}}</el-tag>
                        
                    </ul>
                    <ul class="title">
                        <li class="title-name">课程分类:</li>
                        <el-tag 
                            class="category-poniter" 
                            effect="plain" 
                            :type="all2"
                            @click="handlerSecond()">
                            全部
                        </el-tag>
                        <el-tag class="category-poniter"
                            v-for="(item,index) in secondArr" :key="index"
                            @click="handlerSecondCategory(item,index)"
                            effect="plain" 
                            :type="buttonType2(index)"
                        >{{item.categoryName}}</el-tag>
                        
                    </ul>
                    <ul class="title">
                        <li class="title-name">课程难度:</li>
                        <el-tag 
                            class="category-poniter" 
                            effect="plain" 
                            :type="all3==='' ? all3 : 'info'"
                            @click="lev0()">
                            全部
                        </el-tag>
                        <el-tag 
                            class="category-poniter" 
                            effect="plain" 
                            :type="status1"
                            @click="lev1()"
                            >初阶</el-tag>
                        <el-tag 
                            class="category-poniter" 
                            effect="plain" 
                            :type="status2"
                            @click="lev2()"
                            >中阶</el-tag>
                        <el-tag 
                            class="category-poniter" 
                            effect="plain" 
                            :type="status3"
                            @click="lev3()"
                            >高阶</el-tag>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="container-top">
                <ul class="all">
                    <li class="item" @click="handleZonghe"><a href="#">综合</a></li>
                    <li class="item">|</li>
                    <li class="item" @click="handleNewCourse"><a href="#">最新课程</a></li>
                    <li class="item">|</li>
                    <li class="item" @click="mostbuy"><a href="#">最多购买</a></li>
                    <li class="item">|</li>
                    <li class="item">
                        <a href="#">
                            价格
                            <span class="arrow">
                                <img class="up" src="/image/up-arrow8.png" @click="handleUpPrice" />
                                <img class="down" src="/image/up-arrow8.png" @click="handleDownPrice" />
                            </span>
                        </a>
                    </li>  
                </ul>
                <ul class="right">
                    <li class="right-item" @click="freeCourse">
                        <input type="radio" name="mianfei" id="mianfei" class="check" >
                        <span class="right-items">免费课程</span>

                    </li>
                    <li class="right-item">
                        <input type="radio" name="mianfei" id="huiyuan" class="check" >
                        <span class="right-items" @click="memberCourse">会员免费课程</span>
                    </li>
                </ul>
            </div>
            <div class="container-body">
                <div class="newCourseContent">
                    <ul class="courseUl">
                        <li class="courseItem" v-for="(item,index) in arrcourse" :key="index" >
                            <div class="courseInfo">
                                <router-link :to="{path:'/course-info/' + item.id}">
                                        <div class="courseBg">
                                            <img class="courseImg" :src="item.courseCover" alt="">
                                        </div>
                                </router-link>
                                <div class="courseName">{{item.courseName}}</div>
                                <div class="courseDegree">{{item.courseLevel}}   {{item.purchaseCounter + item.purchaseCnt}}人购买</div>
                                <div class="coursePrice">
                                    <!-- <div class="courseMemberbg"><span class="courseMember">会员专享</span></div> -->
                                    <div class="price">¥ {{item.salePrice}}</div>
                                    <div class="addCart" @click="addCart(item)">
                                        <i class="el-icon-shopping-cart-1 cart"></i> 
                                        <span class="cart-text">加入购物车</span>
                                    </div>
                                </div>
                            </div>
                        </li>           
                    </ul>
                </div>
            </div>
            <div class="pages">
                <el-pagination
                    v-show="queryParams.total>0"
                    background
                    layout="prev, pager, next"
                    :total="queryParams.total"
                    @current-change="jumpPage"
                    />
            </div>
            
        </div>
    </div>
</template>

<script>
import {getFirstCategorys,getSecondCategorys} from '@/common/api/courseCategory.js'
import { mapState } from "vuex";
import {addShopCar} from '@/common/api/shopcar.js'
import {createToken} from '@/common/api/token.js'
import {queryCourse} from '@/common/api/courseManage.js'
export default{
    data() {
        return{
            status1:'info',
            status2:'info',
            status3:'info',
            all1:'info',
            all2:'info',
            all3:'',
            firstArr:[],//一级分类
            secondArr:[],//二级分类
            arrcourse:[],//课程信息
            currentType: '', // 当前选中的类型
            currentType2: '', // 当前选中的类型
            currentType3: '',
            degreeArr:[],
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                total: 0,
                entity: {
                    courseName: '',
                    status: '',
                    firstCategory: '',
                    courseLevel:'',
                    secondCategory: '',
                    sortBy:''
                }
            },
            memberId:'',
            courseId:'',
            token:''
        }
    },
    created() {
        this.getFirstCategorys()
        this.getSecondCategorys()
		this.queryCourse(this.queryParams)
	},
    computed: {
        ...mapState({
            userInfo: (state) => state.user.userInfo,
            isLogin: (state) => state.user.isLogin,
        }),
    },
    methods:{
        //加入购物车
        addCart(item){
            createToken().then(res => {
                this.token = res.data.token
                this.memberId = this.userInfo.id
                addShopCar({courseId:item.id,memberId:this.memberId,token:this.token}).then(res => {
                    if(res.meta.code === '200'){
                        this.$message({
                            message: '恭喜你，加入购物车成功',
                            type: 'success'
                        });
                    }
                })
            })
            
        },
        lev0(){
            this.all3 = ''
            this.status1 = 'info'
            this.status2 = 'info'
            this.status3 = 'info'
            this.queryParams.entity.courseLevel = ''
            this.queryCourse(this.queryParams)
        },
        lev1(){
            this.status1 = ''
            this.status2 = 'info'
            this.status3 = 'info'
            this.all3 = 'info'
            this.queryParams.entity.courseLevel = '1'
            this.queryCourse(this.queryParams)

        },
        lev2(){
            this.status2 = ''
            this.status1 = 'info'
            this.status3 = 'info'
            this.all3 = 'info'
            this.queryParams.entity.courseLevel = '2'
            this.queryCourse(this.queryParams)
        },
        lev3(){
            this.status3 = ''
            this.status1 = 'info'
            this.status2 = 'info'
            this.all3 = 'info'
            this.queryParams.entity.courseLevel = '3'
            this.queryCourse(this.queryParams)
        },
        //免费课程
        freeCourse(){
            this.queryParams.entity.isFree = '1'
            this.queryCourse(this.queryParams)
        },
        //会员课程
        memberCourse(){
            this.queryParams.entity.isMember = '1'
            this.queryCourse(this.queryParams)
        },
        //升序排列
        handleUpPrice(){
            this.queryParams.entity.sortBy = 'price-asc'
            this.queryCourse(this.queryParams)
        },
        //降序排列
        handleDownPrice(){
            this.queryParams.entity.sortBy = 'price-desc'
            this.queryCourse(this.queryParams)
        },
        //点击综合
        handleZonghe(){
            this.queryCourse(this.queryParams)
        },
        //点击最新课程
        handleNewCourse(){
            this.queryParams.entity.sortBy = 'time-desc'
            this.queryCourse(this.queryParams)
        },
        //最多购买
        mostbuy(){
            this.queryParams.entity.sortBy = 'purchase-desc'
            this.queryCourse(this.queryParams)
        },
        //获取一级分类
        getFirstCategorys(){
            getFirstCategorys().then(res => {
                if(res.meta.code = '200'){
                    this.firstArr = res.data.list                    
                }
            })
        },
        //获取二级分类
        getSecondCategorys(categoryId){
            getSecondCategorys(categoryId ? categoryId : '-1' ).then(res => {
                if(res.meta.code = '200'){
                    this.secondArr = res.data.list                    
                }
            })
        },
        // 获取一级分类id
        handlerFirstCategory(item, val) {
            this.currentType = val
            this.getSecondCategorys(item.id)
            this.queryParams.entity.firstCategory = item.id
            this.handleQuery()
        },
        // 获取二级分类id
        handlerSecondCategory(item, val) {
            this.currentType2 = val
            this.queryParams.entity.secondCategory = item.id
            this.handleQuery()
        },
        // 更改一级分类type属性
        buttonType(index) {
            this.all1 = 'info'
            if (index === this.currentType) {
                return ''
            } else {
                return 'info'
            }
        },
        // 更改二级分类type属性
        buttonType2(index) {
            if (index === this.currentType2) {
                return ''
            } else {
                return 'info'
            }
        },
        // 一级不限
        handlerFirst() {
            this.queryParams.entity.firstCategory = ''
            this.handleQuery()
        },
        // 二级不限
        handlerSecond() {
            this.queryParams.entity.secondCategory = ''
            this.handleQuery()
        },
        //等级不限
        handlerThird() {
            this.queryParams.entity.courseLevel = ''
            this.handleQuery()
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1
            this.queryCourse(this.queryParams)
        },
        /////////////////////////////////////////////////////////////
      
        // 分页器
        jumpPage(page) {
            this.queryParams.pageNum = page
            this.queryCourse(this.queryParams)
        },
        //获取课程
        queryCourse(queryParams){
            queryCourse(queryParams).then(res => {
                if(res.meta.code = '200'){
                    this.queryParams.total = res.data.pageInfo.total
                    this.arrcourse = res.data.pageInfo.list
                    this.arrcourse.forEach(item => {
                        switch(item.courseLevel){
                        case 1:
                            item.courseLevel = '初级';
                            break;
                        case 2:
                            item.courseLevel = '中级';
                            break;
                        case 3:
                            item.courseLevel = '高级';
                            break;
                        default:
                            item.courseLevel = ''
                        }
                    })
                }   
            })
        },
    }
}
</script>


<style scoped>
/* 分类开始 */
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
.category-poniter{
    height: 25px;
    line-height: 25px;
    margin: 0 15px;
    cursor: pointer;
}


/* 分类结束 */


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
.all .active{
    color: #2C81FF!important;
}
.right{
    display: flex;
    margin-left: 50px;
    padding-top: 50px;
    font-size: 16px;
    color: #515759;
}
.right .right-item{
    cursor: pointer;
    margin-right: 10px;
}
.right .right-items{
    margin-right: 50px;
}
.arrow{
    background: chartreuse;
    position: relative;
}
.check{
    width: 15px;
    height: 15px;
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
    width: 300px;
    height: 40px;
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
    justify-content: space-between;
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
.addCart{
    margin-top: 3px;
    color: #FF3D17;
}
/* 分页结束 */
</style>