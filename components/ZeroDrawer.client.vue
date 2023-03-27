<template>
  <!-- destroy-on-close 控制是否在关闭 Drawer 之后将子元素全部销毁-->
  <el-drawer
    v-model="visible"
    custom-class="zero__drawer"
    direction="rtl"
    :destroy-on-close="true"
    :lock-scroll="true"
    @close="closeDrawerFunc"
  >
    <template #header>
      <el-breadcrumb separator-class="el-icon-arrow-right" v-if="titles">
        <el-breadcrumb-item v-for="item in titles" :key="item">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <slot></slot>
  </el-drawer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      modelValue: boolean
      titles?: string[]
      size?: string
    }>(),
    {
      size: '900px'
    }
  )

  const emits = defineEmits(['closeDrawerFunc'])
  // 弹框是否隐藏
  const visible = useVModel(props, 'modelValue')

  const closeDrawerFunc = () => {
    emits('closeDrawerFunc')
  }
</script>
<style lang="scss">
  .zero__drawer {
    // width: 900px !important;
    .el-drawer__body {
      overflow: auto;
    }
  }
</style>
