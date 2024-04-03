<script setup lang="ts">
import Loading from '@/components/status/Loading.vue';
import SkeletonLoading from '@/components/status/SkeletonLoading.vue';
import { useMainStore } from './stores';
const mainStore = useMainStore();
//5秒后关闭loading
setTimeout(() => {
  mainStore.pageLoading = false;
}, 3000);
</script>

<template>
  <RouterView />
  <div class="app-loading" v-show="mainStore.pageLoading">
    <Loading />
    <!-- <SkeletonLoading></SkeletonLoading> -->
  </div>
</template>

<style scoped lang="scss">
.app-loading {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: var(--content-bg-color);
  z-index: 2333;
}
</style>
