<template>
  <div>
    <el-container>
      <el-header> <svg-icon icon-class="yugang" /> {{ nodeName }}</el-header>
      <el-main id="temperature"> Main </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "nodeInfo",
  props: {
    nodeId: Number,
    nodeName: String,
  },
  data() {
    return {
      nodeInfo: {},
    };
  },
  methods: {},
  created: {},
};
</script>

<style scoped>
.chart {
  height: 400px;
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
  line-height: 200px;
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
