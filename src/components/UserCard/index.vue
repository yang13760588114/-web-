<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">当前用户</span>
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
</template>

<script>
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
};
</script>

<style>
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
