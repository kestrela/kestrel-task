<template>
  <Dialog v-model="visible" :dialogTitle="dialogTitle" @closed="closed" width="500px" height="120px">
    <div class="wrapper">
      <el-col :span="24" class="n-col n-col1">
        <el-input v-model="state.targets" placeholder="名称" />
      </el-col>
      <el-col :span="24" class="n-col">
        <span class="adds">计时模式</span>
        <span class="adds">番茄时钟 25分钟</span>
      </el-col>
      <el-col :span="24" class="n-col n-footer">
        <el-button type="primary" @click="onSubmit" :disabled="!isCanSave">保存</el-button>
      </el-col>
    </div>
  </Dialog>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { insertHabits } from '@/api/index.js'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: '添加常用专注',
  },
})
const state = reactive({
  targets: ''
})
const visible = computed(() => props.modelValue)
const emit = defineEmits(['update:modelValue', 'change'])
const closed = () => {
  state.targets = ''
  emit('update:modelValue', false)
}

const isCanSave = computed(() => {
  return !!state.targets
})

const onSubmit = () => {
  const params = {
    name: state.targets
  }
  insertHabits(params).then(res => {
    ElMessage.error('保存成功')
    emit('search')
    closed()
  })

}
</script>

<style lang="scss" scoped>
.n-col1 {
  display: flex;
  height: 32px;
  align-items: center;

  .btn {
    width: 80px;
    margin: 0 6px;
  }

  span {
    display: inline-block;
    width: 60px;
    text-align: center;
  }

  .del {
    color: #f56c6c;
    cursor: pointer;
  }
}

.wrapper {
  height: 100%;
  overflow-y: auto;
  flex-wrap: wrap;
  overflow-x: hidden;
  background: #fff;
  padding: 0 12px;

  .cards {
    width: 100%;
    height: 60px;
    border: 1px dotted transparent;
    box-shadow: 1px 1px 1px #bbb;
    border-radius: 5px;
    margin: 8px 0;
    cursor: pointer;

    .item {
      display: flex;
      align-items: center;
    }
  }

  .blocks {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    display: inline-block;
  }
}

.n-col {
  display: flex;
  justify-content: space-between;
  height: 30px;
  line-height: 30px;
  margin: 12px 0;
}

.n-footer {
  position: absolute;
  bottom: 10px;
  width: auto;
  display: flex;
  justify-content: flex-end;
  right: 15px;
}

.adds {
  cursor: pointer;
}

.tips {
  cursor: pointer;
}
</style>