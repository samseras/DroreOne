<template>
    <div class="device-card">
        <el-row class="myrow">
            <el-col :span="8" v-for="(o, index) in selectDatas" :key="o.name"   class="mycol">
                <el-card   class="mycard">
                    <img src="../../../static/img/iot/东区.png" class="image">
                    <!-- <img :src="'../../../static/img/iot/'+o.areaName+'.png'" class="image">-->
                    <!--<img :src="'../../../static/img/iot/'+o.type+'.svg'" class="icons">-->
                    <div style="padding: 14px;" class="card-bottoms">
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
                        <div class="more">
                            <template>
                                <el-button type="text" @click="showOuterMore(o,index)">详情>></el-button>
                                <transition name="dialog">
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
                                                                        <li ><span>设备名称：</span><span>{{signalObj.attributes.label}}</span></li>
                                                                        <li ><span>设备IP：</span><span>{{signalObj.attributes.ip}}</span></li>
                                                                        <li ><span>IP地址：</span><span>{{signalObj.attributes.ipAddress}}</span></li>
                                                                        <li><span>服务地址：</span><span>{{signalObj.attributes.serviceUrl}}</span></li>
                                                                        <li><span>设备ID：</span><span>{{signalObj.id}}</span></li>
                                                                        <li ><span>最近检修时间：</span><span>{{signalObj.modifyTime}}</span></li>
                                                                        <li ><span>电话：</span><span>{{signalObj.telephone}}</span></li>
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
                                            </el-tab-pane>
                                            <el-tab-pane label="数据采集" name="dataPickTab">
                                                <div class="machineLog">

                                                    <h2>运行中的数据流</h2>

                                                        <template v-for="(item,i) in tabArr">

                                                                <ul>
                                                                    <li v-for="(liItem,r) in allTab" class="liItem">
                                                                        <el-row>
                                                                            <el-col :span="1"><div class="">{{r+1}}</div></el-col>
                                                                            <el-col :span="5"><div class="">{{liItem.title}}</div></el-col>
                                                                            <el-col :span="7">
                                                                                <div class="badges" >
                                                                                    <span v-for="(badgeItem) in liItem.badge">{{badgeItem}}</span>
                                                                                </div>
                                                                            </el-col>
                                                                            <el-col :span="2"><div class=""></div></el-col>
                                                                            <el-col :span="9"><div class="">
                                                                                <el-progress :text-inside="true" :stroke-width="18" :percentage="liItem.data"></el-progress>
                                                                            </div></el-col>
                                                                        </el-row>
                                                                    </li>
                                                                </ul>

                                                        </template>


                                                </div>
                                            </el-tab-pane>
                                            <el-tab-pane label="事件告警" name="eventPoliceTab">
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
                                            <el-tab-pane label="设备监控" name="logTab">  <!--动态图-->
                                                <div class="data-flow">
                                                    <h3>日志列表</h3>
                                                    <!-- <div>头部信息</div>-->
                                                    <div class="body">
                                                        <template>
                                                            <el-table
                                                                ref="multipleTable"
                                                                :data="tableData3"
                                                                tooltip-effect="dark"
                                                                style="width: 100%"
                                                                height="271"
                                                                @selection-change="handleSelectionChange">
                                                                <el-table-column
                                                                    type="selection"
                                                                    width="55">
                                                                </el-table-column>
                                                                <el-table-column
                                                                    sortable
                                                                    show-overflow-tooltip
                                                                    label="日期"
                                                                    width="120">
                                                                    <template slot-scope="scope">{{ scope.row.date }}</template>
                                                                </el-table-column>
                                                                <el-table-column
                                                                    sortable
                                                                    label="姓名"
                                                                    width="120">
                                                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                                                </el-table-column>
                                                                <el-table-column
                                                                    label="地址"
                                                                    :formatter="formatterLogTable"
                                                                    show-overflow-tooltip>
                                                                    <template slot-scope="scope">{{ scope.row.address }}</template>
                                                                </el-table-column>
                                                                <el-table-column label="操作">
                                                                    <template slot-scope="scope">
                                                                        <el-button
                                                                            size="mini"
                                                                            type="danger"
                                                                            @click="handleTableDelete(scope.$index, scope.row)">删除</el-button>
                                                                    </template>
                                                                </el-table-column>
                                                            </el-table>
                                                        </template>
                                                    </div>
                                                </div>
                                            </el-tab-pane>
                                            <el-tab-pane label="设备认证"  name="qualificationTab">
                                                设备认证

                                            </el-tab-pane>

                                        </el-tabs>


                                        <el-dialog
                                            width="30%"
                                            title="内层 Dialog"
                                            :visible.sync="innerVisible"
                                            append-to-body>
                                        </el-dialog>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="outerVisible = false">取 消</el-button>
                                            <!--<el-button type="primary" @click="showInnerMore(o,index)">打开内层 Dialog</el-button>-->
                                        </div>
                                    </el-dialog>
                                </transition>

                            </template>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
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
                activeTabNames:'attributeTab',
                editData:{},  //列表
                showDialog:false,
                tableData3: [
                    {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                    {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄啊啊啊啊啊啊海市普陀区金沙江路 1518 弄啊啊啊啊海市普陀区金沙江路 1518 弄啊啊啊啊海市普陀区金沙江路 1518 弄啊啊啊啊海市普陀区金沙江路 1518 弄啊啊啊啊海市普陀区金沙江路 1518 弄啊啊啊啊海市普陀区金沙江路 1518 弄啊啊啊啊'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: [],
                eventStepData:[
                    {
                        eventTitle:'2018/6/12',
                        eventDescription:'wifi信号不稳定1',
                        states:'wait'
                    },
                    {
                        eventTitle:'2018/2/3',
                        eventDescription:'wifi设备发烫发热wifi设备发烫发热wifi设备发烫发热wifi设备发烫发热wifi设备发烫发热wifi设备发烫发热wifi设备发烫发热',
                        states:'error'
                    },
                    {
                        eventTitle:'2018/1/5',
                        eventDescription:'wifi设备被偷了',
                        states:'process'
                    }
                ],
                allTab:[],
                tabArr:[
                    {
                        label:'数据相关',
                        name:'1',
                        sub:[
                            {
                                title:'1wifi的相关数据',
                                badge:['wifi','人流量','全景区'],
                                data:70
                            },
                            {
                                title:'游客来源地的相关数据',
                                badge:['省区','人流量','全景区'],
                                data:80
                            },
                            {
                                title:'景区大巴发车时间',
                                badge:['大巴','时刻表','全景区'],
                                data:100
                            },
                            {
                                title:'数据来源渠道',
                                badge:['来源','渠道','全景区'],
                                data:0
                            },
                            {
                                title:'检票数据同步',
                                badge:['检票','同步','全景区'],
                                data:30
                            },
                        ]
                    }
                ],
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

            }
        },
        created () {
            this.allTab=this.tabArr[0].sub;
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
            searchInfo(x,y){
                if (x !== '') {
                    /*this.arrDatas = this.checkList.filter(item => {
                        if (item.name.includes(x)) {
                            return item
                        }
                    })*/
                } else {
                    //this.arrDatas=?;
                }
            },
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
            handleTabClicks(tab, event){
                console.log('333333:',tab, event);
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
                this.outerVisible = true;
                console.log(index,o,'这是第几项的详情信息');
                this.signalObj=o;
                //查询详情页的信息
                /*api.iotHome.DeviceDetailInfo().then(res=>{
                    console.log(res,'这是传回来的设备状态信息')
                }).catch(err=>{
                    console.log(err,'失败')
                })*/
                //查询报警信息
                api.iotHome.DevicePoliceInfo().then(res=>{
                    console.log(res,'这是传回来的设备报警信息');
                    this.eventStepData=res.pageData.tableDatas;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },
            showInnerMore(o,index){
                this.innerVisible = true;
                console.log(o);
                console.log(index);
            },
            tabClick(tab, event) {
                console.log(tab, event);
                if(tab.name==='1'){
                    this.allTab=this.tabArr[0].sub;
                }else if(tab.name==='2'){
                    this.allTab=this.tabArr[1].sub;
                }else{
                    this.allTab=this.tabArr[2].sub;
                };
            }


        }
    }
</script>
<style lang="scss" type="text/scss">
    .device-card{
        .myrow{
            .mycol{
                width:32.3333%;
                padding-top:rem(16);
                margin-right:1%;

            }
            .mycard{
                .card-bottoms{
                    height:rem(182.4);
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
        .more{
            .detail-dialog{
                .el-dialog__body{
                    padding:rem(0) rem(20);
                }
            }
            @keyframes dialog-fade-in {
                0% {
                    transform: translate3d(0, 100%, 0);
                    opacity: 0;
                }
                100% {
                    transform: translate3d(0, 0, 0);
                    opacity: 1;
                }
            }
            @keyframes dialog-fade-out {
                0% {
                    transform: translate3d(0, 0, 0);
                    opacity: 1;
                }
                100% {
                    transform: translate3d(0, -100%, 0);
                    opacity: 0;
                }
            }
            padding-top:rem(16);
            padding-bottom:rem(16);
            .el-dialog{
                width:78%;
                min-height:rem(400);
                background-color:#eee;
                overflow:auto;
            }
            .machineLog{
                width:100%;
                height:rem(512);
                border:1px solid red;
                margin-top:rem(32);
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
                height:rem(512);
                border:1px solid red;
                margin-top:rem(32);
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
                    height:rem(480);
                    background-color: #fff;
                    .elseInfo{
                        border:1px solid transparent;
                        width:100%;
                        height:rem(204);
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
            }
        }

    }
</style>
