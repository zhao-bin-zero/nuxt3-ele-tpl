<!-- 登录校验 适用于登录前与登录后样式一致的情况-->
<template>
  <div class="inline-block login__check">
    <div class="login__check-go cursor-pointer" v-if="!isLogin" @click.stop="jumpLink.toLogin"> </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/stores/user'
  const { isLogin } = useUserStore()
</script>
<style lang="scss" scoped>
  .login__check {
    position: relative;
    overflow: hidden;
    .login__check-go {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0%;
      top: 0%;
      z-index: 2;
    }
  }
</style>
