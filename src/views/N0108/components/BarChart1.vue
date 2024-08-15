<template>
  <div
    :class="props.className"
    :style="{ height: props.height, width: props.width }"
    ref="container1"
  />
</template>

<script setup>
import { nextTick, onMounted, reactive, ref ,onBeforeUnmount} from 'vue'
import { getLast3MonthTasks } from '@/api/index.js'
import * as echarts from 'echarts'
const animationDuration = 6000
import dayjs from 'dayjs'
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
        default: '300px'
    }
})

const chart = ref(null)
const container1 = ref(null)

const xData = ref([])
const yData = ref([])
const initChart = () => {
    chart.value = echarts.init(container1.value)
    chart.value.setOption({
        title: {
            text: '每日新增任务',
            textStyle: {
                color: '#999',
                fontSize: '14px'
            }
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'transparent',
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(126,199,255,0)' // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: '#008c8e' // 100% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(126,199,255,0)' // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    }
                }
            }
        },
        legend: {
            align: 'left',
            right: '10%',
            top: '10%',
            type: 'plain',
            textStyle: {
                color: '#008c8e99',
                fontSize: 16
            },
            // icon:'rect',
            itemGap: 25,
            itemWidth: 18,
            icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',

            data: []
        },
        grid: {
            left: '4%',
            right: '4%',
            bottom: '14%',
            top: '16%'
            // containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    // 坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisLabel: {
                    // 坐标轴刻度标签的相关设置
                    textStyle: {
                        color: '#ccc',
                        padding: 16,
                        fontSize: 12
                    },
                    formatter: function(data) {
                        return data
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#4075ffdd'
                    }
                },
                axisTick: {
                    show: false
                },
                data: xData.value
            }
        ],
        yAxis: [
            {
                name: '',
                nameTextStyle: {
                    color: '#4075ffdd',
                    fontSize: 16,
                    padding: 10
                },
                min: 0,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#4075ff41'
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#ccc',
                        padding: 16
                    },
                    formatter: function(value) {
                        if (value === 0) {
                            return value
                        }
                        return value
                    }
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'line',
                symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
                showAllSymbol: true,
                symbolSize: 0,
                smooth: true,
                label: {
                    show: true,
                    position: 'top',
                    color: '#4075ff'
                },
                lineStyle: {
                    normal: {
                        width: 1,
                        color: '#4075ff' // 线条颜色
                    },
                    borderColor: 'rgba(0,0,0,.4)'
                },
                itemStyle: {
                    color: '#4075ff',
                    borderColor: '#4075ff',
                    borderWidth: 2
                },
                tooltip: {
                    show: true
                },
                areaStyle: {
                    // 区域填充样式
                    normal: {
                        // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: '#4075ff33'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(25,163,223, 0)'
                                }
                            ],
                            false
                        ),
                        shadowColor: '#4075ff77', // 阴影颜色
                        shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    }
                },
                data: yData.value
            }
        ]
    })
}

onMounted(() => {
    getLast3MonthTasks({}).then((res) => {
        if (!res.length) {
            [...Array(100)].forEach((v, w) => {
                const date = dayjs()
                    .subtract(100 - w)
                    .format('YYYY-MM-DD')
                xData.value.push(date)
                yData.value.push(
                    Math.floor(Math.tan(w) + 3 + Math.sin(w) + Math.cos(w + 3.24))
                )
            })
        } else {
            res.map((item) => {
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
</script>
