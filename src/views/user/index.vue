<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">当前用户</span>
      </div>
      <el-form label-position="right" label-width="80px">
        <el-form-item label="账户">
          <span>{{ userInfo.username }}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userInfo.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.eMail"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from "@/utils/auth";
export default {
  name: "Dashboard",
  data() {
    return {
      userInfo: {
        username: String,
        phoneNumber: String,
      },
    };
  },
  methods: {
    mountUserInfo() {
      this.userInfo = getUserInfo();
      console.log(this.userInfo);
    },
  },
  created() {
    this.mountUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: blue;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
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
  width: 480px;
}
</style>
