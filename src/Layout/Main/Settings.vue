<template>
  <Dialog v-model="visible" dialogTitle="主题" @closed="closed" height="280px">
    <div class="page-row">
      <div class="page-col1">
        <div v-show="!item.hidden" :class="['page-item', 'active2']" v-for="(item, index) in state.tableData" :key="index" @click="itemClick(index, item)">
          <span class="page-item-title">
            <span> {{ item.name }}</span>
            <span class="totals" v-show="item.total">
              {{ item.total || 1 }}</span>
          </span>
        </div>
      </div>
      <el-col class="page-col2">
        <div class="page-col2-content">
          <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
          <div :class="['page-col2-item']">
            <span :class="['page-col2-item-name']">
              <span class="main-title">
                <span class="tils">应用名称</span>
              </span>
              <span class="color999">
                {{ appName }}
              </span>
            </span>
          </div>
          <div :class="['page-col2-item']">
            <span :class="['page-col2-item-name']">
              <span class="main-title">
                <span class="tils">当前版本</span>
              </span>
              <span class="color999">
                {{ appVersion }}
              </span>
            </span>
          </div>
          <div :class="['page-col2-item']">
            <span :class="['page-col2-item-name']">
              <span class="main-title">
                <span class="tils">tauri</span>
              </span>
              <span class="color999">
                {{ tauriVersion }}
              </span>
            </span>
          </div>
          <div :class="['page-col2-item']" @click="checkClick">
            <span :class="['page-col2-item-name']">
              <span class="main-title">
                <span class="tils">检查更新</span>
              </span>
              <span class="color999 color9991">
                <svg t="1710427295784" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7278" width="200" height="200">
                  <path d="M512 0a512 512 0 1 1 0 1024A512 512 0 0 1 512 0z m0 64a448 448 0 1 0 0 896A448 448 0 0 0 512 64z m22.656 135.04l226.24 226.304a32 32 0 0 1-45.248 45.312L543.936 298.88 544 800a32 32 0 1 1-64 0V298.944L308.288 470.656a32 32 0 1 1-45.248-45.312l226.24-226.24a32 32 0 0 1 45.312 0z" fill="#999999" p-id="7279"></path>
                </svg>
              </span>
            </span>
          </div>
          <div :class="['page-col2-item']" @click="reloadClick">
            <span :class="['page-col2-item-name']">
              <span class="main-title">
                <span class="tils">重启</span>
              </span>
              <span class="color999">
                <svg t="1710427076548" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4267" width="200" height="200">
                  <path d="M512 505.6c19.2 0 38.4-19.2 38.4-38.4v-428.8c0-19.2-19.2-38.4-38.4-38.4s-38.4 19.2-38.4 38.4v428.8c0 19.2 12.8 38.4 38.4 38.4zM710.4 128c6.4 0 12.8 6.4 19.2 6.4 19.2 12.8 44.8 6.4 57.6-12.8 12.8-19.2 6.4-44.8-12.8-57.6-6.4-6.4-12.8-6.4-19.2-12.8-19.2-12.8-44.8 0-51.2 19.2-19.2 25.6-12.8 44.8 6.4 57.6z" fill="#999999" p-id="4268"></path>
                  <path d="M934.4 224c-12.8-19.2-38.4-25.6-57.6-12.8-6.4 6.4-12.8 12.8-19.2 25.6 0 12.8 0 19.2 6.4 32 44.8 70.4 70.4 153.6 70.4 236.8a428.8 428.8 0 0 1-857.6 0c0-160 89.6-307.2 230.4-384 19.2-12.8 25.6-32 19.2-51.2-12.8-19.2-32-25.6-51.2-19.2-172.8 89.6-275.2 262.4-275.2 454.4 0 281.6 230.4 512 512 512s512-230.4 512-512c0-96-32-198.4-89.6-281.6z" fill="#999999" p-id="4269"></path>
                </svg>
              </span>
            </span>
          </div>
        </div>
      </el-col>
    </div>
  </Dialog>
</template>

<script setup>
import { onMounted, reactive, ref, nextTick, computed } from 'vue'
import { getVersion, getTauriVersion,getName } from '@tauri-apps/api/app'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { ElMessage, ElMessageBox } from 'element-plus'
import { confirm } from '@tauri-apps/api/dialog';
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

