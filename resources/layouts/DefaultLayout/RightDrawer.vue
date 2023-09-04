<template>
  <div class="user-profile">
    <div v-if="user" class="pt-10 px-2 bg-blur">
      <div :class="{ 'avatar mb-2': true, placeholder: !avatar}">
        <div :class="{ 'w-12': true, 'bg-neutral text-neutral-content': !avatar}">
          <img v-if="avatar" :src="avatar" />
          <span v-else>{{ user.first_name[0].toUpperCase() }}</span>
        </div>
      </div>
      <div class="text-weight-bold">{{ user.first_name }}</div>
      <div>{{ user.email }}</div>
    </div>
  </div>
  <div class="overflow-auto p-6">
    <FormKit
      type="select"
      :label="$t('system.right_menu.languages.label')"
      v-model="locale"
      :options="locales"
    />
    <FormKit
      type="select"
      :label="$t('system.right_menu.theme.label')"
      v-model="theme"
      :options="themes"
    />

    <ul v-if="user" class="list">
      <li v-for="key in Object.keys(user)" :key="key" class="mb-3">
        <b>{{ $t(`user.${key}`) }}: </b>{{ user[key] }}
      </li>
    </ul>
  </div>
  <div class="w-100 text-center bg-white p-1">
    <button class="btn btn-sm btn-wide btn-error btn-outline" @click="handlerLogout">
      <font-awesome-icon icon="right-from-bracket" />
      Logout
    </button>
  </div>
</template>

<script>
import { router, useForm } from "@inertiajs/vue3";
import { useAuthStore } from "Resources/stores/auth";
import { useSystemStore } from "Resources/stores/system";
import { mapState, mapActions } from 'pinia'

export default {
  computed: {
    ...mapState(useAuthStore, ["avatar", "getUser"]),
    user() {
      return this.getUser;
    },
    locales() {
      return this.$i18n.availableLocales.map((locale) => ({
        label: this.$t(`system.right_menu.languages.options.${locale}`),
        value: locale,
      }));
    },
    themes() {
      return [
        { label: this.$t('system.right_menu.theme.options.bumblebee'), value: "bumblebee" },
        { label: this.$t('system.right_menu.theme.options.corporate'), value: "corporate" },
        { label: this.$t('system.right_menu.theme.options.dark'), value: "dark" },
        { label: this.$t('system.right_menu.theme.options.dracula'), value: "dracula" },
        { label: this.$t('system.right_menu.theme.options.valentine'), value: "valentine" },

      ];
    },
  },
  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      theme: '',
      locale: '',
    };
  },
  watch: {
    locale(val) {
      this.setLocale(val)
      this.$formkit.setLocale(val)
      this.$i18n.locale = val
    },
    theme(val) {
      this.setTheme(val)
      document.documentElement.setAttribute("data-theme", val);
    },
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    ...mapActions(useSystemStore, ["setLocale", "setTheme"]),
    async handlerLogout() {
      const form = useForm({});
      await this.logout(form)
      router.get("/auth/login")
    },
  },
  created() {
    const { getTheme, getLocale } = useSystemStore()
    this.theme = getTheme;
    this.locale = getLocale;
    document.documentElement.setAttribute('data-theme', this.theme)
  },
}
</script>

<style lang="scss" scoped>
.user-profile {
  // background-image: url("@/assets/bkg.jpg");
  @apply bg-cover bg-center bg-no-repeat;
}
</style>
