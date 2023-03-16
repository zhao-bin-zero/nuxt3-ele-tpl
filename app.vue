<template>
  <NuxtLayout>
    <el-config-provider :locale="i18n.elementLocale[locale]">
      <NuxtPage :class="locale" />
    </el-config-provider>
  </NuxtLayout>
</template>

<script setup>
  import i18n from '@/common/i18n'
  const { locale } = useI18n()
</script>
