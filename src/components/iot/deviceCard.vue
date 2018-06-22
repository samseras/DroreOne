<template>
    <div class="device-card">
        <el-row class="myrow" :gutter="16">
            <el-col :span="6" v-for="(o, index) in selectDatas" :key="o.name"   class="mycol">
                <el-card   class="mycard">
                    <img src="../../../static/img/iot/东区.png" class="image">
                    <!-- <img :src="'../../../static/img/iot/'+o.areaName+'.png'" class="image">-->
                    <!--<img :src="'../../../static/img/iot/'+o.type+'.svg'" class="icons">-->
                    <div  class="card-bottoms">
                        <span v-if="o.attributes.label">名称：{{o.attributes.label}}</span>
                        <div class="bottom">
                            <p>mac：{{o.mac}}</p>
                            <p>状态：{{o.status}}</p>
                            <p><el-button
                                type="primary"
                                @click.stop="editCard(o,index)"
                                size="mini">编辑</el-button></p>
                            <el-switch
                                v-model="o.switchValue"
                                @change="changeStatus($event,index,o.id)"
                                active-text="启动"
                                inactive-text="停止">
                            </el-switch>
                            <!-- <p>
                                 <el-row>
                                     <el-button size="mini" type="primary" @click="sendHeart(index)">发起心跳</el-button>
                                     <el-button size="mini" type="primary" @click="collectData(index)">数据采集</el-button>
                                 </el-row>
                             </p>-->
                        </div>
                        <div class="more moreBtn">
                            <template>
                                <el-button type="text" @click="showOuterMore(o,index)" class="details">详情>></el-button>
                            </template>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="more more-detail">
            <el-dialog title="设备详情信息" :visible.sync="outerVisible" class="detail-dialog">
                <el-tabs type="border-card" v-model="activeTabNames"  @tab-click="handleTabClicks">
                    <el-tab-pane label="属性状态" name="attributeTab">

                        <div class="top-part clearfix" v-if="outerVisible">
                            <div class="equipment">
                                <div class="small-title clearfix">
                                    <div class="photo">
                                        <!--<img :src="'../../../static/img/iot/'+signalObj.areaName+'.png'" alt="">-->
                                        <img src="../../../static/img/iot/东区.png" alt="">
                                    </div>
                                    <div class="name" v-if="signalObj.name!==''">
                                        <!-- <h2>{{signalObj.name}}</h2>
                                         <h5>xx景区</h5>-->
                                        <div class="elseInfo">
                                            <ul>
                                                <li v-for="(item,i) in detailObj"><span>{{item.label}}：</span><span>{{item.name}}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="name" v-else="signalObj.name!==''">
                                        <h2>{{signalObj.status}}</h2>
                                        <h5>xx景区</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="progressSHow">
                            <h3>最新事件</h3>
                            <div class="stepBar">
                                <div style="height: 450px;">
                                    <el-steps direction="vertical" :active="1" >
                                        <el-step v-for="(item,i) in eventStepData"  icon="el-icon-time"  status="process" :title="item.createTime" :description="item.content"></el-step>
                                    </el-steps>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="数据采集" name="dataPickTab">
                        <div class="machineLog">
                            <h2></h2>
                            <div class="data-flow eventsAlerm">
                                <div class="small-header clearfix">
                                    <div class="page">
                                        <el-pagination
                                            @size-change="handleSizeChangePick"
                                            @current-change="handleCurrentChangePick"
                                            :current-page="pickCurPage"
                                            background
                                            :page-sizes="[20,50, 100, 300, 400]"
                                            :page-size="20"
                                            layout="total, prev, pager, next, jumper"
                                            :total="allPickNum">
                                        </el-pagination>
                                    </div>
                                </div>
                                <div class="body">
                                    <template>
                                        <el-table
                                            :data="pickTableData"
                                            height="450"
                                            style="width: 100%">
                                            <el-table-column
                                                v-for="col in pickCols"
                                                show-overflow-tooltip
                                                :prop="col.name"
                                                :label="col.label" >
                                            </el-table-column>
                                            <el-table-column label="采集">
                                            <template slot-scope="scope">
                                                <el-button
                                                    size="mini"
                                                    type="primary"
                                                    @click="handleTablePick(scope.row)">采集</el-button>
                                            </template>
                                        </el-table-column>
                                        </el-table>
                                    </template>
                                </div>
                            </div>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="事件告警" name="eventPoliceTab">
                        <div class="data-flow eventsAlerm">
                            <div class="small-header clearfix">
                                <div class="block">
                                    <el-date-picker
                                        @change="timeSelect"
                                        value-format="yyyy-MM-dd"
                                        v-model="valueTime"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions">
                                    </el-date-picker>
                                </div>
                                <div class="page">
                                    <el-pagination
                                        @size-change="handleSizeChangeAlerm"
                                        @current-change="handleCurrentChangeAlerm"
                                        :current-page="alermCurPage"
                                        background
                                        :page-sizes="[20,50, 100, 300, 400]"
                                        :page-size="20"
                                        layout="total, prev, pager, next, jumper"
                                        :total="allAlermNum">
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="body">
                                <template>
                                    <el-table
                                        :data="alermTableData"
                                        height="320"
                                        style="width: 100%">
                                        <el-table-column
                                            v-for="col in alermCols"
                                            show-overflow-tooltip
                                            :prop="col.name"
                                            :label="col.label" >
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </div>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="设备监控" name="logTab" >  <!--动态图-->
                        <div class="data-flow">
                            <div class="small-header clearfix">
                                <div class="page">
                                    <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="monitorCurPage"
                                        background
                                        :page-sizes="[20,50, 100, 300, 400]"
                                        :page-size="20"
                                        layout="total, prev, pager, next, jumper"
                                        :total="allMonitorNum">
                                    </el-pagination>
                                </div>
                            </div>
                            <div class="body">
                                <template>
                                    <el-table
                                        :data="tableData"
                                        height="320"
                                        style="width: 100%">
                                        <el-table-column
                                            v-for="col in cols"
                                            show-overflow-tooltip
                                            :prop="col.name"
                                            :label="col.label" >
                                        </el-table-column>
                                        <!--<el-table-column label="操作">
                                            <template slot-scope="scope">
                                                <el-button
                                                    size="mini"
                                                    type="primary"
                                                    @click="handleTableEdit(scope.row)">编辑</el-button>
                                            </template>
                                        </el-table-column>-->
                                    </el-table>
                                </template>
                            </div>
                        </div>
                        <div class="echartWrap">
                            <div id="monitorWrap" class="monitorWrap">

                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="设备认证"  name="qualificationTab">
                        <p class="edit-qualification" v-for="item in qualificationEditInfo">
                            <span>{{item.label}}</span>

                            <el-input v-model="item.name"></el-input>
                            <!--<el-input v-model="item.prop":disabled="!item.isDisabled"></el-input>-->
                        </p>
                        <el-button @click="saveQualification">去认证</el-button>

                    </el-tab-pane>

                </el-tabs>


                 <el-dialog
                     class="inner-dialog"
                     width="40%"
                     title="采集信息详情"
                     :visible.sync="innerVisible"
                     append-to-body>
                     <ul class="pick-info-detail">
                         <li v-for="(item) in pickSignalInfo" >
                             {{item.name}}：{{item.key}}
                         </li>
                     </ul>
                 </el-dialog>
                 <div slot="footer" class="dialog-footer">
                     <el-button @click="outerVisible = false">取 消</el-button>
                     <!--<el-button type="primary" @click="showInnerMore(o,index)">打开内层 Dialog</el-button>-->
                 </div>
            </el-dialog>
        </div>
        <IotDialog
            v-if="showDialog"
            :showDialog="showDialog"
            @cancelEvent="cancel"
            @saveEvent="saveEdit"
            :detailEditInfo="detailEditInfo"
            :editData="editData">
        </IotDialog>
    </div>
