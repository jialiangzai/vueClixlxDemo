<template>
  <div class="courseContainer">
    <div class="courseInfoTop">
      <div class="info-container">
        <ul class="route">
          <li class="route-item">课程</li>
          <li class="route-item">·</li>
          <li class="route-item">{{courseInfoArr.isMember === 0 ? '免费课' : '会员课程'}}</li>
          <li class="route-item">·</li>
          <li class="route-item">{{courseInfoArr.courseName}}</li>
        </ul>
        <div class="name">{{courseInfoArr.courseName}}</div>
        <div class="info">
          <div class="Avat">
            <img src="image/Avat62.png" alt="">
          </div>
          <ul class="teacherName">
            <li class="name-item">{{courseInfoArr.lecturerName}}</li>
            <li class="name-item">金牌讲师</li>
          </ul>
          <ul class="access">
            <li class="access-item">难度</li>
            <li class="access-item">{{courseInfoArr.courseLevel}}</li>
            <li class="access-item">·</li>
            <li class="access-item">时长</li>
            <li class="access-item">{{courseInfoArr.totalHour}}个小时</li>
            <li class="access-item">·</li>
            <li class="access-item">学习人数</li>
            <li class="access-item">{{courseInfoArr.purchaseCounter + courseInfoArr.purchaseCnt}}人</li>
            <li class="access-item">·</li>
            <li class="access-item">综合评分</li>
            <li class="access-item">10.00</li>
          </ul>
        </div>
      </div>
    </div>
   
    <div class="info-nav">
        <div class="nav-container">
            <span class="chapter-item " @click="change1" :class="activeChange === 1 ? 'active':''">章节</span>
            <span class="chapter-item " @click="change2" :class="activeChange === 2 ? 'active':''">下载资料</span>
        </div>
    </div>
    <div class="course"  v-if="activeChange === 1">
        <div class="main">
            <div class="introduction">
                <div class="desc">
                    {{courseDetail.description ? courseDetail.description : ""}}
                </div>
                <div class="btn">
                    <button class="btn-item active" @click="goOrder(courseInfoArr)">立即购买</button>
                    <button class="btn-item"  @click="addCart()">加入购物车</button>
                </div>
            </div>
            <div class="video" v-for="(item,index) in courseChapters" :key="index">
            <div class="chapterName">{{item.chapterName}}</div>
            <div class="chapterDesc">{{item.description}}</div>
                <ul class="videos">
                    <li
                    class="video-item"
                    v-for="(j,k) in item.children"
                    :key="k"
                    @mouseenter="mourseHover(j)"
                    @mouseleave="mourseOut(j)">
                        <div class="video-itemIcon">
                            <i class="el-icon-video-camera-solid"></i>
                        </div>
                        <div class="item-name">
                            <span class="shipin">视频:</span>
                            <span>{{j.chapterName}}</span>
                        </div>
                        <button class="btn-learn" v-if="j.isShow" @click="goPlay(courseInfoArr.id,j.id)">
                        开始学习
                        </button>
                        <div class="clearfloat"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="down" v-else  v-for="(x,y) in downsource" :key="y">
        <div class="source">
            <span class="downloadCourse">{{x.attachmentName}}</span>
            <button class="downloadbtn" @click="downloadSource(x)">下载资料</button>
        </div>
    </div>
  </div>
</template>


