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
              active-value="1"
              inactive-text="关"
              inactive-value="0"
            />
          </div>
          <div>
            加热器:
            <el-switch v-model="heater" active-text="开" inactive-text="关" />
          </div>
          <div>
            灯 光:
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
      // 除菌器
      degerming: 0,
      // 加热器
      heater: 0,
      // 灯光
      light: 0,
      chart: {},
    };
  },
  methods: {
    showRealTimeRecords() {
      const record = realTimeRecords(this.nodeId);
      record
        .then((res) => {
          // 除菌器
          this.degerming = res.result.degerming;
          // 加热器
          this.heater = res.result.heater;
          // 灯光
          this.light = res.result.light;
          // 折线图数据: 温度, 时间
          this.chart.setOption({
            xAxis: {
              data: res.result.dates,
            },
            series: [
              {
                name: "记录时间",
                data: res.result.temperatures,
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
    // 基于准备好的dom，初始化echarts实例
    this.chart = echarts.init(document.getElementById("nodeId" + this.nodeId));
    // 绘制图表
    this.chart.setOption({
      title: {
        text: "实时温度",
      },
      xAxis: {
        alignTicks: true,
        name: "时间",
        data: [],
      },
      yAxis: {
        name: "温度",
        type: "value",
      },
      series: [
        {
          name: "记录时间",
          type: "line",
          data: [],
        },
      ],
    });
    // 没有返回值的函数不要加"()"
    setInterval(() => {
      this.showRealTimeRecords();
    }, 1000);
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
