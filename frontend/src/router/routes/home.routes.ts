import type { RouteRecordRaw } from 'vue-router'
import { routePermissions } from '@/router/route-permissions'
import HomeView from '@/views/HomeView.vue'

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'home',
    component: HomeView,
    meta: { title: 'Inicio', permissions: routePermissions.home },
  },
]
