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
  },
  {
    path: '/charts',
    icon: 'icon-barchart',
    name: 'charts',
    children: [
      {
        path: 'line',
        name: 'charts-line',
        children: [
          {
            path: 'simple-line',
            name: 'charts-line-simple-line',
            component: () => import('../views/charts/lines/SimpleLine.vue')
          },
          {
            path: 'function',
            name: 'charts-line-function',
            component: () => import('../views/charts/lines/FunctionLine.vue')
          },
          {
            path: '3n+1',
            name: 'charts-line-3n+1',
            component: () => import('../views/charts/lines/3N+1.vue')
          }
        ]
      }

      // {
      //   path: 'home-loans',
      //   component: () => import('../views/charts/lines/HomeLoans.vue'),
      // },
    ]
  }
];
export default menuMap;
