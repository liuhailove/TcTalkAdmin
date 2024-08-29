import {createRouter, createWebHashHistory} from "vue-router";
import {Pages} from "@/router/pages.ts";


// 固定路由
export const ConstantRouterMap = [
    // 登录注册页
    {
        path: '/login',
        name: Pages.login,
        component: () => import("@/views/login/Index.vue"),

    },
    // not found
    {
        path: '/404',
        name: Pages.notFound,
        component: () => import("@/views/404.vue"),
    },
    {
        path: '/',
        name: Pages.home,
        component: () => import("@/views/Index.vue"),
    }
];

// 动态路由
export const AsyncRouterMap = [];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: ConstantRouterMap,
});

export default router;