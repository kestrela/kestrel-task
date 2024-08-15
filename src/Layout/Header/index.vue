<template>
  <div class="page-header">
    <svg t="1666230031834" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="1643" width="200" height="200">
      <path d="M572.34 543.18m-300.58 0a300.58 300.58 0 1 0 601.16 0 300.58 300.58 0 1 0-601.16 0Z" fill="#007fe7"
        p-id="1644"></path>
      <path
        d="M350.92 481.78h-65.42a139.54 139.54 0 0 1-139.4-139.38v-65.44a139.54 139.54 0 0 1 139.4-139.38h65.42a139.54 139.54 0 0 1 139.38 139.38v65.44a139.54 139.54 0 0 1-139.38 139.38z m-65.42-292.2a87.48 87.48 0 0 0-87.4 87.38v65.44a87.48 87.48 0 0 0 87.4 87.38h65.42a87.48 87.48 0 0 0 87.38-87.38v-65.44a87.48 87.48 0 0 0-87.38-87.38zM725.16 478.64h-65.44a139.54 139.54 0 0 1-139.38-139.38v-65.42a139.54 139.54 0 0 1 139.38-139.4h65.44a139.54 139.54 0 0 1 139.38 139.4v65.42a139.54 139.54 0 0 1-139.38 139.38z m-65.44-292.2a87.48 87.48 0 0 0-87.38 87.4v65.42a87.48 87.48 0 0 0 87.38 87.38h65.44a87.48 87.48 0 0 0 87.38-87.38v-65.42a87.48 87.48 0 0 0-87.38-87.4zM350.92 849.38h-65.42A139.56 139.56 0 0 1 146.1 710v-65.44a139.54 139.54 0 0 1 139.4-139.38h65.42a139.54 139.54 0 0 1 139.38 139.38V710a139.54 139.54 0 0 1-139.38 139.38z m-65.42-292.2a87.48 87.48 0 0 0-87.4 87.38V710a87.48 87.48 0 0 0 87.4 87.38h65.42A87.48 87.48 0 0 0 438.3 710v-65.44a87.48 87.48 0 0 0-87.38-87.38zM725.16 846.24h-65.44a139.54 139.54 0 0 1-139.38-139.38v-65.44A139.54 139.54 0 0 1 659.72 502h65.44a139.54 139.54 0 0 1 139.38 139.38v65.44a139.54 139.54 0 0 1-139.38 139.42zM659.72 554a87.48 87.48 0 0 0-87.38 87.38v65.44a87.48 87.48 0 0 0 87.38 87.38h65.44a87.48 87.48 0 0 0 87.38-87.38v-65.4A87.48 87.48 0 0 0 725.16 554z"
        fill="#007fe7" p-id="1645"></path>
    </svg>
    <span class="page-name">前端开发工具<span class="verson">（开发版）V4.2.1 </span></span>
    <span class="preview" @click="previewClick">预览</span>
    <Dialog class="my-dialog" v-model="isPreVisible" size="middle" title="更新日志">
      <div style="width:400px;height:300px">
        <p>qwe234234234</p>
        <p>qwe234234234</p>
        <p>qwe234234234</p>
        <p>qwe234234234</p>
        <p>qwe234234234</p>
        <p>qwe234234234</p>
        <p>qwe234234234</p>
        <p>qwe234234234</p>
        <p>qwe234234234</p>
      </div>
    </Dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const isPreVisible = ref(false)
const previewClick = () => {
  isPreVisible.value = true
}
const iframeSrc = ref('http://template.zhanhongzhu.top/#/template')
const generateUrlWithParams = (params) => {
  const serializedParams = Object.entries(params)
    .map(
      ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    )
    .join('&')
  iframeSrc.value = `http://template.zhanhongzhu.top/#/template?${serializedParams}`
}

</script>
<style scoped lang="scss">
.page-header {
  display: flex;
  align-items: center;
  cursor: pointer;

  .page-name {
    color: #007fe7;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 5px;
  }

  svg {
    width: 32px;
    height: 32px;
  }
}

.preview {
  position: absolute;
  right: 20px;
  color: #007fe7;
  font-size: 14px;
  padding: 3px 7px;
  border-radius: 5px;
  transition: 0.8s all;

  &:hover {
    background-color: #007fe742;
  }
}
</style>