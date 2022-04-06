<template>
  <div>
    <el-container class="container">
      <el-header>
        <svg-icon icon-class="yugang" />
        {{ node.name }}-{{ node.location }}-{{ node.description }}
      </el-header>
      <el-container>
        <el-aside width="250px" class="aside">
          <div>实时温度: {{ latestTemperature }} °C</div>
          <div>温度范围: {{ value[0] / 10 }}°C ~ {{ value[1] / 10 }}°C</div>
          <div>
            加热器状态: <el-tag :type="type" size="mini">{{ heater }}</el-tag>
          </div>
        </el-aside>
        <el-main>
          <chart :options="orgOptions" :auto-resize="true" />
        </el-main>
        <el-aside width="250px" class="aside">
          <div>
            自动加热
            <el-switch
              v-model="heaterStatus"
              active-text="开"
              inactive-text="关"
              @change="changeStatus"
            />
          </div>
          <div>
            除菌器
            <el-switch
              v-model="degermingStatus"
              active-text="开"
              inactive-text="关"
              @change="changeStatus"
            />
          </div>
          <div>
            灯光
            <el-switch
              v-model="lightStatus"
              active-text="开"
              inactive-text="关"
              @change="changeStatus"
            />
          </div>
          <el-button type="warning" @click="setLimit = true">
            设置温度
          </el-button>
        </el-aside>
      </el-container>
    </el-container>
    <!-- 设置温度上下限的弹窗 -->
    <el-dialog title="收货地址" :visible.sync="setLimit">
      <el-slider
        v-model="value"
        range
        :marks="marks"
        :min="50"
        :max="400"
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
import { realTimeRecords } from "@/api/record";
import statusFlag from "@/components/statusFlag";
import { getLimit, saveOrUpdateLimit } from "@/api/limit";
import { getCommand } from "@/api/command";

export default {
  name: "nodeInfo",
  components: { statusFlag },
  props: {
    node: { id: Number, name: String, location: String, description: String },
  },
  data() {
    return {
      type: "info",
      // 滑块数据
      value: [200, 250],
      marks: {
        140: "14°C",
        250: "25°C",
        370: "37°C",
      },
      heaterStatus: 0,
      degermingStatus: 0,
      lightStatus: 0,
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
          name: "温度",
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
      },
      // 加热器
      heater: "关闭",
      latestTemperature: null,
      timer: null,
    };
  },
  methods: {
    formatTooltip(val) {
      return val / 10;
    },
    // 获取鱼缸各值的状态
    getLimit(nodeId) {
      getLimit(nodeId).then((res) => {
        this.value[0] = res.result.temperatureLowerLimit * 10;
        this.value[1] = res.result.temperatureUpperLimit * 10;
        this.heaterStatus = res.result.heater;
        this.degermingStatus = res.result.degerming;
        this.lightStatus = res.result.light;
      });
    },
    saveOrUpdateLimit(value) {
      const setLimitRequest = {
        nodeId: this.node.id,
        temperatureUpperLimit: value[1] / 10,
        temperatureLowerLimit: value[0] / 10,
      };
      saveOrUpdateLimit(setLimitRequest).then((res) => {
        this.getLimit(this.node.id);
        const val = res.result;
        setTimeout(() => {
          getCommand(val).then((res) => {
            if (res.result == 2) {
              this.$message({
                type: "success",
                message: "执行成功",
              });
            } else {
              this.$message({
                type: "error",
                message: "控制命令执行失败，请重新执行",
              });
            }
          });
        }, 6000);
      });
      this.setLimit = false;
    },
    showRealTimeRecords() {
      const record = realTimeRecords(this.node.id);
      record
        .then((res) => {
          // 加热器
          const text = res.result.heaterStatusText;
          this.heater = text;
          if (text == "开启") {
            this.type = "success";
          } else {
            this.type = "info";
          }
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
    // 开关的回调的函数
    changeStatus(val) {
      if (val) {
        // TODO
      } else {
        // TODO
      }
    },
  },
  created() {
    this.getLimit(this.node.id);
    this.showRealTimeRecords();
    this.timer = setInterval(() => {
      this.showRealTimeRecords();
    }, 3000);
    this.getLimit(this.node.id);
  },
  beforeDestroy() {
    // 删除定时器
    clearInterval(this.timer);
    this.timer = null;
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
