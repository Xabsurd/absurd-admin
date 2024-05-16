<script setup lang="ts">
import { getDashboardData } from '@/api/staticData';
import type { MessageSchema } from '@/types/schema';
import type { Dashboard } from '@/types/staticData';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n<{ message: MessageSchema }>();
const state = reactive({});
getDashboardData().then((res) => {
  console.log(res);
  initChart(res.data);
});
function initChart(data: Dashboard) {}
</script>
<template>
  <div id="Home">
    <div>{{ t('home') }}</div>
  </div>
</template>
<style scoped lang="scss">
#Home {
  width: 100%;
  height: 100%;
}
</style>
