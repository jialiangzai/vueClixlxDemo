<template>
  <div class="about">
    <Header />
    <div class="about-banner">
      <div class="banner-content">
        <div class="banner-left">
          <img
            class="banner-avator"
            src="/image/common/avator.png"
            alt=""
          />
          <div class="banner-my">
            <div class="banner-name">Fly-不一样的我</div>
            <div class="banner-introduce">
              <p>女</p>
              <p>北京</p>
              <p>web前端工程师</p>
            </div>
            <div class="banner-autograph">这位同学很神秘，没有留下个性签名</div>
          </div>
        </div>
        <div class="banner-right">
          <div class="banner-study">学习时长 <span>0h</span></div>
          <div class="banner-setting">
            <img src="/image/about/setting.png" alt="" />
            <p>个人设置</p>
          </div>
        </div>
      </div>
    </div>
    <div class="about-content">
      <ul class="about-list">
        <li
          :class="current === index ? 'active' : ''"
          v-for="(item, index) in dataList"
          :key="item.id"
          @click="goDetail(index)"
        >
          <img :src="current === index ? item.selectImg : item.imgUrl" alt="" />
          <p class="list-title">{{ item.title }}</p>
        </li>
      </ul>
      <div class="about-main">
        <MyCourse />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/index/header.vue';
import MyCourse from './components/MyCourse.vue';

export default {
  data() {
    return {
      dataList: [
        {
          id: 1,
          imgUrl: '/image/about/my-course.png',
          selectImg: '/image/about/my-course.png',
          title: '我的课程',
        }, {
          id: 2,
          imgUrl: '/image/about/collean.png',
          selectImg: '/image/about/collean-select.png',
          title: '收藏',
        },
        {
          id: 3,
          imgUrl: '/image/about/note.png',
          selectImg: '/image/about/note-select.png',
          title: '笔记',
        },
        {
          id: 4,
          imgUrl: '/image/about/order.png',
          selectImg: '/image/about/order-select.png',
          title: '订单',
        },
        {
          id: 5,
          imgUrl: '/image/about/mess.png',
          selectImg: '/image/about/mess-select.png',
          title: '我的课程',
        },
      ],
      current: 0,
    };
  },
  components: {
    Header,
    MyCourse,
  },
  methods: {
    goDetail(index) {
      this.current = index;
    },
  },
};
</script>

<style scoped>
.about {
  height: 1000px;
}
.about-banner {
  width: 100%;
  height: 185px;
  position: relative;
  background: url("/image/about/about-banner.png") no-repeat 0 0;
  box-sizing: border-box;
}
.banner-content {
  width: 1200px;
  height: 170px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.banner-left {
  width: 600px;
  height: 170px;
  display: flex;
  align-items: center;
}
.banner-avator {
  width: 177px;
  height: 177px;
  border: 5px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: 20px;
}
.banner-my {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  left: 220px;
  bottom: 0;
  color: #ffffff;
  font-size: 16px;
  font-family: Microsoft YaHei;
}
.banner-name {
  font-size: 32px;
  font-weight: bold;
}
.banner-introduce {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
.banner-autograph {
  font-size: 14px;
}
.banner-right {
  width: 400px;
  height: 170px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0px;
  color: #ffffff;
}
.banner-study span {
  font-size: 32px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  margin-left: 5px;
}
.banner-setting {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.banner-setting img {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
/* 主体开始 */
.about-content {
  width: 1200px;
  height: 800px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid red;
  margin-top: 25px;
  display: flex;
}
.about-list {
  width: 202px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.about-list li {
  width: 202px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-list li img {
  width: 18px;
  height: 20px;
  margin-right: 10px;
}
.about-list .active {
  background: rgba(52, 131, 255, 0.19);
  color: rgba(52, 131, 255, 1);
  border-radius: 10px;
}
.list-title {
  width: 100px;
}
.about-main {
  flex: 1;
  border: 1px solid red;
}
</style>
