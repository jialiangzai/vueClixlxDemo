<template>
  <div class="my-course-content">
    <div v-if="messList && messList.length > 0" style="width: 980px">
      <div class="course-main" style="width: 980px">
        <div
          class="course-item"
          v-for="item in messList"
          :key="item.id"
          @click="goRead(item)"
        >
          <div class="item-dot" v-if="item.status === 1"></div>
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
import {makeRead} from '@/common/api/message'
import {createToken} from '@/common/api/token'
export default {
  props: {
    messList: {
      type: Array,
      default: [],
      cur: 0,
      // 已读数组
      // idArr: []
      // isDelete: false,
    },
  },
  data() {
    return {
      // isDelete: false,
    };
  },
  onLoad() {
    // console.log(this.messList);
  },
  methods: {
    goRead(item){
      // 2是已读
      if(item.status === 2) {
        return;
      }else if(item.status === 1) {
        // 1是未读
        // ids
        //this.ids.push(item.id)
        const idArr = []
        idArr.push(item.id)
        createToken().then(res => {
          makeRead({
            ids: idArr,
            token: res.data.token
          }).then(res=> {
            if(res.meta.code === '200'){
              this.$message({
                message: "已读消息成功",
                type: "success",
              });
              window.location.reload()
            }else {
              this.$message({
                message: res.meta.msg,
                type: "error",
              });
            }
          })
        })
      
      }
    }
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
