import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: 'login',
    component: LoginView,
    meta: { guest: true, title: 'Login' },
  },
  {
    path: 'register',
    name: 'register',
    component: RegisterView,
    meta: { guest: true, title: 'Registro' },
  },
]
