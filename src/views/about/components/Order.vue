<template>
  <div class="order">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="order-tabs">
      <el-tab-pane label="全部订单" name="first" style="height: 800px">
        <OrderItem :orderList="totalList"></OrderItem>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="second" style="height: 800px">
        <OrderItem :orderList="completedList"></OrderItem>
      </el-tab-pane>
      <el-tab-pane label="未完成" name="third" style="height: 800px">
        <OrderItem :orderList="incompleteList"></OrderItem>
      </el-tab-pane>
      <el-tab-pane label="已失效" name="fourth" style="height: 800px">
        <OrderItem :orderList="invalidList"></OrderItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrderItem from "./OrderItem.vue";
import { getByMemberId } from "@/common/api/order";
export default {
  data() {
    return {
      totalList: [],
      completedList: [],
      incompleteList: [],
      invalidList: [],
      activeName: "first",
      query: {
        pageSize: 10,
        pageNum: 1,
        entity: {
          orderStatus: null,
        },
      },
    };
  },
  components: {
    OrderItem,
  },
  created() {
    this.query = {
      entity: {
        orderStatus: null,
      },
    };
    this.getList();
  },
  methods: {
    getList() {
      getByMemberId(this.query).then((res) => {
        this.totalList = res.data.pageInfo.list;
      });
      // console.log(list)
    },
    handleClick(tab, event) {
      if (this.activeName === "second") {
        this.query.entity.orderStatus = "finish";
        getByMemberId(this.query).then((res) => {
          this.completedList = res.data.pageInfo.list;
        });
      } else if (this.activeName === "third") {
        this.query.entity.orderStatus = "overtime";
        getByMemberId(this.query).then((res) => {
          this.incompleteList = res.data.pageInfo.list;
        });
      }else if(this.activeName === "fourth") {
        this.query.entity.orderStatus = "closed";
        getByMemberId(this.query).then((res) => {
          this.invalidList= res.data.pageInfo.list;
        });
      }
    },
  },
};
</script>

<style scoped>
.order-tabs {
  margin-left: 20px;
  height: 800px;
}
</style>

