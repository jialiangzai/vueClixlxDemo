<template>
  <div class="my-course">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="course-tabs">
      <el-tab-pane label="全部" name="first" style="height: 800px">
        <CourseItem :courseList="totalList"></CourseItem>
      </el-tab-pane>
      <el-tab-pane label="免费课程" name="second" style="height: 800px">
        <CourseItem :courseList="freeList"></CourseItem>
      </el-tab-pane>
      <el-tab-pane label="会员课程" name="third" style="height: 800px">
        <CourseItem :courseList="vipList"></CourseItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CourseItem from "./CourseItem.vue";
import {myCourses} from '@/common/api/course'

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
      activeName: "first",
      courseList: 1,
      currentNav: 0,
      totalList: [1],
      freeList: [],
      vipList: [],
      query: {
        pageSize: 10,
        pageNum: 1
      }
    };
  },
  components: {
    CourseItem,
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){
      myCourses(this.query).then(res=> {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    handleClick(tab,event){
      console.log(tab,event)
    }
  },
};
</script>

<style scoped>
.course-tabs {
  margin-left: 20px;
  height: 800px;
}
</style>
