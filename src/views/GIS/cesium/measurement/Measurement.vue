<script setup lang="ts">
import { reactive, ref } from 'vue';
const state = reactive({});
</script>
<template>
  <div class="measurement">
    <to-header>
      <el-button type="primary">点击</el-button>
    </to-header>
    测量
  </div>
</template>
<style scoped lang="scss">
.button-box {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
