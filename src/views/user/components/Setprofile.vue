<template>
  <div class="setprofile">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="profile-tabs">
      <el-tab-pane label="基本信息" name="first" class="profile-pane">
        <el-form
          ref="basicForm"
          :model="basicForm"
          label-width="100px"
          style="width: 500px"
        >
          <el-form-item label="姓名">
            <el-input v-model="basicForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="basicForm.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select v-model="basicForm.region" placeholder="请选择证件类型">
              <el-option label="身份证" value="0"></el-option>
              <el-option label="护照" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input
              v-model="basicForm.name"
              placeholder="请输入证件号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="basicForm.sex">
              <el-radio :label="0">男生</el-radio>
              <el-radio :label="1">女生</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="最高学历">
            <el-select v-model="basicForm.education" placeholder="请选择最高学历">
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="中专" value="中专"></el-option>
              <el-option label="初中" value="初中"></el-option>
              <el-option label="小学" value="小学"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="basicForm.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="basicForm.birth"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="户口所在地">
            <el-input
              v-model="basicForm.address"
              placeholder="户口所在地"
            ></el-input>
          </el-form-item>
          <el-form-item label="签名">
            <el-input v-model="basicForm.age" placeholder="请输入签名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="联系信息" name="second" class="profile-pane">
        <el-form
          ref="contactForm"
          :model="contactForm"
          label-width="120px"
          style="width: 500px"
        >
          <el-form-item label="手机号">
            <el-input v-model="contactForm.name" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="座机号">
            <el-input v-model="contactForm.name" placeholder="请输入座机号"></el-input>
          </el-form-item>
          <el-form-item label="办公电话">
            <el-input v-model="contactForm.region" placeholder="请选择办公电话"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人">
            <el-input
              v-model="contactForm.name"
              placeholder="请输入紧急联系人"
            ></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话">
            <el-input v-model="contactForm.sex" placeholder="请输入紧急联系人电话"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="contactForm.age" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="微信">
            <el-input v-model="contactForm.age" placeholder="请输入微信"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="contactForm.age" placeholder="请输入QQ"></el-input>
          </el-form-item>
          <el-form-item label="所在城市">
            <el-input
              v-model="contactForm.address"
              placeholder="请输入所在城市"
            ></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="contactForm.age" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button>取消</el-button>
            <el-button type="primary" @click="onSubmit">确认</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      basicForm: {},
      contactForm: {}
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style scoped>
.profile-tabs {
  width: 100%;
  height: 800px;
}
.profile-pane {
  width: 100%;
  height: 800px;
}
</style>