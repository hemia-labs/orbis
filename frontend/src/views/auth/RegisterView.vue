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
      <p class="text-sm font-medium text-muted-foreground">Crea tu workspace</p>
      <h1 class="mt-2 text-3xl font-semibold tracking-normal">Registro</h1>
    </div>

    <form class="grid gap-5">
      <div class="grid gap-2">
        <Label for="name">Nombre</Label>
        <Input id="name" autocomplete="name" placeholder="Cristian Mendez" />
      </div>

      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" autocomplete="email" placeholder="tu@email.com" />
      </div>

      <div class="grid gap-2">
        <Label for="password">Password</Label>
        <Input id="password" type="password" autocomplete="new-password" />
      </div>

      <Button type="submit" class="w-full">
        Crear cuenta
        <ArrowRight />
      </Button>
    </form>

    <p class="mt-6 text-center text-sm text-muted-foreground">
      Ya tienes cuenta?
      <RouterLink to="/login" class="font-medium text-foreground underline-offset-4 hover:underline">
        Inicia sesion
      </RouterLink>
    </p>
  </div>
</template>
