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
  },
  data() {
    return {
      flag: false,
    };
  },
  watch: {
    flag: {
      handler(flag) {
        if (flag) {
          console.log("开启");
        }
      },
    },
  },
};
</script>
