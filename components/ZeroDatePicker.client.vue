<template>
  <el-date-picker
    v-model="times"
    :type="type"
    unlink-panels
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :value-format="valueFormat"
    :format="format"
    @change="changeTime"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  export default defineComponent({
    name: 'ZeroDatePicker',
    props: {
      type: {
        type: String,
        default: 'monthrange'
      },
      startTime: {
        type: String,
        default: ''
      },
      endTime: {
        type: String,
        default: ''
      },
      valueFormat: {
        type: String,
        default: 'YYYY.MM'
      },
      format: {
        type: String,
        default: 'YYYY.MM'
      }
    },
    emits: ['update:startTime', 'update:endTime', 'change'],
    setup(props, { emit }) {
      // const startTime = ref('2014/10')
      // const endTime = ref('2017/10')
      const times = ref<string[]>([])
      watch(
        () => [props.startTime, props.endTime],
        (n, o = []) => {
          if (n[0] !== o[0] || n[1] !== o[1]) {
            times.value = n
          }
        },
        {
          deep: true,
          immediate: true
        }
      )
      const changeTime = (times: string[]) => {
        // console.log(1, times)
        emit('update:startTime', times ? times[0] : '')
        emit('update:endTime', times ? times[1] : '')
        emit('change')
      }
      return {
        times,
        changeTime
      }
    }
  })
</script>
<style lang="scss" scoped></style>
