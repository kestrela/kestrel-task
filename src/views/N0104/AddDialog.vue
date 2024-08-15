<template>
  <Dialog v-model="visible" :dialogTitle="dialogTitle" @closed="closed" height="220px" width="500px">
    <div class="wrapper">
      <div class="n-col n-col1">
        <el-input v-model="state.form.name" placeholder="请习惯的名称" />
      </div>
      <div class="n-col n-col1">
        <el-select v-model="state.form.count" class="m-2" placeholder="请习惯的频率" size="mini" style="width:100%;">
          <el-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="n-col n-col1 mg-tp12">
        <el-input v-model="state.form.memo" type="textarea" placeholder="请输入备注" />
      </div>
      <el-col :span="24" class="n-col n-footer">
        <el-button type="primary" @click="onSubmit" :disabled="!isCanSave">确定</el-button>
      </el-col>
    </div>
  </Dialog>
</template>

<script setup>
import { computed, reactive } from 'vue'
import dayjs from 'dayjs'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: '添加习惯',
  },
})
const state = reactive({
  form: {
    name: '',
    count: '1',
    memo: '',
  },
  options: [
    { label: '每天一次', value: '1' },
    { label: '三天一次', value: '2' },
    { label: '一周一次', value: '3' },
    { label: '一月一次', value: '4' },
    { label: '一年一次', value: '5' },
  ],
})
const visible = computed(() => props.modelValue)
const emit = defineEmits(['update:modelValue', 'change'])
const closed = () => {
  state.form.name = ''
  state.form.count = '1'
  state.form.memo = ''
  emit('update:modelValue', false)
}

const isCanSave = computed(() => {
  return state.form.name && state.form.count
})

const onSubmit = () => {
  const params = {
    ...state.form,
    time:dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'), 
  }
  saveObject('N0104', params).then((res) => {
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
  width: 100%;
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
  width: 100%;
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

.mg-tp12 {
  margin-top: 0;
  display: inline-block;
}
</style>