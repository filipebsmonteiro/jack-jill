<script setup>
import { reactive, ref, watch } from 'vue';
import { plugin } from 'Resources/components/Form/SubmitLoading'

const props = defineProps({
  errors: Object,
  passwordRequired: Boolean,
  values: Object,
})
const emits = defineEmits(['submit'])

const schema = reactive([
  {
    $formkit: "text",
    name: "first_name",
    label: "Primeiro Nome",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "last_name",
    label: "Último Nome",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "phone",
    label: "Telefone",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "email",
    label: "Email",
    validation: "required|email",
  },
  {
    $formkit: "password",
    name: "password",
    label: "Senha",
    validation: `?length:64,8${props.passwordRequired ? '|required' : ''}`,
  },
  {
    $formkit: "password",
    name: "password_confirm",
    label: "Confirmar Senha",
    validation: `confirm:password${props.passwordRequired ? '|required' : ''}`,
  },
  {
    $formkit: "text",
    name: "state",
    label: "Estado",
    validation: "required",
  },
  {
    $formkit: "text",
    name: "country",
    label: "País",
    validation: "required",
  },
  {
    $formkit: 'spinningSubmit',
    label: 'Enviar',
  }
])

const data = reactive({
  first_name: props?.values?.first_name || '',
  last_name: props?.values?.last_name || '',
  phone: props?.values?.phone || '',
  email: props?.values?.email || '',
  password: props?.values?.password || '',
  password_confirm: '',
  state: props?.values?.state || '',
  country: props?.values?.country || ''
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
    <div class="flex column w-50">
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
