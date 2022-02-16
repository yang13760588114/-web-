<template>
  <div>
    <p v-for="node in nodeList" :key="node.id">
      <el-container>
        <el-header> <svg-icon icon-class="yugang" /> {{ node.name }}</el-header>
        <el-main id="temperature">Main</el-main>
      </el-container>
    </p>
  </div>
</template>
<script>
import { listFishNode } from "@/api/fish";

export default {
  data() {
    return {
      nodeList: [],
    };
  },
  created() {
    // 渲染鱼缸节点
    this.nodes();
    // 创建 socket 链接
    this.initWebSocket();
  },
  destroyed() {
    // 离开页面生命周期函数
    this.websocketclose();
  },
  methods: {
    nodes() {
      let res = listFishNode();
      // 异步方法获取的结果需要用 then() 获取成功调用时的结果
      res
        .then((res) => {
          this.nodeList = res.result;
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: res.message,
          });
        });
    },
    initWebSocket() {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      this.websock = new WebSocket("ws://localhost/znyg/socket/qr");
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror() {
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      // console.log(`Get Message: ${e.data}`);
    },
    websocketclose() {
      console.log(`connection closed`);
    },
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
