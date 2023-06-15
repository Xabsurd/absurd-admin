<template>
  <el-form label-width="100px" :model="setting">
    <el-form-item :label="uiText.language ? uiText.language : '语言'">
      <el-select
        v-model="setting.language"
        :placeholder="uiText.language ? uiText.language : '语言'"
        @change="languageChange"
      >
        <el-option
          v-for="item in languageOptions"
          :key="item.name"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="uiText.theme ? uiText.theme : '主题'">
      <el-select
        v-model="setting.theme"
        :placeholder="uiText.theme ? uiText.theme : '主题'"
        @change="themeChange"
      >
        <el-option
          v-for="item in themeOptions"
          :key="item.label"
          :label="uiText.themeOption[item.label] ? uiText.themeOption[item.label] : item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MainStore } from '../../store';

const mainState = MainStore();
export default defineComponent({
  computed: {
    uiText() {
      return mainState.uiText.setting;
    }
  },
  data() {
    return {
      setting: {
        language: mainState.language,
        theme: mainState.theme
      },
      languageOptions: {} as any,
      themeOptions: {} as any
    };
  },
  methods: {
    languageChange(value: string) {
      mainState.changeLanguage(value);
    },
    themeChange(value: string) {
      mainState.changeTheme(value);
    }
  },
  mounted() {
    import('../../language/option').then((data) => {
      this.languageOptions = data.default;
    });
    import('../../utils/themeOption').then((data) => {
      this.themeOptions = data.default;
    });
  }
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
