import '../css/app.css'
import { createApp, h } from 'vue'
import { createInertiaApp, Link } from '@inertiajs/vue3'
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import formKitConfig from '../../formkit/formkit.config'
import DefaultLayout from '../layouts/DefaultLayout.vue'

setTimeout(() =>
  createInertiaApp({
    // resolve: name => import(`../pages/${name}.vue`),
    resolve: name => {
      const page = require(`../pages/${name}.vue`).default
      page.layout = page.layout || DefaultLayout
      return page
    },
    setup ({ el, App, props, plugin }) {
      createApp({ render: () => h(App, props) })
        .component('link', Link)
        .use(formKitPlugin, defaultConfig(formKitConfig))
        .use(plugin)
        .mount(el)
    },
  })
, 1000)
