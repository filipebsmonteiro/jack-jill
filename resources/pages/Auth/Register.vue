<script setup>
import { reactive } from 'vue';
import { router } from '@inertiajs/vue3'
import { plugin } from 'Resources/components/Form/SubmitLoading'
import { useAuthStore } from 'Resources/stores/auth'
import { useUserStore } from 'Resources/stores/user'
import { Head } from '@inertiajs/vue3'

const props = defineProps({ errors: Object })

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
    validation: "required|?length:8,64",
  },
  {
    $formkit: "password",
    name: "password_confirm",
    label: "Confirmar Senha",
    validation: "required|confirm",
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
]);

const form = reactive({
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
  password_confirm: "",
  state: "",
  country: ""
});

const handleSubmit = (data) => {
  useUserStore().create(data)
    .then(() => {
      console.log('OKAY ON CREATE :>> ');
      useAuthStore().login({ email: data.email, password: data.password })
      .then(() => {
          console.log('OKAY ON LOGIN :>> ');
          router.get('/dashboard')
        })
    }
    )
    .catch((error) => {
      if (
        error.response?.status === 422 &&
        error.response?.data?.errors
        ) {
          error.response.data.errors.forEach((error) => {
            schema.forEach((field) => {
              if (field.name === error.field) {
                field.errors = [error.message]
              }
            })
          })
      }
    })
};
</script>

<template>
  <Head title="Register" />
  <div class="flex-center">
    <div class="flex column w-50">
      <FormKit
        type="form"
        :actions="false"
        :plugins="[plugin]"
        v-model="form"
        @submit="handleSubmit"
      >
        <FormKitSchema :schema="schema" :data="form" />
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
