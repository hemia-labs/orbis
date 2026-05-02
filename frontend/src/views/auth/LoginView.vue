<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div>
    <div class="mb-8">
      <p class="text-sm font-medium text-muted-foreground">Bienvenido de vuelta</p>
      <h1 class="mt-2 text-3xl font-semibold tracking-normal">Inicia sesion</h1>
    </div>

    <form class="grid gap-5">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" autocomplete="email" placeholder="tu@email.com" />
      </div>

      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" autocomplete="current-password" />
      </div>

      <Button type="submit" class="w-full">
        Entrar
        <ArrowRight />
      </Button>
    </form>

    <p class="mt-6 text-center text-sm text-muted-foreground">
      No tienes cuenta?
      <RouterLink to="/register" class="font-medium text-foreground underline-offset-4 hover:underline">
        Registrate
      </RouterLink>
    </p>
  </div>
</template>