<script>
import {
	getcourseInfo,
	downloadAttachment,
	checkAuth,
	playCourse,
} from '@/common/api/courseManage.js'
import { createToken } from '@/common/api/token.js'
import { addShopCar } from '@/common/api/shopcar.js'
import { getShopCarCounter } from '@/common/api/auth'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
	data() {
		return {
			BASE_URL: process.env.VUE_APP_BASE_API,
			courseId: this.$route.params.courseId,
			courseInfoArr: {},
			courseDetail: {},
			courseChapters: {},
			downsource: [],
			token: '',
			memberId: '',
			tokens: '',//登录的token
			activeName: 'first',
            activeChange:1
		}
	},
	created() {
		this.tokens = sessionStorage.getItem('token')
		this.getcourseInfo()
	},
	computed: {
		...mapState({
			userInfo: (state) => state.user.userInfo,
			isLogin: (state) => state.user.isLogin,
		}),
	},
	methods: {
		...mapActions(['saveCartNumAction']),
		...mapMutations(['saveLoginDialog']),
        //改变章节和资料的状态
        change1(){
            this.activeChange = 1
        },
        change2(){
            this.activeChange = 2
        },
		//跳转到订单页面
		goOrder(item) {
			if (!this.tokens) {
				this.$message({
					message: '请先登录才能购买哦',
					type: 'error',
				})
				this.$store.commit('saveLoginDialog', true)
			}else{
                if(item.discountPrice === 0){
                    this.$router.push('/confirmOrder')
                }else{
                    
                }
                /* let arr = new Array()
                arr.push({ number: 1, id: item.id })
                sessionStorage.setItem('selectedArr', JSON.stringify(arr))
                this.$router.push('/confirmOrder') */
            }
			
		},
		//下载资料
		downloadSource(item) {
			if (!this.tokens) {
				this.$message({
					message: '购买该课程后才能下载资料哦',
					type: 'error',
				})
				return
			} else {
				checkAuth(item.courseId).then((res) => {
					downloadAttachment(item.courseId, item.id).then((res) => {
						const blob = new Blob([res])
						let fileName = item.attachmentName
						let fileUrl = item.attachmentUrl
						const extName = fileUrl.substring(
							fileUrl.lastIndexOf('.')
						)
						fileName = fileName + extName
						const link = document.createElement('a')
						link.download = fileName
						link.style.display = 'none'
						link.href = URL.createObjectURL(blob)
						document.body.appendChild(link)
						link.click()
						URL.revokeObjectURL(link.href)
						document.body.removeChild(link)
					})
				})
			}
		},
		//加入购物车
		addCart() {
			if (!this.tokens) {
				this.$message({
					message: '请先登录才能加入购物车哦',
					type: 'error',
				})
				this.$store.commit('saveLoginDialog', true)
				return
			}
			createToken().then((res) => {
				this.token = res.data.token
				this.memberId = this.userInfo.id
				addShopCar({
					courseId: this.courseId,
					memberId: this.memberId,
					token: this.token,
				}).then((res) => {
					if (res.meta.code === '200') {
						getShopCarCounter().then((res) => {
							if (res.meta.code == '200') {
								this.saveCartNumAction(res.data.counter)
							} else {
								this.$message({
									message: res.meta.msg,
									type: 'error',
								})
							}
						})
						this.$message({
							message: '恭喜你，加入购物车成功',
							type: 'success',
						})
					}
				})
			})
		},
		//获取课程详情
		getcourseInfo() {
			getcourseInfo(this.courseId).then((res) => {
				if (res.meta.code === '200') {
					this.courseInfoArr = res.data.data
					this.courseDetail = res.data.data.bizCourseDetail
					this.courseChapters = res.data.data.bizCourseChapters
					this.downsource = res.data.data.bizCourseAttachments
					switch (this.courseInfoArr.courseLevel) {
						case 1:
							this.courseInfoArr.courseLevel = '初级'
							break
						case 2:
							this.courseInfoArr.courseLevel = '中级'
							break
						case 3:
							this.courseInfoArr.courseLevel = '高级'
							break
						default:
							this.courseInfoArr.courseLevel = '零基础'
					}
				}
			})
		},
		// 课程分类，鼠标进入移出事件
		mourseHover(j) {
			j.isShow = true
		},
		mourseOut(j) {
			j.isShow = false
		},
		goPlay(courseId, chapterId) {
            if (!this.tokens) {
				this.$message({
					message: '请先登录才能加入购物车哦',
					type: 'error',
				})
				this.$store.commit('saveLoginDialog', true)
				return
			}else{
                playCourse(courseId, chapterId).then((res) => {
                    if (res.meta.code === '70001') {
                        this.$message({
                            message: '购买该课程后才能开始学习哦',
                            type: 'error',
                        })
                        return
                    } else if (res.meta.code === '200') {
                        this.$router.push({
                            path: '/course-play/' + courseId + '/' + chapterId,
                        })
                    }
                })
            }
		},
	},
}
</script>

