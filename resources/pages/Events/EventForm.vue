<script setup>
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSchedule } from 'Resources/components/Form/Schedule/Composable'
import { plugin } from 'Resources/components/Form/SubmitLoading';

const props = defineProps({
  errors: Object,
  values: Object,
})
const emits = defineEmits(['submit'])
const { t } = useI18n()
const { formKitSchema } = useSchedule()

const schema = reactive([
  {
    $formkit: "text",
    name: "name",
    label: t('event.name'),
    validation: "required",
  },
  {
    $formkit: "text",
    name: "description",
    label: t('event.description'),
    validation: "required",
  },
  {
    $formkit: "text",
    name: "location",
    label: t('event.location'),
    validation: "required",
  },
  {
    $formkit: "text",
    name: "type",
    label: t('event.type'),
    validation: "required",
  },
  {
    $formkit: "select",
    name: "status",
    label: t('event.status'),
    validation: "required",
    options: [
      { label: t('event.statuses.draft'), value: 'draft' },
      { label: t('event.statuses.published'), value: 'published' },
      { label: t('event.statuses.canceled'), value: 'canceled' },
    ]
  },
  {
    $formkit: "file",
    name: "image",
    label: t('event.image'),
    accept: ".jpeg,.jpg,png,.webp",
    multiple: "false",
  },
  {
    $formkit: "date",
    name: "start_date",
    label: t('event.start_date'),
    validation: `required|date|date_after:${new Date().toISOString().split('T')[0]}`,
  },
  {
    $formkit: "date",
    name: "end_date",
    label: t('event.end_date'),
    validation: `required|date|date_after:${new Date().toISOString().split('T')[0]}`,
  },
  formKitSchema,

  {
    $formkit: 'spinningSubmit',
    label: 'Enviar',
  }
])

const data = reactive({
  name: props?.values?.name || '',
  description: props?.values?.description || '',
  location: props?.values?.location || '',
  type: props?.values?.type || '',
  status: props?.values?.status || '',
  image: props?.values?.image || '',
  start_date: props?.values?.start_date || '',
  end_date: props?.values?.end_date || '',
})

watch(props.errors, (errors) => {
  if (errors) {
    schema.value.forEach((field) => {
      if (errors[field.name]) {
        field.errors = errors[field.name]
      }
    })
  }
})

watch(props.values, (values) => {
  if (values) {
    Object.entries(values).forEach(([key, value]) => data.value[key] = value)
  }
})

const handleSubmit = (data) => emits('submit', data)
</script>

<template>
  <div class="flex-center">
    <FormKit
      type="form"
      :actions="false"
      :plugins="[plugin]"
      v-model="data"
      @submit="handleSubmit"
    >
      <FormKitSchema :schema="schema" :data="data" />
    </FormKit>
  </div>
</template>

<style scoped>
:deep(.formkit-outer) {
  margin: 0 auto 1rem auto;
}

:deep(.schedule-formkit-row > .formkit-outer) {
  margin: 0 !important;
}
</style>
