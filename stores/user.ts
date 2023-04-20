import { defineStore } from 'pinia'
import { getUserInfoApi, LoginDataType, UserInfoDataType } from '@/http/apis/user'

const storeSetup = () => {
  const token = useCookie<LoginDataType['accessToken'] | undefined>('token')
  const userInfo = ref<UserInfoDataType>()
  const isLogin = computed(() => !!userInfo.value)
  const setUserInfo = (info?: UserInfoDataType) => {
    userInfo.value = info
  }
  const setToken = (t?: LoginDataType['accessToken']) => {
    token.value = t
  }
  const getUserInfo = async () => {
    const { data, error } = await getUserInfoApi()
    setUserInfo(data.value?.data)
    return { data, error }
  }
  // const login = async (params: LoginParamsType) => {
  //   const { data } = await loginApi(params)
  //   await getUserInfo()
  //   return data.value?.data
  // }
  const clearUserInfo = () => {
    // 清空用户信息
    setUserInfo()
    setToken()
  }
  const logout = async (passive = false) => {
    if (!passive) {
      // await logoutApi()
    }
    clearUserInfo()
    jumpLink.toLogin(passive)
  }

  return { userInfo, logout, isLogin, clearUserInfo, setUserInfo, getUserInfo, token, setToken }
}
export const useUserStore = defineStore('user.store', storeSetup, {
  // persist: true
  // persist: process.client && {
  //   storage: localStorage,
  //   paths: ['count']
  // }
})
