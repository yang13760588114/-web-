<template>
  <div class="fish-node-container">
    <h2 class="desc">鱼缸节点信息</h2>
    <div v-for="node in nodeList" :key="node.id">
      <el-descriptions
        :title="'节点' + node.id"
        border
        :column="4"
        class="desc"
      >
        <template slot="extra">
          <el-button type="primary" size="small" round>修改</el-button>
        </template>
        <template slot="extra">
          <el-button type="danger" size="small" round>删除</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit" /> 节点名称
          </template>
          {{ node.name }}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label"> <i class="el-icon-s-order" /> 描述 </template>
          {{ node.description }}
        </el-descriptions-item>
        <el-descriptions-item>
          <!-- 这里我的理解是利用 slot 把一个叫 label 组件查到这里, 可以查看 vue 文档里的插槽 -->
          <template slot="label"> <i class="el-icon-place" /> 位置 </template>
          {{ node.location }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
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
    this.listNodes();
  },
  methods: {
    listNodes() {
      listFishNode().then((res) => {
        this.nodeList = res.result;
      });
    },
  },
};
</script>

<style scoped>
.desc {
  margin: 50px;
}
</style>
