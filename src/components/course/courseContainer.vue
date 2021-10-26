<template>
    <div class="courseContainer">
        <div class="main">
            <div class="introduction">
                <div class="desc">
                    简介：全面系统地介绍国有资产管理的基本理论、基本知识、基本方法和我国现行国有资产管理方面的政策与制度，努力反映我国国有资产管理体制改革的最新成果和国内外国有资产
    管理的实践经验。本书大体上按国有资产管理原理、国有资产基础管理、国有资产经营管理和国有资产综合管理的体系安排，以便客观全面地介绍国有资产管理的理论与实务，同时也
    便于学生由浅入深、循序渐进地学习。    
                </div>
                <div class="btn">
                    <button class="btn-item active">立即购买</button>
                    <button class="btn-item">加入购物车</button>
                </div>
            </div>
            <div class="video"
                v-for="(item,index) in arr "
                :key='index'
            >
                <div class="chapterName">{{item.chapterName}}</div>
                <div class="chapterDesc">从零开始完整的讲解了力推且备受万千开发者喜爱的语言</div>
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

                        <button class="btn-learn" v-if="j.isShow">开始学习</button>
                        <div class="clearfloat"></div>
                    </li>
                    
                </ul>
            </div>
        </div>
        
    </div>
</template>


<script>
export default{
    data(){
        return{
             arr: [
                {
                    children: [
                        {
                            isShow:false,
                            children: [],//下级章节
                            chapterName: "xiaojie111",//章节名称
                            attachmentUrl: "",//视频地址
                            courseId: "",//课程ID
                            updateTime: null,//修改时间
                            createTime: null,//创建时间
                            chapterType: 0,//章节类型（1：章；2：小节；3：测验）
                            createBy: "",//创建人
                            updateBy: "",//修改人
                            sort: 0,//排序
                            parentId: "",//上级章节
                            publicType: 0,//公开视频（1：免费；2：试听）
                            attachmentType: 0,//附件类型（1：视频；2：音频；3：PPT；4：文档）
                            id: ""//主键
                        }
                    ],//下级章节
                    chapterName: "第1章 开发语言内容各有不同",//章节名称
                    attachmentUrl: "",//视频地址
                    courseId: "",//课程ID
                    updateTime: null,//修改时间
                    createTime: null,//创建时间
                    chapterType: 0,//章节类型（1：章；2：小节；3：测验）
                    createBy: "",//创建人
                    updateBy: "",//修改人
                    sort: 0,//排序
                    parentId: "",//上级章节
                    publicType: 0,//公开视频（1：免费；2：试听）
                    attachmentType: 0,//附件类型（1：视频；2：音频；3：PPT；4：文档）
                    id: ""//主键
                },
                {
                    children: [
                        {
                            isShow:false,
                            children: [],//下级章节
                            chapterName: "xiaojie111",//章节名称
                            attachmentUrl: "",//视频地址
                            courseId: "",//课程ID
                            updateTime: null,//修改时间
                            createTime: null,//创建时间
                            chapterType: 0,//章节类型（1：章；2：小节；3：测验）
                            createBy: "",//创建人
                            updateBy: "",//修改人
                            sort: 0,//排序
                            parentId: "",//上级章节
                            publicType: 0,//公开视频（1：免费；2：试听）
                            attachmentType: 0,//附件类型（1：视频；2：音频；3：PPT；4：文档）
                            id: ""//主键
                        },{
                            isShow:false,
                            children: [],//下级章节
                            chapterName: "xiaojie111",//章节名称
                            attachmentUrl: "",//视频地址
                            courseId: "",//课程ID
                            updateTime: null,//修改时间
                            createTime: null,//创建时间
                            chapterType: 0,//章节类型（1：章；2：小节；3：测验）
                            createBy: "",//创建人
                            updateBy: "",//修改人
                            sort: 0,//排序
                            parentId: "",//上级章节
                            publicType: 0,//公开视频（1：免费；2：试听）
                            attachmentType: 0,//附件类型（1：视频；2：音频；3：PPT；4：文档）
                            id: ""//主键
                        },{
                            isShow:false,
                            children: [],//下级章节
                            chapterName: "xiaojie111",//章节名称
                            attachmentUrl: "",//视频地址
                            courseId: "",//课程ID
                            updateTime: null,//修改时间
                            createTime: null,//创建时间
                            chapterType: 0,//章节类型（1：章；2：小节；3：测验）
                            createBy: "",//创建人
                            updateBy: "",//修改人
                            sort: 0,//排序
                            parentId: "",//上级章节
                            publicType: 0,//公开视频（1：免费；2：试听）
                            attachmentType: 0,//附件类型（1：视频；2：音频；3：PPT；4：文档）
                            id: ""//主键
                        }
                    ],//下级章节
                    chapterName: "第2章 开发语言内容各有不同",//章节名称
                    attachmentUrl: "",//视频地址
                    courseId: "",//课程ID
                    updateTime: null,//修改时间
                    createTime: null,//创建时间
                    chapterType: 0,//章节类型（1：章；2：小节；3：测验）
                    createBy: "",//创建人
                    updateBy: "",//修改人
                    sort: 0,//排序
                    parentId: "",//上级章节
                    publicType: 0,//公开视频（1：免费；2：试听）
                    attachmentType: 0,//附件类型（1：视频；2：音频；3：PPT；4：文档）
                    id: ""//主键
                },
                {
                    children: [
                        {
                            isShow:false,
                            children: [],//下级章节
                            chapterName: "xiaojie111",//章节名称
                            attachmentUrl: "",//视频地址
                            courseId: "",//课程ID
                            updateTime: null,//修改时间
                            createTime: null,//创建时间
                            chapterType: 0,//章节类型（1：章；2：小节；3：测验）
                            createBy: "",//创建人
                            updateBy: "",//修改人
                            sort: 0,//排序
                            parentId: "",//上级章节
                            publicType: 0,//公开视频（1：免费；2：试听）
                            attachmentType: 0,//附件类型（1：视频；2：音频；3：PPT；4：文档）
                            id: ""//主键
                        }
                    ],//下级章节
                    chapterName: "第3章 开发语言内容各有不同",//章节名称
                    attachmentUrl: "",//视频地址
                    courseId: "",//课程ID
                    updateTime: null,//修改时间
                    createTime: null,//创建时间
                    chapterType: 0,//章节类型（1：章；2：小节；3：测验）
                    createBy: "",//创建人
                    updateBy: "",//修改人
                    sort: 0,//排序
                    parentId: "",//上级章节
                    publicType: 0,//公开视频（1：免费；2：试听）
                    attachmentType: 0,//附件类型（1：视频；2：音频；3：PPT；4：文档）
                    id: ""//主键
                },
            ]
        }
    },
    methods:{
        // 课程分类，鼠标进入移出事件
		mourseHover(j) {
            j.isShow = true
			// this.$set(this.categorysDetail, index, true)
		},
		mourseOut(j) {
            j.isShow = false
			// this.$set(this.categorysDetail, index, false)
		},
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
}
.active{
    color: #FFFFFF;
    background: #F11D1D;
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
}
.clearfloat{
    clear: both;
}
/* 视频目录结束 */
</style>