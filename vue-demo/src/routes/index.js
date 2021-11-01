// import Vue from 'vue'
// import Router from 'vue-router'

import BasicLayout from '../layout/BasicLayout';

// 解决不需要每个vue文件都需要手动引入，按需加载需手动引入
// let routes = [];
// const files = require.context('../views', false, /\.vue/);
// console.dir(files);
// console.log(files.keys());

// files.keys().forEach(file => {
//   console.log(files(file).default);
//   let path = file.split('.')[1];
//   routes.push({
//     path,
//     component: files(file).default
//   })
// })

// console.log(routes);

// Vue.use(Router)

const routes = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@/views/index')
      }
    ]
  },
  {
    path: '/permission',
    component: BasicLayout,
    children: [
      {
        path: '',
        name: 'permission',
        permission: '10',
        component: () => import('@/views/permission')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/404')
  }
]

export default routes