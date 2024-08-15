import * as echarts from 'echarts';
export const option2 = {
    angleAxis: {
        max: 100,
        show: false,
    },
    title: {
        text: "完成率",
        left: "center",
        top: "center",
        textStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: "#fff"
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{c}%'
    },
    graphic: { //图形中间文字
        type: "text",
        left: "center",
        top: "57%",
        style: {
            text: "2",
            textAlign: "center",
            fill: "#fff",
            fontSize: 14,
            fontWeight: 'bold',
        }
    },
    radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
            show: false,
        },
        axisLine: {
            show: false,

        },
        axisTick: {
            show: false
        },
    },
    polar: {
        radius: ['50%', '65%'],
        center: ['50%', '50%'],
    },
    series: [{
        type: 'bar',
        roundCap: true, //设置圆角
        barWidth: 80,
        showBackground: true,
        backgroundStyle: {
            color: "rgba(19, 48, 80,.8)"
        },
        itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: 'rgb(0, 169, 246)'
                }, {
                    offset: 1,
                    color: 'rgb(0, 106, 221)'
                }]),
            }
        },
        data: [{
            value: 90,

        }, ],
        coordinateSystem: 'polar',
        name: 'A',
        label: {
            show: false,
            position: "top",
            formatter: (p) => {
                return "aaaaaaaaaa"
            },
            color: "red"
        },

    }],
};


