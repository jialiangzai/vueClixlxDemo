<template>
  <div class="order-item-ins">
    <div v-if="orderList.length > 0" class="order-container">
      <happy-scroll style="width: 940px">
        <div style="width: 940px">
          <div class="order-item" v-for="item in orderList" :key="item.id">
            <div class="item-top">
              <img
                class="order-img"
                src="/image/about/order-select.png"
                alt=""
              />
              <p class="order-num">订单编号： 123354546565</p>
              <p class="order-time">2021-10-21 10:23:23</p>
            </div>
            <div class="item-bottom">
              <div class="i-b-left">
                <div class="i-b-l-left">
                  <img src="/image/about/course-bg.png" alt="" />
                  <p>晋级TS高手搞定复杂项目</p>
                </div>
                <div class="i-b-l-right">
                  <p class="i-b-l-r-title">
                    晋级TS高手搞定复杂项目晋级TS高手搞定复杂项目
                  </p>
                  <p class="i-b-l-r-tip">晋级TS高手搞定复杂项目</p>
                  <p class="i-b-l-r-price">价格 <span>￥349.00</span></p>
                </div>
              </div>
              <div class="i-b-center">
                <div class="i-b-c-price">
                  <p class="i-b-c-p-single">￥349.00</p>
                  <p class="i-b-c-p-total">￥349.00</p>
                  <p class="i-b-c-p-pay">￥<span>349.00</span></p>
                </div>
              </div>
              <div class="i-b-right">
                <div
                  v-if="item.isPay === 1 && item.status === 1"
                  class="i-b-r-btn success"
                >
                  已完成
                </div>
                <div
                  v-if="
                    item.isPay === 2 && (item.status === 1 || item.status === 4)
                  "
                  class="i-b-r-btn error"
                >
                  未完成
                </div>
                <div
                  v-if="item.isPay === 2 && item.status === 3"
                  class="i-b-r-btn info"
                >
                  已失效
                </div>
              </div>
            </div>
          </div>
        </div>
      </happy-scroll>
    </div>
    <div v-else class="order-empty">
      <el-empty
        image="/image/about/order-empty.png"
        description="暂无订单"
      ></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderList:{
      type: Array,
      default:[]
    }
  }
}
</script>

<style scoped>
  .order-container {
  margin: 10px 0;
  width: 940px;
  height: 700px;
  overflow: hidden;
}
.order-item {
  width: 100%;
  height: 240px;
  border: 1px solid #93999f;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.item-top {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid rgba(112, 112, 112, 0.3);
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.order-img {
  width: 15px;
  height: 19px;
}
.order-num {
  padding: 0 40px;
}
.item-bottom {
  width: 100%;
  height: 150px;
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.i-b-left {
  width: 450px;
  height: 100%;
  display: flex;
  align-items: center;
}
.i-b-l-left {
  width: 200px;
  height: 100px;
  position: relative;
}
.i-b-l-left img {
  width: 200px;
  height: 100px;
}
.i-b-l-left p {
  width: 110px;
  height: 60px;
  white-space: wrap;
  font-size: 18px;
  font-family: MicrosoftYaHei-Bold;
  color: #ffffff;
  text-shadow: 2px 4px 4px rgba(27, 39, 94, 0.75);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.i-b-l-right {
  padding-left: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(112, 112, 112, 0.2);
}
.i-b-l-r-title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.i-b-l-r-tip {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  margin: 10px 0;
}
.i-b-l-r-price {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.i-b-l-r-price span {
  color: #ff3f3f;
}

.i-b-center {
  width: 220px;
  height: 100%;
  display: flex;
  align-items: center;
}
.i-b-c-price {
  width: 220px;
  height: 100px;
  border-right: 1px solid rgba(112, 112, 112, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #93999f;
}
.i-b-c-p-total {
  margin: 5px 0;
}
.i-b-c-p-pay span {
  color: #ff3f3f;
}
.i-b-right {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.i-b-r-btn {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;

  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;

  border-radius: 4px;
}
.success {
  border: 1px solid #00ac06;
  color: #00ac06;
  background: rgba(0, 179, 6, 0.2);
}
.error {
  border: 1px solid #ff0707;
  color: #ff0707;
  background: rgba(255, 7, 7, 0.2);
}
.info {
  border: 1px solid #656565;
  color: #656565;
  background: rgba(101, 101, 101, 0.2);
}
</style>