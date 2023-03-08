import { isArray, isObject } from './is'

// 格式化时间
const padLeftZero = (str: string) => {
  return ('00' + str).substr(str.length)
}
export const formatDate = (date: Date, fmt = 'yyyy-MM-dd') => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o: { [key: string]: number } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

// 深拷贝
export const deepCopy: <T>(arg: T) => T = (obj) => {
  const result: any = isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isObject(obj[key]) || isArray(obj[key])) {
        result[key] = deepCopy(obj[key]) //递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
