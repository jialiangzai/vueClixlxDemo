<template>
  <div class="my-course">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="course-tabs">
      <el-tab-pane label="全部" name="first" >
        <CourseItem :courseList="totalList"></CourseItem>
      </el-tab-pane>
      <el-tab-pane label="免费课程" name="second">
        <CourseItem :courseList="freeList"></CourseItem>
      </el-tab-pane>
      <el-tab-pane label="会员课程" name="third">
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
      activeName: "first",
      courseList: 1,
      currentNav: 0,
      totalList: [],
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
        res.data.pageInfo.list.map(item => {
          switch (item.courseLevel) {
            case 1:
              item.courseLevel = '初级'
              break;
            case 2:
              item.courseLevel = '中级'
              break;
            case 3: 
              item.courseLevel = '高级'
              break;
          }
        })
        this.totalList = res.data.pageInfo.list

      }).catch(err => {
        console.log(err)
      })
    },
    handleClick(tab,event){
      // this.getList()
      if(this.activeName === 'first'){
        this.totalList = this.totalList
      }else if(this.activeName === 'second'){
        this.freeList = this.totalList.filter(item => {
          if(item.discountPrice === 0){
            return item
          }
        })
      }else if(this.activeName === 'third'){
        this.vipList = this.totalList.filter(item => {
          if(item.isMember === 1){
            return item
          }
        })
      }
    }
  },
};
</script>

<style scoped>
.course-tabs {
  margin-left: 20px;
  margin-bottom: 120px;
  /* height: 800px; */
}
</style>
