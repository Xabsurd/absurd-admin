<script setup lang="ts">
import { getDashboardData } from '@/api/staticData';
import type { MessageSchema } from '@/types/schema';
import type { Dashboard } from '@/types/staticData';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import DynamicButtons from '@/components/button/DynamicButtons.vue';
const { t } = useI18n<{ message: MessageSchema }>();
const state = reactive<{
  dashboard: Dashboard | null;
}>({
  dashboard: null
});
getDashboardData().then((res) => {
  initChart(res.data);
});
function initChart(data: Dashboard) {
  state.dashboard = data;
}
</script>
<template>
  <div id="Home">
    <!-- <div>{{ state.dashboard }}</div> -->
    <div class="dashboard">
      <el-row :gutter="24">
        <el-col :span="6" :md="6" :sm="12" :xs="12">
          <DynamicButtons class="total-cell large">
            {{ state.dashboard?.total.total }}
          </DynamicButtons>
        </el-col>
        <el-col :span="6" :md="6" :sm="12" :xs="12">
          <DynamicButtons class="total-cell large success">
            {{ state.dashboard?.total.comment }}
          </DynamicButtons>
        </el-col>
        <el-col :span="6" :md="6" :sm="12" :xs="12">
          <DynamicButtons class="total-cell large warning">
            {{ state.dashboard?.total.files }}
          </DynamicButtons>
        </el-col>
        <el-col :span="6" :md="6" :sm="12" :xs="12">
          <DynamicButtons class="total-cell large danger">
            {{ state.dashboard?.total.code }}
          </DynamicButtons>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped lang="scss">
#Home {
  width: 100%;
  height: 100%;
  .dashboard {
    margin: 0 2rem;
    .total-cell {
      padding: 2rem;
      width: 100%;
      margin-top: 2rem;
      // &.total-line {
      //   background-image: linear-gradient(90deg, rgb(0, 81, 255), rgb(60, 255, 0));
      // }
      // &.total-comment {
      //   background-color: var(--el-color-info);
      // }
      // &.total-files {
      //   background-color: var(--el-color-success);
      // }
      // &.total-code {
      //   background-color: var(--el-color-warning-light-9);
      // }
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      border: 1px solid var(--el-border-color);
    }
  }
}
</style>
