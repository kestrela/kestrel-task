<template>
  <router-view v-slot="{ Component ,route}">
    <transition-group name="staggered-fade" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <component :is="Component" :key="route.name"/>
    </transition-group>
  </router-view>
</template>

<script setup>
import gsap from 'gsap'
const beforeEnter = (el) => {
  el.style.opacity = 0
}
const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    delay: el.dataset.index * 0.15,
    onComplete: done,
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done,
  })
}
</script>


<style scoped lang="scss">
.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>