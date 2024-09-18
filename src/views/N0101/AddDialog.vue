<template>
  <Dialog v-model="visible" :dialogTitle="dialogTitle" @closed="closed" width="60vw">

    <el-form :model="form" label-width="75px">
      <el-row class="wrapper">
        <el-col :span="24">
          <el-form-item label="任务标题">
            <el-input v-model="state.dataForm.name" placeholder="请输入任务标题" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重要程度">
            <el-select allow-create default-first-option :reserve-keyword="false" filterable
              v-model="state.dataForm.priority" placeholder="请选择">
              <el-option v-for="(item, index) in state.options" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务状态">
            <el-select filterable allow-create default-first-option :reserve-keyword="false" v-model="state.status" placeholder="请选择任务状态">
              <el-option v-for="(item,index) in state.options1" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="截止日期">
            <el-date-picker v-model="state.dataForm.endTime" type="datetime" placeholder="请选择"
              format="YYYY-MM-DD HH:mm:ss" date-format="YYYY-MM-DD" time-format="HH:mm:ss" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签">
            <el-select allow-create default-first-option :reserve-keyword="false" filterable v-model="state.dataForm.tags" placeholder="请选择紧急程度">
              <el-option v-for="(item,index) in state.options2" :key="index" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="任务分类">
            <el-select filterable allow-create default-first-option :reserve-keyword="false" v-model="state.dataForm.types" placeholder="请选择任务分类">
              <el-option v-for="(item,index) in state.options3" :key="index" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="state.dataForm.memo" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
  
      </el-row>
    </el-form>
    <el-col :span="24" class="n-col n-footer">
          <el-button type="primary" @click="onSubmit" :disabled="!isCanSave">确定</el-button>
        </el-col>
  </Dialog>
</template>

<script setup>
import {
  getTasks,
  updateTasks,
  insertTasks,
  deleteTasks,
  getLast3MonthAbstractTasks,
  getTags,
  getCategory
} from "@/api/index.js";


import { computed, onMounted, reactive, watch } from 'vue'
import dayjs from 'dayjs'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: '添加任务',
  },
  detail: {
    type: Object,
    default: () => {},
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
    types: '',
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
  options3: [],
})

const setForm = (obj = {}) => {
  state.dataForm.name = obj.name || ''
  state.dataForm.priority = obj.priority || ''
  state.dataForm.status = obj.status || ''
  state.dataForm.endTime = obj.endTime || ''
  state.dataForm.memo = obj.memo || ''
}

onMounted(() => {
  getTagsOptions()
  getTypesOptions()
})

const getTagsOptions = () => {
  getTags({pageSize:100,pageNum:1}).then(res=>{
    state.options2 = res.data
  })
}

const getTypesOptions = () => {
  getCategory({pageSize:100,pageNum:1}).then(res=>{
    state.options3 = res.data
  })
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
  let saveFn = props.detail && props.detail.id ? updateTasks : insertTasks
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
  padding: 0 12px;
  :deep(.el-select) {
    width: 100%;
    .el-input {
      width: 100%;
    }
  }
  :deep(.el-input) {
    width: 100%;
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