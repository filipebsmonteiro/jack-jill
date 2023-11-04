<script setup>
import TabHeader from "Resources/components/Tabs/TabHeader";
import { onMounted, ref } from "vue";

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

let activeTab = ref({})
onMounted(() => activeTab.value = props.tabs.length > 0 ? props.tabs[0] : {})
</script>

<template>
  <div class="tabs-container">
    <TabHeader
      :active-tab="activeTab"
      :allow-delete="allowDelete"
      :allow-increase="allowIncrease"
      :tabs="tabs"
      :tab-class="tabClass"
      @change="tab => activeTab = tab"
      @delete="tab => emits('delete', tab)"
      @increase="tab => emits('increase')"
    />
    <div
      v-for="tab in tabs"
      :key="tab.key"
      v-show="tab.key === activeTab.key"
    >
      <slot :name="`tab-${tab.key}`"></slot>
    </div>
  </div>
</template>
