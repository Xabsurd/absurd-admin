<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import echarts from '../echarts';
import type { ECOption, EChartsType } from '../echarts';
import { MainStore } from '@/store';
import chartTheme from '../chartTheme';
const state = reactive({});
const mainState = MainStore();
const theme = computed(() => chartTheme[mainState.theme]);
const chartDom = ref();
const option: ECOption = {
  textStyle: theme.value.textStyle,
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: theme.value.splitLine.lineStyle,
      show: true
    }
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
let charts: EChartsType;
onMounted(() => {
  charts = echarts.init(chartDom.value);
  charts.setOption(option);
});
</script>
<template>
  <div class="simple-line">
    <div ref="chartDom"></div>
  </div>
</template>
<style scoped lang="scss">
.simple-line {
  height: 100%;
}
.simple-line > div {
  height: 100%;
}
</style>
