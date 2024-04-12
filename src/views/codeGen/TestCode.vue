<script setup lang="ts">
import { reactive } from 'vue';
import Editor from 'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-vue@5.1.1/+esm';
const form = reactive<{
  name?: string;
  age?: string;
  Email?: number;
  Note?: string;
}>({ name: '', age: '', Email: 0, Note: '' });
</script>
<template>
  <el-form :model="form" label-width="auto">
    <el-form-item label="name"><el-input v-model="form.name" /></el-form-item>
    <el-form-item label="age"><el-input v-model="form.age" /></el-form-item>
    <el-form-item label="Email"><el-input-number v-model="form.Email" /></el-form-item>
    <el-form-item label="Note"><Editor></Editor></el-form-item>
  </el-form>
</template>
