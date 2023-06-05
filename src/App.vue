<template>
  <link rel="stylesheet" :href="'/theme/' + mainState.theme + '.css'" />
  <router-view />
</template>
<script lang="ts" setup>
import { MainStore } from './store';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
const route = useRoute();
const mainState = MainStore();
const darkval = ref('');
mainState.init();
watch(
  () => mainState.uiText.sider,
  (d, p) => {
    setTitle(route.path, mainState.uiText.sider);
  }
);
watch(
  () => route.path,
  (d, p) => {
    if (mainState.uiText.sider) {
      setTitle(route.path, mainState.uiText.sider);
    }
  }
);
onMounted(async () => {
  darkval.value = (await dark()).default;
  console.log(darkval);
});
const dark = () => import('element-plus/theme-chalk/dark/css-vars.css');
// console.log(await dark);
function setTitle(path: string, sider: any = {}) {
  let title = sider;
  try {
    let names = path.substring(1).split('/');
    for (let i = 0; i < names.length; i++) {
      if (title[names[i]]) {
        if (names[i + 1]) {
          title = title[names[i]].children;
        } else {
          title = title[names[i]];
        }
      } else {
        title = { text: names[names.length - 1] };
      }
    }
  } catch (error: any) {
    console.log(error.message);
  }
  document.title = title?.text || 'absurd.vip';
}
</script>