<style scoped>
.courseContainer {
	width: 100%;
	background: #f8fafc;
}
.main {
	margin: 40px auto;
	width: 1200px;
	height: 100%;
}
.courseInfoTop {
	width: 100%;
	height: 200px;
	background-image: url('/image/courseInfobg1920.png');
}
.nav-container{
    width: 1200px;
    margin:0 auto
}
.nav-container .active{
    color: #388FFF;
    border-bottom: 2px solid #388FFF;
}
/* 背景部分开始 */
.courseInfoTop .info-container {
	margin: 0 auto;
	width: 1200px;
	height: 200px;
	color: #ffffff;
	z-index: 5;
}
.route {
	/*margin-left: 50px;*/
	padding-top: 20px;
	display: flex;
	font-size: 14px;
}
.route .route-item {
	margin-right: 10px;
}
.name {
	margin: 30px 0 10px 0px;
	font-size: 24px;
}
.info {
	display: flex;
	/*margin-left: 50px;*/
}
.teacherName {
	margin: 8px 0 0 8px;
}
.access {
	margin: 15px 0 0 100px;
	display: flex;
}
.access .access-item {
	margin-right: 10px;
}
/* 背景部分结束 */

/* 导航栏开始 */
.info-nav {
	width: 100%;
    
	background: #ffffff;
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.course {
	margin: 0 auto;
	width: 1200px;
}
.chapter {
	display: flex;
	font-weight: 600;
	color: #333333;
	margin-left: 50px;
	font-size: 20px;
}
.chapter-item {
    padding-bottom: 8px;
    font-size: 20px;
    font-weight: bold;
	line-height: 80px;
	margin-right: 50px;
    cursor: pointer;
}

/* 导航栏结束 */
/* 课程介绍开始 */
.introduction {
	/*margin-left: 50px;*/
	/*padding: 20px;*/
	width: 1210px;
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
}
.desc {
	padding: 20px;
	color: #474747;
}
.btn {
	float: right;
	margin-top: 10px;
	padding: 0 20px 20px;
}
.btn-item {
	width: 120px;
	height: 40px;
	/*margin: 0 20px 0 0;*/
	padding: 0px;
	border: 0px;
	outline: none;
	color: #f11d1d;
	border-radius: 23px;
	cursor: pointer;
}
.btn .active {
	background: #f11d1d !important;
	color: #ffffff;
	margin-right: 10px;
}
/* 课程介绍结束 */

/* 视频目录开始 */
.video {
	margin: 20px 0;
	padding: 20px;
	width: 1170px;
	background: #ffffff;
	border-radius: 8px;
	overflow: hidden;
}
.video .chapterName {
	font-weight: bold;
	font-size: 20px;
	color: #333333;
}
.chapterDesc {
	margin: 10px 0;
	font-size: 13px;
	color: #5c5c5c;
}
.video-item {
	height: 40px;
	line-height: 40px;
	padding: 5px 0;
	margin: 0 0 10px 0;
	border-radius: 8px;
}
.video-item:hover {
	cursor: pointer;
	background: rgba(53, 133, 255, 0.2);
	border-radius: 8px;
	color: #388fff !important;
}
.video-item .shipin {
	/*margin: 0 10px;*/
}
.video-itemIcon,
.item-name {
	float: left;
}
.btn-learn {
	margin: 5px 5px 0 0;
	float: right;
	right: -100px;
	width: 80px;
	height: 30px;
	line-height: 30px;
	border: 0px;
	outline: none;
	color: #fff;
	background: #388fff;
	border-radius: 12px;
	cursor: pointer;
}
.clearfloat {
	clear: both;
}
/* 视频目录结束 */
.source {
    margin: 2px 0;
	padding: 5px ;
	display: flex;
	justify-content: space-between;
}
.down {
	margin: 10px auto;
	width: 1200px;
	height: 100%;
	padding: 5px;
	background: #ffffff;
	box-sizing: border-box;
	border-radius: 8px;
}
.down:first-child{
    margin: 40px 0 5px 0;
}
.downloadbtn {
	width: 100px;
	height: 30px;
	line-height: 30px;
	background: #388fff;
	border: none;
	border-radius: 8px;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}
</style>
