<template>
  <div>
    <el-container class="container">
      <el-header>
        <svg-icon icon-class="yugang" />
        {{ node.name }}-{{ node.location }}-{{ node.description }}
      </el-header>
      <el-container>
        <!-- 左边 -->
        <el-aside width="250px" class="aside">
          <div>实时水温: {{ latestTemperature }}</div>
          <div>
            加热器状态:
            <el-tag :type="type" size="mini">{{ heaterStatus }}</el-tag>
          </div>
          <div>获取时间: {{ recordDate }}</div>
        </el-aside>
        <el-main>
          <chart :options="orgOptions" :auto-resize="true" />
        </el-main>
        <el-aside width="250px" class="aside">
          <div>
            自动加热:
            <el-switch
              v-model="heaterAutoStatus"
              active-text="开"
              inactive-text="关"
              @change="changeHeaterStatus"
            />
          </div>
          <div>水温范围: {{ range }}</div>
          <div>
            除菌器:
            <el-switch
              v-model="degermingStatus"
              active-text="开"
              inactive-text="关"
              @change="changeDegermingStatus"
            />
          </div>
          <div>
            灯光:
            <el-switch
              v-model="lightStatus"
              active-text="开"
              inactive-text="关"
              @change="changeLightStatus"
            />
          </div>
          <el-button type="warning" @click="setLimit = true">
            设置水温范围
          </el-button>
        </el-aside>
      </el-container>
    </el-container>
    <!-- 设置温度上下限的弹窗 -->
    <el-dialog title="设置水温范围" :visible.sync="setLimit">
      <el-slider
        v-model="value"
        range
        :marks="marks"
        :min="15"
        :max="30"
        :format-tooltip="formatTooltip"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="setLimit = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateLimit(value)">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { realTimeRecords, latestNodeStatus } from "@/api/record";
import { saveOrUpdateLimit, updateStatus } from "@/api/limit";
import { getCommand } from "@/api/command";

export default {
  name: "nodeInfo",
  props: {
    node: { id: Number, name: String, location: String, description: String },
  },
  data() {
    return {
      type: "info",
      // 滑块数据
      value: [18, 25],
      marks: {
        15: "15°C",
        25: "25°C",
        28: "28°C",
      },
      heaterAutoStatus: false,
      range: null,
      degermingStatus: false,
      lightStatus: false,
      recordDate: "未获取",
      heaterStatus: "未获取",
      setLimit: false,
      setLimitRequest: {
        nodeId: this.node.id,
        up: Number,
        low: Number,
      },
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
          name: "水温",
          type: "value",
        },
        visualMap: [
          {
            pieces: [
              {
                gte: 25.3, // 没有设置最小值，表明当前范围 [-Infinity, max] 变色
                color: "red",
              },
              {
                lte: 11.1, // 没有设置最大值，表明当前范围 [min, Infinity] 变色
                color: "blue",
              },
            ],
            outOfRange: {
              // 在选中范围外 的视觉元素，这里设置在正常范围内的图形颜色
              color: "green",
            },
          },
        ],
        series: [
          {
            data: [],
            type: "line",
          },
        ],
        tooltip: {
          trigger: "axis", //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
      },
      // 加热器显示状态
      latestTemperature: null,
      timer: null,
    };
  },
  methods: {
    formatTooltip(val) {
      return val;
    },
    saveOrUpdateLimit(value) {
      const setLimitRequest = {
        nodeId: this.node.id,
        temperatureLowerLimit: value[0],
        temperatureUpperLimit: value[1],
      };
      saveOrUpdateLimit(setLimitRequest).then((res) => {
        const val = res.result;
        setTimeout(() => {
          getCommand(val).then((res) => {
            if (res.result == 2) {
              this.$message({
                type: "success",
                message: "执行成功",
              });
            } else {
              this.getNodeLatestNodeStatus();
              this.$message({
                type: "error",
                message: "控制命令执行失败，请重新执行",
              });
            }
          });
        }, 5000);
      });
      this.setLimit = false;
    },
    showRealTimeRecords() {
      const record = realTimeRecords(this.node.id);
      record
        .then((res) => {
          // 最新的记录数据
          const latestRecord = res.result.record;
          if (latestRecord !== null) {
            // 加热器
            this.heaterStatus = latestRecord.heaterStatusText;
            if (latestRecord.heaterStatusText == "开启") {
              this.type = "success";
            } else {
              this.type = "info";
            }
            // 最新记录时间
            this.recordDate = latestRecord.recordTime;
            // 最新温度
            this.latestTemperature = latestRecord.temperature;
            // 温度范围
            this.range = latestRecord.temperatureRange;
            // 灯光状态
            this.lightStatus = latestRecord.lightStatus;
            // 自动加热状态
            this.heaterAutoStatus = latestRecord.heaterAutoStatus;
            // 除菌器状态
            this.degermingStatus = latestRecord.degermingStatus;
          }
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
    // 封装修改状态方法
    changeNodeStatus(obj, switchStatus) {
      this.destory();
      let status = 0;
      if (switchStatus) {
        status = 1;
      }
      updateStatus({
        nodeId: this.node.id,
        commandObj: obj,
        status: status,
      }).then((res) => {
        const id = res.result;
        setTimeout(() => {
          getCommand(id).then((res) => {
            if (res.result == 2) {
              this.$message({
                type: "success",
                message: "执行成功",
              });
            } else {
              // 重置状态
              this.getNodeLatestNodeStatus();
              this.$message({
                type: "error",
                message: "控制命令执行失败，请重新执行",
              });
            }
          });
          this.init();
        }, 3000);
      });
    },
    // 加热器滑块事件
    changeHeaterStatus(val) {
      this.changeNodeStatus("J", val);
    },
    // 灯光滑块事件
    changeLightStatus(val) {
      this.changeNodeStatus("D", val);
    },
    // 除菌器滑块事件
    changeDegermingStatus(val) {
      this.changeNodeStatus("C", val);
    },
    // 获取鱼缸的最新状态
    getNodeLatestNodeStatus() {
      latestNodeStatus(this.node.id).then((res) => {
        this.lightStatus = res.result.lightStatus;
        this.degermingStatus = res.result.degermingStatus;
        this.heaterAutoStatus = res.result.heaterStatus;
        this.temperatureUpperLimit = res.result.up;
        this.temperatureLowerLimit = res.result.low;
      });
    },
    //
    init() {
      this.showRealTimeRecords();
      this.timer = setInterval(() => {
        this.showRealTimeRecords();
      }, 15000);
    },
    destory() {
      // 删除定时器
      clearInterval(this.timer);
      this.timer = null;
    },
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.destory();
  },
};
</script>

<style scoped>
.aside {
  padding: 10px;
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
