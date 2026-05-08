import type { RouteRecordRaw } from 'vue-router'
import { routePermissions } from '@/router/route-permissions'
import PlaceholderView from '@/views/private/PlaceholderView.vue'

export const projectRoutes: RouteRecordRaw[] = [
  {
    path: 'projects',
    name: 'projects',
    component: PlaceholderView,
    meta: { title: 'Proyectos', permissions: routePermissions.projects },
  },
]
