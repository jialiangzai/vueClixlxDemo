<template>
    <div class="foot">
        <div class="footer-main">
            <div class="footer-xlx">
                <img class="xlx" src="/image/logo02.png" alt="" />
            </div>
            <div class="footer-factory">
                <img class="factory" src="/image/foot-factory.png" alt="">
            </div>
            <div class="copytight">
                <ul class="copy-top">
                    <li><a href="#">关于我们</a></li>
                    <li>｜</li>
                    <li><a href="#">联系我们</a></li>
                    <li>｜</li>
                    <li><a href="#">意见反馈</a></li>
                    <li>｜</li>
                    <li><a href="#">版权声明</a></li>
                </ul>
                <div class="copy-bottom">
<!--                    <span class="">Copyrignt© 2021 imooc.com  京ICP备  12003892号-11  京公网安备11010802030151号  营业执照</span>-->
                    <span class="">{{webconfig.copyright}}</span><a class="go" href="https://beian.miit.gov.cn/" target="_blank">{{webconfig.icp}}</a>
                </div>
            </div>
            <div class="wx">
                <div class="wx-bg">
                    <img :src="guanfangwx.imgUrl" alt="">
                </div>
                <div class="wx-dsc">{{guanfangwx.imageName}}</div>
            </div>
            <div class="wx">
                <div class="wx-bg">
                    <img :src="teacherwx.imgUrl" alt="">
                </div>
                <div class="wx-dsc">{{teacherwx.imageName}}</div>
            </div>

        </div>
    </div>
</template>

<script>
import {getImageByCode} from '@/common/api/picture.js'
import imgCode from '@/common/globalImages.js'


export default{
    props:{
      webconfig:{
        type:Object,
        default:{}
      }
    },
    data(){
        return{
            guanfangwx:{
                imageName:'',
                imgUrl:''
            },
            teacherwx:{
                imageName:'',
                imgUrl:''
            }
        }
    },
    created(){
        this.getImageByCodeGuanfangwx()
        this.getImageByCodeTeacherwx()

    },
    methods:{
        getImageByCodeGuanfangwx(){
            getImageByCode({imageCode:imgCode.global_guanfangcode}).then(res => {
                    let data = res.data.data;
                    this.guanfangwx = {
                        imageName:data.imageName,
                        imgUrl:data.imageUrl
                    }
            })
        },
        getImageByCodeTeacherwx(){
            getImageByCode({imageCode:imgCode.global_teachercode}).then(res => {
                    let data = res.data.data;
                    this.teacherwx = {
                        imageName:data.imageName,
                        imgUrl:data.imageUrl
                    }
            })
        },
    }
}


</script>

<style scoped>
.foot{
    width: 100%;
    min-width: 1200px;
    height: 150px;
    background: #3483FF;
    opacity: 1;
    border-radius: 0px;
}
.footer-main{
    display: flex;
  justify-content: space-around;
    align-items: center;
    width: 1200px;
    height: 100%;
    color: #FFFFFF;
    margin: auto;
}
.footer-xlx{
    width:110px;
    opacity: 1;
}
.xlx{
    width: 100%;
    height: 100%;
}
.footer-factory{
    width: 130px;
    margin:0 20px;

}
.factory{
    width: 100%;
    height: 100%;
}
.copy-top{
    font-size: 14px;
    margin:0 10px 10px 50px;
    display: flex;
}
.copy-top li{
    margin: 0 10px;
}
.copy-top li a{
    color: #FFFFFF !important;
}
.copy-bottom{
    font-size: 12px;
}
.wx{
    margin-left: 20px;
    width: 80px;
    height: 100px;

    font-size: 12px;
}
.wx-bg{

    width: 80px;
    height: 80px;

}
.wx img{
    width: 100%;
    height: 100%;
}
.wx-dsc{
    margin:15px;
}
.go{
    color: #FFFFFF;
    text-decoration:underline;
    padding-left:10px
}
</style>
