<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
  external: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    default: "#",
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <component
    :is="external ? `a` : `inertia-link`"
    :target="external ? `_blank` : null"
    :href="link"
    :class="{ 'menu-item': true }"
  >
    <span class="icon">
      <font-awesome-icon v-if="icon" :icon="icon" />
    </span>

    <div>
      <span>{{ label }}</span>
      <span class="caption">
        {{ caption }}
      </span>
    </div>
  </component>
</template>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;


  &:last-child {
    border-bottom: none;
  }

  &.active {
    border-left: 3px solid #65c3c7;
  }

  .icon {
    padding: 0 12px;
  }
}
</style>
