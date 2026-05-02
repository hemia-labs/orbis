<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import {
  Bell,
  LogOut,
  Search,
  Settings,
  User,
} from 'lucide-vue-next'

import AppSidebar from './AppSidebar.vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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

const route = useRoute()
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
              <Button variant="ghost" size="icon" class="size-10 rounded-full">
                <Avatar class="size-9">
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <span class="sr-only">Abrir menu de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56">
              <DropdownMenuLabel>
                <div class="grid gap-0.5">
                  <span>Cristian Mendez</span>
                  <span class="text-xs font-normal text-muted-foreground">Admin</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Ajustes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
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
