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
const setOption = (xData, dataC1,zData) => {
  option.value = option.value = {
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: dataC1,
      type: 'line'
    },
    {
      type: 'lines',
      coordinateSystem: 'cartesian2d',
      symbolSize: 10,
      polyline: true,
      effect: {
        show: true,
        smooth: false,
        trailLength: 0,
        symbol: "pin",
        color: '#8cc5ff',
        symbolSize: 20
      },
      lineStyle: {
        normal: {
          width: 1,
          opacity: 0.6,
          curveness: 0.2
        }
      },
      data: [{
        coords: zData
      }]
    },
    ]
  }
}

watch(
  () => props.detail,
  (v) => {
    if (v && v.length) {
      let rowData = v
      let xData = []
      let yData = []
      let zData = []
      rowData.forEach((d) => {
        xData.push(d.date)
        yData.push(d.num)
        zData.push([d.key,d.number])
      })
      setOption(xData, yData,zData)
      visible.value = true
    }
  },
  { deep: true }
)
</script>