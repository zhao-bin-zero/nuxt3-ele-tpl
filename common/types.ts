// 本地分页使用
export interface IPagesResult<T> {
  page: number
  prev: boolean
  next: boolean
  data: T[]
}
// 分页传递参数
export interface IPage {
  before?: string | number
  after?: string | number
  limit?: number
}

export interface TaskFormFieldsDataType {
  id: string
  label: string
  type: string
  defaultValue?: string | number
  constraints: {
    readonly?: boolean // 为ture表示后端不解析
    required?: boolean
    minlength?: number
    maxlength?: number
    max?: number
    min?: number
  }
  display: {
    align?: string
    disabled: boolean // 代表只读且后端解析
    hided?: boolean
    multiAnswer: boolean
    order?: number
    reminder?: string
    textArea: boolean
    richText?: boolean
    placeholder?: string
    regex?: string
    errorTip?: string // 正则报错
    tab?: string
    frontTab?: string
  }
  enumOptions?: {
    [key: string]: string
  }
  file?: {
    fileAction: string
    fileType: string
    contentType?: string
    fileLimit?: number
  }
  // 前端设置
  changeInit?: (init: Function, params?: { [key: string]: any }) => void // 切换时执行初始化方法
  textValue?: (params?: { [key: string]: any }) => string
  list?: TaskFormFieldsDataType[]
}

export interface ObjectType<T> {
  [key: string]: T
}

export type FileType = {
  name: string
  id: string
  url?: string
  type?: string
  size?: number
  uid?: number
  raw?: File
}
