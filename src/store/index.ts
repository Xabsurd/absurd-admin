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

export const MainStore = defineStore('MainStore', {
  state() {
    return {
      uiText: {} as UIText,
      // uiText: require(`../language/${setting.language}.js`).default,
      fullScreen: 0, //0正常|1网页全屏|2全屏内容|3全屏网页
      language: setting.language,
      menuCollapse: false,
      theme: setting.theme ? setting.theme : 'light'
    };
  },
  getters: {},
  actions: {
    async changeLanguage(value: string) {
      // this.uiText
      this.language = value;
      setting.language = value;
      setItem({ name: 'setting', value: setting });
      import(`../language/${value}.ts`).then((data) => {
        this.uiText = data.default;
      });
    },
    async changeTheme(value: string) {
      this.theme = value;
      setting.theme = value;
      setItem({ name: 'setting', value: setting });
    },
    async init() {
      import(`../language/${setting.language}.ts`).then((data) => {
        this.uiText = data.default;
      });
    }
  }
});
// const mainState = MainStore();