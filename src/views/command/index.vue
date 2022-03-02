<template>
  <div>
    <el-descriptions
      class="margin-top"
      title="控制命令状态"
      :column="4"
      style="margin: 30px"
      border
      :contentStyle="{ 'text-align': 'center' }"
    >
      <template slot="extra">
        <el-button
          type="primary"
          size="small"
          @click="drawer = true"
          circle
          icon="el-icon-plus"
        />
      </template>
      <el-descriptions-item>
        <template slot="label">
          <svg-icon icon-class="yugang" />鱼缸编号
        </template>
        {{ command.nodeId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-odometer"></i>
          温度
        </template>
        {{ command.temperature }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-magic-stick"></i>
          灯光
        </template>
        {{ command.light }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-wind-power"></i>
          除菌器
        </template>
        {{ command.degerming }}
      </el-descriptions-item>
      <el-descriptions-item span="1">
        <template slot="label">
          <i class="el-icon-finished"></i>
          执行状态
        </template>
        <el-tag :type="tagType">{{ command.commandStatusText }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-chat-dot-square"></i>
          命令文本
        </template>
        {{ command.commandText }}
      </el-descriptions-item>
    </el-descriptions>
    <!-- 设置命令的抽屉页面 -->
    <el-drawer
      title="创建命令"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form label-position="right" label-width="80px">
        <el-form-item label="鱼缸编号">
          <el-input-number
            v-model="nodeId"
            controls-position="right"
            size="mini"
            :step="1"
            :min="0"
            :max="99"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="温度/°C">
          <el-input-number
            v-model="temperature"
            controls-position="right"
            size="mini"
            :step="1"
            :min="10"
            :max="40"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="灯光">
          <el-radio-group v-model="light">
            <el-radio label="N">关闭</el-radio>
            <el-radio label="Y">开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="除菌器">
          <el-radio-group v-model="degerming">
            <el-radio label="N">关闭</el-radio>
            <el-radio label="Y">开启</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
/**控制命令格式为“KxxddssB”，
 * “K”为数据包开始标志，
 * “xx”为鱼缸编号，范围为“00-99”，
 * “dd”为设置的温度目标值，
 * “ss”分别代表要求灯光和除菌器开启或者关闭，“s”取值为”Y”表示开启，取值为“N”表示关闭，
 * 字母“B”为数据包结束标志和表示控制命令来自web程序。
 * */
import { getCommandRecord, removeCommand } from "@/api/command";
export default {
  data() {
    return {
      drawer: false,
      columnStyle: {
        textAlign: "center",
      },
      command: {},
      tagType: null,
      nodeId: null,
      temperature: 15,
      light: null,
      degerming: null,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    remove(recordId) {
      this.$confirm("确定删除该条记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        removeCommand(recordId).then((res) => {
          this.getRecord();
          this.$message({
            type: "success",
            message: res.message,
          });
        });
      });
    },
    getRecord() {
      getCommandRecord().then((res) => {
        this.command = res.result;
        this.tagType = res.result.tagType;
      });
    },
  },
  created() {
    this.getRecord();
  },
};
</script>

<style scoped>
.el-icon-arrow-down {
  font-size: 12px;
}
.el-descriptions-item {
  text-align: center;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
