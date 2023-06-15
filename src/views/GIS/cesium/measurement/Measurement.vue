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
      const orangePolygon = viewer.entities.add({
        name: 'Orange polygon with per-position heights and outline',
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
            -108.0, 25.0, 100000, -100.0, 25.0, 100000, -100.0, 30.0, 100000, -108.0, 30.0, 300000
          ]),
          extrudedHeight: 0,
          perPositionHeight: true,
          material: Cesium.Color.ORANGE.withAlpha(0.5),
          outline: true,
          outlineColor: Cesium.Color.BLACK
        }
      });
    }
  });
});
function drawPolyline() {
  drawer.drawPolyline().then((points: Cesium.Cartesian3[]) => {
    console.log(points);
  });
}
function drawPolygon() {
  drawer.drawPolygon().then((points: Cesium.Cartesian3[]) => {
    console.log(points);
  });
}
function clearDraw() {
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
