<script setup>
import { computed, onMounted } from 'vue'
import { Head } from "@inertiajs/vue3";
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import SimpleTable from 'Resources/components/Table/SimpleTable';
import { useUserStore } from 'Resources/stores/user';
import { useAuthStore } from 'Resources/stores/auth';
import { useCompetitionLevelStore } from 'Resources/stores/competition/level'

const { t } = useI18n()
const { getUser } = storeToRefs( useAuthStore() );
const { current } = storeToRefs( useUserStore() );
const { list } = storeToRefs(useCompetitionLevelStore())
const user = computed(() => {
  if (current.value) {
    const { password, ...userInfo } = current.value
    return userInfo
  }
  return null
})

const columns = [
  { key: 'image', label: t('competition.image') },
  { key: 'name', label: t('competition.name') },
  { key: 'status', label: 'Status' },
  { key: 'level_id', label: t('competition.level.label') },
  { key: 'role', label: t('competition.competitor.role') },
];

onMounted(async () => {
  useCompetitionLevelStore().load()
  await useUserStore().find(getUser.value.id, { relationships: ['competitions'] })
})
</script>

<template>
  <Head title="Dashboard" />
  <div class="flex flex-col items-center px-4">
    <h1 class="my-6">Dashboard</h1>
    <p v-if="user?.competitions.length === 0">{{ `Zero ${t('competition.label')} ${t('competition.subscribed')}.` }}</p>
    <SimpleTable v-else :columns="columns" :rows="user?.competitions || []">
      <template #image="{ row }">
        <div v-if="row.image" class="w-16 avatar rounded overflow-auto">
          <img :src="`/file/${row.image}`" :alt="row.name" />
        </div>
      </template>
      <template #level_id="{ row }">
        {{ list.find(l => l.id === row.level_id)?.name }}
      </template>
    </SimpleTable>
  </div>
</template>
