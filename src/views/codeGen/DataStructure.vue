<script setup lang="ts">
import type { SupportDataType } from '@/utils/codeGeneration/codeGeneration';
import { reactive, ref, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import type { MessageSchema } from '@/locales/schema';
import CreateDataStructure from './CreateDataStructure.vue';
const { t } = useI18n<{ message: MessageSchema }>();
const state = reactive({});
const props = defineProps<{
  type?: string;
}>();
type DataStructureType = Record<string, SupportDataType>;
const tableData = ref([
  {
    name: 'test',
    description: 'test',
    addTime: '2022-01-01 00:00:00',
    dataStructure: {}
  }
]);
function handleEditRow(index: number, row: any) {}
function handleAddRow(index: number, row: any) {}
function handleVisualRow(index: number, row: any) {}
function handleDeleteRow(index: number, row: any) {}
function handleBatchDeleteRow(index: number, row: any) {}
</script>
<template>
  <div id="DataStructure">
    <CreateDataStructure></CreateDataStructure>
    <div class="toolbar">
      <el-button
        type="primary"
        @click="handleAddRow(0, {})"
        style="margin-right: 10px"
        size="large"
      >
        {{ t('operation.create') }}
      </el-button>
      <el-button
        type="danger"
        @click="handleBatchDeleteRow(0, {})"
        style="margin-right: 10px"
        size="large"
      >
        {{ t('operation.batchDelete') }}
      </el-button>
    </div>
    <div class="structure-visual">
      <el-table
        :data="tableData"
        border
        style="width: 100%; height: calc(100vh - var(--toolbar-height) - var(--header-height))"
        size="large"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" :label="t('label.name')" width="180" />

        <el-table-column prop="addTime" width="180" :label="t('label.addTime')" />
        <el-table-column
          prop="description"
          :label="t('label.description')"
          :show-overflow-tooltip="true"
        />
        <el-table-column width="235" :label="t('label.operation')">
          <template #default="scope">
            <el-button
              @click="handleEditRow(scope.$index, scope.row)"
              type="primary"
              size="default"
            >
              {{ t('operation.edit') }}
            </el-button>
            <el-button
              @click="handleVisualRow(scope.$index, scope.row)"
              type="primary"
              size="default"
            >
              {{ t('operation.detil') }}
            </el-button>
            <el-button type="danger" size="default">{{ t('operation.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped lang="scss">
#DataStructure {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .toolbar {
    height: var(--header-height);
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
}
</style>
