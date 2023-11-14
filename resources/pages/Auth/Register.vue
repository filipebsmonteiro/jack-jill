<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import UserForm from 'Resources/pages/Users/UserForm'
import { parseUnprocessableErrors } from 'Resources/helpers/functions'
import FullPageLayout from "Resources/layouts/FullPageLayout.vue";
import { useAuthStore } from 'Resources/stores/auth'
import { useUserStore } from 'Resources/stores/user'
import { Head } from '@inertiajs/vue3'

defineOptions({ layout: FullPageLayout })

const errors = ref({})

const handleSubmit = (data) => {
  useUserStore().create(data)
    .then(() =>
      useAuthStore().login({ email: data.email, password: data.password })
        .then(() => router.get('/dashboard'))
    )
    .catch((error) => errors.value = parseUnprocessableErrors(error))
};
</script>

<template>
  <Head title="Register" />
  <div class="w-10/12 mx-auto mt-6">
    <UserForm
      :errors="errors"
      @submit="handleSubmit"
    />
  </div>
</template>
