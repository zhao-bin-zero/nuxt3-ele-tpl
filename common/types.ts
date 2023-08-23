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
  id: string // formItem的key
  label: string // formItem的label
  type: string // formItem的类型
  defaultValue?: string | number // formItem默认值
  constraints?: {
    readonly?: boolean // 是否可写 为ture表示后端不解析
    required?: boolean // 必填
    minlength?: number // 最小长度
    maxlength?: number // 最大长度
    max?: number // 最大值
    min?: number // 最小值
    step?: number // 步长
  }
  display?: {
    align?: string // 文字是否居中
    disabled?: boolean // 是否可写 后端解析（参考readonly）
    valueType?: 'string' | 'number' // 定义formItem的value类型
    enumLabel?: (params?: any) => string // formItem中select的label显示
    enumGroupLabel?: (label: string | number) => string // formItem中select的Group显示
    enumValue?: (params?: any) => string | number // formItem中select的value显示
    hided?: boolean // 是否隐藏 v-show
    multiAnswer?: boolean // 是否多选
    submitType?: 'string' | 'array' // 提交类型
    order?: number // 排序
    reminder?: string // formItem描述
    textArea?: boolean // 是否为多行文本框
    richText?: boolean // 是否为富文本
    placeholder?: string // formItem输入框中的提示
    regex?: string // 正则验证规则
    errorTip?: string // 正则验证报错
    tab?: string // 值为组合后的formItem的key 主要用于显示 有值代表当tab切换处理
    frontTab?: string // 值为组合后的数据的key，主要用于数据处理提交
  }
  enumOptions?: any // formItem中select option的列表数据
  enumGroupOptions?: any // formItem中select Group option的列表数据
  file?: {
    // 上传和下载参数
    path?: string // 上传接口
    fileType: string // 文件域 会提交到接口
    contentType?: string // 文件类型，用于前端显示
    fileLimit?: number // 可上传文件数量
    // data?: (params?: ObjectType<any>) => object // 初始化上传文件时需要传给接口的data
  }
  // 前端设置
  changeInit?: (taskFormCon?: ObjectType<any>, formfieldsObj?: ObjectType<TaskFormFieldsDataType>) => void // formItem value change执行方法，可用于联动修改其它formItem的动态值
  textValue?: (params?: ObjectType<any>) => string | number // 初始化form中一些显示的内容
  list?: TaskFormFieldsDataType[] // formItem下的formItem列表，目前用于tab切换
}

export interface FileType extends UploadFile {
  id: string
}

export interface MenuType {
  label: string
  name: string
  disabled?: boolean
}