const date = new URL(`../../assets/date.svg`, import.meta.url).href
const more = new URL(`../../assets/more.svg`, import.meta.url).href
const close = new URL(`../../assets/close.svg`, import.meta.url).href
const open = new URL(`../../assets/open.svg`, import.meta.url).href

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

const getImgUrl = (img) => {
  return new URL(`../../assets/${img}.svg`, import.meta.url).href
}
const inputVal = ref('')
const state = reactive({
  options: [
    { label: '一般', value: '一般' },
    { label: '紧急', value: '紧急' },
    { label: '重要且紧急', value: '重要且紧急' },
    { label: '重要', value: '重要' },
    { label: '不紧急', value: '不紧急' },
  ],
  tableData: [
    {
      name: '通用',
      icon: '',
      value: '1',
      total: 0,
      hidden: false,
    },
  ],
  tasks: [],
  title: '所有',
  status: '1',
})

const options1 = computed(() => {
  return state.tableData
})
const hiddenClick = (row) => {
  row.hidden = true
}
const search = () => {
  // getObject('TASK', { status: state.status }).then((res) => {
  //   nextTick(() => {
  //     state.tasks = res.map((v, w) => {
  //       return {
  //         index: w + 1,
  //         ...v,
  //         ...v.attributes,
  //       }
  //     })
  //   })
  // })
}

const activeIndex = ref('0')
const itemClick = (value, item) => {
  state.title = item.name
  activeIndex.value = value
  state.status = item.value
  search()
}

const switchChange = (row, falg) => {
  const params = {
    endTime: row.name,
    endTime: row.endTime,
    id: row.id,
    optime: row.optime,
    priority: row.priority || '一般',
    status: falg ? '7' : row.status || '7',
  }
  if (params.createdAt) {
    delete params.createdAt
    delete params.updatedAt
  }
  updateObject('TASK', params).then((res) => {
    search()
  })
}
const priority = (priority) => {
  let map = {
    重要且紧急: 'page-item-priority-important-urgent',
    重要: 'page-item-priority-important',
    特急: 'page-item-priority-important',
    紧急: 'page-item-priority-urgent',
    不紧急: 'page-item-priority-not-urgent',
    一般: 'page-item-priority-normal',
  }
  return map[priority] || ''
}

const conetent = ref('')
const enterClick = () => {
  if (!conetent.value) {
    return
  }
  const params = {
    name: conetent.value,
    status: state.status,
  }
  saveObject('TASK', params).then((res) => {
    conetent.value = ''
    search()
  })
}

const onResize = (e) => {
  const { width, height } = e
}

const textClick = (row) => {
  row.isEdit = true
}

const textBlur = (row) => {
  row.isEdit = false
  switchChange(row)
}

const checkClick = async () => {
  checkUpdate().then(async (res) => {
    const { shouldUpdate, manifest } = res
    if (shouldUpdate) {
      confirm(`发现新版本：${manifest?.version}，是否升级？`, { title: '版本更新', type: 'success' }).then(async (res) => {
        try {
          ElMessage.success({
            message: '正在下载更新...',
            duration: 3000,
          })
          installUpdate()
            .then(async (res) => {
              await relaunch()
            })
            .catch((e) => {
            })
        } catch (e) {
          ElMessage.error({
            message: '下载更新失败',
            description: e.toString() || '',
          })
        }
      })
    } else {
     await confirm(`当前版本，已经是最新版本`, { title: '检查更新', type: 'success' ,okLabel: '确定',cancelLabel: '取消'})
    }
  })
}

const reloadClick = async () => {
  await relaunch()
}

const appVersion = ref('0.0.0')
const tauriVersion = ref('')

const appName = ref('微芒计划')

onMounted(async () => {
  search()
  appVersion.value = await getVersion()
  tauriVersion.value = await getTauriVersion()
  appName.value = await getName();
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 45vh;
  overflow-y: auto;
  flex-wrap: wrap;
  overflow-x: hidden;
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

.page-row {
  width: 100%;
  height: 100%;
  display: flex;
}

.page-col1 {
  width: 120px;
  border-right: 1px solid #eeeeee35;
  padding-right: 8px;
}

.page-col2 {
  width: calc(100% - 120px);
  height: 100%;
  flex: 1;
  padding: 0 10px;
}

.page-item {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 29px;
  line-height: 40px;
  color: #999;
  cursor: pointer;
  border-radius: 8px;
  padding-left: 12px;
  transition: 0.4s all;
  position: relative;
  font-weight: 408;
  overflow: hidden;

  &:hover {
    .more {
      opacity: 1;
    }
  }
}

.page-item-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    height: 40px;
  }

  flex: 1;
  width: 80%;
}

