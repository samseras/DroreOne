<template>
    <div class="passengerFlow">
         <div class="flowLeft">
              <div class="flowLTop">
                  <div class="realTimeFlow">
                      <p>{{realTimeFlowNum}}<span>人</span></p>
                      <span class="flowTitle">实时客流量</span>
                  </div>
                  <div class="totalFlow">
                      <el-select v-model="realFlowCurr" class="flowKind" @change="selectKindReal">
                          <el-option
                              v-for="item in totalFlowOption"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                          </el-option>
                      </el-select>
                      <p>{{totalFlowNum}}<span>人</span></p>
                      <span class="flowTitle">累计客流量</span>
                  </div>
              </div>
             <div class="flowLBottom">
                 <img src="../../../static/img/xh-corner.png" alt="">
                 <h3>今日各时段总客流趋势</h3>
                 <div class="selectItem">
                     <!--<el-date-picker-->
                         <!--v-model="currTripTime"-->
                         <!--type="daterange"-->
                         <!--range-separator="至"-->
                         <!--:picker-options="pickerOptions2"-->
                         <!--start-placeholder="开始日期"-->
                         <!--end-placeholder="结束日期"-->
                         <!--@change="selectTimeQuantum">-->
                     <!--</el-date-picker>-->
                     <!--<el-select v-model="quantumFlowCurr" class="flowKind" @change="selectKindQuantum">-->
                         <!--<el-option-->
                             <!--v-for="item in totalFlowOption"-->
                             <!--:key="item.value"-->
                             <!--:label="item.label"-->
                             <!--:value="item.value">-->
                         <!--</el-option>-->
                     <!--</el-select>-->
                 </div>
                 <div id="totalFlow" class="chartContent">

                 </div>
             </div>
         </div>
         <div class="flowRight">
             <div class="flowRTop">
                 <img src="../../../static/img/xh-corner.png" alt="">
                 <h3>景区总客流环比</h3>
                 <div class="selectItem">
                     <!--<el-date-picker-->
                         <!--v-model="currquantumTime"-->
                         <!--type="daterange"-->
                         <!--range-separator="至"-->
                         <!--start-placeholder="开始日期"-->
                         <!--end-placeholder="结束日期"-->
                     <!--@change="selectTimeTrip">-->
                     <!--</el-date-picker>-->
                     <el-select v-model="tripFlowCurr" class="flowKind" @change="selectKindTrip">
                         <el-option
                             v-for="item in totalFlowOption"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                         </el-option>
                     </el-select>
                 </div>
                 <div id="tripFlow" class="chartContent">

                 </div>
             </div>
             <div class="flowRBottom">
                 <img src="../../../static/img/xh-corner.png" alt="">
                 <h3>总客流统计</h3>
                 <div class="selectItem">
                     <!--<el-date-picker-->
                         <!--v-model="currtotalTime"-->
                         <!--type="daterange"-->
                         <!--range-separator="至"-->
                         <!--start-placeholder="开始日期"-->
                         <!--end-placeholder="结束日期"-->
                         <!--@change="selectTimeTotal">-->
                     <!--</el-date-picker>-->
                     <el-select v-model="totalFlowCurr" class="flowKind" @change="selectKindtotal">
                         <el-option
                             v-for="item in totalFlowOption"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                         </el-option>
                     </el-select>
                 </div>
                 <div id="totalFlowPass" class="chartContent">

                 </div>
             </div>
         </div>
    </div>
</template>

