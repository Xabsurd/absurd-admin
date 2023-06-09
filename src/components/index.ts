import ToHeader from './ToHeader.vue';
import { type App } from 'vue';
export default {
  install: (app: App) => {
    app.component('to-header', ToHeader);
  }
};
