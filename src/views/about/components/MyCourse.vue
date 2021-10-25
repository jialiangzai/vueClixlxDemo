<template>
  <div class="my-course">
    <ul class="my-course-nav">
      <li
        v-for="(item, index) in courseNav"
        :key="item.id"
        :class="currentNav === index ? 'active' : ''"
        @click="goChange(index)"
      >
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <div class="my-course-content">
      <div v-if="courseList" style="height:750px;width:980px;">
        <happy-scroll  style="width:980px;">
          <div class="course-main" style="width:980px;">
            <div class="course-item">
              <div class="item-left">
                <img src="@/assets/image/about/course-bg.png" alt="" />
                <p>晋级TS高手搞定复杂项目</p>
              </div>
              <div class="item-right">
                <div class="i-r-left">
                  <div class="i-r-l-title">
                    <p class="tip">免费课</p>
                    <p class="title">晋级TS高手搞定复杂项目</p>
                  </div>
                  <div class="i-r-l-center">
                    <p class="study-time">已学0%</p>
                    <p>用时1小时30分</p>
                    <p>学习至高手搞定复杂项目从</p>
                  </div>
                  <div class="i-r-l-note">笔记 0</div>
                </div>
                <div class="i-r-right">
                  <div class="i-r-bottom">
                    <div>我的项目</div>
                    <div>继续学习</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </happy-scroll>
      </div>
      <div v-else class="course-empty">
        <div class="empty">
          <img src="../../../assets/image/about/course-empt.png" alt="" />
          <p>没有任何课程，可以先<span>去找找课程</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseNav: [
        {
          id: 1,
          title: "全部",
        },
        {
          id: 2,
          title: "免费课",
        },
        {
          id: 3,
          title: "会员课程",
        },
      ],
      courseList: 1,
      currentNav: 0,
    };
  },
  methods: {
    goChange(index) {
      this.currentNav = index;
    },
  },
};
</script>

<style scoped>
.my-course-nav {
  width: 100%;
  height: 40px;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.my-course-nav li {
  width: 100px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #93999f;
  cursor: pointer;
}
.my-course-nav .active span {
  padding-bottom: 10px;
  border-bottom: 1px solid #3483ff;
  color: #3483ff;
}
.my-course-content {
  width: 100%;
  height: 800px;
}
.course-empty {
  height: 500px;
  width: 100%;
  position: relative;
}
.empty {
  width: 220px;
  height: 220px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.empty img {
  width: 180px;
  height: 180px;
  margin: 10px;
}
.empty p {
  width: 220px;
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(181, 185, 188, 1);
}
.empty span {
  color: rgba(255, 61, 61, 1);
}
.course-item {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.item-left {
  width: 270px;
  height: 150px;
  position: relative;
}
.item-left img {
  width: 250px;
  height: 125px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid red;
}
.item-left p {
  width: 150px;
  height: 60px;
  white-space: wrap;
  font-size: 24px;
  font-family: MicrosoftYaHei-Bold;
  color: #ffffff;
  text-shadow: 2px 4px 4px rgba(27, 39, 94, 0.75);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.item-right {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
.i-r-left {
  width: 450px;
  height: 150px;
  display: flex;
  flex-direction: column;
}
.i-r-l-title {
  display: flex;
}
.tip {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #93999f;
  background-color: rgba(147, 153, 159, 0.2);
  padding: 2px 8px;
  margin-right: 20px;
  height: 20px;
  line-height: 20px;
}
.title {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #333333;
}
.i-r-l-center {
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
  color: #4d555d;
  padding: 0 20px;
  box-sizing: border-box;
}
.study-time {
  color: red;
}
.i-r-l-note {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #4d555d;
}
.i-r-right {
  flex: 1;
  width: 100%;
  height: 150px;
  position: relative;
}
.i-r-bottom {
  width: 100%;
  height: 40px;
  position: absolute;
  left: 0;
  bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.i-r-bottom div {
  width: 130px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: linear-gradient(
    to right,
    rgba(125, 177, 255, 1) 0%,
    rgba(39, 132, 255, 1) 100%
  );
  border-radius: 20px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
}
</style>
