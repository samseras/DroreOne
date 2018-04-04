<template>

    <div class="passengerFlow"  v-loading="isShowloading">
        <ScrollContainer>
            <i class="el-icon-d-arrow-right" v-show = "isSetOut" @click="setOut"></i>
            <i class="el-icon-d-arrow-left" v-show = "isPackUp" @click="packUp"></i>
            <div class="content" id="content">
                <!--<div class="contentTitle">-->
                    <!--<p class="passengerAnalyze">-->
                        <!--客流分析-->
                    <!--</p>-->
                   <!---->
                    <!--&lt;!&ndash;<p class="formConfig">&ndash;&gt;-->
                        <!--&lt;!&ndash;<img src="" alt="">&ndash;&gt;-->
                        <!--&lt;!&ndash;图表配置&ndash;&gt;-->
                    <!--&lt;!&ndash;</p>&ndash;&gt;-->
                <!--</div>-->
                <i class="el-icon-rank" @click = "fullscreen" v-show="!isBigScreen"></i>
                <!--<i class="el-icon-renk" v-show="isBigScreen" @click="showList"></i>-->
                <div class = "contentForm" ref="content" >
                    <div class = "echatsForm" v-for = "(item,index) in echatList" :style = "{width:item.pos_width+'%',height:item.pos_height+'%',left:item.pos_left+'%',top:item.pos_top+'%'}"
                         v-dragging = "{ item: item, list: echatList, group: 'item' }"
                         :key="item.title"
                         :id="item.id"
                         :scenario_id = "item.scenario_id" :class="isActive === index?'active':''">
                        <div class = "echatsTitle">
                            <p class = "title"></p>
                            <div class = "echatsBtn">
                                <i class="el-icon-rank" @click="showBigEchat(index,item,item.scenario_id)" v-if="isShowIcon"></i>
                                <img src="../../../../static/img/out.png" alt="">
                                <i class="el-icon-close" v-if="!isShowIcon" @click = "closeBigChart(item)"></i>
                            </div>
                        </div>
                        <div class="echatsContent" :id="item.scenario_id" ref="chartHeight">

                        </div>
                        <!--<div class="echatsBox" v-if="isShowIcon">-->
                            <!---->
                        <!--</div>-->

                    </div>
                </div>
            </div>
            <!--<EchatsCard-->
                <!--v-if="visible"-->
                <!--:visible="visible"-->
                <!--:echatData="echatData"-->
                <!--:kind="kind"-->
                <!--@closeEchatsDialog ="visible = false"-->
            <!--&gt;-->
            <!--</EchatsCard>-->
        </ScrollContainer>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import EchatsCard from '@/components/eye/analyze/echats'
    import api from '@/api'
    import vue from 'vue'
    export default {
        data() {
            return {
                data: [],
                Analyzedata: [],
                echatList: [],
                visible: false,
                echatData: null,
                isShowloading: false,
                chartH:null,
                chartW:null,
                kind:null,
                isShowIcon:true,
                isActive: -1,
                isBigScreen:false,
                isPackUp:false,
                isSetOut:false
            }
        },
        props:['listName'],
        methods: {
            fullscreen(){
                this.isBigScreen = !this.isBigScreen;
                this.isSetOut = !this.isSetOut;
                let data = {
                    list:true,
                    head:true
                };
                let chartId;
                this.$emit('hideList',data);//fullscreen事件触发后，自动触发hideList事件 var docElm = document.documentElement;
                this.requestFullScreen();
                this.moveChart()
            },
            showList(){
                if(!this.checkFull()){
                    let that = this;
                    this.isBigScreen = !this.isBigScreen;
                    this.isSetOut = false;
                    this.isPackUp = false;
                    let data = false;
                    that.$emit('hideList',data);//fullscreen事件触发后，自动触发hideList事件 var docElm = document.documentElement;
                    this.moveChart();
                }
            },
            checkFull(){
                var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
                if(isFull === undefined) isFull = false;
                return isFull;
            },
            requestFullScreen() {
                let docElm = document.documentElement;
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
                else if (docElm.msRequestFullscreen) {
                    docElm = document.body; //overwrite the element (for IE)
                    docElm.msRequestFullscreen();
                }
                else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
                else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                }
            },
            setOut(){
                this.isSetOut = !this.isSetOut;
                this.isPackUp = !this.isPackUp;
                let data = {
                    list:false,
                    head:true
                };
                this.$emit('hideList',data);//fullscreen事件触发后，自动触发hideList事件 var docElm = document.documentElement;
            },
            packUp(){
                this.isSetOut = !this.isSetOut;
                this.isPackUp = !this.isPackUp;
                let data = {
                    list:true,
                    head:true
                };
                this.$emit('hideList',data);//fullscreen事件触发后，自动触发hideList事件 var docElm = document.documentElement;
            },
            getEchats () {
                this.isShowLoading = true
                let id = this.$route.params.id;
                api.analyze.getStreamDataById(id).then(res=> {
                    this.isShowloading = false;
                    this.echatList = res.result;
                    let scenarioId,chartId,chartDomH;
             //       console.log(this.echatList, '这是请求回来的表格');
                    for(let i=0;i<this.echatList.length;i++){
                         scenarioId = this.echatList[i].scenario_id;
                         chartId = this.echatList[i].id;
                         chartDomH = this.echatList[i].pos_height/100;
                        this.getchartKind(scenarioId,chartDomH);
                    };
                })
            },
            showBigEchat (index,item,id) {
              //  this.isActive = index
                this.isShowIcon = !this.isShowIcon;
                let dom = $("#"+id).parent(".echatsForm");
                 dom.css({"left":"10%","top":"10%",width:"80%",height:"80%",position:"fixed",backgroundColor:"#fff",zIndex:"10"});
                this.visible = true;
                this.echatData = item;
                let domWidth = $("#"+id).parent(".echatsForm").width();
                let domHeight = $("#"+id).parent(".echatsForm").height();
                let charDom = this.$echarts.init(document.getElementById(id));
                 dom.find(".echatsContent").css({"width":domWidth,"height":domHeight-50+"px"})
                charDom.resize();
            },
            closeBigChart(item){
               // this.isActive = -1
                 this.isShowIcon = !this.isShowIcon;
                 let smallChart = $("#"+item.scenario_id);
                 let smallDom = $("#"+item.scenario_id).parent(".echatsForm");
                 let smallCharDom = this.$echarts.init(document.getElementById(item.scenario_id));
                 $(".echatsForm").css("zIndex",1);
                 smallDom.css({"left":item.pos_left+"%","top":item.pos_top+"%",width:item.pos_width+"%",height:item.pos_height+"%",position:"absolute",backgroundColor:"#fff"});
                 let smallDomHeight = smallDom.css("height").replace("px","");
                 let smallH = this.chartH*item.pos_height/100-33+"px";
                 let smallW = this.chartW*item.pos_width/100+"px";
                 this.isShowIcon = true;
                  smallChart.css({width:smallW,height:smallH,zIndex:0});
                  smallCharDom.resize();

            },
            moveChart(){
                if(this.barDom!=undefined){
                    barDom.resize();
                };
                if(this.pieDom!=undefined){
                    pieDom.resize();
                };
                if(this.candlestickDom!=undefined){
                    candlestickDom.resize();
                };
                if(this.radarDom!=undefined){
                    radarDom.resize();
                };
                if(this.gaugeDom!=undefined){
                    gaugeDom.resize();
                };
                if(this.funnelDom!=undefined){
                    funnelDom.resize();
                };
                if(this.roseDom!=undefined){
                    roseDom.resize();
                };
                if(this.relativebarDom!=undefined){
                    relativebarDom.resize();
                };
                if(this.RingDom!=undefined){
                    RingDom.resize();
                };
                if(this.scatterDom!=undefined){
                    scatterDom.resize();
                };
                if(this.lineDom!=undefined){
                    lineDom.resize();
                };
            },
            getchartKind(scenarioId,chartDomH){
                api.analyze.getChartDashboardName(scenarioId).then(res=>{
                    this.kind = res.result;
                     let kindName = res.result;
                     let chartDomHpx = this.chartH*chartDomH-32+"px";
                    $("#"+scenarioId).css("height",chartDomHpx);
                   console.log(kindName,"这是返回的图表类型");
                    switch(kindName) {
                        case "component_sink_bar":
                            this.getBarData(scenarioId);
                            break;
                        case "component_sink_pie":
                            this.getPieData(scenarioId);
                            break;
                        case "component_sink_rose":
                            this.getRoseData(scenarioId);
                            break;
                        case "component_sink_funnel":
                            this.getFunnelData(scenarioId);
                            break;
                        case "component_sink_line":
                            this.getLineData(scenarioId);
                            break;
                        case "component_sink_scatter":
                            this.getScatterData(scenarioId);
                            break;
                        case "component_sink_ring":
                            this.getRingData(scenarioId);
                            break;
                        case "component_sink_relativebar":
                            this.getRelativebarData(scenarioId);
                            break;
                        case "component_sink_gauge":
                            this.getGaugeData(scenarioId);
                            break;
                        case "component_sink_radar":
                            this.getRadarData(scenarioId);
                            break;
                        case "component_sink_candlestick":
                            this.getCandlestickData(scenarioId);
                            break;
                    }
                })
            },
            getBarData(scenarioId){
                let barDom,bar0ption,barResult,bigDom;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    barResult = JSON.parse(res.result);
                    console.log(res,"这是返回的bar数据");
                    $("#"+scenarioId).prev().find(".title").text(barResult.title);
                    barDom = this.$echarts.init(document.getElementById(scenarioId));
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
                                data:barResult.name,
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
                                data:barResult.value,
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
                    barDom.setOption(bar0ption);
                })
            },
            getPieData(scenarioId){
                let pieDom,pie0ption,pieResult;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    pieResult = JSON.parse(res.result);
                //    console.log(res,"这是返回的pie数据");
                    $("#"+scenarioId).prev().find(".title").text(pieResult.title);
                    pieDom = this.$echarts.init(document.getElementById(scenarioId));
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
                                for (var i = 0, l = pieResult.value.length; i < l; i++) {
                                    total += pieResult.value[i].value;
                                    if (pieResult.value[i].name == name) {
                                        target = pieResult.value[i].value;
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
                            data:pieResult.name,
                            textStyle:{color:"#949494"}
                        },
                        series : [
                            {
                                name: '',
                                type: 'pie',
                                radius : '55%',
                                center: ['38%','45%'],
                                data:pieResult.value,
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
                    pieDom.setOption(pie0ption);
                })
            },
            getRoseData(scenarioId){
                let roseDom,rose0ption,roseResult;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    roseResult = JSON.parse(res.result);
                 //   console.log(res,"这是返回的rose数据");
                    $("#"+scenarioId).prev().find(".title").text(roseResult.title);
                    roseDom = this.$echarts.init(document.getElementById(scenarioId));
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
                            top:'10%',
                            data:roseResult.name,
                            orient: 'vertical'
                        },
                        calculable : true,
                        series : [
                            {
                                name:'半径模式',
                                type:'pie',
                                radius : ['30%', '70%'],
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
                                data:roseResult.value
                            }

                        ]
                    };
                    roseDom.setOption(rose0ption);
                })
            },
            getFunnelData(scenarioId){
                let funnelDom,funnel0ption,funnelResult;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    funnelResult = JSON.parse(res.result);
                //    console.log(res,"这是返回的funnel数据");
                    $("#"+scenarioId).prev().find(".title").text(funnelResult.title);
                    funnelDom = this.$echarts.init(document.getElementById(scenarioId));
                    funnel0ption = {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        legend: {
                            data: funnelResult.name,
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
                                data: funnelResult.value
                            }
                        ],
                        color:['#68c6e0','#9acc5d','#f98860','#ffcc79','#f8bfdf']
                    };
                    funnelDom.setOption(funnel0ption);
                })
            },
            getLineData(scenarioId){
                let lineDom,line0ption,lineResult;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                  //  console.log(res,"这是返回的line数据");
                    lineResult = JSON.parse(res.result);
                    $("#"+scenarioId).prev().find(".title").text(lineResult.title);
                    lineDom = this.$echarts.init(document.getElementById(scenarioId));
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
                            data: lineResult.name
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: lineResult.value,
                            type: 'line',
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            }
                        }]
                    };
                    lineDom.setOption(line0ption);
                })
            },
            getScatterData(scenarioId){
                let scatterDom,scatter0ption,scatterResult;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                //    console.log(res,"这是返scatter回的scatter数据");
                    scatterResult = JSON.parse(res.result);
                    $("#"+scenarioId).prev().find(".title").text(scatterResult.title);
                    scatterDom = this.$echarts.init(document.getElementById(scenarioId));
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
                            data:scatterResult.value,
                        }]
                    };
                    scatterDom.setOption(scatter0ption);
                })
            },
            getRingData(scenarioId){
                let ringDom,ring0ption,ringResult;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                 //   console.log(res,"这是返回的ring数据");
                    ringResult = JSON.parse(res.result);
                    $("#"+scenarioId).prev().find(".title").text(ringResult.title);
                    ringDom = this.$echarts.init(document.getElementById(scenarioId));
                    ring0ption = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            top:'3%',
                            left:'5%',
                            data:ringResult.name
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
                                data:ringResult.value
                            }
                        ],
                        color:['yellowgreen','cornflowerblue','darkgoldenrod','blueviolet','hotpink']
                    };
                    ringDom.setOption(ring0ption);
                })
            },
            getRelativebarData(scenarioId){
                let relativebarDom,relativebar0ption,relativebarResult;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                  //  console.log(res,"这是返回的relativebar数据");
                    relativebarResult = JSON.parse(res.result);
                    $("#"+scenarioId).prev().find(".title").text(relativebarResult.title);
                    relativebarDom = this.$echarts.init(document.getElementById(scenarioId));
                    relativebar0ption = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:relativebarResult.lengeData
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
                                data : relativebarResult.yData
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
                                data:relativebarResult.value.data
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
                                data:relativebarResult.value.justValue
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
                                data:relativebarResult.value.loseValue
                            }
                        ]
                    };
                    relativebarDom.setOption(relativebar0ption);
                })
            },
            getGaugeData(scenarioId){
                let gaugeDom,gauge0ption,gaugeResult;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    console.log(res,"这是返回的gauge数据");
                    gaugeResult = JSON.parse(res.result);
                    $("#"+scenarioId).prev().find(".title").text(gaugeResult.title);
                    gaugeDom = this.$echarts.init(document.getElementById(scenarioId));
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
                                data: gaugeResult.value
                            }
                        ]
                    };
                    setInterval(function () {
                        gaugeResult.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                        gaugeDom.setOption(gaugeResult, true);
                    },2000);
                    gaugeDom.setOption(gauge0ption);
                })
            },
            getCandlestickData(scenarioId){
                let candlestickDom,candlestick0ption,candlestickResult;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                //    console.log(res,"这是返回的candlestick数据");
                    candlestickResult = JSON.parse(res.result);
                    $("#"+scenarioId).prev().find(".title").text(candlestickResult.title);
                    candlestickDom = this.$echarts.init(document.getElementById(scenarioId));
                    candlestick0ption = {
                        grid: {
                            left: '5%',
                            right: '5%',
                            bottom: '10%',
                            top:'10%',
                            containLabel: true
                        },
                        xAxis: {
                            data: candlestickResult.name
                        },
                        yAxis: {},
                        series: [{
                            type: 'k',
                            data: candlestickResult.value
                        }]
                    };
                    candlestickDom.setOption(candlestick0ption);
                })
            },
            getRadarData(scenarioId){
                let radarDom,radar0ption,radarResult;
                api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    console.log(res,"这是返回的radar数据");
                    radarResult = JSON.parse(res.result);
                    $("#"+scenarioId).prev().find(".title").text(radarResult.title);
                    radarDom = this.$echarts.init(document.getElementById(scenarioId));
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
                            indicator: radarResult.lengeData
                        },
                        series: [{
                            name: '预算 vs 开销（Budget vs spending）',
                            type: 'radar',
                            // areaStyle: {normal: {}},
                            data : radarResult.value
                        }],
                        color:['#68c6e0','#9acc5d']
                    };
                    radarDom.setOption(radar0ption);
                })
            }
        },
        watch: {
          '$route' () {
              this.echatList = []  //清空dom 内容
              this.getEchats()
          },
        },
        created () {
            this.echatList = []
            this.getEchats();
        },
        mounted: function () {
            this.chartH = this.$refs.content.getBoundingClientRect().height;
            this.chartW = this.$refs.content.getBoundingClientRect().width;
            let that=this
            window.onresize = function(){
                that.showList();
            };

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
        /*background:  #174984;*/
        i{
            display: inline-block;
            width: rem(30);
            height: 100%;
            font-size: rem(24);
            color: #999;

        }
        .content{
            flex: 1;
            position: relative;
            height: 100%;
            /*display: flex;*/
            min-height: rem(557);
            /*flex-direction: column;*/
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
                i{
                    width: rem(25);
                    padding: 0;
                    float: right;
                    font-weight: 600;
                    color: #999;
                    font-size: rem(22);
                }
                /*.formConfig{*/
                   /*float: right;*/
                /*}*/
            }
            .contentForm{
                width: 100%;
                /*height: 100%;*/
             //   flex: 1;
                height: 100%;
                position: relative;
                margin-top: rem(20);
                cursor: pointer;
                .active{
                    position: fixed !important;
                    width: 80% !important;
                    height: 80% !important;
                    left: 10% !important;
                    top: 10% !important;
                    background:#fff !important;
                    z-index: 999 !important;
                }
                .echatsForm{
                    position: absolute;
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
                            i{
                                padding:0;
                                width: rem(25);
                                font-size: rem(18);
                                color: #999;
                                font-weight: 600;
                                margin-right: rem(1);
                            }
                            img{
                                width: rem(14);
                                height: rem(14);
                                margin-right: rem(2);
                                margin-top: rem(3);
                            }
                        }
                    .echatsBox{
                        position: fixed;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background: #000;
                        opacity: 0.3;
                    }
                    }
                }
            }
        }
    }
    .content>i{
        position: absolute;
        top:rem(0);
        right: rem(0);
        width: rem(25);
        padding: 0;
        float: right;
        font-weight: 600;
        color: #999;
        font-size: rem(22);
    }
</style>
