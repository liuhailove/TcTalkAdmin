import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath, URL} from 'url';

import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import path from 'path';
// import {svgBuilder} from "./loader_svg";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // 指定 SVG 目录
            iconDirs: [path.resolve(process.cwd(), './src/icons/svg')],
            // 生成符号
            symbolId: '#icon-[name]',
        }),
        // svgBuilder("src/icons/svg/"),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    server: {
        port: 3005,
        proxy: {
            '/admin_api': {
                target: 'http://localhost:9000',
                changeOrigin: true,
            },
        },
    },
})
