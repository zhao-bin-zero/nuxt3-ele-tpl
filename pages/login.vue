<template>
  <div>
    <p class="flex-center">Login</p>
    <nuxt-link :to="localePath('/')">{{ $t('title') }}</nuxt-link>
  </div>
</template>
<script setup lang="ts">
  definePageMeta({})
</script>
