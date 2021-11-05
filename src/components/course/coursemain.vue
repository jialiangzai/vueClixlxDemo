<template>
  <div class="coursemain">
    <div class="course">
      <div class="course-main">
        <div class="course-list">
          <ul class="title">
            <li class="title-name">课程方向:</li>
            <el-tag
              class="category-poniter"
              effect="plain"
              type="info"
              @click="buildingCondition('fcategory', null)"
            >
              全部
            </el-tag>
            <el-tag
              class="category-poniter category-poniter-item"
              v-for="(item, index) in firstArr"
              :key="index"
              @click="buildingCondition('fcategory', item)"
              effect="plain"
              type="info"
              >{{ item.categoryName }}</el-tag
            >
          </ul>
          <ul class="title">
            <li class="title-name">课程分类:</li>
            <el-tag
              class="category-poniter"
              effect="plain"
              type="info"
              @click="buildingCondition('scategory', null)"
            >
              全部
            </el-tag>
            <el-tag
              class="category-poniter category-poniter-item"
              v-for="(item, index) in secondArr"
              :key="index"
              @click="buildingCondition('scategory', item)"
              effect="plain"
              type="info"
              >{{ item.categoryName }}</el-tag
            >
          </ul>
          <ul class="title">
            <li class="title-name">课程难度:</li>
            <el-tag
              class="category-poniter"
              effect="plain"
              type="info"
              @click="buildingCondition('clevel', null)"
            >
              全部
            </el-tag>
            <el-tag
              class="category-poniter category-poniter-item"
              effect="plain"
              type="info"
              @click="buildingCondition('clevel', item)"
              v-for="item in courseLevel"
              :key="item.code"
              >{{ item.text }}</el-tag
            >
          </ul>
          <ul
            class="title"
            v-if="selectedConditions && selectedConditions.length > 0"
          >
            <li class="title-name">已选择:</li>
            <el-tag
              class="category-poniter"
              type="success"
              effect="dark"
              :closable="true"
              v-for="(item, index) in selectedConditions"
              :key="index"
              @close="closeSelectedCondition(item.type, item, index)"
            >
              {{ item.text }}
            </el-tag>
          </ul>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="container-top">
        <ul class="all">
          <li
            class="item"
            :class="[active == true ? 'active' : '']"
            @click="handleZonghe"
          >
            综合
          </li>
          <li class="item split">|</li>
          <li
            class="item"
            :class="[active2 == true ? 'active2' : '']"
            @click="handleNewCourse"
          >
            最新课程
          </li>
          <li class="item split">|</li>
          <li
            class="item"
            :class="[active3 == true ? 'active3' : '']"
            @click="mostbuy"
          >
            最多购买
          </li>
          <li class="item split">|</li>
          <li class="item item-price" @click="handlePrice">
            价格
            <span class="arrow">
              <i
                class="el-icon-caret-top"
                :style="priceSortBy === '2' ? 'color:#2C80FF' : ''"
              ></i>
              <i
                class="el-icon-caret-bottom"
                :style="priceSortBy === '1' ? 'color:#2C80FF' : ''"
              ></i>
              <!-- 
                            <img class="up" src="/image/up-arrow8.png" @click="handleUpPrice" />
                            <img class="down" src="/image/up-arrow8.png" @click="handleDownPrice" /> -->
            </span>
          </li>
        </ul>
        <ul class="right">
          <li class="right-item">
            <el-radio-group
              v-model="isFreeOrIsMember"
              @change="changeFreeOrMember"
            >
              <el-radio label="1">免费课程</el-radio>
              <el-radio label="2">会员课程</el-radio>
            </el-radio-group>
          </li>
          <!--  <li class="right-item"  @click="memberCourse">
                    </li> -->
        </ul>
      </div>
      <div class="container-body" v-if="arrcourse && arrcourse.length > 0">
        <div class="newCourseContent">
          <ul class="courseUl">
            <li
              class="courseItem"
              v-for="(item, index) in arrcourse"
              :key="index"
            >
              <div class="courseInfo">
                <router-link :to="{ path: '/course-info/' + item.id }">
                  <div class="courseBg">
                    <img class="courseImg" :src="item.courseCover" alt="" />
                  </div>
                </router-link>
                <div class="courseName">{{ item.courseName }}</div>
                <div class="courseDegree">
                  {{ item.courseLevel }} ·
                  {{ item.purchaseCounter + item.purchaseCnt }}人购买
                </div>
                <div class="coursePrice">
                  <div class="courseMemberbg" v-if='item.isMember == 1'>
                      <span class="courseMember">会员免费</span>
                      <img src="../../assets/image/member/kings.png" alt="">
                  </div>
                  <div class="coursePriceZero" v-else-if="item.discountPrice == 0">
                        <div class="pricefree">免费学习</div>
                        <img src="../../assets/image/about/free.png" alt="">
                  </div>
                  <div class="price" v-else>¥ {{ item.discountPrice }}</div>

                  <div class="addCart" @click="addCart(item)">
                    <i class="el-icon-shopping-cart-1 cart"></i>
                    <span class="cart-text">加入购物车</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="container-body" v-else>
        <el-empty
          image="/image/about/course-empt.png"
          description="暂无课程"
        ></el-empty>
      </div>
      <div class="pages">
        <pagination
          v-show="queryParams.total > 0"
          :total="queryParams.total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="queryCourse(queryParams)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirstCategorys,
  getSecondCategorys,
} from "@/common/api/courseCategory.js";
import { addShopCar } from "@/common/api/shopcar.js";
import { createToken } from "@/common/api/token.js";
import { queryCourse } from "@/common/api/courseManage.js";
import { getShopCarCounter } from "@/common/api/auth";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      priceSortBy: "",
      isFreeOrIsMember: "",
      firstArr: [], //一级分类
      secondArr: [], //二级分类
      arrcourse: [], //课程信息
      degreeArr: [],
      queryParams: {
        pageNum: 1,
        pageSize: 12,
        total: 0,
        entity: {
          courseName: "",
          status: "",
          firstCategory: "",
          courseLevel: "",
          secondCategory: "",
          sortBy: "",
          isMember: "",
          isFree: "",
        },
      },
      courseLevel: [
        {
          text: "初级",
          code: "1",
        },
        {
          text: "中级",
          code: "2",
        },
        {
          text: "高级",
          code: "3",
        },
      ],
      memberId: "",
      courseId: "",
      token: "",
      tokens: "",
      selectedConditions: [],
      active: false,
      active2: false,
      active3: false,
    };
  },
  created() {
    this.tokens = sessionStorage.getItem("token");
    let keywords = this.$route.query.keywords;
    if (keywords) {
      this.queryParams.entity.courseName = keywords;
    }
    this.getFirstCategorys();
    this.getSecondCategorys();
    this.queryCourse(this.queryParams);
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      isLogin: (state) => state.user.isLogin,
    }),
  },
  methods: {
    ...mapActions(["saveCartNumAction"]),
    ...mapMutations(["saveLoginDialog"]),
    // 关闭已选择条件
    closeSelectedCondition(type, item, idx) {
      this.selectedConditions.splice(idx, 1);
      this.buildingCondition(type, null);
    },
    // 构建已选择条件
    buildingSelectedCondition(item) {
      for (let i = 0; i < this.selectedConditions.length; i++) {
        if (this.selectedConditions[i].type === item.type) {
          this.selectedConditions.splice(i, 1);
        }
      }
      this.selectedConditions.push(item);
    },
    // 构建搜索条件并搜索
    buildingCondition(type, object) {
      if (type === "fcategory") {
        this.queryParams.entity.firstCategory =
          object && object.id ? object.id : "";
        if (object && object.id) {
          this.buildingSelectedCondition({
            text: object.categoryName,
            code: object.id,
            type: "fcategory",
          });
        }
      } else if (type === "scategory") {
        this.queryParams.entity.secondCategory =
          object && object.id ? object.id : "";
        if (object && object.id) {
          this.buildingSelectedCondition({
            text: object.categoryName,
            code: object.id,
            type: "scategory",
          });
        }
      } else if (type === "clevel") {
        this.queryParams.entity.courseLevel =
          object && object.code ? object.code : "";
        if (object && object.code) {
          this.buildingSelectedCondition({
            text: object.text,
            code: object.code,
            type: "clevel",
          });
        }
      }
      this.queryCourse(this.queryParams);
    },
    //加入购物车
    addCart(item) {
      if (!this.tokens) {
        this.$message({
          message: "请先登录才能加入购物车哦",
          type: "error",
        });
        this.$store.commit("saveLoginDialog", true);
        return;
      }
      createToken().then((res) => {
        this.token = res.data.token;
        this.memberId = this.userInfo.id;
        addShopCar({
          courseId: item.id,
          memberId: this.memberId,
          token: this.token,
        }).then((res) => {
          if (res.meta.code === "200") {
            getShopCarCounter().then((res) => {
              if (res.meta.code == "200") {
                this.saveCartNumAction(res.data.counter);
              } else {
                this.$message({
                  message: res.meta.msg,
                  type: "error",
                });
              }
            });
            this.$message({
              message: "恭喜你，加入购物车成功",
              type: "success",
            });
          }
        });
      });
    },
    //免费课程还是会员课程
    changeFreeOrMember(e) {
      if (e === "1") {
        this.active = false;
        this.active2 = false;
        this.active3 = false;
        this.priceSortBy = "";
        this.queryParams.entity.isMember = "";
        this.queryParams.entity.isFree = "1";
        this.queryCourse(this.queryParams);
      } else if (e === "2") {
        this.active = false;
        this.active2 = false;
        this.active3 = false;
        this.priceSortBy = "";
        this.queryParams.entity.isFree = "";
        this.queryParams.entity.isMember = "1";
        this.queryCourse(this.queryParams);
      }
    },
    //升降序排列
    handlePrice() {
      let queryParams = {
        pageNum: 1,
        pageSize: 12,
        entity: {},
      };
      if (this.priceSortBy === "1" || this.priceSortBy === "") {
        this.active = false;
        this.active2 = false;
        this.active3 = false;
        queryParams.entity.sortBy = "price-asc";
        this.queryCourse(queryParams);
        this.priceSortBy = "2";
      } else {
        this.active = false;
        this.active2 = false;
        this.active3 = false;
        queryParams.entity.sortBy = "price-desc";
        this.queryCourse(queryParams);
        this.priceSortBy = "1";
      }
    },

    //点击综合
    handleZonghe() {
      this.active = !this.active;
      this.active2 = false;
      this.active3 = false;
      let queryParams = {
        pageNum: 1,
        pageSize: 12,
        entity: {},
      };
      this.isFreeOrIsMember = "";
      this.priceSortBy = "";
      this.queryCourse(queryParams);
    },
    //点击最新课程
    handleNewCourse() {
      this.active2 = !this.active2;
      this.active = false;
      this.active3 = false;
      let queryParams = {
        pageNum: 1,
        pageSize: 12,
        entity: {
          sortBy: "time-desc",
        },
      };
      this.isFreeOrIsMember = "";
      this.priceSortBy = "";
      this.queryCourse(queryParams);
    },
    //最多购买
    mostbuy() {
      this.active3 = !this.active3;
      this.active2 = false;
      this.active = false;
      let queryParams = {
        pageNum: 1,
        pageSize: 12,
        entity: {
          sortBy: "purchase-desc",
        },
      };
      this.isFreeOrIsMember = "";
      this.priceSortBy = "";
      this.queryCourse(queryParams);
    },
    //获取一级分类
    getFirstCategorys() {
      getFirstCategorys().then((res) => {
        if ((res.meta.code = "200")) {
          this.firstArr = res.data.list;
        }
      });
    },
    //获取二级分类
    getSecondCategorys(categoryId) {
      getSecondCategorys(categoryId ? categoryId : "-1").then((res) => {
        if ((res.meta.code = "200")) {
          this.secondArr = res.data.list;
        }
      });
    },
    // 分页器
    jumpPage(page) {
      this.queryParams.pageNum = page;
      this.queryCourse(this.queryParams);
    },
    //获取课程
    queryCourse(queryParams) {
      queryCourse(queryParams).then((res) => {
        if ((res.meta.code = "200")) {
          this.queryParams.total = res.data.pageInfo.total;
          this.arrcourse = res.data.pageInfo.list;
          this.arrcourse.forEach((item) => {
            switch (item.courseLevel) {
              case 1:
                item.courseLevel = "初级";
                break;
              case 2:
                item.courseLevel = "中级";
                break;
              case 3:
                item.courseLevel = "高级";
                break;
              default:
                item.courseLevel = "";
            }
          });
        }
      });
    },
  },
  watch: {
    $route: function (to, from) {
      let query = to.query;
      this.queryParams.entity.courseName = query.keywords;
      this.queryCourse(this.queryParams);
    },
  },
};
</script>


