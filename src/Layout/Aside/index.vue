<template>
  <div v-for="(item, index) in routes" class="bread">
    <div :class="['bread-crumb', index == active ? 'active' : '']" @click="routeClick(item.path, index)">
      <!-- <span class="page-span"> {{item.meta.title}}</span> -->
      <img class="page-icon" :src="getImgUrl(item.meta.icon)" />
    </div>
  </div>
</template>
<style scoped lang="scss"></style>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'
import { nextTick, ref } from 'vue'
import { onMounted } from 'vue'
const route = useRoute()
const router = useRouter()
const routes = router.options.routes[0].children
//记忆点击的菜单
const getImgUrl = (img) => {
  return new URL(`../../assets/${img}.svg`, import.meta.url).href
}


const active = ref(0)
onMounted(() => {
  let activeIndex = localStorage.getItem('active') || 0
  active.value = activeIndex
})
const pathCompile = (path) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}
const routeClick = (path, index) => {
  active.value = index
  localStorage.setItem('active', index)
  nextTick(()=>{
    router.replace(pathCompile('/'+path))
  })

}
</script>

<style scoped lang="scss">
.bread-crumb {
  display: flex;
  align-items: center;

  svg {
    height: 28px;
    width: 28px;
  }

  .page-span {
    margin-left: 5px;
  }
}

.page-icon {
  width: 28px;
  height: 28px;
}

.bread {
  margin-bottom: 6px;
}
</style>