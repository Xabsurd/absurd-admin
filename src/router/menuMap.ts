import type { RouteRecordRaw } from 'vue-router';

export type MenuMap = {
  icon?: string;
} & RouteRecordRaw;
const menuMap: MenuMap[] = [
  {
    path: '/home',
    name: 'home',
    icon: 'icon-home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    icon: 'icon-setting',
    component: () => import('../views/setting/Setting.vue')
  },
  {
    path: '/codeGen',
    name: 'codeGen',
    icon: 'icon-setting',
    component: () => import('../views/codeGen/CodeGen.vue')
  }
];
export default menuMap;
