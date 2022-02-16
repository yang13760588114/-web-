import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/user",
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/user/index"),
        meta: { title: "用户信息", icon: "el-icon-user" },
      },
    ],
  },
  {
    path: "/fish",
    component: Layout,
    redirect: "/fish/node",
    meta: { title: "鱼缸信息", icon: "el-icon-wallet" },
    children: [
      {
        path: "/fish/node",
        name: "FishNode",
        component: () => import("@/views/fish/fishNode/index"),
        meta: { title: "鱼缸信息", icon: "el-icon-takeaway-box" },
      },
      {
        path: "/fish/info",
        name: "FishInfo",
        component: () => import("@/views/fish/fishInfo/index"),
        meta: { title: "养鱼信息", icon: "yu2" },
      },
    ],
  },
  {
    path: "/record",
    component: Layout,
    meta: { title: "记录数据", icon: "el-icon-data-line" },
    children: [
      {
        path: "/record/realTime",
        name: "RealTimeRecord",
        component: () => import("@/views/record/realTime/index"),
        meta: { title: "实时记录", icon: "el-icon-view" },
      },
      {
        path: "/record/history",
        name: "HistoryRecord",
        component: () => import("@/views/record/history/index"),
        meta: { title: "历史记录", icon: "el-icon-receiving" },
      },
    ],
  },
  {
    path: "/command",
    component: Layout,
    redirect: "/command/history",
    name: "Command",
    meta: { title: "控制命令", icon: "nested" },
    children: [
      {
        path: "/command/history",
        component: () => import("@/views/command/history/index"),
        name: "CommandRecord",
        meta: { title: "历史命令", icon: "el-icon-s-unfold" },
      },
      {
        path: "/command/send",
        component: () => import("@/views/command/detail/index"),
        name: "CommandSend",
        meta: { title: "发送命令", icon: "el-icon-phone-outline" },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
