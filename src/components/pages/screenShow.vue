<template>
    <div class="screenShow" :style="{background: 'url('+backgroundImg+')'}">
        <el-container>
            <el-header :style="{marginTop: headTop+'px'}" >
                <el-row :gutter="10" :style="{background:headBgColor}">
                    <el-col :xs="7" :sm="7" :md="6" :lg="7" :xl="7">
                        <img :src="headLeft" alt="" class="screenLeft" v-if="isShowOtherImg">
                        <div :style="{color:fontColor,lineHeight:headLineH+'px'}">卓锐科技股份有限公司</div>
                    </el-col>
                    <el-col :xs="9" :sm="7" :md="6" :lg="9" :xl="9">
                        <div class="screenTile">
                            <img :src="headImg" alt="" v-if="isShowHead">
                            <p :style="{color:fontColor,lineHeight:headLineH+'px'}">都江堰景区智慧旅游数据</p>
                        </div>
                    </el-col>
                    <el-col :xs="4" :sm="7" :md="6" :lg="4" :xl="4">
                        <img :src="headRight" alt="" class="screenRight" v-if="isShowOtherImg">
                        <div :style="{color:fontColor,lineHeight:headLineH+'px'}">{{currTime | dayFiler}}({{currTime | weekFiler}})  {{currTime | timeFiler}}</div>
                    </el-col>
                    <el-col :xs="4" :sm="7" :md="6" :lg="4" :xl="4" :style="{marginTop: homeMarginT+'px'}">
                            <p class="getBack" onclick='javascript:history.back(-1)'><img :src="homeImg" alt=""></p>
                            <div class="skinPeeler " >
                                <el-menu  class="el-menu-demo" mode="horizontal" router>
                                    <el-submenu index="">
                                        <template slot="title">
                                            <!--<span class="Admin"  :style="{color:fontColor}"></span>-->
                                            <img :src="settingImg" alt="">
                                        </template>
                                        <el-menu-item index="" @click="changeType(0)">皮肤一</el-menu-item>
                                        <el-menu-item index="" @click="changeType(1)">皮肤二</el-menu-item>
                                        <el-menu-item index="" @click="changeType(2)">皮肤三</el-menu-item>
                                    </el-submenu>
                                </el-menu>
                            </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <div class = "contentForm" ref="content" >
                    <div class = "echatsForm" v-for = "(item,index) in echartsContent" :style = "{width:item.pos_width+'%',height:item.pos_height+'%',left:item.pos_left+'%',top:item.pos_top+'%',border:borderColor,backgroundColor:bgCorol}"
                         v-dragging = "{ item: item, list: echartsContent, group: 'item' }"
                         :key="item.title"
                         :id="item.id"
                         :scenario_id = "item.scenario_id" >
                        <img :src="leftT" class="leftT">
                        <img :src="rightT" class="rightT">
                        <img :src="leftB" class="leftB">
                        <img :src="rightB" class="rightB">
                        <img :src="twobgImg" alt="" class="echartsBg">
                        <div class="decorate"  v-if="isShowOtherImg">
                            <img :src="decorateImg" alt="">
                            <span class="bootmBorder"></span>
                            <span></span>
                        </div>
                        <div class = "echatsTitle">
                            <p class = "title" :style="{color:fontColor,textIndent:textIndents+'px',borderBottom:borderLine}"></p>
                        </div>
                        <div class="echatsContent" :id="item.scenario_id" ref="chartHeight">

                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import api from "@/api"
    import moment from 'moment'
    export default {
        props: [],
        data () {
             return{
                 echartsContent:[],
                 currTime: new Date(),  //当前时间
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
                 chartH:null,
                 chartW:null,
                 backgroundImg:null,
                 allEchartColor:null,
                 leftT:null,
                 rightT:null,
                 leftB:null,
                 rightB:null,
                 headImg:null,
                 headLeft:null,
                 headRight:null,
                 decorateImg:null,
                 twobgImg:null,
                 borderColor:null,
                 fontColor:null,
                 bgCorol:null,
                 idx:0,
                 isShowOtherImg:false,
                 isShowHead:true,
                 legentColor:null,
                 homeImg:null,
                 settingImg:null,
                 textIndents:0,
                 borderLine:null,
                 headBgColor:null,
                 headTop:null,
                 homeMarginT:null,
                 headLineH:null,
                 constent:{
                     "name":null,
                     "description":null,
                     "refresh_interval":null,
                     "template_type":0
                 },
                 attr:[
                     {
                         index:0,
                         borderColor:"1px solid #29517c",
                         backgroundImg:"../../../static/img/screenBg.png",
                         leftT:"../../../static/img/lt.svg",
                         rightT:"../../../static/img/rt.svg",
                         leftB:"../../../static/img/lb.svg",
                         rightB:"../../../static/img/rb.svg",
                         headImg:"../../../static/img/screenHead.svg",
                         bgColor:"rgba(0,0,0,0.2)",
                         fontColor:"#fff",
                         homeImg:"../../../static/img/screenHome.svg",
                         settingImg:"../../../static/img/screenSetting.svg",
                         textIndent:0,
                         headLineH:85,
                         homeMarginT:12,
                         echartColor:{
                             legentColor:"#fff",
                             contentColor:[
                                 ["#189ddd","#f8cf59","#d94539","#86ca94","#fbf396","#00fdff","#fa86ea","#047ae3","#d0d415"],
                                 ["#d0d415","#00fdff","#86ca94","#f8cf59","#189ddd","#d94539","#fbf396","#fa86ea","#047ae3"],
                                 ["#047ae3","#fbf396","#00fdff","#d94539","#86ca94","#d0d415","#189ddd","#f8cf59","#d94539"],
                                 ["#fa86ea","#86ca94","#047ae3","#fbf396","#d0d415","#189ddd","#f8cf59","#d94539","#00fdff"],
                                 ["#00fdff","#d94539","#d0d415","#fa86ea","#86ca94","#047ae3","#fbf396","#189ddd","#f8cf59"],
                                 ["#fbf396","#189ddd","#f8cf59","#047ae3","#00fdff","#86ca94","#d94539","#fa86ea","#189ddd"],
                                 ["#86ca94","#fa86ea","#189ddd","#00fdff","#047ae3","#fbf396","#d0d415","#d94539","#fa86ea"],
                                 ["#d94539","#047ae3","#fbf396","#d0d415","#d0d415","#f8cf59","#86ca94","#00fdff","#189ddd"],
                                 ["#f8cf59","#d0d415","#fa86ea","#86ca94","#fbf396","#d94539","#00fdff","#047ae3","#189ddd"],
                                 ["#189ddd","#fbf396","#d0d415","#00fdff","#f8cf59","#047ae3","#fa86ea","#86ca94","#d94539"]


                             ]
                         }
                     },{
                         index:1,
                         borderColor:"1px solid #29517c",
                         backgroundImg:"../../../static/img/screenBg1.png",
                         headLeft:"../../../static/img/screenLeft.png",
                         headRight:"../../../static/img/screenRight.png",
                         decorate:"../../../static/img/decorate.png",
                         twobg:"../../../static/img/twobg1.png",
                         leftT:"../../../static/img/twolt.png",
                         rightT:"../../../static/img/twort.png",
                         leftB:"../../../static/img/twolb.png",
                         rightB:"../../../static/img/tworb.png",
                         headImg:"../../../static/img/twoHead.png",
                         bgColor:"rgba(0,0,0,0.2)",
                         fontColor:"#fff",
                         homeImg:"../../../static/img/screenHome.svg",
                         settingImg:"../../../static/img/screenSetting.svg",
                         textIndent:60,
                         headLineH:85,
                         homeMarginT:12,
                         echartColor: {
                             legentColor:"#fff",
                             contentColor:[
                                 ["#d3a254","#b065d7"],
                                 ["#559782","#326ba0"],
                                 ["#2984d1", "#0a67c0","#0f99c6","#3dbcd1","#07aed4"],
                                 ["#428bca", "#bc895f","#6060d7","#71c6a3"],
                                 ["#56bbc4", "#b065d7","#1a85c5","#bc895f"],
                                 ["#30a6fb", "#047ae3", "#0abdea", "#4beefd", "#02daff", "#2a517d", "#11447c"],
                                 ["#189ddd", "#fbf396", "#ffccf8", "#2984d1"],
                                 ["#fbf396", "#189ddd"],
                                 ["#4bf9ff", "#ffccf8"],
                                 ["#189ddd", "#fbf396", "#ffccf8", "#2984d1"],
                                 ["#fbf396", "#189ddd"]
                             ]
                        }
                     },
                     {
                         index: 2,
                         backgroundImg: "../../../static/img/screenBg2.png",
                         headBgColor:"#fff",
                         // headImg:"../../../static/img/screenHead.svg",
                         headTop:20,
                         headLineH:63,
                         homeMarginT:0,
                         bgCorol: "#fff",
                         fontColor: "#8271a0",
                         homeImg:"../../../static/img/homeLast.png",
                         settingImg:"../../../static/img/settingLast.png",
                         textIndent:0,
                         borderLine:"1px solid #ededed",
                         echartColor: {
                             legentColor: "#8271a0",
                             contentColor: [
                                 ["#76bcc2","#d0d415","#69c5be","#f5787d","#3695e9","#b065d7","#f1d149","#3ccaef","#9ed5a9"],
                                 ["#9ed5a9","#f5787d","#3695e9","#b065d7","#f1d149","#3ccaef","#76bcc2","#d0d415","#69c5be"],
                                 ["#3ccaef","#b065d7","#3695e9","#f5787d","#9ed5a9","#76bcc2","#d0d415","#69c5be","#f1d149"],
                                 ["#f1d149","#d0d415","#b065d7","#3ccaef","#f1d149","#69c5be","#f5787d","#3695e9","#9ed5a9"],
                                 ["#b065d7","#d0d415","#69c5be","#f5787d","#b065d7","#3ccaef","#9ed5a9","#f1d149","#3695e9"],
                                 ["#3695e9","#f1d149","#76bcc2","#69c5be","#f5787d","#d0d415","#b065d7","#3ccaef","#9ed5a9"],
                                 ["#f5787d","#d0d415","#69c5be","#3695e9","#b065d7","#f1d149","#3ccaef","#9ed5a9","#76bcc2"],
                                 ["#69c5be","#f1d149","#3ccaef","#69c5be","#f5787d","#3695e9","#b065d7","#9ed5a9","#d0d415"],
                                 ["#d0d415","#fbf396","#69c5be","#f1d149","#3ccaef","#9ed5a9","#f5787d","#3695e9","#b065d7"],
                                 ["#189ddd","#4bf9ff","#b065d7","#f1d149","#69c5be","#f5787d","#3695e9","#3ccaef","#9ed5a9"]
                             ]
                         }
                     }
                 ]
             }
        },
        methods:{
            async changeType(type){
                let id = this.$route.params.id;
                this.constent.template_type = type;
                await api.analyze.updateDashborad(this.constent,id).then(res=>{
                       this.idx = res.result.template_type;
                       this.afreshType();
                       this.getContent()
                })
            },
            getDom(){
                this.chartT = this.$refs.content.getBoundingClientRect().top;
                this.chartB = this.$refs.content.getBoundingClientRect().bottom;
                this.chartL = this.$refs.content.getBoundingClientRect().left;
                this.chartR = this.$refs.content.getBoundingClientRect().right;
                this.chartH = this.chartB - this.chartT;
                this.chartW = this.chartR - this.chartL;
                // console.log(this.chartH,"this.chartH")
                // console.log(this.chartW,"this.chartW")
            },
            async initScreen(){
                let id = this.$route.params.id;
                this.requestFullScreen();
                await api.analyze.getDashboradList().then(res=>{
                    console.log(res.result,"dashboardList")
                    for(let i=0;i<res.result.length;i++){
                        if(res.result[i].dashboard_id == id){
                            this.idx = res.result[i].template_type;
                            this.constent.name = res.result[i].name;
                            this.constent.description = res.result[i].description;
                            this.constent.refresh_interval = res.result[i].refresh_interval;
                            this.constent.template_type = res.result[i].template_type;
                        }
                    }
                }).catch(err=>{
                    console.log(err)
                })
                  this.afreshType();
            },
            afreshType(){
                for(let i=0;i<this.attr.length;i++){
                    if(this.attr[i].index == this.idx){
                        console.log(this.idx,"~~~~~~~~~")
                        this.isShowHead = true;
                        this.backgroundImg = this.attr[i].backgroundImg;
                        this.allEchartColor = this.attr[i].echartColor.contentColor;
                        this.legentColor = this.attr[i].echartColor.legentColor;
                        this.homeImg =  this.attr[i].homeImg;
                        this.settingImg = this.attr[i].settingImg;
                        this.textIndents = this.attr[i].textIndent;
                        this.headLineH = this.attr[i].headLineH;
                        this.homeMarginT = this.attr[i].homeMarginT;
                        if(this.attr[i].leftT){
                            this.borderLine =null;
                            this.headBgColor = null;
                            this.borderColor = this.attr[i].borderColor;
                            this.leftT = this.attr[i].leftT;
                            this.headTop = 0;
                            this.rightT = this.attr[i].rightT;
                            this.leftB = this.attr[i].leftB;
                            this.rightB = this.attr[i].rightB;
                            this.headImg = this.attr[i].headImg;
                            this.fontColor = this.attr[i].fontColor;
                            this.bgCorol = this.attr[i].bgCorol;
                            if(this.attr[i].headLeft){
                                this.isShowOtherImg = true;
                                this.headLeft = this.attr[i].headLeft;
                                this.headRight = this.attr[i].headRight;
                                this.decorateImg = this.attr[i].decorate;
                                this.twobgImg = this.attr[i].twobg;
                            }else{
                                this.isShowOtherImg = false;
                                this.headLeft = null;
                                this.headRight = null;
                                this.decorateImg = null;
                                this.twobgImg = null;
                            }
                        }else{
                            this.isShowHead = false;
                            this.headBgColor = this.attr[i].headBgColor;
                            this.leftT =null;
                            this.headTop = this.attr[i].headTop;
                            this.rightT = null;
                            this.leftB = null;
                            this.rightB = null;
                            this.twobgImg = null;
                            this.isShowOtherImg = false;
                            this.borderColor = null;
                            this.fontColor = this.attr[i].fontColor;
                            this.bgCorol = this.attr[i].bgCorol;
                            this.borderLine = this.attr[i].borderLine;
                        }
                        console.log(this.headLeft,"this.backgroundImg")
                        console.log(this.headRight,"this.allEchartColor")
                        console.log(this.rightB,"this.rightB")
                    }
                }
            },
            async getContent(){
                let id = this.$route.params.id;
                this.initScreen();
                await api.analyze.getStreamDataById(id).then(res=> {
                    this.echartsContent = res.result;
                      console.log(res.result,"结果")
                    // console.log(this.allEchartColor,"this.allEchartColor")
                    let scenarioId,chartId,chartDomH,echartsColor;
                    for(let i=0;i<this.echartsContent.length;i++){
                        scenarioId = this.echartsContent[i].scenario_id;
                        chartId = this.echartsContent[i].id;
                        chartDomH = this.echartsContent[i].pos_height/100;
                         echartsColor = this.allEchartColor[i];
                        this.getchartKind(scenarioId,chartDomH,echartsColor);
                        // console.log(scenarioId,"scenarioId")
                        // console.log(chartDomH,"chartDomH")

                    };
                }).catch(err => {
                    console.log(err)
                })
             },
            async getchartKind(scenarioId,chartDomH,echartsColor){
                await api.analyze.getChartDashboardName(scenarioId).then(res=>{
                    let chartDomHpx;
                    this.kind = res.result;
                    let kindName = res.result;
                    // console.log(echartsColor,"echartsColor")
                        chartDomHpx = this.chartH*chartDomH-34+"px";
                    // console.log(chartDomHpx,"chartDomHpx")
                    $("#"+scenarioId).css("height",chartDomHpx);
                    switch(kindName) {
                        case "component_sink_bar":
                            this.getBarData(scenarioId,echartsColor);
                            break;
                        case "component_sink_pie":
                            this.getPieData(scenarioId,echartsColor);
                            break;
                        case "component_sink_rose":
                            this.getRoseData(scenarioId,echartsColor);
                            break;
                        case "component_sink_funnel":
                            this.getFunnelData(scenarioId,echartsColor);
                            break;
                        case "component_sink_line":
                            this.getLineData(scenarioId,echartsColor);
                            break;
                        case "component_sink_scatter":
                            this.getScatterData(scenarioId,echartsColor);
                            break;
                        case "component_sink_ring":
                            this.getRingData(scenarioId,echartsColor);
                            break;
                        case "component_sink_relativebar":
                            this.getRelativebarData(scenarioId,echartsColor);
                            break;
                        case "component_sink_gauge":
                            this.getGaugeData(scenarioId,echartsColor);
                            break;
                        case "component_sink_radar":
                            this.getRadarData(scenarioId,echartsColor);
                            break;
                        case "component_sink_candlestick":
                            this.getCandlestickData(scenarioId,echartsColor);
                            break;
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            async getBarData(scenarioId,echartsColor){
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
                    // if(barResult.subtitle==''){
                    //     var colors = ['#C1232B', '#B5C334', '#FCCE10', '#ff6600'];
                    // }else {
                    //     var color = barResult.subtitle;
                    //     var colors = color.split(",");
                    // }
                    $("#"+scenarioId).prev().find(".title").text(barResult.title);
                    this.barDom = this.$echarts.init(document.getElementById(scenarioId));
                    bar0ption={
                        title: {
                            text: '',
                        },

                        grid: {
                            top:'14%',
                            left: '3%',
                            right: '4%',
                            bottom: '10%',
                            containLabel: true
                        },
                        legend: {
                            data: valueNames,
                            align: 'left',
                            textStyle:{
                                color:this.legentColor
                            }
                        },
                        tooltip: {},
                        xAxis: {
                            data: legendData,
                            axisLine:{
                                lineStyle:{
                                    color:this.legentColor
                                }
                            }
                        },
                        yAxis: {
                            axisLine:{
                                lineStyle:{
                                    color:this.legentColor
                                }
                            },
                            splitLine:{
                                show:true,
                                lineStyle:{
                                    color:["#6a9dd2"]
                                }
                            }
                        },
                        series: seriesData,
                        color:echartsColor,
                    };
                    this.barDom.setOption(bar0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getPieData(scenarioId,echartsColor){
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
                                color: this.legentColor,
                                fontSize:18
                            }
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        // legend: {
                        //     icon: 'circle',
                        //     orient: 'vertical',
                        //     right: '7%',
                        //     top:'10%',
                        //     // bottom:'30px',
                        //     data:legendData,
                        //     textStyle:{color:this.legentColor}
                        // },
                        series : [
                            {
                                name: title,
                                type: 'pie',
                                radius : '55%',
                                center: ['47%','44%'],
                                data:seriesData,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                },
                                label: {
                                    normal: {
                                        textStyle: {
                                            color: this.legentColor
                                        }
                                    }
                                },
                            }
                        ],
                        color:echartsColor
                        // color:['#68c6e0','#9acc5d','#f98860','#ffcc79','#f8bfdf']
                    };
                    this.pieDom.setOption(pie0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getRoseData(scenarioId,echartsColor){
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
                            textStyle:{
                                color:this.legentColor
                            }
                            // orient: 'vertical'
                        },
                        calculable : true,
                        series : [
                            {
                                name:title,
                                type:'pie',
                                radius : [40, 80],
                                center : ['50%', '50%'],
                                roseType : 'area',
                                label: {
                                    normal: {
                                        show: true,
                                        textStyle: {
                                            color: this.legentColor
                                        }
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
                        ],
                        color:echartsColor
                    };
                    this.roseDom.setOption(rose0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getFunnelData(scenarioId,echartsColor){
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
                            data: legendData,
                            textStyle:{
                                color:this.legentColor
                            }
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
                                        borderColor: this.legentColor,
                                        borderWidth: 1
                                    }
                                },
                                data: seriesData
                            }
                        ],
                        color:echartsColor
                        // color:['#68c6e0','#9acc5d','#f98860','#ffcc79','#f8bfdf']
                    };
                    this.funnelDom.setOption(funnel0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getLineData(scenarioId,echartsColor){
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
                            data:valueColumns,
                            x:"83%",
                            textStyle:{
                                color:this.legentColor
                            }
                        },
                        grid: {
                            top:'14%',
                            left: '3%',
                            right: '4%',
                            bottom: '8%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data:legendData,
                            axisLine:{
                                lineStyle:{
                                    color:this.legentColor
                                }
                            },
                            splitLine:{
                                show:true,
                                lineStyle:{
                                    color:["#707e8e"]
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine:{
                                lineStyle:{
                                    color:this.legentColor
                                }
                            },
                            splitLine:{
                                show:true,
                                lineStyle:{
                                    color:["#707e8e"]
                                }
                            }
                        },
                        series: seriesData,
                        color:echartsColor
                        // color:["#189cdc","#fbf396"]
                    };
                    this.lineDom.setOption(line0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getScatterData(scenarioId,echartsColor){
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
                        }],
                        color:echartsColor
                    };
                    this.scatterDom.setOption(scatter0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getRingData(scenarioId,echartsColor){
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
                            data:legendData,
                            textStyle:{
                                color:this.legentColor
                            }
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
                        color:echartsColor
                        // color:['yellowgreen','cornflowerblue','darkgoldenrod','blueviolet','hotpink']
                    };
                    this.ringDom.setOption(ring0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getRelativebarData(scenarioId,echartsColor){
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
            async getGaugeData(scenarioId,echartsColor){
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
                        ],
                        color:echartsColor
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
            async getCandlestickData(scenarioId,echartsColor){
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
                            top:'10%',
                            containLabel: true
                        },
                        xAxis:
                            {
                                data: legendData
                            },
                        yAxis: {},
                        series: [
                                {
                                    type: 'k',
                                    data: seriesData
                                }
                            ],
                        color:echartsColor
                    };
                    this.candlestickDom.setOption(candlestick0ption);
                }).catch(err => {
                    console.log(err)
                })
            },
            async getRadarData(scenarioId,echartsColor){
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
                            x: '83%',
                            orient: 'vertical',
                            textStyle:{
                                color:this.legentColor
                            }
                        },
                        radar: {
                            name: {
                                textStyle: {
                                    color: this.legentColor,
                                    // backgroundColor: "#999",
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
                        ],
                        color:echartsColor
                    };
                    this.radarDom.setOption(radar0ption);
                }).catch(err => {
                    console.log(err)
                })
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

        },
        filters: {
            dayFiler(item) {
                // console.log(item, '9090')
                return moment(item).format('YYYY年MM月DD日')
            },
            weekFiler(item) {
                let arr = ['天', '一', '二', '三', '四', '五', '六']
                let day = item.getDay()
                let week = arr.filter((item, index) => {
                    return index === day
                })
                return `星期${week[0]}`
            },

            timeFiler(item) {
                let time = item.toLocaleTimeString();
                console.log(time,"时间")
                return time
            },
        },
        watch:{
            '$route'(){
                this.timeFiler(item)
            }

        },
         created () {
             // this.requestFullScreen();
             this.getContent();
             // console.log(this.$route,"OOOOOOOOOOOO")
             // console.log(this.$route.params.n,"PPPPPP")
             // console.log(this.$route.params.id,"@@@@@@@@@@@")
        },
        mounted () {

            this.getDom();
        }
    }
</script>

<style lang="scss" scoped>
  .screenShow{
      width: 100%;
      height: 100%;
      .el-container{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          .el-header{
              width: 100%;
              height: rem(63);
              margin-top: rem(15);
              margin-bottom: rem(15);

              /*box-sizing: content-box;*/
              /*background: #5daf34;*/
              .el-row{
                  height: rem(63);
                  line-height: rem(63);
                  .el-col{
                      position: relative;
                      div{
                          width: 100%;
                          text-align: center;
                          color: #fff;
                      }
                      .screenTile{
                          position: relative;
                          width: 100%;
                          height: rem(63);
                           img{
                               width:100%;
                               position: absolute;
                               left: 0;
                           }
                          p{
                              width: 100%;
                              font-size: rem(24);
                              line-height: rem(55);
                          }
                      }

                  }
                  .el-col:first-child{
                      div{
                          z-index: 10;
                      }
                      .screenLeft{
                          position: absolute;
                          top: rem(23);
                          left: rem(-15);
                      }
                  }
                  .el-col:nth-child(3){
                      position: relative;
                      .screenRight{
                          position: absolute;
                          top: rem(23);
                          left: rem(5);

                      }

                  }
                  .el-col:last-child{
                      display: flex;
                      height: 100%;
                      z-index: 3;
                      .getBack{
                          display: block;
                          padding-left: rem(40);
                          padding-right: rem(15);
                      }
                      img{
                          width: rem(25);
                          height: rem(25);
                          margin-top: rem(20);
                      }
                      .skinPeeler{
                          width: rem(100);
                          height: 100%;
                          /*margin-top: rem(10);*/
                          box-sizing: border-box;
                          /*.Admin{*/
                              /*display: inline-block;*/
                              /*height: rem(93);*/
                              /*line-height: rem(85);*/
                          /*}*/
                          img{
                              margin-top: rem(5);
                          }
                      }
                  }
              }
          }
          .el-main{
              flex: 1;
              .contentForm {
                  width: 100%;
                  height: 100%;
                  position: relative;
                  cursor: pointer;
                  .echatsForm {
                      position: absolute;
                      float: left;
                      border-radius: rem(5);
                      /*padding: 0 rem(10) rem(10) 0;*/
                      box-sizing: border-box;
                      /*border: 1px solid #29517c;*/
                      background-color: rgba(0,0,0,0.2);
                      img{
                          position: absolute;
                      }
                      .leftT{
                          left: rem(-1);
                          top: rem(-1);
                      }
                      .rightT{
                          right: rem(-1);
                          top: rem(-1);
                      }
                      .leftB{
                          bottom: rem(-1);
                          left: rem(-1);
                      }
                      .rightB{
                          bottom: rem(-1);
                          right: rem(-1);
                      }
                      .decorate{
                          position: absolute;
                          top: 0;
                          width: 100%;
                          height: rem(35);
                          display: flex;
                          img{
                              width: rem(60);
                          }
                          .bootmBorder{
                              display: block;
                              height: rem(2);
                              flex: 1;
                              margin-top: rem(35);
                              margin-left: rem(40);
                              background: #428bca;
                              box-sizing: border-box;
                          }
                         span:last-child{
                             box-sizing: border-box;
                             display: inline-block;
                             width: rem(40);
                             height: rem(2);
                             margin-top: rem(20);
                             margin-right: rem(25);
                             margin-left: rem(-8);
                             background: #428bca;
                             transform:rotate(-50deg);
                             -ms-transform:rotate(-50deg); 	/* IE 9 */
                             -moz-transform:rotate(-50deg); 	/* Firefox */
                             -webkit-transform:rotate(-50deg); /* Safari 和 Chrome */
                             -o-transform:rotate(-50deg);
                         }
                      }
                      .echartsBg{
                          top: rem(7);
                          left: rem(3);

                      }
                      .echatsTitle {
                          position: relative;
                          width: 100%;
                          padding: rem(5) rem(20);
                          box-sizing: border-box;
                          text-align: left;
                          color: #666;
                          height: rem(45);
                          /*background: #f6f6f6;*/
                          border-radius: rem(5);
                          border: none;
                          border-bottom-right-radius: rem(0);
                          border-bottom-left-radius: rem(0);
                          p {
                              width: 100%;
                              height: rem(30);
                              padding-right: rem(100);
                              overflow: hidden;
                              text-overflow: ellipsis;
                              white-space: nowrap;
                              box-sizing: border-box;
                              display: inline-block;
                              font-size: rem(14);
                              /*color: #17e4db;*/
                              color:#fff;
                              text-indent: rem(60);
                          }
                          .echatsBtn {
                              position: absolute;
                              display: inline-block;
                              right: rem(15);
                              top: rem(6);
                              i {
                                  padding: 0;
                                  width: rem(25);
                                  font-size: rem(18);
                                  color: #999;
                                  font-weight: 600;
                                  margin-right: rem(1);
                              }
                              img {
                                  width: rem(14);
                                  height: rem(14);
                                  margin-right: rem(2);
                                  margin-top: rem(3);
                              }
                          }
                          .echatsBox {
                              position: fixed;
                              left: 0;
                              top: 0;
                              width: 100%;
                              height: 100%;
                              background: #000;
                              opacity: 0.3;
                          }

                      }
                      .echatsContent {
                          width: 100%;
                          box-sizing: border-box;
                          border-top: none;
                          border-bottom-right-radius: rem(5);
                      }
                  }
              }
          }
      }
  }

</style>
<style lang="scss">
    .screenShow{
        .el-menu-demo,.el-menu--horizontal,.el-menu{
            background-color: transparent;
        }
        .func .el-menu{
            border-bottom: none;
            height: rem(93);
        }
        .el-menu--horizontal{
            height: rem(93);
            border-bottom: none;
        }
        .el-menu--horizontal>.el-submenu .el-submenu__title{
            color: #fff;
            height: rem(93);
            width: rem(100);
        }
        .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
            background-color: transparent;
        }
        .func .el-submenu__title img{
            display: inline-block;
            width: rem(20);
            height: rem(20);
            vertical-align: middle;
            margin-top: rem(-4);
            margin-left: rem(5);
        }
        .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
            width: rem(100);
            border-bottom: none;
        }
        .el-submenu.is-active .el-submenu__title{
            width: rem(100);
            border-bottom: none;
        }
        .el-menu--popup-bottom-start .el-menu-item{
            width: rem(93);
        }
        .el-main{
            /*background: #00B83F;*/
            padding: 0;
            margin: rem(20);
            margin-top: 0;
        }
    }

</style>
