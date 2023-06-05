<template>
  <div class="header">
    <i
      class="iconfont"
      :class="mainState.menuCollapse ? 'icon-indent' : 'icon-outdent'"
      id="Collapse"
      @click="changeMenuCollapse"
    ></i>
    <i
      class="full iconfont"
      :class="[mainState.fullScreen === 3 ? 'icon-fullscreen-exit' : 'icon-fullscreen']"
      @click="fullClick"
    ></i>
    <i
      class="full iconfont"
      :class="[mainState.fullScreen === 1 ? 'icon-compress' : 'icon-expend']"
      @click="bodyFull"
    ></i> 
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { getCurrentInstance } from 'vue';
import { MainStore } from "../../store";
const test = getCurrentInstance();
const mainState = MainStore();
function changeMenuCollapse() {
  mainState.menuCollapse = !mainState.menuCollapse;
}
function fullClick() {
  if (mainState.fullScreen === 3) {
    mainState.fullScreen = 0;
  } else {
    mainState.fullScreen = 3;
  }
}
function bodyFull() {
  if (mainState.fullScreen === 1) {
    mainState.fullScreen = 0;
  } else {
    ElMessage.info("按Esc键退出");
    mainState.fullScreen = 1;
  }
}
defineExpose({
  bodyFull
});
</script>
<style lang="scss" scoped>
.header {
  height: 52px;
  background-color: var(--header-color);
  color: var(--header-text-color);
  box-shadow: var(--box-shadow);
  display: flex;
  > i {
    -webkit-app-region: no-drag;
    user-select: none;
    width: 52px;
    height: 52px;
    display: flex;
    font-size: 24px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
