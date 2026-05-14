// src/router/routes.ts
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/ProductView.vue')
  },
  {
    path: '/user/:id',
    name: 'user-detail',
    component: () => import('@/views/UserDetail.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
  }
]

export default routes
