<template>
  <div class="setprofile">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="profile-tabs">
      <el-tab-pane label="基本信息" name="first" class="profile-pane">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          style="width: 500px"
        >
          <el-form-item label="姓名" prop="realName">
            <el-input
              v-model="form.realName"
              :disabled="isDis"
              placeholder="无"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input
              v-model="form.nickName"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="certificateType">
            <el-select
              v-model="form.certificateType"
              placeholder="无"
              :disabled="isDis"
            >
              <el-option label="身份证" value="1"></el-option>
              <el-option label="居住证" value="2"></el-option>
              <el-option label="签证" value="3"></el-option>
              <el-option label="护照" value="4"></el-option>
              <el-option label="户口本" value="5"></el-option>
              <el-option label="军人证" value="6"></el-option>
              <el-option label="港澳通行证" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificateNumber">
            <el-input
              v-model="form.certificateNumber"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender" :disabled="isDis">
              <el-radio label="1">男生</el-radio>
              <el-radio label="2">女生</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="最高学历" prop="highestEducation">
            <el-select
              v-model="form.highestEducation"
              placeholder="无"
              :disabled="isDis"
            >
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
          <el-form-item label="年龄" prop="age">
            <el-input
              v-model="form.age"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="无"
              :disabled="isDis"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="户口所在地" prop="residenceAddress">
            <el-input
              v-model="form.residenceAddress"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="签名" prop="personalSignature">
            <el-input
              v-model="form.personalSignature"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="goNext">下一页</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="联系信息" name="second" class="profile-pane">
        <el-form
          ref="form"
          :model="form"
          label-width="120px"
          style="width: 500px"
        >
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="form.mobile"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="座机号" prop="officeTelephone">
            <el-input
              v-model="form.telephone"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="办公电话" prop="officeTelephone">
            <el-input
              v-model="form.officeTelephone"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人" prop="emergencyContact">
            <el-input
              v-model="form.emergencyContact"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话" prop="emergencyContactNumber">
            <el-input
              v-model="form.emergencyContactNumber"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form.email"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="wechat">
            <el-input
              v-model="form.wechat"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input
              v-model="form.qq"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="city" :disabled="true">
            <el-input
              v-model="form.city"
              :disabled="isDis"
              placeholder="无"
            ></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address" :disabled="true">
            <el-input
              v-model="form.address"
              placeholder="无"
              :disabled="isDis"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="!isDis">
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="changeInfo" @click="showBtn">修改信息</div>

    <!-- <el-dialog title="更新用户信息" :visible.sync="updateOpen">
      <el-form :model="updateForm">
        <el-form-item label="姓名" prop="realName">
            <el-input
              v-model="updateForm.realName"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input
              v-model="updateForm.nickName"
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="certificateType">
            <el-select v-model="updateForm.certificateType" placeholder="请输入证件类型">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="居住证" value="2"></el-option>
              <el-option label="签证" value="3"></el-option>
              <el-option label="护照" value="4"></el-option>
              <el-option label="户口本" value="5"></el-option>
              <el-option label="军人证" value="6"></el-option>
              <el-option label="港澳通行证" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificateNumber">
            <el-input
              v-model="updateForm.certificateNumber"
              placeholder="请输入证件号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="updateForm.gender">
              <el-radio :label="0">男生</el-radio>
              <el-radio :label="1">女生</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="最高学历" prop="highestEducation">
            <el-select v-model="updateForm.highestEducation" placeholder="无">
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
          <el-form-item label="年龄" prop="age">
            <el-input
              v-model="updateForm.age"
              placeholder="请输入年龄"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              v-model="updateForm.birthday"
              type="date"
              placeholder="请选择出生日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="户口所在地" prop="residenceAddress">
            <el-input
              v-model="updateForm.residenceAddress"
              placeholder="请输入户口所在地"
            ></el-input>
          </el-form-item>
          <el-form-item label="签名" prop="personalSignature">
            <el-input
              v-model="updateForm.personalSignature"
              placeholder="请输入签名"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model="updateForm.mobile"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="座机号" prop="officeTelephone">
            <el-input
              v-model="updateForm.telephone"
              placeholder="请输入座机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="办公电话" prop="officeTelephone">
            <el-input
              v-model="updateForm.officeTelephone"
              placeholder="请输入办公电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人" prop="emergencyContact">
            <el-input
              v-model="updateForm.emergencyContact"
              placeholder="请输入紧急联系人"
            ></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话" prop="emergencyContactNumber">
            <el-input
              v-model="updateForm.emergencyContactNumber"
              placeholder="请输入紧急联系人电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="updateForm.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="wechat">
            <el-input
              v-model="updateForm.wechat"
              placeholder="请输入微信"
            ></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input
              v-model="updateForm.qq"
              placeholder="请输入qq"
            ></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="city" :disabled="true">
            <el-input
              v-model="updateForm.city"
              placeholder="请输入所在城市"
            ></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address" :disabled="true">
            <el-input
              v-model="updateForm.address"
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateOpen = false">取 消</el-button>
        <el-button type="primary" @click="updateOpen = false"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getInfo } from "@/common/api/auth";
import { createToken } from "@/common/api/token";
import { updateUserInfo } from "@/common/api/user";
export default {
  data() {
    return {
      activeName: "first",
      form: {},
      isDis: true,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  created() {
    this.form = this.userInfo;
    // this.getList()
  },
  methods: {
    ...mapActions(["saveUserInfoAction"]),
    getList() {
      createToken().then((mes) => {
        // var tokens = mes.data.token
        if (mes.meta.code == "200") {
          getInfo({
            token: mes.data.token,
          }).then((mess) => {
            //console.log(ress)
            // this.form = ress.data.data
            sessionStorage.setItem("userInfo", JSON.stringify(mess.data.data));
            this.saveUserInfoAction();
          });
        }
      });
    },
    handleClick() {},
    goNext() {
      this.activeName = "second";
    },
    onSubmit() {
      //遍历所有的form表单 过滤特殊字符
      for (var item in this.form) {
        if (item !== "avatar" && this.form[item]) {
          this.form[item] = this.filterStr(this.form[item]);
        }
      }
      console.log(this.form)
      createToken().then((res) => {
        // console.log(res.data.res)
        if (res.meta.code === "200") {
          updateUserInfo({
            token: res.data.token,
            ...this.form
          }).then((ress) => {
            console.log(ress);
            if (ress.meta.code === "200") {
              this.getList();
              this.isDis = true;
              this.$message({
                message: "更新信息成功",
                type: "success",
              });
            }
          });
        }
      });
      // console.log(this.form);
    },
    // 验证特殊字符
    filterStr(str) {
      var pattern = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]"
      );
      var specialStr = "";
      for (var i = 0; i < str.length; i++) {
        specialStr += str.substr(i, 1).replace(pattern, "");
      }
      return specialStr;
    },
    showBtn() {
      // this.updateOpen = true;
      this.isDis = false;
    },
    cancel() {
      this.isDis = true;
      this.form = this.userInfo;
    },
  },
};
</script>

<style scoped>
.setprofile {
  position: relative;
}
.profile-tabs {
  width: 100%;
  height: 800px;
}
.profile-pane {
  width: 100%;
  height: 800px;
}
.changeInfo {
  width: 80px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: rgba(101, 142, 255, 1);
  text-align: center;
  /* border:1px solid red; */
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
</style>