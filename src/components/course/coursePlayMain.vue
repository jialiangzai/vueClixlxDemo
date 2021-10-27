<template>
	<div class="main">
		<div class="name">1-1开发语言必会知识</div>
		<div class="play">
			<div class="play-left">
				<!-- <img class="videos" src="/image/classbg.png" alt="" /> -->
                <video-player  class="video-player vjs-custom-skin"
                    ref="videoPlayer" 
                    :playsinline="true" 
                    :options="playerOptions"
                    

                ></video-player>
               <!--  @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)" -->
			</div>
			<div class="play-right" ref="wrapper">
				<ul class="list" :style="'height:' + '800px'">
					<li class="chapter">第1章 走进科学</li>
					<li class="item" v-for="i in 20" :key="i">
						<div class="video-itemIcon">
							<i class="el-icon-video-camera-solid"></i>
						</div>
						<div class="item-name">
							<span class="shipin">视频:</span>
							<span>1-1开发语言必会知识（10:44)</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
// import iScroll from '../../static/js/iscroll-probe.js'
import Iscroll from 'iscroll'
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
                src: "https://fawn.xuexiluxian.cn/api/profile/video/mp4/01_video.mp4" //url地址
            }],
            poster: "../../static/images/test.jpg", //你的封面地址
            // width: document.documentElement.clientWidth, //播放器宽度
            notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
            }
            }
        }
	},
    computed:{
        player(){
            return this.$refs.videoPlayer.player
        }
    },
	mounted() {
		 
	},
}
</script>

<style scoped>
.main {
	width: 100%;
    margin-bottom: 100px;
}
.name {
	padding: 20px 100px;
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
	height: 595px;
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
	height: 595px;
	overflow: hidden;
	position: relative;
}
.play-right .list {
	margin: 10px 30px;
	width: 400px;
	max-height: 500px;
	/* background: chartreuse; */
}
.list .chapter {
	font-size: 18px;
	padding-bottom: 5px;
	font-weight: bold;
	line-height: 24px;
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
</style>
