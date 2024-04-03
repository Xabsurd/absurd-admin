import { defineStore } from 'pinia';
import { getItem, setItem } from '../utils/localStorage';
let setting = getItem('setting');
if (!setting) {
  setting = { language: 'zh-cn', theme: 'light' };
  setItem({
    name: 'setting',
    value: setting
  });
}

export const useMainStore = defineStore('MainStore', {
  state() {
    return {
      pageLoading: false,
      routerLoading: false
    };
  },
  getters: {},
  actions: {}
});
// const mainState = MainStore();
