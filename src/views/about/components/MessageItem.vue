<template>
  <div class="my-course-content">
    <div v-if="messList && messList.length > 0" style="width: 980px">
      <div class="course-main" style="width: 980px">
        <div
          class="course-item"
          v-for="item in messList"
          :key="item.id"
        >
          <div class="item-dot" v-if="item.title"></div>
          <div class="item-main">
            <p class="title">{{ item.title }}</p>
            <p class="time">{{ item.createTime }}</p>
          </div>
          <!-- <div class="delete" v-show="isDelete" @click="goDelete(item.id)">
            <img src="/image/about/remove.png" alt="" />
          </div> -->
        </div>
      </div>
    </div>
    <div v-else class="course-empty">
      <el-empty
        image="/image/about/mess-empty.png"
        description="暂无消息"
      ></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messList: {
      type: Array,
      default: [],
      cur: 0,
      // isDelete: false,
    },
  },
  data() {
    return {
      // isDelete: false,
    };
  },
  onLoad() {
    console.log(this.messList);
  },
  methods: {
  },
};
</script>

<style scoped>
.my-course-content {
  width: 100%;
  /* height: 400px; */
  margin-bottom: 30px;
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
  cursor: pointer;
}
.item-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: red;
  position: absolute;
  left: 5px;
  top: 20px;
}
.item-main {
  width: 400px;
  display: flex;
  flex-direction: column;
  height: 40px;
  margin-left: 10px;
}
.item-main .title {
  width: 900px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  background: #f8f8f8;
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