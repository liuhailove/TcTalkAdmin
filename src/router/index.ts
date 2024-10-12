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
            {
                path: 'allocResource',
                name: Pages.allocResource,
                component: () => import('@/views/ums/role/AllocResource.vue'),
                meta: {title: '分配资源'},
                hidden: true
            },
            {
                path: 'menu',
                name: Pages.menu,
                component: () => import("@/views/ums/menu/Index.vue"),
                meta: {title: '菜单列表', icon: 'ums-menu'},
            },
            {
                path: 'addMenu',
                name: Pages.addMenu,
                component: () => import("@/views/ums/menu/Add.vue"),
                meta: {title: '添加菜单'},
                hidden: true
            },
            {
                path: 'updateMenu',
                name: Pages.updateMenu,
                component: () => import("@/views/ums/menu/Update.vue"),
                meta: {title: '修改菜单'},
                hidden: true
            },
            {
                path: 'resource',
                name: Pages.resource,
                component: () => import("@/views/ums/resource/Index.vue"),
                meta: {title: '资源列表', icon: 'ums-resource'},
            },
            {
                path: 'resourceCategory',
                name: Pages.resourceCategory,
                component: () => import('@/views/ums/resource/CategoryList.vue'),
                meta: {title: '资源分类'},
                hidden: true
            }
        ]
    },
    {
        path: '/sms',
        component: () => import("@/views/layout/Layout.vue"),
        redirect: '/sms/coupon',
        name: 'sms',
        meta: {title: '营销', icon: 'sms'},
        children: [
            {
                path: 'advertise',
                name: Pages.homeAdvertise,
                component: () => import('@/views/sms/advertise/Index.vue'),
                meta: {title: '广告列表', icon: 'sms-ad'}
            },
            {
                path: 'flash',
                name: 'flash',
                component: () => import('@/views/sms/advertise/Index.vue'),
                meta: {title: '秒杀活动', icon: 'sms-ad'}
            },
            {
                path: 'addAdvertise',
                name: Pages.addHomeAdvertise,
                component: () => import('@/views/sms/advertise/Add.vue'),
                meta: {title: '添加广告'},
                hidden: true
            },
        ]
    },
    {
        path: '/advertise',
        component: () => import("@/views/layout/Layout.vue"),
        redirect: '/advertise/channel',
        name: 'advertise',
        meta: {title: '广告', icon: 'advertise'},
        children: [
            {
                path: 'channel',
                name: Pages.adsChannel,
                component: () => import('@/views/advertise/channel/Index.vue'),
                meta: {title: '广告渠道', icon: 'advertise-channel'},
            },
            {
                path: 'adsList',
                name: Pages.adsList,
                component: () => import('@/views/advertise/ad/Index.vue'),
                meta: {title: '广告列表', icon: 'advertise-channel'},
            },
            {
                path: 'addAds',
                name: Pages.addAds,
                component: () => import('@/views/advertise/ad/Add.vue'),
                meta: {title: '新增广告', icon: 'advertise-channel'},
                hidden: true
            },
            {
                path: 'adsSlot',
                name: Pages.adsSlot,
                component: () => import('@/views/advertise/slot/Index.vue'),
                meta: {title: '广告槽位', icon: 'advertise-channel'},
            },
            {
                path: 'addSlot',
                name: Pages.addSlot,
                component: () => import('@/views/advertise/slot/Edit.vue'),
                meta: {title: '新增槽位', icon: 'advertise-channel'},
                hidden: true
            },
            {
                path: 'editSlot',
                name: Pages.editSlot,
                component: () => import('@/views/advertise/slot/Edit.vue'),
                meta: {title: '编辑槽位', icon: 'advertise-channel'},
                hidden: true
            },
            {
                path: 'adsTemplate',
                name: Pages.adsTemplate,
                component: () => import('@/views/advertise/template/Index.vue'),
                meta: {title: '广告模版', icon: 'advertise-channel'},
            },
            {
                path: 'addTemplate',
                name: Pages.addTemplate,
                component: () => import('@/views/advertise/template/Edit.vue'),
                meta: {title: '添加广告模版', icon: 'advertise-channel'},
                hidden: true
            },
            {
                path: 'editTemplate',
                name: Pages.editTemplate,
                component: () => import('@/views/advertise/template/Edit.vue'),
                meta: {title: '编辑广告模版', icon: 'advertise-channel'},
                hidden: true
            },
            {
                path: 'adsPut',
                name: Pages.adsPut,
                component: () => import('@/views/advertise/channel/Index.vue'),
                meta: {title: '广告模版', icon: 'advertise-channel'},
            },
            {
                path: 'adsSizeType',
                name: Pages.adsSizeType,
                component: () => import('@/views/advertise/sizeType/Index.vue'),
                meta: {title: '尺寸类型', icon: 'advertise-channel'},
            },
            {
                path: 'adsShowLog',
                name: Pages.adsShowLog,
                component: () => import('@/views/advertise/channel/Index.vue'),
                meta: {title: '展示日志', icon: 'advertise-channel'},
            },
        ]
    },
    {
        path: '/ct',
        component: () => import("@/views/layout/Layout.vue"),
        redirect: '/ct/channel',
        name: 'ct',
        meta: {title: '品类', icon: 'category'},
        children: [
            {
                path: 'ctChannel',
                name: Pages.ctChannel,
                component: () => import('@/views/category/channel/Index.vue'),
                meta: {title: '频道列表', icon: 'channel'},
            },
            {
                path: 'ctChannel',
                name: Pages.ctCategory,
                component: () => import('@/views/category/category/Index.vue'),
                meta: {title: '品类列表', icon: 'category'},
            },
        ]
    },
    {
        path: '/marketing',
        component: () => import("@/views/layout/Layout.vue"),
        redirect: '/marketing/home/advertise/list',
        name: 'marketing',
        meta: {title: '营销', icon: 'marketing'},
        children: [
            {
                path: 'home/advertise/list',
                name: Pages.marketChannelHomeAdvertise,
                component: () => import('@/views/mms/advertise/Index.vue'),
                meta: {title: '广告列表', icon: 'channel'},
            },
            {
                path: 'home/advertise/add',
                name: Pages.marketChannelHomeAdvertiseAdd,
                component: () =>import('@/views/mms/advertise/Add.vue'),
                meta: {title: '添加广告'},
                hidden: true
            },
            {
                path: 'home/advertise/update',
                name: Pages.marketChannelHomeAdvertiseUpdate,
                component: () =>import('@/views/mms/advertise/Update.vue'),
                meta: {title: '修改广告'},
                hidden: true
            },
            {
                path: 'home/new/list',
                name: Pages.marketNew,
                component: () => import('@/views/mms/advertise/Index.vue'),
                meta: {title: '新品推荐', icon: 'new'},
            },
            {
                path: 'home/hot/list',
                name: Pages.marketHot,
                component: () => import('@/views/mms/advertise/Index.vue'),
                meta: {title: '人气推荐', icon: 'hot'},
            },
            {
                path: 'home/flash/list',
                name: Pages.marketFlash,
                component: () => import('@/views/mms/flash/Index.vue'),
                meta: {title: '秒杀活动列表', icon: 'flash'},
            },
            {
                path: 'flash/promotion/add',
                name: Pages.marketFlashAdd,
                component: () =>import('@/views/mms/flash/Add.vue'),
                meta: {title: '添加秒杀活动'},
                hidden: true
            },
            {
                path: 'flash/promotion/update',
                name: Pages.marketFlashUpdate,
                component: () =>import('@/views/mms/flash/Update.vue'),
                meta: {title: '修改秒杀活动'},
                hidden: true
            },
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: ConstantRouterMap as RouteRecordRaw[]
});

export default router;