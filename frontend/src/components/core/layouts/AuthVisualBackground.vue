<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  CheckCircle2,
  FileText,
  Globe2,
  Layers3,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from 'lucide-vue-next'

import logoUrl from '@/assets/logo.png'

const palette = ['#eff6ff', '#dbeafe', '#bfdbfe', '#60a5fa', '#3b82f6', '#2563eb', '#1e40af']

const syncRows = [
  { icon: Globe2, name: 'Design System Web', branch: 'main', status: 'Exitosa', time: 'Hace 2 min', tone: 'text-emerald-500' },
  { icon: Smartphone, name: 'Mobile App', branch: 'desarrollo', status: 'Exitosa', time: 'Hace 12 min', tone: 'text-emerald-500' },
  { icon: FileText, name: 'Docs Site', branch: 'main', status: 'En progreso', time: 'Hace 38 min', tone: 'text-[#1473ff]' },
]
</script>

<template>
  <div class="pointer-events-none absolute inset-0 hidden lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(480px,0.92fr)]">
    <div class="relative overflow-hidden bg-[#f7fbff]">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(219,234,254,0.85),transparent_34%),radial-gradient(circle_at_62%_72%,rgba(186,230,253,0.68),transparent_34%),linear-gradient(135deg,#ffffff_0%,#f8fbff_42%,#eef7ff_100%)]" />
      <div class="absolute left-[8%] top-[36%] size-[clamp(7rem,13vw,11rem)] bg-[radial-gradient(circle,#93c5fd_1.6px,transparent_1.8px)] [background-size:18px_18px] opacity-55" />
      <div class="absolute bottom-[-22%] left-[-16%] size-[min(680px,66vw)] rounded-full border border-[#b8d8ff]/55" />
      <div class="absolute right-[-8%] top-[20%] size-[min(500px,48vw)] rounded-full border border-[#c8ddff]/55" />

      <div class="relative z-10 mx-auto flex h-full max-w-[1120px] flex-col px-[clamp(2rem,4vw,4rem)] py-[clamp(1.5rem,3.6vh,2.75rem)]">
        <RouterLink to="/" class="pointer-events-auto inline-flex w-fit items-center">
          <img :src="logoUrl" alt="Orbis" class="h-[clamp(2.25rem,3vw,2.75rem)] w-auto object-contain">
        </RouterLink>

        <div class="mt-[clamp(1.75rem,4.5vh,3.5rem)] max-w-[min(42rem,88%)]">
          <h1 class="text-[clamp(2.35rem,4.2vw,4rem)] font-bold leading-tight tracking-normal text-[#07112d]">
            Bienvenido a Orbis
          </h1>
          <p class="mt-[clamp(0.75rem,1.8vh,1.25rem)] max-w-[34rem] text-[clamp(1rem,1.25vw,1.25rem)] leading-[1.65] text-[#1f3159]">
            Gestiona tus design tokens, themes y sincronizaciones desde una unica fuente de verdad.
          </p>
        </div>

        <div class="visual-grid mt-[clamp(1.75rem,4vh,3rem)] grid min-h-0 grid-cols-12 gap-[clamp(0.75rem,1.6vw,1.25rem)]">
          <div class="token-chip col-span-4 flex min-w-0 items-center gap-3 self-start rounded-lg border border-white/80 bg-white/90 px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.10)] backdrop-blur-sm">
            <span class="grid size-[clamp(2.25rem,3vw,2.75rem)] shrink-0 place-items-center rounded-md bg-[#eff6ff] text-[#1473ff]">
              <Layers3 class="size-5" />
            </span>
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-[#07112d]">color.primary.500</p>
              <p class="text-sm text-[#52617f]">#3b82f6</p>
            </div>
            <span class="ml-auto size-5 shrink-0 rounded-full bg-[#1473ff]" />
          </div>

          <div class="chart-card col-span-8 rounded-lg border border-white/80 bg-white/92 p-[clamp(1rem,1.8vw,1.5rem)] shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-sm">
            <p class="text-sm font-bold text-[#07112d]">Tokens por categoria</p>
            <div class="mt-5 flex items-center gap-[clamp(1rem,2.2vw,2rem)]">
              <div class="relative grid size-[clamp(6.6rem,11vw,9rem)] shrink-0 place-items-center rounded-full bg-[conic-gradient(#1473ff_0_32%,#60a5fa_32%_48%,#bfdbfe_48%_62%,#1d4ed8_62%_74%,#e5e7eb_74%_100%)]">
                <div class="grid size-[64%] place-items-center rounded-full bg-white">
                  <div class="text-center">
                    <p class="text-xl font-bold text-[#07112d] xl:text-2xl">1,248</p>
                    <p class="text-xs text-[#52617f]">Total</p>
                  </div>
                </div>
              </div>
              <div class="grid min-w-0 flex-1 gap-2 text-sm">
                <div class="flex items-center justify-between gap-4">
                  <span class="flex items-center gap-2"><span class="size-3 rounded-full bg-[#1473ff]" />Colors</span>
                  <span class="font-semibold">492</span>
                </div>
                <div class="flex items-center justify-between gap-4">
                  <span class="flex items-center gap-2"><span class="size-3 rounded-full bg-[#2563eb]" />Typography</span>
                  <span class="font-semibold">214</span>
                </div>
                <div class="flex items-center justify-between gap-4">
                  <span class="flex items-center gap-2"><span class="size-3 rounded-full bg-[#60a5fa]" />Spacing</span>
                  <span class="font-semibold">196</span>
                </div>
                <div class="flex items-center justify-between gap-4">
                  <span class="flex items-center gap-2"><span class="size-3 rounded-full bg-[#93c5fd]" />Radius</span>
                  <span class="font-semibold">128</span>
                </div>
              </div>
            </div>
          </div>

          <div class="palette-card col-span-7 rounded-lg border border-white/80 bg-white/92 p-[clamp(1rem,1.6vw,1.25rem)] shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-sm">
            <p class="text-sm font-bold text-[#07112d]">Paleta de colores</p>
            <div class="mt-4 grid grid-cols-7 gap-[clamp(0.45rem,1vw,0.9rem)]">
              <div v-for="color in palette" :key="color" class="grid gap-2">
                <span class="h-[clamp(1.5rem,3vw,2rem)] rounded-md" :style="{ backgroundColor: color }" />
                <span class="truncate text-[10px] font-medium uppercase text-[#52617f] xl:text-[11px]">{{ color }}</span>
              </div>
            </div>
          </div>

          <div class="sync-card col-span-5 rounded-lg border border-white/80 bg-white/92 p-[clamp(1rem,1.6vw,1.25rem)] shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-sm">
            <p class="text-sm font-bold text-[#07112d]">Sincronizaciones recientes</p>
            <div class="mt-3 grid gap-3">
              <div v-for="row in syncRows" :key="row.name" class="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                <span class="grid size-8 place-items-center rounded-md bg-[#eff6ff] text-[#1473ff]">
                  <component :is="row.icon" class="size-4" />
                </span>
                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-[#07112d]">{{ row.name }}</p>
                  <p class="text-xs text-[#52617f]">{{ row.branch }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs font-semibold" :class="row.tone">{{ row.status }}</p>
                  <p class="text-xs text-[#52617f]">{{ row.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="success-card col-span-4 flex items-center gap-3 self-start rounded-lg border border-white/80 bg-white/92 px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.10)] backdrop-blur-sm">
            <CheckCircle2 class="size-8 shrink-0 text-emerald-500" />
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-[#07112d]">Sincronizacion exitosa</p>
              <p class="text-sm text-[#52617f]">Hace 2 min</p>
            </div>
          </div>
        </div>

        <div class="benefits mt-auto hidden w-full max-w-[44rem] grid-cols-3 gap-[clamp(1rem,2.5vw,2rem)] pt-[clamp(1rem,3vh,2rem)] 2xl:grid">
          <div class="flex gap-3">
            <ShieldCheck class="mt-1 size-8 shrink-0 text-[#1f3159]" />
            <div>
              <p class="font-bold text-[#07112d]">Gobernanza de tokens</p>
              <p class="mt-1 text-sm leading-6 text-[#1f3159]">Control y consistencia en todo tu ecosistema.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <Layers3 class="mt-1 size-8 shrink-0 text-[#1f3159]" />
            <div>
              <p class="font-bold text-[#07112d]">Escalable y colaborativo</p>
              <p class="mt-1 text-sm leading-6 text-[#1f3159]">Disenado para equipos y organizaciones.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <RefreshCw class="mt-1 size-8 shrink-0 text-[#1f3159]" />
            <div>
              <p class="font-bold text-[#07112d]">Sincronizacion confiable</p>
              <p class="mt-1 text-sm leading-6 text-[#1f3159]">Actualiza tus plataformas en tiempo real.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) and (max-width: 1180px) {
  .visual-grid {
    grid-template-columns: 1fr;
    max-width: min(86%, 31rem);
  }

  .visual-grid > * {
    grid-column: 1 / -1;
  }

  .token-chip,
  .success-card {
    display: none;
  }

  .benefits {
    grid-template-columns: 1fr;
    max-width: min(86%, 31rem);
  }
}

@media (min-width: 1024px) and (max-height: 820px) {
  .success-card,
  .benefits {
    display: none;
  }

  .visual-grid {
    margin-top: 1.25rem;
  }
}

@media (min-width: 1536px) and (max-height: 940px) {
  .benefits {
    display: none;
  }
}

@media (min-width: 1024px) and (max-height: 720px) {
  .token-chip,
  .palette-card {
    display: none;
  }
}
</style>
