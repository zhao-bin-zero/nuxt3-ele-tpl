import i18n from './common/i18n'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // meta
  meta: {
    title: 'Element Plus + Nuxt 3',
    loading: { color: '#3067d9' },
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'ElementPlus + Nuxt3'
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  modules: [
    '@nuxtjs/i18n' // 加载 i18n 模块
  ],
  i18n: {
    locales: i18n.lacales,
    langDir: 'locales/', // 存放语言文件的地方
    defaultLocale: i18n.defaultLocaleCode, // 默认语言
    lazy: true, // 懒加载，被使用到的时候才去请求该语言文件
    strategy: 'prefix', // 其他设置请参考 https://i18n.nuxtjs.org/strategies
    detectBrowserLanguage: {
      // 自动侦测语言，如果是服务端渲染时，会从请求头中获取；如果在客户端会通过 navigator.language 获取；
      useCookie: true, // 优先从 cookie 中获取 使用的语言 该选择设置为 true 时将不会自动侦测客户端语言，只会从cookies中获取 取不到会取默认值
      cookieKey: 'lang'
      // cookieDomain: '',
    },
    vueI18n: {
      legacy: false,
      locale: i18n.defaultLocaleCode,
      fallbackLocale: i18n.defaultLocaleCode
    }
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/index.scss'],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // privateRuntimeConfig: {}
  publicRuntimeConfig: require(`./env/${process.env.NUXT_NODE_ENV}`)
})
