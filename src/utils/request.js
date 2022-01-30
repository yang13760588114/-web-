import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

const error = "ERROR!";

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["token"] = getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 接口响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 只有 code == 200 是正确的, 其他都是错误的
    if (res.code !== 200) {
      Message({
        message: res.message || error,
        type: "error",
        duration: 1000,
      });
      return Promise.reject(new Error(res.message || error));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
