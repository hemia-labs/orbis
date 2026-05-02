import { createRouter, createWebHistory } from 'vue-router'
import PrivateLayout from '@/components/core/layouts/PrivateLayout.vue'
import PublicLayout from '@/components/core/layouts/PublicLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import PlaceholderView from '@/views/private/PlaceholderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: PrivateLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: { title: 'Inicio' },
        },
        {
          path: 'projects',
          name: 'projects',
          component: PlaceholderView,
          meta: { title: 'Proyectos' },
        },
        {
          path: 'tokens',
          name: 'tokens',
          component: PlaceholderView,
          meta: { title: 'Tokens' },
        },
        {
          path: 'themes',
          name: 'themes',
          component: PlaceholderView,
          meta: { title: 'Temas' },
        },
        {
          path: 'merge-requests',
          name: 'merge-requests',
          component: PlaceholderView,
          meta: { title: 'Merge requests' },
        },
        {
          path: 'team',
          name: 'team',
          component: PlaceholderView,
          meta: { title: 'Equipo' },
        },
        {
          path: 'settings',
          name: 'settings',
          component: PlaceholderView,
          meta: { title: 'Ajustes' },
        },
      ],
    },
    {
      path: '/',
      component: PublicLayout,
      children: [
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
      ],
    },
  ],
})

export default router
