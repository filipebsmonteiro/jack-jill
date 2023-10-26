<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { router } from '@inertiajs/vue3'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import CompetitionForm from 'Resources/pages/Competitions/CompetitionForm'
import { parseUnprocessableErrors } from 'Resources/helpers/functions'
import { useCompetitionStore } from 'Resources/stores/competition'
import { Head } from '@inertiajs/vue3'

let errors = reactive({}),
  values = reactive({}),
  id = window.location.pathname === '/competition/create'
    ? null
    : window.location.pathname.split('/').pop();
const { t } = useI18n()

const handleSubmit = (data) => {
  if (id) {
    useCompetitionStore().update(id, data)
      .then(() => {
        toast.success(`${t('competition.label')} <b>${data.name}</b> ${t('competition.updated')} ${t('system.actions.with_success')}!`)
        router.get('/competition/list')
      })
      .catch((error) => {
        const parsed = parseUnprocessableErrors(error)
        Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
      })
  } else {
    useCompetitionStore().create(data)
      .then(() => {
        toast.success(`${t('competition.label')} <b>${data.name}</b> ${t('competition.created')} ${t('system.actions.with_success')}!`)
        router.get('/competition/list')
      })
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
    Object.entries(current.value).forEach(([key, value]) => (key !== 'image' ? values[key] = value :  null))
  }
})

onBeforeUnmount(() => useCompetitionStore().$reset())
</script>

<template>
  <Head :title="id ? 'Edit Competition' : 'Create Competition'" />
  <CompetitionForm
    :errors="errors"
    :values="values"
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
