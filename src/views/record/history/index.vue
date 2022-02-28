<template>
  <div>
    <!-- 不知道为什么直接写 css 总是无效... -->
    <div class="header">
      <div class="items">
        <el-date-picker
          v-model="queryTime"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-dropdown
          trigger="click"
          split-button
          @command="
            (command) => {
              handleCommand(command);
            }
          "
        >
          <span class="el-dropdown-link"> {{ dropdownItemName }} </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="node in nodes"
              :key="node.id"
              :command="node"
            >
              {{ node.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i class="el-icon-close" @click="clear" style="margin-left: 10px" />
      </div>
      <el-button icon="el-icon-search" class="search-btn" @click="search" />
    </div>
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
      <el-table-column prop="nodeName" label="鱼缸节点" width="150" />
      <el-table-column label="监测数据" width="720">
        <el-table-column prop="recordTime" label="时间" width="180" />
        <el-table-column prop="temperature" label="温度" width="180" />
        <el-table-column prop="degermingStatus" label="除菌器" width="180" />
        <el-table-column prop="lightStatus" label="灯光" width="180" />
        <el-table-column prop="heaterStatus" label="加热器" width="180" />
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
      <el-button
        icon="el-icon-sort"
        circle
        size="mini"
        class="sort-btn"
        @click="sort"
      />
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="request.page"
        :page-sizes="[20, 50, 100]"
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
import { pageHistoryRecords, removeRecord } from "@/api/record";
import { listFishNode } from "@/api/fish";
export default {
  data() {
    return {
      nodes: [],
      tableData: [],
      queryTime: null,
      count: 0,
      totalPage: 0,
      dropdownItemName: "鱼缸选择",
      columnStyle: {
        textAlign: "center",
      },
      request: {
        startTime: null,
        endTime: null,
        page: 1,
        pageSize: 20,
        nodeId: null,
        orderType: 1,
      },
    };
  },
  methods: {
    handleCommand(node) {
      this.request.nodeId = node.id;
      this.dropdownItemName = node.name;
    },
    clear() {
      this.request.nodeId = null;
      this.dropdownItemName = "鱼缸选择";
    },
    search() {
      if (this.queryTime !== null) {
        if (this.queryTime[0] !== null) {
          this.request.startTime = this.queryTime[0];
        }
        if (this.queryTime[1] !== null) {
          this.request.endTime = this.queryTime[1];
        }
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
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.sort-btn {
  border-style: none;
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
