<template>
  <div class="my-course">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="course-tabs">
      <el-tab-pane label="全部" name="first" style="height: 800px">
        <ColleanItem :courseList="totalList"></ColleanItem>
      </el-tab-pane>
      <el-tab-pane label="免费课程" name="second" style="height: 800px">
        <ColleanItem :courseList="freeList"></ColleanItem>
      </el-tab-pane>
      <el-tab-pane label="会员课程" name="third" style="height: 800px">
        <ColleanItem :courseList="vipList"></ColleanItem>
      </el-tab-pane>
    </el-tabs>
   
  </div>
</template>

<script>
import ColleanItem from './ColleanItem.vue';
import {getFavoriteList} from '@/common/api/favorite'
export default {
  data() {
    return {
      activeName: 'first',
      totalList: [],
      freeList: [],
      vipList: [],
      query: {
        pageSize:10,
        pageNum:1
      }
    };
  },
  components:{
    ColleanItem,
  },
  created(){
    console.log(1)
    this.getList()
  },
  methods: {
    getList(){
      getFavoriteList(this.query).then(res => {
        console.log(res);
      }).catch(err => console.log(err))
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
