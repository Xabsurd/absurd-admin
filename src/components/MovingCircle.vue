<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
const movingCircleRef = ref<HTMLElement>();
const circles = ref<
  {
    offsetPath: string;
    color: string;
  }[]
>([]);
const delay = ref(20000);

let timer: number;
onMounted(() => {
  for (let i = 0; i < 10; i++) {
    const startX = randomX();
    const startY = randomY();
    circles.value.push({
      offsetPath: `path('M ${startX},${startY} ${randomCurve(startX, startY)}')`,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16)
    });
  }
  // timer = setInterval(() => {
  //   for (let i = 0; i < circles.value.length; i++) {
  //     circles.value[i].offsetPath = `path('M ${randomX()},${randomY()} ${randomCurve()}')`;
  //   }
  // }, delay.value);
});
onUnmounted(() => {
  clearInterval(timer);
});
function randomCurve(startX = 0, startY = 0) {
  const endX = randomX();
  const endY = randomY();
  const minX = Math.min(startX, endX);
  const minY = Math.min(startY, endY);
  const maxX = Math.max(startX, endX);
  const maxY = Math.max(startY, endY);
  return `C ${random(minX, maxX)},${random(minY, maxY)} ${random(minX, maxX)},${random(minY, maxY)} ${endX},${endY}`;
}
function randomX() {
  return Math.random() * movingCircleRef.value!.offsetWidth;
}
function randomY() {
  return Math.random() * movingCircleRef.value!.offsetHeight;
}
//生成指定范围内的随机数
function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
</script>
<template>
  <div class="moving-circle" ref="movingCircleRef">
    <div class="filler">
      <div
        class="circle"
        v-for="circle in circles"
        :key="circle.color"
        :style="{
          // left: circle.x + 'px',
          // top: circle.y + 'px',
          backgroundColor: circle.color,
          'offset-path': circle.offsetPath,
          animationDuration: `${delay}ms`
        }"
      >
        {{ circle.offsetPath }}
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.moving-circle {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .filler {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(50px);
  }
  .circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 666px;
    height: 666px;
    transform: translate(-333px, -333px);
    border-radius: 50%;
    opacity: 0.05;
    animation-name: move;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes move {
    0% {
      offset-distance: 0%;
    }
    100% {
      offset-distance: 100%;
    }
  }
}
</style>
