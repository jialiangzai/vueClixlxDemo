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
export default {
  data() {
    return {
      totalList: [
        {
          id: 1,
          isPay: 1,
          status: 1,
        },
        {
          id: 2,
          isPay: 2,
          status: 1,
        },
        {
          id: 3,
          isPay: 2,
          status: 4,
        },
        {
          id: 4,
          isPay: 2,
          status: 3,
        },
      ],
      completedList: [],
      incompleteList: [],
      invalidList: [],
      activeName: "first",
    };
  },
  components: {
    OrderItem,
  },
  methods: {
    handleClick(tab, event) {
      if (this.activeName === "second") {
        this.completedList = [
          {
            id: 1,
            isPay: 1,
            status: 1,
          },
          {
            id: 2,
            isPay: 2,
            status: 1,
          },
        ];
        console.log(tab, event);
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

