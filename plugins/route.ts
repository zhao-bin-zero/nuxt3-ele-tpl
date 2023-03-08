// import { NavigationGuardNext, RouteLocationNormalized } from '@intlify/vue-router-bridge'

export default defineNuxtPlugin(() => {
  // nuxtApp.$router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  //   console.log(to, from)
  //   const lang = useCookie('lang')
  //   if (to.name) {
  //     if (to?.params?.lang) {
  //       lang.value = to.params.lang as string
  //       next()
  //     } else if (lang) {
  //       return navigateTo(`/${lang}/`)
  //     } else {
  //       return navigateTo(`/zh`)
  //     }
  //   } else {
  //     return navigateTo(`/zh`)
  //   }
  // })
})
