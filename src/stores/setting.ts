import { defineStore } from 'pinia';
import { getItem, setItem } from '../utils/localStorage';
import { setupI18n, setI18nLanguage, loadLocaleMessages, SUPPORT_LOCALES } from '@/locales/i18n';
let setting = getItem('setting');
if (!setting) {
  setting = { language: 'zh', theme: 'light' };
  setItem({
    name: 'setting',
    value: setting
  });
}
if (!SUPPORT_LOCALES.includes(setting.language)) {
  setting.language = 'zh';
}
export const i18n = setupI18n({ locale: setting.language });
async function initI18n() {
  await loadLocaleMessages(i18n, setting.language);
  setI18nLanguage(i18n, setting.language);
}
initI18n();
export const useSettingStore = defineStore('SettingStore', {
  state() {
    return {
      language: setting.language,
      menuCollapse: false,
      fullScreen: 0 //0正常|1网页全屏|2全屏内容|3全屏网页
    };
  },
  getters: {},
  actions: {
    async changeLanguage(lang: 'zh' | 'en') {
      if (
        SUPPORT_LOCALES.includes(setting.language) &&
        !i18n.global.availableLocales.includes(lang)
      ) {
        await loadLocaleMessages(i18n, lang);
      }
      setI18nLanguage(i18n, lang);
    }
  }
});
// const mainState = MainStore();
