<template>
  <Dialog v-model="visible" dialogTitle="主题" @closed="closed">
    <div class="wrapper">
      <el-row :gutter="12">
        <el-col :span="8" v-for="(item,index) in themeOptions" :key="index" class="page-cols">
          <div class="cards" :style="getStyle(item)">
            <div class="title">{{ item.prompt || "   "}}</div>
            <div class="item">
              <span v-for="(itemd,idx) in getStyle(item)" :key="idx" class="blocks" :style="{'background':itemd}"></span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </Dialog>
</template>

<script setup>
import { themeOptions } from '@/hook/useTheme.js'
import { computed, ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '设置主题',
  },
})

const visible = computed(() => props.modelValue)
const emit = defineEmits(['update:modelValue'])
const closed = () => {
  emit('update:modelValue', false)
}
const getStyle = (style) => {
  const keys = [
    'bg',
    'primaryClear',
    'primaryDull',
    'accentClear',

    'accentDull',
  ]
  const values = []
  Object.keys(style).forEach((v) => keys.includes(v) && values.push(style[v]))
  return values
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 52vh;
  overflow-y: auto;
  flex-wrap: wrap;
  overflow-x: hidden;
  padding: 0 8px;
  .cards {
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    .item {
      display: flex;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      opacity: 0.85;
    }
    .title {
      padding-left: 10px;
      padding-right: 10px;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
      position: absolute;
      z-index: 999;
    }
  }
  .blocks {
    display: inline-block;
    height: 100px;
    width: 20%;
    display: inline-block;
    transform: rotate(23deg);
    margin-top: -10px;
    &:hover {
      transform: scale(1.02);
    }
  }
}
.page-cols {
  padding: 5px;
}

.cards {
  height: 50px;
  box-shadow: 0 1px 2px #99999947;
  background: radial-gradient(circle, #eeeeee55, #eeeeee55);
  border-radius: 10px;
  position: relative;

  width: 100%;
  &:hover {
    background: #ffffff65;
  }
}
</style>