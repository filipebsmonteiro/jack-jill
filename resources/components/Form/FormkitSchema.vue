<script setup>
import { watch } from 'vue';

defineProps({
  schema: {
    type: Array,
    required: true,
  },
  handleSubmit: {
    type: Function,
    required: true,
  },
});

defineEmits(['submit']);

const localSchema = [
  ...schema,
  {
    $formkit: 'spinningSubmit',
    label: 'Login',
  }
];
const spinningSubmitDefinition = {
  type: 'input',
  schema: [
    {
      $cmp: 'FormKit',
      bind: '$submitAttrs',
      props: {
        ignore: true,
        type: 'submit',
        disabled: '$disabled',
        label: '$submitLabel',
      },
      children: [
        {
          $el: 'span',
          children: {
            if: '$disabled',
            then: 'loading...',
            else: '$label'
          }
        },
      ]
    }
  ],
};
const customInputs = () => {}

// Then we attach a library
customInputs.library = (node) => {
  if (node.props.type === 'spinningSubmit') {
    node.define(spinningSubmitDefinition)
  }
}

const form = ref({});
watch(schema, () => {
  form = ref({});
  schema.forEach((field) => {
    if (field.name) {
      form.value[field.name] = '';
    }
  });
}, { immediate: true });
</script>

<!-- <script>
export default {
  emits: ['submit'],
}
</script> -->

<template>
  <FormKit
    type="form"
    v-model="form.value"
    :plugins="[customInputs]"
    :actions="false"
    @submit="$emit('submit', $event)"
  >
    <FormKitSchema :schema="localSchema" :data="form.value" />
  </FormKit>
</template>

<style scoped>
:deep(.formkit-outer) {
  max-width: var(--fk-max-width-input);
  margin: 0 auto 1rem auto;
}
</style>
