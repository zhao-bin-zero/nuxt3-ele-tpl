<template>
  <div class="zero-table" ref="tableParentRef">
    <div v-if="showTableHeader" class="zero-table__head">
      <slot name="header">
        <!--    todo: 表格工具栏    -->
        <div class="table-tool">
          <el-button title="refresh" icon="Refresh" @click="emits('getList', DIRECTION.NONE)" />
          <el-button icon="Apple" />
          <el-button icon="Setting" />
          <el-button
            :title="isFullscreen ? 'exit fullscreen' : 'fullscreen'"
            :icon="isFullscreen ? 'Rank' : 'FullScreen'"
            :style="{ color: isFullscreen ? 'red' : 'green' }"
            @click="toggleFullScreen"
          />
        </div>
      </slot>
    </div>
    <div class="zero-table__content">
      <el-table
        ref="tableRef"
        v-loading="loading"
        :height="tableHeight"
        :class="[tableClass]"
        :data="tableResult.data"
        @selection-change="selectionChange"
      >
        <slot></slot>
        <template #empty>
          <el-empty />
        </template>
      </el-table>
    </div>
    <div class="zero-table__foot">
      <slot name="footer"></slot>
    </div>
    <div class="zero-pagination justify-flex-end mg-bt-10 mg-tp-10">
      <el-button
        plain
        icon="ArrowLeft"
        :disabled="!tableResult.prev"
        class="btn-prev"
        @click="emits('getList', DIRECTION.PREV)"
      />
      <el-button
        plain
        icon="ArrowRight"
        :disabled="!tableResult.next"
        class="btn-next"
        @click="emits('getList', DIRECTION.NEXT)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { IPagesResult } from '@/common/types'
  import { DIRECTION } from '@/common/constants'
  import { TableInstance } from 'element-plus'

  withDefaults(
    defineProps<{
      loading?: boolean
      showTableHeader?: boolean
      tableHeight?: string
      tableClass?: string
      tableResult: IPagesResult<any>
    }>(),
    {
      loading: false,
      showTableHeader: true
    }
  )
  const emits = defineEmits(['getList', 'selectionChange'])

  const tableRef = ref<TableInstance>()
  const tableParentRef = ref()
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen(tableParentRef)

  const selectionChange = (val: []) => {
    emits('selectionChange', val)
  }
  // const doLayout = () => {
  //   nextTick(() => {
  //     console.log('dolayout')
  //     tableRef.value?.doLayout()
  //   })
  // }
  defineExpose({ tableRef })
</script>
<style lang="scss" scoped>
  .zero-table {
    overflow: hidden;
    .zero-table__head {
      margin-bottom: 10px;
    }
    &:fullscreen {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 30px 20px;
      .zero-table__head {
        margin-bottom: 20px;
      }
      .zero-table__content {
        overflow: scroll;
        // flex: 1 1 0%;
      }
    }
  }
  .zero-pagination {
    .zero-pagination-content {
      > .el-button {
        padding: 8px 10px;
        .btn-prev {
        }
        .btn-next {
        }
      }
    }
  }
</style>
