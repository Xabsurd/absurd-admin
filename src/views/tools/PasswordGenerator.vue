<template>
  <div class="passwordGenerator">
    <div class="box">
      <div class="password">
        <el-input ref="password" v-model="state.password"></el-input>
        <div class="copy iconfont icon-file-copy" @click="copy"></div>
        <div class="create iconfont icon-reload" @click="create"></div>
      </div>
      <div class="len">
        <el-slider v-model="state.len" show-input :max="50" :min="1" />
      </div>
      <el-checkbox-group class="type" v-model="state.checkedType" :min="1">
        <el-checkbox v-for="item in state.types" :key="item.name" :label="item.str">
          {{ (uiText && uiText[item.name]) || item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MainStore } from '../../store';
import { computed, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';

const mainState = MainStore();

const uiText = computed(() => mainState.uiText?.tools?.passwordGenerator);
const state = reactive({
  candidate: '', //候选字符串
  password: '', //生成的密码
  len: 15, //密码长度
  types: [
    {
      name: 'Uppercase',
      use: true,
      str: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    },
    {
      name: 'Lowercase',
      use: true,
      str: 'abcdefghijklmnopqrstuvwxyz'
    },
    {
      name: 'Number',
      use: true,
      str: '0123456789'
    },
    {
      name: 'Special',
      use: true,
      str: '!@#$%^&*()_+-=[]{}|;\':,./<>?'
    }
  ] as { name: 'Uppercase' | 'Lowercase' | 'Number' | 'Special'; use: boolean; str: string }[], //密码类型
  checkedType: [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'abcdefghijklmnopqrstuvwxyz',
    '0123456789',
    '!@#$%^&*()_+-=[]{}|;\':,./<>?'
  ] //选中的密码类型
});
watch([() => state.candidate, () => state.len, () => state.checkedType], () => {
  create();
});
watch(
  () => state.checkedType,
  (data, pre) => {
    updateCandidate();
  }
);
function copy() {
  navigator.clipboard.writeText(state.password);
  ElMessage.success('复制成功');
}
function create() {
  let password = '';
  for (let i = 0; i < state.len; i++) {
    password += state.candidate[Math.floor(Math.random() * state.candidate.length)];
  }
  state.password = password;
}
function updateCandidate() {
  let candidate = '';
  for (let i = 0; i < state.checkedType.length; i++) {
    candidate += state.checkedType[i];
  }
  state.candidate = candidate;
}
updateCandidate();
</script>

<style lang="scss" scoped>
.passwordGenerator {
  .box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 300px;
    max-width: 600px;
    box-shadow: var(--el-box-shadow);
    margin: auto;
    margin-top: 150px;
    justify-content: space-evenly;
    .password,
    .len,
    .type {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 0 20px;
    }
    .password {
      display: flex;
      flex-direction: row;
      overflow: hidden;
      > div:first-child {
        flex: 1;
        overflow: hidden;
      }
      .copy,
      .create {
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
