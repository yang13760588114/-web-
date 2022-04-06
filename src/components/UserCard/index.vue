<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">当前用户</span>
        <el-button class="update-pwd-btn" type="text" @click="drawer = true">
          修改密码
        </el-button>
      </div>
      <el-form label-position="right" label-width="80px">
        <el-form-item label="账户:">
          <span>{{ userInfo.username }}</span>
        </el-form-item>
        <el-form-item label="手机号:">
          <span>{{ userInfo.phoneNumber }}</span>
        </el-form-item>
        <el-form-item label="邮箱:">
          <span>{{ userInfo.eMail }}</span>
        </el-form-item>
        <el-form-item label="性别:">
          <span>{{ userInfo.genderText }}</span>
        </el-form-item>
        <el-form-item label="角色:">
          <span>{{ userInfo.roleText }}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 更新密码抽屉 -->
    <el-drawer
      title="更新密码"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form
        :rules="loginRules"
        :model="updatePwdForm"
        class="login-form"
        auto-complete="false"
        label-position="right"
      >
        <!-- 新密码 -->
        <el-form-item prop="newPwd">
          <el-input
            v-model="updatePwdForm.newPwd"
            type="password"
            placeholder="新密码"
            tabindex="2"
          />
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="confirmPwd">
          <el-input
            v-model="updatePwdForm.confirmPwd"
            type="password"
            placeholder="确认密码"
            tabindex="3"
          />
        </el-form-item>
        <!-- email -->
        <el-form-item prop="email">
          <el-input
            ref="password"
            v-model="updatePwdForm.email"
            type="text"
            placeholder="邮箱"
            tabindex="4"
          />
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="captcha">
          <el-input
            ref="password"
            v-model="updatePwdForm.captcha"
            type="text"
            placeholder="验证码"
            tabindex="5"
          />
        </el-form-item>
        <div class="footer-btn">
          <el-button
            type="primary"
            style="width: 30%"
            size="mini"
            @click.native.prevent="send"
          >
            发送验证码
          </el-button>
          <el-button
            type="primary"
            style="width: 30%"
            size="mini"
            @click.native.prevent="handleUpdatePwd"
          >
            确认修改
          </el-button>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { updatePwd, sendCaptcha } from "@/api/user";
import { removeToken, removeUserInfo, removeUserId } from "@/utils/auth";
export default {
  name: "userCard",
  props: {
    userInfo: {
      id: Number,
      username: String,
      phoneNumber: String,
      gender: Number,
      genderText: String,
      role: Number,
      roleText: String,
    },
  },
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error("账户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不少于6位"));
      } else {
        callback();
      }
    };
    return {
      drawer: false,
      updatePwdForm: {
        username: this.userInfo.username,
        newPwd: "",
        confirmPwd: "",
        email: "",
        captcha: "",
      },
      loginRules: {
        account: [
          { required: true, trigger: "blur", validator: validateAccount },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
    };
  },
  methods: {
    handleClose(done) {
      console.log(done);
      this.$confirm("确定关闭吗？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    send() {
      const mail = this.updatePwdForm.email;
      if (mail == "" || mail.length <= 0) {
        this.$message({
          type: "error",
          message: "邮箱不能为空",
        });
        return;
      }
      sendCaptcha(mail).then((res) => {
        this.$message({
          type: "success",
          message: res.result,
        });
      });
    },
    returnLogin() {
      this.$router.push("/login");
    },
    handleUpdatePwd() {
      updatePwd(this.updatePwdForm).then((res) => {
        this.$message({
          type: "success",
          message: res.result,
        });
        removeToken();
        removeUserInfo();
        removeUserId();
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
.footer-btn {
  display: flex;
  direction: column;
  justify-content: space-between;
}
.update-pwd-btn {
  float: right;
  padding: 3px 0;
}
.title {
  color: blue;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 300px;
}
</style>
