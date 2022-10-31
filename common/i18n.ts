import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import enUs from 'element-plus/dist/locale/en.mjs'

// 静态类
class i18n {
  lacales = [
    { code: 'zh-cn', text: '简体中文', iso: 'zh-cn', file: 'zh-cn.json' },
    { code: 'en-us', text: 'English', iso: 'en-us', file: 'en-us.json' }
  ]
  elementLocale = {
    'zh-cn': zhCn,
    'en-us': enUs
  }
  // lacales最后一个值为默认值
  get defaultLocaleCode() {
    return this.lacales[this.lacales.length - 1].code
  }
}
// 暴露i18n
export default new i18n()
