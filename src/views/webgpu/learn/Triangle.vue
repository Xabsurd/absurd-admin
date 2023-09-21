<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { containerType } from '../utils/webgpuType';
const state = reactive({});
const { container } = defineProps<{ container: containerType }>();
const { canvas, ctx, adapter, device } = container;
//创建顶点数据
const vertices = new Float32Array([-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0]);
//创建顶点缓冲区
const vertexBuffer = device.createBuffer({
  size: vertices.byteLength,
  usage: GPUBufferUsage.VERTEX,
  mappedAtCreation: true
});

</script>
<template>
  <div></div>
</template>
<style scoped lang="scss"></style>
