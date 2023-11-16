<template>
  <aside class="aside-left">
    <ul class="menu w-56">
      <li>
        <MenuLink
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
  },
  data() {
    return {
      linksList: [
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
      ],
    }
  },
  mounted() {
    if (this.user?.system_role === 'admin') {
      const adminRoutes = [
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
      adminRoutes.forEach(r => this.linksList.push(r))
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-left{
  min-height: 100dvh;
  height: 100%;
}
</style>
