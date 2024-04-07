<script setup lang="ts">
//弹出框，创建数据结构
import { reactive, defineProps } from 'vue';

const state = reactive({
  visible: true
});
const props = defineProps<{
  type?: string;
}>();
</script>
<template>
  <el-dialog title="创建数据结构" v-model="state.visible"></el-dialog>
</template>
<style scoped lang="scss"></style>
