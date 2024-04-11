import { SupportDataType, type GenerationType } from './codeGeneration';

export default class GenerationVueByElementPlus {
  constructor() {}
  GenerationFormByJson(json: any, type: GenerationType) {
    return `
${this.GenerationFormScripts(json)}
${this.GenerationFormTemplate(json)}
    `;
  }
  GenerationFormTemplate(json: FieldType[]) {
    let formCode = '<template>\n  <el-form :model="form" label-width="auto" >';
    //根据传入json的数据类型生成不同的表单
    for (let i = 0; i < json.length; i++) {
      const element = json[i];
      //判断element的类型
      switch (element.type) {
        case SupportDataType.varchar:
          formCode += `\n    <el-form-item label="${element.name}"><el-input v-model="form.${element.name}" /></el-form-item>`;
          break;
        case SupportDataType.text:
          formCode += `\n    <el-form-item label="${element.name}"><el-input type="textarea" style="min-height: 100px" v-model="form.${element.name}" /></el-form-item>`;
          break;
        case SupportDataType.char:
          formCode += `\n    <el-form-item label="${element.name}"><el-input v-model="form.${element.name}" /></el-form-item>`;
          break;
        case SupportDataType.integer:
          formCode += `\n    <el-form-item label="${element.name}"><el-input-number v-model="form.${element.name}" /></el-form-item>`;
          break;
      }
    }
    formCode += '\n  </el-form>\n</template>';
    return formCode;
  }
  GenerationFormScripts(json: FieldType[]) {
    //根据这个模板生成
    // <script setup lang="ts">
    // import { reactive } from 'vue';
    // const form = reactive<{ name?: string; age?: string }>({});
    // </script>

    let typeCode = '';
    let valueCode = '';
    //根据传入json的数据类型生成不同的表单
    for (let i = 0; i < json.length; i++) {
      const element = json[i];
      valueCode +=
        `${element.name}:${this.GenerationDefaultValue(element.type)}` +
        (i === json.length - 1 ? '' : ',');
      switch (element.type) {
        case SupportDataType.varchar:
        case SupportDataType.text:
          typeCode += `    ${element.name}?: string,\n`;
          break;
        case SupportDataType.integer:
          typeCode += `    ${element.name}?: number,\n`;
          break;
        // case SupportDataType.text:
        //   typeCode += `    ${element.name}?: number,\n`;
        //   break;
      }
    }
    const formCode = `<script setup lang="ts">\n  import { reactive } from 'vue';\n  const form = reactive<{\n${typeCode}  }>({${valueCode}});\n</script>`;
    return formCode;
  }
  GenerationDefaultValue(field: SupportDataType) {
    switch (field) {
      case SupportDataType.varchar:
      case SupportDataType.text:
        return '""';
      case SupportDataType.integer:
        return 0;
    }
  }
}
