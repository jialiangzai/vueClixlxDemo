<template>
  <!-- 首页导航和轮播组件 -->
  <div class="navSwiper">
    <div class="navSwiperContent">
      <div class="navigation">
        <ul>
          <li
            v-for="(item, index) in categorys"
            :key="item.id"
            @mouseenter="mourseHover(item,index)"
            @mouseleave="mourseOut(index)"
          >
            <router-link to="/" :title="item.categoryName"
              >{{ item.categoryName }} <i class="el-icon-arrow-right"></i
            ></router-link>
            <div class="category-detail" v-if="categorysDetail[index]">
                <div class="detail-main">
                    <div class="detail-desc">基础知识</div>
                    <div class="detail-list"> 
                        <div class="list-know">知识点:</div>
                        <div class="list-ul">
                            <router-link to="/course" class="list-item" v-for="(item,index) in tagarr" :key="index" >{{item.tagName}}</router-link>
                        </div>
                    </div>
                    <div class="detail-class">
                        <div class="course-card" v-for="(item,index) in arrcourse" :key="index" >
                            <router-link :to="{path:'/course-info/' + item.id}">
                                <div class="course-image">
                                    <img :src="item.courseCover" alt="">
                                </div>
                                <div class="right">
                                    <div class="courseName">{{item.courseName}}</div> 
                                    <div class="courseDegree">{{item.courseLevel}}   {{item.purchaseCounter}}人购买</div>
                                    <div class="buy">
                                        <div class="learn">免费学习</div>
                                        <div class="car">
                                            <div class="cart-image">
                                                <img src="/image/cart16.png" alt="">
                                            </div>
                                            <span class="addcart">加购物车</span>
                                        </div>

                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="sliders">
        <el-carousel height="460px">
          <el-carousel-item v-for="item in sliders" :key="item.id">
            <router-link :to="item.pcHref">
              <img
                :src="item.imageUrl"
                :title="item.imageName"
                class="sliders-item-image"
              />
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 课程分类开始 -->
    <courseType></courseType>
    <!-- 课程分类结束 -->
  </div>
</template>

<script>
import {queryCourse} from '@/common/api/courseManage.js'
import {queryCourseTag} from '@/common/api/courseTag.js'
import courseType from './courseType.vue'
import http from '../../common/api/requests'

export default {
	data() {
		return {
			msg: '首页导航和轮播组件',
			categorys: [],
			categorysDetail: [],
			sliders: [],
            arrcourse:[],//课程信息
            tagarr:[],//标签数组
            querycourse:{
                pageNum: 1,
                pageSize: 4,
                entity: {
                    firstCategory:''
                }
            },

		}
	},
	created() {
		this.getFirstCategory()
		this.getSliders()
	},
	methods: {
		// 课程分类，鼠标进入移出事件
		mourseHover(item,index) {
			this.$set(this.categorysDetail, index, true)
            this.querycourse.entity.firstCategory = item.id
            this.queryCourseTag()
            this.queryCourse()
		},
		mourseOut(index) {
			this.$set(this.categorysDetail, index, false)
		},
		// 获取课程一级分类
		async getFirstCategory() {
			let res = await http.$axios({
				url: 'api/course/category/getFirstCategorys',
				method: 'GET',
				header: {
					'Content-Type': 'application/json',
					// "Content-Type":"application/x-www-form-urlencoded"
				},
			})
			this.categorys = res.data.list
			this.categorysDetail = new Array(this.categorys.length)
			for (let i = 0; i < this.categorysDetail.length; i++) {
				this.categorysDetail[i] = false
			}
		},
		// 获取轮播图
		async getSliders() {
			let res = await http.$axios({
				url: 'api/slider/getSliders',
				method: 'GET',
				header: {
					'Content-Type': 'application/json',
					// "Content-Type":"application/x-www-form-urlencoded"
				},
			})
			this.sliders = res.data.list
		},
        //查询课程
        queryCourse(){
            queryCourse(this.querycourse).then(res => {
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
            })
        },
        //获取课程标签
        queryCourseTag(){
            queryCourseTag(this.querycourse).then(res => {
                this.tagarr = res.data.pageInfo.list
            })
        }
       
	},
	components: {
		courseType,
	},
}
</script>

<style scoped>
.navSwiper {
	padding-top: 1px;
	width: 100%;
	height: 640px;
	background: url(/image/transitionbg.png);
}
.navSwiperContent {
	width: 1300px;
	height: 460px;
	margin: 35px auto 0 auto;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	overflow: hidden;
	display: flex;
}
.navigation {
	width: 240px;
	height: 460px;
	background: #2b283d;
	position: relative;
}
.navigation ul {
	margin: 35px 0;
}
.navigation ul li {
	height: 40px;
	list-style: none;
	margin-bottom: 10px;
}
.navigation ul li a i {
	line-height: 40px;
	float: right;
}
.navigation ul li a {
	color: #ffffff;
	text-decoration: none;
	height: 40px;
	padding: 0 20px;
	line-height: 40px;
	display: block;
    font-size: 16px;
    font-weight: bold;
}
.navigation ul li a:hover {
	background: linear-gradient(to right, #3fe5ff, transparent);
}
.category-detail {
	position: absolute;
	top: 0;
	left: 240px;
	background: rgba(255, 255, 255, 0.9);
	z-index: 65535;
	min-width: 700px;
	height: 460px;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
}
.sliders {
	width: 1060px;
	height: 460px;
}
.sliders-item-image {
	width: 100%;
	height: 100%;
}
/* 分类详情 */
.detail-main{
    height: 100%;
    margin: 0 10px;
}
.detail-list{
    width: 100%;
    display: flex;
    margin-top:10px;
    color: #333333;
    font-weight: 400;
    font-size: 14px;
}
.detail-desc {
    padding-top: 20px;
	height: 26px;
	font-size: 16px;
	font-weight: bold;
	color: #333333;
	opacity: 1;
}
.list-know{
    width: 70px;
    height: 30px;
    line-height: 30px;
}
.list-ul{
    width: calc(100% - 70px);
    display: flex;
    flex-wrap: wrap;
}
.list-item{
    line-height: 30px !important;
    padding: 0 10px !important;
    color: #333333 !important;
    font-size: 14px !important;
    font-weight: unset !important;
}
.list-item:hover{
    background: unset !important;
    color: #00ffff;
}
/* 分类详情结束 */
/* 下侧课程开始 */
.detail-class{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 700px;
    height: 250px;
    margin-top: 30px;
}
.course-card{
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    width: 320px;
    height: 130px;
    background: #F3F5F6;
    cursor: pointer;
}
.course-image{
	position: relative;
    width:180px ;
    height: 100%;
}
.course-image img{
    width: 100%;
    height: 100%;
}
.course-image  .courseDesc{
    position: absolute;
	top: 40px;
	left: 15px;
	font-size: 16px;
    font-weight: bold;
	color: #ffffff;
}
.right{
    width: 100%;
    height: 130px;
}
.courseName{
    width: 150px;
    height: 35px;
    margin: 5px 0 0 5px;
	font-weight: bold;
	font-size: 13px;
	color: #333333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.courseDegree{
    margin: 30px 0 0 5px;
    font-size: 12px;
    color: #808080;
}
.buy{
    display: flex;
    margin: 20px 0 0 5px;
    justify-content: space-between;
}
.buy .learn{
    color: #3586FF;
    font-size: 13px;
}
.buy .car{
    display: flex;
    margin-right: 5px;
}

.buy .addcart{
    margin-left: 2px;
    color: #FF3D17;
    font-size: 13px;

}
/* 下侧课程结束 */
</style>
