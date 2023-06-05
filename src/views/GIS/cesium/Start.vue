<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
const state = reactive({});

import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { cesium_token } from '@/utils/config';
const cesiumContainer = ref<HTMLElement>();
// Your access token can be found at: https://ion.cesium.com/tokens.
// Replace `your_access_token` with your Cesium ion access token.
Cesium.Ion.defaultAccessToken = cesium_token;
onMounted(() => {
  if (!cesiumContainer.value) {
    return;
  }
  // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
  const viewer = new Cesium.Viewer(cesiumContainer.value, {
    terrainProvider: Cesium.createWorldTerrain()
  });
  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
  // Fly the camera to San Francisco at the given longitude, latitude, and height.
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0)
    }
  });
});
</script>
<template><div class="cesiumContainer" ref="cesiumContainer"></div></template>
<style scoped lang="scss"></style>