<style scoped>
.all .active,
.all .active2,
.all .active3 {
  color: #2c80ff;
}
.all .split {
  color: #d2d2d2;
}
/* 分类开始 */
.course {
  padding: 20px 0;
  width: 100%;
  /* height: 220px; */
  background: #f3f5f9;
}
.course-main {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}
.course-list {
  /*margin-left: 50px;*/
}
.title {
  display: flex;
  padding-top: 20px;
}
.title .title-name {
  width: 90px;
  height: 24px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 21px;
  text-align: justify;
  color: #333333;
  opacity: 1;
}
.title .all-list {
  width: 40px;
  height: 25px;
  line-height: 25px;
  border-radius: 4px;
  padding: 0 10px;
  align-items: center;
  text-align: center;
}
.title .all {
  opacity: 1;
  color: #2c80ff;
}
.title .item {
  height: 25px;
  line-height: 25px;
  margin: 0 15px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  /* color: #515759; */
  opacity: 1;
}
.title .item .active {
  color: #2c80ff;
}
.category-poniter {
  height: 25px;
  line-height: 25px;
  margin: 0 5px;
  cursor: pointer;
  border: none !important;
  background: rgba(44, 128, 255, 0.1);
  color: #2c80ff;
}
.category-poniter-item {
  background: none;
  color: rgba(81, 87, 89, 1);
}

