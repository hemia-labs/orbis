import type { RouteRecordRaw } from 'vue-router'
import { routePermissions } from '@/router/route-permissions'
import PlaceholderView from '@/views/private/PlaceholderView.vue'

export const mergeRequestRoutes: RouteRecordRaw[] = [
  {
    path: 'merge-requests',
    name: 'merge-requests',
    component: PlaceholderView,
    meta: { title: 'Merge requests', permissions: routePermissions.mergeRequests },
  },
]
