<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="grid min-h-svh bg-background lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)]">
    <section
      class="hidden border-r bg-[linear-gradient(135deg,#0f172a_0%,#243b53_48%,#0f766e_100%)] px-10 py-8 text-white lg:flex lg:flex-col"
    >
      <RouterLink to="/" class="flex items-center gap-3 text-sm font-semibold">
        <span class="grid size-9 place-items-center rounded-md bg-white/12 ring-1 ring-white/20">O</span>
        <span>Orbis</span>
      </RouterLink>

      <div class="mt-auto max-w-lg">
        <p class="text-sm font-medium text-white/70">Design systems, tokens and releases</p>
        <h1 class="mt-4 text-4xl font-semibold tracking-normal">
          Controla el ciclo de vida de tus productos desde un solo lugar.
        </h1>
        <p class="mt-5 text-base leading-7 text-white/72">
          El acceso publico queda enfocado en autenticacion, mientras la app privada conserva el espacio de trabajo completo.
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
