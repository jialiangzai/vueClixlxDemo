<template>
  <div class="course-type">
    <div class="course-type">
      <div class="course-type-item">
        <router-link to="#">
          <div class="course-type-item-icon">
            <i class="el-icon-picture"></i>
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">初级课程</div>
            <div class="course-type-item-desc">入门快、岗位多</div>
          </div>
        </router-link>
      </div>
      <div class="course-type-item">
        <router-link to="#">
          <div class="course-type-item-icon">
            <i class="el-icon-picture"></i>
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">初级课程</div>
            <div class="course-type-item-desc">入门快、岗位多</div>
          </div>
        </router-link>
      </div>
      <div class="course-type-item">
        <router-link to="#">
          <div class="course-type-item-icon">
            <i class="el-icon-picture"></i>
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">初级课程</div>
            <div class="course-type-item-desc">入门快、岗位多</div>
          </div>
        </router-link>
      </div>
      <div class="course-type-item">
        <router-link to="#">
          <div class="course-type-item-icon">
            <i class="el-icon-picture"></i>
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">初级课程</div>
            <div class="course-type-item-desc">入门快、岗位多</div>
          </div>
        </router-link>
      </div>
      <div class="course-type-item">
        <router-link to="#">
          <div class="course-type-item-icon">
            <i class="el-icon-picture"></i>
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">初级课程</div>
            <div class="course-type-item-desc">入门快、岗位多</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<style scoped>
.course-type {
  display: flex;
  width: calc(1300px - 2px);
  margin: 0 auto;
  /* border: #808080 solid 1px; */
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 20px 20px #d2d2d2;
}
.course-type .course-type-item {
  width: 260px;
  height: 100px;
  flex: 1;
}
.course-type .course-type-item a {
  display: flex;
  justify-content: center;
}
.course-type-item .course-type-item-icon {
  font-size: 35px;
  border-radius: 50%;
  margin: 25px 10px 25px 0;
  width: 50px;
  height: 50px;
  background: #55ee8b;
  text-align: center;
  line-height: 50px;
  color: #ffffff;
}
.course-type-item .course-type-item-text {
  margin: 25px 0;
}
.course-type-item .course-type-item-text .course-type-item-title {
  font-size: 18px;
  line-height: 30px;
  font-weight: bold;
}
.course-type-item .course-type-item-text .course-type-item-desc {
  color: #808080;
  font-size: 14px;
}
</style>
