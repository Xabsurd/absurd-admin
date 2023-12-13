<script setup lang="ts">
import { reactive, ref } from 'vue';
import DazzlingButton from './../../components/button/DazzlingButton.vue';
import DynamicButtons from './../../components/button/DynamicButtons.vue';
const state = reactive({});
</script>
<template>
  <div class="button-board">
    <el-row class="button-dazzling">
      <DazzlingButton>Default</DazzlingButton>
      <DazzlingButton class="success">Success</DazzlingButton>
      <DazzlingButton class="warning">Warning</DazzlingButton>
      <DazzlingButton class="danger">Danger</DazzlingButton>
      <DazzlingButton class="custom">Custom</DazzlingButton>
    </el-row>
    <el-row class="button-dazzling">
      <DazzlingButton class="large">Default</DazzlingButton>
      <DazzlingButton class="success large">Success</DazzlingButton>
      <DazzlingButton class="warning large">Warning</DazzlingButton>
      <DazzlingButton class="danger large">Danger</DazzlingButton>
      <DazzlingButton class="custom large">Custom</DazzlingButton>
    </el-row>
    <el-row>
      <DynamicButtons>Default</DynamicButtons>
      <DynamicButtons class="success">Success</DynamicButtons>
      <DynamicButtons class="warning">Warning</DynamicButtons>
      <DynamicButtons class="danger">Danger</DynamicButtons>
      <DynamicButtons class="custom">Custom</DynamicButtons>
    </el-row>
    <el-row>
      <DynamicButtons class="large">Default</DynamicButtons>
      <DynamicButtons class="success large">Success</DynamicButtons>
      <DynamicButtons class="warning large">Warning</DynamicButtons>
      <DynamicButtons class="danger large">Danger</DynamicButtons>
      <DynamicButtons class="custom large">Custom</DynamicButtons>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.button-board {
  width: 100%;
  height: 100%;
  display: block;
  padding: 15px;
  .el-row {
    margin-top: 20px;
  }
  .custom{
    --start-color:rgb(255, 0, 68);
    --end-color:rgb(0, 238, 255);
    --bg-opacity:-0.2;
    color: #fff;
  }
}
</style>
