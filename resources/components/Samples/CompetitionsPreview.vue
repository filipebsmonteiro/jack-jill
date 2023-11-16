<script setup>
import { useCompetitionStore } from 'Resources/stores/competition';
import { storeToRefs } from 'pinia'

let { list } = storeToRefs( useCompetitionStore() )
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
      <!-- <h2 class="text-2xl font-bold text-gray-900">Last Competitions</h2> -->
      <h2 class="text-2xl font-bold">Last Competitions</h2>

      <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        <div v-for="competition in list" :key="competition.id" class="group relative">
          <div class="relative h-80 w-full overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
            <object data="/fallback/competition.webp" type="image/png">
              <img
                :src="`/file/${competition.image}`"
                :alt="competition.name"
                class="h-full w-full object-cover object-center"
              />
            </object>
          </div>
          <h3 class="mt-6 text-sm text-primary">
            <a :href="competition.href">
              <span class="absolute inset-0" />
              {{ competition.name }}
            </a>
          </h3>
          <!-- <p class="text-base font-semibold text-gray-900">{{ competition.description }}</p> -->
          <p class="text-base font-semibold">{{ competition.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
