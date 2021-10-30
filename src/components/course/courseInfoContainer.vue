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
                    <li class="access-item">{{courseInfoArr.purchaseCounter}}人</li>
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
                    </ul>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="introduction">
                <div class="desc">
                    {{courseDetail.description ? courseDetail.description : ""}}  
                </div>
                <div class="btn">
                    <button class="btn-item active">立即购买</button>
                    <button class="btn-item"  @click="addCart()">加入购物车</button>
                </div>
            </div>
            <div class="video" v-for="(item,index) in courseChapters" 
                                :key="index">
                <div class="chapterName">{{item.chapterName}}</div>
                <!-- <div class="chapterDesc">从零开始完整的讲解了力推且备受万千开发者喜爱的语言</div> -->
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
            <div class="video" >
                <div class="chapterName">下载资料</div>
                <div class="source" v-for="(x,y) in downsource" :key="y">
                    <span class="chapterName">{{x.attachmentName}}</span>
                    <!-- <span>
                        <a href="#">{{x.attachmentUrl}}</a>
                    </span> -->
                    <button class="download" @click="downloadSource(x)">下载资料</button>
                </div>
                
            </div>
        </div> 
        
    </div>
</template>


<script>
import {getcourseInfo,downloadAttachment,checkAuth} from '@/common/api/courseManage.js'
import { mapState } from "vuex";
import {createToken} from '@/common/api/token.js'
import {addShopCar} from '@/common/api/shopcar.js'


export default{
    data(){
        return{
            BASE_URL: process.env.VUE_APP_BASE_API,
            courseId:this.$route.params.courseId,
            courseInfoArr:{},
            courseDetail: {},
            courseChapters:{},
            downsource:[],
            token:'',
            memberId:''

        }
    },
    created(){
        this.getcourseInfo()
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.user.userInfo,
            isLogin: (state) => state.user.isLogin,
        }),
    },
    methods:{
        //下载资料
        downloadSource(item){
            checkAuth(item.courseId,).then(res => {
                if(res.data.data.hasAuth){
                    downloadAttachment(item.courseId,item.id).then((res) => {
                        const blob = new Blob([res])
                        let fileName = item.attachmentName
                        let fileUrl = item.attachmentUrl
                        const extName = fileUrl.substring(fileUrl.lastIndexOf("."))
                        fileName = fileName + extName;
                        const link = document.createElement('a')
                        link.download = fileName
                        link.style.display = 'none'
                        link.href = URL.createObjectURL(blob)
                        document.body.appendChild(link)
                        link.click()
                        URL.revokeObjectURL(link.href)
                        document.body.removeChild(link)
                    })
                }else{
                    this.$message({
                        message: '购买该课程后才能下载资料哦',
                        type: 'error'
                    });
                }
            })
        },
        //加入购物车
        addCart(item){
            createToken().then(res => {
                this.token = res.data.token
                this.memberId = this.userInfo.id
                addShopCar({courseId:this.courseId,memberId:this.memberId,token:this.token}).then(res => {
                    if(res.meta.code === '200'){
                        this.$message({
                            message: '恭喜你，加入购物车成功',
                            type: 'success'
                        });
                    }
                })
            })
        },
        getcourseInfo(){
            getcourseInfo(this.courseId).then(res => {
                if(res.meta.code === '200'){
                    this.courseInfoArr = res.data.data
                    this.courseDetail = res.data.data.bizCourseDetail
                    this.courseChapters = res.data.data.bizCourseChapters
                    this.downsource = res.data.data.bizCourseAttachments
                    switch(this.courseInfoArr.courseLevel){
                    case 1:
                        this.courseInfoArr.courseLevel = '初级';
                        break;
                    case 2:
                        this.courseInfoArr.courseLevel = '中级';
                        break;
                    case 3:
                        this.courseInfoArr.courseLevel = '高级';
                        break;
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
        goPlay(courseId,chapterId){
            this.$router.push({path:'/course-play/'+courseId+'/'+chapterId})
        }
    }
}
</script>

<style scoped>
.courseContainer{
    width: 100%;
}
.main{
    margin: 20px auto;
    width: 1300px;
    height: 100%;
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
    border-bottom:2px solid #388FFF;

}
/* 导航栏结束 */
/* 课程介绍开始 */
.introduction{
    margin-left: 50px;
    padding: 20px;
    width: 1210px;
    background: #F8FAFC;
    border-radius: 10px;
    overflow: hidden;
}
.desc{
    color: #474747;
}
.btn{
    float: right;
    margin-top: 10px;
}
.btn-item{
    width: 120px;
    height: 40px;
    margin: 0 20px 0 0;
    padding: 0px;
    border: 0px;
    outline: none;
    color: #F11D1D;
    border-radius: 23px;
    cursor: pointer;
}
.btn .active{
    background: #F11D1D!important;
    color: #FFFFFF;
}
/* 课程介绍结束 */

/* 视频目录开始 */
.video{
    margin:20px 0 0 50px;
    padding: 20px;
    width: 1210px;
    background: #F8FAFC;
    border-radius: 10px;
    overflow: hidden;
}
.chapterName{
    font-weight: bold;
    font-size: 20px;
    color: #333333;
}
.chapterDesc{
    margin: 10px 0;
    font-size: 13px;
    color: #5C5C5C;
}
.video-item{
    height: 30px;
    line-height: 30px;
    padding: 5px 0;
    margin: 0 0 10px 0;
    border-radius: 8px;
}
.video-item:hover{
    color: #3585FF;
}
.video-item .shipin{
    margin: 0 10px;
}
.video-itemIcon,.item-name{
    float: left;
}
.btn-learn{
    float: right;
    width: 80px;
    height: 30px;
    margin: 0;
    padding: 0px;
    border: 0px;
    outline: none;
    color: #FFF;
    background: #388FFF;
    border-radius: 12px;
    cursor: pointer;
}
.clearfloat{
    clear: both;
}
/* 视频目录结束 */
.source{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
}
.source:hover{
    cursor: pointer;
    background: rgba(133, 196, 206,.2);
    border-radius: 10px;
    color: #388FFF!important;
}
.chapterName{
    padding: 0 30px;
}
.download{
    width: 100px;
    height: 30px;
    background: #388FFF;
    border:none;
    border-radius: 10px;
    color: #FFF;
    font-size: 14px;
    cursor: pointer;
}
</style>