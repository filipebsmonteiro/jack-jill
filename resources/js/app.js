import '../css/app.scss'
import { createApp, h } from 'vue'
import { createInertiaApp, Link } from '@inertiajs/vue3'
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import formKitConfig from '../../formkit/formkit.config'
import DefaultLayout from '../layouts/DefaultLayout.vue'

// console.log('window.location :>> ', window.location);

setTimeout(async () =>
  createInertiaApp({
    title: title => `${title ? title+ ' - ' : ''}Jack and Jill`,
    resolve: name => {
      // const file = name || 'HomePage'
      // const page = require(`../pages/${file}.vue`).default
      const page = require(`../pages/${name}.vue`).default
      page.layout = page.layout || DefaultLayout
      return page
    },
    render: createApp({ render: () => h('div', 'Loading...') }),
    setup ({ el, App, props, plugin }) {
      createApp({ render: () => h(App, props) })
        .use(plugin)
        .use(formKitPlugin, defaultConfig(formKitConfig))
        .component('InertiaLink', Link)
        .mount(el)
    },
  })
, 300)
