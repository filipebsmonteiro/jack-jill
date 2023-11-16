<template>
  <div class="layout-wrapper">
    <MenuHeader @menu-bars-click="toggleLeftSideBar" />

    <div class="flex">

      <SidebarMenu :class="sidebarClasses" />

      <div class="min-md:px-6 grow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import MenuLink from "Resources/components/Navigation/MenuLink.vue";
import MenuHeader from "Resources/layouts/components/MenuHeader.vue";
import SidebarMenu from "Resources/layouts/components/SidebarMenu.vue";
import { isMobile } from "Resources/helpers/functions";

export default {
  components: {
    MenuLink,
    MenuHeader,
    SidebarMenu,
  },
  computed: {
    sidebarClasses() {
      return isMobile()
      ? { 'absolute z-50 bg-base-200 shadow': true, 'hidden': !this.showLeftSideBar }
      : ``
    }
  },
  data() {
    return {
      showLeftSideBar: false,
    }
  },
  methods: {
    toggleLeftSideBar() {
      this.showLeftSideBar = !this.showLeftSideBar
    }
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
