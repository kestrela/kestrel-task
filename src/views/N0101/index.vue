<template>
  <div class="page-row">
    <Transition name="slide-fade">
      <div class="page-col1" v-show="isCollapsed">
        <div v-show="!item.hidden" :class="['page-item', activeIndex === index ? 'active2' : '']"
          v-for="(item, index) in state.tableData" :key="index" @click="itemClick(index, item)">
          <span class="page-item-title">
            <span> {{ item.name }}</span>
            <span class="totals" v-show="state.tasks.length">
              {{ activeIndex === index ? state.tasks.length : "" }}</span>
          </span>
          <!-- 标签 -->
        </div>
        <TagViews @search="searchTag" />
        <!-- 分类 -->
        <TypeViews @search="searchType" />
      </div>
    </Transition>
    <el-col class="page-col2" v-resize="onResize" :class="[['9'].includes(state.status) ? 'page-cols' : '']">
      <span class="page-col2-title">
        <span class="aaaa">
          <img :src="close" class="closes" @click="collapseClick" />
          <span>{{ state.title }}</span>
        </span>

        <span class="ssss">
          <el-button type="primary" @click="addClick" v-if="state.status === '1'">新增</el-button>
        </span>
      </span>
      <el-input v-if="!['7', '8', '9'].includes(state.status)" v-model="conetent" @keydown.enter="enterClick"
        placeholder="添加任务至“收集箱”，回车即可创建" class="page-col2-input">
      </el-input>
      <div class="page-col2-content">
        <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
        <div v-if="state.tasks.length && state.status !== '9'" :class="[
          'page-col2-item',
          priority(item.priority),
          item.checked ? 'actives' : '',
        ]" v-for="(item, index) in state.tasks" :key="index">
          <el-checkbox v-model="item.status" @change.native="switchChange(item, true)"
            v-if="!['7', '8', '9'].includes(state.status)" />
          <span :class="['page-col2-item-name']">
            <span class="main-title" v-if="!['7', '8', '9'].includes(state.status)">
              <el-tooltip class="box-item" effect="dark" :content="item.name" placement="top">
                <el-text class="tils" truncated>
                  <span class="tils" @click.native="textClick(item)" v-html="formatStr(item.name)"></span>
                </el-text>
              </el-tooltip>
            </span>
            <span class="main-title" v-else>
              <span class="tils"
                v-html="formatStr(index + 1 + '. ' + (item.name && item.name.length ? item.name.slice(0, 150) : ''))"></span>
            </span>
            <span class="main-select2">
              <el-tag class="thga" @click="delayClick(item)"
                v-if="['1'].includes(state.status) && getTimer(item).type && !item.delay" effect="dark"
                :type="getTimer(item).type" size="mini">{{
                  getTimer(item).extra
                }}</el-tag>
              <el-tag class="thga" effect="light" :type="getTags1(item.tags)" size="mini" v-if="item.tags">{{ item.tags
                }}</el-tag>
              <el-tag class="thga" effect="dark" type="warning" size="mini" v-if="item.delay">{{ item.delay
                }}</el-tag>
              <el-tag class="thga" effect="Plain" :type="getTag(item.priority)" size="mini" v-if="item.priority">{{
                item.priority }}</el-tag>
              <svg @click="editClick(item)" v-if="['1', '7'].includes(state.status)" t="1707184404581" class="icon"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7157" width="200"
                height="200">
                <path d="M763.744 240.576l-67.84-67.904-317.76 317.76-10.784 78.624 78.656-10.752z" fill="#3671FD"
                  opacity=".2" p-id="7158"></path>
                <path
                  d="M787.904 198.976a64 64 0 0 1 0 90.496l-302.592 302.624a64 64 0 0 1-36.576 18.144l-115.2 15.776A16 16 0 0 1 315.52 608l15.776-115.2a64 64 0 0 1 18.144-36.576l302.624-302.592a64 64 0 0 1 90.496 0z m-45.248 45.152l-45.248-45.248-302.624 302.592-7.168 52.48 52.448-7.2z"
                  fill="#3671FD" p-id="7159"></path>
                <path
                  d="M416.512 154.432a32 32 0 0 1 3.744 63.776l-3.744 0.224h-160a64 64 0 0 0-63.84 59.2l-0.16 4.8v480a64 64 0 0 0 59.2 63.84l4.8 0.16h512a64 64 0 0 0 63.84-59.2l0.16-4.8v-288a32 32 0 0 1 63.776-3.744l0.224 3.744v288a128 128 0 0 1-121.6 127.84l-6.4 0.16h-512a128 128 0 0 1-127.84-121.6l-0.16-6.4v-480a128 128 0 0 1 121.6-127.84l6.4-0.16z"
                  fill="#3671FD" p-id="7160"></path>
                <path
                  d="M320.512 666.432h384a28.288 28.288 0 0 1 32 32 28.288 28.288 0 0 1-32 32h-384a28.288 28.288 0 0 1-32-32 28.288 28.288 0 0 1 32-32z"
                  fill="#FE9C23" p-id="7161"></path>
              </svg>
              <svg @click="deleteClick(item)" t="1707199243113" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="12106" width="200" height="200">
                <path
                  d="M882.2784 249.1904h-186.112c0.256-3.8912 0.4608-7.7824 0.4608-11.6736 0-100.0448-81.408-181.504-181.504-181.504s-181.504 81.408-181.504 181.504c0 3.8912 0.1536 7.7824 0.4096 11.6736H148.0192c-19.8144 0-35.84 16.0256-35.84 35.84s16.0256 35.84 35.84 35.84h734.2592c19.8144 0 35.84-16.0256 35.84-35.84s-16.0256-35.84-35.84-35.84z m-476.928-11.7248c0-60.5696 49.2544-109.824 109.824-109.824s109.824 49.2544 109.824 109.824c0 3.8912-0.3072 7.8336-0.7168 11.6736H406.016c-0.4096-3.84-0.6656-7.7312-0.6656-11.6736zM724.48 960.0512H307.8656c-67.3792 0-122.1632-52.6848-122.1632-117.4016V419.84c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v422.7584c0 25.2416 22.6304 45.7216 50.4832 45.7216h416.6656c27.8528 0 50.4832-20.5312 50.4832-45.7216V419.84c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v422.7584c-0.0512 64.768-54.8352 117.4528-122.2144 117.4528z"
                  fill="#f56c6c" p-id="12107"></path>
                <path
                  d="M421.12 795.5456c-19.8144 0-35.84-16.0256-35.84-35.84V468.4288c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v291.2768c0 19.7632-16.0768 35.84-35.84 35.84zM603.136 795.5456c-19.8144 0-35.84-16.0256-35.84-35.84V468.4288c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v291.2768c0 19.7632-16.0256 35.84-35.84 35.84z"
                  fill="#f56c6c" p-id="12108"></path>
              </svg>
            </span>
          </span>
        </div>
        <div v-else-if="state.status === '9'">
          <div class="abstract" v-if="records.length">
            <div class="abstract-title">待完成</div>
            <div v-for="(item, index) in records" class="abstract-item" @click="copyClick(item)" :key="index">
              <div class="abstract-item-name" v-html="formatStr(item.date)"></div>
              <div class="abstract-item-box">
                <div v-for="(itemd, idx) in item.data_array" class="abstract-item-c" :key="idx">
                  <div class="abstract-item-d">
                    {{ idx + 1 + "." + itemd.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="abstract">
            <div class="abstract-title">已完成</div>
            <div v-for="(item, index) in records1" class="abstract-item" @click="copyClick(item)" :key="index">
              <div class="abstract-item-name" v-html="formatStr(item.date)"></div>
              <div class="abstract-item-box">
                <div v-for="(itemd, idx) in item.data_array" class="abstract-item-c" :key="idx">
                  <div class="abstract-item-d" v-html="formatStr(idx + 1 + '.' + itemd.name)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Empty v-else />
      </div>
    </el-col>

    <AddDialog v-model="isAddVisible" @search="search" :detail="state.detail" />
  </div>
</template>
<script setup>
import TypeViews from './TypeViews.vue'
import AddDialog from './AddDialog.vue'
import TagViews from './TagViews.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  getTasks,
  updateTasks,
  insertTasks,
  deleteTasks,
  getLast3MonthAbstractTasks
} from "@/api/index.js";

import Empty from '@/components/Empty.vue'
import dayjs from 'dayjs'
import { writeText } from '@tauri-apps/api/clipboard'
import { onMounted, reactive, ref, nextTick, computed } from 'vue'
const date = new URL(`../../assets/date.svg`, import.meta.url).href
const more = new URL(`../../assets/more.svg`, import.meta.url).href
const close = new URL(`../../assets/close.svg`, import.meta.url).href
const open = new URL(`../../assets/open.svg`, import.meta.url).href

const isCollapsed = ref(true)
const collapseClick = () => {
  isCollapsed.value = !isCollapsed.value
}
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

const delayClick = (row) => {
  ElMessageBox.confirm('确认延期到今天？', '', {
    confirmButtonText: '确认',
    type: 'warning',
  }).then((res) => {
    const params = {
      id: row.id,
      delay: '顺延',
    }
    updateTasks(params).then((res) => {
      ElMessage.success('延期成功')
      search()
    })
  })
}

const getTimer = (item) => {
  let ats = item.updatedAt || item.createdAt
  let day = dayjs(ats).format('YYYY-MM-DD')
  let now = dayjs(new Date()).format('YYYY-MM-DD')
  let extra = dayjs(now).diff(day, 'days')

  let type =
    extra >= 30
      ? 'info'
      : extra >= 7
        ? 'danger'
        : extra >= 3
          ? 'warning'
          : extra >= 1
            ? 'warning'
            : false
  return {
    type,
    extra: extra && extra >= 1 ? `逾${extra}天` : false,
  }
}

const getTags1 = (key) => {
  let len1 = key.length || 1
  let hash = {
    0: 'info',
    1: 'danger',
    2: 'warning',
    3: 'info',
    4: 'success',
  }
  return hash[len1 % 4]
}

const getTag = (key) => {
  let hash = {
    重要且紧急: 'danger',
    紧急但不重要: 'warning',
    重要且不紧急: 'info',
    不重要不紧急: 'success',
  }
  return hash[key]
}

const isAddVisible = ref(false)

const addClick = () => {
  state.detail = {}
  isAddVisible.value = true
}

const editClick = (row) => {
  state.detail = { ...row }
  isAddVisible.value = true
}
const inputVal = ref('')
const state = reactive({
  detail: {},
  options: [
    { label: '重要且紧急', value: '重要且紧急' },
    { label: '紧急但不重要', value: '紧急但不重要' },
    { label: '重要且不紧急', value: '重要且不紧急' },
    { label: '不重要不紧急', value: '不重要不紧急' },
  ],
  tableData: [
    {
      name: '待完成',
      icon: '',
      value: '1',
      total: 0,
      hidden: false,
    },
    {
      name: '已完成',
      icon: '',
      value: '7',
      total: 0,
      hidden: false,
    },
    {
      name: '垃圾桶',
      icon: '',
      value: '8',
      total: 0,
      hidden: false,
    },
    {
      name: '摘要',
      icon: '',
      value: '9',
      total: 0,
      hidden: false,
    },
  ],
  tasks: [],
  title: '待完成',
  status: '1',
})

const deleteClick = (row) => {
  row.status = '8'
  switchChange(row, false)
}

const copyClick = async (item) => {
  let str = item.name + '\n'
  if (item && item.children && item.children.length) {
    for (let i = 0; i < item.children.length; i++) {
      str += item.children[i].name + '\n'
    }
  }
  await writeText(str)
  ElMessage.success('复制成功！')
}

const options1 = computed(() => {
  return state.tableData
})
const hiddenClick = (row) => {
  row.hidden = true
}
const search = (params = {}) => {
  getTasks({ status: state.status, ...params }).then((res) => {
    nextTick(() => {
      state.tasks = res.data.map((v, w) => {
        return {
          index: w + 1,
          ...v
        }
      })
    })
  })
}

const searchTag = (tags) => {
  search({ tags })
}

const searchType = (types) => {
  search({ types })
}

const activeIndex = ref(0)
const itemClick = (value, item) => {
  state.title = item.name
  activeIndex.value = value
  state.status = item.value
  if (item.value === '9') {
    getOptions()
  } else {
    search()
  }
}

function formatStr(input) {
  const regex = /(\d{13})/;
  const nameRegex = /[-\s]*[\u4e00-\u9fa5]{2,3}$/;

  return input.replace(regex, '<span style="color:#409eff;">$1</span>')
    .replace(nameRegex, (match) => {
      if (match.trim().length > 0 && input.trim().endsWith(match.trim())) {
        return '<span style="color: #f56c6c;">' + match + '</span>';
      } else {
        return match;
      }
    });
}

const switchChange = (row, falg) => {
  const params = {
    ...row,
    endTime: row.name,
    endTime: row.endTime,
    id: row.id,
    optime: row.optime,
    priority: row.priority,
    status: falg ? '7' : row.status || '7',
  }
  if (params.createdAt) {
    delete params.createdAt
    delete params.updatedAt
  }
  updateTasks(params).then((res) => {
    search()
  })
}
const priority = (priority) => {
  let map = {
    重要且紧急: 'page-item-priority-important-urgent',
    紧急但不重要: 'page-item-priority-urgent',
    重要且不紧急: 'page-item-priority-not-urgent',
    不重要不紧急: 'page-item-priority-normal',
  }
  return map[priority] || ''
}

const conetent = ref('')
const prioritys = ref('')
const enterClick = () => {
  if (!conetent.value) {
    return
  }
  const params = {
    name: conetent.value,
    status: state.status,
    priority: prioritys.value || '',
  }
  insertTasks(params).then((res) => {
    conetent.value = ''
    search()
  })
}

const onResize = (e) => {
  const { width, height } = e
  // isCollapsed.value = width >= 400
}

const textClick = (row) => {
  row.isEdit = true
}

const textBlur = (row) => {
  row.isEdit = false
  switchChange(row)
}

//处理摘要
const records = ref([])
const records1 = ref([])
const getOptions = () => {
  getLast3MonthAbstractTasks({}).then((res) => {
    const rowData = res.map(item => {
      return {
        ...item,
        data_array: JSON.parse(item.data_array)
      }
    })
    nextTick(() => {
      // records.value = rowData
      records1.value = rowData
    })
  })
}

onMounted(() => {
  search()
})
</script>

<style scoped lang="scss">
.page-row {
  background-color: #eaeaea !important;
  background: #ffffff no-repeat fixed center !important;
  background-size: cover;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  background-color: unset;
  width: 100%;
  height: 100%;
  display: flex;
}

.page-col1 {
  width: 140px;
  padding-left: 8px;
  padding-right: 8px;
  background: #f8f8f8;
}

.page-col2 {
  width: calc(100% - 140px);
  height: 100%;
  flex: 1;
  padding: 6px 10px;
  padding-left: 10px !important;
  padding-top: 10px;
  z-index:999;
}

.page-col3 {
  padding-left: 0 !important;
}

.page-item {
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  line-height: 40px;
  color: #000;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 5px;
  padding-left: 8px;
  transition: 0.4s all;
  position: relative;
  width: 120px !important;

  &:hover {
    background: #ffffff;

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
  width: 100%;
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
    background: #ffffff;
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
    background: #d6e1f9;
  }
}

.page-col2-title {
  margin-bottom: 8px;
  display: block;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .aaaa {
    display: flex;
    align-items: center;
    color: #000;
  }

  .ssss {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.page-col2-content {
  margin: 4px 0;
  max-height: calc(100% - 80px);
  overflow-y: auto;
  height: auto;
  height: 100%;
}

.page-col2-item {
  height: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  padding: 4px 5px;
  cursor: pointer;
  font-size: 13px;
  transition: 0.4s all;
  margin: 2px 0;
  border-radius: 8px;
  padding-right: 0;
  border-bottom: 1px solid #eeeeeea2;

  &:hover {
    background: #ffffff;
  }
}

.actives {
  background: #ffffff;

  .page-item-title {
    color: #000;
  }
}

.active2 {
  background: #ffffff;

  .page-item-title {
    color: #000;
  }
}

.page-col2-input {
  height: 38px;
  line-height: 38px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  overflow: hidden;

  :deep(.el-input__inner) {
    color: #000 !important;
  }

  :deep(.el-input__wrapper) {
    border: none;
    box-shadow: none;
    background-color: transparent;
    padding-left: 0;
    padding-left: 8px;
    color: #666 !important;
    font-size: 14px;
  }

  :deep(.is-focus) {
    box-shadow: none !important;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
}

.page-col2-item-name {
  margin-left: 8px;
  display: flex;
  justify-content: space-between;
  width: 97%;
  align-items: center;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #eeeeee65;
    background-color: transparent;
    border: none;
  }
}

.active2 {
  background: #e9eded;
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
  color: #5e5f5f;

  &:hover {
    background: #ffffff;
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
  color: #5e5f5f;

  &:hover {
    color: #5e5f5f;
  }
}

.ml-2 {
  margin-right: 8px;
}

.page-select {
  min-width: 60px !important;
  margin-right: 0;
}

.page-item-priority-important-urgent {
  background: #ffcdd8;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px transparent;
    background-color: #e25774;
    border: none;
    color: white;

    .el-input__inner {
      color: white;
      text-align: center;
    }

    i {
      color: white;
      display: none;
    }
  }
}

.page-item-priority-important {
  background: #c5bbf9;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px transparent;
    background-color: #a695f7;
    border: none;

    .el-input__inner {
      color: white;
    }

    i {
      color: white;
    }
  }
}

.page-item-priority-urgent {
  background: #ffeca8;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px transparent;
    background-color: #bba830;
    border: none;
    color: white;

    .el-input__inner {
      color: white;
    }

    i {
      color: white;
    }
  }
}

.page-item-priority-not-urgent {
  background: #ffddc4;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px transparent;
    background-color: #ba5f28;
    border: none;
    color: white;

    .el-input__inner {
      color: white;
    }

    i {
      color: white;
    }
  }
}

