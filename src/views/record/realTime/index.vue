<template></template>
<script>
export default {
  data() {
    return {
      shopId: "",
    };
  },
  created() {
    // 页面创建生命周期函数
    this.initWebSocket();
  },
  destroyed() {
    // 离开页面生命周期函数
    this.websocketclose();
  },
  methods: {
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
      console.log(`Get Message: ${e.data}`);
    },
    websocketclose() {
      console.log(`connection closed`);
    },
  },
};
</script>