/* 分类结束 */

/* 搜索条件开始 */
.coursemain {
  width: 100%;
}
.main-container {
  width: 1200px;
  /*height: 100%;*/
  margin: 0 auto;
  /* background: chartreuse; */
}
.container-top {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}
.all {
  display: flex;
  padding-top: 20px;
  font-size: 16px;
  color: #515759;
}
.all .item:first-child {
  margin-right: 20px;
}
.all .item {
  margin: 0 10px;
  cursor: pointer;
}

.right {
  display: flex;
  padding-top: 20px;
  font-size: 16px;
  color: #515759;
}
.right .right-item {
  margin-left: 10px;
}

.right .right-items {
  margin-right: 0px;
}
.arrow {
  position: relative;
}
.arrow i:first-child {
  position: absolute;
  top: -5px;
}
.arrow i:last-child {
  position: absolute;
  top: 4px;
}
.check {
  width: 15px;
  height: 15px;
  cursor: pointer;
}
.up {
  position: absolute;
  top: 5px;
  left: 2px;
}
.down {
  position: absolute;
  top: 15px;
  left: 2px;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg); /* Opera */
}
/* 搜索调价结束 */
/* 课程内容开始 */
.newCourseContent {
  width: 1200px;
  margin: 30px auto 0px auto;
}
.newCourseContent .courseUl {
  display: flex;
  flex-wrap: wrap;
}
.newCourseContent .courseUl .courseItem {
  width: 285px;
  height: 280px;
  margin: 0 20px 20px 0;
}
.newCourseContent .courseUl .courseItem:hover {
  cursor: pointer;
}
.newCourseContent .courseUl .courseItem:nth-child(4n + 0) {
  margin-right: 0 !important;
}
.courseCard {
  width: 1200px;
  height: 600px;
  margin: 20px 0 0 0;
}
.courseInfo {
  width: 100%;
  height: 260px;
  background: #ffffff;
  box-shadow: 2px 4px 4px rgba(27, 39, 94, 0.1);
  opacity: 1;
  overflow: hidden;
  border-radius: 8px;
  transition: margin-top 0.2s;
  -webkit-transition: margin-top 0.2s;
}
.courseInfo:hover {
  margin-top: -10px;
}
.courseBg {
  position: relative;
  width: 100%;
  height: 160px;
}
.courseImg {
  width: 100%;
  height: 100%;
}
.courseDesc {
  position: absolute;
  top: 45px;
  left: 15px;
  font-size: 24px;
  color: #ffffff;
}
.courseName {
  margin: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.courseDegree {
  margin-left: 10px;
  font-size: 12px;
  color: #808080;
}
.coursePrice {
  display: flex;
  font-size: 14px;
  margin: 10px;
  justify-content: space-between;
}
.courseMemberbg {
  position: relative;
  left: 0px;
  top: 2px;
  width: 80px;
  height: 25px;
  color: red;
  font-weight: 700;
}
.courseMemberbg img{
    position: relative;
    left: 60px;
    top: 4px;
    width: 15px;
    height: 10px;
}
.coursePriceZero{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 72px;
	font-size: 14px;
    font-weight: 700;
	margin-top: 2px;
    padding: 0 1px;
    color: rgba(53, 134, 255, 1);
}
.courseMember {
  position: absolute;
  line-height: 25px;
  left: 0px;
}
.price {
  line-height: 29px;
  left: 90px;
  color: #ff727f;
  font-weight: 700;
}
/* 课程内容结束 */
/* 分页开始 */
.pages {
  width: 100%;
  height: 100%;
  margin: 50px auto !important;
}
.addCart {
  margin-top: 3px;
  color: #ff3d17;
}
/* 分页结束 */
</style>
