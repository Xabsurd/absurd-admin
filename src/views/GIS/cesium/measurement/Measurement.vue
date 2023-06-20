<script setup lang="ts">
import { inject, onMounted, reactive, ref, nextTick } from 'vue';
import customDraw from '../utils/customDraw';
import type { Viewer, Cartesian3 } from 'cesium';
import Popup, { type PopupRef } from '../components/Popup.vue';
const popupRef = ref<PopupRef>();
const viewer = inject('viewer') as Viewer;
let drawer: customDraw = new customDraw(viewer);
onMounted(() => {});
function drawPolyline() {
  drawer.drawPolyline().then((points: Cartesian3[]) => {
    console.log(points);
  });
}
function drawPolygon() {
  drawer.drawPolygon().then((points: Cartesian3[]) => {
    console.log(points);
  });
}
function drawPoint() {
  drawer.drawPoint().then((point: Cartesian3) => {
    popupRef.value?.openPopup({ point:point });
  });
}
function clearDraw() {
  drawer.clearDraw();
}
</script>
<template>
  <div class="measurement">
    <Popup ref="popupRef">
      <template #header> 测量 </template>
      <div>body</div>
    </Popup>
    <to-header>
      <el-button type="primary" @click="drawPoint">坐标拾取</el-button>
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
