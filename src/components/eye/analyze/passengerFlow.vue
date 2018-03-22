<template>
    <!--<div id="passenger-Flow">-->
        <!--<div id="passengerF-Top">-->
            <!--<p>客流分析</p>-->
            <!--<p>图标配置</p>-->
        <!--</div>-->
        <!--<div id="passengerF-Content">-->
            <!--<div :style="{width:data[0].width,height:data[0].height,left:data[0].left,top:data[0].top}"-->
                 <!--class="children">-->
                <!--<div class="top">-->
                    <!--<div class="name">{{data[0].title}}</div>-->
                    <!--<div class="top_draw">-->
                        <!--<img src="../../../../static/img/all.png" alt="">-->
                        <!--<img src="../../../../static/img/out.png" alt="">-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div id="pancake" style="width: 500px;height: 270px;">-->

                <!--</div>-->
            <!--</div>-->
            <!--<div :style="{width:data[1].width,height:data[1].height,left:data[1].left,top:data[1].top}"-->
                 <!--class="children">-->
                <!--<div class="top">-->
                    <!--<div class="name">{{data[1].title}}</div>-->
                    <!--<div class="top_draw">-->
                        <!--<img src="../../../../static/img/all.png" alt="">-->
                        <!--<img src="../../../../static/img/out.png" alt="">-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div id="weather" style="width:600px;height: 270px;">-->

                <!--</div>-->
            <!--</div>-->
            <!--<div :style="{width:data[2].width,height:data[2].height,left:data[2].left,top:data[2].top}"-->
                 <!--class="children">-->
                <!--<div class="top">-->
                    <!--<div class="name">{{data[2].title}}</div>-->
                    <!--<div class="top_draw">-->
                        <!--<img src="../../../../static/img/all.png" alt="">-->
                        <!--<img src="../../../../static/img/out.png" alt="">-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div id="age" style="width: 310px;height: 265px;">-->

                <!--</div>-->
            <!--</div>-->
            <!--<div :style="{width:data[3].width,height:data[3].height,left:data[3].left,top:data[3].top}"-->
                 <!--class="children">-->
                <!--<div class="top">-->
                    <!--<div class="name">{{data[3].title}}</div>-->
                    <!--<div class="top_draw">-->
                        <!--<img src="../../../../static/img/all.png" alt="">-->
                        <!--<img src="../../../../static/img/out.png" alt="">-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div id="province" style="width: 350px;height: 265px;">-->

                <!--</div>-->
            <!--</div>-->
            <!--<div :style="{width:data[4].width,height:data[4].height,left:data[4].left,top:data[4].top}"-->
                 <!--class="children">-->
                <!--<div class="top">-->
                    <!--<div class="name">{{data[4].title}}</div>-->
                    <!--<div class="top_draw">-->
                        <!--<img src="../../../../static/img/all.png" alt="">-->
                        <!--<img src="../../../../static/img/out.png" alt="">-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div id="tendency" style="width: 400px;height: 280px;">-->

                <!--</div>-->
            <!--</div>-->

        <!--</div>-->
    <!--</div>-->
    <div class="passengerFlow">
        <ScrollContainer>
            <div class="content">
                <div class="contentTitle">
                    <p class="passengerAnalyze">
                        客流分析
                    </p>
                    <p class="formConfig">
                        <img src="" alt="">
                        图表配置
                    </p>
                </div>
                <div class = "contentForm">
                    <div class = "echatsForm" v-for = "(item,index) in echatList" :style = "{width:item.width,height:item.height}"
                         v-dragging = "{ item: item, list: echatList, group: 'item' }"
                         :key="item.title">
                        <div class = "echatsTitle">
                            <p class = "title">{{item.title}}</p>
                            <div class = "echatsBtn">
                                <img src="../../../../static/img/all.png" alt="" @click="showBigEchat(item)">
                                <img src="../../../../static/img/out.png" alt="">
                            </div>
                        </div>
                        <div class="echatsContent">

                        </div>
                    </div>
                </div>
            </div>
            <EchatsCard
                v-if="visible"
                :visible="visible"
                :echatData="echatData"
                @closeEchatsDialog ="visible = false">
            </EchatsCard>
        </ScrollContainer>
    </div>
</template>

