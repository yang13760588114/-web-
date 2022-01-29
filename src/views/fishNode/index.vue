<template>
  <div class="fish-node-container">
    <h2 class="desc">鱼缸节点</h2>
    <el-form> </el-form>
    <el-descriptions title="鱼缸节点信息" border :column="4" class="desc">
      <el-descriptions-item>
        <template slot="label"> <i class="el-icon-edit" /> 节点名称 </template>
        鱼缸节点1号
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label"> <i class="el-icon-s-order" /> 备注 </template>
        1号鱼缸备注
      </el-descriptions-item>
      <el-descriptions-item>
        <!-- 这里我的理解是利用 slot 把一个叫 label 组件查到这里, 可以查看 vue 文档里的插槽 -->
        <template slot="label"> <i class="el-icon-place" /> 位置 </template>
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu, Province
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.desc {
  margin: 50px;
}
</style>
