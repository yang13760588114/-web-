<template>
  <div>
    <el-container class="container">
      <el-header> <svg-icon icon-class="yugang" /> {{ nodeName }}</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <v-chart class="chart" :option="option"></v-chart>
          <div>temperature: {{ temperatures }}</div>
          <div>dates: {{ dates }}</div>
          <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
          <div id="main" style="width: 600px; height: 400px"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { realTimeRecords } from "@/api/record";

export default {
  name: "nodeInfo",
  props: {
    nodeId: Number,
    nodeName: String,
  },
  data() {
    return {
      dates: [],
      temperatures: [],
      degerming: 0,
      heater: 0,
      light: 0,
    };
  },
  methods: {
    showRealTimeRecords() {
      const record = realTimeRecords(this.nodeId);
      record
        .then((res) => {
          this.dates = res.result.dates;
          this.temperatures = res.result.temperatures;
          this.degerming = res.result.degerming;
          this.heater = res.result.heater;
          this.light = res.result.light;
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: res.message,
          });
        });
    },
  },
  mounted() {
    // 没有返回值的函数不要加"()"
    setInterval(this.showRealTimeRecords, 2000);
  },
};
</script>

<style scoped>
/* .container {
  margin-left: 50px;
  margin-right: 50px;
} */
.chart {
  height: 400px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  margin: 0px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
