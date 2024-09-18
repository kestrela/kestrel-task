<template>

  <div class="page-tags">
    <div class="page-item">
      <span class="page-item-label">分类</span>
      <svg @click="addClick" t="1707200731042" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13127" width="200" height="200">
        <path d="M792.2 491.3H532.8V231.9c0-11.3-9.2-20.5-20.5-20.5s-20.5 9.2-20.5 20.5v259.4H232.4c-11.3 0-20.5 9.2-20.5 20.5s9.2 20.5 20.5 20.5h259.4v259.4c0 11.3 9.2 20.5 20.5 20.5s20.5-9.2 20.5-20.5V532.3h259.4c11.3 0 20.5-9.2 20.5-20.5-0.1-11.3-9.2-20.5-20.5-20.5z" fill="#1C2833" p-id="13128"></path>
      </svg>
    </div>
    <div class="page-nnn">
      <div class="page-item page-item1" v-for="(item,index) in tags" :key="index" @click="tagClick(item.name)" :class="[name1===item.name?'active-t':'']">
        <svg t="1707201418555" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17273" width="200" height="200">
          <path d="M615.6 926.1H409.1C238 926.1 99.4 787.4 99.4 616.4V409.8c0-171.1 138.7-309.7 309.7-309.7h206.5c171.1 0 309.7 138.7 309.7 309.7v206.5c0.1 171.1-138.6 309.8-309.7 309.8z" fill="#FEF9DA" p-id="17274"></path>
          <path d="M660.3 724.4L541.6 682c-17.8-6.3-37.2-6.4-55-0.2l-122.3 42.7c-13.4 4.7-27.5-5.3-27.5-19.5V403.8c0-45.6 37-82.6 82.6-82.6h185.8c45.6 0 82.6 37 82.6 82.6v301.1c0.1 14.3-14 24.2-27.5 19.5z" fill="#FBDD43" p-id="17275"></path>
          <path d="M551.7 413.5c-0.6 0.2-1.3 0.5-2 0.8-16.7 8.3-27.6 23.4-30.8 40.5H440c-11.5 0-20.6-9.3-20.6-20.6 0-5.8 2.3-10.9 6-14.7 3.7-3.7 8.9-6 14.7-6h111.6z" fill="#FFFFFF" p-id="17276"></path>
          <path d="M605.3 434.1c0 5.7-2.3 10.8-6.1 14.6-3.7 3.8-8.9 6.1-14.6 6.1H519c3.2-17 14-32.2 30.8-40.5 0.6-0.3 1.3-0.6 2-0.8h32.9c11.3 0 20.6 9.2 20.6 20.6z" fill="#FFEB97" p-id="17277"></path>
        </svg>
        <span class="text">{{ item.name }}</span>
        <svg @click.stop="editClick(item)"  t="1707184404581" class="icon edit"
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7157" width="200" height="200">
          <path d="M763.744 240.576l-67.84-67.904-317.76 317.76-10.784 78.624 78.656-10.752z" fill="#3671FD"
            opacity=".2" p-id="7158"></path>
          <path
            d="M787.904 198.976a64 64 0 0 1 0 90.496l-302.592 302.624a64 64 0 0 1-36.576 18.144l-115.2 15.776A16 16 0 0 1 315.52 608l15.776-115.2a64 64 0 0 1 18.144-36.576l302.624-302.592a64 64 0 0 1 90.496 0z m-45.248 45.152l-45.248-45.248-302.624 302.592-7.168 52.48 52.448-7.2z"
            fill="#3671FD" p-id="7159"></path>
          <path
            d="M416.512 154.432a32 32 0 0 1 3.744 63.776l-3.744 0.224h-160a64 64 0 0 0-63.84 59.2l-0.16 4.8v480a64 64 0 0 0 59.2 63.84l4.8 0.16h512a64 64 0 0 0 63.84-59.2l0.16-4.8v-288a32 32 0 0 1 63.776-3.744l0.224 3.744v288a128 128 0 0 1-121.6 127.84l-6.4 0.16h-512a128 128 0 0 1-127.84-121.6l-0.16-6.4v-480a128 128 0 0 1 121.6-127.84l6.4-0.16z"
            fill="#3671FD" p-id="7160"></path>
          <path
            d="M320.512 666.432h384a28.288 28.288 0 0 1 32 32 28.288 28.288 0 0 1-32 32h-384a28.288 28.288 0 0 1-32-32 28.288 28.288 0 0 1 32-32z"
            fill="#FE9C23" p-id="7161"></path>
        </svg>
      </div>
    </div>
    <TypesDialog v-model="isTagVisible" @search="getOptions" :detail="detail"/>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import TypesDialog from './TypesDialog.vue'
import {  getCategory} from "@/api/index.js";

const isTagVisible = ref(false)
const detail = ref({})
const addClick = () => {
  detail.value = {}
  isTagVisible.value = true
}

onMounted(() => {
  getOptions()
})
const name1 = ref('')
const emit = defineEmits(['search'])
const tagClick = (name)=>{
  name1.value = name
  emit('search',name)
}

const editClick = (item)=>{
  detail.value = item
  isTagVisible.value = true
}

const tags = ref([])
const getOptions = () => {
  getCategory({}).then(res=>{
    tags.value = res.data
  })
}
</script>

<style scoped lang="scss">
.page-tags {
  margin-top: 6px;
  border-top: 1px solid #eeeeee30;
}

.page-item {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  line-height: 24px;
  color: #000;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 5px;
  padding-left: 18px;
  transition: 0.4s all;
  position: relative;
  font-weight: 408;
  overflow: hidden;

  &:hover {
    background: #d6e1f980;

    .more {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    height: 6px;
    width: 6px;
    border-radius: 6px;
    background-color: #67c23a;
    position: absolute;
    left: 5px;
  }

  svg {
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    &:hover {
      background: #d6e1f9;
    }
  }
}

.page-item1 {
  &::before {
    display: none;
    left: 0;
  }
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start!important;
  svg {
    width: auto;
  }
  .text {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: calc(100% - 60px);
  }
}

.page-nnn {
  max-height: 200px;
  height:auto;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}
.active-t {
  background: #d6e1f980;

  .more {
    opacity: 1;
  }
}

.page-item-label{
  font-weight: bold;
}

.edit{
  display: none!important;
  transition: all 0.8s;
}
.page-item1:hover .edit{
  display: inline-block!important;
  transition: all 0.8s;
}
</style>
