import './assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { i18n } from './stores/setting';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(ElementPlus);
app.mount('#app');
