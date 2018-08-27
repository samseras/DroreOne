<template>
    <div class="car">
        <div class="reveal">
            <!--顶部-->
            <div class="top">
                <h5>车船调度计划列表</h5>
                <ul>
                    <!--<li>-->
                    <!--<el-switch-->
                    <!--v-model="open"-->
                    <!--active-color="#53b6a7"-->
                    <!--inactive-color="#808080">-->
                    <!--</el-switch>-->
                    <!--</li>-->
                    <!--<li><img src="../../../../static/img/search.png" class="search" alt=""/></li>-->
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
                            :lightList="transportList"
                            :number="number"
                            :fault="fault">
                        </broadcast-ztree>
                    </ScrollContainer>
                </div>
            </div>
            <div class="last">
                <h5>设备故障率</h5>
                <div>
                    <div id="pie"></div>
                </div>
            </div>
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
                transportCheckout:[],
                regionId:[],
                transportList:[],
                selectAll:[],
                title:'车船调度计划',
                online: '0',
                faultlist:[],
                cars:[],
                boats:[],
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
                Promise.all([this.getAllVehicle(0),this.getAllVehicle(1),this.getAllDriver(1),this.getAllDriver(2),this.getAllTransport()]).then(result=>{
                    console.log(result,'result')
                    this.cars = result[0]
                    this.boats = result[1]
                    let vehicles = this.cars.concat(this.boats)
                    this.drivers = result[2]
                    this.crew = result[3]
                    this.transportList = result[4]

                    this.number=this.transportList.length
                    let arr = []
                    this.transportList[0].carObjs = [{
                            name:'奥迪奥迪奥迪',
                            id:'123321',
                            status:'',
                            latitude:30.281985840870185,
                            longitude:120.06656811140255,
                            location:[120.06656811140255,30.281985840870185],
                            type:'transport',
                            subtype:'car',
                            url:'/static/img/icon/bus_small.png',
                            description:'aaaaaaaaaa'
                    }]

                    this.transportList.forEach(item => {
                        item.label = item.name
                        item.type = 'transport'
                        item.status = 'WORKING'
                        // if (item.status =="FAULT")  {
                        //     item.icon = '../../../static/img/led_damage.svg'
                        //     this.faultlist.push(item.id)
                        // } else  if (item.status =="OFFLINE") {
                        //     item.icon = '../../../static/img/led.svg'
                        // }else {
                        //     item.icon = '../../../static/img/led_open.svg'
                        // }

                        let obj = {
                            label: item.name,
                            id: item.id,
                            children: []
                        }
                        if(item.vDriverMaps instanceof  Array && item.vDriverMaps.length >0){
                            item.vDriverMaps.forEach(item1=>{
                                item1.vehicleId
                                vehicles.forEach(veObj=>{
                                    if(item1.vehicleId == veObj.vehicle.id){
                                        let childObj = {
                                            label:veObj.vehicle.serialNum,
                                            id:veObj.vehicle.id,
                                            type:'transport',
                                            transportObj:item,
                                        }
                                        obj.children.push(childObj)
                                    }
                                })
                            })
                        }
                        arr.push(obj)
                    })

                    this.fault=this.faultlist.length
                    this.online= this.number - this.fault
                    this.transportInfo = arr
                    this.drawLine();
                    console.log(this.transportInfo)
                })
            },
            async getAllTransport(){
                return api.transport.getTransport()
            },
            async getAllVehicle(id){
                return await api.boat.getAllVehicle(id)
            },
            async getAllDriver(id){
                return await api.person.getJobPerson(id)
            }
        },
        watch:{

        },
        created: function () {
            this.treeShow();
        },
        mounted() {
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
                        .search{
                            width: 18px;
                            vertical-align: middle;
                            cursor: pointer;
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
