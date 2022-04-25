<template>
  <div class="fish-node-container">
    <el-row type="flex" justify="space-between" class="desc">
      <el-col>
        <div class="nodeTitle">鱼缸节点信息</div>
      </el-col>
      <el-col>
        <el-button
          icon="el-icon-plus"
          circle
          @click="createFishNode = true"
          class="addBtn"
        />
      </el-col>
    </el-row>
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
    <!-- 添加鱼缸节点的弹窗 -->
    <el-dialog title="新增鱼缸节点信息" :visible.sync="createFishNode">
      <el-form :model="newNode">
        <el-form-item label="鱼缸节点名称">
          <el-input v-model="newNode.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newNode.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="newNode.location" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createFishNode = false">取 消</el-button>
        <el-button type="primary" @click="addFishNode(newNode)">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listFishNode, removeFishNode, editFishNode } from "@/api/fish";

export default {
  data() {
    return {
      nodeList: [],
      createFishNode: false,
      newNode: {
        name: "",
        location: "",
        description: "",
      },
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
    // 更新鱼缸节点
    updateFishNode(node) {
      this.$confirm("是否更新鱼缸节点信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          editFishNode(node).then((res) => {
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
    // 删除鱼缸节点
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
    // 添加鱼缸节点
    addFishNode(node) {
      this.createFishNode = false;
      editFishNode(node).then((res) => {
        if (res.success) {
          this.listNodes();
          this.$message({
            type: "success",
            message: "创建成功!",
          });
        } else {
          this.$message({
            type: "error",
            message: "更新失败! " + res.message,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.desc {
  margin: 50px;
}
.title {
  display: flex;
  flex-direction: row;
}
.addBtn {
  float: right;
}
.nodeTitle {
  font-family: "微软雅黑";
  font-size: 24px;
  font-weight: bold;
}
</style>
