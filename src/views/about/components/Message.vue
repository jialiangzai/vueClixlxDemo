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
      <div v-if="courseList" style="height: 750px; width: 980px">
        <happy-scroll style="width: 980px">
          <div class="course-main" style="width: 980px">
            <div class="course-item" @mouseenter="goShow" @mouseleave="goRemove" :class="isDelete ? 'item-active': ''">
              <div class="item-dot"></div>
              <div class="item-main">
                <p class="title">【提示】黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫</p>
                <p class="time"> 2020-09-21 10:21:30</p>
              </div>
              <div class="delete" v-show="isDelete">
                <img src="../../../assets/image/about/remove.png" alt="">
              </div>
            </div>
            
            
          </div>
        </happy-scroll>
      </div>
      <div v-else class="course-empty">
        
        <el-empty image="../../../assets/image/about/course-empt.png"></el-empty>
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
          title: "全部消息",
        },
        {
          id: 2,
          title: "已读消息(200)",
        },
        {
          id: 3,
          title: "未读消息(200)",
        },
      ],
      courseList: null,
      currentNav: 0,
      isDelete: false
    };
  },
  methods: {
    goChange(index) {
      this.currentNav = index;
    },
    goShow(){
      this.isDelete = true
    },
    goRemove(){
      this.isDelete = false
    }
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
  width: 120px;
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
  height: 50px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  position: relative;
}
.item-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: red;
  position: absolute;
  left:5px;
  top: 20px;
}
.item-main {
  width: 400px;
  display: flex;
  flex-direction: column;
  height: 40px;
  margin-left: 10px;
}
.item-main .title{
  width: 400px;
 white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}
.item-main .time {
  font-size: 12px;
  margin-top: 5px;
  margin-left: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}
.item-active {
background: #F8F8F8;
}
.delete {
  width: 20px;
  height: 21px;
  position: absolute;
  right: 50px;
  top: 10px;
}
.delete img {
  width: 20px;
  height: 21px;
}
</style>
