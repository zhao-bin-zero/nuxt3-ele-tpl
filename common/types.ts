import { UploadFile } from 'element-plus'

export interface ObjectType<T> {
  [key: string]: T
}
export interface LabelListType {
  label: string
  value: number
}
// 本地分页使用
export interface IPagesResult<T> {
  pageNum: number
  prev: boolean
  next: boolean
  data: T[]
}
// 分页传递参数
export interface IPage {
  pageNum?: number // 新增，与before和after互斥
  before?: string | number
  after?: string | number
  limit?: number
}

export interface TaskFormFieldsDataType {
  id: string
  label: string
  type: string
  defaultValue?: string | number
  constraints?: {
    readonly?: boolean // 为ture表示后端不解析
    required?: boolean
    minlength?: number
    maxlength?: number
    max?: number
    min?: number
  }
  display?: {
    align?: string
    disabled?: boolean // 代表只读且后端解析
    valueType?: 'string' | 'number' // 枚举value类型
    enumLabel?: (params?: any) => string
    enumGroupLabel?: (label: string | number) => string
    enumValue?: (params?: any) => string | number
    hided?: boolean
    multiAnswer?: boolean
    submitType?: 'string' | 'array'
    order?: number
    reminder?: string
    textArea?: boolean
    richText?: boolean
    placeholder?: string
    regex?: string
    errorTip?: string // 正则报错
    tab?: string
    frontTab?: string
  }
  enumOptions?: any
  enumGroupOptions?: any
  file?: {
    path?: string
    fileType: string
    contentType?: string
    fileLimit?: number
  }
  // 前端设置
  changeInit?: (
    params?: ObjectType<any>,
    formfieldsObj?: ObjectType<TaskFormFieldsDataType>,
    rules?: ObjectType<ObjectType<any>[]>
  ) => void // 切换时执行初始化方法
  textValue?: (params?: ObjectType<any>) => string
  list?: TaskFormFieldsDataType[]
}

export interface FileType extends UploadFile {
  id: string
}

export interface MenuType {
  label: string
  name: string
  disabled?: boolean
}
