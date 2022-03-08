<template>
  <div class="login-container">
    <el-form
      :rules="loginRules"
      :model="updatePwdForm"
      class="login-form"
      auto-complete="false"
      label-position="right"
    >
      <div class="title-container">
        <h3 class="title">更新密码</h3>
      </div>
      <!-- 账号 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="updatePwdForm.username"
          placeholder="账号"
          type="text"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="newPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          v-model="updatePwdForm.newPwd"
          :type="passwordType"
          placeholder="新密码"
          tabindex="2"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="confirmPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          v-model="updatePwdForm.confirmPwd"
          :type="passwordType"
          placeholder="确认密码"
          tabindex="3"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- email -->
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-message"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="updatePwdForm.email"
          type="text"
          placeholder="邮箱"
          tabindex="4"
        />
        <span class="show-pwd" @click.prevent="send">
          <i class="el-icon-position"></i>
        </span>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="captcha">
        <span class="svg-container">
          <i class="el-icon-chat-dot-square"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="updatePwdForm.captcha"
          type="text"
          placeholder="验证码"
          tabindex="5"
        />
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleUpdatePwd"
      >
        确认修改
      </el-button>
      <a class="forget" @click.prevent="returnLogin">返回</a>
    </el-form>
  </div>
</template>

<script>
import { updatePwd, sendCaptcha } from "@/api/user";
export default {
  name: "Login",
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
      updatePwdForm: {
        username: "",
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
      loading: false,
      passwordType: "password",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
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
    // 设置密码旁边的图标
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleUpdatePwd() {
      alert(1);
    },
  },
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

.forget {
  float: right;
  color: blue;
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
