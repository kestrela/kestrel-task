<template>
  <div class="app-container home">
    <el-container id="dept" style="height: 100%;">
      <el-aside width="50%" id="drag-dept-left">
        <div class="daily">
          <div class="daily-title">
            <div>我的习惯</div>
            <svg @click="addClick" t="1705218703956" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11307" width="200" height="200">
              <path d="M609.75 777.45q-49.85 4-99.85 4-50.26 0-100.46-4A168.19 168.19 0 0 1 255.19 623.2q-4-50-4-100.16t4-100.15a168.19 168.19 0 0 1 154.25-154.26q50-4 100.16-4c21.61 0 123.38-1.1 192.56-1.88a65.1 65.1 0 0 1 65.84 65.1V523q0 50.12-4 100.16a168.19 168.19 0 0 1-154.25 154.29z" fill="#CAE0FF" p-id="11308"></path>
              <path d="M509.57 899c-45.59 0-91.73-1.84-137.16-5.47a254.11 254.11 0 0 1-233.08-233.06c-3.63-45.43-5.47-91.57-5.47-137.15s1.84-91.73 5.47-137.15a254.13 254.13 0 0 1 233.08-233.09c38.75-3.09 150.67-2.75 217.53-2.54 12.14 0 22.33 0.07 29.62 0.07a27.5 27.5 0 0 1 0 55c-7.33 0-17.58 0-29.79-0.07-61.68-0.19-176.5-0.55-213 2.37a199.12 199.12 0 0 0-182.62 182.64c-3.51 44-5.29 88.64-5.29 132.77s1.78 88.79 5.29 132.77a199.12 199.12 0 0 0 182.64 182.64c44 3.51 88.65 5.29 132.78 5.29h0.43c44 0 88.53-1.79 132.37-5.29A199.12 199.12 0 0 0 825 656.09c3.33-41.72 3.3-187.77 3.29-235.76v-7a27.5 27.5 0 1 1 55 0v7c0 53.67 0 196.24-3.47 240.15a254.11 254.11 0 0 1-233.11 233.07C601.42 897.17 555.42 899 510 899z" fill="#1A5F8E" p-id="11309"></path>
              <path d="M868.1 318.17H612.76a27.5 27.5 0 0 1 0-55H868.1a27.5 27.5 0 0 1 0 55z" fill="#1A5F8E" p-id="11310"></path>
              <path d="M740.43 445.85a27.5 27.5 0 0 1-27.5-27.5V163a27.5 27.5 0 0 1 55 0v255.35a27.5 27.5 0 0 1-27.5 27.5z" fill="#1A5F8E" p-id="11311"></path>
            </svg>
          </div>
          <div class="habits">
            <div class="habits-item" @click="setClick(item)" v-for="(item,key) in state.tasks1" :key="key" :style="{'background-color':state.colors[key%9]}">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-num">
                <span class="num">{{ item.count }}次</span>
              </div>
            </div>
          </div>
        </div>
      </el-aside>
      <div id="dragBar-dept" class="vertical-dragbar"></div>
      <div class="righs">
        <div class="daily-title daily-title1">
          <div>我的打卡</div>
        </div>
        <el-row :gutter="6" class="rightss">
          <el-col v-for="(item, index) in state.habits" :key="index" :span="12" class="pages-cols">
            <el-card :body-style="{ padding: '0px' }" shadow="none">
              <div style="padding: 14px">
                <span>{{ item.name }}</span>
                <div class="bottom">
                  <time class="time">{{ state.tasks.length }}</time>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="24">
            <el-calendar ref="calendar">
              <template #header="{ date }">
                <span></span>
              </template>
              <template #dateCell="{data}">
                <div :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split('-').slice(-1).join('-') }}
                  <div v-for="item in state.tasks3" :key="item.index">
                    <span v-if="item.date == data.day.split('-').slice(1).join('-')" class="times">
                      {{item.count}} 次
                    </span>
                  </div>
                </div>
              </template>
            </el-calendar>
          </el-col>
        </el-row>
      </div>
    </el-container>
    <AddDialog v-model="isAddVisible" @search="search" />
  </div>
</template>
  <script setup>
import AddDialog from './AddDialog'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useCommon } from '@/hook/useCommon.js'
import dayjs from 'dayjs'
import { ElMessageBox, ElMessage } from 'element-plus'
const state = reactive({
  habits: [
    { name: '本月打卡', value: 0 },
    { name: '累计打卡', value: 0 },
  ],
  colors: [
    '#dad9e975',
    '#edf2bc75',
    '#fdc5b475',
    '#c9d0d675',
    '#d0ecde75',
    '#f8d7a475',
    '#dad9e975',
    '#6caadd75',
    '#cfc6c175',
  ],
  isAddVisible: false,
  tasks: [],
  tasks1: [],
  tasks3: [],
})
const currentDate = ref(new Date())
const { setLayoutDrag } = useCommon()
onMounted(() => {
  setLayoutDrag('dragBar-dept')
})