</template>

<script>
    import { mapGetters} from 'vuex'
    import IotDialog from './iotDialog'
    import api from '@/api'
    export default {
        name: "deviceCard",
        props:['curPage','searchInfo','allData'],
        data() {
            return {
                alermTableData:[],
                /***详情标签页数据***/
                pickSignalInfo:[],
                horizontalData:[],
                zongData:[],
                tableData:[],
                alermTable:[],
                pickTableData:[],
                cols:[],
                alermCols:[],
                pickCols:[],
                pickCurPage:1,
                alermCurPage:1,
                monitorCurPage:1,
                monitorPageSize:20,
                pickPageSize:20,
                alermPageSize:20,
                allMonitorNum:100,
                allAlermNum:100,
                allPickNum:100,
                pickerOptions: {
                    shortcuts: [{
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
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                valueTime: '',
                /***详情标签页数据***/
                activeTabNames:'attributeTab',
                editData:{},  //列表
                showDialog:false,
                tableData3: [],
                multipleSelection: [],
                eventStepData:[],


                activeTabName:'1',
                signalObj:{},
                arrDatas:[],
                curPageMy:1,
                pageSizesMy:20,
                selectDatas:[],
                route: '',
                outerVisible: false,
                innerVisible: false,
                category:'',
                detailEditInfo:[], //卡片
                detailObj:[],  //暂存
                qualificationInfo:[],  //设备认证标签的可编辑信息
                qualificationEditInfo:[]  //可编辑的认证信息


            }
        },
        created () {
            this.route = this.$route.path;
            this.selectDatas=[];
            console.log(this.selectDatas);
            //console.log(this.$store.getters.getCurPage)
        },
        computed:{
            //console.log(this.$store.getters.getCurPage)
        },
        watch: {
            '$route'(){
                this.route = this.$route.path
            },
            /*searchInfo(x,y){
                if (x !== '') {
                    this.selectDatas = this.selectDatas.filter(item => {
                        if (item.status.includes(x)) {
                            return item
                        }
                    })
                } else {
                    alert('333');
                    this.selectDatas=;
                }
            },*/
            curPage(news,olds){
                this.curPageMy=news;
                //前端分页
                /* this.selectDatas=this.arrDatas.slice((this.curPageMy-1)*this.pageSizesMy,this.curPageMy*this.pageSizesMy);
                 //字符串转为对象
                 let len=this.selectDatas.length;
                 for(let i=0;i<len;i++){
                     if(typeof (this.selectDatas[i].attributes)==='string'){  //当此属性为json字符串时解析为对象
                         (this.selectDatas)[i].attributes=JSON.parse(this.selectDatas[i].attributes);
                     }
                 }*/
            },
            allData(news,olds){
                this.selectDatas=news;

                //前端分页
                /*this.selectDatas=this.arrDatas.slice((this.curPageMy-1)*this.pageSizesMy,this.curPageMy*this.pageSizesMy);
                //字符串转为对象
                let len=this.selectDatas.length;
                for(let i=0;i<len;i++){
                    (this.selectDatas)[i].attributes=JSON.parse(this.selectDatas[i].attributes);
                }*/
            }
        },
        components: {
            IotDialog
        },
        methods:{
            timeSelect(){  //事件告警时间范围选择
                console.log(this.valueTime,'哈哈哈哈哈哈哈');
                //查询设备报警信息
                api.iotHome.DeviceAlermInfo(this.alermCurPage,this.curId,this.valueTime[0],this.valueTime[1]).then(res=>{
                    console.log(res,'分页传回的报警事件信息');
                    this.alermCols=res.pageData.cols;
                    this.alermTableData=res.pageData.tableDatas;
                    console.log(this.alermTableData,'我的测试');
                    this.allAlermNum=res.pageCondition.allcount;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            handleTablePick(row){
                console.log(row,'采集');
                let eventid=row.id;
                this.pickSignalInfo=[];
                api.iotHome.DataPickInfo(eventid).then(res=>{
                    console.log(res,'传回的采集详情信息');
                    let tempres=JSON.parse(res);
                    console.log(tempres.data);
                    tempres.data.forEach((item)=>{
                        Object.keys(item).forEach((key,i)=>{
                            let obj={};
                            console.log(key);
                            obj.key=item[key];
                            obj.name=key;
                            this.pickSignalInfo.push(obj);
                            console.log(this.pickSignalInfo);
                        })
                    })
                    //this.pickSignalInfo=tempres.data;
                    //console.log( this.pickSignalInfo,' this.pickSignalInfo');
                    this.innerVisible = true;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            handleSizeChangePick(val){
                this.pickPageSize=val;
            },
            handleSizeChangeAlerm(val){
                this.alermPageSize=val;
            },
            handleSizeChange(val){
                this.monitorPageSize=val;
                console.log(this.monitorPageSize);
            },
            handleCurrentChangePick(val){
                this.pickCurPage=val;
                //查询数据采集列表信息
                api.iotHome.DevicePickInfo(this.pickCurPage,this.curId).then(res=>{
                    console.log(res,'分页传回的数据采集列表信息');
                    this.pickCols=res.pageData.cols;
                    this.pickTableData=res.pageData.tableDatas;
                    this.allPickNum=res.pageCondition.allcount;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            handleCurrentChangeAlerm(val){
                this.alermCurPage=val;
                //查询设备报警信息
                api.iotHome.DeviceAlermInfo(this.alermCurPage,this.curId).then(res=>{
                    console.log(res,'分页传回的报警事件信息');
                    this.alermCols=res.pageData.cols;
                    this.alermTableData=res.pageData.tableDatas;
                    console.log(this.alermTableData,'我的测试');
                    this.allAlermNum=res.pageCondition.allcount;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            handleCurrentChange(val){
                this.monitorCurPage=val;
                console.log(this.monitorCurPage);
                //查询设备监控状态信息
                api.iotHome.DeviceMonitorInfo(this.monitorCurPage,this.curId).then(res=>{
                    console.log(res,'分页传回的设备监控状态信息');
                    this.cols=res.pageData.cols;
                    this.tableData=res.pageData.tableDatas;
                    this.allMonitorNum=res.pageCondition.allcount;

                    this.horizontalData=[];
                    this.zongData=[];
                    res.pageData.tableDatas.forEach(item=>{
                        this.horizontalData.push(item.modifyTime);
                        this.zongData.push(item.currentStatus);
                    })
                    //console.log(this.horizontalData);
                    //console.log(this.zongData);
                    let zongStr=this.zongData.join(',');
                    let a=zongStr.replace(/WORKING/g, "1");
                    let b=a.replace(/CONFIG/g, "0");
                    let c=b.replace(/OFFLINE/g, "0");
                    let d=c.split(',');
                    console.log(d);
                    this.zongData=d.map(Number);

                    this.loadMonitorEchart();
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            loadMonitorEchart(){
                //记载echarts时序图
                this.$nextTick(function(){
                    //console.log(document.getElementById('monitorWrap'), 'opopopopopopopo')
                    let chartBox = document.getElementsByClassName('echartWrap')[0]
                    let myChart = document.getElementById('monitorWrap')
                    // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
                    function resizeCharts () {
                        myChart.style.width = chartBox.style.width + 'px'
                        myChart.style.height = chartBox.style.height + 'px'
                    }
                    // 设置容器高宽
                    resizeCharts()
                    let option1 = {
                        legend: {
                            data:['1表示WORKING  0表示OFFLINE/CONFIG']
                        },
                        grid: {
                            //left: '10%',
                            bottom:'35%',
                            top:'20%'
                        },
                        xAxis: {
                            type: 'category',
                            //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            data: this.horizontalData,
                            axisLabel:{
                                //X轴刻度配置
                                rotate:40,
                                interval:0,    //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                            },
                        },
                        yAxis: {
                            type: 'value',
                            min:0,
                            max:1,
                            splitNumber:1
                        },
                        series: [{
                            name:'1表示WORKING  0表示OFFLINE/CONFIG',
                            //data: [0, 1, 0, 1, 1, 0, 1],
                            data: this.zongData,
                            type: 'line',
                            itemStyle : {
                                normal : {
                                    color:'#e4353c',
                                    lineStyle:{
                                        color:'#98FF80'
                                    }
                                }
                            },
                        }]
                    };
                    let maiChart = this.$echarts.init(document.getElementById('monitorWrap'));
                    //console.log(maiChart,'mainchart');
                    maiChart.setOption(option1);
                    //console.log(document.getElementById('monitorWrap'), '111opopopopopopopo');

                })
            },

            handleTabClicks(tab, event){
                console.log('333333:',tab, event);

                if(tab.name==="logTab"){
                    this.loadMonitorEchart();

                }else if(tab.name==='eventPoliceTab'){

                }
            },
            saveEdit(val){  //卡片编辑
                console.log(val);
                this.showDialog=false;
                api.iotHome.editDeviceCardInfo(val).then(res=>{
                    console.log(res,'这是编辑后传回来的设备卡片信息')
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            editCard(o,i){
                this.showDialog=true;
                console.log(i,o);
                this.editData=o;
                let id=o.id;
                //console.log(this.editData);
                //调取可编辑的信息
                api.iotHome.getDeviceEditInfo(id).then(res=>{
                    console.log(res,'这是传回来的可编辑信息');
                    this.detailEditInfo=res;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            cancel(){
                this.showDialog=false;
            },
            handleTableEdit(index, row) {
                console.log(index, row);
            },
            handleTableDelete(index, row) {
                console.log(index, row);
            },
            formatterLogTable(row, column) {
                return row.address+'哈哈 ';
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val);
            },
            //...mapGetters(['getCurPage']),
            changeStatus (boolean,index,id) {
                console.log(boolean);
                console.log(index);
                //调一次接口
                api.iotHome.setDeviceStatusInfo(id).then(res=>{
                    console.log(res,'这是传回来的设备状态信息')
                }).catch(err=>{
                    console.log(err,'失败')
                })
                //查询一次新状态
            },
            sendHeart(i){
                console.log(i);
            },
            collectData(i){
                console.log(i);
            },
            showOuterMore(o,index){
                console.log(99999999999999999999999999999999999999)
                this.outerVisible = true;
                 this.detailObj=[];
                this.qualificationEditInfo=[];

                 console.log(index,o,'这是第几项的详情信息');
                 this.signalObj=o;
                 this.curId=o.id;


                  //查询详情页基础信息
                  api.iotHome.DeviceDetailInfo(this.curId).then(res=>{
                      console.log(res,'这是传回来的设备基础信息');
                      res.fieldInfos.forEach(item=>{
                          Object.keys(res.properties).forEach((key)=>{
                              if(item.name===key){
                                  let obj={};
                                  obj.name=res.properties[key];
                                  obj.label= item.label;
                                  obj.key=item.name;
                                  this.detailObj.push(obj);
                              }
                          })
                      })
                      console.log(this.detailObj,'1111111111111');
                  }).catch(err=>{
                      console.log(err,'失败')
                  })
                  //查询最新十条信息
                  api.iotHome.tenDevicePoliceInfo(this.curId).then(res=>{
                      console.log(res,'这是传回来的十条最新信息');
                      this.eventStepData=res.pageData.tableDatas;
                  }).catch(err=>{
                      console.log(err,'失败')
                  })
                  //查询设备监控状态信息
                  api.iotHome.DeviceMonitorInfo(this.monitorCurPage,this.curId).then(res=>{
                      console.log(res,'传回的设备监控状态信息');
                      this.cols=res.pageData.cols;
                      this.tableData=res.pageData.tableDatas;
                      this.allMonitorNum=res.pageCondition.allcount;

                      this.horizontalData=[];
                      this.zongData=[];
                      res.pageData.tableDatas.forEach(item=>{
                          this.horizontalData.push(item.modifyTime);
                          this.zongData.push(item.currentStatus);
                      })
                      //console.log(this.horizontalData);
                      //console.log(this.zongData);
                      let zongStr=this.zongData.join(',');
                      let a=zongStr.replace(/WORKING/g, "1");
                      let b=a.replace(/CONFIG/g, "0");
                      let c=b.replace(/OFFLINE/g, "0");
                      let d=c.split(',');
                      console.log(d);
                      this.zongData=d.map(Number);


                  }).catch(err=>{
                      console.log(err,'失败')
                  })
                //查询事件报警信息
                api.iotHome.DeviceAlermInfo(this.alermCurPage,this.curId).then(res=>{
                    console.log(res,'传回的事件报警信息');
                    this.alermCols=res.pageData.cols;
                    this.alermTableData=res.pageData.tableDatas;
                    this.allAlermNum=res.pageCondition.allcount;
                }).catch(err=>{
                    console.log(err,'失败')
                })
                //查询数据采集列表信息
                api.iotHome.DevicePickInfo(this.pickCurPage,this.curId).then(res=>{
                    console.log(res,'分页传回的数据采集列表信息');
                    this.pickCols=res.pageData.cols;
                    this.pickTableData=res.pageData.tableDatas;
                    this.allPickNum=res.pageCondition.allcount;
                }).catch(err=>{
                    console.log(err,'失败')
                })
                //设备认证标签页
                api.iotHome.getDeviceQualificationInfo(this.curId).then(res=>{
                    console.log(res,'这是设备认证页面传回来的可编辑信息');
                    res.fieldInfos.forEach(item => {
                        Object.keys(res.properties).forEach( (key, i) => {
                            //console.log(key, '这个是拿过来的对象的键')
                            if (item.name === key) {
                                // this.deviceObj[item.prop] = i
                                // this.deviceObj.label = item.label
                                let obj = {}
                                obj.name = res.properties[key]
                                obj.label = item.label
                                obj.key = item.name
                                this.qualificationEditInfo.push(obj)
                            }
                        });
                    })
                    console.log(this.qualificationEditInfo,'55555555');
                }).catch(err=>{
                    console.log(err,'失败')
                })


                //数据采集列表详细信息查询
                /*api.iotHome.DataPickInfo(this.curId).then(res=>{
                    console.log(res,'传回的数据采集信息');
                    /!*this.alermCols=res.pageData.cols;
                    this.alermTableData=res.pageData.tableDatas;
                    this.allAlermNum=res.pageCondition.allcount;*!/
                }).catch(err=>{
                    console.log(err,'失败')
                })*/



            },
            saveQualification(){
                let finalObj={}
                this.qualificationEditInfo.forEach(item=>{
                    finalObj[item.key]=item.name
                })
                finalObj.id=this.curId;
                api.iotHome.postDeviceQualificationInfo(finalObj).then(res=>{
                    console.log(res,'这是编辑认证提交后的信息')
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            showInnerMore(){


            },


        }
    }
</script>
<style lang="scss" type="text/scss">
    .inner-dialog{   //直接添加到body的dialog
        .pick-info-detail{
            li{
                padding:rem(8) rem(8)
            }
        }
    }
    .device-card{
        .el-button--primary{
            background-color:#14B9D6;
            border-color:#14B9D6;
        }
        .el-switch__label.is-active{
            color:#14B9D6;
        }
        .el-pagination.is-background .el-pager li:not(.disabled):hover{
            color:#14B9D6;
        }
        .el-switch.is-checked .el-switch__core{
            background-color:#14B9D6;
            border-color:#14B9D6;
        }
        .el-button--text{
            color:#14B9D6;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
            color:#14B9D6;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
            color:#14B9D6;
        }
        .myrow{
            .mycol{
                margin-top:1rem;
            }
            .mycard{
                .card-bottoms{
                    padding:rem(14);
                    padding-bottom:0;
                    .moreBtn{
                        text-align:right;
                    }
                }
                .el-card__body{
                    padding-bottom:0;
                }
            }
        }

        .time {
            font-size: rem(13);
            color: #999;
        }
        .bottom {
            margin-top: rem(13);
            line-height: rem(12);
            p{
                margin-top:rem(16);
                margin-bottom:rem(16);
            }
        }
        .button {
            padding: 0;
        }
        .image {
            width: 100%;
            display: block;
        }
        .icons{
            width:rem(25);
            height:rem(25);
            position:absolute;
            top:rem(39);
        }
        div.more{

            .detail-dialog{
                .echartWrap{
                    border:1px solid transparent;
                    width:100%;
                    height:rem(368);
                    margin-top:rem(32);
                    .monitorWrap{
                        width:100%;
                        height:rem(368)
                    }
                    .alertWrap{
                        width:100%;
                        height:rem(368)
                    }
                }
                .edit-qualification{
                    padding:rem(8) rem(8)
                }
                .el-dialog__body{
                    padding:rem(0) rem(20);
                    padding-bottom:rem(24);
                }
                .small-header{
                    border-bottom:1px solid #eee;
                    padding-bottom:rem(8);
                    .block{
                        float:left;
                        margin-top:rem(-5);
                    }
                    .page{
                        margin-right:rem(16);
                        float: right;
                    }
                }
                .status-img{
                    width:100%;
                    height:26rem;
                    border:1px solid greenyellow;
                    .statusWrap{
                        width:200px;
                        height:200px;
                        border:1px solid red;
                        margin:0 auto;
                    }
                }
            }
            .el-dialog{
                width:78%;
                min-height:rem(400);
                background-color:#eee;
                overflow:auto;
            }
            .machineLog{
                width:100%;
                height:rem(512);
                border:1px solid #eee;
                //margin-top:rem(32);
                background-color:#fff;
                h2{
                    margin:rem(16)
                }
                .liItem{
                    margin:rem(16)
                }
                h3{
                    padding:rem(8) 0;
                    font-size: 1rem;
                    color: #606266;
                    font-weight: 600;
                    border-bottom:1px solid #eee;
                    /* text-align:center;*/

                }
            }
            .progressSHow{
                width:100%;
                height:rem(672);
                border:1px solid transparent;
                /* margin-top:rem(32);*/
                background-color:#fff;
                .stepBar{
                    margin:rem(16) auto;
                    width:rem(288);
                }
                h3{
                    padding:rem(8) 0;
                    font-size: 1rem;
                    color: #606266;
                    font-weight: 600;
                    border-bottom:1px solid #eee;
                    text-align:center;

                }
            }
            .top-part{
                width:100%;
                height:rem(300);
                border:1px solid transparent;
                .equipment{
                    float:left;
                    width:100%;
                    border:1px solid transparent;
                    height:rem(336);
                    background-color: #fff;
                    .elseInfo{
                        border:1px solid transparent;
                        width:100%;
                        height:rem(204);
                        ul{
                            height:rem(300);
                            overflow:auto;
                        }
                        li{
                            border-bottom: 1px solid #eee;
                            height: rem(32);
                            padding-top: rem(16);
                            span{
                                display:inline-block;
                                width:25%;
                                text-align:right;
                                overflow:hidden;
                                &:last-child{
                                    color:#ccc;
                                    width:72%;
                                    text-align:left;
                                    text-indent: rem(6);
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;

                                }
                            }
                        }
                    }
                    .small-title{
                        padding-bottom:rem(16);
                        border-bottom:1px solid transparent;
                        .photo{
                            width:45%;
                            float:left;
                            height:rem(320  );

                            img{
                                width:100%;
                                height:100%;
                                border-radius:rem(6);
                            }
                        }
                        .name{
                            width: 51%;
                            float: right;
                            padding-left: 4%;
                            padding-top: rem(16);
                            h2{
                                font-weight:600;
                                font-size:rem(16);
                                margin-bottom: rem(8);
                            }
                        }
                    }
                }

                .data-flow{
                    width:62%;
                    float:right;
                    border:1px solid transparent;
                    height:rem(300);
                    background-color:#fff;
                    padding-left:rem(16);
                    /*overflow:auto;*/
                    h2{
                        font-size: rem(16);
                        color: #606266;
                        font-weight: 600;
                        margin: rem(16);

                    }
                    .tabPane{
                        width:100%;
                        height:rem(192);
                        border:1px solid transparent;
                        overflow:auto;
                        .liItem{
                            padding:rem(9.6) 0;
                            span{
                                background-color: #eee;
                                color: #000;
                                padding: 0  rem(3.2);
                                margin-left: rem(3.2);
                                display: inline-block;
                                font-size: rem(14);
                                border-radius: rem(7);
                            }
                        }
                    }
                }
                .eventsAlerm{
                    height:rem(360);
                    .tabPane{
                        height:rem(260)
                    }
                }
            }
        }

    }
</style>
