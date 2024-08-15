<template>
  <div class="logo-contanier">
    <img :src="logo" alt="" />
  </div>
</template>

<script setup>
import logo from '@/assets/logo.png'
defineOptions({ name: 'Logo' })
</script>

<style lang="scss" scoped>
.logo-contanier {
  width: 100%;
  height: 72px;
  vertical-align: middle;
  padding-right: 12px;
}
img {
  width: 100%;
  height: 100%;
  display: inline-block;
  object-fit: contain;
  cursor: pointer;
}
</style>
