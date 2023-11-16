<template>
  <aside class="aside-left">
    <ul class="menu w-56">
      <li>
        <MenuLink
          v-if="user?.system_role === 'admin'"
          v-for="link in linksList"
          :key="link.label"
          v-bind="link"
        />
      </li>
    </ul>
  </aside>
</template>

<script>
import { router } from "@inertiajs/vue3";
import MenuLink from "Resources/components/Navigation/MenuLink.vue";
import { useAuthStore } from "Resources/stores/auth";
import { mapState } from 'pinia'

export default {
  components: {
    MenuLink,
  },
  computed: {
    ...mapState(useAuthStore, ["avatar", "getUser"]),
    user() {
      return this.getUser;
    },
    linksList() {
      return [
        {
          label: 'Home',
          caption: 'Home',
          icon: "house",
          link: `/`,
        },
        {
          label: this.$t("system.left_menu.dashboard.label"),
          caption: this.$t("system.left_menu.dashboard.description"),
          icon: "chart-line",
          link: `/dashboard`,
        },
        {
          label: this.$t("system.left_menu.users.label"),
          caption: this.$t("system.left_menu.users.description"),
          icon: "person",
          link: `/user/list`,
        },
        {
          label: this.$t("system.left_menu.events.label"),
          caption: this.$t("system.left_menu.events.description"),
          icon: "calendar-days",
          link: `/event/list`,
        },
        {
          label: this.$t("system.left_menu.competitions.label"),
          caption: this.$t("system.left_menu.competitions.description"),
          icon: "trophy",
          link: `/competition/list`,
        },
        {
          label: this.$t("system.left_menu.competition_levels.label"),
          caption: this.$t("system.left_menu.competition_levels.description"),
          icon: "layer-group",
          link: `/competition/level/list`,
        },
      ];
    },
  },
}
</script>

<style lang="scss" scoped>
.aside-left{
  height: 100dvh;
}
</style>
