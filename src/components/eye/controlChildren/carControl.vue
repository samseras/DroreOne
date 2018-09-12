<template>
    <div class="car">
        <div class="reveal">
            <!--顶部-->
            <div class="top">
                <h5>车船调度</h5>
                <ul>
                    <!--<li>-->
                    <!--<el-switch-->
                    <!--v-model="open"-->
                    <!--active-color="#53b6a7"-->
                    <!--inactive-color="#808080">-->
                    <!--</el-switch>-->
                    <!--</li>-->
                    <!--<li><img src="../../../../static/img/search.png" class="search" alt=""/></li>-->
                    <li>
                        <el-tooltip class="item" effect="dark" content="车载视频控件下载" placement="left">
                            <img src="../../../../static/img/down.svg" class="multiwindow" @click="cmsocxDown"  alt=""/>
                        </el-tooltip>
                    </li>
                </ul>
            </div>
            <div class="middle">
                <div class="boottom" id="ztree">
                    <ScrollContainer>
                        <broadcast-ztree
                            :title="title"
                            :Info="transportInfo"
                            :lightCheckout="transportCheckout"
                            :regionId="regionId"
                            :lightList="carlist"
                            :number="number"
                            :fault="fault">
                        </broadcast-ztree>
                    </ScrollContainer>
                </div>
            </div>
            <!--<div class="last">-->
                <!--<h5>设备故障率</h5>-->
                <!--<div>-->
                    <!--<div id="pie"></div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import broadcastZtree from "./children/broadcastzTree.vue"
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import {mapGetters} from 'vuex'

    export default {
        name:'car',
        data() {
            return {
                open:false,
                isShow: true,
                options: [],
                boatObjs:[],
                value: '',
                number: '0',
                fault: '0',
                optionMisic: [],
                isShowBroadCard: false,
                transportInfo: [],
                carlist:[],
                transportCheckout:[],
                regionId:[],
                transportList:[],
                selectAll:[],
                title:'车船',
                online: '0',
                faultlist:[],
                drivers:[],
                crew:[]
            }
        },
        components: {
            broadcastZtree,
            ScrollContainer
        },
        methods: {
            treeShow(){
                console.log(this.getcontroTransport,'1');
                if(this.getcontroTransport){
                    this.transportCheckout=this.getcontroTransport
                }
            },
            showBroadCard() {
                console.log(777)
                this.isShowBroadCard = true
            },
            newagenda: function () {
                $(".newagenda").show();

            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('pie'))
                // 绘制图表
                myChart.setOption({
                    series: [
                        {
                            laber: {
                                color: "#7d7d7d"
                            },
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '50%'],
                            startAngle: 60,
                            label: {            //饼图图形上的文本标签
                                normal: {
                                    formatter: '{d}%'
                                }
                            },
                            data: [
                                {
                                    value: this.online,
                                    label: {normal: {show: false}},
                                    labelLine: {normal: {show: false}}
                                },
                                {
                                    value: this.fault,
                                    label: {normal: {show: true, color: "#646464", fontSize: 12}},
                                    labelLine: {
                                        normal: {
                                            length: 4,
                                            lineStyle: {
                                                color: "#646464",
                                                type: "dashed",

                                            }
                                        }
                                    }
                                }
                            ],
                            labelLine: {
                                show: false
                            }

                        }
                    ],
                    color: ['#26bbf0', '#f36a5a']
                });
            },
            async initData(){
                Promise.all([this.getAllVehicle()]).then(result=>{
                    // let vehicles = result[0]
                    let vehicles =  [
                        {
                            "vehicle": {
                                "id": "05579c25-8abb-4bfa-83ae-2a1e50a071ee",
                                "createTime": null,
                                "creator": null,
                                "modifyTime": "2018-09-11 17:32:51",
                                "modifier": "admin",
                                "serialNum": "船001",
                                "capacity": 33,
                                "type": 1,
                                "model": "363",
                                "gpsDeviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                                "pictureId": null,
                                "maintenanceStatus": 0,
                                "maintenanceDate": "2018-08-07",
                                "purchaseDate": "2010-03-23",
                                "description": "反感和的",
                                "scenicAreaId": null,
                                "deleted": false
                            },
                            "gpsDeviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                            "gpsDeviceName": "gps1",
                            "pictureId": null,
                            "picturePath": null,
                            "gpsData":
                                //null,
                                {
                                "deviceId": "21a435fd-f067-4cb5-841e-0482bbe1c230",
                                "ioTDeviceId": null,
                                "createTime": "2017-12-31 12:21:39",
                                "longitude": 120.13310087077178,
                                "latitude": 30.30729423238902,
                                "altitude": null,
                                "direction": null,
                                "speed": 4,
                                "telephone": null,
                                "deviceNum": null,
                                "coordinate": null
                            },
                            "driver": {
                                "id": "1",
                                "creator": null,
                                "createTime": null,
                                "modifier": "admin",
                                "modifyTime": "2018-09-11 18:00:00",
                                "name": "admin",
                                "cnName": " 系统管理员",
                                "gender": 0,
                                "iconId": null,
                                "mobileNum": "18800000000",
                                "fixedPhoneNum": null,
                                "idCardNum": null,
                                "email": null,
                                "workAddress": null,
                                "description": null,
                                "departmentId": null,
                                "jobId": null,
                                "roleId": "1"
                            }
                        }
                        ]
                    this.carlist = vehicles
                    this.number=this.carlist.length
                    this.transportInfo=[]
                    let carObj = {
                        label:'车辆',
                        id:100010,
                        children:[]
                    }
                    let boatObj = {
                        label:'船只',
                        id:100011,
                        children:[]
                    }
                    vehicles.forEach(veObj=>{
                        let childObj;
                        if(veObj.vehicle.type == 0){
                            childObj = {
                                label:veObj.vehicle.serialNum,
                                id:veObj.vehicle.id,
                                url:'/static/img/icon/bus_small.png',
                                type:'transport',
                                subtype:'car',
                                icon:veObj.gpsData ? '../../../static/img/car_icon.svg' : '../../../static/img/car_gray.svg' ,
                                status:veObj.gpsData ? "ONLINE" : "OFFLINE",
                                longitude:veObj.gpsData ? veObj.gpsData.longitude : '',
                                latitude:veObj.gpsData ? veObj.gpsData.latitude : '',
                                gpsDeviceId:veObj.gpsDeviceId
                            }
                            carObj.children.push(childObj)
                        }else if(veObj.vehicle.type == 1){
                            // let arr = ['../../../static/img/boat_icon.svg','../../../static/img/boat_gray.svg'];
                            // let icon = arr[Math.floor(Math.random()*arr.length)];
                            childObj = {
                                label:veObj.vehicle.serialNum,
                                id:veObj.vehicle.id,
                                url:'/static/img/icon/boat_small.png',
                                type:'transport',
                                subtype:'boat',
                                // icon:icon,
                                icon:veObj.gpsData ? '../../../static/img/boat_icon.svg' : '../../../static/img/boat_gray.svg',
                                status:veObj.gpsData ? "ONLINE" : "OFFLINE",
                                longitude:veObj.gpsData ? veObj.gpsData.longitude : '',
                                latitude:veObj.gpsData ? veObj.gpsData.latitude : '',
                                gpsDeviceId:veObj.gpsDeviceId
                            }
                            boatObj.children.push(childObj)
                        }
                    })
                    this.transportInfo.push(carObj)
                    this.transportInfo.push(boatObj)
                    this.fault=0
                    this.online= this.number - this.fault
                    // this.drawLine();
                    console.log(this.transportInfo)
                })
                setTimeout(() => {
                    let route = this.$route.path
                    if (route.includes('controler/car')) {
                        this.initData();//长轮询
                        this.treeShow();
                    }
                },5000)
            },
            async getAllTransport(){
                return api.transport.getTransport()
            },
            async getAllVehicle(){
                return await api.boat.getAllVehicleGps()
            },
            async getAllDriver(id){
                return await api.person.getJobPerson(id)
            },
            cmsocxDown(){
                window.open('http://112.17.128.126:89/download/OCX.exe');
            },
        },
        watch:{

        },
        created: function () {
            this.treeShow();
        },
        mounted() {
            // setInterval(()=>{
            //     this.transportInfo = []
            //     this.initData();
            // },5000)
            this.initData();
        },
        computed: {
            ...mapGetters(['getcontroTransport'])
        }
    }
