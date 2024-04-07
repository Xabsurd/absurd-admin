<script setup lang="ts">
//弹出框，创建数据结构
import type { MessageSchema } from '@/locales/schema';
import { SupportDataType } from '@/utils/codeGeneration/codeGeneration';
import { UniqueValidateResult, isUniqueKeyAndNotNull } from '@/utils/dataTools';
import { ElMessage } from 'element-plus';
import { reactive, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n<{ message: MessageSchema }>();
type FieldType = {
  name: string;
  type: SupportDataType;
  size: number;
  description: string;
  canNull: boolean;
};
const defaultField: () => FieldType = () => {
  return {
    name: '',
    type: 'integer' as SupportDataType.integer,
    size: 0,
    description: '',
    canNull: false
  };
};
const fieldList = reactive<FieldType[]>([defaultField()]);

const state = reactive({
  visible: true
});
function addFieldItem() {
  fieldList.push(defaultField());
}
function removeFieldItem(index: number) {
  if (fieldList.length > 1) {
    fieldList.splice(index, 1);
  }
}
function submit() {
  const result = isUniqueKeyAndNotNull(fieldList, 'name');
  switch (result) {
    case UniqueValidateResult.Unique:
      // ElMessage.success(t('component.codeGen.createDataStructure.success'));
      break;
    case UniqueValidateResult.Null:
      ElMessage.error(t('component.codeGen.createDataStructure.error1'));
      break;
    case UniqueValidateResult.Duplicate:
      ElMessage.error(t('component.codeGen.createDataStructure.error2'));
  }
}
</script>
<template>
  <el-dialog
    :title="t('component.codeGen.createDataStructure.title')"
    v-model="state.visible"
    width="80%"
  >
    <el-table :data="fieldList">
      <el-table-column property="name" :label="t('component.tableField.name')" width="180">
        <template #default="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column property="type" :label="t('component.tableField.type')" width="180">
        <template #default="scope">
          <el-select v-model="scope.row.type">
            <el-option
              v-for="(item, key) in SupportDataType"
              :key="key"
              :label="key"
              :value="key"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column property="size" :label="t('component.tableField.size')" width="185">
        <template #default="scope">
          <el-input-number v-model="scope.row.size" style="width: 150px"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column property="description" :label="t('component.tableField.description')">
        <template #default="scope">
          <el-input v-model="scope.row.description"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        property="canNull"
        :label="t('component.tableField.canNull')"
        width="120"
        align="center"
      >
        <template #default="scope">
          <el-checkbox v-model="scope.row.canNull"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column width="55" align="center" size="small">
        <template #default="scope">
          <el-tooltip :content="t('operation.delete')" placement="top">
            <el-button @click="removeFieldItem(scope.$index)" link type="danger">
              <i class="iconfont icon-guanbi"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-field" @click="addFieldItem">
      <i class="iconfont icon-plus-square"></i>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.visible = false">{{ t('operation.cancel') }}</el-button>
        <el-button type="primary" @click="submit">
          {{ t('operation.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss">
.add-field {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 100%;
  border: 1px dashed var(--el-border-color);
  transition: all 0.3s;
  i {
    font-size: 1.5rem;
  }
  &:hover {
    cursor: pointer;
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
  }
}
.el-table {
  :deep(.el-table__inner-wrapper::before) {
    display: none !important;
  }
  :deep(.el-table__body-wrapper) {
    tr:nth-last-child(1) {
      td.el-table__cell {
        border: none;
      }
    }
  }
}
</style>