.more {
  height: 20px;
  cursor: pointer;
  padding-right: 6px;
  border-radius: 4px;
  transition: 0.4s all;
  margin-right: 4px;
  opacity: 0;
  transition: 0.3s all;
  line-height: 40px;

  &:hover {
    background: #e3f0f9;
    opacity: 1;
  }
}

.date {
  height: 20px;
  cursor: pointer;
  padding-right: 12px;
  padding: 4px;
  border-radius: 4px;
  transition: 0.4s all;
  margin-right: 4px;
  padding-top: 2px;
}

.more-content {
  padding-bottom: 7px;
  cursor: pointer;
  width: 100%;
  transition: 0.3s all;
  padding: 4px;

  &:hover {
    background: #e3f0f9;
  }
}

.page-col2-title {
  font-weight: 400;
  margin-bottom: 8px;
  display: block;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.page-col2-content {
  margin: 0;
  max-height: calc(100% - 22px);
  overflow-y: auto;
  height: auto;
  border: none;
  padding: 0 !important;
}

.page-col2-item {
  height: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  padding: 4px 6px;
  border: 1px solid #ddd !important;
  font-size: 13px;
  transition: 0.4s all;
  transition: 100ms;
  border-radius: 8px;
  margin-bottom: 6px;
  font-weight: bold;
  color: #999 !important;
  cursor: pointer !important;
  transition:0.8s all;
  &:hover {
    background-color: #ffffff;
    border-color: #ffffff;
    cursor: pointer!important;
  }
  background-clip: padding-box;
}

.actives {
  background: #ffffff;
}

.page-col2-input {
  height: 32px;
  line-height: 32px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  overflow: hidden;

  :deep(.el-input-group__prepend) {
    font-size: 20px;
    border: none;
    box-shadow: none;
    background-color: #f3f4f7;
    width: 32px;
    padding: 0;
    position: absolute;
    left: 0;
    z-index: 999;
  }

  :deep(.el-input) {
    border: none;
  }
  :deep(.el-input__wrapper) {
    border: none;
    box-shadow: none;
    background-color: #f3f4f7;
    padding-left: 0;
    padding-left: 32px;
  }
  :deep(.is-focus) {
    box-shadow: 0 0 0 1px #409eff !important;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
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

.page-col2-item-name {
  margin-left: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #eeeeee65;
    background-color: transparent;
    border: none;
  }
}

.active2 {
  background: #ffffff;
  border:1px solid #ddd;
  font-weight:bold;
}

.closes {
  height: 20px;
  cursor: pointer;
  padding-right: 6px;
  border-radius: 4px;
  transition: 0.4s all;
  margin-right: 4px;
  transition: 0.3s all;
  line-height: 40px;
  padding: 3px 4px;

  &:hover {
    background: #e3f0f9;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  width: 0;
}

.totals {
  padding-right: 6px;
  color: #ccc;

  &:hover {
    color: #999;
  }
}

.ml-2 {
  margin-right: 8px;
}

.page-select {
  max-width: 85px;
  min-width: 60px;
  margin-right: 8px;
}

.page-item-priority-important-urgent {
  background: #e4564cb9;
}
.page-item-priority-important {
  background: rgb(214, 135, 17) 74;
}
.page-item-priority-urgent {
  background: #e8b567;
}
.page-item-priority-not-urgent {
  background: rgba(45, 174, 50, 0.599);
}

.main-title {
  flex: 1;
  margin-right: 8px;
  cursor: text;
  .tils-edit {
    :deep(.el-input) {
      box-shadow: none;
      border: none;
    }
    :deep(.el-input__wrapper) {
      border: none;
      box-shadow: none;
      background-color: transparent;
      &:focus {
        background-color: #f3f4f7;
      }
    }
  }

  .tils {
  }
}

.color999 {
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 16px;
    width: 16px;
  }
}

.color9991 {
  svg {
    height: 18px;
    width: 18px;
  }
}
</style>
