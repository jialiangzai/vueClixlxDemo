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
export default {
  data() {
    return {
      activeName: 'first',
      totalList: [1],
      freeList: [],
      vipList: []
    };
  },
  components:{
    ColleanItem,
  },
  methods: {
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
