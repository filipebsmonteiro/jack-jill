<script setup>
import { reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { router } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify'
import UserForm from 'Resources/pages/Users/UserForm'
import { parseUnprocessableErrors } from 'Resources/helpers/functions'
import { useAuthStore } from 'Resources/stores/auth'
import { useUserStore } from 'Resources/stores/user'
import { Head } from '@inertiajs/vue3'

let errors = reactive({}),
  values = reactive({
    image: null,
  }),
  { t } = useI18n(),
  { current } = storeToRefs( useUserStore() ),
  { user } = storeToRefs(useAuthStore()),
  { id } = user.value

const handleSubmit = (data) => {
  useUserStore().update(id, { ...data, image: values.image || undefined})
    .then(() => {
      user = current
      toast.success(`${t('user.label')} ${t('user.edited')} ${t('system.actions.with_success')}`)
    })
    .catch((error) => {
      const parsed = parseUnprocessableErrors(error)
      Object.entries(parsed).forEach(([key, value]) => errors[key] = value)
    })
};

onMounted(async () => {
  await useUserStore().find(id)
  const { password, ...data } = current.value
  Object.entries(data).forEach(([key, value]) => values[key] = value)
})
</script>

<template>
  <Head title="Profile" />
  <div class="flex column items-center mt-5">
    <div v-if="current?.image" class="avatar rounded w-40 overflow-auto">
      <img v-if="current.image" :src="`/file/${current.image}`" alt="Photo">
    </div>
    <FormKit
      type="file"
      label="Photo"
      accept=".jpeg,.jpg,png,.webp"
      multiple="false"
      :errors="errors.image"
      v-model="values.image"
    />
  </div>
  <UserForm
    :errors="errors"
    :values="values"
    :password-required="!id"
    @submit="handleSubmit"
  />
</template>

<style lang="scss" scoped>
:deep(.formkit-form) {
  @apply flex-row flex-wrap justify-center p-6;

  .formkit-outer {
    margin: 0 2rem 2rem 0;
  }
}
</style>
