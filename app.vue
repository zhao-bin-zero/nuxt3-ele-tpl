<template>
  <div :class="locale">
    <NuxtLayout>
      <el-config-provider :locale="i18n.elementLocale[locale]">
        <NuxtPage />
      </el-config-provider>
    </NuxtLayout>
  </div>
</template>

<script setup>
  import i18n from '@/common/i18n'
  const { locale } = useI18n()
</script>
