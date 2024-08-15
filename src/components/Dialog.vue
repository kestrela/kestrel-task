<template>
  <el-dialog class="my-dialog" draggable v-bind="$attrs" v-model="modelValue" :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody" :fullscreen="fullscreen" :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape" :width="comWidth" :top="top" @closed="closed">
    <template v-slot:title>
      <slot name="title">
        <span class="my-dialog-title">{{ dialogTitle || ''}}</span>
      </slot>
    </template>
    <div v-loading="loading" class="body-content" :style="{'height':comHeight}">
      <slot></slot>
    </div>
    <template #footer>
      <div class="dialog-footer" v-if="closeBtn">
        <el-button type="close" size="small1" @click="closed">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps(
  {
    visible: { type: Boolean, default: false }, // 是否可见
    loading: { type: Boolean, default: false }, // 是否加载中
    top: { type: String, default: '20vh' }, // 距离顶部的距离
    fullscreen: { type: Boolean, default: false }, // 是否全屏
    size: { type: String, default: 'big' }, // 大小
    width: { type: [Number, String], default: 0 }, // 宽度
    height: { type: [Number, String], default: '55vh' }, // 宽度
    dialogTitle: { type: String, default: '' }, // 弹出框标题
    modalAppendToBody: { type: Boolean, default: false }, // 是否将弹出框插入到body中
    appendToBody: { type: Boolean, default: false }, // 是否将内容插入到body中
    closeOnClickModal: { type: Boolean, default: false }, // 是否在点击模态框时关闭
    closeOnPressEscape: { type: Boolean, default: false }, // 是否在按下ESC键时关闭
    dblclickDisabled: { type: Boolean, default: false }, // 是否禁用双击放大
    closeBtn: { type: Boolean, default: false }, // 关闭按钮
  },
  ['modelValue']
)

const comWidth = computed(() => {
  if (props.size === 'small') {
    return props.width || '30%'
  } else if (props.size === 'middle') {
    return props.width || '40%'
  } else if (props.size === 'big') {
    return props.width || '60%'
  }
  return props.width || '40%'
})

const comHeight = computed(() => {
  return props.height || '55vh'
})

const emit = defineEmits(['update:modelValue','closed'])
const closed = () => {
  emit('update:modelValue')
  emit('closed',false)
}
</script>