<template>
  <div class="dashboard-container">
    <div class="left">
      <userCard :userInfo="userInfo" class="card" />
      <div class="clock">{{ hour }}:{{ minute }}:{{ second }}</div>
    </div>
    <el-calendar class="calendar" v-model="date">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split("-").slice(1).join("-") }}
          {{ data.isSelected ? "" : "" }}
        </p>
      </template>
    </el-calendar>
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
      date: new Date(),
      hour: null,
      minute: null,
      second: null,
    };
  },
  methods: {
    mountUserInfo() {
      let user = getUserInfo();
      // 这里需要用 JSON 转换一下, 应为 cookie 存的东西再取出来是字符串
      this.userInfo = JSON.parse(user);
    },
    fillZero(num) {
      return num < 10 ? "0" + num : num;
    },
    setTime() {
      let date = new Date();
      this.second = this.fillZero(date.getSeconds());
      this.minute = this.fillZero(date.getMinutes());
      this.hour = this.fillZero(date.getHours());
    },
  },
  created() {
    this.mountUserInfo();
    this.setTime();
    setInterval(() => {
      this.setTime();
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.clock {
  font-size: 30px;
  font-weight: bold;
  margin-top: 50px;
  margin-left: 70px;
}
.calendar {
  height: 50%;
  width: 70%;
}
.card {
  height: 60%;
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
.is-selected {
  color: #1989fa;
}
</style>
