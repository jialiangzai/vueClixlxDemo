<template>
  <!-- 首页导航和轮播组件 -->
  <div class="navSwiper">
    <div class="navSwiperContent">
      <div class="navigation">
        <ul>
          <li
            v-for="(item, index) in categorys"
            :key="item.id"
            @mouseenter="mourseHover(index)"
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
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                            <router-link to="#" class="list-item">Vue .js</router-link>
                        </div>
                    </div>
                    <div class="detail-class">
                        
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
import courseType from './courseType.vue'
import http from '../../common/api/requests'

export default {
	data() {
		return {
			msg: '首页导航和轮播组件',
			categorys: [],
			categorysDetail: [],
			sliders: [],
		}
	},
	created() {
		/* this.getFirstCategory()
		this.getSliders() */
	},
	methods: {
		// 课程分类，鼠标进入移出事件
		mourseHover(index) {
			this.$set(this.categorysDetail, index, true)
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
			// console.log('课程分类' , res);
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
			// console.log('轮播图',res);
			this.sliders = res.data.list
		},
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
/* .course-type{
    display: flex;
    width: calc(1300px - 2px);
    margin: 0 auto; */
/* border: #808080 solid 1px; */
/* border-top: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 20px 20px #d2d2d2;
  }
  .course-type .course-type-item{
    width: 260px;
    height: 100px;
    flex: 1;
  }
  .course-type .course-type-item a{
    display: flex;
    justify-content: center;
  }
  .course-type-item .course-type-item-icon{
    font-size: 35px;
    border-radius: 50%;
    margin: 25px 10px 25px 0;
    width: 50px;
    height: 50px;
    background: #55EE8B;
    text-align: center;
    line-height: 50px;
    color: #ffffff;
  }
  .course-type-item .course-type-item-text{
    margin: 25px 0;
  }
  .course-type-item .course-type-item-text .course-type-item-title{
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
  } */
/* .course-type-item .course-type-item-text .course-type-item-desc{
    color: #808080;
    font-size: 14px;
  } */
</style>
