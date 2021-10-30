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
import ColleanItem from "./ColleanItem.vue";
import { getFavoriteList } from "@/common/api/favorite";
import { createToken } from "@/common/api/auth";
export default {
  data() {
    return {
      activeName: "first",
      totalList: [],
      freeList: [],
      vipList: [],
      query: {
        pageSize: 10,
        pageNum: 1,
        token: null,
        entity: {
          isFress: null,
          isMember: null,
        },
      },
    };
  },
  components: {
    ColleanItem,
  },
  created() {
    this.query.isFress = null;
    this.query.isMember = null;
    this.getList();
    console.log(sessionStorage.getItem("token"));
  },
  methods: {
    getList() {
      createToken().then((res) => {
        if (res.data.token) {
          this.query.token = res.data.token;
          getFavoriteList(this.query)
            .then((res) => {
              console.log(res);
              this.totalList = res.data.pageInfo.list;
            })
            .catch((err) => console.log(err));
        }
      });
    },
    handleClick(tab, event) {
      if (this.activeName === "second") {
        this.query.entity.isFress = 1;
        // this.getList();
        createToken().then((res) => {
        if (res.data.token) {
          this.query.token = res.data.token;
          getFavoriteList(this.query)
            .then((res) => {
              console.log(res);
              this.freeList = res.data.pageInfo.list;
            })
            .catch((err) => console.log(err));
        }
      });
      
      } else if (this.activeName === "third") {
        this.query.entity.isMember = 1;
        createToken().then((res) => {
        if (res.data.token) {
          this.query.token = res.data.token;
          getFavoriteList(this.query)
            .then((res) => {
              console.log(res);
              this.vipList = res.data.pageInfo.list;
            })
            .catch((err) => console.log(err));
        }
      });
      
        
      } else {
        this.query.isFress = null;
        this.query.isMember = null;
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
  margin-bottom: 120px;
}
</style>
