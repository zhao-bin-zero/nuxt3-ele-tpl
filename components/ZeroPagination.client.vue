<template>
  <div class="zero-pagination justify-flex-end">
    <el-pagination
      class="zero-pagination-content"
      :current-page="currentPage"
      background
      hide-on-single-page
      :page-sizes="pageSizesArr"
      :page-size="pageSize"
      layout="prev, pager, next, sizes, total, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
  withDefaults(
    defineProps<{
      total: number
      pageSize?: number
      currentPage?: number
    }>(),
    {
      pageSize: 20,
      currentPage: 1
    }
  )
  const emit = defineEmits(['update:pageSize', 'getList'])

  //分页
  const pageSizesArr = [20, 40, 50, 80, 100]
  const handleSizeChange = (val: number) => {
    console.log(val)
    emit('update:pageSize', val)
    emit('getList', 1)
  }
  const handleCurrentChange = (val: number) => {
    console.log(val)
    emit('getList', val)
  }
</script>
<style lang="scss">
  .zero-pagination {
    font-size: 14px;
    margin-top: 20px;
    .zero-pagination-content {
      &.is-background {
        .btn-next,
        .btn-prev,
        .el-pager li {
          // background-color: #fff;
          // border: 1px solid #dcdcdc;
          border-radius: 4px;
        }
        .el-pager li:not(.disabled).is-active {
          // background-color: var(--primary-color);
          // color: #fff;
          // border: 0 none;
        }
        // .el-pagination__sizes {
        //   margin-right: 136px;
        // }
      }
    }
  }
</style>
