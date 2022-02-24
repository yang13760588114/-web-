<template>
  <div>
    <el-container class="container">
      <el-header> <svg-icon icon-class="yugang" /> {{ nodeName }}</el-header>
      <el-container>
        <el-aside width="200px">
          <div>
            除菌器:
            <el-switch
              v-model="degerming"
              active-text="开"
              inactive-text="关"
            />
          </div>
          <div>
            加热器:
            <el-switch v-model="heater" active-text="开" inactive-text="关" />
          </div>
          <div>
            灯光:
            <el-switch v-model="light" active-text="开" inactive-text="关" />
          </div>
        </el-aside>
        <el-main>
          <div
            :id="'nodeId' + nodeId"
            style="width: 600px; height: 400px"
          ></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { realTimeRecords } from "@/api/record";

import * as echarts from "echarts";

export default {
  name: "nodeInfo",
  props: {
    nodeId: Number,
    nodeName: String,
  },
  data() {
    return {
      degerming: false,
      heater: false,
      light: false,
      chart: {},
      chartOptions: {
        title: {
          text: "实时温度",
        },
        tooltip: {},
        xAxis: {
          data: this.temperatures,
        },
        yAxis: {},
        series: [
          {
            name: "记录时间",
            type: "line",
            data: this.dates,
          },
        ],
      },
    };
  },
  methods: {
    showRealTimeRecords() {
      const record = realTimeRecords(this.nodeId);
      record
        .then((res) => {
          // 除菌器
          if (res.result.degerming == 1) {
            this.degerming = true;
          } else {
            this.degerming = false;
          }
          // 加热器
          if (res.result.heater == 1) {
            this.heater = true;
          } else {
            this.heater = false;
          }
          // 灯光
          if (res.result.light == 1) {
            this.light = true;
          } else {
            this.light = false;
          }
          this.chart.setOption({
            xAxis: {
              data: res.result.temperatures,
            },
            series: [
              {
                name: "记录时间",
                type: "line",
                data: res.result.dates,
              },
            ],
          });
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
    // 基于准备好的dom，初始化echarts实例
    this.chart = echarts.init(document.getElementById("nodeId" + this.nodeId));
    // 绘制图表
    this.chart.setOption(this.chartOptions);
  },
};
</script>

<style scoped>
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
  line-height: 120px;
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
