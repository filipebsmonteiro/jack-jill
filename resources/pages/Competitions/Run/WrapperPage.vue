<script setup>
import { computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { router } from '@inertiajs/vue3'
import { toast } from 'Resources/helpers/notifications'
import { useCompetitionStore } from 'Resources/stores/competition'
import { useCompetitionLevelStore } from 'Resources/stores/competition/level'
import { useCompetitionScoreStore } from 'Resources/stores/competition/score'
import { Head } from '@inertiajs/vue3'
import CombatPage from 'Resources/pages/Competitions/Run/CombatPage'
import SortitionPage from 'Resources/pages/Competitions/Run/SortitionPage'

let errors = reactive({}),
  values = reactive({}),
  id = router.page.props.id,
  { current, loading } = storeToRefs( useCompetitionStore() ),
  templates = {
    combat: CombatPage,
    sortition: SortitionPage,
  },
  template = computed(() => templates[current.value?.type]);

onMounted(async () => {
  useCompetitionLevelStore().load()
  await useCompetitionStore().find(id, { relationships: ['users'] })
  useCompetitionScoreStore().load({ competition_id: current.value.id })
})

onBeforeUnmount(() => useCompetitionStore().$reset())
</script>

<template>
  <Head title="Run Competition" />
  <font-awesome-icon v-if="loading" icon="spinner" class="animate-spin" />
  <component v-else :is="template" />
</template>
