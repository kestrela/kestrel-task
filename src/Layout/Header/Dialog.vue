<template>
  <el-dialog draggable :title="dialogTitle" v-bind="$attrs" v-model="modelValue" :modal-append-to-body="modalAppendToBody" :append-to-body="appendToBody" :fullscreen="fullscreen" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" :width="comWidth" style="border-radius: 12px;" :top="top" class="my-dialog" @closed="closed">
    <slot />
    <template #footer>
      <div class="dialog-footer">
        <slot name="footer">
          <el-button type="close" @click="closed" round>关闭</el-button>
        </slot>
      </div>
    </template>
  </el-dialog>
</template>
  
  <script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  model: {
    prop: 'visible',
    event: 'closed',
  },
  props: {
    visible: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    top: { type: String, default: '6vh' },
    // 是否全屏
    fullscreen: { type: Boolean, default: false },
    // small, middle, big
    size: { type: String, default: 'big' },
    // 默认0，通过判断size来给予弹出框宽度，如果width传入值，则size宽度方面无效
    width: { type: [Number, String], default: 0 },
    dialogTitle: { type: String, default: '标题' },
    modalAppendToBody: { type: Boolean, default: true },
    appendToBody: { type: Boolean, default: true },
    closeOnClickModal: { type: Boolean, default: false },
    closeOnPressEscape: { type: Boolean, default: false },
    // 是否可以双击放大弹框
    dblclickDisabled: { type: Boolean, default: false },
    modelValue: { type: Boolean, default: false },
  },
  setup(props, context) {
    const comWidth = computed(() => {
      if (props.size === 'small') {
        return props.width || '347px'
      } else if (props.size === 'middle') {
        return props.width || '674px'
      } else if (props.size === 'big') {
        return props.width || '1440px'
      }
      return props.width || '1440px'
    })

    const closed = () => {
      context.emit('update:modelValue', false)
    }
    return { comWidth, closed }
  },
})
</script>
  

  <style scoped lang="scss">

</style>