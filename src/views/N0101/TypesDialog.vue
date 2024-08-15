<template>
  <Dialog v-model="visible" :dialogTitle="dialogTitle" @closed="closed" width="400px" height="100px">
    <el-row class="wrapper">
      <el-form :model="form" label-width="70px">
        <el-col :span="24">
          <el-form-item label="任务分类">
            <el-input v-model="state.dataForm.name" placeholder="请输入任务分类" />
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
import { insertCategory, updateCategory } from '@/api/index.js'
import { computed, reactive, watch } from 'vue'
import dayjs from 'dayjs'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: '添加分类',
  },
  detail: {
    type: Object,
    default: () => { },
  },
})
const state = reactive({
  dataForm: {
    name: ''
  }
})

const setForm = (obj = {}) => {
  state.dataForm.name = obj.name || ''
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
  }
  if (props.detail && props.detail.id) {
    params.id = props.detail.id
  }
  let saveFn = props.detail && props.detail.id ? updateCategory : insertCategory
  saveFn(params).then((res) => {
    emit('search')
    closed()
  }).catch((err)=>{
    console.log(err)
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

  :deep(.el-form-item__label) {
    display: none;
  }

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