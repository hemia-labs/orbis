<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => route.meta.title ?? 'Modulo')
</script>

<template>
  <section class="p-4 sm:p-6">
    <div class="rounded-lg border bg-background p-6 shadow-xs">
      <p class="text-sm font-medium text-muted-foreground">Modulo privado</p>
      <h1 class="mt-2 text-2xl font-semibold tracking-normal">{{ title }}</h1>
    </div>
  </section>
</template>
