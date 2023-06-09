<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { editor } from 'monaco-editor';
// import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { MainStore } from '@/store';
const state = reactive({
  value: '',
  options: [
    'javascript',
    'typescript',
    'json',
    'css',
    'scss',
    'less',
    'html',
    'handlebars',
    'razor'
  ],
  language: 'javascript'
});
self.MonacoEnvironment = {
  async getWorker(_, label) {
    if (label === 'json') {
      const jsonWorker = await import('monaco-editor/esm/vs/language/json/json.worker?worker');
      return new jsonWorker.default();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      const cssWorker = await import('monaco-editor/esm/vs/language/css/css.worker?worker');
      return new cssWorker.default();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      const htmlWorker = await import('monaco-editor/esm/vs/language/html/html.worker?worker');
      return new htmlWorker.default();
    }
    if (label === 'typescript' || label === 'javascript') {
      const tsWorker = await import('monaco-editor/esm/vs/language/typescript/ts.worker?worker');
      return new tsWorker.default();
    }
    const editorWorker = await import('monaco-editor/esm/vs/editor/editor.worker?worker');
    return new editorWorker.default();
  },
  createTrustedTypesPolicy(policyName: string) {
    return { name: policyName };
  }
};
let instance: editor.IStandaloneCodeEditor;
const editorRef = ref<HTMLElement>();
const mainState = MainStore();
onMounted(() => {
  if (editorRef.value) {
    instance = editor.create(editorRef.value, {
      value: 'var a=100;',
      language: state.language,
      theme: mainState.theme === 'dark' ? 'vs-dark' : ''
    });
  }
});
function HandleChange() {
  const model = instance.getModel();
  if (model) {
    editor.setModelLanguage(model, state.language);
  }
}
</script>
<template>
  <div>
    <to-header>
      <el-select v-model="state.language" clearable filterable @change="HandleChange">
        <el-option v-for="item in state.options" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </to-header>
    <div class="monaco-edit" ref="editorRef"></div>
  </div>
</template>
<style scoped lang="scss">
.monaco-edit {
  width: 100%;
  height: 100%;
}
</style>
