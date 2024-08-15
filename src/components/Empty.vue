<template>
  <div class="page-empty">
    <img :src="empty" class="date" />
  </div>
  <span class="text">暂没有任务</span>
</template>

<script setup>
const empty = new URL(`../assets/empty.svg`, import.meta.url).href
</script>

<style scoped lang="scss">
.page-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    object-fit: contain;
    height: 100%;
    max-height: 260px;
  }
}

.text {
  color: #ccc;
  text-align: center;
  width: 100%;
  display: inline-block;
  font-size:14px;
}
</style>
