import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/", // 基本URL路径
    redirect: "/GZhome", // 重定向到默认路由
  },
  {
    path: "/GZhome", // 定义路由路径，包括基本URL路径
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/PayPage", // 定义路由路径，包括基本URL路径
    component: () => import("../views/PayPage.vue"),
    // redirect: "/PayPage", // 重定向到指定路由
  },
  {
    path: "/GamePage", // 定义路由路径，包括基本URL路径
    component: () => import("../views/GamePage.vue"),
  },
  {
    path: "/MyBag", // 定义路由路径，包括基本URL路径
    name: 'MyBag',
    component: () => import("../views/MyBag.vue"),
  },
  {
    path: "/SharePage", // 定义路由路径，包括基本URL路径
    component: () => import("../views/SharePage.vue"),
  },
  {
    path: "/DataShow", // 定义路由路径，包括基本URL路径
    component: () => import("../views/DataShow.vue"),
  },

];

const router = createRouter({
  // history: createWebHistory("/frontend/"), 
  history: createWebHashHistory(), 
  routes,
});

export default router;
