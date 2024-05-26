/** @see https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3 */
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
/** @see https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  devtools: { enabled: true },
  // css: [
  //   "vuetify/lib/styles/main.sass"
  // ],
  build: {
    transpile: ['vuetify'],
  },
  devServer: {
    host: '0.0.0.0',
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    // for HMR
    server: {
      watch: {
        usePolling: true,
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  plugins: [
    '~/plugins/vuetify.ts',
  ],
  modules: [
    '@nuxt/eslint',
    '@nuxt/devtools',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    // ...
  ],
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
        jsx: true,
      },
    },
  },
})
