<script setup>
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { plugin } from 'Resources/components/Form/SubmitLoading';

const props = defineProps({
  errors: Object,
  passwordRequired: Boolean,
  values: Object,
})
const emits = defineEmits(['submit'])
const { t } = useI18n()

const schema = reactive([
  {
    $formkit: "text",
    name: "name",
    label: t('competition.name'),
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

  {
    $formkit: 'spinningSubmit',
    label: 'Enviar',
  }
])

const data = reactive({
  name: props?.values?.name || '',
  type: props?.values?.type || '',
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
    Object.entries(values).forEach(([key, value]) => data[key] = value)
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

:deep(.formkit-wrapper) {
  width: var(--fk-max-width-input);
  @apply flex flex-col;
}
</style>
