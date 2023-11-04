<script setup>
const props = defineProps({
  activeTab: {
    type: Object,
    required: true,
  },
  allowIncrease: {
    type: Boolean,
  },
  allowDelete: {
    type: Boolean,
  },
  tabs: {
    type: Array,
    required: true
  },
  tabClass: {
    type: String,
  },
});

const emits = defineEmits(['change', 'delete', 'increase'])
</script>

<template>
  <div :class="['tabs', tabClass]">
    <a
      v-for="(tab, idx) in tabs"
      :key="tab?.key"
      :class="{ 'tab tab-lifted': true, 'tab-active': activeTab?.key === tab?.key}"
      @click="emits('change', tab)"
    >
      {{ tab.label || `Tab ${idx+1}` }}
      <font-awesome-icon
        v-if="allowDelete"
        icon="times"
        class="ml-4"
        @click="emits('delete', tab)"
      />
    </a>
    <a v-if="allowIncrease" class="tab tab-lifted" @click="emits('increase')">
      <font-awesome-icon icon="plus" class="text-success" />
    </a>
  </div>
</template>

<style lang="scss">
.tabs {
  &::after {
    content: '';
    flex-grow: 1;
    border-bottom: 1px solid #e5e6e6;
  }
}
</style>
