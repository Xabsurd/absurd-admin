<script setup lang="ts">
import { inject, onMounted, reactive, ref, nextTick } from 'vue';
import customDraw from '../utils/customDraw';
import * as Cesium from 'cesium';
const getViewer = inject<() => Cesium.Viewer>('getViewer');
let viewer: Cesium.Viewer;
let drawer: customDraw;
onMounted(() => {
  nextTick(() => {
    if (getViewer) {
      viewer = getViewer();
      console.log(viewer);
      drawer = new customDraw(viewer);
    }
  });
});
// const draw = new customDraw();
// const state = reactive({});
function lineDraw() {
  drawer.Draw().then((points: Cesium.Cartesian3[]) => {
    console.log(points);
  });
}
</script>
<template>
  <div class="measurement">
    <to-header>
      <el-button type="primary" @click="lineDraw">直线测量</el-button>
    </to-header>
    测量
  </div>
</template>
<style scoped lang="scss">
.button-box {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