</script>

<style lang="scss" scoped>
    .car {
        width: 100%;
        height: 100%;
        .reveal {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            background: #f2f2f2;
            .top {
                width: 100%;
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                background: #fff;
                h5 {
                    margin-left: 15px;
                }
                ul {
                    display: flex;
                    li {
                        margin: 0 5px;
                        .multiwindow{
                            width: 24px;
                            vertical-align: middle;
                            cursor: pointer;
                            outline: none;
                        }
                    }
                }
            }
            .list_search{
                background: #f2f2f2;
                padding: rem(10);
                input {
                    width: 100%;
                    text-indent: 10px;
                    font-size: 10px;
                    color: #646464;
                    height: 22px;
                    border: 1px solid #52c4f2;
                    outline: none;
                }
            }

            .middle {
                width: 100%;
                flex: 1;
                background: #fff;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                .manage {
                    width: 100%;
                    height: 45px;
                    line-height: 45px;
                    border-top: 1px solid #f2f2f2;
                    .check {
                        margin-left: 10px;
                    }
                    .el-checkbox:last-child {
                        color: #f36a5a;
                    }
                }
                .boottom {
                    width: 100%;
                    flex: 1;
                    overflow-y: auto;
                    ::-webkit-scrollbar {
                        width: rem(6);
                    }
                    ::-webkit-scrollbar-thumb {
                        background: rgba(0, 0, 0, 0);
                    }
                    &:hover{
                        .scroll-container {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            overflow: hidden;
                            .scroll-inner {
                                position: absolute;
                                top: 0;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                overflow: auto;
                                padding-bottom: rem(20);
                                // &::-webkit-scrollbar {
                                // }
                            }
                        }
                        ::-webkit-scrollbar {
                            width: rem(6);
                        }
                        ::-webkit-scrollbar-thumb {
                            position: absolute;
                            right: rem(-10);
                            background: rgba(0, 0, 0, .5);
                            border-radius: rem(6);
                        }
                    }

                }
            }
            .last {
                width: 100%;
                height: 210px;
                overflow: hidden;
                h5 {
                    line-height: 40px;
                    margin-left: 15px;
                }
                h5 + div {
                    width: 100%;
                    height: 170px;
                    background: #fff;
                }
                .broadCard {
                    width: 500px;
                    height: 350px;
                    position: fixed;
                    left: 20%;
                    top: 30%;
                }
            }
            #pie {
                width: 80%;
                height: 95%;
                margin: 0 auto;
                padding-top: 5%;
            }
        }
    }
</style>
