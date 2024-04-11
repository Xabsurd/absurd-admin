<script setup lang="ts">
import { Repl, useStore, File, useVueImportMap } from '@vue/repl';
import Monaco from '@vue/repl/monaco-editor';
import { vueCode, vueCode1, config, importMap, mainCode, mainCode1 } from './defaultCode';
defineExpose({ changeCode });
const {
  importMap: builtinImportMap,
  vueVersion,
  productionMode
} = useVueImportMap({
  runtimeDev: 'cdn link to vue.runtime.esm-browser.js',
  runtimeProd: 'cdn link to vue.runtime.esm-browser.prod.js',
  serverRenderer: 'cdn link to server-renderer.esm-browser.js'
});
const store = useStore({ builtinImportMap, vueVersion });
vueVersion.value = '3.4.21';
productionMode.value = true;

const previewOptions = {
  headHTML: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus@2.6/dist/index.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus@2.6/theme-chalk/dark/css-vars.css">`,
  customCode: {
    importCode:
      'import ElementPlus from "https://cdn.jsdelivr.net/npm/element-plus@2.6/dist/index.full.mjs";',
    useCode: 'app.use(ElementPlus, { size: "large" });'
  }
};

store.setFiles({
  'App.vue': vueCode,
  'tsconfig.json': config
});
// store.setFiles(
//   {
//     'App.vue': vueCode,
//     'Form.vue': vueCode,
//     'tsconfig.json': config,
//     'import-map.json': importMap,
//     'main.ts': mainCode,
//     'index.html': mainCode1
//   },
//   'main.ts'
// );
function changeCode(code: string) {
  store.setFiles({
    'App.vue': code
  });
}
</script>
<template>
  <Repl
    :editor="Monaco"
    :theme="'dark'"
    :store="store"
    :clear-console="false"
    :previewOptions="previewOptions"
    :previewTheme="true"
  />
</template>
<style scoped></style>
