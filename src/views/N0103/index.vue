<template>
  <div class="app-container home">
    <el-container id="dept" style="height: 100%;">
      <el-aside width="50%" id="drag-dept-left">
        <div class="dept-box">
          <span>专注</span>
          <el-button type="primary" size="small" @click="addClick">新增</el-button>
        </div>
        <el-select v-model="targets" filterable placeholder="请选择专注的任务" class="task-select" @change="selectChange">
          <el-option v-for="item in options" :key="item.title" :label="item.name" :value="item.name">
            <div class="options">
              <span>{{ item.name }}</span>
              <svg @click.stop="deleteClick(item)" t="1707199243113" class="icon icon3" viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12106" width="200" height="200">
                <path
                  d="M882.2784 249.1904h-186.112c0.256-3.8912 0.4608-7.7824 0.4608-11.6736 0-100.0448-81.408-181.504-181.504-181.504s-181.504 81.408-181.504 181.504c0 3.8912 0.1536 7.7824 0.4096 11.6736H148.0192c-19.8144 0-35.84 16.0256-35.84 35.84s16.0256 35.84 35.84 35.84h734.2592c19.8144 0 35.84-16.0256 35.84-35.84s-16.0256-35.84-35.84-35.84z m-476.928-11.7248c0-60.5696 49.2544-109.824 109.824-109.824s109.824 49.2544 109.824 109.824c0 3.8912-0.3072 7.8336-0.7168 11.6736H406.016c-0.4096-3.84-0.6656-7.7312-0.6656-11.6736zM724.48 960.0512H307.8656c-67.3792 0-122.1632-52.6848-122.1632-117.4016V419.84c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v422.7584c0 25.2416 22.6304 45.7216 50.4832 45.7216h416.6656c27.8528 0 50.4832-20.5312 50.4832-45.7216V419.84c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v422.7584c-0.0512 64.768-54.8352 117.4528-122.2144 117.4528z"
                  fill="#f56c6c" p-id="12107"></path>
                <path
                  d="M421.12 795.5456c-19.8144 0-35.84-16.0256-35.84-35.84V468.4288c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v291.2768c0 19.7632-16.0768 35.84-35.84 35.84zM603.136 795.5456c-19.8144 0-35.84-16.0256-35.84-35.84V468.4288c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v291.2768c0 19.7632-16.0256 35.84-35.84 35.84z"
                  fill="#f56c6c" p-id="12108"></path>
              </svg>
            </div>
          </el-option>
        </el-select>
        <CountDown class="count-down" @save="saveClick" :selects="selects" />
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
import { getHabits,deleteHabits } from '@/api/index.js'
import { ElMessage,ElMessageBox } from 'element-plus'
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

const deleteClick = (row) => {
  ElMessageBox.confirm('确认删除该条数据吗？', '', {
    confirmButtonText: '确认',
    type: 'warning',
  }).then((res) => {
    deleteHabits({ id: row.id }).then((res) => {
      ElMessage.success('删除成功')
      search();
    })
  })
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

.icon3 {
  height: 18px;
  width: 18px;
  float: right;
  line-height: 32px;
  display: block;
  opacity: 0;
  transition: 0.5s all;
}

.options:hover .icon3{
  opacity: 1;
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>