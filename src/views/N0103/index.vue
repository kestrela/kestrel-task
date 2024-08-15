<template>
  <div class="app-container home">
    <el-container id="dept" style="height: 100%;">
      <el-aside width="50%" id="drag-dept-left">
        <div class="dept-box">
          <span>专注</span>
          <el-button type="primary" size="small" @click="addClick">新增</el-button>
        </div>
        <el-select v-model="targets" filterable placeholder="请选择专注的任务" class="task-select" @change="selectChange">
          <el-option v-for="item in options" :key="item.title" :label="item.name" :value="item.name" />
        </el-select>
        <CountDown class="count-down" @save="saveClick" />
      </el-aside>
      <div id="dragBar-dept" class="vertical-dragbar"></div>
      <el-main>
        <el-container style="height: 100%;">
          <Record :selects="selects" ref="sccc" />
        </el-container>
      </el-main>
    </el-container>
    <AddDialog v-model="isAddVisible" @search="search" />
  </div>
</template>
<script setup>
import { getHabits } from '@/api/index.js'
import AddDialog from './AddDialog.vue'
import Record from './Record'
import CountDown from './CountDown'
import { onMounted, ref } from 'vue'
import { useCommon } from '@/hook/useCommon.js'
const { setLayoutDrag } = useCommon()
const isAddVisible = ref(false)
import { insertClocks } from "@/api/index.js"
const addClick = () => {
  isAddVisible.value = true
}

const targets = ref('')
const options = ref([])
const selects = ref({})
const search = () => {
  getHabits({ pageSize: 1000, pageNum: 1 }).then((res) => {
    options.value = res.data
    if (options.value && options.value.length > 0) {
      targets.value = options.value[0].name
      selects.value = { ...options.value[0] }
    }
  })
}
const selectChange = (v) => {
  selects.value = { ...v }
}

const sccc = ref(null)
const saveClick = (v) => {
  const params = {
    ...v,
    title: targets.value,
    sid: selects.value.id,
  }
  insertClocks(params).then((res) => {
    sccc.value.getOptions()
  })
}
onMounted(() => {
  setLayoutDrag('dragBar-dept')
  search()
})
</script>
<style scoped lang="scss">
.vertical-dragbar {
  width: 1px;
  height: 100vh;
  background: rgb(238, 238, 238);
  cursor: e-resize;
  border-radius: 5px;
}
.level-dragbar {
  height: 5px;
  width: 100%;
  background: rgb(238, 238, 238);
  cursor: n-resize;
  border-radius: 5px;
}

.dept-box {
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  margin: 12px;
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
  span {
    font-weight: bold;
    font-size: 16px;
  }
}

:deep(.el-main) {
  padding: 0 12px;
}

.task-select {
  height: 32px;
  line-height: 32px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  // overflow: hidden;
  width: calc(100% - 24px);
  margin: 0 12px;

  :deep(.el-input__wrapper) {
    border: none !important;
    padding: 0 !important;
    &:hover {
      border: none !important;
      padding: 0 !important;
    }
    &:focus,
    &:hover {
      padding: 0 !important;
      outline: none !important;
      box-shadow: none !important;
      border: none !important;
    }
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }

  :deep(.el-input-group__prepend) {
    font-size: 20px;
    border: none;
    // box-shadow: none;
    background-color: white;
    width: 32px;
    padding: 0;
    position: absolute;
    left: 0;
    z-index: 999;
  }

  :deep(.el-input) {
    border: 1px solid #38383a;
    border-radius: 20px;
    padding: 0 !important;
    input {
      &:focus,
      &:hover {
        outline: none !important;
        box-shadow: none !important;
        border: none !important;
      }
      outline: none !important;
      box-shadow: none !important;
      border: none !important;
      padding-left: 12px;
    }

    input {
      border: none;
    }

    :deep(.is-focus) {
      .el-input__wrapper {
        box-shadow: none !important;
        padding: 0 !important;
      }
    }
  }
  :deep(.el-select__wrapper) {
    background: transparent;
    border: 1px solid #ddd;
    div {
      color: #000;
    }
  }
  :deep(.el-input__wrapper) {
    border: none;
    box-shadow: none;
    background-color: white;
    padding-left: 0;
    padding-left: 12px;
    padding: 0 !important;
    border-radius: 20px;
    i {
      display: none;
    }
  }
  :deep(.is-focus) {
    box-shadow: none !important;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-radius: 20px;
  }
  :deep(.el-input-group__prepend) {
    font-size: 20px;
    border: none;
    box-shadow: none;
    background-color: #f3f4f7;
    width: 32px;
    padding: 0;
  }
}

.count-down {
  margin-top: 30px;
}
</style>
 