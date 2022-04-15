<template>
  <div>
    <!-- 不知道为什么直接写 css 总是无效... -->
    <div class="header">
      <div class="items">
        <!-- 日期选择器 -->
        <el-date-picker
          v-model="queryTime"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="clearable"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <!-- 鱼缸选择下拉框 -->
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
      <div class="items">
        <i class="el-icon-sort" @click="sort" />
        <el-button icon="el-icon-search" class="search-btn" @click="search" />
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="columnStyle"
      :cell-style="columnStyle"
    >
      <el-table-column label="记录编号" width="80" prop="id" />
      <el-table-column prop="nodeName" label="鱼缸节点" width="150" />
      <el-table-column label="监测数据" width="720">
        <el-table-column prop="recordTime" label="时间" width="180" />
        <el-table-column prop="temperature" label="水温/°C" width="90" />
        <el-table-column prop="upperLimit" label="水温上限/°C" width="100" />
        <el-table-column prop="lowerLimit" label="水温下限/°C" width="100" />
        <el-table-column prop="heaterAutoStatus" label="自动加热" width="90" />
        <el-table-column prop="degermingStatus" label="除菌器" width="90" />
        <el-table-column prop="lightStatus" label="灯光" width="90" />
        <el-table-column prop="heaterStatus" label="加热器" width="90" />
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="request.page"
        :page-sizes="[10, 20, 50, 100]"
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
      clearable: false,
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
        pageSize: 10,
        nodeId: null,
        orderType: 1,
      },
    };
  },
  methods: {
    handleCommand(node) {
      this.request.nodeId = node.id;
      this.dropdownItemName = node.name;
      this.pageRecord(this.request);
    },
    // 清除查询请求的参数
    clear() {
      this.request.nodeId = null;
      this.dropdownItemName = "鱼缸选择";
      this.pageRecord(this.request);
      this.queryTime = null;
    },
    search() {
      if (this.queryTime !== null) {
        // 开始时间
        const startTime = this.queryTime[0];
        if (startTime !== null) {
          this.request.startTime = startTime;
        }
        // 结束时间
        const endTime = this.queryTime[1];
        if (endTime !== null) {
          this.request.endTime = endTime;
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
