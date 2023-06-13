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
function drawPolyline() {
  drawer.DrawPolyline().then((points: Cesium.Cartesian3[]) => {
    console.log(points);
  });
}
function drawPolygon(){
  drawer.DrawPolygon().then((points: Cesium.Cartesian3[]) => {
    console.log(points);
  });
}
function clearDraw(){
  drawer.clearDraw();
}
</script>
<template>
  <div class="measurement">
    <to-header>
      <el-button type="primary" @click="drawPolyline">直线测量</el-button>
      <el-button type="primary" @click="drawPolygon">面积测量</el-button>
      <el-button type="primary" @click="clearDraw">清除</el-button>
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
