<template>
  <el-form label-width="100px" :model="state.setting">
    <el-form-item :label="uiText.language ? uiText.language : '语言'">
      <el-select
        v-model="state.setting.language"
        :placeholder="uiText.language ? uiText.language : '语言'"
        @change="languageChange"
      >
        <el-option
          v-for="item in state.languageOptions"
          :key="item.name"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="uiText.theme ? uiText.theme : '主题'">
      <el-select
        v-model="state.setting.theme"
        :placeholder="uiText.theme ? uiText.theme : '主题'"
        @change="themeChange"
      >
        <el-option
          v-for="item in state.themeOptions"
          :key="item.label"
          :label="uiText.themeOption[item.label] ? uiText.themeOption[item.label] : item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import { MainStore } from '../../store';

const mainState = MainStore();
const uiText = computed(() => mainState.uiText.setting);
const state = reactive({
  setting: {
    language: mainState.language,
    theme: mainState.theme
  },
  languageOptions: [] as {
    name: string;
    value: string;
  }[],
  themeOptions: [] as {
    label: string;
    value: string;
  }[]
});
function languageChange(value: string) {
  mainState.changeLanguage(value);
}
function themeChange(value: string) {
  mainState.changeTheme(value);
}
onMounted(() => {
  import('../../language/option').then((data) => {
    state.languageOptions = data.default;
  });
  import('../../utils/themeOption').then((data) => {
    state.themeOptions = data.default;
  });
});
</script>

<style lang="scss" scoped>
.el-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;

  overflow: auto;
  .el-form-item:last-child {
    margin-bottom: 0;
  }
}
</style>
