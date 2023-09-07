<script setup>
import { reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { router } from '@inertiajs/vue3'
import CompetitionForm from 'Resources/pages/Competitions/CompetitionForm'
import { parseUnprocessableErrors } from 'Resources/helpers/functions'
import { useCompetitionStore } from 'Resources/stores/competition'
import { Head } from '@inertiajs/vue3'

let errors = reactive({}),
  values = reactive({}),
  id = window.location.pathname === '/competition/create'
    ? null
    : window.location.pathname.split('/').pop();

const handleSubmit = (data) => {
  if (id) {
    useCompetitionStore().update(id, data)
      .then(() => router.get('/competition/list'))
      .catch((error) => {
        const parsed = parseUnprocessableErrors(error)
        Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
      })
  } else {
    useCompetitionStore().create(data)
      .then(() => router.get('/competition/list'))
      .catch((error) => {
        const parsed = parseUnprocessableErrors(error)
        Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
      })
  }
};

onMounted(async () => {
  if (id) {
    const { current } = storeToRefs( useCompetitionStore() );
    await useCompetitionStore().find(id)
    Object.entries(current.value).forEach(([key, value]) => values[key] = value)
  }
})
</script>

<template>
  <Head :title="true ? 'Create Competition' : 'Edit Competition'" />
  <CompetitionForm
    :errors="errors"
    :values="values"
    :password-required="!id"
    @submit="handleSubmit"
  />
</template>

<style lang="scss" scoped>
:deep(.formkit-form) {
  @apply flex-row flex-wrap justify-center p-6;

  .formkit-outer {
    margin: 0 2rem 2rem 0;
  }
}
</style>
