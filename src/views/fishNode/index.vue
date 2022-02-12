<template>
  <div class="fish-node-container">
    <h2 class="desc">鱼缸节点信息</h2>
    <div v-for="(node, index) in nodeList" :key="node.id">
      <el-descriptions
        :title="'节点' + (index + 1)"
        border
        :column="4"
        class="desc"
      >
        <template slot="extra">
          <el-button
            type="primary"
            size="small"
            round
            @click.prevent="updateFishNode(node)"
            >修改</el-button
          >
        </template>
        <template slot="extra">
          <el-button
            type="danger"
            size="small"
            round
            @click.prevent="removeFishNode(node.id)"
            >删除</el-button
          >
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-edit" /> 节点名称
          </template>
          <el-input
            v-model="node.name"
            clearable
            maxlength="10"
            show-word-limit
            border
          />
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label"> <i class="el-icon-s-order" /> 描述 </template>
          <el-input
            v-model="node.description"
            clearable
            maxlength="15"
            show-word-limit
            border
          />
        </el-descriptions-item>
        <el-descriptions-item>
          <!-- 这里我的理解是利用 slot 把一个叫 label 组件查到这里, 可以查看 vue 文档里的插槽 -->
          <template slot="label"> <i class="el-icon-place" /> 位置 </template>
          <el-input
            v-model="node.location"
            clearable
            maxlength="40"
            show-word-limit
            border
          />
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { listFishNode, removeFishNode, updateFishNode } from "@/api/fish";

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
    updateFishNode(node) {
      this.$confirm("是否更新鱼缸节点信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateFishNode(node).then((res) => {
            if (res.success) {
              this.listNodes();
              this.$message({
                type: "success",
                message: "更新成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "更新失败! " + res.message,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消更新操作",
          });
        });
    },
    removeFishNode(id) {
      this.$confirm("是否删除此鱼缸节点信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用删除鱼缸节点信息接口
          removeFishNode(id).then((res) => {
            if (res.success) {
              this.listNodes();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: res.message,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
