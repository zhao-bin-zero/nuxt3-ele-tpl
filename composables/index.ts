// import * as constantsAll from '@/common/constants'
// import * as utilsAll from '@/common/utils'
// import * as isAll from '@/common/is'
// import * as user from '@/http/apis/user'
// import * as common from '@/http/apis/common'

import { FormInstance } from 'element-plus'

// export const constants = constantsAll
// export const utils = utilsAll
// export const is = isAll
// export const api = { user, common }

// 去登陆
export const jumpLink = {
  toLogin: async () => {
    const route = useRoute()
    const loginPath = useLocalePath()('/login')
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
