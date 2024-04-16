<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { FormType } from './Index.vue';
import Editor from './Editor.vue';

const emits = defineEmits<{
  (event: 'submit', fieldList: FormType): void;
}>();
const formData = reactive<FormType>({
  name: '',
  age: '',
  Email: 0,
  Note: '',
  date: new Date(),
  time: new Date(),
  timesp: new Date(),
  man: false,
  asd: 0
});
const formRef = ref<FormInstance>();
const formRules = reactive<FormRules<FormType>>({
  name: [
    { required: true, message: '请输入name', trigger: 'blur' },
    { min: 1, max: 50, message: 'Length should be 1 to 50', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入age', trigger: 'blur' },
    { min: 1, max: 50, message: 'Length should be 1 to 50', trigger: 'blur' }
  ],
  Email: [{ required: true, message: '请输入Email', trigger: 'blur' }],
  Note: [{ required: true, message: '请输入Note', trigger: 'blur' }],
  date: [{ required: true, message: '请输入date', trigger: 'blur' }],
  time: [{ required: true, message: '请输入time', trigger: 'blur' }],
  timesp: [{ required: true, message: '请输入timesp', trigger: 'blur' }],
  man: [{ required: true, message: '请输入man', trigger: 'blur' }],
  asd: [{ required: true, message: '请输入asd', trigger: 'blur' }]
});

function submitForm() {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      emits('submit', formData);
    }
  });
}
</script>
<template>
  <el-form :model="formData" label-width="auto" ref="formRef" :rules="formRules">
    <el-form-item label="name" prop="name"><el-input v-model="formData.name" /></el-form-item>
    <el-form-item label="age" prop="age"><el-input v-model="formData.age" /></el-form-item>
    <el-form-item label="Email" prop="Email">
      <el-input-number v-model="formData.Email" />
    </el-form-item>
    <el-form-item label="Note" prop="Note"><Editor v-model="formData.Note"></Editor></el-form-item>
    <el-form-item label="date" prop="date">
      <el-date-picker type="datetime" v-model="formData.date" />
    </el-form-item>
    <el-form-item label="time" prop="time"><el-time-picker v-model="formData.time" /></el-form-item>
    <el-form-item label="timesp" prop="timesp">
      <el-date-picker v-model="formData.timesp" />
    </el-form-item>
    <el-form-item label="man" prop="man"><el-switch v-model="formData.man" /></el-form-item>
    <el-form-item label="asd" prop="asd"><el-input-number v-model="formData.asd" /></el-form-item>
    <el-form-item label=" ">
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>