<script>
    import api from "@/api"
    export default {
        name: "passenger-flow",
        data(){
            return{
                realTimeFlowNum:784511,
                pickerOptions2: {
                    shortcuts: [{
                        text: '当天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个季度',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    },{
                        text: '最近一年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                totalFlowNum:784511,
                totalFlowCurr:'最近一年',
                realFlowCurr:'当日',
                quantumFlowCurr:'最近一周',
                tripFlowCurr:'本周',
                currtotalTime:'',
                currTripTime:'',
                currquantumTime:'',
                currLengent:'本周',
                lastLengent:'上一周',
                totalFlowOption:[
                    {value: 'year', label: '最近一年'},
                    {value: 'quarter', label: '最近季度'},
                    {value: 'month', label: '最近一月'},
                    {value: 'week', label: '最近一周'},
                    {value: 'day', label: '当日'}
                ],
                totalFlowDom:null,
                tripFlowDom:null,
                realpassDom:null,
                totalFlowData:{
                    data:[
                        {name:'18:00',value:120},
                        {name:'17:00',value:140},
                        {name:'16:00',value:150},
                        {name:'15:00',value:200},
                        {name:'14:00',value:230},
                        {name:'13:00',value:300},
                        {name:'12:00',value:320},
                        {name:'11:00',value:350},
                        {name:'10:00',value:410},
                        {name:'9:00',value:450},
                    ],
                    // data:['120','140','150','200','230','300','320','350','410','450'],
                    legent:["18:00","17:00","16:00","15:00","14:00","13:00","12:00","11:00","10:00","9:00"],
                },
                tripFlowData:{
                    lastWeek:[900,500,1300,1450,1400,1150,1350,900,500,1050,1050,600,300,1200],
                    currWeek:[750,500,1000,600.1150,600,1200,600,700,1400,1200,600,1450],
                    legent:["西湖","断桥","岳王庙","黄龙洞","宝石山","鼓楼","三公园","胡雪岩故居","湖滨公园","三潭印月"],
                },
                carData:{
                    carTime:['06-01', '06-02', '06-03', '06-04', '06-05', '06-06', '06-07', '06-08', '06-09', '06-10', '06-11', '06-12', '06-13', '06-14', '06-15'],
                    carNumber:[0, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122, 89, 112, 34]
                },
            }
        },
        methods:{
            init(){
                this.realTimeFlow();
                this.totalFlow();
                this.totalInfo();
                this.tripFlow();
                this.realpassFlow()
            },
            // selectTimeTrip(val){
            //     console.log(val,'************')
            //     if(val){
            //         this.tripFlowCurr = '';
            //     }
            //     let startTime = this.formatDate(val[0]);
            //     let endTime = this.formatDate(val[1]);
            // },
            // selectTimeQuantum(val){
            //     console.log(val,'************')
            //     if(val){
            //         this.quantumFlowCurr = '';
            //     }
            //     let startTime = this.formatDate(val[0]);
            //     let endTime = this.formatDate(val[1]);
            //
            // },
            // selectTimeTotal(val){
            //     console.log(val,'************')
            //     if(val){
            //         this.totalFlowCurr = '';
            //     }
            //     let startTime = this.formatDate(val[0]);
            //     let endTime = this.formatDate(val[1]);
            //
            // },
            formatDate(date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            selectKindQuantum(val){
                 console.log(val,"@@@@@@@@@@@@@@@@@@@@@@@@@")
                this.totalInfo()
            },
            selectKindReal(val){
                console.log(val,"@@@@@@@@@@@@@@@@@@@@@@@@@")
                this.totalFlow()
            },
            selectKindtotal(val){
                this.currtotalTime='';
                console.log(val,"@@@@@@@@@@@@@@@@@@@@@@@@@")
                this.realpassFlow()
            },
            selectKindTrip(val){
                console.log(val,"@@@@@@@@@@@@@@@@@@@@@@@@@")
                if(val == 'day'){
                   this.currLengent = '当天';
                   this.lastLengent = '前一天'

                }else if(val == 'month'){
                    this.currLengent = '本月';
                    this.lastLengent = '上一月'
                }else if(val == 'week'){
                    this.currLengent = '本周';
                    this.lastLengent = '上一周'
                }else if(val == 'year'){
                    this.currLengent = '本年';
                    this.lastLengent = '上一年'
                }else{
                    this.currLengent = '本季度';
                    this.lastLengent = '上一季度'
                }
                this.tripFlow()
            },
           async realTimeFlow(){
                // await api.passFlowAnalysis.realPassFlow().then(res=>{
                //     let count = 0;
                //      for(let i=0;i<res.total.length;i++){
                //          count += res.total[i].stayCount;
                //      }
                //     this.realTimeFlowNum = count;
                //     let arr = this.realTimeFlowNum.toString().split('').reverse();
                //     let currArr = [];
                //     for(let i=0;i<arr.length;i++){
                //         if((i == 3 || i == 6 || i == 9) && i<arr.length-1){
                //             currArr.push('、')
                //         }
                //         currArr.push(arr[i])
                //     }
                //     currArr = currArr.reverse();
                //     this.realTimeFlowNum = currArr.join('');
                //     console.log(res,"实时客流量")
                //     console.log(count,"实时客流量")
                // })
               this.realTimeFlowNum = 784511;
               let arr = this.realTimeFlowNum.toString().split('').reverse();
               let currArr = [];
               for(let i=0;i<arr.length;i++){
                   if((i == 3 || i == 6 || i == 9) && i<arr.length-1){
                       currArr.push('、')
                   }
                   currArr.push(arr[i])
               }
               currArr = currArr.reverse();
               this.realTimeFlowNum = currArr.join('');
               setTimeout(() => {
                   let route = this.$route.path
                   if (route.includes('passengerFlow')) {
                       this.realTimeFlow();//长轮询
                   }
                   console.log(route,"@@@@@@@@@@$$$$$$$$$$")
               },5000)


            },
            totalFlow(){
                // this.totalFlowNum = 784511;
                let arr = this.totalFlowNum.toString().split('').reverse();
                let currArr = [];
                for(let i=0;i<arr.length;i++){
                    if((i == 3 || i == 6 || i == 9) && i<arr.length-1){
                        currArr.push('、')
                    }
                    currArr.push(arr[i])
                }
                currArr = currArr.reverse();
                this.totalFlowNum = currArr.join('');
            },
            totalInfo(){
                this.totalFlowDom = this.$echarts.init(document.getElementById("totalFlow"));
                let option = {
                    grid: {
                        top:'5%',
                        left: '4%',
                        right: '6%',
                        bottom: '6%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}<br/>{c}"
                    },
                    xAxis: [
                        {
                            type: 'value',

                            axisLine: {
                                lineStyle:{
                                    color:'rgba(1,245,255,0.3)'
                                }
                            },
                            axisLabel:{
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine:{
                                show:true,
                                lineStyle:{
                                    color:'rgba(1,245,255,0.3)'
                                }
                            },
                            axisTick:{
                                inside:true
                            }
                        },
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle:{
                                    color:'rgba(1,245,255,0.3)'
                                }
                            }
                        },
                    ],
                    yAxis: {
                        type: 'category',
                        data: this.totalFlowData.legent,
                        axisLine: {
                            lineStyle:{
                                color:'rgba(8,99,130,0.3)'
                            }
                        },
                        axisLabel:{
                            textStyle: {
                                color: '#01e4ff'
                            }
                        },
                        splitLine:{
                            show:false,
                        },
                        axisTick:{
                            show:false
                        }
                    },
                    series: [
                        {
                            type:'bar',
                            data:this.totalFlowData.data,
                            barWidth:'15',

                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color:'#00f7f9',
                                    barBorderRadius: [0,5,5,0]
                                }
                            },
                        }
                    ],
                    color:['#00bfff','#10ca8a','#3084ff','#ffea00','#9a03ff']
                };
                this.totalFlowDom.setOption(option);
            },
            tripFlow(){
                this.tripFlowDom = this.$echarts.init(document.getElementById("tripFlow"));
                let option = {
                    grid: {
                        top:'10%',
                        left: '6%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        borderColor:'#207c8b',
                        borderWidth:1,
                        backgroundColor:'#124156',
                        textStyle:{
                            color:'#2fbcc5'
                        },
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#283b56'
                            }
                        },
                        formatter:(name)=>{
                            let currName='';
                            let percentNum = 0;
                            let isUp = '同比上涨';
                            let num = name[0].data-name[1].data;
                            currName = name[0].axisValue+"\n";
                            percentNum = ((num/name[1].data)*100).toFixed(0)
                             if(num>0){
                                 isUp = '同比上涨';
                             }else{
                                 isUp = '同比下降';
                             }
                            return currName+isUp+Math.abs(percentNum)+'%';
                        }
                    },
                    legend: {
                        show:true,
                        left:'center',
                        textStyle:{
                            color:'#01e4ff'
                        },
                    },
                    dataZoom: {
                        show: false,
                        start: 0,
                        end: 100
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            axisLine: {
                                lineStyle:{
                                    color:'rgba(1,245,255,0.3)'
                                }
                            },
                            axisLabel:{
                                interval:0,
                                // formatter:function(value){
                                //     var ret = "";//拼接加\n返回的类目项
                                //     var maxLength = 3;//每项显示文字个数
                                //     var valLength = value.length;//X轴类目项的文字个数
                                //     var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                                //     if (rowN > 1)//如果类目项的文字大于3,
                                //     {
                                //         for (var i = 0; i < rowN; i++) {
                                //             var temp = "";//每次截取的字符串
                                //             var start = i * maxLength;//开始截取的位置
                                //             var end = start + maxLength;//结束截取的位置
                                //             //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                //             temp = value.substring(start, end) + "\n";
                                //             ret += temp; //凭借最终的字符串
                                //         }
                                //         return ret;
                                //     }
                                //     else {
                                //         return value;
                                //     }
                                // },
                                textStyle: {
                                    color: '#01e4ff'
                                }
                            },
                            splitLine:{
                                show:true,
                                lineStyle:{
                                    color:'rgba(1,245,255,0.3)'
                                }
                            },
                            axisTick:{
                                show:false
                            },
                            data: this.tripFlowData.legent,
                        },
                        {
                            type: 'category',
                            show:false,
                            boundaryGap: true,
                            axisLine: {
                                lineStyle:{
                                    color:'rgba(1,245,255,0.3)'
                                }
                            },
                            axisLabel:{
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine:{
                                show:false,
                                lineStyle:{
                                    color:'rgba(1,245,255,0.3)'
                                }
                            },
                            axisTick:{
                                show:false
                            },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            scale: true,
                            min: 0,
                            boundaryGap: [0.2, 0.2],
                            axisLine: {
                                lineStyle:{
                                    color:'rgba(1,245,255,0.3)'
                                }
                            },
                            axisLabel:{
                                textStyle: {
                                    color: '#01e4ff'
                                }
                            },
                            splitLine:{
                                show:true,
                                lineStyle:{
                                    color:'rgba(1,245,255,0.3)'
                                }
                            },
                            axisTick:{
                                show:false
                            }
                        },
                        {
                            type: 'value',
                            scale: true,
                            min: 0,
                            boundaryGap: [0.2, 0.2],
                            axisLine: {
                                lineStyle:{
                                    color:'rgba(8,99,130,0.3)'
                                }
                            },
                            axisLabel:{
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            splitLine:{
                                show:true,
                                lineStyle:{
                                    color:'rgba(8,99,130,0.3)'
                                }
                            },
                            axisTick:{
                                show:false
                            }
                        }
                    ],
                    series: [
                        {
                            name:this.currLengent,
                            type:'line',
                            data:this.tripFlowData.currWeek,
                            itemStyle: {
                                normal: {
                                    color:'#ffca19'
                                }
                            },
                        },
                        {
                            name:this.lastLengent,
                            type:'line',
                            data:this.tripFlowData.lastWeek,
                            itemStyle: {
                                normal: {
                                    color: '#01e1ec'
                                }
                            },
                        },
                    ]
                };
                this.tripFlowDom.setOption(option);
            },
            realpassFlow(){
                this.realpassDom = this.$echarts.init(document.getElementById('totalFlowPass'))
                this.realpassDom.setOption({
                    grid: {
                        top:'5%',
                        left: '6%',
                        right: '6%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        borderColor:'#207c8b',
                        borderWidth:1,
                        backgroundColor:'#124156',
                        textStyle:{
                            color:'#2fbcc5'
                        },
                        axisPointer: {
                            lineStyle: {
                                color: '#ffca19'
                            },
                            label:{
                                width:10,
                                height:10,
                                color:'#ffca19'
                            }
                        },
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle:{
                                color:'rgba(1,245,255,0.3)'
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        data: this.carData.carTime
                    }],
                    yAxis: [{
                        type: 'value',
                        axisTick: {
                            show: true,
                            inside:true,
                            lineStyle:{
                                width:4,
                                color:'#01e4ff'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(1,245,255,0.3)'
                            }
                        },
                        axisLabel: {
                            margin: 10,
                            textStyle: {
                                fontSize: 14
                            }
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                color:'rgba(1,245,255,0.3)'
                            }
                        },
                    },
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#rgba(1,245,255,0.3)'
                                }
                            },
                        }
                    ],
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
                                color: 'rgba(255,202,25,1)',
                                borderWidth: 12,
                                shadowBlur:20,
                                shadowColor:'#867753'

                            }
                        },
                        lineStyle:{
                            color: 'rgba(255,202,25,0)',
                        },
                        data: this.carData.carNumber
                    }]
                })
            }
        },
        mounted(){
            // let route = this.$route.path;
            // console.log(route,"!!!!!!!!!!!!!!!!lishan")
            // if(route === "/dataVisualization/passengerFlow"){
            //     setInterval(()=>{
            //         this.realTimeFlow();
            //     },5000)
            // }
           this.init();
           setTimeout(()=>{
               this.totalFlowDom.resize();
               this.realpassDom.resize();
           },300)
        },
        created(){

        }
    }
