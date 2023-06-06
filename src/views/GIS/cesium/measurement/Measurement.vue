<script setup lang="ts">
import { reactive, ref } from 'vue';
const state = reactive({});
</script>
<template>
  <div class="measurement">
    <Teleport to="#header">
      <div class="button-box"><el-button type="primary">点击</el-button></div>
    </Teleport>
    测量
  </div>
</template>
<style scoped lang="scss">
.button-box{
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
