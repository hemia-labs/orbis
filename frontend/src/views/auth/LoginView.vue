<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-vue-next'

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
  <div class="login-shell mx-auto flex max-h-full w-full flex-col justify-center overflow-visible">
    <div class="login-elevation relative">
      <div class="login-card relative z-10 rounded-xl border border-white bg-white px-6 py-8 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_16px_50px_rgba(15,23,42,0.12)] sm:px-12 sm:py-14 md:px-16">
      <RouterLink to="/" class="login-logo mb-6 flex items-center justify-center sm:mb-12 lg:hidden">
        <img :src="logoUrl" alt="Orbis" class="h-9 w-auto object-contain sm:h-11">
      </RouterLink>

      <div class="login-heading mb-7 text-center sm:mb-10">
        <h1 class="text-2xl font-bold tracking-normal text-[#07112d] sm:text-3xl">Iniciar sesion</h1>
        <p class="mt-2 text-sm leading-6 text-[#415070] sm:mt-4">
          Accede a tu cuenta para continuar
        </p>
      </div>

      <form class="login-form grid gap-5" @submit.prevent="handleSubmit">
        <Field orientation="vertical" class="gap-2">
          <FieldLabel class="text-sm font-medium text-[#07112d]">Correo electronico</FieldLabel>
          <FieldContent>
            <div class="relative">
              <Mail class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#617092]" />
              <Input
                id="email"
                v-model="v$.email.$model"
                class="h-10 rounded-md border-slate-300 bg-white pl-12 text-[#07112d] shadow-none placeholder:text-[#7c89a6] focus-visible:border-[#1473ff] focus-visible:ring-[#1473ff]/15 sm:h-12"
                type="email"
                autocomplete="email"
                placeholder="ejemplo@empresa.com"
                :aria-invalid="v$.email.$error"
              />
            </div>
            <FieldError v-if="v$.email.$error" class="text-left" :errors="emailErrors" />
          </FieldContent>
        </Field>

        <Field orientation="vertical" class="gap-2">
          <FieldLabel class="text-sm font-medium text-[#07112d]">Contrasena</FieldLabel>
          <FieldContent>
            <div class="relative">
              <LockKeyhole class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#617092]" />
              <Input
                id="password"
                v-model="v$.password.$model"
                class="h-10 rounded-md border-slate-300 bg-white pl-12 pr-12 text-[#07112d] shadow-none placeholder:text-[#7c89a6] focus-visible:border-[#1473ff] focus-visible:ring-[#1473ff]/15 sm:h-12"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Ingresa tu contrasena"
                :aria-invalid="v$.password.$error"
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
                <span class="sr-only">Mostrar password</span>
              </Button>
            </div>
            <FieldError v-if="v$.password.$error" class="text-left" :errors="passwordErrors" />
          </FieldContent>
        </Field>

        <div class="flex items-center justify-between gap-3">
          <label class="flex items-center gap-3 text-sm font-medium text-[#07112d]">
            <Checkbox v-model="v$.rememberMe.$model" class="border-[#1473ff] data-[state=checked]:border-[#1473ff] data-[state=checked]:bg-[#1473ff]" />
            Recordarme
          </label>
          <RouterLink to="/login" class="shrink-0 text-sm font-semibold text-[#006eff] underline-offset-4 hover:underline">
            Olvidaste tu contrasena?
          </RouterLink>
        </div>

        <p v-if="errorMessage" class="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {{ errorMessage }}
        </p>

        <Button
          type="submit"
          class="h-10 w-full rounded-md bg-[#1473ff] text-sm font-semibold text-white shadow-[0_10px_22px_rgba(20,115,255,0.18)] hover:bg-[#0865ed] sm:h-12"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Iniciando sesion...' : 'Iniciar sesion' }}
        </Button>
      </form>

      <Button
        type="button"
        variant="outline"
        class="mt-3 h-10 w-full rounded-md border-[#1473ff] bg-white text-sm font-semibold text-[#07112d] shadow-none hover:bg-[#f5f9ff] sm:mt-4 sm:h-12"
      >
        <span class="text-lg font-bold text-[#4285f4]">G</span>
        Continuar con Google
      </Button>

      <div class="login-divider my-5 flex items-center gap-3 sm:my-8">
        <Separator class="flex-1 bg-slate-200" />
        <span class="grid size-8 place-items-center rounded-full border border-slate-200 text-xs font-medium text-[#52617f]">o</span>
        <Separator class="flex-1 bg-slate-200" />
      </div>

      <p class="text-center text-sm text-[#52617f]">
        No tienes cuenta?
        <RouterLink to="/register" class="font-semibold text-[#006eff] underline-offset-4 hover:underline">
          Crear cuenta
        </RouterLink>
      </p>
      </div>
    </div>

    <div class="login-legal mt-9 hidden text-center text-xs leading-6 text-[#33415f] sm:block">
      <p>
        Al iniciar sesion, aceptas nuestros
        <RouterLink to="/login" class="font-medium text-[#006eff] underline-offset-4 hover:underline">
          Terminos de servicio
        </RouterLink>
        y
        <RouterLink to="/login" class="font-medium text-[#006eff] underline-offset-4 hover:underline">
          Politica de privacidad
        </RouterLink>.
      </p>
      <p class="mt-3">© 2024 Orbis. Todos los derechos reservados.</p>
    </div>
  </div>
</template>

<style scoped>
.login-elevation::before {
  position: absolute;
  inset: -34px;
  z-index: 0;
  border-radius: 2rem;
  background:
    radial-gradient(ellipse at center, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.11) 42%, transparent 72%);
  content: "";
  filter: blur(22px);
}

@media (min-width: 640px) and (max-height: 900px) {
  .login-card {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  .login-logo,
  .login-heading {
    margin-bottom: 1.5rem;
  }

  .login-form {
    gap: 1rem;
  }

  .login-divider {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .login-legal {
    margin-top: 1rem;
  }
}

@media (min-width: 640px) and (max-height: 780px) {
  .login-legal {
    display: none;
  }

  .login-card {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .login-logo {
    margin-bottom: 1rem;
  }

  .login-logo img {
    height: 2.25rem;
  }

  .login-heading {
    margin-bottom: 1rem;
  }
}
</style>
