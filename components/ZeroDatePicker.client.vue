<template>
  <!-- :value-format="valueFormat" valueFormat除了x和空，其他会导致默认值不好使 -->
  <el-date-picker
    v-model="times"
    :type="type"
    unlink-panels
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :value-format="isValueFormat ? valueFormat : ''"
    :format="format"
    @change="changeTime"
  />
</template>

<script lang="ts" setup>
  import { DateModelType } from 'element-plus'
  import { IDatePickerType } from 'element-plus/es/components/date-picker/src/date-picker.type'
  type timesType = [DateModelType, DateModelType]
  const props = withDefaults(
    defineProps<{
      type?: IDatePickerType
      startTime?: DateModelType
      endTime?: DateModelType
      valueFormat?: string
      format?: string
    }>(),
    {
      type: 'daterange',
      valueFormat: 'x'
    }
  )
  const emit = defineEmits(['update:startTime', 'update:endTime', 'change'])
  const isValueFormat = computed(() => {
    return props.valueFormat === '' || props.valueFormat === 'x'
  })
  // const startTime = ref('2014/10')
  // const endTime = ref('2017/10')
  const times = ref<timesType>()
  watch(
    () => [props.startTime, props.endTime],
    (n, o = []) => {
      if (n[0] !== o[0] || n[1] !== o[1]) {
        times.value = n as timesType
      }
    },
    {
      deep: true,
      immediate: true
    }
  )
  const changeTime = (times: timesType) => {
    let startTime: DateModelType = '',
      endTime: DateModelType = ''
    if (times) {
      if (isValueFormat.value) {
        startTime = times[0]
        endTime = times[1]
      } else {
        startTime = useDateFormat(times[0], props.valueFormat).value
        endTime = useDateFormat(times[1], props.valueFormat).value
      }
    }
    // console.log(1, startTime, endTime)
    emit('update:startTime', startTime)
    emit('update:endTime', endTime)
    emit('change')
  }
</script>
<style lang="scss" scoped></style>