const addClick = () => {
  state.isAddVisible = true
}

const calendar = ref('')
const selectDate = (val) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}

const setClick = (row) => {
  ElMessageBox.confirm('确认打卡', '打卡提醒', {
    confirmButtonText: '打卡',
    type: 'warning',
  }).then((res) => {
    const params = {
      name: row.name,
      time: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    }
    saveObject('N0104', params).then((res) => {
      ElMessage.success('打卡成功')
      search()
    })
  })
}

const search = () => {
  // getObject('N0104').then((res) => {
  //   let map = {}
  //   let mapDate = {}
  //   state.tasks = res.map((v, w) => {
  //     const date = dayjs(v.createdAt).format('MM-DD')
  //     let name = v.attributes.name
  //     if (!map[name]) {
  //       map[name] = {}
  //     }
  //     if (map[name][date]) {
  //       map[name][date]++
  //     } else {
  //       map[name][date] = 1
  //     }

  //     if (mapDate[date]) {
  //       mapDate[date]++
  //     } else {
  //       mapDate[date] = 1
  //     }
  //     return {
  //       index: w + 1,
  //       ...v,
  //       ...v.attributes,
  //     }
  //   })

  //   state.tasks3 = Object.keys(mapDate).map((v) => {
  //     return {
  //       date: v,
  //       count: mapDate[v],
  //     }
  //   })
  //   let hash = {}
  //   Object.keys(map).map((v) => {
  //     Object.keys(map[v]).map((d) => {
  //       if (hash[v]) {
  //         hash[v] += map[v][d]
  //       } else {
  //         hash[v] = map[v][d]
  //       }
  //     })
  //   })
  //   state.tasks1 = Object.keys(hash).map((v) => {
  //     return {
  //       date: hash[v],
  //       name: v,
  //       count: hash[v],
  //     }
  //   })
  // })
}

onMounted(() => {
  search()
})

const { isAddVisible } = toRefs(state)
</script>
  <style scoped lang="scss">
.vertical-dragbar {
  width: 1px;
  height: 100vh;
  background: rgb(238, 238, 238);
  cursor: e-resize;
  border-radius: 5px;
}
.app-container {
  padding: 12px;
}

.drag-dept-left {
  max-width: 70% !important;
  min-width: 30% !important;
}

.habits {
  border-radius: 12px;
  height: calc(100vh - 92px);
  padding: 10px;
  overflow-y: auto;
}
.habits-item {
  cursor: pointer;
  margin: 8px 0;
  padding: 6px 12px;
  border-radius: 5px;
  transition: all 0.2s;
  box-shadow: 1px 1px 1px #eeeeee60;
  color: #000;
  transition: 0.6s all;
  &:hover {
    box-shadow: 1px 1px 1px #eeeeee60;
    background: #efefef65 !important;
  }
  display: flex;
  justify-content: space-between;
  .item-name {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #000;
  }
  .item-num {
    font-size: 12px;
    .num {
      margin-right: 6px;
    }
    .opt {
      font-size: 12px;
    }
  }
}

.daily-title {
  font-size: 16px;
  font-weight: 400;
  color: #000;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  svg {
    height: 24px;
    width: 24px;
    cursor: pointer;
    transition: 0.3s all;
    border-radius: 5px;
    padding: 2px;
    &:hover {
      background: #d6e1f9;
    }
  }
}

.daily-title1 {
}

.rightss {
  border-radius: 12px;
  padding: 10px 0;
  overflow-y: auto;
}

.times {
  background: #dc5947;
  color: white;
  padding: 3px 2px;
  width: 100%;
  border-radius: 5px;
  margin-top: 6px;
  display: inline-block;
  text-align: center;
}
:deep(.el-calendar-day) {
  overflow-y: hidden;
  overflow-x: hidden;
  height: 65px;
  span {
    font-size: 12px;
    line-height: 16px;
    display: block;
    width: 100%;
    padding: 1px;
    margin-bottom: 2px;
    border-radius: 4px;
    color: #fff;
  }
  span {
    &:nth-child(1) {
      background: #e2bde9;
    }
  }
  span {
    &:nth-child(2) {
      background: #c7e5c9;
    }
  }
  span {
    &:nth-child(3) {
      background: #c4c9e7;
    }
  }
  span {
    &:nth-child(4) {
      background: #e2bde9;
    }
  }
}
:deep(.el-calendar) {
  border-radius: 12px;
  transition: 80ms, transform 400ms cubic-bezier(0.14, 1.02, 0.17, 0.03) !important;
  margin: 5px;
  box-shadow: 0 1px 2px #99999947;
  background: radial-gradient(circle, #efefef55, #efefef55);
  border-radius: 10px;
  display: flex;
  border: none;
}
:deep(.el-calendar__header) {
  padding: 4px 0 12px 0;
}
:deep(.el-calendar__body) {
  padding: 4px 0 12px 0;
}

.righs {
  padding-left: 12px;
}

.pages-cols {
}
</style>
   