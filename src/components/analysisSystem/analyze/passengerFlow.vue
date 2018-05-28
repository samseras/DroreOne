<template>
    <div class="passengerFlow"  v-loading="isShowloading">
        <ScrollContainer v-if="isErr">
            <i class="el-icon-d-arrow-right" v-show = "isSetOut" @click="setOut"></i>
            <i class="el-icon-d-arrow-left packUp" v-show = "isPackUp" @click="packUp"></i>
            <div class="content" id="content">
                <i class="el-icon-rank rankBtn" @click = "fullscreen" v-show="!isBigScreen"></i>
                <div class = "contentForm" ref="content" >
                    <div class = "echatsForm" v-for = "(item,index) in echatList" :style = "{width:item.pos_width+'%',height:item.pos_height+'%',left:item.pos_left+'%',top:item.pos_top+'%'}"
                         v-dragging = "{ item: item, list: echatList, group: 'item' }"
                         :key="item.title"
                         :id="item.id"
                         :scenario_id = "item.scenario_id" :class="isActive === index?'active':''">
                        <div class = "echatsTitle">
                            <p class = "title"></p>
                            <div class = "echatsBtn" v-show="!isBigScreen">
                                <i class="el-icon-rank" @click="showBigEchat(index,item,item.scenario_id)" v-if="isShowIcon"></i>
                                <!--<img src="../../../../static/img/out.png" alt="">-->
                                <i class="el-icon-close" v-if="!isShowIcon" @click = "closeBigChart(item)"></i>
                            </div>
                        </div>
                        <div class="echatsContent" :id="item.scenario_id" ref="chartHeight" >

                        </div>
                    </div>
                </div>
            </div>
        </ScrollContainer>
        <err-page v-else :echatListErrs = "echatListErr"></err-page>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    // import EchatsCard from '@/components/analysisSystem/analyze/echats'
    import api from '@/api'
    import errPage from "../../pages/err.vue"
    import {mapGetters} from 'vuex'
    import $ from 'jquery'
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
                chartT:null,
                chartB:null,
                chartL:null,
                chartR:null,
                kind:null,
                isShowIcon:true,
                isActive: -1,
                isBigScreen:false,
                isPackUp:false,
                isSetOut:false,
                fullHeight:null,
                fullWidth:null,
                barDom:null,
                pieDom:null,
                roseDom:null,
                candlestickDom:null,
                radarDom:null,
                relativebarDom:null,
                RingDom:null,
                scatterDom:null,
                lineDom:null,
                gaugeDom:null,
                funnelDom:null,
                isAllScreen:false,
                // currenId:null,
                isErr:true,
                echatListErr:{
                    pullData:false,
                    errInform:false,
                }
            }
        },
        props:['listName'],
        methods: {
            getDom(){
                this.chartT = this.$refs.content.getBoundingClientRect().top;
                this.chartB = this.$refs.content.getBoundingClientRect().bottom;
                this.chartL = this.$refs.content.getBoundingClientRect().left;
                this.chartR = this.$refs.content.getBoundingClientRect().right;
                this.chartH = this.chartB - this.chartT;
                this.chartW = this.chartR - this.chartL;
                console.log(this.chartH,"this.chartH")
                console.log(this.chartW,"this.chartW")
             },
            fullscreen(){
                this.fullHeight = window.screen.availHeight;
                // this.fullHeight = window.innerHeight;
                // this.fullWidth = window.innerWidth;
                this.fullWidth =  window.screen.availWidth;
                this.isBigScreen = !this.isBigScreen;
                this.isSetOut = !this.isSetOut;
                let data = {
                    list:true,
                    head:true
                };
                let chartId;
                this.$emit('hideList',data);//fullscreen事件触发后，自动触发hideList事件 var docElm = document.documentElement;
                this.requestFullScreen();
                let changeH,changeW;
                console.log(this.fullHeight,"fullHeight");
                console.log(this.fullWidth,"fullWidth")
                for(let i=0;i<this.echatList.length;i++){
                    changeH = this.echatList[i].pos_height/100;
                    changeW = this.echatList[i].pos_width/100;
                    $($(".echatsContent")[i]).css({"height":this.fullHeight*changeH-42+"px"});
                    // $($(".echatsContent")[i]).prev(".echatsTitle").css({"width":this.fullWidth*changeW-14+"px"});
                };
                this.moveChart();
             },
            showList(){
                if(!this.checkFull()){
                    let that = this;
                    this.isAllScreen = false;
                    this.isBigScreen = !this.isBigScreen;
                    this.isSetOut = false;
                    this.isPackUp = false;
                    let data = false;
                    let changeH,changeW;
                    this.chartT = this.$refs.content.getBoundingClientRect().top;
                    this.chartB = this.$refs.content.getBoundingClientRect().bottom;
                    this.chartL = this.$refs.content.getBoundingClientRect().left;
                    this.chartR = this.$refs.content.getBoundingClientRect().right;
                    this.chartH = this.chartB-this.chartT-42;
                    this.chartW = this.chartR - 220;
                    console.log(this.chartT,"this.chartT")
                    console.log(this.chartB,"this.chartB")
                    that.$emit('hideList',data);//fullscreen事件触发后，自动触发hideList事件 var docElm = document.documentElement;
                    for(let i=0;i<this.echatList.length;i++){
                        changeH = this.echatList[i].pos_height/100;
                        changeW = this.echatList[i].pos_width/100;
                            $($(".echatsContent")[i]).css({"height":this.chartH*changeH-42+"px"});
                         // $($(".echatsContent")[i]).prev(".echatsTitle").css({"width":this.chartW*changeW-10+"px"});
                    };
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
                this.isAllScreen = true;
                this.isSetOut = !this.isSetOut;
                this.isPackUp = !this.isPackUp;
                let data = {
                    list:false,
                    head:true
                };
                this.$emit('hideList',data);//fullscreen事件触发后，自动触发hideList事件 var docElm = document.documentElement;
                let changeH,changeW;
                for(let i=0;i<this.echatList.length;i++){
                    changeH = this.echatList[i].pos_height/100;
                    changeW = this.echatList[i].pos_width/100;
                    // $($(".echatsContent")[i]).css({"width":this.chartW*changeW-10+"px"});
                    // $($(".echatsContent")[i]).prev(".echatsTitle").css({"width":this.chartW*changeW-10+"px"});
                    this.moveChart();
                };

            },
            packUp(){
                this.isSetOut = !this.isSetOut;
                this.isPackUp = !this.isPackUp;
                let data = {
                    list:true,
                    head:true
                };
                this.$emit('hideList',data);//fullscreen事件触发后，自动触发hideList事件 var docElm = document.documentElement;
                let changeH,changeW;
                for(let i=0;i<this.echatList.length;i++){
                    changeH = this.echatList[i].pos_height/100;
                    changeW = this.echatList[i].pos_width/100;
                    // $($(".echatsContent")[i]).css({"width":this.fullWidth*changeW-14+"px"});
                    this.moveChart();
                };
            },
            async getEchats () {
                // console.log(this.getRefresh)
                this.isShowLoading = true
                let id = this.$route.params.id;


                await api.analyze.getStreamDataById(id).then(res=> {
                    // console.log(res,'nimeide ')
                    this.isShowloading = false;
                    this.echatList = res.result;
                    if(this.echatList.length == 0){
                        this.isErr = false;
                        this.echatListErr.errInform = false;
                        this.echatListErr.pullData = true;
                        return
                        console.log(echatListErr.pullData,"echatListErr.pullData")
                    }else{
                        this.isErr = true;
                        this.echatListErr.errInform = false;
                        this.echatListErr.pullData = false;
                    }
                    let scenarioId,chartId,chartDomH;
                   console.log(this.echatList, '这是请求回来的图表');
                    for(let i=0;i<this.echatList.length;i++){
                         scenarioId = this.echatList[i].scenario_id;
                         chartId = this.echatList[i].id;
                         chartDomH = this.echatList[i].pos_height/100;
                         this.getchartKind(scenarioId,chartDomH);
                    };
                }).catch(err => {
                    this.isErr = false;
                    this.echatListErr.errInform = true;
                    this.echatListErr.pullData = false;
                    console.log(err)
                })
                this.moveChart();
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
                    this.barDom.resize();
                };
                if(this.pieDom!=undefined){
                    this.pieDom.resize();
                };
                if(this.candlestickDom!=undefined){
                    this.candlestickDom.resize();
                };
                if(this.radarDom!=undefined){
                    this.radarDom.resize();
                };
                if(this.gaugeDom!=undefined){
                    this.gaugeDom.resize();
                };
                if(this.funnelDom!=undefined){
                    this.funnelDom.resize();
                };
                if(this.roseDom!=undefined){
                    this.roseDom.resize();
                };
                if(this.relativebarDom!=undefined){
                    this.relativebarDom.resize();
                };
                if(this.RingDom!=undefined){
                    this.RingDom.resize();
                };
                if(this.scatterDom!=undefined){
                    this.scatterDom.resize();
                };
                if(this.lineDom!=undefined){
                    this.lineDom.resize();
                };
            },
            async getchartKind(scenarioId,chartDomH){
                await api.analyze.getChartDashboardName(scenarioId).then(res=>{
                    let chartDomHpx;
                    this.kind = res.result;
                     let kindName = res.result;
                     if(this.isBigScreen){
                         chartDomHpx = this.fullHeight*chartDomH-42+"px";
                    }else {
                         chartDomHpx = this.chartH*chartDomH-42+"px";
                    }
                    $("#"+scenarioId).css("height",chartDomHpx);
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
                }).catch(err => {
                    console.log(err)
                })
            },
            async getBarData(scenarioId){
                let bar0ption,barResult,bigDom;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    barResult = JSON.parse(res.result);
                     // console.log(barResult, 'sdsdfhdsfhsdf')
                    var title = barResult.title;
                    //var subtitle = chartData.subtitle;
                    var legendData = barResult.legendData;
                    var seriesData = barResult.seriesData;
                    var valueNames = barResult.valueNames;
                    if(barResult.subtitle==''){
                        var colors = ['#C1232B', '#B5C334', '#FCCE10', '#ff6600'];
                    }else {
                        var color = barResult.subtitle;
                        var colors = color.split(",");
                    }
                    $("#"+scenarioId).prev().find(".title").text(barResult.title);
                    this.barDom = this.$echarts.init(document.getElementById(scenarioId));
                    bar0ption={
                        title: {
                            text: '',
                        },
                        color: colors,
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        legend: {
                                data: valueNames,
                            align: 'left'
                        },
                        tooltip: {},
                        xAxis: {
                            data: legendData
                        },
                        yAxis: {
                        },
                        series: seriesData
                    };
                    this.barDom.setOption(bar0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getPieData(scenarioId){
                let pie0ption,pieResult;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    pieResult = JSON.parse(res.result);
                   // console.log(pieResult,"这是返回的pie数据");
                    var title = pieResult.title;
                    var subtitle = pieResult.subtitle;
                    var legendData = pieResult.legendData;
                    var seriesName = pieResult.seriesName;
                    var seriesData = pieResult.seriesData;
                    var indicator = pieResult.indicator;
                    $("#"+scenarioId).prev().find(".title").text(pieResult.title);
                    this.pieDom = this.$echarts.init(document.getElementById(scenarioId));
                    pie0ption = {
                        title:{
                            text:'',
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
                            // formatter:  function(name){
                            //     var total = 0;
                            //     var target;
                            //     for (var i = 0, l = pieResult.value.length; i < l; i++) {
                            //         total += pieResult.value[i].value;
                            //         if (pieResult.value[i].name == name) {
                            //             target = pieResult.value[i].value;
                            //             name = name;
                            //         }
                            //     }
                            //     return name + '' + ((target/total)*100).toFixed(0) + '%';
                            // },
                            icon: 'circle',
                            orient: 'vertical',
                            right: '7%',
                            top:'10%',
                            // bottom:'30px',
                            data:legendData,
                            textStyle:{color:"#949494"}
                        },
                        series : [
                            {
                                name: title,
                                type: 'pie',
                                radius : '55%',
                                center: ['38%','45%'],
                                data:seriesData,
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
                    this.pieDom.setOption(pie0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getRoseData(scenarioId){
                let rose0ption,roseResult;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    roseResult = JSON.parse(res.result);
                 //   console.log(res,"这是返回的rose数据");
                    var title = roseResult.title;
                    var legendData = roseResult.legendData;
                    var seriesData = roseResult.seriesData;
                    var nameColumn = roseResult.nameColumn;
                    $("#"+scenarioId).prev().find(".title").text(roseResult.title);
                    this.roseDom = this.$echarts.init(document.getElementById(scenarioId));
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
                                left:'3%',
                                top:'5%',
                                bottom:'5%',
                                x : 'center',
                                data:legendData,
                                // orient: 'vertical'
                            },
                            calculable : true,
                            series : [
                                {
                                    name:title,
                                    type:'pie',
                                    radius : [30, 70],
                                    center : ['55%', '45%'],
                                    roseType : 'area',
                                    label: {
                                        normal: {
                                            show: true
                                        },
                                        emphasis: {
                                            show: true
                                        }
                                    },
                                    lableLine: {
                                        normal: {
                                            show: true
                                        },
                                        emphasis: {
                                            show: true
                                        }
                                    },
                                    data:seriesData
                                }

                            ]
                    };
                    this.roseDom.setOption(rose0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getFunnelData(scenarioId){
                let funnel0ption,funnelResult;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    funnelResult = JSON.parse(res.result);
                    var title = funnelResult.title;
                    var nameColumn = funnelResult.nameColumn;
                    var legendData = funnelResult.legendData;
                    var seriesData = funnelResult.seriesData;
                //    console.log(res,"这是返回的funnel数据");
                    $("#"+scenarioId).prev().find(".title").text(funnelResult.title);
                    this.funnelDom = this.$echarts.init(document.getElementById(scenarioId));
                    funnel0ption = {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        legend: {
                            data: legendData
                        },
                        calculable: true,
                        series: [
                            {
                                name:nameColumn,
                                type:'funnel',
                                left: '10%',
                                top: 30,
                                //x2: 80,
                                bottom: 30,
                                width: '80%',
                                // height: {totalHeight} - y - y2,
                                min: 0,
                                max: 200,
                                minSize: '0%',
                                maxSize: '100%',
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
                                data: seriesData
                            }
                        ],
                        color:['#68c6e0','#9acc5d','#f98860','#ffcc79','#f8bfdf']
                    };
                    this.funnelDom.setOption(funnel0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getLineData(scenarioId){
                let line0ption,lineResult;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                    lineResult = JSON.parse(res.result);
                    // console.log(lineResult,"这是返回的line数据");
                    var title = lineResult.title;
                    var legendData = lineResult.legendData;
                    var seriesData = lineResult.seriesData;
                    var valueColumns = lineResult.valueColumns;
                    $("#"+scenarioId).prev().find(".title").text(lineResult.title);
                    this.lineDom = this.$echarts.init(document.getElementById(scenarioId));
                    line0ption = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:valueColumns
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: legendData
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: seriesData
                    };
                    this.lineDom.setOption(line0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getScatterData(scenarioId){
                let scatter0ption,scatterResult;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                //    console.log(res,"这是返scatter回的scatter数据");
                    scatterResult = JSON.parse(res.result);
                    var title = scatterResult.title;
                    var xColumn = scatterResult.xColumn;
                    var yColumn = scatterResult.yColumn;
                    var seriesData = scatterResult.seriesData;
                    $("#"+scenarioId).prev().find(".title").text(scatterResult.title);
                    this.scatterDom = this.$echarts.init(document.getElementById(scenarioId));
                    scatter0ption = {
                        tooltip: {trigger: 'axis'},
                        grid: {
                            left: '5%',
                            right: '20%',
                            bottom: '5%',
                            top:'15%',
                            containLabel: true
                        },
                        xAxis: {name:xColumn},
                        yAxis: {name:yColumn},
                        series: [{
                            type: 'scatter',
                            symbolSize: 20,
                            data:seriesData
                        }]
                    };
                    this.scatterDom.setOption(scatter0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getRingData(scenarioId){
                let ring0ption,ringResult;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                 //   console.log(res,"这是返回的ring数据");
                    ringResult = JSON.parse(res.result);
                    var legendData = ringResult.legendData;
                    var seriesData = ringResult.seriesData;
                    var nameColumn = ringResult.nameColumn;
                    var title = ringResult.title;
                    $("#"+scenarioId).prev().find(".title").text(ringResult.title);
                    this.ringDom = this.$echarts.init(document.getElementById(scenarioId));
                    ring0ption = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            top:'11%',
                            left:'3%',
                            data:legendData
                        },
                        series: [
                            {
                                name:title,
                                type:'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: true,
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
                                data:seriesData
                            }
                        ],
                        color:['yellowgreen','cornflowerblue','darkgoldenrod','blueviolet','hotpink']
                    };
                    this.ringDom.setOption(ring0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getRelativebarData(scenarioId){
                let relativebar0ption,relativebarResult;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                   console.log(res,"这是返回的relativebar数据");
                    relativebarResult = JSON.parse(res.result);
                    $("#"+scenarioId).prev().find(".title").text(relativebarResult.title);
                    this.relativebarDom = this.$echarts.init(document.getElementById(scenarioId));
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
                    this.relativebarDom.setOption(relativebar0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getGaugeData(scenarioId){
                let gauge0ption,gaugeResult;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                  //  console.log(res,"这是返回的gauge数据");
                    gaugeResult = JSON.parse(res.result);
                    // var title = gaugeResult.title;
                    var title = gaugeResult.seriesData[0].name;
                    var nameColumn = gaugeResult.nameColumn;
                    var minValue = gaugeResult.minValue;
                    var maxValue = gaugeResult.maxValue;
                    var seriesData = gaugeResult.seriesData;
                    delete seriesData[0].name;
                    $("#"+scenarioId).prev().find(".title").text(title);
                    this.gaugeDom = this.$echarts.init(document.getElementById(scenarioId));
                    gauge0ption = {
                        tooltip : {
                            formatter: "{a} <br/>{b} : {c}%"
                        },
                        series: [
                            {
                                name: nameColumn,
                                type: 'gauge',
                                min: minValue,
                                max: maxValue,
                                detail: {
                                    formatter:'{value}'
                                },
                                data: seriesData
                            }
                        ]
                    };
                    // setInterval(function () {
                    //     gaugeResult.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                    //     this.gaugeDom.setOption(gauge0ption, true);
                    // },2000);
                     this.gaugeDom.setOption(gauge0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getCandlestickData(scenarioId){
                let candlestick0ption,candlestickResult;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                //    console.log(res,"这是返回的candlestick数据");
                    candlestickResult = JSON.parse(res.result);
                    var title = candlestickResult.title;
                    var legendData = candlestickResult.legendData;
                    var seriesData = candlestickResult.seriesData;
                    $("#"+scenarioId).prev().find(".title").text(candlestickResult.title);
                    this.candlestickDom = this.$echarts.init(document.getElementById(scenarioId));
                    candlestick0ption = {
                        title:
                            {
                                text: ''
                            },
                        grid: {
                            left: '5%',
                            right: '5%',
                            bottom: '10%',
                            containLabel: true
                        },
                        xAxis:
                            {
                                data: legendData
                            },
                        yAxis: {},
                        series:
                            [
                                {
                                    type: 'k',
                                    data: seriesData
                                }
                            ]
                    };
                    this.candlestickDom.setOption(candlestick0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getRadarData(scenarioId){
                let radar0ption,radarResult;
                await api.analyze.getScenarioMapData(scenarioId).then(res=>{
                    this.echatData = res.result;
                   // console.log(res,"这是返回的radar数据");
                    radarResult = JSON.parse(res.result);
                    var legendData = radarResult.legendData;
                    var seriesName = radarResult.seriesName;
                    var seriesData = radarResult.seriesData;
                    var indicator = radarResult.indicator;

                    $("#"+scenarioId).prev().find(".title").text(radarResult.title);
                    this.radarDom = this.$echarts.init(document.getElementById(scenarioId));
                    radar0ption = {
                            title: {
                                text: '',
                                subtext: ''
                            },
                            tooltip: {},
                            legend: {
                                data: legendData,
                                x: 'left',
                                orient: 'vertical',
                            },
                            radar: {
                                name: {
                                    textStyle: {
                                        color: "#fff",
                                        backgroundColor: "#999",
                                        borderRadius: 3,
                                        padding: [
                                            3,
                                            5
                                        ]
                                    }
                                },
                                indicator: indicator
                            },
                            "series": [
                                {
                                    name: seriesName,
                                    type: "radar",
                                    data: seriesData
                                }
                            ]
                        };
                    this.radarDom.setOption(radar0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            getRefreshTime () {
                console.log('禁止刷新')
                if (this.getRefresh == 0) {
                    return
                }
                if (localStorage.getItem('REFRESHTIME')){
                    let time = localStorage.getItem('REFRESHTIME')
                    if (new Date().getTime() - time > this.getRefresh){
                        this.getEchats()
                        localStorage.setItem('REFRESHTIME',new Date().getTime())
                    }
                } else {
                    localStorage.setItem('REFRESHTIME',new Date().getTime())
                    this.getEchats()
                }
            },
        },
        watch: {
          '$route' () {
              if (this.$route.path.includes('analyze')) {
                  this.echatList = []  //清空dom 内容
                   this.getDom();
                  this.getEchats()
                  window.SETTIMER = setInterval(this.getRefreshTime,this.getRefresh)
                  console.log(this.radarDom, 'opopopopopopopopopop')
              }
          },

        },
        created () {
            this.echatList = []
            this.getEchats();
        },
        computed: {
            ...mapGetters(['getRefresh'])
        },
        mounted () {
            window.SETTIMER = setInterval(this.getRefreshTime,this.getRefresh)
            this.getDom();
            let that=this
            window.onresize = function(){
                that.showList();
            };
        },
        components: {
            ScrollContainer,
            errPage
             // EchatsCard
        },
        destroyed  () {
            clearInterval(window.SETTIMER)
        }
    }
</script>

<style>
    .passengerFlow .scroll-inner{
        display: flex;
    }
</style>
<style lang="scss" scoped type="text/scss">
    .passengerFlow{
        width: 100%;
        height: 100%;
        padding: rem(20) rem(20);
        box-sizing: border-box;
        /*background:  #174984;*/
        i{
            display: inline-block;
            width: rem(30);
            height: 100%;
            font-size: rem(24);
            color: #999;
        }
        .packUp{
            position: fixed;
            bottom: rem(50);
            left: rem(70);
            display: inline-block;
            height: rem(30);
            width: rem(50);
            line-height: rem(30);
            background: #fff;
            text-align: center;
        }
        .content{
            flex: 1;
            position: relative;
            height: 100%;
            /*display: flex;*/
            min-height: rem(545);
            /*flex-direction: column;*/
            .rankBtn{
                position: fixed;
                top:rem(70);
                right: rem(5);
                width: rem(25);
                height: rem(25);
                padding: 0;
                font-weight: 600;
                color: #999;
                font-size: rem(22);
            }
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
                    height: rem(25);
                    padding: 0;
                    /*float: right;*/
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
             //   flex: 1;
                height: 100%;
                position: relative;
                /*margin-top: rem(20);*/
                cursor: pointer;
                /*.active{*/
                    /*position: fixed !important;*/
                    /*width: 80% !important;*/
                    /*height: 80% !important;*/
                    /*left: 10% !important;*/
                    /*top: 10% !important;*/
                    /*background:#fff !important;*/
                    /*z-index: 999 !important;*/
                /*}*/
                .echatsForm{
                    position: absolute;
                    /*border: 1px solid #eee;*/
                    float: left;
                    border-radius: rem(5);
                    padding:0 rem(10) rem(10) 0;
                    box-sizing: border-box;
                    .echatsTitle{
                        position: relative;
                        width: 100%;
                        padding: rem(5) rem(10);
                        box-sizing: border-box;
                        text-align: left;
                        color: #666;
                        background: #f6f6f6;
                        border-radius: rem(5);
                        border-bottom-right-radius: rem(0);
                        border-bottom-left-radius: rem(0);
                        p{
                            width: 100%;
                            padding-right: rem(100);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            display: inline-block;
                            font-size: rem(14);
                        }
                        .echatsBtn{
                            position: absolute;
                            display: inline-block;
                            right: rem(15);
                            top:rem(6);
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
                    .echatsContent{
                        width: 100%;
                        box-sizing: border-box;
                        border: 1px solid #eee;
                        border-top: none;
                        background: #fff;
                     }
                }
            }
        }
    }
</style>
