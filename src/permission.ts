import router from "./router";
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';  // Progress 进度条样式
import { ElMessage } from 'element-plus';
import { getToken } from "./api/auth.ts";
import { useGetInfo } from "./api/login.ts";
import { setActivePinia } from "pinia";
import { useUserStore } from "./store/user_store.ts";      // Pinia Store
import { usePermissionStore } from "./store/permission_store.ts"; // Permission Store

const whiteList = ['/login']; // 不重定向白名单

export default function initPermission(pinia) {
    // 确保 pinia 被传入并设置为激活状态
    setActivePinia(pinia);

    // 拉取用户信息的逻辑
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();

    router.beforeEach(async (to, _, next) => {
        NProgress.start();

        if (getToken()) {
            // 用户已登录，检查是否去登录页
            if (to.path === '/login') {
                next({ path: '/' });
                NProgress.done();
            } else if (userStore.roles.length === 0) {
                // 若角色未加载，则拉取用户信息
                try {
                    const res = await useGetInfo();
                    const { menus } = res.data;

                    // 根据返回的菜单生成路由
                    await permissionStore.generateRoutes(menus);

                    // 动态添加可访问的路由表
                    permissionStore.addRouters.forEach(route => {
                        router.addRoute(route);
                    });

                    // 通过 replace 导航确保不会再执行一次 beforeEach
                    next({ ...to, replace: true });
                } catch (error) {
                    await userStore.fedLogout();
                    ElMessage.error(error || '校验失败，请重新登入');
                    next({ path: '/login' });
                }
            } else {
                next(); // 直接放行
            }
        } else {
            // 若用户未登录且访问非白名单页面，则重定向到登录页
            if (whiteList.indexOf(to.path) !== -1) {
                next();
            } else {
                next('/login');
                NProgress.done();
            }
        }
    });

    router.afterEach(() => {
        NProgress.done();
    });
}
