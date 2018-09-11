<template>
    <div class="ticket">
        <div class="ticketTop">
            <div class="ticketPrice">
                <div class="typeDataChoose">
                    <el-date-picker
                        v-model="currTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="this.getscenicspotAmountTotal">
                    </el-date-picker>
                    <el-select v-model="totalFlowCurr" class="flowKind">
                        <el-option
                            v-for="item in totalFlowOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="ticketPriceEcharts" id="ticketPriceEcharts">

                </div>
            </div>
            <div class="ticketMarketType">
                <div class="typeDataChoose">
                    <el-date-picker
                        v-model="currTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-select v-model="totalFlowCurr" class="flowKind">
                        <el-option
                            v-for="item in totalFlowOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div id="ticketMarketType">

                </div>

            </div>
            <div class="nearTrend" id="nearTrend">

            </div>
        </div>
        <div class="ticketBottom">
            <div id="analysis">
                <el-table
                    class="mytable"
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="gender"
                        label="性别"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="age"
                        label="年龄"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="IDNum"
                        label="身份证号"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="TicketType"
                        label="门票类型"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="TicketPrice"
                        label="门票价格"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="TheTicketDate"
                        label="购票日期"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="scenicSpot"
                        label="景点"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="fountain"
                        label="客源地"
                        width="200">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "@/api"
    export default {
        name: "ticket",
        data () {
            return {
                datePic: true,
                timeQuantum: false,
                currTime:'',
                totalFlowOption: [
                    {value: '1', label: '每年'},
                    {value: '2', label: '每月'},
                    {value: '3', label: '每周'},
                    {value: '4', label: '每日'}
                ],
                totalFlowCurr:'每周',
                dayData:{
                    dayDataX:["第一天","第二天","第三天","第四天","第五天","第六天","第七天"],
                    dayDataY:[
                        {
                            name: '第一天',
                            value: 0
                        },
                        {
                            name: '第二天',
                            value: 200
                        },
                        {
                            name: '第三天',
                            value: 500
                        },
                        {
                            name: '第四天',
                            value: 300
                        },
                        {
                            name: '第五天',
                            value: 100
                        },
                        {
                            name: '第六天',
                            value: 3000
                        },
                        {
                            name: '第七天',
                            value: 4000
                        }
                    ]

                },
                sellTpeData:[{
                    value: 10,
                    name: '儿童票'
                    },
                    {
                        value: 16,
                        name: '军人票'
                    },
                    {
                        value: 41,
                        name: '成人票'
                    },
                    {
                        value: 33,
                        name: '老人票'
                    }
                ],
                totalFlowData:{
                    data:['9000','17630','13522','14555','11000','16000','8000','12000','20000','10800'],
                    legent:["定山广场","金沙戏水","狮子山","海洋极地公园","窑里坞","老虎洞","东方文化园","石岩山","跨湖楼","下孙文化村"],
                },
                tableData:[
                    {name:'刘瑜',gender:'男',age:'26',IDNum:'610522199205430025',TicketType:'成人票',TicketPrice:'80',TheTicketDate:'2018-09-01',scenicSpot:'湘湖景点',fountain:'陕西西安'},
                    {name:'张大大',gender:'男',age:'29',IDNum:'610422198909610135',TicketType:'成人票',TicketPrice:'120',TheTicketDate:'2018-09-01',scenicSpot:'湘湖景点1',fountain:'陕西咸阳'},
                    {name:'李小小',gender:'女',age:'22',IDNum:'610522199705621158',TicketType:'成人票',TicketPrice:'95',TheTicketDate:'2018-09-01',scenicSpot:'湘湖景点3',fountain:'陕西咸阳'},
                ]
            }
        },
        methods: {
            ticketPriceEchart () {
                let option = {
                    title: {
                        text: "",
                        textStyle: {
                            color: '#fff',
                            fontSize: '22'
                        },
                        subtextStyle: {
                            color: '#90979c',
                            fontSize: '16',

                        },
                    },
                    tooltip: {
                        show: "true",
                        trigger: 'item',
                        padding: [10, 10], //内边距
                    },
                    grid: {
                        borderWidth: 0,
                        top: 50,
                        left:80,
                        right:30,
                        bottom: 30,
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    yAxis: [{
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff',
                            }
                        },
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: '#bac0c0',
                                fontWeight: 'normal',
                                fontSize: '12',
                            },
                        },
                        data: this.totalFlowData.legent,
                    }, {
                        type: 'category',
                        axisLine: {
                            show: true
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        data: this.totalFlowData.legent,
                    }],
                    xAxis: {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#2f3640',
                            }
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#2f3640 ',
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#bac0c0',
                                fontWeight: 'normal',
                                fontSize: '12',
                            }
                        },
                    },
                    series: [{
                        name: '',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                show: true,
                                color:'#06F3FD',
                                barBorderRadius: 50,
                                borderWidth: 0,
                            },
                            emphasis: {
                                shadowBlur: 15,
                                shadowColor: 'rgba(105,123, 214, 0.7)'
                            }
                        },
                        zlevel: 2,
                        barWidth: '20%',
                        data: this.totalFlowData.data,
                    },
                        {
                            name: '',
                            type: 'bar',
                            yAxisIndex: 1,
                            zlevel: 1,
                            itemStyle: {
                                normal: {
                                    color: '#121847',
                                    borderWidth: 0,
                                    shadowBlur: {
                                        shadowColor: 'rgba(255,255,255,0.31)',
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 2,
                                    },
                                }
                            },
                            barWidth: '20%'
                        }
                    ]
                }
                var dom = document.getElementById('ticketPriceEcharts')
                var myChart = this.$echarts.init(dom)
                myChart.resize()
                myChart.setOption(option, true)
            },
            ticketMarketTypeEchart () {
                let option = {
                    color: ['#FE0404', '#dcd11d', '#FBA200', '#00CEFF'],
                    tooltip: {
                        show: false
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: ['30%', '45%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                formatter: '{b|{b}} {c|{c}} %',
                                color: '#fff',
                                rich: {
                                    b: {
                                        color: '#fff'
                                    },
                                    c: {
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                lineStyle: {
                                    color: '#274862'
                                },
                                length: 45
                            }
                        },
                        data: this.sellTpeData, z: 5
                    },
                        {
                            type: 'pie',
                            radius: '60%',
                            data: [{
                                value: 430,
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(0,0,0,0)',
                                        borderColor: 'rgba(0,0,0,0)'
                                    }
                                }
                            }],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            z: 5,
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    position: 'center',
                                    formatter: '合计收入{c|{c}}万',
                                    color: '#fff',
                                    rich: {
                                        c: {
                                            fontWeight: 'bold',
                                            color: '#fff',
                                            fontSize: 20
                                        },
                                        text: {
                                            color: '#5B7DA3'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            type: 'pie',
                            radius: '60%',
                            data: [{
                                value: 430,
                                itemStyle: {
                                    normal: {
                                        borderWidth: 2,
                                        color: 'rgba(0,0,0,0)',
                                        borderColor: '#202D3C'
                                    }
                                }
                            }],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            z: 1,
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    show: false
                                }
                            }
                        },
                        {
                            name: 'x',
                            type: 'pie',
                            radius: ['0', '10%'],
                            data: [{
                                value: 1,
                                itemStyle: {
                                    normal: {
                                        color: '#243443',
                                        shadowBlur: 50,
                                        shadowColor: '#202E3B'
                                    },
                                    emphasis: {
                                        color: '#243443',
                                        shadowBlur: 50,
                                        shadowColor: '#202E3B'
                                    }
                                }
                            }],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            z: 2,
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        },
                        {
                            name: 'x',
                            type: 'pie',
                            radius: ['10%', '20%'],
                            data: [{
                                value: 1,
                                itemStyle: {
                                    normal: {
                                        color: '#202E3B',
                                        shadowBlur: 50,
                                        shadowColor: '#1C2834'
                                    },
                                    emphasis: {
                                        color: '#202E3B',
                                        shadowBlur: 50,
                                        shadowColor: '#1C2834'
                                    }
                                }
                            }],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            z: 2,
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        },
                        {
                            name: 'x',
                            type: 'pie',
                            radius: ['20%', '30%'],
                            data: [{
                                value: 1,
                                itemStyle: {
                                    normal: {
                                        color: '#1C2834',
                                        shadowBlur: 50,
                                        shadowColor: '#1b1e25'
                                    },
                                    emphasis: {
                                        color: '#1C2834',
                                        shadowBlur: 50,
                                        shadowColor: '#1b1e25'
                                    }
                                }
                            }],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            z: 2,
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        },
                        {
                            name: 'x',
                            type: 'pie',
                            radius: ['45%', '55%'],
                            data: [{
                                value: 1,
                                itemStyle: {
                                    normal: {
                                        color: '#111A27',
                                        shadowBlur: 50,
                                        shadowColor: '#1b1e25'
                                    },
                                    emphasis: {
                                        color: '#111A27',
                                        shadowBlur: 50,
                                        shadowColor: '#1b1e25'
                                    }
                                }
                            }],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            z: 2,
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        },
                        {
                            name: 'x',
                            type: 'pie',
                            radius: ['45%', '50%'],
                            data: [{
                                value: 1,
                                itemStyle: {
                                    normal: {
                                        color: '#111A27',
                                        shadowBlur: 50,
                                        shadowColor: '#1b1e25'
                                    },
                                    emphasis: {
                                        color: '#111A27',
                                        shadowBlur: 50,
                                        shadowColor: '#1b1e25'
                                    }
                                }
                            }],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            z: 2,
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        },
                        {
                            name: 'x',
                            type: 'pie',
                            radius: ['50%', '60%'],
                            itemStyle: {
                                normal: {
                                    color: '#0C141C',
                                    shadowBlur: 50,
                                    shadowColor: '#1b1e25'
                                },
                                emphasis: {
                                    color: '#0C141C',
                                    shadowBlur: 50,
                                    shadowColor: '#1b1e25'
                                }
                            },
                            data: [{
                                value: 1
                            }],
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            z: 2,
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }
                    ]
                };
                var dom = document.getElementById('ticketMarketType')
                var myChart = this.$echarts.init(dom)
                myChart.resize()
                myChart.setOption(option, true)
            },
            nearTrendEchart () {
                let myMap = this.$echarts.init(document.getElementById('nearTrend'))
                myMap.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#00c7ff'
                            }
                        },
                        data: this.dayData.dayDataX
                    }],
                    yAxis: [{
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#00c7ff'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        name: '增长数',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color:'#0594af',
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(137,189,27)',
                                borderColor: 'rgba(137,189,2,0.27)',
                                borderWidth: 12

                            }
                        },
                        data: this.dayData.dayDataY
                    }]
                })
            },
            getscenicspotAmountTotal () {
                if( this.currTime[0] !== undefined || this.currTime[1] !== undefined ){
                    api.ticketingAnalysis.scenicspotAmountTotal(this.currTime[0],this.currTime[1],'').then(res => {
                        console.log(res)
                    })
                }
            }
        },
        async mounted () {
            await this.getscenicspotAmountTotal()
            this.ticketPriceEchart()
            this.ticketMarketTypeEchart()
            this.nearTrendEchart()
        }
    }
