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
import initPermission from '@/permission' ;
// 导入 ECharts 和 vue-echarts 组件
import ECharts from 'vue-echarts';
import { use } from 'echarts/core';

// 按需导入 ECharts 模块
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';

// 使用 ECharts 模块
use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent]);

const app = createApp(App);
app.use(ElementPlus, {locale});
const pinia = createPinia();

app.use(pinia);
initPermission(pinia);
app.use(router);
// 全局注册 ECharts 组件
app.component('v-chart', ECharts);
// 全局注册 SvgIcon 组件
app.component('SvgIcon', SvgIcon);
// // 使用 Vite 的 import.meta.glob 动态导入所有的 svg 文件
// const svgRequire = import.meta.glob('@/icons/svg/*.svg',);
// Object.keys(svgRequire).forEach((key) => {
//         console.info("svgRequire:" + key);
//         svgRequire[key]();
//     }
// );
// 权限控制
app.mount('#app')


