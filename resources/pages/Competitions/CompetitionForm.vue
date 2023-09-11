<script setup>
import { reactive, ref, watch, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSchedule } from 'Resources/components/Form/Schedule/Composable';
import { plugin } from 'Resources/components/Form/SubmitLoading';
import { normalizeTimestamp } from 'Resources/helpers/functions';

const props = defineProps({ errors: Object, values: Object })
const emits = defineEmits(['submit'])
const { t } = useI18n()
const { addSchedule, formKitSchema, formKitValues, resetSchedules } = useSchedule()

const schema = reactive([
  {
    $formkit: "text",
    name: "name",
    label: t('competition.name'),
    validation: "required",
  },
  {
    $formkit: "textarea",
    name: "description",
    label: t('competition.description'),
    validation: "required",
  },
  {
    $formkit: "select",
    name: "type",
    label: t('competition.type'),
    validation: "required",
    options: [
      { label: t('competition.types.combat'), value: 'combat' },
      { label: t('competition.types.sortition'), value: 'sortition' },
    ]
  },
  formKitSchema,

  {
    $formkit: 'spinningSubmit',
    label: 'Enviar',
  }
])

const data = ref({
  name: props?.values?.name || '',
  type: props?.values?.type || '',
  ...formKitValues.value,
})

watch(props.errors, (errors) => {
  if (errors) {
    schema.forEach((field) => {
      if (errors[field.name]) {
        field.errors = errors[field.name]
      }
    })
  }
})

watch(props.values, (values) => {
  if (values) {
    const parsedValues = normalizeTimestamp(values)
    Object.keys(data.value).forEach((key) => {
      if (parsedValues[key]) {
        data.value[key] = parsedValues[key]
      }
    })

    if (Array.isArray(parsedValues.schedules)) {
      parsedValues.schedules.map((schedule) => addSchedule(schedule))
    }
  }
})

const handleSubmit = (data) => emits('submit', data)

onBeforeUnmount(() => resetSchedules())
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
</style>
