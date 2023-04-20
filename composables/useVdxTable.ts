import { DIRECTION, VDX } from '@/common/constants'
import { IPage, IPagesResult } from '@/common/types'
import { FormInstance } from 'element-plus'

type callbackFunType = (pageParams: IPage) => Promise<any>
type idKeyType = string | number

// table查询分页
export const useVdxTable = () => {
  const tableFormRef = ref<FormInstance>()

  const tableResult = ref<IPagesResult<any>>({
    pageNum: 0,
    prev: false,
    next: false,
    data: []
  })

  const tableLoading = ref(false)
  const listGetCalculate = async (direction: number, idKey: idKeyType, callback: callbackFunType) => {
    if (tableLoading.value) return
    tableLoading.value = true
    if (direction === DIRECTION.NONE) {
      tableResult.value.pageNum = 0
      tableResult.value.data = []
    }
    let pageParams = {} as IPage
    const pageNum = direction === DIRECTION.PREV ? tableResult.value.pageNum - 1 : tableResult.value.pageNum + 1
    if (idKey === 0) {
      pageParams = {
        pageNum
      }
    } else {
      const list = tableResult.value.data
      const after = direction === DIRECTION.PREV && list.length ? list[0][idKey] : 0
      const before = direction === DIRECTION.NEXT && list.length ? list[list.length - 1][idKey] : 0
      pageParams = {
        before,
        after
      }
    }
    pageParams.limit = VDX.pageSize
    const { error, data } = await (await callback)(pageParams)

    tableLoading.value = false
    if (!error.value) {
      const data2 = data.value.data
      if (data2.length) {
        tableResult.value.data = data2
        tableResult.value.pageNum = pageNum
      }
      tableResult.value.prev = direction === DIRECTION.NONE ? false : tableResult.value.pageNum > 1
      tableResult.value.next = direction !== DIRECTION.PREV ? data2?.length === pageParams.limit : true
    }
  }

  const tableSearchSubmit = (
    direction = DIRECTION.NONE,
    idKey: idKeyType, // ===0 属于新分页
    callback: callbackFunType
  ) => {
    console.log(direction, 'direction')
    if (tableFormRef.value) {
      tableFormRef.value.validate((valid: boolean) => {
        if (valid) {
          listGetCalculate(direction, idKey, callback)
        }
      })
    } else {
      listGetCalculate(direction, idKey, callback)
    }
  }

  return {
    tableLoading: false, // 与http的loading冲突，暂未有好方法
    tableResult,
    tableSearchSubmit,
    tableFormRef
  }
}
