<script setup lang="ts">
 import { reactive } from 'vue';
 const form = reactive<{    name?: string,
   age?: string,
   Email?: number,
}>({name:undefinedage:undefinedEmail:undefined});
</script>
<template>
  <el-form :model="form" label-width="auto">
    <el-form-item label="name"><el-input v-model="form.name" /></el-form-item>
    <el-form-item label="age"><el-input v-model="form.age" /></el-form-item>
    <el-form-item label="Email"><el-input-number v-model="form.Email" /></el-form-item>
  </el-form>
</template>
