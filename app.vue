<template>
  <el-config-provider :locale="locale">
    <NuxtPage :class="$i18n.locale.value" />
  </el-config-provider>
</template>

<script setup>
  import i18n from '@/common/i18n'
  const $i18n = useI18n()
  const locale = ref()
  watch(
    $i18n.locale,
    (n) => {
      locale.value = i18n.elementLocale[n]
    },
    {
      immediate: true
    }
  )
</script>
