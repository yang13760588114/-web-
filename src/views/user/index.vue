<template>
  <div class="dashboard-container">
    <userCard :userInfo="userInfo"></userCard>
  </div>
</template>

<script>
import { getUserInfo } from "@/utils/auth";
import userCard from "@/components/UserCard";
export default {
  name: "Dashboard",
  components: { userCard },
  data() {
    return {
      userInfo: null,
    };
  },
  methods: {
    mountUserInfo() {
      let user = getUserInfo();
      // 这里需要用 JSON 转换一下, 应为 cookie 存的东西再取出来是字符串
      this.userInfo = JSON.parse(user);
    },
  },
  created() {
    this.mountUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
