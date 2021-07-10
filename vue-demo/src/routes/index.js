import Vue from 'vue'
import Router from 'vue-router'

import BasicLayout from '../layout/BasicLayout';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
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
})

export default router