import type { FormRules } from 'element-plus';
import { SupportDataType, type GenerationType } from './codeGeneration';

export default class GenerationVueByElementPlus {
  constructor() {}
  GenerationFormByJson(json: any) {
    return `
${this.GenerationFormScripts(json)}
${this.GenerationFormTemplate(json)}
    `;
  }
  GenerationTableByJson(json: any) {
    const tableScripts = `
<script setup lang="ts">
import { reactive, defineExpose } from 'vue';
import { type FormType } from './Index.vue';
const tableData = reactive<FormType[]>([]);
function handleDetilRow(index: number, row: any) {}
function handleEditRow(index: number, row: any) {}
function addData(data: FormType) {
  tableData.push(data);
}
defineExpose({ addData });
</script>`;
    let tableTemplate = '<template>\n  <el-table :data="tableData" style="width: 100%">';
    //根据传入json的数据类型生成不的表格
    for (let i = 0; i < json.length; i++) {
      const element = json[i];
      tableTemplate += `\n    <el-table-column prop="${element.name}" label="${element.name}" />`;
    }
    tableTemplate += `<el-table-column width="auto" label="操作">
    <template #default="scope">
      <el-button @click="handleDetilRow(scope.$index, scope.row)" size="default">详情</el-button>
      <el-button @click="handleEditRow(scope.$index, scope.row)" size="default">修改</el-button>
      <el-button type="danger" size="default">删除</el-button>
    </template>
  </el-table-column>`;
    tableTemplate += '\n  </el-table>\n</template>';
    return tableScripts + '\n' + tableTemplate;
  }
  generationTemplateByJson(json: FieldType[]) {
    let typeCode = 'export type FormType = {\n';

    for (let i = 0; i < json.length; i++) {
      typeCode += `${json[i].name}: ${this.DataStructureType2JS(json[i].type)};\n`;
    }
    const templateCode = `
    <script setup lang="ts">
    import Form from './Form.vue';
    import Table from './Table.vue';
    import { ref } from 'vue';
    const formRef = ref<InstanceType<typeof Form>>();
    const tableRef = ref<InstanceType<typeof Table>>();
    ${typeCode}}
    const dialogVisible = ref(false);
    
    function submitForm(data: FormType) {
      console.log(data);
      tableRef.value?.addData(data);
    }
    function handleEdit() {}
    </script>
    <template>
      <div>
      <el-button @click="dialogVisible = true">添加</el-button>
        <el-dialog title="添加" v-model="dialogVisible">
          <Form @submit="submitForm" ref="formRef"></Form>
        </el-dialog>
        <Table @edit="handleEdit" ref="tableRef"></Table>
      </div>
    </template>
    <style scoped lang="scss"></style>
       
    `;
    const tableCode = this.GenerationTableByJson(json);
    const formCode = this.GenerationFormByJson(json);
    return {
      template: templateCode,
      table: tableCode,
      form: formCode
    };
  }
  GenerationFormTemplate(json: FieldType[]) {
    let formCode =
      '<template>\n  <el-form :model="formData" label-width="auto" ref="formRef" :rules="formRules">';
    //根据传入json的数据类型生成不同的表单
    for (let i = 0; i < json.length; i++) {
      const element = json[i];
      formCode += `\n    <el-form-item label="${element.name}" prop="${element.name}">`;
      //判断element的类型
      switch (element.type) {
        case SupportDataType.varchar:
          formCode += `<el-input v-model="formData.${element.name}" />`;
          break;
        case SupportDataType.text:
          formCode += `<Editor v-model="formData.${element.name}"></Editor>`;
          break;
        case SupportDataType.char:
          formCode += `<el-input v-model="formData.${element.name}" />`;
          break;
        case SupportDataType.integer:
          formCode += `<el-input-number v-model="formData.${element.name}" />`;
          break;
        case SupportDataType.datetime:
          formCode += `<el-date-picker type="datetime" v-model="formData.${element.name}" />`;
          break;
        case SupportDataType.float:
          formCode += `<el-input-number v-model="formData.${element.name}" />`;
          break;
        case SupportDataType.double:
          formCode += `<el-input-number v-model="formData.${element.name}" />`;
          break;
        case SupportDataType.boolean:
          formCode += `<el-switch v-model="formData.${element.name}" />`;
          break;
        case SupportDataType.date:
          formCode += `<el-date-picker v-model="formData.${element.name}" />`;
          break;
        case SupportDataType.time:
          formCode += `<el-time-picker  v-model="formData.${element.name}" />`;
          break;
        case SupportDataType.timestamp:
          formCode += `<el-date-picker  v-model="formData.${element.name}" />`;
          break;
        default:
          break;
      }
      formCode += '</el-form-item>';
    }
    const submitButton =
      '\n    <el-form-item label=" "><el-button type="primary" @click="submitForm">提交</el-button></el-form-item>\n';
    formCode += submitButton + '  </el-form>\n</template>';
    return formCode;
  }
  GenerationFormScripts(json: FieldType[]) {
    //根据这个模板生成
    // <script setup lang="ts">
    // import { reactive } from 'vue';
    // const form = reactive<{ name?: string; age?: string }>({});
    // </script>
    let valueCode = '\n';
    let needEditor = false;
    const ruleCode: string[] = [];
    //根据传入json的数据类型生成不同的表单
    for (let i = 0; i < json.length; i++) {
      const element = json[i];
      valueCode +=
        `    ${element.name}:${this.GenerationDefaultValue(element.type)}` +
        (i === json.length - 1 ? '\n' : ',\n');
      let itemRuleCode = '';
      if (!element.canNull) {
        itemRuleCode += `{ required: true, message: '请输入${element.name}', trigger: 'blur' },`;
      }
      if (element.size > 0 && element.type === SupportDataType.varchar) {
        itemRuleCode += `{ min: 1, max: ${element.size}, message: 'Length should be 1 to ${element.size}', trigger: 'blur' },`;
      }
      //如果最后一个字符是逗号则删除
      if (itemRuleCode[itemRuleCode.length - 1] === ',') {
        itemRuleCode = itemRuleCode.slice(0, itemRuleCode.length - 1);
      }
      if (element.type === SupportDataType.text) {
        needEditor = true;
      }
      ruleCode.push(`    ${element.name}: [${itemRuleCode}],\n`);
    }
    const refCode = `\nconst emits = defineEmits<{
      (event: 'submit', fieldList: FormType): void;
    }>();const formData = reactive<FormType>({${valueCode} });\nconst formRef=ref<FormInstance>();\n  const formRules = reactive<FormRules<FormType>>({\n${ruleCode.join('')}});\n`;
    const importCode = `import { reactive,ref } from 'vue';\n  import type { FormInstance,FormRules } from 'element-plus'; import type { FormType } from './Index.vue';\n${needEditor ? '  import Editor from "./Editor.vue";\n' : ''}`;
    const functionCode = `  function submitForm() {
    if (!formRef.value) return;
    formRef.value.validate((valid) => {
      if (valid) {
        emits('submit', formData);
      }
    });
  }`;
    const formCode = `<script setup lang="ts">\n  ${importCode}  \n${refCode}  \n \n${functionCode}\n</script>`;
    return formCode;
  }
  GenerationDefaultValue(field: SupportDataType) {
    switch (field) {
      case SupportDataType.varchar:
      case SupportDataType.text:
        return '""';
      case SupportDataType.integer:
        return 0;
      case SupportDataType.datetime:
        return 'new Date()';
      case SupportDataType.float:
      case SupportDataType.double:
        return 0.0;
      case SupportDataType.boolean:
        return false;
      case SupportDataType.char:
        return '""';
      case SupportDataType.timestamp:
        return 'new Date()';
      case SupportDataType.date:
        return 'new Date()';
      case SupportDataType.time:
        return 'new Date()';
      default:
        return '""';
    }
  }
  DataStructureType2JS(type: SupportDataType) {
    switch (type) {
      case SupportDataType.varchar:
      case SupportDataType.text:
        return 'string';
      case SupportDataType.integer:
        return 'number';
      case SupportDataType.datetime:
        return 'Date';
      case SupportDataType.float:
      case SupportDataType.double:
        return 'number';
      case SupportDataType.boolean:
        return 'boolean';
      case SupportDataType.char:
        return 'string';
      case SupportDataType.timestamp:
        return 'Date';
      case SupportDataType.date:
        return 'Date';
      case SupportDataType.time:
        return 'Date';
      default:
        return 'string';
    }
  }
}
