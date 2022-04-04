<template>
  <div>
    <el-container class="container">
      <el-header>
        <svg-icon icon-class="yugang" />
        {{ node.name }}-{{ node.location }}-{{ node.description }}
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div>实时温度: {{ latestTemperature }} °C</div>
          <statusFlag :name="'自动加热'" :flag="heater" />
          <statusFlag :name="'除菌器'" :flag="degerming" />
          <statusFlag :name="'灯光'" :flag="light" />
        </el-aside>
        <el-main>
          <chart :options="orgOptions" :auto-resize="true" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { realTimeRecords } from "@/api/record";
import statusFlag from "@/components/statusFlag";
import { setBooleanValue } from "@/utils/value";

export default {
  name: "nodeInfo",
  components: { statusFlag },
  props: {
    node: { id: Number, name: String, location: String, description: String },
  },
  data() {
    return {
      orgOptions: {
        title: {
          text: "实时温度",
        },
        xAxis: {
          name: "时间",
          type: "category",
          data: [],
        },
        yAxis: {
          name: "温度",
          type: "value",
        },
        series: [
          {
            name: "记录时间",
            data: [],
            type: "line",
          },
        ],
      },
      // 除菌器
      degerming: false,
      // 加热器
      heater: false,
      // 灯光
      light: false,
      latestTemperature: null,
      timer: null,
    };
  },
  methods: {
    showRealTimeRecords() {
      const record = realTimeRecords(this.node.id);
      record
        .then((res) => {
          // 除菌器
          this.degerming = setBooleanValue(res.result.degerming);
          // 加热器
          this.heater = setBooleanValue(res.result.heater);
          // 灯光
          this.light = setBooleanValue(res.result.light);
          // 最新温度
          this.latestTemperature = res.result.temperature;
          this.orgOptions.xAxis.data = res.result.dates;
          this.orgOptions.series[0].data = res.result.temperatures;
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: res.message,
          });
        });
    },
  },
  created() {
    this.showRealTimeRecords();
    this.timer = setInterval(() => {
      this.showRealTimeRecords();
    }, 3000);
  },
  beforeDestroy() {
    // 删除定时器
    clearInterval(this.timer);
    this.timer = null;
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
