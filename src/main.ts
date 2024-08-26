import {createApp} from 'vue';

import router from './router';
import App from "./App.vue"; // lang i18n

import 'normalize.css/normalize.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 使用 es 目录导入语言包
import locale from 'element-plus/es/locale/lang/zh-cn';

const app = createApp(App);
app.use(ElementPlus,{locale});
app.use(router);
app.mount('#app')


