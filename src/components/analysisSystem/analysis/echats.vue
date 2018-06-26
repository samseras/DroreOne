<template>
    <div class="echat">
        <el-dialog
            :visible="visible"
            :before-close="closeDialog"
            width="100%"
            class="dialog echatDialog"
            center>
           <div id="bigChart">
               <!--{{echatData}}-->
               <!--{{kind}}-->
           </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "echats",
        props: ['visible','echatData','kind'],
        data () {
            return {
                // centerDialogVisible: false
                chartDom: null,
/*                chartOption:[
                    {
                        typeKind:"component_sink_bar",
                        option:{
                            title:{
                                text:'',
                                textStyle : {
                                    color: '#fff',
                                    fontSize:18
                                }
                            },
                            legend:{//图例组件
                                /!* orient:'vertical',*!/
                                // data:['流入'],
                                top:'5px',
                                right:'5px',
                                textStyle:{
                                    color:"#949494"
                                }
                            },
                            grid:{
                                width:'85%',  //组件得宽
                                height:'60%', //组件得高
                                top:'20%',  //组件离容器上侧得距离

                            },
                            xAxis :
                                {
                                    type: 'category',
                                    boundaryGap: [0, 0.05],
                                    //   data: ['11点','12点','13点','14点','15点','16点'],
                                    data:echatData.name,
                                    axisLine:{
                                        lineStyle:{
                                            color:'#949494',
                                            width:0.1
                                        }
                                    }
                                },
                            yAxis :
                                {
                                    type : 'value',
                                    axisLine:{//坐标轴轴线设置
                                        lineStyle:{
                                            color:"#949494",
                                            width:1,
                                        }
                                    }
                                },
                            series : [
                                {
                                    name:'流入',
                                    type:'bar',
                                    barWidth: '35%',
                                    //    data:[451,668,905,498,276,164],
                                    data:echatData.value,
                                    itemStyle:{
                                        normal:{
                                            color:'#9a57b4',
                                            borderType:'dotted',
                                            barBorderRadius:5
                                        }
                                    },
                                    //图形上的文本标签
                                    label:{
                                        normal:{
                                            show:true,
                                            position:'top',
                                            color:'#949494'
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        typeKind:"component_sink_pie",
                        option: {
                            title:{
                                text:"",
                                textStyle : {
                                    color: '#fff',
                                    fontSize:18
                                }
                            },
                            tooltip : {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },

                            legend: {
                                formatter:  function(name){
                                    var total = 0;
                                    var target;
                                    for (var i = 0, l = echatData.value.length; i < l; i++) {
                                        total += pieResult.value[i].value;
                                        if (echatData.value[i].name == name) {
                                            target = echatData.value[i].value;
                                            name = name;
                                        }
                                    }
                                    return name + '' + ((target/total)*100).toFixed(0) + '%';
                                },
                                icon: 'circle',
                                orient: 'vertical',
                                right: '7%',
                                top:'10%',
                                // bottom:'30px',
                                data:echatData.name,
                                textStyle:{color:"#949494"}
                            },
                            series : [
                                {
                                    name: '',
                                    type: 'pie',
                                    radius : '55%',
                                    center: ['38%','45%'],
                                    data:echatData.value,
                                    itemStyle: {
                                        emphasis: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ],
                            color:['#68c6e0','#9acc5d','#f98860','#ffcc79','#f8bfdf']
                        }
                    }
                ],*/

            }
        },
        methods:{
            closeDialog () {
                this.$emit('closeEchatsDialog')
            },
            initChart(kind){
                // for(let i=0;i<this.chartOption;i++){
                //     if(this.chartOption[i].typeKind==kind){
                //         this.chartDom.setOption(this.chartOption[i].option);
                //     }
                // }
                console.log(kind, 'opopopop');
                switch(kind) {
                    case "component_sink_bar":
                        this.getBarData();
                        break;
                    case "component_sink_pie":
                        this.getPieData();
                        break;
                    case "component_sink_rose":
                        this.getRoseData();
                        break;
                    case "component_sink_funnel":
                        this.getFunnelData();
                        break;
                    case "component_sink_line":
                        this.getLineData();
                        break;
                    case "component_sink_scatter":
                        this.getScatterData();
                        break;
                    case "component_sink_ring":
                        this.getRingData();
                        break;
                    case "component_sink_relativebar":
                        this.getRelativebarData();
                        break;
                    case "component_sink_gauge":
                        this.getGaugeData();
                        break;
                    case "component_sink_radar":
                        this.getRadarData();
                        break;
                    case "component_sink_candlestick":
                        this.getCandlestickData();
                        break;
                }
            },
            getBarData(){
                let bar0ption,barDom;
                    barDom = this.$echarts.init(document.getElementById("bigChart"));
                    bar0ption={
                        title:{
                            text:'',
                            textStyle : {
                                color: '#fff',
                                fontSize:18
                            }
                        },
                        legend:{//图例组件
                            /* orient:'vertical',*/
                            // data:['流入'],
                            top:'5px',
                            right:'5px',
                            textStyle:{
                                color:"#949494"
                            }
                        },
                        grid:{
                            width:'85%',  //组件得宽
                            height:'60%', //组件得高
                            top:'20%',  //组件离容器上侧得距离

                        },
                        xAxis :
                            {
                                type: 'category',
                                boundaryGap: [0, 0.05],
                                //   data: ['11点','12点','13点','14点','15点','16点'],
                                data:this.echatData.name,
                                axisLine:{
                                    lineStyle:{
                                        color:'#949494',
                                        width:0.1
                                    }
                                }
                            },
                        yAxis :
                            {
                                type : 'value',
                                axisLine:{//坐标轴轴线设置
                                    lineStyle:{
                                        color:"#949494",
                                        width:1,
                                    }
                                }
                            },
                        series : [
                            {
                                name:'流入',
                                type:'bar',
                                barWidth: '35%',
                                //    data:[451,668,905,498,276,164],
                                data:this.echatData.value,
                                itemStyle:{
                                    normal:{
                                        color:'#9a57b4',
                                        borderType:'dotted',
                                        barBorderRadius:5
                                    }
                                },
                                //图形上的文本标签
                                label:{
                                    normal:{
                                        show:true,
                                        position:'top',
                                        color:'#949494'
                                    }
                                }
                            }
                        ]
                    };
                    console.log(this.chartDom, 'p[p[p[p[p[p[')
                    barDom.setOption(bar0ption);
            },
            getPieData(scenarioId){
                let pie0ption;
                    pie0ption = {
                        title:{
                            text:"",
                            textStyle : {
                                color: '#fff',
                                fontSize:18
                            }
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },

                        legend: {
                            formatter:  function(name){
                                var total = 0;
                                var target;
                                for (var i = 0, l = this.echatData.value.length; i < l; i++) {
                                    total += this.echatData.value[i].value;
                                    if (this.echatData.value[i].name == name) {
                                        target = this.echatData.value[i].value;
                                        name = name;
                                    }
                                }
                                return name + '' + ((target/total)*100).toFixed(0) + '%';
                            },
                            icon: 'circle',
                            orient: 'vertical',
                            right: '7%',
                            top:'10%',
                            // bottom:'30px',
                            data:this.echatData.name,
                            textStyle:{color:"#949494"}
                        },
                        series : [
                            {
                                name: '',
                                type: 'pie',
                                radius : '55%',
                                center: ['38%','45%'],
                                data:this.echatData.value,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ],
                        color:['#68c6e0','#9acc5d','#f98860','#ffcc79','#f8bfdf']
                    };
                this.chartDom.setOption(pie0ption);
            },
            getRoseData(scenarioId){
                let roseDom,rose0ption,roseResult;
                    rose0ption={
                        title : {
                            text: '',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            left:'5%',
                            top:'8%',
                            data:this.echatData.name,
                            orient: 'vertical'
                        },
                        calculable : true,
                        series : [
                            {
                                name:'半径模式',
                                type:'pie',
                                radius : [30, 70],
                                center : ['55%', '45%'],
                                roseType : 'radius',
                                label: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                },
                                lableLine: {
                                    normal: {
                                        show: false
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                },
                                data:this.echatData.value
                            }

                        ]
                    };
                this.chartDom.setOption(rose0ption);
            },
            getFunnelData(scenarioId){
                let funnelDom,funnel0ption,funnelResult;
                    funnel0ption = {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        legend: {
                            data: this.echatData.name,
                            orient: 'vertical',
                            left:'5%',
                            top:'8%'
                        },
                        calculable: true,
                        series: [
                            {
                                name:'漏斗图',
                                type:'funnel',
                                left: '18%',
                                top: 30,
                                bottom: 30,
                                width: '80%',
                                min: 0,
                                max: 100,
                                minSize: '0%',
                                maxSize: '70%',
                                sort: 'descending',
                                gap: 2,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'inside'
                                    },
                                    emphasis: {
                                        textStyle: {
                                            fontSize: 20
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        length: 10,
                                        lineStyle: {
                                            width: 1,
                                            type: 'solid'
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        borderColor: '#fff',
                                        borderWidth: 1
                                    }
                                },
                                data: this.echatData.value
                            }
                        ],
                        color:['#68c6e0','#9acc5d','#f98860','#ffcc79','#f8bfdf']
                    };
                this.chartDom.setOption(funnel0ption);
            },
            getLineData(scenarioId){
                let lineDom,line0ption,lineResult;
                    line0ption = {
                        grid: {
                            left: '5%',
                            right: '5%',
                            bottom: '7%',
                            top:'18%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: this.echatData.name
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: this.echatData.value,
                            type: 'line',
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            }
                        }]
                    };
                this.chartDom.setOption(line0ption);
            },
            getScatterData(scenarioId){
                let scatterDom,scatter0ption,scatterResult;
                    scatter0ption = {
                        grid: {
                            left: '3%',
                            right: '5%',
                            bottom: '5%',
                            top:'10%',
                            containLabel: true
                        },
                        xAxis: {},
                        yAxis: {},
                        series: [{
                            type: 'scatter',
                            symbolSize: 12,
                            data:this.echatData.value,
                        }]
                    };
                    this.chartDom.setOption(scatter0ption);
            },
            getRingData(scenarioId){
                let ringDom,ring0ption,ringResult;
                    ring0ption = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            top:'3%',
                            left:'5%',
                            data:this.echatData.name
                        },
                        series: [
                            {
                                name:'访问来源',
                                type:'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: false,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '12',
                                            fontWeight: 'lighter'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data:this.echatData.value
                            }
                        ],
                        color:['yellowgreen','cornflowerblue','darkgoldenrod','blueviolet','hotpink']
                    };
                    this.chartDom.setOption(ring0ption);
            },
            getRelativebarData(scenarioId){
                let relativebar0ption;
                    relativebar0ption = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:this.echatData.lengeData
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '8%',
                            top:'8%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        yAxis : [
                            {
                                type : 'category',
                                axisTick : {show: false},
                                data : this.echatData.yData
                            }
                        ],
                        series : [
                            {
                                name:'利润',
                                type:'bar',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'inside'
                                    }
                                },
                                data:this.echatData.value.data
                            },
                            {
                                name:'收入',
                                type:'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true
                                    }
                                },
                                data:this.echatData.value.justValue
                            },
                            {
                                name:'支出',
                                type:'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'left'
                                    }
                                },
                                data:this.echatData.value.loseValue
                            }
                        ]
                    };
                this.chartDom.setOption(relativebar0ption);
            },
            getGaugeData(scenarioId){
                let gauge0ption;
                    gaugeResult = {
                        tooltip : {
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        series: [
                            {
                                radius:'70%',
                                name: '业务指标',
                                type: 'gauge',
                                detail: {formatter:'{value}%'},
                                data: this.echatData.value
                            }
                        ]
                    };
                    setInterval(function () {
                        this.echatData.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                        this.chartDom.setOption(gaugeResult, true);
                    },2000);
                    this.chartDom.setOption(gauge0ption);
            },
            getCandlestickData(scenarioId){
                let candlestick0ption;
                    candlestick0ption = {
                        grid: {
                            left: '5%',
                            right: '5%',
                            bottom: '10%',
                            top:'10%',
                            containLabel: true
                        },
                        xAxis: {
                            data: this.echatData.name
                        },
                        yAxis: {},
                        series: [{
                            type: 'k',
                            data: this.echatData.value
                        }]
                    };
                this.chartDom.setOption(candlestick0ption);
            },
            getRadarData(scenarioId){
                let radar0ption;
                    radar0ption = {
                        title: {
                            text: ''
                        },
                        tooltip: {},
                        // legend: {
                        //     data: radarResult.lengeData
                        // },
                        radar: {
                            // shape: 'circle',
                            name: {
                                textStyle: {
                                    color: '#fff',
                                    backgroundColor: '#999',
                                    borderRadius: 5,
                                    padding: [3, 5]
                                }
                            },
                            indicator: this.echatData.lengeData
                        },
                        series: [{
                            name: '预算 vs 开销（Budget vs spending）',
                            type: 'radar',
                            // areaStyle: {normal: {}},
                            data : this.echatData.value
                        }],
                        color:['#68c6e0','#9acc5d']
                    };
                this.chartDom.setOption(radar0ption);
            },
            // watch: {
            //     '$route' () {
            //         this.chartDom = []  //清空dom 内容
            //         //this.initChart()
            //     }
            // },
        },
        created(){
            // this.chartDom = []
        },
        mounted () {
            console.log()
            let Dom = document.getElementsByClassName('el-dialog__body')
            console.log(Dom, 'ooo')
            this.chartDom = Dom.getElementById("bigChart")
            console.log(this.chartDom, '涅米的')
            console.log(this.kind, 'opoertyui')
            this.initChart(this.kind);
        }
    }
</script>
<style lang="scss">
    .echat{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 90%;
        }
        .el-dialog--center .el-dialog__body{
            padding: 0;
            height: rem(400);
        }
        #bigChart{
            height: rem(400);
            margin: 5% rem(50);
        }
    }
</style>
<style lang="scss" scoped>

</style>
