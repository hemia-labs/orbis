<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-vue-next'

import logoUrl from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useLogin } from '@/composables/auth/useLogin'

const showPassword = ref(false)
const { v$, isLoading, errorMessage, login } = useLogin()

const emailErrors = computed(() =>
  v$.value.email.$errors.map((error) => ({ message: String(error.$message) })),
)
const passwordErrors = computed(() =>
  v$.value.password.$errors.map((error) => ({ message: String(error.$message) })),
)

async function handleSubmit() {
  v$.value.$touch()
  await login()
}
</script>

<template>
  <div class="mx-auto w-full">
    <RouterLink to="/" class="mb-10 flex items-center justify-center lg:hidden">
      <img :src="logoUrl" alt="Orbis" class="h-10 w-auto object-contain">
    </RouterLink>

    <div class="mb-8 text-center sm:text-left">
      <p class="text-sm font-medium text-primary">Bienvenido de vuelta</p>
      <h1 class="mt-2 text-3xl font-semibold tracking-normal text-foreground">Inicia sesion en Orbis</h1>
      <p class="mt-3 text-sm leading-6 text-muted-foreground">
        Accede a tu workspace para gestionar tokens, temas y sincronizaciones.
      </p>
    </div>

    <form class="grid gap-5" @submit.prevent="handleSubmit">
      <Field orientation="vertical">
        <FieldLabel class="text-foreground">Email</FieldLabel>
        <FieldContent>
          <div class="relative">
            <Mail class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              v-model="v$.email.$model"
              class="h-11 pl-9 text-foreground placeholder:text-muted-foreground"
              type="email"
              autocomplete="email"
              placeholder="tu@email.com"
              :aria-invalid="v$.email.$error"
            />
          </div>
          <FieldError v-if="v$.email.$error" class="text-left" :errors="emailErrors" />
        </FieldContent>
      </Field>

      <Field orientation="vertical">
        <div class="flex items-center justify-between gap-3">
          <FieldLabel class="text-foreground">Password</FieldLabel>
          <RouterLink to="/login" class="text-sm font-medium text-primary underline-offset-4 hover:underline">
            Olvide mi contrasena
          </RouterLink>
        </div>
        <FieldContent>
          <div class="relative">
            <LockKeyhole class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              v-model="v$.password.$model"
              class="h-11 pl-9 pr-10 text-foreground placeholder:text-muted-foreground"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Ingresa tu contrasena"
              :aria-invalid="v$.password.$error"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              class="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" />
              <Eye v-else />
              <span class="sr-only">Mostrar password</span>
            </Button>
          </div>
          <FieldError v-if="v$.password.$error" class="text-left" :errors="passwordErrors" />
        </FieldContent>
      </Field>

      <div class="flex items-center justify-between gap-3">
        <label class="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox v-model="v$.rememberMe.$model" />
          Recordar sesion
        </label>
      </div>

      <p v-if="errorMessage" class="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        {{ errorMessage }}
      </p>

      <Button type="submit" class="h-11 w-full" :disabled="isLoading">
        {{ isLoading ? 'Iniciando sesion...' : 'Iniciar sesion' }}
        <ArrowRight />
      </Button>
    </form>

    <div class="my-6 flex items-center gap-3">
      <Separator class="flex-1" />
      <span class="text-xs font-medium uppercase text-muted-foreground">o</span>
      <Separator class="flex-1" />
    </div>

    <Button variant="outline" class="h-11 w-full">
      Continuar con SSO
    </Button>

    <p class="mt-6 text-center text-sm text-muted-foreground">
      No tienes cuenta?
      <RouterLink to="/register" class="font-medium text-foreground underline-offset-4 hover:underline">
        Registrate
      </RouterLink>
    </p>
  </div>
</template>
