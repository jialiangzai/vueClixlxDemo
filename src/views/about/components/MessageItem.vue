<template>
  <div class="my-course-content">
      <div v-if="messList.length > 0" style="height: 750px; width: 980px">
        <happy-scroll style="width: 980px">
          <div class="course-main" style="width: 980px">
            <div class="course-item" @mouseenter="goShow" @mouseleave="goRemove" :class="isDelete ? 'item-active': ''">
              <div class="item-dot"></div>
              <div class="item-main">
                <p class="title">【提示】黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫黑猫警长黑猫黑猫</p>
                <p class="time"> 2020-09-21 10:21:30</p>
              </div>
              <div class="delete" v-show="isDelete">
                <img src="/image/about/remove.png" alt="">
              </div>
            </div>
          </div>
        </happy-scroll>
      </div>
      <div v-else class="course-empty">
        <el-empty image="/image/about/mess-empty.png" description="暂无消息"></el-empty>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    messList: {
      type: Array,
      default: []
    }
  },
  data(){
    return {
      isDelete: false
    }
  },
  onLoad(){
    console.log(this.messList)
  },
  methods: {
    goShow(){
      this.isDelete = true
    },
    goRemove(){
      this.isDelete = false
    }
  }
}
</script>

<style scoped>
.my-course-content {
  width: 100%;
  height: 800px;
}
.course-empty {
  height: 500px;
  width: 100%;
  position: relative;
  margin-top: 50px;
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