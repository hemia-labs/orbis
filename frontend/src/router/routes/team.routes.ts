import type { RouteRecordRaw } from 'vue-router'
import { routePermissions } from '@/router/route-permissions'
import PlaceholderView from '@/views/private/PlaceholderView.vue'

export const teamRoutes: RouteRecordRaw[] = [
  {
    path: 'team',
    name: 'team',
    component: PlaceholderView,
    meta: { title: 'Equipo', permissions: routePermissions.team },
  },
]
