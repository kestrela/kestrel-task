<template>
  <div class="page-row1">
    <el-col class="page-col2" v-resize="onResize">
      <el-input v-if="!['7', '8', '9'].includes(state.status)" autocomplete autofocus :rows="3" minlength="2"
        show-word-limit maxlength="280" resize="none" :autosize="{ minRows: 2, maxRows: 8 }" type="textarea"
        v-model="conetent" @keydown.enter="enterClick" placeholder="现在的想法是...回车即可创建" class="page-col2-input">
        <template #prepend>
          +
        </template>
      </el-input>
      <div class="page-col2-content99">
        <div class="abstract" v-if="state.tasks.length">
          <div class="abstract-item" @click="copyClick" v-for="(item, index) in state.tasks" :key="index">
            <div class="abstract-item-name">{{ item.title }}</div>
            <div class="abstract-item-box">
              <div class="abstract-item-c">
                <div class="abstract-item-d">{{ item.createdAt }} <span class="author" v-if="item.author">{{
                    item.author}}</span></div>
              </div>
            </div>
            <svg @click.stop="deleteClick(item)" t="1707199243113" class="icon deletes" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="12106" width="200" height="200">
              <path
                d="M882.2784 249.1904h-186.112c0.256-3.8912 0.4608-7.7824 0.4608-11.6736 0-100.0448-81.408-181.504-181.504-181.504s-181.504 81.408-181.504 181.504c0 3.8912 0.1536 7.7824 0.4096 11.6736H148.0192c-19.8144 0-35.84 16.0256-35.84 35.84s16.0256 35.84 35.84 35.84h734.2592c19.8144 0 35.84-16.0256 35.84-35.84s-16.0256-35.84-35.84-35.84z m-476.928-11.7248c0-60.5696 49.2544-109.824 109.824-109.824s109.824 49.2544 109.824 109.824c0 3.8912-0.3072 7.8336-0.7168 11.6736H406.016c-0.4096-3.84-0.6656-7.7312-0.6656-11.6736zM724.48 960.0512H307.8656c-67.3792 0-122.1632-52.6848-122.1632-117.4016V419.84c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v422.7584c0 25.2416 22.6304 45.7216 50.4832 45.7216h416.6656c27.8528 0 50.4832-20.5312 50.4832-45.7216V419.84c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v422.7584c-0.0512 64.768-54.8352 117.4528-122.2144 117.4528z"
                fill="#f56c6c" p-id="12107"></path>
              <path
                d="M421.12 795.5456c-19.8144 0-35.84-16.0256-35.84-35.84V468.4288c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v291.2768c0 19.7632-16.0768 35.84-35.84 35.84zM603.136 795.5456c-19.8144 0-35.84-16.0256-35.84-35.84V468.4288c0-19.8144 16.0256-35.84 35.84-35.84s35.84 16.0256 35.84 35.84v291.2768c0 19.7632-16.0256 35.84-35.84 35.84z"
                fill="#f56c6c" p-id="12108"></path>
            </svg>
          </div>
        </div>
        <Empty v-else />
      </div>
    </el-col>
  </div>
</template>
<script setup>
import { getSentences, insertSentences,deleteSentences } from '@/api/index.js'
import Empty from '@/components/Empty.vue'
import dayjs from 'dayjs'
import { readText, writeText } from '@tauri-apps/api/clipboard'
import { ElMessage } from 'element-plus'
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
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

