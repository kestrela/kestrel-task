<template>
    <div :class="props.className" :style="{ height: props.height, width: props.width }" ref="container" />
</template>

<script setup>
import { nextTick, onMounted, reactive, ref ,onBeforeUnmount} from 'vue'
import { getLast3MonthFinishedTasks } from '@/api/index.js'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
const animationDuration = 6000
const props = defineProps({
    className: {
        type: String,
        default: 'chart'
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '220px'
    }
})

const chart = ref(null)
const container = ref(null)

const xData = ref([])
const yData = ref([])
const initChart = () => {
    chart.value = echarts.init(container.value)
    chart.value.setOption({
        title: {
            text: '每日完成任务',
            textStyle: {
                color: '#999',
                fontSize: '14px'
            }
        },
        tooltip: {
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{b}日 任务{c}个',
            backgroundColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: 'red' // start color
                }, {
                    offset: 1, color: 'blue' // end color
                }],
                global: false // false by default
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '14%',
            top: '16%',
            containLabel: true,
            borderRadius: 100 // 设置圆角半径为10
        },
        legend: {
            data: ['1', '昨天登记', '今天登记'],
            right: 10,
            top: 12,
            textStyle: {
                color: '#ccc'
            },
            itemWidth: 12,
            itemHeight: 10
            // itemGap: 35
        },
        xAxis: {
            type: 'category',
            data: xData.value,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                // interval: 0,
                // rotate: 40,
                textStyle: {
                    fontFamily: 'Microsoft YaHei'
                }
            }
        },

        yAxis: {
            type: 'value',
            // max: '50',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#ccc'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#4075ff33'
                }
            },
            axisLabel: {}
        },
        dataZoom: [],
        series: [
            {
                name: '我的待办',
                type: 'bar',
                barWidth: '7px',
                label: {
                    show: true,
                    position: 'top',
                    color: '#4075ffdd'
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#4075ffdd'
                            },
                            {
                                offset: 1,
                                color: '#4075ff02'
                            }
                        ]),
                        barBorderRadius: 6
                    }
                },
                data: yData.value
            }
        ]
    })
}

onMounted(() => {
    getLast3MonthFinishedTasks({}).then(res => {
        if (!res.length) {
            [...Array(100)].forEach((v, w) => {
                const date = dayjs().subtract(100 - w).format('YYYY-MM-DD')
                xData.value.push(date)
                yData.value.push(
                    Math.floor(3 + Math.sin(w) + Math.cos(w))
                )
            })
        } else {
            res.map(item => {
                if (item.num) {
                    xData.value.push(item.date)
                    yData.value.push(item.num)
                }
            })
        }

        initChart()
    })
})
onBeforeUnmount(() => {
    if (!chart.value) {
        return
    }
    chart.value.dispose()
    chart.value = null
})

defineOptions({
    name: 'BarChart'
})
</script>
