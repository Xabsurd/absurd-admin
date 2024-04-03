<script setup lang="ts">
import { ref } from 'vue';

import { Repl, useStore } from '@vue/repl';
import Monaco from '@vue/repl/monaco-editor';
import { code, config, imap, maincode } from './code';
const store = useStore({});
store.setFiles(
  {
    'App.vue': code,
    'tsconfig.json': config,
    'import-map.json': imap,
    'main.ts': maincode
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
