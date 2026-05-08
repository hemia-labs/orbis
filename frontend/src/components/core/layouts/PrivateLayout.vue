<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import {
  Bell,
  Building2,
  LogOut,
  Search,
  Settings,
  User,
} from 'lucide-vue-next'

import AppSidebar from './AppSidebar.vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import AuthService from '@/services/auth/auth.service'
import { useAuthStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const authService = new AuthService()

const currentUser = computed(() => authStore.currentUser)
const profile = computed(() => currentUser.value?.user)
const membership = computed(() => currentUser.value?.membership)
const userName = computed(() => profile.value?.name || 'Usuario')
const userEmail = computed(() => profile.value?.email || 'Sin correo')
const organizationName = computed(() => membership.value?.organization.name || 'Sin organizacion')
const roleName = computed(() => formatRole(membership.value?.roles?.[0]))
const userInitials = computed(() => getInitials(userName.value, userEmail.value))

function getInitials(name: string, email: string) {
  const source = name.trim() || email.split('@')[0] || 'Usuario'
  const words = source.split(/\s+/).filter(Boolean)
  const initials = words.length > 1 ? `${words[0]?.[0] ?? ''}${words[1]?.[0] ?? ''}` : (source[0] ?? 'U')

  return initials.toUpperCase()
}

function formatRole(role?: string) {
  if (!role) {
    return 'Sin rol'
  }

  return role
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

async function logout() {
  try {
    await authService.logout()
  } finally {
    authStore.clearUser()
    await router.push({ name: 'login' })
  }
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <SidebarTrigger
        class="absolute left-0 top-6 z-20 size-7 -translate-x-1/2 rounded-full border bg-background text-muted-foreground shadow-xs hover:text-foreground"
      />

      <header class="flex min-h-20 shrink-0 items-center gap-4 bg-background px-5 py-3">
        <div class="min-w-0">
          <h1 class="truncate text-2xl font-semibold tracking-normal">
            {{ route.meta.title ?? 'Inicio' }}
          </h1>
          <Breadcrumb class="mt-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <span class="text-muted-foreground">Dashboard</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{{ route.meta.title ?? 'Inicio' }}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div class="ml-auto flex min-w-0 items-center gap-2">
          <div class="relative hidden w-[min(18rem,28vw)] lg:block">
            <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tokens..."
              class="h-10 rounded-md border-border bg-background pl-9 pr-10 shadow-none"
            />
            <kbd class="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground xl:block">
              ⌘K
            </kbd>
          </div>

          <Button variant="ghost" size="icon" class="size-10 rounded-full">
            <Bell />
            <span class="sr-only">Notificaciones</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                class="size-10 rounded-full hover:bg-muted"
              >
                <Avatar class="size-9 border border-border">
                  <AvatarFallback class="bg-muted text-xs font-semibold text-muted-foreground">
                    {{ userInitials }}
                  </AvatarFallback>
                </Avatar>
                <span class="sr-only">Abrir menu de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-80 p-0">
              <DropdownMenuLabel class="p-0">
                <div class="border-b bg-muted/35 p-4">
                  <div class="flex items-start gap-3">
                    <Avatar class="size-11 border border-border">
                      <AvatarFallback class="bg-muted text-sm font-semibold text-muted-foreground">
                        {{ userInitials }}
                      </AvatarFallback>
                    </Avatar>

                    <div class="min-w-0 flex-1">
                      <div class="flex min-w-0 items-center gap-2">
                        <p class="truncate text-sm font-semibold text-foreground">{{ userName }}</p>
                        <Badge variant="outline" class="shrink-0 text-[11px]">
                          {{ roleName }}
                        </Badge>
                      </div>
                      <p class="mt-1 truncate text-xs font-normal text-muted-foreground">
                        {{ userEmail }}
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <div class="p-2">
                <div class="flex items-center gap-3 rounded-md px-2 py-2.5">
                  <div class="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Building2 class="size-4" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-xs font-normal text-muted-foreground">Organizacion</p>
                    <p class="truncate text-sm font-medium">{{ organizationName }}</p>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />
              <div class="p-1">
                <DropdownMenuItem>
                  <User />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Ajustes
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" class="m-1" @select="logout">
                <LogOut />
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div class="flex min-h-0 flex-1 flex-col bg-muted/25">
        <RouterView />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
