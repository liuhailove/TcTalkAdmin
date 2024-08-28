import {createRouter, createWebHashHistory} from "vue-router";
import {Pages} from "@/router/pages.ts";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
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
        }
    ],
});

export default router;