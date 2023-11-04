<script setup>
import { reactive, onMounted, onBeforeUnmount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { router } from '@inertiajs/vue3'
import { toast } from 'Resources/helpers/notifications'
import { useI18n } from 'vue-i18n';
import { parseUnprocessableErrors } from 'Resources/helpers/functions'
import { useCompetitionLevelStore } from 'Resources/stores/competition/level'
import { Head } from '@inertiajs/vue3'

let errors = reactive({}),
  id = window.location.pathname === '/competition/level/create'
    ? null
    : window.location.pathname.split('/').pop();
const { t } = useI18n();
let { current, loading } = storeToRefs( useCompetitionLevelStore() );
let name = ref('');

const handleSubmit = (data) => {
  if (id) {
    useCompetitionLevelStore().update(id, data)
      .then(() => {
        toast.success(`${t('competition.level.label')} <b>${data.name}</b> ${t('competition.level.updated')} ${t('system.actions.with_success')}!`)
        router.get('/competition/level/list')
      })
      .catch((error) => {
        const parsed = parseUnprocessableErrors(error)
        Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
      })
  } else {
    useCompetitionLevelStore().create(data)
      .then(() => {
        toast.success(`${t('competition.level.label')} <b>${data.name}</b> ${t('competition.level.created')} ${t('system.actions.with_success')}!`)
        router.get('/competition/level/list')
      })
      .catch((error) => {
        const parsed = parseUnprocessableErrors(error)
        Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
      })
  }
};

onMounted(async () => {
  if (id) {
    await useCompetitionLevelStore().find(id)
    loading.value = true
    setTimeout(() => {
      name.value = current.value.name
      loading.value = false
    }, 500)
  }
})

onBeforeUnmount(() => useCompetitionLevelStore().$reset())
</script>

<template>
  <Head :title="id ? 'Edit Competition Level' : 'Create Competition Level'" />
  <FormKit
    type="form"
    form-class="flex flex-col items-center justify-center gap-4 p-6"
    @submit="handleSubmit"
  >
    <font-awesome-icon v-if="loading" icon="spinner" class="animate-spin" />
    <FormKit v-else :label="$t('competition.level.label')" name="name" :value="name" />
  </FormKit>
</template>

<style lang="scss" scoped>
:deep(.formkit-form) {

  .formkit-outer {
    margin: 0 2rem 2rem 0;
  }
}
</style>
