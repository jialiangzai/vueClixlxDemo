<template>
  <div class="my-course">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="course-tabs">
      <el-tab-pane label="全部消息" name="first" style="height: 500px">
        <MessageItem :messList="totalList"></MessageItem>
        <el-pagination
          v-show="totalListPage > 0"
          :total="totalListPage"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getList"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="second" style="height: 500px">
        <MessageItem :messList="readList"></MessageItem>
        <el-pagination
          v-show="readListPage > 0"
          :total="readListPage"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getList"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="未读消息" name="third" style="height: 500px">
        <MessageItem :messList="unread"></MessageItem>
        <el-pagination
          v-show="unreadPage > 0"
          :total="unreadPage"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getList"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MessageItem from "./MessageItem.vue";
import { getByMemberId } from "@/common/api/message";
export default {
  data() {
    return {
      activeName: "first",
      totalList: [1],
      totalListPage: 0,
      readList: [],
      readListPage: 0,
      unread: [],
      unreadPage: 0,
      query: {
        pageSize: 10,
        pageNum: 1,
        entity: {
          status: null,
        },
      },
    };
  },
  components: {
    MessageItem,
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getByMemberId(this.query).then((res) => {
        console.log(res);
        if (res.meta.code == "200") {
            this.totalListPage = res.data.pageInfo.total;
            this.totalList = res.data.pageInfo.list;
          } else {
            this.$message({
              message: "获取消息失败，请联系管理员",
              type: "error",
            });
          }
      });
    },
    handleClick(tab, event) {
      // console.log(tab,event)

      if (this.activeName === "second") {
        this.readList = [1];
        this.query.entity.status = 2;
        getByMemberId(this.query).then((res) => {
          console.log(res);
          if (res.meta.code == "200") {
            this.readListPage = res.data.pageInfo.total;
            this.readList = res.data.pageInfo.list;
          } else {
            this.$message({
              message: "获取消息失败，请联系管理员",
              type: "error",
            });
          }
        });
      } else if (this.activeName == "third") {
        this.query.entity.status = 1;
        getByMemberId(this.query).then((res) => {
          if (res.meta.code == "200") {
            this.unreadPage = res.data.pageInfo.total;
            this.unread = res.data.pageInfo.list;
          } else {
            this.$message({
              message: "获取消息失败，请联系管理员",
              type: "error",
            });
          }
        });
      } else {
        this.query.entity.status = null;
        this.getList();
      }
    },
  },
};
</script>

<style scoped>
.course-tabs {
  margin-left: 20px;
  /* height: 800px; */
}
</style>
