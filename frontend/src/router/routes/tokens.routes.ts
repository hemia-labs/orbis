import type { RouteRecordRaw } from 'vue-router'
import { routePermissions } from '@/router/route-permissions'
import PlaceholderView from '@/views/private/PlaceholderView.vue'

export const tokenRoutes: RouteRecordRaw[] = [
  {
    path: 'tokens',
    name: 'tokens',
    component: PlaceholderView,
    meta: { title: 'Tokens', permissions: routePermissions.tokens },
  },
]
