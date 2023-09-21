<script setup lang="ts">
import { render } from 'sass';
import { reactive, ref, onMounted } from 'vue';
const state = reactive({});
const _canvas = ref<HTMLCanvasElement>();
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;
onMounted(() => {
  if (_canvas.value) {
    canvas = _canvas.value as HTMLCanvasElement;
    context = canvas.getContext('2d');
    console.log(context);
  }
  //添加拖入图片的功能
});
function canvasDragover(e: DragEvent) {
  e.preventDefault();
}
function canvasDrop(e: DragEvent) {
  e.preventDefault();
  const file = e.dataTransfer?.files[0];
  console.log(file);
  if (file) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      _render(img);
    };
  }
}
function _render(img: HTMLImageElement) {
  console.log([img]);
  canvas.width = img.width;
  canvas.height = img.height;
  context?.drawImage(img, 0, 0);
  //获取图片中每个像素的值
  const data = context?.getImageData(0, 0, canvas.width, canvas.height);
  if (data?.data) {
    //转换成灰度图
    const gray = new ImageData(canvas.width, canvas.height);
    for (let i = 0; i < data.data.length; i += 4) {
      const grayValue =
        0.2126 * data.data[i] + 0.7152 * data.data[i + 1] + 0.0722 * data.data[i + 2];
      gray.data[i] = grayValue;
      gray.data[i + 1] = grayValue;
      gray.data[i + 2] = grayValue;
      gray.data[i + 3] = 255;
    }
    context?.putImageData(gray, 0, 0);
  }
}
</script>
<template>
  <div class="box">
    <canvas ref="_canvas" @drop="canvasDrop" @dragover="canvasDragover"></canvas>
  </div>
</template>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  overflow: hidden !important;
  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
