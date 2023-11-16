<script setup>
import { onMounted, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { plugin } from 'Resources/components/Form/SubmitLoading';
import { useAuthStore } from "Resources/stores/auth";

const props = defineProps({
  errors: Object,
  passwordRequired: Boolean,
  values: Object,
})
const emits = defineEmits(['submit'])
const { t } = useI18n()
const { getUser } = useAuthStore()

const schema = reactive([
  {
    $formkit: "text",
    name: "first_name",
    label: t('user.first_name'),
    validation: "required",
  },
  {
    $formkit: "text",
    name: "last_name",
    label: t('user.last_name'),
    validation: "required",
  },
  {
    $formkit: "text",
    name: "phone",
    label: t('user.phone'),
    validation: "required",
  },
  {
    $formkit: "text",
    name: "email",
    label: t('user.email'),
    validation: "required|email",
  },
  {
    $formkit: "password",
    name: "password",
    label: t('user.password'),
    validation: `?length:64,8${props.passwordRequired ? '|required' : ''}`,
  },
  {
    $formkit: "password",
    name: "password_confirm",
    label: t('user.password_confirmation'),
    validation: `confirm:password${props.passwordRequired ? '|required' : ''}`,
  },
  {
    $formkit: "text",
    name: "state",
    label: t('user.state'),
    validation: "required",
  },
  {
    $formkit: "text",
    name: "country",
    label: t('user.country'),
    validation: "required",
  },
  {
    $formkit: 'spinningSubmit',
    label: 'Enviar',
  }
])

onMounted(() => {
  console.log('getUser :>> ', getUser);
  if (getUser) {
    schema.push({
      $formkit: "select",
      name: "system_role",
      label: `PERFIL`,
      options: ['admin', 'competitor'],
      validation: "required",
    })
  }
})

const data = reactive({
  first_name: props?.values?.first_name || '',
  last_name: props?.values?.last_name || '',
  phone: props?.values?.phone || '',
  email: props?.values?.email || '',
  password: props?.values?.password || '',
  password_confirm: '',
  state: props?.values?.state || '',
  country: props?.values?.country || '',
  system_role: props?.values?.system_role || 'competitor',
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
