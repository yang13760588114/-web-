<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: QR</div>
  </div>
</template>

<script>
import { getUserInfo } from "@/utils/auth";
export default {
  name: "Dashboard",
  data() {
    return {
      userInfo: null,
    };
  },
  methods: {
    mountUserInfo() {
      this.userInfo = getUserInfo();
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
