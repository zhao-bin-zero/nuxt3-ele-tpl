<!-- 切换亮暗模式 多种主题可使用@nuxtjs/color-mode -->
<template>
  <use-dark v-slot="{ isDark, toggleDark }">
    <el-switch :model-value="isDark" size="large" @change="toggleDark" />
  </use-dark>
</template>

<script lang="ts" setup>
  import { UseDark } from '@vueuse/components'
</script>
<style lang="scss" scoped></style>
