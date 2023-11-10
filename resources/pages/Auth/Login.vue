<script setup>
import { Head, router } from "@inertiajs/vue3";
import { storeToRefs } from "pinia";
import { reactive, watch, computed } from "vue";
import { toast } from 'Resources/helpers/notifications'
import AuthLayout from "Resources/layouts/AuthLayout.vue";
import { plugin } from "Resources/components/Form/SubmitLoading";
import { useAuthStore } from "Resources/stores/auth";

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

const form = reactive({
  email: "",
  password: "",
});

async function submit() {
  const { login } = useAuthStore()
  const { user } = storeToRefs(useAuthStore())
  login(form)
    .then(() => {
      if (user.value.system_role == "admin") {
        router.get("/dashboard")
      } else {
        router.get("/competition/newest")
      }
    })
    .catch((error) => {
      if (error.response.data?.errors) {
        error.response.data.errors.forEach((error) => toast.error(error))
      }
    })
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
