<template>
  <div>
    <el-container class="container">
      <el-header> <svg-icon icon-class="yugang" /> {{ nodeName }}</el-header>
      <el-container>
        <el-aside width="200px">
          <statusFlag :name="flagNames[0]" :flag="degerming" />
          <statusFlag :name="flagNames[1]" :flag="heater" />
          <statusFlag :name="flagNames[2]" :flag="light" />
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
import statusFlag from "@/components/statusFlag";
import * as echarts from "echarts";
import { setBooleanValue } from "@/utils/value";

export default {
  name: "nodeInfo",
  components: { statusFlag },
  props: {
    nodeId: Number,
    nodeName: String,
  },
  data() {
    return {
      // flagNames
      flagNames: ["除菌器", "加热器", "灯光"],
      // 除菌器
      degerming: false,
      // 加热器
      heater: false,
      // 灯光
      light: false,
      chart: {},
    };
  },
  methods: {
    showRealTimeRecords() {
      const record = realTimeRecords(this.nodeId);
      record
        .then((res) => {
          // 除菌器
          this.degerming = setBooleanValue(res.result.degerming);
          // 加热器
          this.heater = setBooleanValue(res.result.heater);
          // 灯光
          this.light = setBooleanValue(res.result.light);
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
        alignTicks: true,
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
    this.showRealTimeRecords();
    setInterval(() => {
      this.showRealTimeRecords();
    }, 10000);
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
