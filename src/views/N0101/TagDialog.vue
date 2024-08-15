<template>
  <Dialog v-model="visible" :dialogTitle="dialogTitle" @closed="closed" width="400px" height="100px">
    <el-row class="wrapper">
      <el-form :model="form" label-width="70px">
        <el-col :span="24">
          <el-form-item label="任务标签">
            <el-input v-model="state.dataForm.name" placeholder="请输入标签" />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="n-col n-footer">
          <el-button type="primary" @click="onSubmit" :disabled="!isCanSave">确定</el-button>
        </el-col>
      </el-form>
    </el-row>
  </Dialog>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import dayjs from 'dayjs'
import { insertTags, updateTags } from '@/api/index.js'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: '添加标签',
  },
  detail: {
    type: Object,
    default: () => { },
  },
})
const state = reactive({
  dataForm: {
    name: '',
    priority: '',
    status: '1',
    endTime: '',
    memo: '',
    tags: '',
  },
  options: [
    { label: '重要且紧急', value: '重要且紧急' },
    { label: '紧急但不重要', value: '紧急但不重要' },
    { label: '重要且不紧急', value: '重要且不紧急' },
    { label: '不重要不紧急', value: '不重要不紧急' },
  ],
  options1: [
    { label: '未完成', value: '1' },
    { label: '已完成', value: '7' },
  ],
  options2: [
    { label: '未完成', value: '1' },
    { label: '已完成', value: '7' },
  ],
})

const setForm = (obj = {}) => {
  state.dataForm.name = obj.name || ''
  state.dataForm.priority = obj.priority || ''
  state.dataForm.status = obj.status || ''
  state.dataForm.endTime = obj.endTime || ''
  state.dataForm.memo = obj.memo || ''
}

watch(
  () => props.modelValue,
  (v) => {
    if (v && props.detail && props.detail.id) {
      setForm(props.detail)
    } else {
      setForm()
    }
  }
)

const visible = computed(() => props.modelValue)
const emit = defineEmits(['update:modelValue', 'change'])
const closed = () => {
  emit('update:modelValue', false)
}

const isCanSave = computed(() => {
  return state.dataForm.name && state.dataForm.name.length
})

const onSubmit = () => {
  const params = {
    ...state.dataForm,
    status: state.status || '1',
  }
  if (params.endTime) {
    params.endTime = dayjs(params.endTime).format('YYYY-MM-DD HH:mm:ss')
  }

  if (props.detail && props.detail.id) {
    params.id = props.detail.id
  }

  let saveFn = props.detail && props.detail.id ? updateTags : insertTags
  saveFn(params).then((res) => {
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
  padding: 0;

  :deep(.el-row wrapper) {
    padding: 0;
  }

  :deep(.el-form) {
    width: 100%;

    .el-select {
      width: 100%;
    }

    .el-input {
      width: 100%;
    }
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
  bottom: 0;
  width: auto;
  display: flex;
  justify-content: flex-end;
  right: 0;
}

.adds {
  cursor: pointer;
}

.tips {
  cursor: pointer;
}
</style>
