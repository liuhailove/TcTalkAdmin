import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import {Pages} from "@/router/pages.ts";

// 固定路由
export const ConstantRouterMap = [
    // 登录注册页
    {
        path: '/login',
        name: Pages.login,
        component: () => import("@/views/login/Index.vue"),
        hidden: true,
    },
    // not found
    {
        path: '/404',
        name: Pages.notFound,
        component: () => import("@/views/404.vue"),
        hidden: true,
    },
    {
        path: '',
        redirect: '/home',
        component: () => import("@/views/layout/Layout.vue"),
        meta: {title: '首页', icon: 'home'},
        hidden: false,
        children: [
            {
                path: 'home',
                name: Pages.home,
                component: () => import("@/views/home/Index.vue"),
                meta: {title: '仪表盘', icon: 'dashboard'},
                hidden: false,
            },
            {
                name: 'document',
                path: 'https://github.com/liuhailove/gmiter',
                meta: {title: '学习教程', icon: 'document'}
            },
            {
                name: 'video',
                path: 'https://github.com/liuhailove/gmiter',
                meta: {title: '视频教程', icon: 'video'}
            },
        ]
    }
];

// 动态路由
export const AsyncRouterMap = [
    {
        path: '/ums',
        component: () => import("@/views/layout/Layout.vue"),
        redirect: '/ums/admin',
        name: Pages.ums,
        meta: {title: '权限', icon: 'ums'},
        children: [
            {
                path: 'admin',
                name: Pages.admin,
                component: () => import('@/views/ums/admin/Index.vue'),
                meta: {title: '用户列表', icon: 'ums-admin'}
            },
            {
                path: 'role',
                name: Pages.role,
                component: () => import('@/views/ums/role/Index.vue'),
                meta: {title: '角色列表', icon: 'ums-role'}
            },
            {
                path: 'allocMenu',
                name: Pages.allocMenu,
                component: () => import('@/views/ums/role/AllocMenu.vue'),
                meta: {title: '分配菜单'},
                hidden: true
            },
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: ConstantRouterMap as RouteRecordRaw[]
});

export default router;