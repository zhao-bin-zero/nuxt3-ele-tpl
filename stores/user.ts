import { defineStore } from 'pinia'
import { getUserInfoApi, logoutApi, UserInfoDataType } from '@/http/apis/user'

const storeSetup = () => {
  const userInfo = ref<UserInfoDataType>()
  const isLogin = computed(() => !!userInfo.value)
  const setUserInfo = (info?: UserInfoDataType) => {
    userInfo.value = info
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
    userInfo.value = undefined
    // jumpLink.toLogin()
  }
  const logout = async () => {
    await logoutApi()
    clearUserInfo()
  }

  return { userInfo, logout, isLogin, clearUserInfo, setUserInfo, getUserInfo }
}
export const useUserStore = defineStore('user.store', storeSetup, {
  // persist: true
  // persist: process.client && {
  //   storage: localStorage,
  //   paths: ['count']
  // }
})
