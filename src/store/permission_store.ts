import {AsyncRouterMap, ConstantRouterMap} from '@/router/index.ts';
import {defineStore} from "pinia";
import {Menu} from "../model/menu.ts";


export const usePermissionStore = defineStore("permissionStore", {
    state: () => {
        return {
            routers: ConstantRouterMap,
            addRouters: [],
        }
    },
    getters: {},
    actions: {
        // 降序比较函数
        compare(p: string) {
            return function (m, n) {
                let a = m[p];
                let b = n[p];
                return b - a;
            }
        },
        setRoutes(routers: Array<any>) {
            this.addRouters = routers;
            this.routers = ConstantRouterMap.concat(routers);
        },
        // 根据路由名称获取菜单
        getMenu(name: string, menus: Array<Menu>): Menu {
            for (const element of menus) {
                let menu = element;
                if (name === menu.name) {
                    return menu;
                }
            }
            return null;
        },
        // 判断是否有权限访问该菜单
        hasPermission(menus: Array<Menu>, route: any) {
            if (route.name) {
                let currMenu = this.getMenu(route.name, menus);
                if (currMenu != null) {
                    // 设置菜单的标题、图标和可见性
                    if (currMenu.title != null && currMenu.title !== '') {
                        route.meta.title = currMenu.title;
                    }
                    if (currMenu.icon != null && currMenu.title !== '') {
                        route.meta.icon = currMenu.icon;
                    }
                    if (currMenu.hidden != null) {
                        route.hidden = currMenu.hidden !== 0;
                    }
                    if (currMenu.sort != null && currMenu.sort !== '') {
                        route.sort = currMenu.sort;
                    }
                    return true;
                } else {
                    route.sort = 0;
                    if (route.hidden !== undefined && route.hidden === true) {
                        route.sort = -1;
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return true;
        },
        // 对菜单进行排序
        sortRouters(accessedRouters: any) {
            for (const element of accessedRouters) {
                let router = element;
                if (router.children && router.children.length > 0) {
                    router.children.sort(this.compare("sort"));
                }
            }
            accessedRouters.sort(this.compare("sort"));
        },
        generateRoutes(menus: Array<Menu>) {
            console.info("generateRoutes");
            for (let i = 0; i < menus.length; i++) {
                console.info(menus[i].name);
            }
            const accessedRouters = AsyncRouterMap.filter(v => {
                if (this.hasPermission(menus, v)) {
                    if (v.children && v.children.length > 0) {
                        v.children = v.children.filter(child => {
                            if (this.hasPermission(menus, child)) {
                                return child
                            }
                            return false;
                        });
                        return v
                    } else {
                        return v
                    }
                }
                return false;
            });
            // 对菜单进行排序
            this.sortRouters(accessedRouters);
            this.setRoutes(accessedRouters);
        }
    }
});