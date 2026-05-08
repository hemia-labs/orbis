import type { RouteRecordRaw } from 'vue-router'
import { routePermissions } from '@/router/route-permissions'
import PlaceholderView from '@/views/private/PlaceholderView.vue'

export const themeRoutes: RouteRecordRaw[] = [
  {
    path: 'themes',
    name: 'themes',
    component: PlaceholderView,
    meta: { title: 'Temas', permissions: routePermissions.themes },
  },
]
