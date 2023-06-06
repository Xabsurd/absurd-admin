<template>
  <div id="Layout">
    <Sider></Sider>
    <div id="Content">
      <Header v-show="state.headerShow" ref="header"></Header>
      <div id="ContentView" ref="ContentView">
        <AnimationRouter></AnimationRouter>
      </div>
      <div v-if="!mainState.menuCollapse" id="ContentMark" @click="hideMenu"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sider from './Sider.vue';
import Header from './Header.vue';
import { MainStore } from '../../store';
import { beFull, exitFull } from '../../utils/fullScreen';
import { reactive, ref, watch, onBeforeUnmount, onMounted } from 'vue';
import { hideMenu, windowKeyDown, windowResize } from './methods/layout';
import AnimationRouter from './components/AnimationRouter.vue';
//全局状态
const mainState = MainStore();

//doms
const ContentView = ref(undefined);
const header = ref(undefined);
//局部状态
const state = reactive({ headerShow: true });

//数据监听
watch(
  () => mainState.fullScreen,
  (data, prev) => {
    switch (data) {
      case 1:
        mainState.menuCollapse = true;
        state.headerShow = false;
        break;
      case 2:
        beFull(ContentView.value);
        break;
      case 3:
        beFull(document.body);
        break;
      default:
        exitFull();
        mainState.menuCollapse = false;
        state.headerShow = true;
        break;
    }
  }
);
//生命周期
onMounted(() => {
  window.addEventListener('resize', windowResize);
  window.addEventListener('keydown', windowKeyDown);
  windowResize();
});
onBeforeUnmount(() => {});
defineExpose({
  ContentView,
  state
});
</script>

<style lang="scss" scoped>
#Layout {
  display: flex;
  height: 100%;
  width: 100%;

  #Content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: var(--content-color);
    #ContentView {
      flex: 1;
      overflow: hidden;
      position: relative;
      margin: var(--content-margin);
      color: var(--content-text-color);
      > div {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
    #ContentMark {
      display: none;
    }
  }
}
@media screen and (max-width: 992px) {
  #Layout {
    #Content {
      min-width: 100%;
      #ContentMark {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.5;
      }
    }
  }
}
</style>