export const option3 = {
    backgroundColor: "#fff",
    title: {
        text: "任务计划",
        padding: 20,
        textStyle: {
            fontSize: 14,
            fontWeight: "bolder",
            color: "#000"
        },
        subtextStyle: {
            fontSize: 12,
            fontWeight: "bolder"
        }
    },
    legend: {
        data: ["计划工期", "可行性研究阶段", "初步设计阶段", "施工图设计阶段", "项目实施阶段",  "项目验收阶段"],
        align: "left",
        left: 80,
        top: 50
    },
    grid: {
        containLabel: true,
        show: false,
        right: 30,
        left: 10,
        bottom: 40,
        top:60
    },
    xAxis: {
        type: "time",
        axisLabel: {
            "show": true,
            "interval": 0
        }
    },
dataZoom: [{
        show: true,
        height: 20,
        xAxisIndex: [0],
        bottom: 0,
        
        "start": 10,
        "end": 80,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle: {
            color: "#5B3AAE",
        },
        textStyle:{
            color:"rgba(204,187,225,0.5)",
        },
        fillerColor:"rgba(67,55,160,0.4)",
        borderColor: "rgba(204,187,225,0.5)",

    }, {
        type: "inside",
        show: true,
        height: 15,
        start: 1,
        end: 35
    }],
    yAxis: {
        axisLabel: {
            show: true,
            interval: 0,
            formatter: function(value, index) {
                var last = ""
                var max = 10;
                var len = value.length;
                var hang = Math.ceil(len / max);
                if (hang > 1) {
                    for (var i = 0; i < hang; i++) {
                        var start = i * max;
                        var end = start + max;
                        var temp = value.substring(start, end) + "\n";
                        last += temp; //凭借最终的字符串
                    }
                    return last;
                } else {
                    return value;
                }
            }
        },
        data: ["左侧行数待定"]
    },
tooltip:{
       formatter: `<div style="width: 295px; overflow:hidden;">
  <div style="clear:both; width:100%; height:28px;background:rgba(0, 0, 0, 0.9);line-height:28px; font-size: 14px">
    <span style="margin-left: 16px;">2021-04-15</span>
    <span style="float:right; margin-right: 16px;"></span>
  </div>
  <div style="clear:both;padding: 8px 0;width:100%;background:rgba(0, 0, 0, 0.5);">
    
        <div style="margin:0 16px; width: '100%'; height: '24px';">
          <span style="width: 16px; height: '100%';">
              <svg width="14px" height="12px">
              <defs>
                <linearGradient id="gradient0" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="100%" style="stop-color:#45f5c8;stop-opacity:1"/>
                  <stop offset="0%" style="stop-color:#0bcf7a;stop-opacity:1"/>
                </linearGradient>
              </defs>
                <path d="M1.19694305,10.2914863 C1.62719581,9.6590509 2.83321045,7.508 5.54070823,7.508 C9.27692772,7.508 9.81611087,11.5149889 12,11.5149889 C14.1729711,11.5149889 14.9116706,9.96232504 15.4626329,9.05118966 C15.7427236,8.58799897 16.2639001,8.09885094 16.7238845,8.36336852 C17.0305408,8.53971357 17.1051866,8.85391264 16.9478219,9.30596572 C15.8593971,11.818637 14.2101231,13.0749726 12,13.0749726 C8.9488875,13.0749726 8.30660169,9.05118966 5.54070823,9.05118966 C3.53913493,9.05118966 2.59630684,11.0033242 2.3432282,11.2591566 C2.09014956,11.5149889 1.71887157,12.0143782 1.19694305,11.7646836 C0.675014537,11.5149889 0.856059445,10.7925565 1.19694305,10.2914863 Z" style="fill:url(#gradient0)" transform="scale(0.8, 0.8)" />
              </svg>
            </span>
          <span style="line-height: 24px; font-size: 12px">项目实施阶段<br></span>
          <span style="line-height: 24px; font-size: 12px">主责部门：工程部 </span>
          <span style="float:right; line-height: 24px; font-size: 12px">百分比：40%，进度正常</span>
        </div>
      
  </div>
</div>`
    },
    series: [{
            name: "计划工期",
            type: "bar",
            stack: "总量0",
            label: {
                normal: {
                    show: true,
                    color: "#000",
                    position: "right",
                    formatter: function(params) {
                        return params.seriesName
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: "skyblue",
                    borderColor: "#fff",
                    borderWidth: 2
                }
            },
            zlevel: -1,
            data: [
                new Date("2021-05-01")]
        },
        {
            name: "计划工期",
            type: "bar",
            stack: "总量0",
            itemStyle: {
                normal: {
                    color: "white",
                }
            },
            zlevel: -1,
            z: 3,
            data: [
                new Date("2021-04-15")]
        },
        {
            name: "可行性研究阶段",
            type: "bar",
            stack: "总量1",
            label: {
                normal: {
                    show: true,
                    color: "#000",
                    position: "right",
                    formatter: function(params) {
                        return params.seriesName
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: "green",
                    borderColor: "#fff",
                    borderWidth: 2
                }
            },
            zlevel: -1,
            data: [
                new Date("2021-03-30")]
        },
        {
            name: "可行性研究阶段",
            type: "bar",
            stack: "总量1",
            itemStyle: {
                normal: {
                    color: "white",
                }
            },
            zlevel: -1,
            z: 3,
            data: [
                new Date("2021-03-16")]
        },
        {
            name: "初步设计阶段",
            type: "bar",
            stack: "总量3",
            label: {
                normal: {
                    show: true,
                    color: "#000",
                    position: "right",
                    formatter: function(params) {
                        return params.seriesName
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: "red",
                    borderColor: "#fff",
                    borderWidth: 2
                }
            },
            zlevel: -1,
            data: [
                new Date("2021-04-10")]
        },
        {
            name: "初步设计阶段",
            type: "bar",
            stack: "总量3",
            itemStyle: {
                normal: {
                    color: "white"
                }
            },
            zlevel: -1,
            z: 3,
            data: [
                new Date("2021-04-01")]
        },
        {
            name: "施工图设计阶段",
            type: "bar",
            stack: "总量4",
            label: {
                normal: {
                    show: true,
                    color: "#000",
                    position: "right",
                    formatter: function(params) {
                        return params.seriesName
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: "brown",
                    borderColor: "#fff",
                    borderWidth: 2
                }
            },
            zlevel: -1,
            data: [
                new Date("2021-04-20")]
        },
        {
            name: "施工图设计阶段",
            type: "bar",
            stack: "总量4",
            itemStyle: {
                normal: {
                    color: "white",
                }
            },
            zlevel: -1,
            z: 3,
            data: [
                new Date("2021-04-11")]
        },
        {
            name: "项目实施阶段",
            type: "bar",
            stack: "总量5",
            label: {
                normal: {
                    show: true,
                    color: "#000",
                    position: "right",
                    formatter: function(params) {
                        return params.seriesName
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: "yellow",
                    borderColor: "#fff",
                    borderWidth: 2
                }
            },
            zlevel: -1,
            data: [
                new Date("2021-04-30")]
        },
        {
            name: "项目实施阶段",
            type: "bar",
            stack: "总量5",
            itemStyle: {
                normal: {
                    color: "white",
                }
            },
            zlevel: -1,
            z: 3,
            data: [
                new Date("2021-04-21")]
        },
        
        
        {
            name: "可行性研究阶段2",
            type: "bar",
            stack: "总量2",
            label: {
                normal: {
                    show: true,
                    color: "#000",
                    position: "right",
                    formatter: function(params) {
                        return params.seriesName
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: "green",
                    borderColor: "#fff",
                    borderWidth: 2
                }
            },
            zlevel: -1,
            data: [
                new Date("2021-04-30")]
        },
        {
            name: "可行性研究阶段2",
            type: "bar",
            stack: "总量2",
            itemStyle: {
                normal: {
                    color: "white",
                }
            },
            zlevel: -1,
            z: 3,
            data: [
                new Date("2021-04-16")]
        },
        
        {name: "全套施工图",type: "bar",stack: "总量21",label: {normal: {show: true,color: "#000",position: "right",formatter: function(params) {return params.seriesName}}},
        	itemStyle: { normal: {color: 'red',borderColor: "#fff",borderWidth: 2}}, zlevel: -1,
            data: [new Date("2021-03-21")]},
        {name: "全套施工图",type: "bar",stack: "总量21",itemStyle: {normal: {color: 'white',}},zlevel: -1,z: 3,
            data: [ new Date("2021-03-12")]},

        {name: "主体封顶",type: "bar",stack: "总量22",label: {normal: {show: true,color: "#000",position: "right",formatter: function(params) {return params.seriesName}}},
        	itemStyle: { normal: {color: 'green',borderColor: "#fff",borderWidth: 2}}, zlevel: -1,
            data: [new Date("2021-03-30")]},
        {name: "主体封顶",type: "bar",stack: "总量22",itemStyle: {normal: {color: 'white',}},zlevel: -1,z: 3,
            data: [ new Date("2021-03-22")]},

        {name: "外架拆除",type: "bar",stack: "总量21",label: {normal: {show: true,color: "#000",position: "right",formatter: function(params) {return params.seriesName}}},
        	itemStyle: { normal: {color: 'brown',borderColor: "#fff",borderWidth: 2}}, zlevel: -1,
            data: [new Date("2021-04-20")]},
        {name: "外架拆除",type: "bar",stack: "总量21",itemStyle: {normal: {color: 'white',}},zlevel: -1,z: 3,
            data: [ new Date("2021-04-12")]},

  
        {
            name: "初步设计阶段2",
            type: "bar",
            stack: "总量3",
            label: {
                normal: {
                    show: true,
                    color: "#000",
                    position: "right",
                    formatter: function(params) {
                        return params.seriesName
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: "red",
                    borderColor: "#fff",
                    borderWidth: 2
                }
            },
            zlevel: -1,
            data: [
                new Date("2021-04-10")]
        },
        {
            name: "初步设计阶段2",
            type: "bar",
            stack: "总量3",
            itemStyle: {
                normal: {
                    color: "white"
                }
            },
            zlevel: -1,
            z: 3,
            data: [
                new Date("2021-04-01")]
        },
        {
            name: "土方开挖完成",type: "bar",stack: "总量18",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'red',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-03-16")]},
        {
            name: "土方开挖完成",type: "bar",stack: "总量18",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-03-12")]
        },
        {
            name: "施工图设计阶段2",
            type: "bar",
            stack: "总量4",
            label: {
                normal: {
                    show: true,
                    color: "#000",
                    position: "right",
                    formatter: function(params) {
                        return params.seriesName
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: "brown",
                    borderColor: "#fff",
                    borderWidth: 2
                }
            },
            zlevel: -1,
            data: [
                new Date("2021-04-20")]
        },
        {
            name: "施工图设计阶段2",
            type: "bar",
            stack: "总量4",
            itemStyle: {
                normal: {
                    color: "white",
                }
            },
            zlevel: -1,
            z: 3,
            data: [
                new Date("2021-04-11")]
        },
        {
            name: "项目实施阶段2",
            type: "bar",
            stack: "总量6",
            label: {
                normal: {
                    show: true,
                    color: "#000",
                    position: "right",
                    formatter: function(params) {
                        return params.seriesName
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: "yellow",
                    borderColor: "#fff",
                    borderWidth: 2
                }
            },
            zlevel: -1,
            data: [
                new Date("2021-04-30")]
        },
        {
            name: "项目实施阶段2",
            type: "bar",
            stack: "总量6",
            itemStyle: {
                normal: {
                    color: "white",
                }
            },
            zlevel: -1,
            z: 3,
            data: [
                new Date("2021-04-21")]
        },
        
        {
            name: "项目验收阶段",type: "bar",stack: "总量7",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'orange',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-05-01")]},
        {
            name: "项目验收阶段",type: "bar",stack: "总量7",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-04-30")]
        },
        
        {
            name: "交房",type: "bar",stack: "总量8",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'orange',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-05-07")]},
        {
            name: "交房",type: "bar",stack: "总量8",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-05-01")]
        },
        
        {
            name: "交房",type: "bar",stack: "总量9",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'orange',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-05-10")]},
        {
            name: "交房",type: "bar",stack: "总量9",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-05-07")]
        },
        
        {
            name: "交房",type: "bar",stack: "总量10",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'orange',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-05-17")]},
        {
            name: "交房",type: "bar",stack: "总量10",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-05-10")]
        },
        
        {
            name: "交房",type: "bar",stack: "总量11",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'green',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-05-19")]},
        {
            name: "交房",type: "bar",stack: "总量11",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-05-17")]
        },
        
        {
            name: "交房",type: "bar",stack: "总量12",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'orange',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-05-27")]},
        {
            name: "交房",type: "bar",stack: "总量12",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-05-11")]
        },
        
        
        {name: "取得预售许可证",type: "bar",stack: "总量19",label: {
            normal: {show: true,color: "#000",position: "right",formatter: function(params) {return params.seriesName}}},
            itemStyle: { normal: {color: 'red',borderColor: "#fff",borderWidth: 2}}, zlevel: -1,
            data: [new Date("2021-05-20")]},
        {name: "取得预售许可证",type: "bar",stack: "总量19",itemStyle: {normal: {color: 'white',}},zlevel: -1,z: 3,
            data: [ new Date("2021-05-10")]},
            
        {name: "施工证获取",type: "bar",stack: "总量20",label: {
            normal: {show: true,color: "#000",position: "right",formatter: function(params) {return params.seriesName}}},
            itemStyle: { normal: {color: 'red',borderColor: "#fff",borderWidth: 2}}, zlevel: -1,
            data: [new Date("2021-05-21")]},
        {name: "施工证获取",type: "bar",stack: "总量20",itemStyle: {normal: {color: 'white',}},zlevel: -1,z: 3,
            data: [ new Date("2021-05-11")]},
            
        {
            name: "交房",type: "bar",stack: "总量13",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'orange',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-05-27")]},
        {
            name: "交房",type: "bar",stack: "总量13",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-05-20")]
        },
        
        {
            name: "交房",type: "bar",stack: "总量14",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'green',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-05-30")]},
        {
            name: "交房",type: "bar",stack: "总量14",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-05-01")]
        },
        
        {
            name: "交房111",type: "bar",stack: "总量17",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'black',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-03-30")]},
        {
            name: "交房111",type: "bar",stack: "总量17",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-03-28")]
        },
        
        {
            name: "交房",type: "bar",stack: "总量15",label: {
                normal: {
                    show: true,color: "#000",position: "right",
                    formatter: function(params) {
                        return params.seriesName}}},
            itemStyle: {
                normal: {
                    color: 'orange',borderColor: "#fff",borderWidth: 2}},
            zlevel: -1,
            data: [new Date("2021-04-10")]},
        {
            name: "交房",type: "bar",stack: "总量15",itemStyle: {
                normal: {color: 'white',}
            },
            zlevel: -1,
            z: 3,
            data: [ new Date("2021-04-01")]
        },
        
        {name: "交房",type: "bar",stack: "总量16",label: {
            normal: {show: true,color: "#000",position: "right",formatter: function(params) {return params.seriesName}}},
            itemStyle: { normal: {color: 'red',borderColor: "#fff",borderWidth: 2}}, zlevel: -1,
            data: [new Date("2021-05-16")]},
        {name: "交房",type: "bar",stack: "总量16",itemStyle: {normal: {color: 'white',}},zlevel: -1,z: 3,
            data: [ new Date("2021-05-12")]},
            
            
    ]
}



let areaData = [
    {
        name: '闯红灯',
        max: 1000,
        value: 350,
    },
    {
        name: '逆行',
        max: 1000,
        value: 500,
    },
    {
        name: '占用机动车道',
        max: 1000,
        value: 200,
    },
    {
        name: '超载',
        max: 1000,
        value: 250,
    },
    {
        name: '未戴安全头盔',
        max: 1000,
        value: 500,
    },
    {
        name: '加装伞具',
        max: 1000,
        value: 702,
    },
];
let data = [];
areaData.forEach((item) => {
    data.push(item.value);
});
let maxNum = Math.max(...data); //获取数组中最大的值
// 向上取整十，整百，整千，整万的方法
function ceilNumber(number) {
    let bite = 0;
    if (number < 10) {
        return 10;
    }
    while (number >= 10) {
        number /= 10;
        bite += 1;
    }
    return Math.ceil(number) * Math.pow(10, bite);
}
let allMax = ceilNumber(maxNum); //将最大的值进行向上取整
areaData.forEach((item) => {
    item.max = allMax;
});
let data1 = [0, 0, 0, 0, 0, 0];
let data2 = [0, 0, 0, 0, 0, 0];
let data3 = [0, 0, 0, 0, 0, 0];
let data4 = [0, 0, 0, 0, 0, 0];
let data5 = [0, 0, 0, 0, 0, 0];
let data6 = [0, 0, 0, 0, 0, 0];
data1[0] = data[0];
data2[1] = data[1];
data3[2] = data[2];
data4[3] = data[3];
data5[4] = data[4];
data6[5] = data[5];


export const option6 = {
    color: ['#2E64FF', '#F0D418', '#FF9B42', '#FF6B6B', '#8E42FF', '#00e4ff'],
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            return params.name + ': ' + params.value + '辆';
        },
    },
    radar: {
        zlevel: 11,
        shape: 'circle',
        scale: true,
        indicator: areaData,
        center: ['50%', '50%'],
        radius: '40%',
        nameGap: '0',
        startAngle: 90,
        name: {
            show: false,
            color: 'red',
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(32,126,255, .5)',
            },
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(32,126,255, .5)',
            },
        },
        splitArea: {
            areaStyle: {
                color: 'rgba(32,126,255, 0.1)',
            },
        },
    },
    polar: {
        radius: '40%',
    },
    angleAxis: {
        zlevel: 0,
        min: 0,
        max: 360,
        axisLabel: {
            show: false,
        },
        splitLine: {
            show: false,
        },
    },
    radiusAxis: {
        zlevel: 0,
        min: 0,
        max: allMax,
        axisLabel: {
            textStyle: {
                color: 'rgba(29,208,240,.5)',
            },
        },
        splitLine: {
            show: false,
        },
    },
    series: [
        {
            type: 'radar',
            symbolSize: 12,
            symbol: 'circle',
            tooltip: {
                trigger: 'none',
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        formatter: function (params) {
                            if (params.value !== 0) {
                                return params.value + '辆';
                            } else {
                                return '';
                            }
                        },
                        color: '#ffffff',
                        fontSize: 12,
                        distance: 0,
                    },
                },
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(32,126,255, 0.5)', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(32,126,255, 0.1)', // 100% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    },
                },
            },
            data: [
                {
                    value: data,
                },
                {
                    value: data1,
                    itemStyle: {
                        color: '#2e64ff',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: data2,
                    itemStyle: {
                        color: '#f0d418',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: data3,
                    itemStyle: {
                        color: '#ff9b42',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: data4,
                    itemStyle: {
                        color: '#ff6b6b',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: data5,
                    itemStyle: {
                        color: '#8e42ff',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: data6,
                    itemStyle: {
                        color: '#00e4ff',
                    },
                    lineStyle: {
                        color: 'transparent', //设置折线的颜色
                    },
                },
                {
                    value: [0, 0, 0, 0, 0, 0],
                    // name: '违章占比',
                    symbolSize: 13,
                    itemStyle: {
                        color: 'rgba(40, 97, 132)',
                    },
                },
            ],
            zlevel: 20,
            z: 4,
        },
        {
            type: 'pie',
            startAngle: 90,
            clockwise: false, //逆时针
            data: areaData.map((item) => {
                return {
                    name: item.name,
                    value: item.value,
                };
            }),
            radius: ['45%', '60%'],
            zlevel: -1,
            label: {
                normal: {
                    formatter: '{d}%',
                    position: 'top',
                    fontSize: '24',
                    color: '#fff',
                },
            },
        },
    ],
};