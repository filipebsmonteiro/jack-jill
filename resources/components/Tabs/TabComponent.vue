<script setup>
import TabHeader from "Resources/components/Tabs/TabHeader";
import { computed, ref } from "vue";

const props = defineProps({
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
const emits = defineEmits(['delete', 'increase'])


let activeByClick = ref({});
let activeTab = computed(() => {
  if (Object.keys(activeByClick.value).length) {
    return activeByClick.value
  }
  return props.tabs[0] || {}
})
</script>

<template>
  <div class="tabs-container">
    <TabHeader
      :active-tab="activeTab"
      :allow-delete="allowDelete"
      :allow-increase="allowIncrease"
      :tabs="props.tabs"
      :tab-class="tabClass"
      @change="tab => activeByClick = tab"
      @delete="tab => emits('delete', tab)"
      @increase="tab => emits('increase')"
    />
    <div
      v-for="tab in props.tabs"
      :key="tab.key"
      v-show="tab.key === activeTab.key"
    >
      <slot :name="`tab-${tab.key}`"></slot>
    </div>
  </div>
</template>
