const T = {
    color: ['#409EFF', '#36CE9E', '#f56e6a', '#626c91', '#edb00d', '#909399'], // 颜色数组
    grid: { // 网格
        left: '3%', // 左边距
        right: '3%', // 右边距
        bottom: '10', // 下边距
        top: '40', // 上边距
        containLabel: true // 包含标签
    },
    legend: { // 图例
        textStyle: { // 文本样式
            color: '#999' // 颜色
        },
        inactiveColor: 'rgba(128,128,128,0.4)' // 不活跃颜色
    },
    categoryAxis: { // 类别轴
        axisLine: { // 轴线
            show: true, // 显示
            lineStyle: { // 线条样式
                color: 'rgba(128,128,128,0.2)', // 颜色
                width: 1 // 宽度
            }
        },
        axisTick: { // 刻度线
            show: false, // 不显示
            lineStyle: { // 线条样式
                color: '#000' // 颜色
            }
        },
        axisLabel: { // 轴标签
            color: '#999' // 颜色
        },
        splitLine: { // 分隔线
            show: false, // 不显示
            lineStyle: { // 线条样式
                color: ['#eee'] // 颜色
            }
        },
        splitArea: { // 分隔区域
            show: false, // 不显示
            areaStyle: { // 区域样式
                color: ['rgba(255,255,255,0.01)', 'rgba(0,0,0,0.01)'] // 颜色
            }
        }
    },
    valueAxis: { // 数值轴
        axisLine: { // 轴线
            show: false, // 不显示
            lineStyle: { // 线条样式
                color: '#999' // 颜色
            }
        },
        splitLine: { // 分隔线
            show: true, // 显示
            lineStyle: { // 线条样式
                color: 'rgba(128,128,128,0.2)' // 颜色
            }
        }
    }
}

export default T
