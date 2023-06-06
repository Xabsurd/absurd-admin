import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router';
import menuMap, { type MenuMap } from './menuMap';

const routerMap = setRouter(menuMap);
function setRouter(data: Array<MenuMap>): RouteRecordRaw[] {
  const arr: RouteRecordRaw[] = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.icon) {
      delete element.icon;
    }
    arr.push(element);
    if (element.children) {
      arr[arr.length - 1].children = setRouter(element.children);
    }
  }
  return arr;
}
// console.log(routerMap);
const routes = [
  {
    path: '/',
    name: 'base',
    component: () => import('../views/layout/Layout.vue'),
    children: [
      ...routerMap,
      ...[
        { path: '/:pathMatch(.*)', component: () => import('../views/error/404.vue') },
        { path: '/404', component: () => import('../views/error/404.vue') }
      ]
    ]
  }
];

const router = createRouter({
  // history: createWebHistory('/'),
  history: createWebHashHistory('/'),
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({ path: '/home' });
  } else {
    next();
  }
});

export default router;
