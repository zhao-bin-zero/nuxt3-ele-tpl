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
    <nuxt-link :to="localePath('/case')">{{ $t('title') }}</nuxt-link>
    <nuxt-link :to="switchLocalePath('zh-cn')">China</nuxt-link>
    <nuxt-link :to="switchLocalePath('en-us')">English</nuxt-link>
    <div class="home">
      {{ $t('title') }}
      <div>
        当前语言：{{ locale }}
        <client-only>
          <el-select :model-value="locale" @change="changeLink">
            <el-option v-for="lang in allLang" :key="lang" :value="lang" :label="lang" />
          </el-select>
        </client-only>
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
      <!-- 暗夜模式切换 -->
      <zero-dark />
    </el-row>
    <!-- {{ count }} -->
  </div>
</template>

<script lang="ts" setup>
  import { Check, Delete, Edit, Message, Search, Star } from '@element-plus/icons-vue'
  import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
  // import { useUserStore } from '@/stores/user'

  // 登陆验证
  // definePageMeta({ middleware: 'auth' })

  // 语言切换
  const { locale, locales } = useI18n()
  const allLang = locales.value.map((lang) => (lang as LocaleObject).code)
  const changeLink = (locale: string) => {
    navigateTo(useSwitchLocalePath()(locale))
  }
  console.log(123)

  // 使用倒计时
  // const { start, count } = useCountDown()
  // onMounted(() => {
  //   start()
  // })

  // 使用接口
  // const { logout } = useUserStore()
  // logout()
  const aa = () => {}
  // const config = useRuntimeConfig()
  // console.log('123', process.env?.COLOR, config.COLOR)
  const value1 = ref('')
</script>

<style lang="scss" scoped>
  .page {
    background-color: var(--primary-color);
  }
</style>
