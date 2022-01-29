import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
    children: [
      {
        path: "/fish/node",
        name: "FishNode",
        component: () => import("@/views/fishNode/index"),
        meta: { title: "鱼缸信息", icon: "el-icon-takeaway-box" },
      },
      {
        path: "/fish/info",
        name: "FishInfo",
        component: () => import("@/views/fish/index"),
        meta: { title: "养鱼信息", icon: "el-icon-view" },
      },
    ],
  },
  {
    path: "/record",
    component: Layout,
    children: [
      {
        path: "/record/history",
        name: "Record",
        component: () => import("@/views/record/index"),
        meta: { title: "监控记录", icon: "el-icon-s-management" },
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

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
