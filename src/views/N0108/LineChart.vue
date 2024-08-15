<template>
  <Charts v-if="visible" height="200px" :option="option"></Charts>
</template>

<script setup>
import Charts from '@/components/Charts.vue'
import { onMounted, watch, ref } from 'vue'
const props = defineProps({
  detail: {
    type: Array,
    default: () => [],
  },
})

let visible = ref(false)

const option = ref({})
const setOption = (xData, yData) => {
  option.value = {
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    series: [
      {
        data: yData,
        type: 'bar',
      },
    ],
  }
}

watch(
  () => props.detail,
  (v) => {
    if (v && v.length) {
      let rowData = v
      let xData = []
      let yData = []
      rowData.forEach((d) => {
        xData.push(d.date)
        yData.push(d.num)
      })
      setOption(xData, yData)
      visible.value = true
    }
  },
  { deep: true }
)
</script>