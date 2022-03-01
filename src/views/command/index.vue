<template>
  <div>
    <el-table
      :data="tableData"
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
      <el-table-column label="命令状态" width="150">
        <template slot-scope="scope">
          <el-tag :type="scope.row.tagType">{{
            scope.row.commandStatusText
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发送命令解析" width="720">
        <el-table-column prop="nodeId" label="鱼缸编号" width="150" />
        <el-table-column prop="temperature" label="设置温度" width="180" />
        <el-table-column prop="createTime" label="命令发送时间" width="180" />
        <el-table-column prop="degerming" label="除菌器" width="180" />
        <el-table-column prop="light" label="灯光" width="180" />
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
      </el-table-column>
    </el-table>
    <div class="paging">
      <el-button type="primary" icon="el-icon-plus" circle />
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="request.page"
        :page-sizes="[10, 20, 30]"
        :page-size="request.pageSize"
        layout="total, sizes, prev, pager, next, jumper, ->"
        hide-on-single-page
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { pageCommandRecords, removeCommand } from "@/api/command";
import { listFishNode } from "@/api/fish";
export default {
  data() {
    return {
      count: 0,
      totalPage: 0,
      columnStyle: {
        textAlign: "center",
      },
      tagType: "info",
      request: {
        page: 1,
        pageSize: 10,
        nodeId: null,
        orderType: 1,
      },
    };
  },
  methods: {
    search() {
      if (this.queryTime[0] !== null) {
        this.request.startTime = this.queryTime[0];
      }
      if (this.queryTime[1] !== null) {
        this.request.endTime = this.queryTime[1];
      }
      this.pageRecord(this.request);
    },
    sort() {
      let orderType = this.request.orderType;
      orderType === 1
        ? (this.request.orderType = 2)
        : (this.request.orderType = 1);
      this.pageRecord(this.request);
    },
    handleSizeChange(size) {
      this.request.pageSize = size;
      this.pageRecord(this.request);
    },
    handleCurrentChange(page) {
      this.request.page = page;
      this.pageRecord(this.request);
    },
    remove(recordId) {
      this.$confirm("确定删除该条记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        removeCommand(recordId).then((res) => {
          this.pageRecord(this.request);
          this.$message({
            type: "success",
            message: res.message,
          });
        });
      });
    },
    pageRecord(request) {
      pageCommandRecords(request).then((res) => {
        const page = res.result;
        this.tableData = page.records;
        this.count = page.count;
        this.totalPage = page.totalPage;
      });
    },
  },
  created() {
    this.pageRecord(this.request);
    listFishNode().then((res) => {
      this.nodes = res.result;
    });
  },
};
</script>

<style scoped>
el-input {
  width: 50px;
}
.search-btn {
  border-style: none;
  float: right;
}
.items {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
.paging {
  display: flex;
  flex-direction: row;
  float: right;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
