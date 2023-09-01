<script setup>
import { ref } from 'vue';

const schema = [
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
  },
  {
    $formkit: "text",
    name: "phone",
    label: "Telefone",
  },
  {
    $formkit: "text",
    name: "email",
    label: "Email",
  },
  {
    $formkit: "password",
    name: "password",
    label: "Senha",
  },
  {
    $formkit: "text",
    name: "state",
    label: "Estado",
  },
  {
    $formkit: "text",
    name: "country",
    label: "País",
  },

  {
    $formkit: "checkbox",
    name: "hasEmail",
    label: "Has Girfriend?",
  },
  {
    $el: "p",
    children: ["Girlfriend enabled? ", "$hasEmail"],
  },
  {
    $formkit: "email",
    name: "girfriend_email",
    label: "Email",
    if: "$hasEmail",
    validation: "required|email",
  },
];

const data = ref({
  name: null,
  email: null,
  hasEmail: false,
});

const handleSubmit = () => alert("Valid submit!");

</script>

<template>
  <div class="flex flex-center">
    <div class="w-50">
      <FormKit type="form" v-model="data" @submit="handleSubmit">
        <FormKitSchema :schema="schema" :data="data" />
      </FormKit>
    </div>
  </div>
</template>

<style scoped>
:deep(.formkit-outer) {
  max-width: var(--fk-max-width-input);
  margin: 0 auto 1rem auto;
}
</style>
