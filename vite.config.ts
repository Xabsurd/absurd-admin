import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import cesium from 'vite-plugin-cesium'; // 引入插件
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),cesium()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port:16666
  }
});
