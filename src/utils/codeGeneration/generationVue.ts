import type { GenerationType } from './codeGeneration';
import { getDataType, DataType } from './utils';

export default class GenerationVueByElementPlus {
  constructor() {}
  GenerationFormByJson(json: any, type: GenerationType) {
    return `
    ${this.GenerationFormScripts(json)}
    ${this.GenerationFormTemplate(json)}
    `;
  }
  GenerationFormTemplate(json: any) {
    let formCode = '<template><el-form :model="form" label-width="auto" style="max-width: 600px">';
    //根据传入json的数据类型生成不同的表单
    for (const key in json) {
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        const element = json[key];
        //判断element的类型
        switch (getDataType(element)) {
          case DataType.string:
            formCode += `<el-form-item label="${key}"><el-input v-model="form.${key}" /></el-form-item>`;
            break;
          case DataType.number:
            formCode += `<el-form-item label="${key}"><el-input-number v-model="form.${key}" /></el-form-item>`;
            break;
        }
      }
    }
    formCode += '</el-form></template>';
    return formCode;
  }
  GenerationFormScripts(json: any) {
    //根据这个模板生成
    // <script setup lang="ts">
    // import { reactive } from 'vue';
    // const form = reactive<{ name?: string; age?: string }>({});
    // </script>

    let formCode = `<script setup lang="ts">
import { reactive } from 'vue';
const form = reactive<{`;
    //根据传入json的数据类型生成不同的表单
    for (const key in json) {
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        const element = json[key];
        //判断element的类型
        switch (getDataType(element)) {
          case DataType.string:
            formCode += `${key}?: string,\n`;
            break;
          case DataType.number:
            formCode += `${key}?: number,\n`;
            break;
        }
      }
    }
    formCode += `}>({});
</script>`;
    return formCode;
  }
}
