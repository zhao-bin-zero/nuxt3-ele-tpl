import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(async () => {
  // console.log('defineNuxtRouteMiddleware')
  const token = useCookie('token')
  // console.log('token.value', token.value, to.fullPath, from.fullPath, process.client)
  if (token.value) {
    const { isLogin, getUserInfo } = useUserStore()
    if (isLogin) {
    } else {
      console.log('有token无用户信息')
      const { error } = await getUserInfo()
      if (error.value) {
        // return abortNavigation()
        return jumpLink.toLogin()
      }
    }
  } else {
    console.log('无token')
    return jumpLink.toLogin()
  }
})