.page-item-priority-normal {
  background: #c7e5c9;

  :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px transparent;
    background-color: #537856;
    border: none;
    color: white;

    .el-input__inner {
      color: white;
    }

    i {
      color: white;
    }
  }
}

.main-title {
  text-overflow: ellipsis;
  overflow: hidden;
  text-wrap: nowrap;
  flex: 1;
  margin-right: 8px;
  cursor: pointer;
  color: #5e5f5f;
  width: calc(100% - 120px);
  display: flex;
  align-items: center;

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
        background-color: transparent;
      }
    }
  }

  .tils {
    cursor: pointer;
    color:#666;
  }
}

.page-select1 {
  display: inline-block;
  margin-right: 8px;
  width: 130px !important;

  svg {
    display: inline-block;
    width: 18px;
    height: 18px;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background: #ffffff;
    }
  }
}

.abstract {
  .abstract-title {
    font-weight: bold !important;
    font-size: 14px;
  }

  .abstract-item {
    margin-top: 6px;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 8px;
    transition: all 0.5s;
    height: auto;
    cursor: pointer;
  }

  .abstract-item-name {
    font-weight: 400;
    font-size: 14px;
    color: blue;
  }

  .abstract-item-box {}

  .abstract-item-c {
    font-size: 14px;
    color: #000;
  }

  .abstract-item-d {}
}

.mg-tp20 {
  margin-top: 20px;
}

.main-select2 {
  max-width: 200px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: auto;

  .thga {
    font-size: 11px !important;
    padding: 0px 3px;
    height: 20px;
    margin-right: 5px;
  }
}

svg {
  display: inline-block;
  width: 18px;
  height: 18px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #ffffff;
  }
}

.item-flag {
  width: 100px;

  span {
    display: flex !important;
    width: 20px;
    flex-wrap: wrap;

    &:hover {
      background: #ffffff;
    }
  }

  .flag1 {
    fill: #e25774;
  }

  .flag2 {
    color: #a695f7;
  }

  .flag3 {
    color: #bba830;
  }

  .flag4 {
    color: #ba5f28;
  }
}

:deep(.el-input-group__append) {
  box-shadow: none;
}

.page-cols {
  padding-left: 0 !important;
}
</style>
