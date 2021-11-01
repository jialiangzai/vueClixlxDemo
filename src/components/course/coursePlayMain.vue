<template>
	<div class="main">
		<div class="name">{{courseInfo.courseName}}    {{chapterInfo.chapterName}}</div>
		<div class="play">
			<div class="play-left">
                <video-player  class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                    v-if="playerOptions.sources[0].src"
                    @timeupdate = "onPlayerTimeupdate($event)"
                    @ended="onPlayerEnded($event)"
                ></video-player>
                <div class="loading" v-if="!playerOptions.sources[0].src">
                    <img src="/image/loading.gif" alt="">
                    loading...
                </div>
			</div>
			<div class="play-right" ref="wrapper">
				<dl class="list" v-for="(item,index) in chapters" :key="index">
					<dt class="chapter">{{item.chapterName}}</dt>
					<dd class="item" v-for="i in item.children" :key="i.id" @click="play(i)">
						<div class="video-itemIcon">
							<i class="el-icon-video-camera-solid"></i>
						</div>
						<div class="item-name">
							<span class="shipin">视频:</span>
							<span>{{i.chapterName}}</span>
						</div>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</template>

<script>
import {playCourse,updateStudyHour} from '@/common/api/courseManage.js'
import { mapState } from "vuex";
import {recordHistory,getLastHistoryByChapterId} from '@/common/api/history.js'
import {createToken} from '@/common/api/token.js'

export default {
	data() {
		return {
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                    src: "" //url地址
                }],
                poster: "", //你的封面地址
                // width: document.documentElement.clientWidth, //播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },
            courseId:this.$route.params.courseId,
            chapterId:this.$route.params.chapterId,
            chapterInfo:{},
            chapters:[],
            currentTime:'',//播放时间
            memberid:'',//会员id
            count:0,
            courseInfo:{},
            duration:'',
            token:''

        }
	},
	created() {
        let token = sessionStorage.getItem("token");
        if(!token){
            this.$message.error('无法播放视频，请先登录');
            this.$router.go(-1)
        }
        this.playCourse()

        this.playCourse(this.courseId,this.chapterId)

	},
    computed: {
      player(){
        return this.$refs.videoPlayer.player
      },
        ...mapState({
            userInfo: (state) => state.user.userInfo,
            isLogin: (state) => state.user.isLogin,
        }),
    },
    methods:{
        // 播放列表课程
        play(item){
            this.$router.push({path:'/course-play/'+item.courseId+'/'+item.id})
            this.playCourse(item.courseId,item.id)
        },
        //已进入页面播放课程
        playCourse(courseId,chapterId){
            this.memberid = this.userInfo.id
            playCourse(courseId,chapterId).then(res => {
                if(res.meta.code === '200'){
                    console.log(res);
                    this.playerOptions.sources[0].src = res.data.playInfo.playInfoList[0].playURL
                    this.chapterInfo = res.data.chapterInfo
                    this.chapters = res.data.courseInfo.bizCourseChapters
                    this.playerOptions.poster = res.data.courseInfo.courseCover
                    this.courseInfo = res.data.courseInfo
                    this.duration = res.data.playInfo.playInfoList[0].duration
                }else if(res.meta.code === '70001'){
                    this.$message({
                        message: res.meta.msg,
                        type: 'error'
                    });
                    this.$router.go(-1)
                }
            })
            //获取播放历史记录
            getLastHistoryByChapterId({
                memberId:this.memberid,
                courseId:this.courseId,
                chapterId:this.chapterId
            })
        },
         /* 获取视频播放进度 */
        onPlayerTimeupdate (player) {
            this.count++
            this.currentTime = player.cache_.currentTime
            if(this.count == 25){
                recordHistory(
                    {
                        chapterId:this.chapterId,
                        courseId:this.courseId,
                        memberId:this.memberid,
                        lastTime:this.currentTime
                    }
                )
                this.count = 0
            }
        },
        //视频播放结束
        onPlayerEnded(player) {
            recordHistory(
                {
                    chapterId:this.chapterId,
                    courseId:this.courseId,
                    memberId:this.memberid,
                    lastTime:player.cache_.currentTime
                }
            )
            createToken().then(res => {
                updateStudyHour({id:this.userInfo.id,duration:this.duration}, res.data.token)
            })
        },
    }
}
</script>

<style scoped>
.main {
	width: 1200px;
  margin: 0 auto;
  margin-bottom: 121px;
  /*background-color: #00ac06;*/
}
.name {
	padding: 20px 0px;
	width: 193px;
	height: 26px;
	font-size: 20px;
	font-family: Microsoft YaHei;
	font-weight: bold;
	line-height: 21px;
	color: #1c1f21;
	opacity: 1;
}
.play {
	display: flex;
	background: #1c1f21;
}
/* 视频播放开始 */
.play-left {
	width: 1100px;
	height: 500px;
	margin: 0 0 0 20px;
	background: #000;
}
/* .play-left .videos {
	width: 100%;
	height: 500px;
} */
.video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
}
/* 视频播放结束 */
/* 播放列表开始 */
.play-right {
	color: #ffffff;
  width: 300px;
	height: 506px;
	overflow: scroll;
	position: relative;
}
.play-right .list {
	margin: 15px;
	width: 300px;
	max-height: 500px;
	/* background: chartreuse; */
}

.list .chapter {
	font-size: 16px;
	/*padding-bottom: 5px;*/
	font-weight: bold;
	line-height: 30px;
	color: #ffffff;
	opacity: 1;
}

.list .item {
	height: 30px;
	line-height: 30px;
	padding: 2px 0;
	margin: 0 0 5px 0;
	border-radius: 8px;
	color: #a8a9ab;
	cursor: pointer;
}
.item:hover {
	color: #ffffff;
}
.list .item .shipin {
	margin: 0 10px;
}
.video-itemIcon,
.item-name {
	float: left;
}
/* 播放列表结束 */
.video-player{
    height: 300px;
}
.loading{
    color:#ffffff;
    font-size:20px;
    margin: 200px auto;
    width: 100px;
    text-align: center;
}
.loading img{
    width: 100%;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: rgba(240, 240, 240, 1);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  border-radius: 10px;
  background-color: rgba(240, 240, 240, .5);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  background-color: rgba(240, 240, 240, .5);
}
</style>
