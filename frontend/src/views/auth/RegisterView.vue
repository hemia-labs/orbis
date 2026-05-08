<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-vue-next'

import logoUrl from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const showPassword = ref(false)
const showPasswordConfirmation = ref(false)
</script>

<template>
  <div class="mx-auto w-full">
    <div class="rounded-xl border border-white/70 bg-white/88 px-8 py-12 shadow-[0_24px_80px_rgba(15,23,42,0.14)] backdrop-blur-md sm:px-12 sm:py-14 md:px-16">
      <RouterLink to="/" class="mb-10 flex items-center justify-center lg:hidden">
        <img :src="logoUrl" alt="Orbis" class="h-11 w-auto object-contain">
      </RouterLink>

      <div class="mb-10 text-center">
        <h1 class="text-3xl font-bold tracking-normal text-[#07112d]">Crear cuenta</h1>
        <p class="mt-4 text-sm leading-6 text-[#415070]">
          Configura tu workspace para comenzar
        </p>
      </div>

      <form class="grid gap-6">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="grid gap-2">
            <Label for="name" class="text-sm font-medium text-[#07112d]">Nombre</Label>
            <div class="relative">
              <User class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#617092]" />
              <Input
                id="name"
                class="h-12 rounded-md border-slate-300 bg-white pl-12 text-[#07112d] shadow-none placeholder:text-[#7c89a6] focus-visible:border-[#1473ff] focus-visible:ring-[#1473ff]/15"
                autocomplete="given-name"
                placeholder="Cristian"
              />
            </div>
          </div>

          <div class="grid gap-2">
            <Label for="last-name" class="text-sm font-medium text-[#07112d]">Apellido</Label>
            <div class="relative">
              <User class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#617092]" />
              <Input
                id="last-name"
                class="h-12 rounded-md border-slate-300 bg-white pl-12 text-[#07112d] shadow-none placeholder:text-[#7c89a6] focus-visible:border-[#1473ff] focus-visible:ring-[#1473ff]/15"
                autocomplete="family-name"
                placeholder="Mendez"
              />
            </div>
          </div>
        </div>

        <div class="grid gap-2">
          <Label for="email" class="text-sm font-medium text-[#07112d]">Correo electronico</Label>
          <div class="relative">
            <Mail class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#617092]" />
            <Input
              id="email"
              class="h-12 rounded-md border-slate-300 bg-white pl-12 text-[#07112d] shadow-none placeholder:text-[#7c89a6] focus-visible:border-[#1473ff] focus-visible:ring-[#1473ff]/15"
              type="email"
              autocomplete="email"
              placeholder="ejemplo@empresa.com"
            />
          </div>
        </div>

        <div class="grid gap-2">
          <Label for="password" class="text-sm font-medium text-[#07112d]">Contrasena</Label>
          <div class="relative">
            <LockKeyhole class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#617092]" />
            <Input
              id="password"
              class="h-12 rounded-md border-slate-300 bg-white pl-12 pr-12 text-[#07112d] shadow-none placeholder:text-[#7c89a6] focus-visible:border-[#1473ff] focus-visible:ring-[#1473ff]/15"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Crea una contrasena"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              class="absolute right-2 top-1/2 size-8 -translate-y-1/2 text-[#617092] hover:bg-transparent hover:text-[#07112d]"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" />
              <Eye v-else />
              <span class="sr-only">Mostrar contrasena</span>
            </Button>
          </div>
        </div>

        <div class="grid gap-2">
          <Label for="password-confirmation" class="text-sm font-medium text-[#07112d]">Repite contrasena</Label>
          <div class="relative">
            <LockKeyhole class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#617092]" />
            <Input
              id="password-confirmation"
              class="h-12 rounded-md border-slate-300 bg-white pl-12 pr-12 text-[#07112d] shadow-none placeholder:text-[#7c89a6] focus-visible:border-[#1473ff] focus-visible:ring-[#1473ff]/15"
              :type="showPasswordConfirmation ? 'text' : 'password'"
              autocomplete="new-password"
              placeholder="Repite tu contrasena"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              class="absolute right-2 top-1/2 size-8 -translate-y-1/2 text-[#617092] hover:bg-transparent hover:text-[#07112d]"
              @click="showPasswordConfirmation = !showPasswordConfirmation"
            >
              <EyeOff v-if="showPasswordConfirmation" />
              <Eye v-else />
              <span class="sr-only">Mostrar confirmacion de contrasena</span>
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          class="h-12 w-full rounded-md bg-[#1473ff] text-sm font-semibold text-white shadow-[0_10px_22px_rgba(20,115,255,0.18)] hover:bg-[#0865ed]"
        >
          Crear cuenta
        </Button>
      </form>

      <p class="mt-9 text-center text-sm text-[#52617f]">
        Ya tienes cuenta?
        <RouterLink to="/login" class="font-semibold text-[#006eff] underline-offset-4 hover:underline">
          Inicia sesion
        </RouterLink>
      </p>
    </div>
  </div>
</template>