<script>
    import analyzeData from "../../../../API/entrance.js"
    import ScrollContainer from '@/components/ScrollContainer'
    import EchatsCard from '@/components/eye/analyze/echats'

    export default {
        data() {
            return {
                data: [

                ],
                Analyzedata: [],
                echatList: [
                    {width: "45%",   height: "300px", title: "游客流入流出"},
                    {width: "33.3%", height: "300px",title: "年龄段统计"},
                    {width: "33.3%", height: "300px", title: "省份排名"},
                    {width: "55%",   height: "300px",  title: "未来一周天气"},
                    {width: "33.3%", height: "300px", title: "游客趋势分析"}
                ],
                visible: false,
                echatData: {}
            }
        },
        methods: {
            showBigEchat (item) {
                this.visible = true;
                this.echatData = item
            },
            draw() {
                analyzeData.getAnalyzeData((data) => {
                    console.log(data);
                    this.Analyzedata = data.result;

                    var pancakeData = JSON.parse(this.Analyzedata[1].result);
                    var weatherData = JSON.parse(this.Analyzedata[2].result);
                    var ageData = JSON.parse(this.Analyzedata[4].result);
                    var provinceData = JSON.parse(this.Analyzedata[3].result);
                    var tendencyData = JSON.parse(this.Analyzedata[0].result);
                    console.log(pancakeData);
                    console.log(weatherData);
                    console.log(ageData);
                    console.log(provinceData);
                    console.log(tendencyData);

                    //游客流入流出
                    var myChartPancake = this.$echarts.init(document.getElementById("pancake"));

                    myChartPancake.setOption({
                        title: {
                            text: '',
                            textStyle: {
                                color: '#fff',
                                fontSize: 18
                            }
                        },
                        legend: {//图例组件
                            //                orient:'horizontal',
                            data: ['流入', '流出'],
                            right: '20',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        tooltip: {//提示框
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        xAxis:
                            {
                                type: 'category',
                                /*data: ['11点','12点','13点','14点','15点','16点'],*/
                                data: pancakeData.xData,
                                axisLine: {
                                    lineStyle: {
                                        color: '#fff',
                                        width: 0.1
                                    }
                                }
                            },
                        yAxis:
                            {
                                type: 'value',
                                axisLine: {//坐标轴轴线设置
                                    lineStyle: {
                                        color: "#fff",
                                        width: 1,
                                    }
                                }
                            },
                        series: [
                            {
                                name: '流入',
                                type: 'bar',
                                barWidth: '35%',
                                data: pancakeData.Cdata,
                                /*data:[451,668,905,498,276,164],*/
                                itemStyle: {
                                    normal: {
                                        color: '#9a57b4',
                                        borderType: 'dotted',
                                        barBorderRadius: 5
                                    }
                                },
                                //图形上的文本标签
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        color: '#fff'
                                    }
                                }
                            },
                            {
                                name: '流出',
                                type: 'bar',
                                barWidth: '30%',
                                data: pancakeData.Rdata,
//				                data:[221,683,358,321,257,632],
                                itemStyle: {
                                    normal: {
                                        color: '#66cc66',
                                        barBorderRadius: 5
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        color: "#fff"
                                    }
                                }
                            },

                        ]
                    });
                    //年龄段统计
                    var myChartPancake = echarts.init(document.getElementById("age"));

                    var pancakeData = [
                        {value: 1548, name: '青年'},
                        {value: 300, name: '少年'},
                        {value: 120, name: '童年'},
                        {value: 634, name: '中年'},
                        {value: 735, name: '老年'}
                    ];


                    var p = [' (18~40岁)：', ' (7~17岁)：', ' (0~7岁)：', ' (41~65岁)：', ' (65岁以后)：'];
                    myChartPancake.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },

                        legend: {
                            formatter: function (name) {
                                var total = 0;
                                var target;
                                for (var i = 0, l = ageData.data.length; i < l; i++) {
                                    total += ageData.data[i].value;
                                    if (ageData.data[i].name == name) {
                                        target = ageData.data[i].value;
                                        name = name + p[i];
                                    }
                                }
                                return name + '' + ((target / total) * 100).toFixed(0) + '%';
                            },
                            icon: 'circle',
                            /*orient: 'vertical',*/
                            right: '10px',
                            top: 'bottom',
                            /*data: ['青年','童年','少年','中年','老年'],*/
                            data: ageData.xData,
                            textStyle: {color: "#fff"}
                        },
                        series: [
                            {
                                name: '',
                                type: 'pie',
                                radius: '50%',
                                center: ['60%', '40%'],
                                data: pancakeData,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ],
                        color: ['#68c6e0', '#9acc5d', '#f98860', '#ffcc79', '#f8bfdf']
                    });


                    //省份
                    var myChartpie = echarts.init(document.getElementById("province"));

                    myChartpie.setOption({
                        color: ["red", 'black', "green", 'blue', 'dark'],
                        title: {
                            text: '',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        legend: {
                            data: ['2011年']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            show: false,
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        yAxis: {
                            type: 'category',
                            axisLine: {//坐标轴轴线设置
                                show: false,
                                lineStyle: {
                                    color: "#fff",
                                    width: 1,
                                }
                            },
                            data: provinceData.xData,
                            /*data: ['广州','上海','北京','河南','陕西'],*/
                            axisTick: {
                                show: false
                            },
                        },
                        series: [
                            {
                                barWidth: '40%',
                                type: 'bar',
                                center: ['50%', '40%'],
                                data: provinceData.data,
                                /*data: [1820, 2348, 2903, 6490, 7174],*/
                                itemStyle: {
                                    normal: {
                                        color: function (params) {
                                            var colorList = ['#f1c40f', '#ff6633', '#66cc66', '#49a2de', '#9a57b4'];
                                            return colorList[params.dataIndex];
                                        },
                                        barBorderRadius: 10
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right',
                                        color: "#fff"
                                    }
                                }
                            },
                        ]
                    });


                    //天气
                    var myChartMap = echarts.init(document.getElementById("weather"));
                    myChartMap.setOption({
                        title: {
                            text: '',
                            textStyle: {
                                color: '#fff',
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: ['最高气温', '最低气温']
                        },
                        toolbox: {
                            show: true,
                            iconStyle: {
                                normal: {
                                    color: "#fff",
                                    opacity: 1,
                                    borderWith: 2,
                                }
                            },
//			            feature: {
//			                dataView: {readOnly: false},
//			                magicType: {type: ['line', 'bar']},
//			                saveAsImage: {}
//			            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                lineStyle: {
                                    color: '#fff'
                                },
                            },
                            /*data: ['周一','周二','周三','周四','周五','周六','周日']*/
                            data: weatherData.xData,
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: "#FFF"
                                }
                            },
                            axisLabel: {
                                formatter: '{value} °C'
                            }
                        },
                        series: [
                            {
                                name: '最高气温',
                                type: 'line',
                                /*data:[11, 11, 15, 13, 12, 13, 10],*/
                                data: weatherData.Rdata,
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                label: {
                                    normal: {
                                        show: "true",
                                        position: 'top',
                                        color: "#fff"
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#E9E793'
                                    }
                                }
                            },
                            {
                                name: '最低气温',
                                type: 'line',
                                data: weatherData.Cdata,
//			                data:[1, -2, 2, 5, 3, 2, 0],
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                label: {
                                    normal: {
                                        show: "true",
                                        position: 'top',
                                        color: "#fff"
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#D23D7C'
                                    }
                                }
                            }
                        ]
                    });

                    //区域游客统计

                    var myChartBar = echarts.init(document.getElementById("tendency"));
                    myChartBar.setOption({
                        color: ['#F1C40F'],
                        title: {
                            text: '',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        calculable: true,
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                /*data : ['10.1','10.2','10.3','10.4','10.5','10.6','10.7'],*/
                                data: tendencyData.xData,
                                axisLine: {
                                    lineStyle: {
                                        color: '#fff',
                                        width: 0.1
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                axisLine: {
                                    lineStyle: {
                                        color: '#fff',
                                        width: 0.1
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name: '人数',
                                type: 'line',
                                smooth: true,
                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                /* data:[240, 100, 130, 54, 260, 830, 710]*/
                                data: tendencyData.data
                            }

                        ]
                    });

                });
            }
        },
        mounted() {
            this.draw();

        },
        components: {
            ScrollContainer,
            EchatsCard
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .passengerFlow{
        width: 100%;
        height: 100%;
        padding: rem(20) rem(30);
        box-sizing: border-box;
        background:  #174984;
        .content{
            width: 100%;
            /*height: 100%;*/
            .contentTitle{
                width: 100%;
                border: 1px solid #ccc;
                padding: rem(8) rem(15);
                box-sizing: border-box;
                border-radius: rem(5);
                p{
                    color: #999;
                    font-size: rem(16);
                    display: inline-block;
                }
                .passengerAnalyze{
                }
                .formConfig{
                   float: right;
                }
            }
            .contentForm{
                width: 100%;
                height: 100%;
                margin-top: rem(20);
                cursor: pointer;
                .echatsForm{
                    border: 1px solid #ccc;
                    float: left;
                    box-sizing: border-box;
                    margin-bottom: rem(20);
                    border-radius: rem(5);
                    .echatsTitle{
                        width: 100%;
                        padding: rem(5) rem(10);
                        box-sizing: border-box;
                        text-align: left;
                        color: #222;
                        /*border-bottom: 1px solid #ccc;*/
                        background: #f2f2f2;
                        border-radius: rem(5);
                        border-bottom-right-radius: rem(0);
                        border-bottom-left-radius: rem(0);
                        p{
                            display: inline-block;
                        }
                        .echatsBtn{
                            display: inline-block;
                            float: right;
                        }

                    }
                }
            }
        }
    }
</style>
