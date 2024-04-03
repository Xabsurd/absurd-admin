<script setup lang="ts">
import { reactive } from 'vue';
const form = reactive<{ name?: string; age?: number }>({});
</script>
<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px"
    ><el-form-item label="name"><el-input v-model="form.name" /></el-form-item
    ><el-form-item label="age"><el-input-number v-model="form.age" /></el-form-item
  ></el-form>
</template>
