import type { RouteRecordRaw } from 'vue-router';

export type MenuMap = {
  icon?: string;
} & RouteRecordRaw;
const menuMap: MenuMap[] = [
  {
    path: '/home',
    icon: 'icon-home',
    component: () => import('../views/home/Home.vue')
  },
  //   {
  //     path: "/fund",
  //     icon: "icon-fund",
  //     children: [
  //       {
  //         path: "fund",
  //         component: () => import("../views/fund/Fund.vue"),
  //       },
  //       {
  //         path: "hotmap",
  //         component: () => import("../views/fund/HotMap.vue"),
  //       },
  //     ],
  //   },
  {
    path: '/charts',
    icon: 'icon-barchart',
    children: [
      {
        path: 'line',
        children: [
          {
            path: 'simple-line',
            component: () => import('../views/charts/lines/SimpleLine.vue')
          },
          {
            path: 'function',
            component: () => import('../views/charts/lines/FunctionLine.vue')
          }
        ]
      }

      // {
      //   path: 'home-loans',
      //   component: () => import('../views/charts/lines/HomeLoans.vue'),
      // },
      // {
      //   path: '3n+1',
      //   component: () => import('../views/charts/lines/3N+1.vue'),
      // },
    ]
  },
  //   {
  //     path: "/image",
  //     icon: "icon-image",
  //     children: [
  //       {
  //         path: "slice",
  //         component: () => import("../views/image/Image2Tiles.vue"),
  //       },
  //       {
  //         path: "crop",
  //         component: () => import("../views/image/ImageCrop.vue"),
  //       },
  //       {
  //         path: "view",
  //         component: () => import("../views/image/ImageView.vue"),
  //       },
  //     ],
  //   },
  //   {
  //     path: "/animation",
  //     icon: "icon-donghua",
  //     children: [
  //       {
  //         path: "transition",
  //         children: [
  //           {
  //             path: "fade",
  //             component: () => import("../views/animation/transition/Fade.vue"),
  //             meta: {
  //               transition: "fade",
  //             },
  //           },
  //           {
  //             path: "slide",
  //             component: () => import("../views/animation/transition/Slide.vue"),
  //             meta: {
  //               transition: "slip",
  //             },
  //           },
  //           {
  //             path: "slip",
  //             component: () => import("../views/animation/transition/Slip.vue"),
  //             meta: {
  //               transition: "slide",
  //             },
  //           },
  //         ],
  //       },
  //       {
  //         path: "other",
  //         children: [
  //           {
  //             path: "moving-circle",
  //             component: () => import("../views/animation/other/MovingCircles.vue"),
  //           },
  //         ],
  //       },
  //     ],
  //   },
  {
    path: '/documentation',
    icon: 'icon-edit-square',
    children: [
      // {
      //   path: "edit",
      //   component: () => import("../views/documentation/DocumentEditing.vue"),
      // },
      {
        path: 'monaco',
        component: () => import('../views/documentation/MonacoEditor.vue')
      }
    ]
  },
  {
    path: '/tools',
    icon: 'icon-tools',
    children: [
      // {
      //   path: "random-str",
      //   component: () => import("../views/tools/RandomStr.vue"),
      // },
      // {
      //   path: "all-char",
      //   component: () => import("../views/tools/AllChar.vue"),
      // },
      // {
      //   path: "markdown2html",
      //   component: () => import("../views/tools/Markdown2Html.vue"),
      // },
      {
        path: 'password-generator',
        component: () => import('../views/tools/PasswordGenerator.vue')
      }
    ]
  },
  {
    path: '/game',
    icon: 'icon-game',
    children: [
      {
        path: 'minesweeper',
        children: [
          {
            path: 'normal',
            component: () => import('../views/game/minesweeper/Normal.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/GIS',
    icon: 'icon-gis',
    children: [
      {
        path: 'cesium',
        component: () => import('../views/GIS/cesium/Cesium.vue'),
        meta: {
          animation: false
        },
        children: [
          { path: 'start', component: () => import('../views/GIS/cesium/start/Start.vue') },
          {
            path: 'measurement',
            component: () => import('../views/GIS/cesium/measurement/Measurement.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/webgpu',
    icon: 'icon-heatmap',
    component: () => import('../views/webgpu/Container.vue'),
    children: [
      {
        path: 'learn',
        children: [
          { path: 'triangle', component: () => import('../views/webgpu/learn/Triangle.vue') }
        ]
      }
    ]
  },
  {
    path: 'image',
    icon: 'icon-image',
    children: [
      {
        path: 'pixel',
        component: () => import('../views/image/Pixel.vue')
      }
    ]
  },
  //   {
  //     path: "/controls",
  //     icon: "icon-controls",
  //     children: [
  //       {
  //         path: "navigation",
  //         children: [
  //           {
  //             path: "navigation1",
  //             component: () => import("../views/controls/navigation/Navigation1.vue"),
  //           },
  //         ],
  //       },
  //       {
  //         path: "draw",
  //         children: [
  //           {
  //             path: "over-point-curve",
  //             component: () => import("../views/controls/draw/OverPointCurve.vue"),
  //           },
  //           {
  //             path: "clock",
  //             component: () => import("../views/controls/draw/Clock.vue"),
  //           },
  //         ],
  //       },
  //       {
  //         path: "other",
  //         children: [
  //           {
  //             path: "dm",
  //             component: () => import("../views/controls/other/DM.vue"),
  //           },
  //         ],
  //       },
  //     ],
  //   },
  {
    path: '/setting',
    icon: 'icon-setting',
    component: () => import('../views/setting/Setting.vue')
  }
];
export default menuMap;
