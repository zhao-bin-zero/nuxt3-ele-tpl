import type { FetchResponse } from 'ofetch'
import type { Ref } from 'vue'
import type { UseFetchOptions } from '#app'
import { useUserStore } from '@/stores/user'
import { ObjectType } from '@/common/types'

// 后端返回的数据类型
export interface ResponseDataType<T> {
  readonly code: number
  readonly message: string
  readonly data: T
}

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)
type ParamsType = ObjectType<any>

export type HttpOptions<T> = UseFetchOptions<ResponseDataType<T>>

const handleError = <T>(response: FetchResponse<ResponseDataType<T>> & FetchResponse<ResponseType>) => {
  const err = (text?: string) => {
    // 全局报错
    process.client &&
      ElMessage.error({
        message: response?._data?.message ?? text ?? '未知错误！'
      })
  }

  const { logout } = useUserStore()

  if (!response._data) {
    err('请求超时，服务器无响应！')
    return
  }
  if (response.status === 200) {
    err()
    // 判断登陆
    // if (response._data.code === 9401) {
    //   logout()
    // }
  } else {
    const handleMap: { [key: number]: () => void } = {
      404: () => {
        err('服务器资源不存在')
      },
      500: () => err('服务器内部错误'),
      403: () => err('没有权限访问该资源'),
      401: () => {
        err('登录状态已过期，需要重新登录')
        logout(true)
      }
    }
    handleMap[response.status] ? handleMap[response.status]() : err()
  }
}

// loading
const loadingInstance = {
  target: null as any,
  count: 0
}

/**
 * 打开Loading层实例
 * @param request
 */
const openLoading = () => {
  // request: any
  // if (request?.headers?.request_loading) {
  loadingInstance.count++
  if (loadingInstance.count === 1) {
    loadingInstance.target = ElLoading.service({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)' })
  }
  // }
}
/**
 * 关闭Loading层实例
 * @param request
 */
const closeLoading = () => {
  // request: any
  if (loadingInstance.count > 0) loadingInstance.count--
  if (loadingInstance.count === 0) {
    loadingInstance.target!.close()
    loadingInstance.target = null
  }
}

/**
 * 生成每个请求唯一的键
 * @param request
 * @returns string
 */
// const getPendingKey = <T>(url: UrlType, { method, params, body }: UseFetchOptions<ResponseDataType<T>>) => {
//   return [url, method, JSON.stringify(params), JSON.stringify(body)].join('&')
// }
const fetch = <T>(url: UrlType, options: UseFetchOptions<ResponseDataType<T>>) => {
  // const {
  //   public: { BASE_URL }
  // } = useRuntimeConfig()
  // const baseUrl = {
  //   '/vdx': BASE_URL
  // }
  // let isReplace = false
  // for (let i = 0; i < Object.keys(baseUrl).length; i++) {
  //   const key = Object.keys(baseUrl)[i] as keyof typeof baseUrl
  //   if ((url as string).startsWith(key)) {
  //     url = (url as string).replace(key, baseUrl[key])
  //     isReplace = true
  //   }
  // }
  // if (!isReplace) {
  //   url = BASE_URL + url
  // }
  return useFetch(url, {
    // 请求拦截器
    onRequest({ options }) {
      console.log('onRequest')
      // 添加baseURL,nuxt3环境变量要从useRuntimeConfig里面取
      const {
        public: { BASE_URL }
      } = useRuntimeConfig()
      options.baseURL = BASE_URL

      options.headers = new Headers(options.headers)
      const { token } = useUserStore()
      if (token) {
        options.headers.set('VDX-TOKEN', token)
        // options.headers.set('Authorization', `Bearer ${token.value}`)
      }
      // Accept-Language

      openLoading()
    },
    // 响应拦截
    onResponse({ response }) {
      // if (response.headers.get('content-disposition') && response.status === 200) return response
      // TODO bug auth中间件初始化调用接口时onResponse获取不到useRoute
      console.log('onResponse')
      closeLoading()
      if (response.status === 200 && response._data.code === 9200) {
        // 成功返回
        return response._data
      } else {
        handleError<T>(response)
        return Promise.reject(response._data)
      }
    },
    // 错误处理
    onResponseError({ response }) {
      console.log('onResponseError')
      closeLoading()

      handleError<T>(response)
      return Promise.reject(response?._data ?? null)
    },
    // key: getPendingKey(url, options), // 相同的key不重复请求，可能需要设置时间
    // 合并参数
    ...options
    // server: false
  })
}

// 自动导出
export const useHttp = {
  get: <T>(url: UrlType, params?: ParamsType, options?: HttpOptions<T>) => {
    return fetch<T>(url, { method: 'get', params, ...options })
  },

  post: <T>(url: UrlType, body?: ParamsType, options?: HttpOptions<T>) => {
    return fetch<T>(url, { method: 'post', body, ...options })
  },

  put: <T>(url: UrlType, body?: ParamsType, options?: HttpOptions<T>) => {
    return fetch<T>(url, { method: 'put', body, ...options })
  },

  delete: <T>(url: UrlType, body?: ParamsType, options?: HttpOptions<T>) => {
    return fetch<T>(url, { method: 'delete', body, ...options })
  }
}

export const endTimeAdd1D = (params: any, endTimeKey = 'endTime') => {
  if (params[endTimeKey]) {
    params[endTimeKey] += 1 * 24 * 60 * 60 * 1000
  }
}
