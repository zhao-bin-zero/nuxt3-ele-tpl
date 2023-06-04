import i18n from './i18n'

const isProduction = process.env.MODE === 'prod'

// TODO 生产环境移除console

// https://nuxt.com/docs/api/configuration/nuxt-config#runtimeconfig
export default defineNuxtConfig({
  debug: !isProduction,
  ssr: true,
  app: {
    head: {
      title: 'Element Plus + Nuxt 3',
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
    }
  },
  modules: [
    '@nuxtjs/i18n', // 加载 i18n 模块
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt'
  ],
  elementPlus: {
    importStyle: 'css',
    themes: ['dark'],
    components: ['ElSubMenu']
  },
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
    vueI18n: '/i18n/config'
  },
  // alias: {
  // '@': '.'
  // },
  css: [`@/assets/styles/theme/${process.env.COLOR || 'index'}.scss`, '@/assets/styles/index.scss'],
  devServer: {
    port: 3000
  },
  runtimeConfig: {
    public: {
      NUXT_NODE_ENV: process.env.NUXT_NODE_ENV,
      MODE: process.env.MODE,
      BASE_URL: process.env.BASE_URL,
      // 样式换肤
      COLOR: process.env.COLOR
    }
  },
  nitro: {
    // 该配置用于客户端请求转发
    devProxy: {
      '/api': {
        target: 'http://172.31.139.192:9456', //这里是接口地址
        changeOrigin: true
      }
    },
    // 该配置用于服务端请求转发
    routeRules: {
      '/api/**': { proxy: { to: 'http://172.31.139.192:9456/**' } }
    },
    prerender: {
      crawlLinks: true
      // routes: [],
      // ignore: i18n.getAllRoute('/case')
    }
  }
  // components: [
  //   {
  //     path: '~/components'
  //   }
  // ],
  // postcss: {
  //   plugins: {
  //     autoprefixer: true
  //   }
  // },
})
