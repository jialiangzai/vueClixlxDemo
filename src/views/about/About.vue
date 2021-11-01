<template>
  <div class="about">
    <Header></Header>
    <div class="about-containe" >
      <div class="about-ee">
        <div class="about-banner">
          <div class="banner-main">
            <div class="banner-content">
              <div class="banner-left">
                <img
                  class="banner-avator"
                  :src="userInfo.avatar"
                  alt=""
                  v-if="userInfo.avatar"
                />
                <img
                  class="banner-avator"
                  :src="userInfo.avatar"
                  alt=""
                  v-else
                />
                <div class="banner-my">
                  <div class="banner-name">{{ userInfo.nickName }}</div>
                  <div class="banner-introduce">
                    <p>{{ userInfo && userInfo.gender == 1 ? "男" : "女" }}</p>
                    <p>
                      {{ userInfo && userInfo.city ? userInfo.city : "北京" }}
                    </p>
                    <p>web前端工程师</p>
                  </div>
                  <div class="banner-autograph">
                    这位同学很神秘，没有留下个性签名
                  </div>
                </div>
              </div>
              <div class="banner-right">
                <div class="banner-study">学习时长 <span>{{ userInfo.totalHour ? parseFloat(userInfo.totalHour/360).toFixed(2)+'h' : '0h' }}</span></div>
                <div class="banner-setting" @click="goMine">
                  <img src="/image/about/setting.png" alt="" />
                  <p>个人设置</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="about-main">
          <div class="about-container">
            <div class="about-left">
              <div class="about-list">
                <div
                  v-for="(item, index) in aboutList"
                  :key="item.id"
                  @click="geDetail(index)"
                >
                  <router-link :to="item.link">
                    <div
                      class="about-list-item"
                      :class="current == index ? 'active' : ''"
                    >
                      <img
                        :src="current == index ? item.selectImg : item.imgUrl"
                        alt=""
                      />
                      <p class="list-title">{{ item.title }}</p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="about-right">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Foot class="foot"></Foot>
  </div>
</template>

<script>
import Header from "@/components/index/header.vue";
import { mapState } from "vuex";
import Foot from "@/components/foot/foot.vue";
// import Footer from '@/components/foot/Footer.vue';
import IScroll from "iscroll";

export default {
  name: "About",
  data() {
    return {
      aboutList: [
        {
          id: 1,
          imgUrl: "/image/about/my-course.png",
          selectImg: "/image/about/my-course-select.png",
          title: "我的课程",
          link: "/about/my-course",
        },
        {
          id: 2,
          imgUrl: "/image/about/collean.png",
          selectImg: "/image/about/collean-select.png",
          title: "收藏",
          link: "/about/collean",
        },
        {
          id: 3,
          imgUrl: "/image/about/order.png",
          selectImg: "/image/about/order-select.png",
          title: "订单",
          link: "/about/order",
        },
        {
          id: 4,
          imgUrl: "/image/about/mess.png",
          selectImg: "/image/about/mess-select.png",
          title: "消息",
          link: "/about/message",
        },
      ],
      current: 0,
      avatorImg: "/image/common/avator.png",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  mounted() {
  },
  components: {
    Header,
    Foot,
  },
  methods: {
    geDetail(index) {
      this.current = index;
      // sessionStorage.setItem('current',JSON.stringify(index))
    },
    goMine() {
      this.$router.push("/user");
    },
  },
};
</script>

<style scoped>
.about-banner {
  background: url("/image/about/about-banner.png") no-repeat 0 0;
  box-sizing: border-box;
}
.banner-main {
  position: relative;
  width: 100%;
  height: 185px;
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
  cursor: pointer;
}
.banner-setting img {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
/* 主体开始 */
.about-main {
  width: 100%;
  /* height: 800px; */
  height: 100%;
  position: relative;
  margin-top:20px;
}
.about-container {
  width: 1200px;
  /* height: 800px; */
  /* height: 800px; */
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.about-left {
  width: 200px;
  height: 100%;
  /* height: 1000px; */
  /* height: 800px;
  overflow: hidden; */
}

.about-list .about-list-item {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 60px;
  border-radius: 5px;
  cursor: pointer;
}
.about-list .active {
  background: rgba(52, 131, 255, 0.3);
  color: #3483ff;
}
.about-list .about-list-item img {
  width: 18px;
  height: 20px;
}
.list-title {
  width: 100px;
  text-align: center;
}
.about-right {
  flex: 1;
  /* height: 600px; */
  /* border: 1px solid blue; */
}
.foot {
  position: fixed;
  bottom: 0;
}
</style>
