<script setup>
const props = defineProps(['successMessage'])
const emits = defineEmits(['undo'])
</script>

<template>
  {{ props.successMessage }} <a href="#" @click="emits('undo')">Desfazer</a>
</template>
