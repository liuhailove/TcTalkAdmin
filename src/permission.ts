import router from "./router";
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';  // Progress 进度条样式
import {ElMessage} from 'element-plus';
import {getToken} from "./api/auth.ts";
import {Pinia, setActivePinia} from "pinia";
import {useUserStore} from "./store/user_store.ts";      // Pinia Store
import {usePermissionStore} from "./store/permission_store.ts"; // Permission Store

const whiteList = ['/login']; // 不重定向白名单

export default function initPermission(pinia: Pinia) {
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
                // 如果已经登录，并且是去登录页，重定向到首页
                next({path: '/'});
                NProgress.done();
            } else if (userStore.roles.length === 0) {
                try {
                    // 若角色未加载，则拉取用户信息
                    const data = await userStore.getInfo();
                    let menus = data.menus;
                    // 根据返回的菜单生成路由
                    permissionStore.generateRoutes(menus);
                    // 动态添加可访问的路由表
                    permissionStore.addRouters.forEach(route => {
                        router.addRoute(route);
                    });
                    // 通过 replace 导航避免再次执行 beforeEach
                    next({...to, replace: true});
                } catch (error) {
                    await userStore.fedLogout();
                    ElMessage.error(error || '校验失败，请重新登入');
                    next({path: '/login'});
                }
            } else {
                // 用户已登录且角色已加载，直接放行
                next();
            }
        } else {
            // 若用户未登录且访问非白名单页面，则重定向到登录页
            if (whiteList.indexOf(to.path) !== -1) {
                next();
            } else {
                // 不在白名单，重定向到登录页
                next('/login');
                NProgress.done();
            }
        }
    });

    router.afterEach(() => {
        NProgress.done();
    });
}
