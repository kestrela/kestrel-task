<template>
  <div class="containersss">
    <div class="container-card" :style="{ height: height, width: width }">
      <ul class="graph">
        <el-tooltip class="item" effect="dark" :content="item.key + ' ' + item.num + '条'" placement="top-start"
          v-for="(item, index) in state.infos" :key="index" :open-delay="500">
          <li :data-level="item.level" class="li-day" :isToday="item.isToday" @click="handleClick(item)"></li>
        </el-tooltip>
      </ul>

      <ul class="months">
        <li class="li-month" v-for="(item, index) in state.monthBar" :key="index">{{ item }}</li>
      </ul>
    </div>

    <!-- <LineChart :detail="state.infos" />
    <FinishedChart :detail="state.infos" /> -->
  </div>

</template>

<script setup>
import FinishedChart from './FinishedChart'
import LineChart from './LineChart.vue'
import dayjs from 'dayjs'
import { onMounted } from 'vue'
import { reactive } from 'vue'
import { getLast3MonthTasks } from "@/api/index.js";
const props = defineProps({
  height: { type: String, default: '100%' },
  width: { type: String, default: '100%' },
})
const state = reactive({
  infos: [], //存放84天每一天的数据（year，month，date，状态数量，isToday标记）
  current: {
    //存放今天的年月日
    year: '',
    month: '',
    date: '',
  },
  monthBar: ['', '', '', '', '', '', '', '', '', '', '', ''], //12列对应的月份，比如第三列开始是五月份，则令monthBar[2]="5月"，算法实现见下面method
})

const init = () => {
  let d = new Date()
  let day = d.getDay() //获取今天所在星期，以进行后续计算
  let today = d.getDate() //获取今天的日数

  state.current.year = d.getFullYear() //初始化今日的年月日
  state.current.month = d.getMonth()
  state.current.date = d.getDate()

  let info = {} //用来存放某一天的数据对象（年月日、isToday、level）
  let month = '' //后续计算某月第一天在哪一列用，表示第几月
  let weekOfMonth = '' //后续计算某月第一天在哪一列用，表示第几列

  /**
   *前提：Date对象通过setDate()设置到某一天的年月日，例如setDate(1)就是设置日期月本月1号
   *而setDate(0)则是上个月最后一天，setDate(-1)则是设置为上个月倒数第二天
   *以此类推，假如今天是星期五，如果周日算本周第一天，则今天是本周第6天，也就是本周在今日前面还有5天，本周在第12列，则今天前的日期有11*7+5=82天，所以第1列第1格为82天前。
   *假如今天是13日，82-13=69，那么第1列第1格为本月第1天的前69天，则那天的日期设置为setDate(-69+1)（+1是为了算上0），最后就能获得那一天的年月日对象，再获得年月日数值。
   *知道前提后下面的代码可以自己体会了
   */
  for (let i = 0; i < 84; i++) {
    d.setFullYear(state.current.year) //每次循环要重置年月日为今天否则会以上次循环结尾的年月日计算而计算错误
    d.setMonth(state.current.month)
    d.setDate(state.current.date)

    d.setDate(today - 77 - day + i) //设置到本次循环的date
    //(today-(84-(7-day)+i)

    let level = Math.floor(Math.random() * 3) //这里是随机设置每天的频率等级，后续开发要替换为自己计算的真实等级（不同等级对应不同颜色方格）

    if (
      //判断是否为今天，是则做些标记，后续渲染时可以突出强调今天的格子
      d.getMonth() == state.current.month &&
      d.getDate() == state.current.date
    ) {
      info = {
        key: dayjs(d).format('YYYY-MM-DD'),
        //每个格子（天）的info对象
        year: d.getFullYear(), //年月日
        month: d.getMonth() + 1,
        date: d.getDate(),
        number: 0, //今日的数据量
        level: '0', //今日数据量对应的等级
        isToday: true, //是否是今天
      }
      state.infos.push(info)
    } else {
      info = {
        key: dayjs(d).format('YYYY-MM-DD'),
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        date: d.getDate(),
        number: 0,
        level: '0', //今日数据量对应的等级
        isToday: false,
      }
      state.infos.push(info)
    }
    //判断每月第一天在12列种的哪一列
    if (d.getDate() == 1) {
      //date为1的肯定是某月第一天
      month = d.getMonth() + 1 //获取这一天对应的月份（0-11，所以还要+1）
      weekOfMonth = parseInt((i + 1) / 7) //这个月的第一天的index（84天的第几天）除以7获得所在列的index（12列的第几列），作为下面monthBar的index，并把原来空的内容用替换为xx月
      state.monthBar[weekOfMonth] = month + '月'
    }
  }
}
const calcLevel = (num) => {
  return num >= 40 ? '5' : num >= 30 ? "4" : num >= 20 ? "3" : num >= 10 ? "2" : num > 0 ? '1' : "0"
}
const search = () => {
  getLast3MonthTasks({}).then(res => {
    const hash = {}
    res.forEach(item => {
      hash[item.date] = item
    });
    state.infos.forEach(item => {
      item.num = hash[item.key] ? hash[item.key].num : 0
      item.level = calcLevel(item.num)
    })
  })
}
onMounted(() => {
  search()
  init()
})
</script>



<style scoped lang="scss">
.container-card {
  // position: absolute;
  border-radius: 10px;
  box-shadow: 1px 2px 25px none;
  backdrop-filter: blur(20px) saturate(1.3);
  transition: 300ms cubic-bezier(0.9, 0, 0.1, 1);
  margin-top: 8px;
  padding: 16px 0;
}

.graph {
  display: grid;
  grid-template-columns: repeat(12, 16px);
  grid-template-rows: repeat(7, 16px);
  padding-inline-start: 0px;
  grid-auto-flow: column;
  margin: 12px 6px 5px 6px;
  grid-column-gap: 4px;
  grid-row-gap: 4px;
}

.months {
  display: grid;
  grid-template-columns: repeat(12, 21px);
  grid-template-rows: 21px;
  font-size: 12px;
  color: #aaa;
  padding-inline-start: 0px;
  margin: 5px 20px 5px 20px;
}

.li-month {
  display: inline-block;
}

.li-day {
  background-color: #eaeaea;
  list-style: none;
  border-radius: 3px;
}

.li-day:hover {
  box-shadow: 0px 0px 5px rgb(57, 120, 255);
}

.li-day[isToday='true'] {
  background-color: rgb(234, 234, 234);
  box-shadow: 0px 0px 5px rgb(57, 120, 255);
  list-style: none;
  border-radius: 3px;
}

.graph li[data-level='1'] {
  background-color: #d9ecff;
}

.graph li[data-level='2'] {
  background-color: #8cc5ff;
}

.graph li[data-level='3'] {
  background-color: #409eff;
}

.graph li[data-level='4'] {
  background-color: #1c8dfd;
}

.graph li[data-level='5'] {
  background-color: #1068c0;
}

.item {
  margin: 2.5px;
}

.containersss {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>