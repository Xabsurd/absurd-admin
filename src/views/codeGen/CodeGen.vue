<script setup lang="ts">
import { reactive, defineProps, ref } from 'vue';
import DataStructure from './DataStructure.vue';
import CodeViewer from './CodeViewer.vue';
import CodeGeneration, { GenerationType } from '@/utils/codeGeneration/codeGeneration';
const CodeViewerRef = ref<InstanceType<typeof CodeViewer>>();
const state = reactive({
  codeViewerVisible: false
});
const props = defineProps<{
  type?: string;
}>();
const codeGeneration = new CodeGeneration();
function handleGenerateCode(fieldList: FieldType[]) {
  state.codeViewerVisible = true;
  const code = codeGeneration.generationTemplateByJson(fieldList, GenerationType.vue);
  console.log(code);
  if (code) {
    CodeViewerRef.value?.changeCode(code);
  }
}
</script>
<template>
  <div id="CodeGen">
    <CodeViewer v-show="state.codeViewerVisible" ref="CodeViewerRef"></CodeViewer>
    <DataStructure v-show="!state.codeViewerVisible" @generate="handleGenerateCode"></DataStructure>
    <el-tooltip content="关闭代码预览" placement="top" v-if="state.codeViewerVisible">
      <i class="close-CodeViewer iconfont icon-guanbi" @click="state.codeViewerVisible = false"></i>
    </el-tooltip>
  </div>
</template>
<style scoped lang="scss">
#CodeGen {
  width: 100%;
  height: 100%;
  .close-CodeViewer {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    padding: 0.5rem;
    font-size: 1.5rem;
    color: var(--el-color-primary);
    &:hover {
      color: var(--el-color-primary-light-3);
    }
  }
}
</style>
