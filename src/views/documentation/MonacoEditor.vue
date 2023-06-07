<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { MainStore } from '@/store';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
  createTrustedTypesPolicy(policyName: string) {
    return { name: policyName };
  }
};
let instance;
const editorRef = ref<HTMLElement>();
const mainState = MainStore();
onMounted(() => {
  if (editorRef.value) {
    instance = monaco.editor.create(editorRef.value, {
      value: 'var a=100;',
      language: 'javascript',
      theme: mainState.theme === 'dark' ? 'vs-dark' : ''
    });
  }
});
</script>
<template>
  <div class="monaco-edit" ref="editorRef"></div>
</template>
<style scoped lang="scss"></style>
