import { createRouter, createWebHistory } from 'vue-router'
import PrivateLayout from '@/components/core/layouts/PrivateLayout.vue'
import PublicLayout from '@/components/core/layouts/PublicLayout.vue'
import { authRoutes } from '@/router/routes/auth.routes'
import { privateRoutes } from '@/router/routes/private.routes'
import { useAuthStore } from '@/stores'
import AuthService from '@/services/auth/auth.service'
import { can, type PermissionRequirement } from '@/lib/authz'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PrivateLayout,
      meta: { requiresAuth: true },
      children: privateRoutes,
    },
    {
      path: '/',
      component: PublicLayout,
      children: authRoutes,
    },
  ],
})


router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const authService = new AuthService()
  const isGuestRoute = Boolean(to.meta.guest)
  const requiresAuth = Boolean(to.meta.requiresAuth)
  const hasRouteAccess = () => {
    const permissions = authStore.currentUser?.membership?.permissions ?? []
    const routePermissions = to.meta.permissions as PermissionRequirement | undefined

    return can(permissions, routePermissions)
  }

  const authenticate = async () => {
    if (authStore.isAuthenticated) {
      return true
    }

    try {
      const authSession = await authService.me()
      authStore.setUser(authSession)
      return true
    } catch {
      authStore.clearUser()
      return false
    }
  }

  const isAuthenticated = await authenticate()

  if (isGuestRoute) {
    return isAuthenticated ? { path: '/' } : true
  }

  if (!requiresAuth) {
    return true
  }

  if (!isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  return hasRouteAccess() ? true : { path: '/' }
})

export default router
