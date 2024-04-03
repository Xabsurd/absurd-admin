<script setup lang="ts">
import type { MessageSchema } from '@/locales/schema';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n<{ message: MessageSchema }>();
const state = reactive({});
</script>
<template>
  <div id="Home">
    <div>{{ t('home') }}</div>
    <div>{{ t('workshop.sub_title') }}</div>
  </div>
</template>
<style scoped lang="scss">
#Home {
  width: 100%;
  height: 100%;
}
</style>
