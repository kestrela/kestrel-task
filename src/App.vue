<template>
  <router-view />
</template>
<script setup>
import { onMounted } from 'vue'
import { invoke } from '@tauri-apps/api/tauri'
onMounted(() => {
  // window.addEventListener('contextmenu', (e) => e.preventDefault(), false)
  document.addEventListener('DOMContentLoaded', () => {
    // This will wait for the window to load, but you could
    // run this function on whatever trigger you want
    setTimeout(() => {
      invoke('close_splashscreen')
    }, 1000)
  })
})
</script>