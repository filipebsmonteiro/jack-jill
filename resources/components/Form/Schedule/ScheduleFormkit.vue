<script setup>
import { ref } from 'vue';

let values = ref([
  { name: '', begin: '', end: ''},
])
const addNode = () => {
  values.value.push({name: '', begin: ''})
}
const removeNode = (index) => {
  values.value = values.value.filter((_, i) => i !== index)
}
</script>

<template>
  <div v-for="(item, index) in values" :key="index" class="formkit-row">
    <FormKit
      label="Guest name"
      :name="`guests[${index}][name]`"
      v-model="item.name"
    />
    <FormKit
      label="Begin"
      :name="`guests[${index}][begin]`"
      v-model="item.begin"
    />
    <button type="button" @click="removeNode(index)">
      - Remove
    </button>
  </div>
  <button type="button" @click="addNode">
    + Add another
  </button>
</template>

<style lang="scss" scoped>
.formkit-row {
  width: 100%;
  @apply inline-flex items-center justify-around hover:bg-gray-100 rounded p-2;

  .formkit-outer {
    @apply m-0;

    .formkit-wrapper {
      @apply w-auto;
    }
  }
}

:deep(.schedule-formkit-row > .formkit-outer) {
  margin: 0 !important;
}
</style>
