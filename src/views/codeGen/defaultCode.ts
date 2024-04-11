export const vueCode = `
<script setup lang="ts">
</script>
<template>
  <el-button>我是 ElButton</el-button>
</template>
<style scoped>
</style>
`;
export const vueCode1 = `
<script setup lang="ts">
</script>
<template>
  <el-button>我是 ElButton1</el-button>
</template>
<style scoped>
</style>
`;
export const mainCode = `
import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
const app = createApp(App);
app.use(ElementPlus, { size: 'large' });
app.mount('#app');
`;
export const mainCode1 = `
import { createApp } from 'vue';
import App from './App1.vue';
import ElementPlus from 'element-plus';
const app = createApp(App);
app.use(ElementPlus, { size: 'large' });
app.mount('#app');
`;
export const config = `
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "jsx": "Preserve",
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true
  },
  "vueCompilerOptions": {
    "target": 3.4
  }
}
`;
export const importMap = `
{
    "imports": {
      "vue": "https://cdn.jsdelivr.net/npm/@vue/runtime-dom@3.4.21/dist/runtime-dom.esm-browser.js",
      "vue/server-renderer": "https://cdn.jsdelivr.net/npm/@vue/server-renderer@3.4.21/dist/server-renderer.esm-browser.js",
      "vue-router": "https://cdn.jsdelivr.net/npm/vue-router@4.0.12/dist/vue-router.esm-browser.js",
      "element-plus": "https://cdn.jsdelivr.net/npm/element-plus@2.6/dist/index.full.mjs"
    },
    "scopes": {}
  }
  `;
