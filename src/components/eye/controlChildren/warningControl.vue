<template>
    <div class="light">
        <div class="reveal">
            <!--顶部-->
            <div class="top">
                <h5>告警事件</h5>
                <ul>
                    <!--<li>-->
                    <!--<el-switch-->
                    <!--v-model="open"-->
                    <!--active-color="#53b6a7"-->
                    <!--inactive-color="#808080">-->
                    <!--</el-switch>-->
                    <!--</li>-->
                    <!--<li><img src="../../../../static/img/player.png" class="broad"/></li>-->
                    <!--<li><img src="../../../../static/img/microphone.png" alt=""/></li>-->
                    <!--<li><img src="../../../../static/img/search.png" alt="" class="search"/></li>-->
                </ul>
            </div>
            <div class="middle">
                <!--&lt;!&ndash;搜索&ndash;&gt;-->
                <!--<div class="list_search">-->
                <!--<input id="search" type="text" placeholder="设备名称,组名称"/>-->
                <!--</div>-->
                <!--<div class="manage">-->
                <!--<el-checkbox class="check" @change="selectAllCheck">路灯总数<font>{{this.number}}</font>个</el-checkbox>-->
                <!--<el-checkbox class="check">故障<font>{{this.fault}}</font>个</el-checkbox>-->
                <!--</div>-->
                <div class="boottom" id="ztree">
                    <!--广播-->
                    <ScrollContainer>
                        <broadcast-ztree
                            :title="title"
                            :Info="lightInfo"
                            :lightCheckout="lightCheckout"
                            :regionId="regionId"
                            :lightList="lightList"
                            :number="number"
                            :fault="fault">
                        </broadcast-ztree>
                    </ScrollContainer>
                </div>
            </div>
            <div class="last">
                <h5>事件处理</h5>
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
        data() {
            return {
                open:false,
                isShow: true,
                options: [],
                value: '',
                number: '0',
                optionMisic: [],
                isShowBroadCard: false,
                lightInfo: [],
                lightCheckout:[],
                regionId:[],
                lightList:[],
                selectAll:[],
                title:'告警事件',
                pending:'0',
                pendinglist:[],
                fault: '0',
                faultlist:[],
                stocks: '0',
                stockslist:[],

            }
        },
        components: {
            broadcastZtree,
            ScrollContainer
        },
        methods: {
            treeShow(){
                // console.log(this.getcontroleWarn)
                if(this.getcontroleWarn){
                    this.lightCheckout=this.getcontroleWarn
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
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}"
                    },
                    series: [
                        {
                            name: '事件处理',
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
                                    value: this.stocks,
                                    name: '已处理',
                                    label: {normal: {show: false}},
                                    labelLine: {normal: {show: false}}
                                },
                                {
                                    value: this.fault,
                                    name: '处理中',
                                    label: {normal: {show: false}},
                                    labelLine: {normal: {show: false}}
                                },
                                {
                                    value: this.pending,
                                    name: '待处理',
                                    label: {normal: {show: true, color: "#f36a5a", fontSize: 12}},
                                    labelLine: {
                                        normal: {
                                            length: 4,
                                            lineStyle: {
                                                color: "#f36a5a",
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
                    color: ['#26bbf0','#f39943','#f36a5a']
                });
            },
            async getAllAlarmEvent () {
                await api.alarm.getAllAlarmEventundone().then(res => {
                    // console.log(res,'16565623');
                    this.lightList=res
                    this.number=this.lightList.length
                    let regionIdList = []
                    let arr = []
                    let idList = []
                    this.pendinglist=[]
                    this.faultlist=[]
                    this.stockslist=[]
                    this.lightList.forEach(item => {
                        item.label = item.serialNum
                        item.type = 'warn'
                        if(!item.device){
                            item.device = {
                                id:'',
                                typeId:0,
                                typeName:'非设备故障'
                            }
                        }
                        if(item.alarmType.id =="10") {
                            //alert(555);
                            item.regionName="巡检告警"
                            if (item.status.id =="1")  {
                                this.pendinglist.push(item.id)
                                item.icon = '../../../static/img/alarm/pollingIconRule_one.svg'
                            } else  if (item.status.id =="2") {
                                this.faultlist.push(item.id)
                                item.icon = '../../../static/img/alarm/pollingIconRule_two.svg'
                            }else {
                                this.stockslist.push(item.id)
                                item.icon = '../../../static/img/alarm/ollingIconRule_three.svg'
                            }
                        }else if(item.alarmType.id =="1"){
                            item.regionName="设备故障"
                            if (item.status.id =="1")  {
                                this.pendinglist.push(item.id)
                                if(item.device.typeId =="1"){
                                    item.icon = '../../../static/img/broadcast_danage.svg'
                                }else if(item.device.typeId =="2"){
                                    item.icon = '../../../static/img/camera_danage.svg'
                                }else  if(item.device.typeId =="3") {
                                    item.icon = '../../../static/img/machine_danage.svg'
                                }else  if(item.device.typeId =="4") {
                                    item.icon = '../../../static/img/led_danage.svg'
                                }else  if(item.device.typeId =="5") {
                                    item.icon = '../../../static/img/light_danage.svg'
                                }else  if(item.device.typeId =="6") {
                                    item.icon = '../../../static/img/detection_danage.svg'
                                }else  if(item.device.typeId =="7") {
                                    item.icon = '../../../static/img/wifi_danage.svg'
                                }else  if(item.device.typeId =="8") {
                                    item.icon = '../../../static/img/wring_danage.svg'
                                }else  if(item.device.typeId =="9") {
                                    item.icon = '../../../static/img/gps_danage.svg'
                                }
                            } else  if (item.status.id =="2") {
                                this.faultlist.push(item.id)
                                if(item.device.typeId =="1"){
                                    item.icon = '../../../static/img/broadcast_two.svg'
                                }else if(item.device.typeId =="2"){
                                    item.icon = '../../../static/img/camera_two.svg'
                                }else  if(item.device.typeId =="3") {
                                    item.icon = '../../../static/img/machine_two.svg'
                                }else  if(item.device.typeId =="4") {
                                    item.icon = '../../../static/img/led_two.svg'
                                }else  if(item.device.typeId =="5") {
                                    item.icon = '../../../static/img/light_two.svg'
                                }else  if(item.device.typeId =="6") {
                                    item.icon = '../../../static/img/detection_two.svg'
                                }else  if(item.device.typeId =="7") {
                                    item.icon = '../../../static/img/wifi_two.svg'
                                }else  if(item.device.typeId =="8") {
                                    item.icon = '../../../static/img/wring_two.svg'
                                }else  if(item.device.typeId =="9") {
                                    item.icon = '../../../static/img/gps_two.svg'
                                }
                            }else {
                                this.stockslist.push(item.id)
                                if(item.device.typeId =="1"){
                                    item.icon = '../../../static/img/broadcast_big.svg'
                                }else if(item.device.typeId =="2"){
                                    item.icon = '../../../static/img/camera_big.svg'
                                }else  if(item.device.typeId =="3") {
                                    item.icon = '../../../static/img/machine_big.svg'
                                }else  if(item.device.typeId =="4") {
                                    item.icon = '../../../static/img/led_open.svg'
                                }else  if(item.device.typeId =="5") {
                                    item.icon = '../../../static/img/light_big.svg'
                                }else  if(item.device.typeId =="6") {
                                    item.icon = '../../../static/img/detection_big.svg'
                                }else  if(item.device.typeId =="7") {
                                    item.icon = '../../../static/img/wifi_big.svg'
                                }else  if(item.device.typeId =="8") {
                                    item.icon = '../../../static/img/wring_big.svg'
                                }else  if(item.device.typeId =="9") {
                                    item.icon = '../../../static/img/detection_big.svg'
                                }
                            }
                        }else if(item.alarmType.id =="2") {
                            item.regionName="报警柱"
                            if (item.status.id =="1")  {
                                this.pendinglist.push(item.id)
                                item.icon = '../../../static/img/alarm/alarmcolumnRule_one.svg'
                            } else  if (item.status.id =="2") {
                                this.faultlist.push(item.id)
                                item.icon = '../../../static/img/alarm/alarmcolumnRule_two.svg'
                            }else {
                                this.stockslist.push(item.id)
                                item.icon = '../../../static/img/alarm/alarmcolumnRule_three.svg'
                            }
                        }else if(item.alarmType.id =="3") {
                            item.regionName="消防"
                            if (item.status.id =="1")  {
                                this.pendinglist.push(item.id)
                                item.icon = '../../../static/img/alarm/firefightingRule_one.svg'
                            } else  if (item.status.id =="2") {
                                this.faultlist.push(item.id)
                                item.icon = '../../../static/img/alarm/firefightingRule_two.svg'
                            }else {
                                this.stockslist.push(item.id)
                                item.icon = '../../../static/img/alarm/firefightingRule_three.svg'
                            }
                        }else if(item.alarmType.id =="4") {
                            item.regionName="越界"
                            if (item.status.id =="1")  {
                                this.pendinglist.push(item.id)
                                item.icon = '../../../static/img/alarm/crossborderRule_one.svg'
                            } else  if (item.status.id =="2") {
                                this.faultlist.push(item.id)
                                item.icon = '../../../static/img/alarm/crossborderRule_two.svg'
                            }else {
                                this.stockslist.push(item.id)
                                item.icon = '../../../static/img/alarm/crossborderRule_three.svg'
                            }
                        }else if(item.alarmType.id =="5") {
                            item.regionName="超速"
                            if (item.status.id =="1")  {
                                this.pendinglist.push(item.id)
                                item.icon = '../../../static/img/alarm/speedingRule_one.svg'
                            } else  if (item.status.id =="2") {
                                this.faultlist.push(item.id)
                                item.icon = '../../../static/img/alarm/speedingRule_two.svg'
                            }else {
                                this.stockslist.push(item.id)
                                item.icon = '../../../static/img/alarm/speedingRule_three.svg'
                            }
                        }else if(item.alarmType.id =="6") {
                            item.regionName="偏离轨迹"
                            if (item.status.id =="1")  {
                                this.pendinglist.push(item.id)
                                item.icon = '../../../static/img/alarm/offtrackRule_one.svg'
                            } else  if (item.status.id =="2") {
                                this.faultlist.push(item.id)
                                item.icon = '../../../static/img/alarm/offtrackRule_two.svg'
                            }else {
                                this.stockslist.push(item.id)
                                item.icon = '../../../static/img/alarm/offtrackRule_three.svg'
                            }
                        }else if(item.alarmType.id =="7") {
                            //alert(666);
                            item.regionName="客流量"
                            if (item.status.id =="1")  {
                                this.pendinglist.push(item.id)
                                item.icon = '../../../static/img/alarm/overlimitRule_one.svg'
                            } else  if (item.status.id =="2") {
                                this.faultlist.push(item.id)
                                item.icon = '../../../static/img/alarm/overlimitRule_two.svg'
                            }else {
                                this.stockslist.push(item.id)
                                item.icon = '../../../static/img/alarm/overlimitRule_three.svg'
                            }
                        }else if(item.alarmType.id =="8") {
                            item.regionName="水位"
                            if (item.status.id =="1")  {
                                this.pendinglist.push(item.id)
                                item.icon = '../../../static/img/alarm/waterlevelRule_one.svg'
                            } else  if (item.status.id =="2") {
                                this.faultlist.push(item.id)
                                item.icon = '../../../static/img/alarm/waterlevelRule_two.svg'
                            }else {
                                this.stockslist.push(item.id)
                                item.icon = '../../../static/img/alarm/waterlevelRule_three.svg'
                            }
                        }else if(item.alarmType.id =="9") {
                            item.regionName="环境"
                            if (item.status.id =="1")  {
                                this.pendinglist.push(item.id)
                                item.icon = '../../../static/img/alarm/conditionRule_one.svg'
                            } else  if (item.status.id =="2") {
                                this.faultlist.push(item.id)
                                item.icon = '../../../static/img/alarm/conditionRule_two.svg'
                            }else {
                                this.stockslist.push(item.id)
                                item.icon = '../../../static/img/alarm/conditionRule_three.svg'
                            }
                        }
                        if (!regionIdList.includes(item.alarmType.id)) {
                            regionIdList.push(item.alarmType.id)
                            let obj = {
                                label: item.alarmType.name,
                                type: 'warn',
                                id: item.alarmType.id,
                                children: []
                            }
                            arr.push(obj)
                        }
                        arr.forEach(item1 => {
                            if (item1.id == item.alarmType.id) {
                                if (item1.children.length < 1) {
                                    item1.children.push(item)
                                } else {
                                    item1.children.forEach(item2 => {
                                        if (!idList.includes(item2.id)) {
                                            idList.push(item.id)
                                            item1.children.push(item)
                                        }
                                    })
                                }
                            }
                        })
                    })
                    this.lightInfo = arr
                    this.pending=this.pendinglist.length
                    this.fault=this.faultlist.length
                    this.stocks=this.stockslist.length
                    this.drawLine();
                    setTimeout(() => {
                        let route = this.$route.path
                        if (route.includes('controler/warn')) {
                            this.getAllAlarmEvent();//长轮询
                            this.treeShow();
                        }
                    },5000)
                }).catch(err =>{
                    console.log(err)
                })
            },
        },
        watch:{

        },
        created: function () {
            this.treeShow();
        },
        mounted() {
            this.getAllAlarmEvent();
        },
        computed: {
            ...mapGetters(['getcontroleWarn'])
        }
    }
</script>

<style lang="scss" scoped>
    .light {
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
                        .search,.broad{
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
