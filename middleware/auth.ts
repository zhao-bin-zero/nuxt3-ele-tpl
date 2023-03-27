import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(async () => {
  // console.log('defineNuxtRouteMiddleware')
  const { token } = useUserStore()
  // console.log('token.value', token, to.fullPath, from.fullPath, process.client)
  if (token) {
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
