<script setup lang="ts">
import { MainStore } from '@/store';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import chartTheme from '../chartTheme';
import echarts, { type ECOption } from '../echarts';
import { type LineSeriesOption } from 'echarts/charts';
import type { DataZoomComponentOption } from 'echarts/components';
import type {
  TooltipOption,
  TooltipFormatterCallback,
  TopLevelFormatterParams,
  CallbackDataParams
} from 'echarts/types/dist/shared';
const state = reactive({
  functionText: 'return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 50;',
  windowResize: null,
  max: 20,
  min: -20,
  interval: 0.01,
  smooth: false,
  first: true,

  chartNum: 0,
  chartValue: ''
});
const mainState = MainStore();
const uiText = computed(() => {
  return mainState.uiText.chart.line.functionLine;
});
const functionName = computed(() => {
  return uiText.value.defaultFunctionName ? uiText.value.defaultFunctionName : 'f(x)';
});
const theme = computed(() => {
  return chartTheme[mainState.theme];
});
const chartDom = ref<HTMLElement>();
let lineChart: echarts.ECharts;
onMounted(() => {
  if (chartDom.value) {
    lineChart = echarts.init(chartDom.value);
    nextTick(() => {
      initChart();
    });
    // this.windowResize = window.addEventListener("resize", this.resize);
    const resizeObserver = new ResizeObserver((entries) => {
      resize();
    });
    resizeObserver.observe(chartDom.value);
  }
});
function boom() {
  state.functionText = 'return x';
  initChart();
  for (let i = 2; i < 100; i++) {
    setTimeout(() => {
      state.functionText = 'return x*' + i;
      addChart();
    }, i * 1000);
  }
}
function resetChart() {
  const option = lineChart.getOption() as ECOption;
  (option.series as LineSeriesOption[]).push({
    name: functionName.value,
    type: 'line',
    smooth: state.smooth ? 1 : 0,
    showSymbol: false,
    clip: true,
    data: setData()
  });
  lineChart.setOption(option);
}
function addChart() {
  state.chartNum++;
  const option = lineChart.getOption() as ECOption;
  (option.series as LineSeriesOption[]).push({
    name: '(' + functionName.value + ')' + state.chartNum,
    type: 'line',
    smooth: state.smooth ? 1 : 0,
    showSymbol: false,
    clip: true,
    data: setData()
  });
  lineChart.setOption(option);
}
function initChart() {
  let dataZoom: DataZoomComponentOption[] = [
    {
      type: 'inside',
      filterMode: 'none',
      yAxisIndex: [0]
    },
    {
      type: 'inside',
      filterMode: 'none',
      xAxisIndex: [0]
      // startValue: -20,
      // endValue: 20,
    },
    {
      filterMode: 'none',
      xAxisIndex: [0]
      // startValue: -20,
      // endValue: 20,
    },
    {
      filterMode: 'none',
      yAxisIndex: [0]
    }
  ];
  try {
    dataZoom = lineChart.getOption().dataZoom as DataZoomComponentOption[];
  } catch (error) {
    console.log(error);
  }
  state.chartNum++;
  const option: ECOption = {
    animation: false,
    textStyle: theme.value.textStyle,
    grid: {
      top: 30,
      left: 60,
      right: 40,
      bottom: 50
    },
    tooltip: theme.value.tooltip,
    xAxis: {
      name: 'x',
      minorTick: {
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: theme.value.axisLine.lineStyle
      },
      minorSplitLine: {
        show: true,
        lineStyle: theme.value.minorSplitLine.lineStyle
      },
      splitLine: {
        lineStyle: theme.value.splitLine.lineStyle,
        show: true
      },
      axisPointer: {
        value: (state.max + state.min) / 2,
        snap: true,
        lineStyle: {
          color: '#7581BD',
          width: 2
        },
        label: {
          show: true,
          backgroundColor: '#7581BD'
        },
        handle: {
          show: true,
          color: '#7581BD'
        }
      }
    },
    yAxis: {
      name: 'y',
      minorTick: {
        show: true
      },
      axisLine: {
        show: true,
        lineStyle: theme.value.axisLine.lineStyle
      },
      minorSplitLine: {
        show: true,
        lineStyle: theme.value.minorSplitLine.lineStyle
      },
      splitLine: {
        lineStyle: theme.value.splitLine.lineStyle,
        show: true
      }
    },
    dataZoom: dataZoom,
    series: [
      {
        name: '(' + functionName.value + ')' + state.chartNum,
        type: 'line',
        smooth: state.smooth ? 1 : 0,
        showSymbol: false,
        clip: true,
        data: setData()
      }
    ]
  };
  (option.tooltip as TooltipOption).formatter = function (params: CallbackDataParams[]) {
    let text = '';
    for (let i = 0; i < params.length; i++) {
      const element = params[i];
      let name = element.seriesName;
      if (name) {
        name = name.substring(1, name.lastIndexOf(')'));
        text +=
          `${element.marker} ${name} : (x : ${(element.data as string[])[0]} , y : ${
            (element.data as string[])[1]
          })` + '<br/>';
      }
    }
    state.chartValue = text;
    return text;
  } as TooltipFormatterCallback<TopLevelFormatterParams>;
  lineChart.setOption(option, true);
}
function setData() {
  const functionText = state.functionText;
  function func(x: number) {
    const runText = `((x)=>{${functionText}})(${x})`;
    return window.eval(runText);
  }
  let data = [];
  for (let i = state.min; i <= state.max; i += state.interval) {
    data.push([i.toFixed(4), func(i).toFixed(4)]);
  }
  return data;
}
function resize() {
  lineChart.resize();
}
</script>
<template>
  <div class="function-line">
    <!-- <div class="input-box">
      <div>
        <div>
          <p>f(x)=</p>
          <p>(js代码)</p>
        </div>
      </div>
      <el-input v-model="functionText" type="textarea" />
      <el-button @click="resetChart">运行</el-button>
      <el-input v-model="functionName" />
      <el-button @click="resetChart">添加</el-button>
    </div> -->
    <el-form class="input-setting" label-width="110px">
      <el-form-item :label="uiText.functionText ? uiText.functionText : 'functionText'">
        <el-input v-model="state.functionText" type="textarea" />
      </el-form-item>
      <el-form-item :label="uiText.functionName ? uiText.functionName : 'functionName'">
        <el-input v-model="functionName" />
      </el-form-item>
      <el-form-item :label="uiText.max ? uiText.max : 'max'">
        <el-input-number v-model="state.max" />
      </el-form-item>
      <el-form-item :label="uiText.min ? uiText.min : 'min'">
        <el-input-number v-model="state.min" />
      </el-form-item>
      <el-form-item :label="uiText.interval ? uiText.interval : 'interval'">
        <el-input-number v-model="state.interval" :step="0.01" />
      </el-form-item>
      <el-form-item :label="uiText.smooth ? uiText.smooth : 'smooth'">
        <el-switch v-model="state.smooth"></el-switch>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="initChart">{{ uiText.run ? uiText.run : 'run' }}</el-button>
        <el-button @click="addChart">{{ uiText.add ? uiText.add : 'add' }}</el-button>
        <el-button @click="boom">boom</el-button>
      </el-form-item>
    </el-form>
    <div class="chart-box">
      <div class="chart-value" v-html="state.chartValue"></div>
      <div class="chart" ref="chartDom"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.function-line {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  display: flex;
  // flex-direction: column;
  position: relative;
  :deep(textarea) {
    min-height: 100px !important;
    
  }
  .input-setting {
    overflow: auto;
    flex-shrink: 0;
    padding-top: 15px;
  }
  .chart-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 500px;
    .chart {
      flex: 1;
      overflow: hidden;
    }
    .chart-value {
      display: none;
    }
  }
}
@media screen and (max-width: 992px) {
  .function-line {
    .chart-box {
      min-width: 100%;
      .chart-value {
        display: block;
        width: 100%;
        background-color: var(--content-color);
        max-height: 200px;
        overflow: auto;
        text-align: center;
      }
    }
  }
}
</style>
