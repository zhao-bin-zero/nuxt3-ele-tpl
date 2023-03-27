import { useHttp } from '@/http/request'

enum Api {
  login = '/users/login',
  logout = '/users/logout',
  userInfo = '/users/userInfo'
}

/**
 * 登陆
 */
export interface LoginParamsType {
  email: string
  password: string
}
export interface LoginDataType {
  accessToken: string
}
export const loginApi = async (params: LoginParamsType) => {
  return await useHttp.post<LoginDataType>(Api.login, params)
}

/**
 * 退出
 */
export interface LogoutDataType {
  id: string
}
export const logoutApi = async () => {
  return await useHttp.get<LogoutDataType>(Api.logout)
}

/**
 * 获取用户信息
 */
export interface UserInfoDataType {
  id: string
}
export const getUserInfoApi = async () => {
  return await useHttp.get<UserInfoDataType>(Api.userInfo)
}
