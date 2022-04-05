<template>
  <div>
    {{ name }}
    <el-switch v-model="flag" active-text="开" inactive-text="关" />
  </div>
</template>

<script>
import { updateStatus } from "@/api/limit";
import { getCommand } from "@/api/command";
export default {
  props: {
    name: String,
    nodeId: Number,
    obj: String,
  },
  data() {
    return {
      flag: false,
    };
  },
  watch: {
    flag: {
      handler(flag) {
        const commandRequest = {
          nodeId: this.nodeId,
          commandObj: this.obj,
          status: 0,
        };
        if (flag) {
          commandRequest.status = 1;
        }
        updateStatus(commandRequest).then((res) => {
          const val = res.result;
          setTimeout(() => {
            getCommand(val).then((res) => {
              if (res.result == 2) {
                this.$message({
                  type: "success",
                  message: "执行成功",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "控制命令执行失败，请重新执行",
                });
              }
            });
          }, 6000);
        });
      },
    },
  },
};
</script>
