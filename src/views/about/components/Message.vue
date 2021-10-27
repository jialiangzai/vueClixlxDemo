<template>
  <div class="my-course">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="course-tabs">
      <el-tab-pane label="全部消息" name="first" style="height: 800px">
        <MessageItem :messList="totalList"></MessageItem>
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="second" style="height: 800px">
        <MessageItem :messList="readList"></MessageItem>
      </el-tab-pane>
      <el-tab-pane label="未读消息" name="third" style="height: 800px">
        <MessageItem :messList="unread"></MessageItem>
      </el-tab-pane>
    </el-tabs>
   
    
  </div>
</template>

<script>
import MessageItem from './MessageItem.vue';
export default {
  data() {
    return {
      activeName: 'first',
      totalList: [1],
      readList: [],
      unread: []
    };
  },
  components: {
    MessageItem
  },
  methods: {
    handleClick(tab,event){
      // console.log(tab,event)
      if(this.activeName === 'second') {
        this.readList = [1]
      }
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