</script>
<style lang="scss" type="text/scss" >
    .passengerFlow{
        .el-select{
            width: 85px;
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
            width: 240px;
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
    }
</style>
<style lang="scss" type="text/scss" scoped>
  .passengerFlow{
      width:100%;
      height: 100%;
      display: flex;
      .flowLeft{
          width: 480px;
          height: 100%;
          margin: 0 5px 0 10px;
          display: flex;
          flex-direction: column;
          .flowLTop{
              width: 100%;
              height: 120px;
              margin-bottom: 15px;
              display: flex;
              justify-content: space-between;
              .realTimeFlow{
                  width: 50%;
                  border: 1px solid #01f5ff;
                  margin-right: 15px;
                  p{
                      width: 100%;
                      height: 55px;
                      line-height: 55px;
                      font-size: 24px;
                      color: #f9ca1a;
                      text-indent: 30px;
                      margin-top: 20px;
                      span{
                          display: inline-block;
                          font-size: 16px;
                          color: #01f5ff;
                          text-indent: 0px;
                      }
                  }
                  .flowTitle{
                      display: block;
                      font-size: 16px;
                      text-indent: 30px;
                      color: #01f5ff;
                  }
              }
              .totalFlow{
                  width: 50%;
                  border: 1px solid #01f5ff;
                  position: relative;
                  .flowKind{
                    position: absolute;
                      top: 0px;
                      right: 5px;
                  }
                  p{
                      width: 100%;
                      height: 55px;
                      line-height: 55px;
                      font-size: 24px;
                      color: #f9ca1a;
                      text-indent: 30px;
                      margin-top: 20px;
                      span{
                          display: inline-block;
                          font-size: 16px;
                          color: #01f5ff;
                          text-indent: 0px;
                      }
                  }
                  .flowTitle{
                      display: block;
                      font-size: 16px;
                      text-indent: 30px;
                      color: #01f5ff;
                  }
              }
          }
          .flowLBottom{
              flex: 1;
              border: 1px solid #01f5ff;
              position: relative;
              display: flex;
              flex-direction: column;
              img{
                  position: absolute;
                  left: 0;
                  top: 0;
              }
              h3{
                  width: 200px;
                  text-indent: 5px;
                  line-height: 30px;
                  color: #01f5ff;
              }
              .selectItem{
                  width: 300px;
                  position: absolute;
                  top: 0;
                  right: 0;
                  display: flex;
                  .flowKind{
                      position: absolute;
                      top: 0px;
                      right: 5px;
                  }
              }
              .chartContent{
                  flex: 1;
                  margin-top: 15px;
              }
          }
      }
      .flowRight{
          flex: 1;
          height: 100%;
          margin: 0 5px 0 10px;
          display: flex;
          flex-direction: column;
          .flowRTop{
              width: 100%;
              height: 340px;
              margin-bottom: 15px;
              border: 1px solid #01f5ff;
              position: relative;
              display: flex;
              flex-direction: column;
              img{
                  position: absolute;
                  left: 0;
                  top: 0;
              }
              h3{
                  width: 200px;
                  text-indent: 20px;
                  line-height: 30px;
                  color: #01f5ff;
              }
              .chartContent{
                  flex: 1;
                  /*margin-top: 15px;*/
              }
              .selectItem{
                  width: 300px;
                  position: absolute;
                  top: 0;
                  right: 0;
                  display: flex;
                  z-index: 20;
                  .flowKind{
                      position: absolute;
                      top: 0px;
                      right: 5px;
                  }
              }

          }
          .flowRBottom{
              flex: 1;
              border: 1px solid #01f5ff;
              position: relative;
              display: flex;
              flex-direction: column;
              img{
                  position: absolute;
                  left: 0;
                  top: 0;
              }
              h3{
                  width: 200px;
                  height: 30px;
                  text-indent: 20px;
                  line-height: 30px;
                  color: #01f5ff;
              }
              .chartContent{
                  flex: 1;
                  margin-top: 15px;
              }
              .selectItem{
                  width: 300px;
                  position: absolute;
                  top: 0;
                  right: 0;
                  display: flex;
                  .flowKind{
                      position: absolute;
                      top: 0px;
                      right: 5px;
                  }
              }
          }
      }

  }
</style>
