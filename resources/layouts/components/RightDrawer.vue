<template>
  <aside class="aside-right">
    <div class="user-profile">
      <div v-if="user" class="py-10 px-2 bg-blur flex shadow-lg">
        <div :class="{ 'avatar mb-2': true, placeholder: !avatar}">
          <div :class="{ 'w-12': true, 'bg-neutral text-neutral-content': !avatar}">
            <img v-if="avatar" :src="`/file/${avatar}`" />
            <span v-else>{{ user.first_name[0].toUpperCase() }}</span>
          </div>
        </div>
        <div class="ml-3">
          <div class="text-weight-bold">{{ user.first_name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </div>
    </div>
    <div class="overflow-y-scroll p-3 flex-grow">
      <a href="/profile" class="btn btn-link">{{ $t('system.right_menu.profile.label') }}</a>
      <div class="collapse collapse-arrow shadow">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium bg-base-300">
          {{ $t('system.right_menu.config.label') }}
        </div>
        <div class="collapse-content bg-base-200">
          <FormKit
            type="select"
            :label="$t('system.languages.label')"
            v-model="locale"
            :options="locales"
          />
          <FormKit
            type="select"
            :label="$t('system.right_menu.theme.label')"
            v-model="theme"
            :options="themes"
          />
        </div>
      </div>
    </div>

    <div class="w-100 text-center bg-white p-1 shadow-lg">
      <button class="btn btn-sm btn-wide btn-error btn-outline" @click="handlerLogout">
        <font-awesome-icon icon="right-from-bracket" />
        Logout
      </button>
    </div>
  </aside>
</template>

<script>
import { router, useForm } from "@inertiajs/vue3";
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from "Resources/stores/auth";
import { useSystemStore } from "Resources/stores/system";
import UserForm from "Resources/pages/Users/UserForm.vue";

export default {
  components: { UserForm },
  computed: {
    ...mapState(useAuthStore, ["avatar", "getUser"]),
    user() {
      return this.getUser;
    },
    locales() {
      return this.$i18n.availableLocales.map((locale) => ({
        label: this.$t(`system.languages.options.${locale}`),
        value: locale,
      }));
    },
    themes() {
      return [
        { label: 'Light', value: "light" },
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
      rightDrawerOpen: false,
      theme: '',
      locale: 'en',
    };
  },
  watch: {
    locale: {
      handler(val) {
        if (!val) return;
        this.setLocale(val);
        this.$formkit.setLocale(val);
        this.$i18n.locale = val;
        document.documentElement.setAttribute('lang', val === 'ptBr' ? 'pt-br' : val)
      },
      immediate: true,
    },
    theme(val) {
      this.setTheme(val);
      document.documentElement.setAttribute("data-theme", val);
    },
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    ...mapActions(useSystemStore, ["setLocale", "setTheme"]),
    async handlerLogout() {
      const form = useForm({});
      await this.logout(form);
      router.get("/auth/login");
      window.location.reload()
    },
  },
  created() {
    const { getTheme, getLocale } = useSystemStore();
    this.theme = getTheme;
    this.locale = getLocale;
    document.documentElement.setAttribute('data-theme', this.theme);
  },
}
</script>

<style lang="scss" scoped>
.aside-right{
  width: 300px;
  top: var(--header-height);
  z-index: 500;
  @apply fixed translate-x-0 right-0 bottom-0 bg-neutral-content shadow-lg flex flex-col;
}

:deep(.formkit-wrapper) {
  width: 100%;
}
.user-profile {
  background-image: url("../../../public/gallery/bg-profile.jpeg");
  @apply bg-cover bg-center bg-no-repeat;
}
</style>
