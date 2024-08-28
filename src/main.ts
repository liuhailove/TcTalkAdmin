import {createApp} from 'vue';

import router from './router';
import App from "./App.vue"; // lang i18n

import 'normalize.css/normalize.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import {createPinia} from 'pinia';

import '@/styles/index.scss'; // global css

// 使用 es 目录导入语言包
import locale from 'element-plus/es/locale/lang/zh-cn';
import SvgIcon from '@/components/SvgIcon/Index.vue'; // svg组件
import "virtual:svg-icons-register";

const app = createApp(App);
app.use(ElementPlus, {locale});
app.use(createPinia());
app.use(router);

// 全局注册 SvgIcon 组件
app.component('SvgIcon', SvgIcon);
// // 使用 Vite 的 import.meta.glob 动态导入所有的 svg 文件
// const svgRequire = import.meta.glob('@/icons/svg/*.svg',);
// Object.keys(svgRequire).forEach((key) => {
//         console.info("svgRequire:" + key);
//         svgRequire[key]();
//     }
// );

app.mount('#app')


