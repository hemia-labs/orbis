<script setup lang="ts">
import { RouterView } from 'vue-router'

import AuthVisualBackground from './AuthVisualBackground.vue'
</script>

<template>
  <main class="relative h-svh overflow-hidden bg-[#fbfdff] text-[#07112d]">
    <AuthVisualBackground />

    <div class="relative z-10 grid h-svh lg:grid-cols-[minmax(0,1.08fr)_minmax(480px,0.92fr)]">
      <section class="hidden lg:block" />

      <section class="flex h-svh items-center justify-center overflow-hidden px-4 py-4 sm:px-8 sm:py-8">
        <div class="max-h-full w-full max-w-[560px]">
          <RouterView />
        </div>
      </section>
    </div>
  </main>
</template>
