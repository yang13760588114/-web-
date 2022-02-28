<template>
  <div>
    <!-- 不知道为什么直接写 css 总是无效... -->
    <el-table
      :data="tableData"
      height="530"
      border
      style="width: 100%"
      :header-cell-style="columnStyle"
      :cell-style="columnStyle"
    >
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="nodeName" label="鱼缸节点" width="150" />
      <el-table-column label="监测数据" width="720">
        <el-table-column prop="recordTime" label="时间" width="180" />
        <el-table-column prop="temperature" label="温度" width="180" />
        <el-table-column prop="degermingStatus" label="除菌器" width="180" />
        <el-table-column prop="lightStatus" label="灯光" width="180" />
        <el-table-column prop="heaterStatus" label="加热器" width="180" />
      </el-table-column>
      <el-table-column label="操作" prop="id">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="remove(scope.row.id)"
            icon="el-icon-delete"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { pageHistoryRecords, removeRecord } from "@/api/record";
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      totalPage: 0,
      columnStyle: {
        textAlign: "center",
      },
      request: {
        startTime: null,
        endTime: null,
        page: null,
        pageSize: null,
        nodeId: null,
      },
    };
  },
  methods: {
    remove(recordId) {
      this.$confirm("确定删除该条记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        removeRecord(recordId).then((res) => {
          this.pageRecord(this.request);
          this.$message({
            type: "success",
            message: res.message,
          });
        });
      });
    },
    pageRecord(request) {
      pageHistoryRecords(request).then((res) => {
        const page = res.result;
        this.tableData = page.records;
        this.count = page.count;
        this.totalPage = page.totalPage;
      });
    },
  },
  created() {
    this.pageRecord(this.request);
  },
};
</script>

<style scoped>
el-input {
  width: 50px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
