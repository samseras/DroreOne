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
                        <div class="bottom ">
                            <p>mac：{{o.mac}}</p>
                            <p>状态：{{o.status}}</p>
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
                                <transition name="fades">
                                    <el-dialog title="" :visible.sync="outerVisible">
                                        <!--详情页打开时再读取数据-->
                                        <div class="top-part clearfix" v-if="outerVisible">
                                            <div class="equipment">
                                                <div class="small-title clearfix">
                                                    <div class="photo">
                                                        <!--<img :src="'../../../static/img/iot/'+signalObj.areaName+'.png'" alt="">-->
                                                        <img src="../../../static/img/iot/东区.png" alt="">
                                                    </div>
                                                    <div class="name" v-if="signalObj.name!==''">
                                                        <h2>{{signalObj.name}}</h2>
                                                        <h5>xx景区</h5>
                                                    </div>
                                                    <div class="name" v-else="signalObj.name!==''">
                                                        <h2>{{signalObj.status}}</h2>
                                                        <h5>xx景区</h5>
                                                    </div>
                                                </div>
                                                <div class="elseInfo">
                                                    <ul>
                                                        <li ><span>设备IP：</span><span>{{signalObj.attributes.ip}}</span></li>
                                                        <li><span>服务地址：</span><span>{{signalObj.attributes.serviceUrl}}</span></li>
                                                        <li><span>设备ID：</span><span>{{signalObj.id}}</span></li>
                                                        <li ><span>最近检修时间：</span><span>{{signalObj.modifyTime}}</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="data-flow">
                                                <h2>运行中的数据流</h2>
                                                <el-tabs v-model="activeTabName" type="card" @tab-click="tabClick">
                                                    <template v-for="(item,i) in tabArr">
                                                        <el-tab-pane :label="item.label" :name="item.name" class="tabPane">
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
                                                        </el-tab-pane>
                                                    </template>
                                                </el-tabs>

                                            </div>
                                        </div>
                                        <div class="progressSHow">
                                            <h3>最新事件</h3>
                                            <div class="stepBar">
                                                <div style="height: 300px;">
                                                    <el-steps direction="vertical" :active="1" >
                                                        <el-step v-for="(item,i) in eventStep"  icon="el-icon-time" :title="item.eventTitle" :description="item.eventDescription"></el-step>
                                                    </el-steps>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="machineLog">
                                            <h3>日志列表</h3>
                                            <div>头部信息</div>
                                            <div class="body">
                                                <template>
                                                    <el-table
                                                        ref="multipleTable"
                                                        :data="tableData3"
                                                        tooltip-effect="dark"
                                                        style="width: 100%"
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
                                        <el-dialog
                                            width="30%"
                                            title="内层 Dialog"
                                            :visible.sync="innerVisible"
                                            append-to-body>
                                        </el-dialog>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="outerVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="showInnerMore(o,index)">打开内层 Dialog</el-button>
                                        </div>
                                    </el-dialog>
                                </transition>

                            </template>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { mapGetters} from 'vuex'
    import api from '@/api'
    export default {
        name: "deviceCard",
        props:['curPage','searchInfo','allData'],
        data() {
            return {
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
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
                eventStep:[
                    {
                        eventTitle:'2018/6/12',
                        eventDescription:'wifi信号不稳定'
                    },
                    {
                        eventTitle:'2018/2/3',
                        eventDescription:'wifi设备发烫发热wifi设备发烫发热wifi设备发烫发热wifi设备发烫发热wifi设备发烫发热wifi设备发烫发热wifi设备发烫发热'
                    },
                    {
                        eventTitle:'2018/1/5',
                        eventDescription:'wifi设备被偷了'
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
                    },
                    {
                        label:'事件相关',
                        name:'2',
                        sub:[
                            {
                                title:'2wifi的启停',
                                badge:['wifi','时间'],
                                data:70
                            },
                            {
                                title:'wifi信号测试',
                                badge:['景区','时间','测试人员'],
                                data:80
                            },
                            {
                                title:'wifi设备检查',
                                badge:['时间','检查员','全景区'],
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
                    },
                    {
                        label:'告警相关',
                        name:'3',
                        sub:[
                            {
                                title:'3告警的相关数据',
                                badge:['wifi','信号差'],
                                data:70
                            },
                            {
                                title:'严防火灾',
                                badge:['温度高','夏天','设备保养'],
                                data:80
                            },
                            {
                                title:'设备高温故障',
                                badge:['关闭保养','检修','时间'],
                                data:100
                            },
                            {
                                title:'雨水破坏设备',
                                badge:['来源','地点','时间'],
                                data:0
                            },
                            {
                                title:'设备检修',
                                badge:['频率','人员','全景区'],
                                data:30
                            },
                        ]
                    },
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
                this.selectDatas=this.arrDatas.slice((this.curPageMy-1)*this.pageSizesMy,this.curPageMy*this.pageSizesMy);
                let len=this.selectDatas.length;
                for(let i=0;i<len;i++){
                    (this.selectDatas)[i].attributes=JSON.parse(this.selectDatas[i].attributes);
                }

            },
            allData(news,olds){
                this.arrDatas=news;
                this.selectDatas=this.arrDatas.slice((this.curPageMy-1)*this.pageSizesMy,this.curPageMy*this.pageSizesMy);
                let len=this.selectDatas.length;
                for(let i=0;i<len;i++){
                    (this.selectDatas)[i].attributes=JSON.parse(this.selectDatas[i].attributes);
                }

            }


        },
        components: {

        },
        methods:{
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
                console.log(o,'这是详情信息');
                this.signalObj=o;
                console.log(index);
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
            .fades-enter-active {
                transition: all 1.3s ease;
            };
            .fades-leave-active {
                transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
            };
            .fades-enter, .fades-leave-to{
                transform: translateX(rem(16));
                opacity: 0;
            };
            padding-top:rem(16);
            padding-bottom:rem(16);
            .el-dialog{
                width:78%;
                background-color:#eee;
                overflow:auto;
            }
            .machineLog{
                width:100%;
                height:rem(512);
                border:1px solid red;
                margin-top:rem(32);
                background-color:#fff;
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
                    width:35%;
                    border:1px solid transparent;
                    height:rem(300);
                    background-color: #fff;
                    .elseInfo{
                        border:1px solid transparent;
                        width:100%;
                        height:rem(204);
                        li{
                            border-top: 1px solid #eee;
                            height: rem(32);
                            padding-top: rem(16);
                            span{
                                display:inline-block;
                                width:25%;
                                text-align:right;
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
                            height:rem(80);

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
