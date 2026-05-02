<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { CheckCircle2, GitPullRequestArrow, Layers3, Palette } from 'lucide-vue-next'

import logoUrl from '@/assets/logo.png'
</script>

<template>
  <main class="grid min-h-svh bg-background lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)]">
    <section class="hidden border-r bg-secondary/70 px-10 py-8 lg:flex lg:flex-col">
      <RouterLink to="/" class="flex items-center">
        <img :src="logoUrl" alt="Orbis" class="h-10 w-auto object-contain">
      </RouterLink>

      <div class="my-auto grid gap-8">
        <div class="max-w-lg">
          <p class="text-sm font-medium text-primary">Design Ops para equipos modernos</p>
          <h1 class="mt-4 text-4xl font-semibold tracking-normal text-foreground">
            Una fuente confiable para tokens, temas y releases.
          </h1>
          <p class="mt-5 text-base leading-7 text-muted-foreground">
            Orbis centraliza decisiones visuales, cambios de tema y flujos de aprobacion para que producto e ingenieria trabajen con el mismo sistema.
          </p>
        </div>

        <div class="grid max-w-xl gap-3">
          <div class="rounded-lg border bg-background p-4 shadow-xs">
            <div class="flex items-center gap-3">
              <span class="grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
                <Layers3 class="size-5" />
              </span>
              <div>
                <p class="font-medium">1,248 tokens sincronizados</p>
                <p class="text-sm text-muted-foreground">Actualizados hace 2 minutos</p>
              </div>
              <CheckCircle2 class="ml-auto size-5 text-primary" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg border bg-background p-4 shadow-xs">
              <Palette class="size-5 text-primary" />
              <p class="mt-4 text-2xl font-semibold">24</p>
              <p class="text-sm text-muted-foreground">Categorias</p>
            </div>
            <div class="rounded-lg border bg-background p-4 shadow-xs">
              <GitPullRequestArrow class="size-5 text-primary" />
              <p class="mt-4 text-2xl font-semibold">3</p>
              <p class="text-sm text-muted-foreground">Cambios pendientes</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-auto rounded-lg border bg-background p-4 shadow-xs">
        <p class="text-sm font-medium">Orbis Design System</p>
        <p class="mt-1 text-sm text-muted-foreground">
          Tokens consistentes para aplicaciones web, mobile y herramientas internas.
        </p>
      </div>
    </section>

    <section class="flex min-h-svh items-center justify-center px-5 py-8 sm:px-8">
      <div class="w-full max-w-[420px]">
        <RouterView />
      </div>
    </section>
  </main>
</template>
