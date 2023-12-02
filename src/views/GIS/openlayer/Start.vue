<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import { OSM, Vector as VectorSource } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { Vector as VectorLayer } from 'ol/layer';
import { GeoJSON } from 'ol/format';
const state = reactive({});
let map: Map;
const mapRef = ref(null);
function initMap() {
  if (mapRef.value) {
    var vectorSource = new VectorSource({
      url: './assets/geojson/output_zoom.geojson',
      format: new GeoJSON(),
      projection: 'EPSG:3857'
    });

    var vectorLayer = new VectorLayer({
      source: vectorSource
    });
    map = new Map({
      layers: [
        // new TileLayer({
        //   source: new OSM()
        // }),
        vectorLayer
      ],
      target: mapRef.value,
      view: new View({
        center: [0, 0],
        projection: 'EPSG:3857',
        zoom: 2
      })
    });
  }

  console.log('init finished');
}
onMounted(() => {
  initMap();
});
</script>
<template>
  <div class="mapbox">
    <div class="map" ref="mapRef"></div>
  </div>
</template>
<style scoped lang="scss">
.mapbox {
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
