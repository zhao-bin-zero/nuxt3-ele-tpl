<template>
  <div class="page">
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <client-only><el-date-picker v-model="value1" type="date" /></client-only>
      <client-only>
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="3" disabled>Info</el-menu-item>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
      </client-only>
    </el-row>
    <nuxt-link :to="localePath('/')">{{ $t('title') }}</nuxt-link>
    <nuxt-link :to="switchLocalePath('zh-cn')">China</nuxt-link>
    <nuxt-link :to="switchLocalePath('en-us')">English</nuxt-link>
    <div class="home">
      {{ $t('title') }}
      <div>
        当前语言：{{ $i18n.locale }}
        <select v-model="currentLang" @change="switchLang">
          <option v-for="lang in allLang" :key="lang" :value="lang">{{ lang }}</option>
        </select>
      </div>

      <div>
        所有语言：
        {{ allLang }}
      </div>
    </div>
    <br />
    <el-row>
      <el-button :icon="Search" circle />
      <el-button type="primary" :icon="Edit" circle @click="aa" />
      <el-button type="success" :icon="Check" circle />
      <el-button type="info" :icon="Message" circle />
      <el-button type="warning" :icon="Star" circle />
      <el-button type="danger" :icon="Delete" circle />
    </el-row>
  </div>
</template>

<script lang="ts" setup>
  import { Check, Delete, Edit, Message, Search, Star } from '@element-plus/icons-vue'
  import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
  // import { useUserStore } from '@/stores/user'
  // definePageMeta({ middleware: 'auth' })
  const $i18n = useI18n()
  console.log(31213)
  const allLang = $i18n.locales.value.map((lang) => (lang as LocaleObject).code)
  const currentLang = ref($i18n.locale.value)
  const switchLang = () => {
    $i18n.setLocale(currentLang.value)
  }
  // const { logout } = useUserStore()

  // logout()

  const aa = () => {}
  const config = useRuntimeConfig()
  console.log('123', config, config.BASE_URL)
  const value1 = ref('')
</script>

<style lang="scss" scoped>
  .page {
    background-color: var(--primary-color);
  }
</style>