</script>

<style lang="scss" type="text/scss" >
    .ticket{
        .el-select{
            width: 70px;
            display: flex;
            .el-input{
                .el-input__inner{
                    background: none;
                    border: none;
                    border-bottom: 1px solid #ffca19;
                    color:#01f5ff;
                    padding: 0;
                    border-radius: 0;
                }
                .el-input__suffix{
                    width: 30px;
                    .el-input__icon{
                        height: 40px;
                        color: #01f5ff;
                    }
                }

            }
        }
        .el-select-dropdown{
            background-color: red;
            border: none;
        }
        .el-date-editor{
            width: 250px;
        }
        .el-input__inner{
            background:none;
            border: none;
            .el-range__icon{
                color: #01f5ff;
            }
            .el-range-input{
                background:none;
                color: #01f5ff;
            }
            .el-range-separator{
                color: #01f5ff;
            }
        }
        .ticketBottom {
            #analysis {
                .mytable {
                    th {
                        background-color: #013c4f;
                        color: #fff;
                        border: none;
                    }
                    td {
                        background-color: #031328;
                        color: #02b1c7;
                        border: none;
                    }
                    .el-button {
                        border: none;
                    }
                }
            }
        }
        .el-table{
            color: #01e2ff;
            background: transparent;
        }
        .el-table thead{
            color: #fff;
        }

        .el-table th,.el-table tr{
            background-color: transparent;
        }
        .el-table thead tr{
            background-color: #03243d;
        }
        .el-table td, .el-table th.is-leaf{
            border-bottom: 1px solid transparent;
        }
        .el-table td{
            border-color: transparent;
        }
        .el-table--striped .el-table__body tr.el-table__row--striped td{
            background: #032337;
        }
        .el-table--border::after, .el-table--group::after, .el-table::before{
            background-color: transparent;
        }
    }
