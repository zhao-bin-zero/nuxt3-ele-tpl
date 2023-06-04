<!-- ele dialog -->
<template>
  <el-dialog
    class="zero__dialog"
    v-model="visible"
    :show-close="showClose"
    :destroy-on-close="true"
    :title="title"
    :lock-scroll="true"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <div class="justify-flex-end" v-if="showBtn">
          <el-button @click="visible = false">Back</el-button>
          <el-button type="primary" @click="emits('submitForm')">Submit</el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      modelValue: boolean
      title?: string
      width?: string
      closeOnClickModal?: boolean
      showClose?: boolean
      showBtn?: boolean
    }>(),
    {
      width: '500px',
      closeOnClickModal: true,
      showClose: true,
      showBtn: true
    }
  )
  const emits = defineEmits(['submitForm', 'update:modelValue'])
  // 弹框是否隐藏
  const visible = useVModel(props, 'modelValue')
</script>
<style lang="scss">
  .zero__dialog {
    .el-dialog__header {
      border-bottom: 1px solid #eee;
      margin-right: 0;
      padding: 17px 36px 10px 20px;
      .el-dialog__title {
        font-size: 20px;
        font-weight: 600;
        color: #333333;
        line-height: 28px;
      }
    }
    .el-dialog__body {
      padding: 20px;
    }
  }
</style>
