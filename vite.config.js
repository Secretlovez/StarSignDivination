import fs from 'fs';
import path from 'path';
import { version } from './package.json';
import { defineConfig, loadEnv } from 'vite';

import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
// import ViteLegacy from '@vitejs/plugin-legacy';
import ViteESlint from 'vite-plugin-eslint';
// import VitePrettier from 'vite-plugin-prettier';
import { visualizer } from 'rollup-plugin-visualizer';

import AutoImport from 'unplugin-auto-import/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import VueMacros from 'unplugin-vue-macros/vite';
import VueComponents from 'unplugin-vue-components/vite';
import VueSetupExtend from 'unplugin-vue-setup-extend-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const resolvePath = (dir) => path.resolve(__dirname, '.', dir);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  // 排除重载依赖项,解决优化依赖变化重载导致开发环境不断刷新问题
  const optimizeDepsIncludes = ['element-plus/es'];
  fs.readdirSync('node_modules/element-plus/es/components').map((dirname) => {
    fs.access(`node_modules/element-plus/es/components/${dirname}/style/css.mjs`, (err) => {
      if (!err) {
        optimizeDepsIncludes.push(`element-plus/es/components/${dirname}/style/css`);
      }
    });
    fs.access(`node_modules/element-plus/es/components/${dirname}/style/index.mjs`, (err) => {
      if (!err) {
        optimizeDepsIncludes.push(`element-plus/es/components/${dirname}/style/index`);
      }
    });
  });
  const plugins = [
    visualizer(),
    AutoImport({
      dts: './auto-imports.d.ts',
      imports: ['vue', 'vue/macros', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json', // 生成json文件
        globalsPropValue: true,
      },
    }),
    ElementPlus({ useSource: true }),
    VueMacros({
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx(),
      },
    }),
    VueSetupExtend({}),
    VueComponents({
      directoryAsNamespace: true, // 解决文件名冲突
      resolvers: [ElementPlusResolver()],
    }),
    ViteESlint({
      cache: false,
      include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.jsx'],
    }),
  ];
  return {
    base: env.VITE_BASE_URL,
    appType: 'spa',
    cacheDir: 'node_modules/.vite',
    clearScreen: true,
    envDir: 'root',
    envPrefix: 'VITE_',
    logLevel: 'info',
    publicDir: 'public',
    plugins: plugins,
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      'import.meta.env.__APP_VERSION__': JSON.stringify(version),
    },
    css: {
      devSourcemap: false,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          javascriptEnabled: true,
        },
      },
    },
    json: {
      namedExports: true,
      stringify: false,
    },
    worker: {
      format: 'es',
    },
    optimizeDeps: {
      include: optimizeDepsIncludes,
    },
    resolve: {
      alias: {
        '@': resolvePath('src'),
        '~': resolvePath('public'),
      },
      conditions: [],
      dedupe: [],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
      preserveSymlinks: false,
    },
    server: {
      cors: true,
      host: '0.0.0.0',
      open: false,
      port: 8000,
      proxy: {
        '/baseUrl': {
          target: `https://${env.VITE_BASE_IP}:8443`,
          ws: true,
          secure: false,
          changeOrigin: true,
          rewrite: (url) => url.replace(/^\/baseUrl/, ''),
        },
        '/wsUrl': {
          target: `wss://${env.VITE_BASE_IP}:8443/ws`,
          ws: true,
          changeOrigin: true,
          rewrite: (url) => url.replace(/^\/wsUrl/, ''),
        },
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
});
