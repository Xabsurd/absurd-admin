<script setup lang="ts">
import AnimationRouter from '@/views/layout/components/AnimationRouter.vue';
import { onMounted, provide, reactive, ref } from 'vue';
const state = reactive({
  loaded:false
});

import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { cesium_token } from '@/utils/config';
const cesiumContainer = ref<HTMLElement>();
// Your access token can be found at: https://ion.cesium.com/tokens.
// Replace `your_access_token` with your Cesium ion access token.
Cesium.Ion.defaultAccessToken = cesium_token;
let viewer: Cesium.Viewer;
onMounted(() => {
  if (!cesiumContainer.value) {
    return;
  }
  // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
  viewer = new Cesium.Viewer(cesiumContainer.value, {
    terrainProvider: Cesium.createWorldTerrain(),
    selectionIndicator: false,
    timeline: false,
    animation: false,
    infoBox:false
  });
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  // Add Cesium OSM Buildings, a global 3D buildings layer.
  // const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0)
    }
  });
});
function getViewer() {
  return viewer;
}
provide('getViewer', getViewer);
</script>
<template>
  <div class="cesium">
    <div class="cesiumContainer" ref="cesiumContainer"></div>
    <div class="cesiumFunction">
      <AnimationRouter></AnimationRouter>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cesium {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden !important;
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .cesiumFunction {
    pointer-events: none;
    > div {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
