<template>
  <div class="app-container home">
    <el-calendar ref="calendar">
      <template #header="{ date }">
        <div class="calendar-box">
          <el-input v-model="conetent" @keydown.enter="enterClick" placeholder="添加任务至列表，回车即可创建" class="page-col2-input">
          </el-input>
          <span class="color-666">{{ date }}</span>
          <el-button-group>
            <el-button size="small" class="mg-rt3" @click="selectDate('prev-year')">
              去年
            </el-button>
            <el-button size="small" class="mg-rt3" @click="selectDate('prev-month')">
              上月
            </el-button>
            <el-button size="small" class="mg-rt3" @click="selectDate('today')">今天</el-button>
            <el-button size="small" class="mg-rt3" @click="selectDate('next-month')">
              下月
            </el-button>
            <el-button size="small" class="mg-rt3" @click="selectDate('next-year')">
              明年
            </el-button>
          </el-button-group>
        </div>
      </template>

      <template #date-cell="{ data }">
        <div :class="data.isSelected ? 'is-selected' : ''" class="selectedsss" @click="dateClick(data.day)">
          <div class="datess">
            {{ data.day.split("-").slice(-1).join("-") }}
          </div>
          <div class="ssss">
            <div v-for="item in state.tasks" :key="item.index" :title="item.desc">
              <el-text truncated v-if="item.date == data.day.split('-').slice(1).join('-')">
                <span :class="`conetnts${item.index % 5}`" class="conetnts">
                  {{ item.name }}
                </span>
              </el-text>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>

    <DetailDialog v-model="isDetailVisible" :detail="state.detail" :dialogTitle="dialogTitle" />
  </div>
</template>
<script setup>
import DetailDialog from './DetailDialog.vue'
import {
  getTasks,
  updateTasks,
  insertTasks,
  deleteTasks,
  getLast3MonthAbstractTasks
} from "@/api/index.js";
import { onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'
const calendar = ref('')
const selectDate = (val) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}

const state = reactive({
  calendarValue: '03-03',
  calendarList: [
    {
      name: 'leetcode',
      date: '12-28',
    },
    {
      name: 'leetcode',
      date: '12-30',
    },
  ],
  tasks: [],
  detail: {},
})

const conetent = ref('')
const enterClick = () => {
  if (!conetent.value) {
    return
  }
  const params = {
    name: conetent.value,
    status: state.status || '1',
  }
  insertTasks(params).then(res => {
    conetent.value = ''
    search()
  })
}

const search = () => {
  Promise.all([getTasks({ status: '1', pageSize: 500, pageNum: 1 }), getTasks({ status: '7', pageSize: 500, pageNum: 1 })]).then((results) => {
    let [result1, result2] = results;
    let res = [].concat(result1.data).concat(result2.data);
    state.tasks = res.map((v, w) => {
      const date = dayjs(v.createdAt).format('MM-DD')
      return {
        index: w + 1,
        ...v,
        date,
      }
    })
  })
}

const isDetailVisible = ref(false)
const dialogTitle = ref('')
const dateClick = (date) => {
  let today = dayjs(date).format('YYYY-MM-DD')
  let now = dayjs(date).format('MM-DD')

  dialogTitle.value = '任务明细 ' + today
  state.detail = state.tasks.filter((t) => t.date === now)
  isDetailVisible.value = true
}
onMounted(() => {
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

.drag-dept-left {
  max-width: 70% !important;
  min-width: 30% !important;
}

.page-col2-input {
  height: 36px;
  line-height: 36px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  overflow: hidden;
  width: 400px;

  :deep(.el-input) {
    border: none;
  }

  :deep(.el-input__wrapper) {
    border: none;
    box-shadow: none;
    background-color: #f3f4f7;
    padding-left: 0;
    padding-left: 12px;
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

.is-selected {
  color: #1989fa;
}

.item_config {
  background-color: #000;
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 20px;
  border-radius: 10px;

  ._key {
    float: left;
    width: 70px;
    text-align: right;
  }

  ._value {
    width: 100%;
    padding-left: 80px;
    text-align: left;
  }
}

.calendar-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

:deep(.el-calendar__header) {
  padding: 4px 0 12px 0;
}

:deep(.el-calendar__body) {
  padding: 4px 0 12px 0;
}

:deep(.el-calendar-day) {
  padding: 5px;
  min-height: 86px;
  height: 13vh;
  margin: 4px;

  .selectedsss {
    position: relative;
    position: relative;
    height: 100%;
  }

  .ssss {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }

  span {
    font-size: 12px;
    line-height: 16px;
    display: block;
    width: 100%;
    padding: 1px;
    margin-bottom: 1px;
    border-radius: 4px;
    color: #999;
  }

  .conetnts0 {
    background: #ffeca8;
  }

  .conetnts1 {
    background: #c7e5c9;
  }

  .conetnts2 {
    background: #c4c9e7;
  }

  .conetnts3 {
    background: #e2bde9;
  }

  .conetnts4 {
    background: #ffb5ab;
  }

  .conetnts {
    font-size: 11px;
    border-radius: 5px;
    padding: 2px;
    display: inline-block;
    position: relative;
    padding-left: 10px;
    width: calc(100% - 12px);
    color: #000;

    &::before {
      content: '';
      height: 5px;
      width: 5px;
      border-radius: 50%;
      position: absolute;
      top: 9px;
      left: 2px;
      background: #f58e3f50;
    }
  }
}

.datess {
  position: absolute;
  background: #67c23aab;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  left: 2px;
  color: #fff;
  font-size: 13px;
  top: 2px;
  z-index: 999;
}

:deep(.prev),
:deep(.next) {
  .datess {
    z-index: 999;
    position: absolute;
    background: #ddd;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    left: 2px;
    color: #fff;
    font-size: 13px;
    top: 2px;
  }
}

:deep(.el-calendar) {
  border-radius: 12px;
  transition: 80ms, transform 400ms cubic-bezier(0.14, 1.02, 0.17, 0.03) !important;
  margin: 5px;
  box-shadow: 0 1px 2px #99999947;
  background: #fff;
  border-radius: 10px;
  border: none;
  padding: 12px 12px;
}

.mg-rt3 {
  margin-right: 3px !important;
}

.color-666 {
  color: #000;
  font-weight: bold;
  color: #000;
  font-size: 16px;
}
</style>
