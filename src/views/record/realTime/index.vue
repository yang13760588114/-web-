<template>
  <div>
    <p v-for="node in nodeList" :key="node.id">
      <nodeInfo :nodeId="node.id" :nodeName="node.name" />
    </p>
  </div>
</template>
<script>
import { listFishNode } from "@/api/fish";
import nodeInfo from "@/components/nodeInfo";

export default {
  data() {
    return {
      // 保存所有的鱼缸信息
      nodeList: [],
    };
  },
  created() {
    // 渲染鱼缸节点
    this.showNodes();
  },
  components: { nodeInfo },
  methods: {
    showNodes() {
      let fishNodes = listFishNode();
      // 异步方法获取的结果需要用 then() 获取成功调用时的结果
      fishNodes
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
  },
};
</script>
