<script setup lang="ts">
import { Repl, useStore } from '@vue/repl';
import Monaco from '@vue/repl/monaco-editor';
import { vueCode, config, importMap, mainCode } from './defaultCode';
const store = useStore({});
store.setFiles(
  {
    'App.vue': vueCode,
    'tsconfig.json': config,
    'import-map.json': importMap,
    'main.ts': mainCode
  },
  'main.ts'
);
const previewOptions = {
  headHTML:
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus@2.6/dist/index.min.css">'
};
// store.setFiales({ 'tsconfig.json': config });
</script>
<template>
  <Repl
    :editor="Monaco"
    :theme="'dark'"
    :store="store"
    :clear-console="false"
    :previewOptions="previewOptions"
  />
</template>
<style scoped>
/* @import url('https://cdn.jsdelivr.net/npm/element-plus@2.6/dist/index.min.css'); */
</style>
./defaultCode
