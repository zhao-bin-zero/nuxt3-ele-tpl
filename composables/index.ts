// import * as constantsAll from '@/common/constants'
// import * as utilsAll from '@/common/utils'
// import * as isAll from '@/common/is'
// import * as user from '@/http/apis/user'
// import * as common from '@/http/apis/common'

import { FormInstance } from 'element-plus'
import { LabelListType, ObjectType } from '@/common/types'
import { klona } from 'klona'

// export const constants = constantsAll
// export const utils = utilsAll
// export const is = isAll
// export const api = { user, common }

// 去登陆
export const jumpLink = {
  toLogin: async (callback = true) => {
    const route = useRoute()
    const loginPath = useLocalePath()('/login')
    if (callback) {
      if (loginPath !== route.path) {
        return await navigateTo({
          path: loginPath,
          query: {
            callbackUrl: route.fullPath
          }
        })
      } else {
        // console.log(route, route.fullPath)
        return await navigateTo(route.fullPath)
      }
    } else {
      return await navigateTo(loginPath)
    }
  },
  leaveLogin: async () => {
    const route = useRoute()
    await navigateTo((route.query.callbackUrl as string) || useLocalePath()('/'))
  }
}

export const resetForm = (formRef: FormInstance, callback?: () => void) => {
  formRef?.resetFields()
  callback && callback()
}

export const EnumToArray = (enumme: any): LabelListType[] => {
  return Object.keys(enumme)
    .filter((value: string | number) => !isNaN(Number(value)))
    .map((key) => ({ label: enumme[key].toString(), value: +key }))
}

export const ArrayToObj = <T>(array?: T[], key = 'id', deep = false) => {
  const obj = {} as ObjectType<T>
  array?.forEach((item: T) => {
    if (deep) {
      obj[(item as any)[key]] = klona(item)
    } else {
      obj[(item as any)[key]] = item
    }
  })
  return obj
}

// export const clog = (...params: any[]) => {
//   const {
//     public: { MODE }
//   } = useRuntimeConfig()
//   MODE !== 'prod' && console.log(...params)
// }
