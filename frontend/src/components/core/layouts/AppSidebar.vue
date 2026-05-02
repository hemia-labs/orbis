<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import {
  Boxes,
  GitPullRequestArrow,
  Home,
  Layers3,
  Palette,
  Settings,
  Users,
} from 'lucide-vue-next'

import logoUrl from '@/assets/logo.png'
import symbolUrl from '@/assets/simbolo.png'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const route = useRoute()

const mainNavigation = [
  { title: 'Inicio', to: '/', icon: Home },
  { title: 'Proyectos', to: '/projects', icon: Boxes },
  { title: 'Tokens', to: '/tokens', icon: Layers3 },
  { title: 'Temas', to: '/themes', icon: Palette },
  { title: 'Merge requests', to: '/merge-requests', icon: GitPullRequestArrow },
]

const workspaceNavigation = [
  { title: 'Equipo', to: '/team', icon: Users },
  { title: 'Ajustes', to: '/settings', icon: Settings },
]

function isActive(path: string) {
  return path === '/' ? route.path === path : route.path.startsWith(path)
}
</script>

<template>
  <Sidebar collapsible="icon" variant="sidebar">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child tooltip="Orbis">
            <RouterLink to="/" class="justify-start">
              <img
                :src="symbolUrl"
                alt="Orbis"
                class="hidden size-9 object-contain group-data-[collapsible=icon]:block"
              >
              <img
                :src="logoUrl"
                alt="Orbis"
                class="h-8 w-auto object-contain group-data-[collapsible=icon]:hidden"
              >
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Producto</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in mainNavigation" :key="item.to">
              <SidebarMenuButton as-child :is-active="isActive(item.to)" :tooltip="item.title">
                <RouterLink :to="item.to">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Administracion</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in workspaceNavigation" :key="item.to">
              <SidebarMenuButton as-child :is-active="isActive(item.to)" :tooltip="item.title">
                <RouterLink :to="item.to">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

  </Sidebar>
</template>
