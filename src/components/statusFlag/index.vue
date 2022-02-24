<template>
  <div>
    {{ name }}
    <el-switch v-model="flag" active-text="开" inactive-text="关" />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    flag: Boolean,
  },
};
</script>
