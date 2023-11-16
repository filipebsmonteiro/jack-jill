<template>
  <div class="layout-wrapper">
    <MenuHeader />

    <div class="container flex">

      <SidebarMenu />
      <div class="px-6 grow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import MenuLink from "Resources/components/Navigation/MenuLink.vue";
import MenuHeader from "Resources/layouts/components/MenuHeader.vue";
import SidebarMenu from "Resources/layouts/components/SidebarMenu.vue";

export default {
  components: {
    MenuLink,
    MenuHeader,
    SidebarMenu,
  },
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100%;
  outline: 0;
}

.container {
  margin: 0 auto;
}
</style>
