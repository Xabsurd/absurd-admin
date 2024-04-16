<script setup lang="ts">
import { reactive, defineExpose } from 'vue';
import { type FormType } from './Index.vue';
const tableData = reactive<FormType[]>([]);
function handleDetilRow(index: number, row: any) {}
function handleEditRow(index: number, row: any) {}
function addData(data: FormType) {
  tableData.push(data);
}
defineExpose({ addData });
</script>
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="name" />
    <el-table-column prop="age" label="age" />
    <el-table-column prop="Email" label="Email" />
    <el-table-column prop="Note" label="Note" />
    <el-table-column prop="date" label="date" />
    <el-table-column prop="time" label="time" />
    <el-table-column prop="timesp" label="timesp" />
    <el-table-column prop="man" label="man" />
    <el-table-column prop="asd" label="asd" />
    <el-table-column width="auto" label="操作">
      <template #default="scope">
        <el-button @click="handleDetilRow(scope.$index, scope.row)" size="default">详情</el-button>
        <el-button @click="handleEditRow(scope.$index, scope.row)" size="default">修改</el-button>
        <el-button type="danger" size="default">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style scoped lang="scss"></style>
