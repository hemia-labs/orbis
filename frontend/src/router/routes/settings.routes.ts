import type { RouteRecordRaw } from 'vue-router'
import { routePermissions } from '@/router/route-permissions'
import PlaceholderView from '@/views/private/PlaceholderView.vue'

export const settingsRoutes: RouteRecordRaw[] = [
  {
    path: 'settings',
    name: 'settings',
    component: PlaceholderView,
    meta: { title: 'Ajustes', permissions: routePermissions.settings },
  },
]
