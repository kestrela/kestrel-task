<template>
  <div class="page-col2-content">
    <el-row :gutter="12" class="chart-row">
      <el-col :span="24" class="chart-statics">
        <div :class="['chart-card', `frind-card${key + 1}`]" v-for="(item, key) in cardList" :key="key">
          <span class="span1">{{ item.title }}</span>
          <span>{{ item.end }}</span>
        </div>
      </el-col>
      <el-col :span="24" class="chart-col" style="margin-top:20px;">
        <BarChart />
      </el-col>
      <el-col :span="24" class="chart-col">
        <BarChart1 />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import TaskChart from './TaskChart.vue'
import LineChart from './LineChart.vue'
import Activity from './Activity.vue'
import Charts from '@/components/Charts.vue'
import FinishedChart from './FinishedChart.vue'
import { nextTick, onMounted, reactive, ref } from 'vue'
import { getTaskStatistics } from "@/api/index.js";
import BarChart from './components/BarChart.vue'
import BarChart1 from './components/BarChart1.vue'
const state = reactive({
  tasks: 0,
  okrs: 0,
  memos: 0
})

const cardList = ref([
  {
    id: 4,
    end: 9527,
    duration: 3000,
    title: '待办总数',
    icon: 'yu-icon-icon_xinyong_xianxing_jijin-129',
    badge: {
      className: 'bg-info',
      txt: '+22%'
    },
    info: '与上期相比',
    key: 'alls'
  },
  {
    id: 1,
    end: 6666,
    duration: 3000,
    title: '我的待办',
    icon: 'yu-icon-lifangti',
    badge: {
      className: 'bg-info',
      txt: '+56%'
    },
    info: '与上期相比',
    key: 'todos'
  },
  {
    id: 2,
    end: 95270,
    duration: 3000,
    title: '我的已办',
    icon: 'yu-icon-chanpin1',
    badge: {
      className: 'bg-danger',
      txt: '+78%'
    },
    info: '与上期相比',
    key: 'finisheds'
  },
  {
    id: 3,
    end: 666,
    duration: 1000,
    title: '今日新增',
    icon: 'yu-icon-jiagebiaoqian',
    badge: {
      className: 'bg-warning',
      txt: '-5.2%'
    },
    info: '与上期相比',
    key: 'todays'
  },
  {
    id: 4,
    end: 9527,
    duration: 3000,
    title: '今日完成数',
    icon: 'yu-icon-icon_xinyong_xianxing_jijin-129',
    badge: {
      className: 'bg-info',
      txt: '+22%'
    },
    info: '与上期相比',
    key: 'todays_finished'
  },
  {
    id: 4,
    end: 9527,
    duration: 3000,
    title: '昨日完成数',
    icon: 'yu-icon-icon_xinyong_xianxing_jijin-129',
    badge: {
      className: 'bg-info',
      txt: '+22%'
    },
    info: '与上期相比',
    key: 'yesterdays'
  }
])
const search = () => {
  getTaskStatistics({}).then(res => {
    nextTick(() => {
      cardList.value.forEach(item => {
        item.end = res[item.key]
      })
    })
  })
}
onMounted(() => {
  search()
})

</script>

<style scoped lang="scss">
.page-col2-content {
  margin: 8px;
  max-height: calc(100vh - 22px);
  overflow-y: auto;
  height: calc(100vh - 72px);

  .chart-row {
    width: calc(100% - 0px);
  }
}

.chart-col {
  height: 200px;
}

.chart-statics {
  display: flex;

  .chart-card {
    width: 16.6%;
    height: 50px;
    border-radius: 8px;
    margin-right: 12px;
    padding: 6px 8px;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: 0.5s all;

    &:hover {
      transform: scale(1.04);
    }

    span {
      display: block;
      text-align: center;
      font-weight: bold;
      color: #fff;
    }

    .span1 {
      font-weight: normal;
      color: #fff;
      font-size: 14px;
    }
  }
}

.frind-card1 {
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
}

.frind-card2 {
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.frind-card3 {
  background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
}

.frind-card4 {
  background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
}

.frind-card5 {
  background-image: linear-gradient(to top, #c471f5 0%, #fa71cd 100%);
}

.frind-card6 {
  background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);
}

.frind-card7 {
  background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
}

.frind-card8 {
  background-image: linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%);
}

.frind-card9 {
  background-image: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);
}

.frind-card10 {
  background-image: linear-gradient(to top, #f77062 0%, #fe5196 100%);
}
</style>