</style>
<style lang="scss" type="text/scss" scoped>
   .ticket{
       width:100%;
       height: 100%;
       .ticketTop{
           width: 100%;
           height: 400px;
           display: flex;
           justify-content: space-between;
           .ticketPrice{
               width: 33%;
               height: 100%;
               position:relative;
               border: 1px solid #01f5ff;
               .ticketPriceEcharts{
                   height: 100%;
               }
               .typeDataChoose{
                   position: absolute;
                   z-index: 10;
                   width: 300px;
                   height: 100px;
                   top: 0;
                   right: 0;
                   display: flex;
                   .flowKind{
                       position: absolute;
                       top: 0px;
                       right: 10px;
                   }
               }
           }
           .ticketPrice::before{
               content: '各景区门票收入统计';
               position: absolute;
               width: 200px;
               color: #01f5ff;
               padding: 8px 10px;
               background:url("./../../../static/img/corner.png") no-repeat;
           }
           .ticketMarketType{
               width: 33%;
               height: 100%;
               position:relative;
               border: 1px solid #01f5ff;
               .typeDataChoose{
                   position: absolute;
                   z-index: 10;
                   width: 300px;
                   height: 100px;
                   top: 0;
                   right: 0;
                   display: flex;
                   .flowKind{
                       position: absolute;
                       top: 0px;
                       right: 10px;
                   }
               }
               #ticketMarketType{
                   width: 100%;
                   height: 100%;
               }
           }
           .ticketMarketType::before{
               content: '门票销售类型统计';
               position: absolute;
               width: 200px;
               color: #01f5ff;
               padding: 8px 10px;
               background:url("./../../../static/img/corner.png") no-repeat;
           }
           .nearTrend{
               width: 33%;
               height: 100%;
               position:relative;
               border: 1px solid #01f5ff;
           }
           .nearTrend::before{
               content: '最近七天票务趋势';
               position: absolute;
               width: 200px;
               color: #01f5ff;
               padding: 8px 10px;
               background:url("./../../../static/img/corner.png") no-repeat;
           }
       }
       .ticketBottom{
           box-sizing: border-box;
           width: 100%;
           height: 346px;
           border: 1px solid #01f5ff;
           margin-top: 20px;
           position: relative;
           #analysis{
               height: 280px;
               margin-top: 50px;
               position: absolute;
               left: 50%;
               transform: translate( -50%,0);
           }
       }
       .ticketBottom::before{
           content: '票务数据分析';
           position: absolute;
           width: 200px;
           color: #01f5ff;
           padding: 8px 10px;
           background:url("./../../../static/img/corner.png") no-repeat;

       }
   }
</style>