const getImgUrl = (img) => {
  return new URL(`../../assets/${img}.svg`, import.meta.url).href
}
const inputVal = ref('')
const state = reactive({
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
  ElMessageBox.confirm('确认删除该条数据吗？', '', {
    confirmButtonText: '确认',
    type: 'warning',
  }).then((res) => {
    deleteSentences({ id: row.id }).then((res) => {
      ElMessage.success('删除成功')
      search()
    })
  })
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
const activeIndex = ref(0)
const details = ref({})
const itemClick = (value, item) => {
  details.value = { ...item }
  state.title = item.name
  activeIndex.value = value
  state.status = item.value
}
const search = () => {
  getSentences({}).then((res) => {
    nextTick(() => {
      state.tasks = res.data.map((v, w) => {
        return {
          index: w + 1,
          ...v,
          createdAt: formatDate(v.createdAt),
        }
      })
      itemClick(0, state.tasks[0])
    })
  })
}

const switchChange = (row, falg) => {
  const params = {
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
  updateObject('N0107', params).then((res) => {
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
const enterClick = () => {
  if (!conetent.value) {
    return
  }
  const params = {
    title: conetent.value,
    status: state.status,
  }
  insertSentences(params).then((res) => {
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
  // getObject('N0107', {}).then((res) => {
  //   state.tasks = []
  //   let hashMap = {}
  //   let hashMap1 = {}
  //   res.map((v, w) => {
  //     v = {
  //       index: w + 1,
  //       ...v,
  //       ...v.attributes,
  //     }
  //     const key = v.updatedAt
  //       ? dayjs(v.updatedAt).format('YYYY-MM-DD')
  //       : dayjs(v.createdAt).format('YYYY-MM-DD')

  //     //待完成
  //     if (v.status === '1') {
  //       if (!hashMap[key]) {
  //         hashMap[key] = []
  //       }
  //       hashMap[key].push(v)
  //     } else if (v.status === '7') {
  //       if (!hashMap1[key]) {
  //         hashMap1[key] = []
  //       }
  //       hashMap1[key].push(v)
  //     }
  //   })
  //   records.value = Object.keys(hashMap).map((d) => {
  //     return { name: d, children: hashMap[d] }
  //   })
  //   records1.value = Object.keys(hashMap1).map((d) => {
  //     return { name: d, children: hashMap1[d] }
  //   })
  // })
}

onMounted(() => {
  search()
})
</script>

<style scoped lang="scss">
.page-row1 {
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


.page-col2 {
  width: calc(100% - 260px);
  height: 100%;
  flex: 1;
  padding: 6px 10px;
  padding-top: 0;
}

.page-item {
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 40px;
  color: #313d44;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 5px;
  padding-left: 18px;
  transition: 0.4s all;
  position: relative;
  font-weight: 408;

  &:hover {
    background: #d6e1f980;

    .more {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    height: 6px;
    width: 6px;
    border-radius: 6px;
    background-color: #d252946a;
    position: absolute;
    left: 5px;
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

  .sss {
    display: block;

    span {
      display: block;
    }
  }
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
    background: #d6e1f9;
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
  font-weight: 400;
  margin-bottom: 8px;
  display: block;
  font-size: 14px;
  display: flex;
  align-items: center;

  .aaaa {
    display: flex;
    align-items: center;
  }

  .ssss {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    font-size: 12px;
    color:#666;
  }
}

.page-col2-content99 {
  margin: 0;
  height: calc(100% - 120px);
  padding-bottom: 0 !important;
}

.actives {
  background: #d6e1f9;

  .page-item-title {
    color: #1456f0;
  }
}

.active2 {
  background: #d6e1f9;

  .page-item-title {
    color: #1456f0;
  }
}

.page-col2-input {
  min-height: 32px;
  line-height: 32px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  overflow: hidden;
  max-height: 100px;
  margin-top:6px;

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
    box-shadow: none !important;
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

.active2 {
  background: #d6e1f9;
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
    background: #d6e1f9;
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
  color: #326cf1;

  &:hover {
    color: #326cf1;
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
  color: #333;
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
        background-color: #f3f4f7;
      }
    }
  }

  .tils {
    cursor: pointer;
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
      background: #d6e1f9;
    }
  }
}

.abstract {
  height: 100% !important;
  overflow-y: auto;

  .abstract-title {
    font-weight: 400;
    font-size: 14px;
  }

  .abstract-item {
    margin-top: 6px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 8px;
    transition: all 0.5s;
    height: auto;
    cursor: pointer;
    transition: 0.5s all;
    position: relative;

    &:hover {
      background: #f8f8f8;
    }
  }

  .abstract-item-name {
    font-weight: bold;
    font-size: 14px;
  }

  .abstract-item-box {}

  .abstract-item-c {
    font-size: 14px;
    color: #999;
  }

  .abstract-item-d {}
}

.mg-tp20 {
  margin-top: 20px;
}

.main-select2 {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

svg {
  display: inline-block;
  width: 18px;
  height: 18px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #d6e1f9;
  }
}

:deep(.el-textarea__inner) {
  padding: 8px 10px;
}

.author {
  color: #666;
}

.deletes {
  position: absolute;
  right: 5px;
  top: 5px;
  opacity: 0;
  transition: 0.3s all;
  stroke: #ccc;
  fill:#ccc;
}
.abstract-item:hover .deletes{
  opacity: 1;
}
</style>