<script setup lang="ts">
import Form from './Form.vue';
import Table from './Table.vue';
import { ref } from 'vue';
const formRef = ref<InstanceType<typeof Form>>();
const tableRef = ref<InstanceType<typeof Table>>();
export type FormType = {
  name?: string;
  age?: string;
  Email?: number;
  Note?: string;
  date?: Date;
  time?: Date;
  timesp?: Date;
  man?: boolean;
  asd?: number;
};
const dialogVisible = ref(false);

function submitForm(data: FormType) {
  console.log(data);
  tableRef.value?.addData(data);
}
function handleEdit() {}
</script>
<template>
  <div>
    <el-dialog title="添加" v-model="dialogVisible">
      <Form @submit="submitForm" ref="formRef"></Form>
    </el-dialog>
    <Table @edit="handleEdit" ref="tableRef"></Table>
  </div>
</template>
<style scoped lang="scss"></style>
