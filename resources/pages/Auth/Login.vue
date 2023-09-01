<script setup>
import { reactive, watch, computed } from "vue";
import { Head, router, useForm } from "@inertiajs/vue3";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { plugin } from "@/components/Form/SubmitLoading";

defineOptions({ layout: AuthLayout })
const props = defineProps({ errors: Object })

const schema = reactive([
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
    $formkit: "spinningSubmit",
    label: "Enviar",
  },
]);
watch(() => props.errors, () => {
  schema.forEach((field) => {
    field.errors = props.errors[field.name] || [];
  });
});

// const { data, post, processing } = useForm({
const form = useForm({
  email: "",
  password: "",
});

async function submit() {
  // router.post('/api/v1/auth/login', form)
  form.clearErrors()
  form.post('/api/v1/auth/login')
}
</script>

<template>
  <Head title="Login" />
  <div class="flex column">
    <FormKit
      type="form"
      :actions="false"
      :plugins="[plugin]"
      v-model="form"
      @submit="submit"
    >
      <FormKitSchema :schema="schema" :data="form" />
      <ul v-if="errors && errors.length > 0">
          <li v-for="(error, i) in errors" :key="i" class="text-red-500 text-center">{{ error }}</li>
      </ul>
    </FormKit>
    <InertiaLink href="/auth/register" class="text-sm text-gray-600 hover:text-gray-900 text-center">
      Não tem uma conta? Crie uma
    </InertiaLink>
  </div>
</template>
