<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import AnimationRouter from '@/views/layout/components/AnimationRouter.vue';
import type { containerType, shadow_containerType } from './utils/webgpuType';
const state = reactive({ canRender: false });
const container = reactive<shadow_containerType>({
  canvas:null,
  ctx:null,
  adapter:null,
  device:null
});
const _canvas = ref<HTMLCanvasElement | null>(null);
const _ctx = ref<GPUCanvasContext | null>(null);
//监听canvas的size变化
const obsSize = new ResizeObserver((entries) => {
  if (_canvas.value) {
    _canvas.value.width = entries[0].contentRect.width;
    _canvas.value.height = entries[0].contentRect.height;
  }
});
onMounted(async () => {
  if (_canvas.value) {
    obsSize.observe(_canvas.value);
    _ctx.value = _canvas.value.getContext('webgpu');
    const adapter = await navigator.gpu.requestAdapter();
    if (adapter&&_ctx.value) {
      const device = await adapter?.requestDevice();
      const format = navigator.gpu.getPreferredCanvasFormat();
      _ctx.value?.configure({
        device,
        format
      });
      container.adapter = adapter;
      container.device = device;
      container.ctx = _ctx.value;
      container.canvas = _canvas.value;
      state.canRender = true;
      console.log('webgpu支持');
    } else {
      console.log('不支持webgpu');
    }
  }
});

defineExpose({

});
</script>
<template>
  <div class="box">
    <canvas ref="_canvas"></canvas>
    <AnimationRouter v-if="state.canRender" :container="container"></AnimationRouter>
  </div>
</template>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
./utils/webgpuType