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
    path: "/updatePwd",
    component: () => import("@/views/updatePwd/index"),
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
        noCache: true,
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
        meta: {
          title: "鱼缸信息",
          icon: "el-icon-takeaway-box",
          noCache: true,
        },
      },
      {
        path: "/fish/info",
        name: "FishInfo",
        component: () => import("@/views/fish/fishInfo/index"),
        meta: { title: "养鱼信息", icon: "yu2", noCache: true },
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
        meta: { title: "实时记录", icon: "el-icon-view", noCache: true },
      },
      {
        path: "/record/history",
        name: "HistoryRecord",
        component: () => import("@/views/record/history/index"),
        meta: { title: "历史记录", icon: "el-icon-receiving", noCache: true },
      },
    ],
  },
  {
    path: "/command",
    component: Layout,
    redirect: "/command/record",
    name: "Command",
    meta: { title: "控制命令", icon: "nested" },
    children: [
      {
        path: "/command/record",
        name: "CommandRecord",
        component: () => import("@/views/command/index"),
        meta: { title: "控制命令", icon: "el-icon-receiving", noCache: true },
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
