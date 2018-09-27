<template>
    <div class="controlDialog">
        <el-dialog
            :title="title"
            :close-on-click-modal = false
            :visible="visible"
            :before-close="closeDialog"
            width="480px"
            class="dialog echatDialog"
            center>
            <div class="card">
                <div class="personCardContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        {{this.Info.name}}
                    </p>
                    <!--<p class="name">所属片区：-->
                        <!--{{this.Info.regionName}}-->
                    <!--</p>-->
                    <div v-if="wifiShow" class="wifiShow">
                        <p class="name">当前连接数：
                            {{this.Info.currentConnections}}（人）
                        </p>
                        <p class="name">上行速率：
                            {{this.Info.upRate}}（Kb/s）
                        </p>
                        <p class="name">下行速率：
                            {{this.Info.downRate}}（Kb/s）
                        </p>
                    </div>
                    <div v-if="warnShowList" class="warnShowList">
                        <p class="name">当前景区：
                            {{this.Info.regionName}}
                        </p>
                        <p class="name">当前状态：
                            {{this.Info.status.name}}
                        </p>
                        <p class="name">告警级别：
                            {{this.Info.severity.name}}
                        </p>
                        <p class="name">关联规则：
                            {{this.Info.rule.name}}
                        </p>
                    </div>
                    <div v-if="broadShow" class="broadShow">
                        <p class="name">设 备 &nbsp;I&nbsp;P：
                            {{this.Info.ip}}
                        </p>
                        <p class="name">播放歌曲：
                            {{this.fileName}}
                        </p>
                        <p class="name">当前音量：
                            {{this.volume}}
                        </p>
                        <p class="name">当前状态：
                            {{this.statusCurrent}}
                        </p>
                    </div>
                    <div v-if="cameraShow" class="cameraShow">
                        <p class="name">设 备 &nbsp;I&nbsp;P：
                            {{this.Info.ip}}
                        </p>
                        <!--<p class="name">设备端口：-->
                            <!--{{this.Info.port}}-->
                        <!--</p>-->
                        <!--<p class="name">平 台 &nbsp;I&nbsp;P：-->
                            <!--{{this.Info.consoleIp}}-->
                        <!--</p>-->
                        <p class="name">通道编码：
                            {{this.Info.channel}}
                        </p>
                    </div>
                    <div v-if="environment" class="environment">
                        <p class="name">采集地区：
                            {{this.name}}
                        </p>
                        <p class="name">当前温度：
                            {{this.temp}}
                        </p>
                        <p class="name">当前湿度：
                            {{this.moisture}}
                        </p>
                        <p class="name">P M &nbsp;2.5：
                            {{this.pm25}}
                        </p>
                        <p class="name">负氧离子：
                            {{this.negativeOxygenIons}}
                        </p>
                        <p class="name">当前风速：
                            {{this.windSpeed}}
                        </p>
                        <p class="name">当前雨量：
                            {{this.rainfall}}
                        </p>
                    </div>
                    <div v-if="park" class="park">
                        <p class="name">全部车位：
                            <span>{{this.Info.parkingAll}}</span>
                        </p>
                        <p class="name">已停车位：
                            <span>{{this.Info.useParking}}</span>
                        </p>
                        <p class="name">剩余车位：
                            <span>{{this.Info.remainParking}}</span>
                        </p>
                    </div>
                    <div v-if="transport" class="car">
                        <p class="name">当前速度：
                        <span>{{this.speed}}Km/h</span>
                        </p>
                        <p class="name">司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：
                            <span>{{this.deviceName}}</span>
                        </p>
                        <p class="name">手机号码：
                            <span>{{this.deviceNum}}</span>
                        </p>
                        <p class="name">车牌号码：
                            <span>{{this.Info.name}}</span>
                        </p>
                        <p class="name">
                            <span style="display: inline-block">时间查询：</span>
                            <el-date-picker
                                v-model="dateRange"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                @change="dateCheck">
                            </el-date-picker>
                        </p>
                    </div>
                    <div v-if="sercurityPerson" class="sercurityPerson">
                        <p class="name">手机号码：
                            <span>{{this.mobileNum}}</span>
                        </p>
                        <p class="name">当前速度：
                            <span>{{this.speed}}Km/h</span>
                        </p>
                        <p class="name">
                            <span style="display: inline-block">时间查询：</span>
                            <el-date-picker
                                v-model="dateRange"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                @change="dateCheck">
                            </el-date-picker>
                        </p>
                    </div>
                    <p class="name" v-if="facility">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        {{this.Info.modelName}}
                    </p>
                    <p class="name">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：
                        {{this.Info.description}}
                    </p>
                </div>
                <div v-if="transport || sercurityPerson" class=""slot="footer" class="dialog-footer cardFooter">
                    <el-button size="mini" class="hold" @click='findHistory' :disabled = "isInquireDisable">查找</el-button>
                    <el-button size="mini" @click = 'closeDialog'>取消</el-button>
                </div>

            </div>
        </el-dialog>
        <HistoryMap v-if="historyvisible"
                    :visible="historyvisible"
                    @closeHistoryDialog = "closeHistoryDialog"
                    :historyData="historyData"
                    :title="mapTitle"
                    :Info = "Info"
                    :isvehicle="isvehicle">
        </HistoryMap>
    </div>
</template>

<script>
    import api from '@/api'
    import HistoryMap from '@/components/historyMap'
    export default {
        name: "control-dialog",
        props: ['visible', 'Info','title','selectedCastContent'],
        data () {
            return {
                isvehicle:true,
                historyvisible:false,
                historyData:[],
                wifiInfo:{},
                route:'',
                wifiShow:false,
                facility:true,
                park:false,
                transport:false,
                isInquireDisable:false,
                parking:[
                    {
                        "id": "4e98470b8c574b71b17c060ca91e7b0b",
                        "parkingAll":"155",
                        "useParking":"87",
                    },
                    {
                        "id": "511e7b2677154632bee8071780a2c8fd",
                        "parkingAll":"73",
                        "useParking":"47",
                    },
                    {
                        "id": "524df8eaa9b0427abf0f54644126d852",
                        "parkingAll":"34",
                        "useParking":"21",
                    },
                    {
                        "id": "8ab822eb57124b9dbc86dcc49074df59",
                        "parkingAll":"182",
                        "useParking":"106",
                    },
                    {
                        "id": "d482e8072fba4b06ba311229b033a82a",
                        "parkingAll":"200",
                        "useParking":"166",
                    },
                    {
                        "id": "f35cee3122fb40bdbf2f823c3cff40d6",
                        "parkingAll":"257",
                        "useParking":"156",
                    },
                ],
                broadShow:false,
                jsonAttr:[],
                fileName:'暂未启用',
                environment:false,
                volume:'0',
                name:'',
                temp:'0℃',
                moisture:'0%RH',
                pm25:'0ug/m3',
                negativeOxygenIons:'0个/cm3',
                windSpeed:'0m/s',
                rainfall:'0mm/h',
                cameraShow:false,
                indexCode:'',
                ipAddr:'',
                port:'',
                networkname:'',
                networkindexCode:'',
                networkAddr:'',
                networkPort:'',
                userName:'',
                userPwd:'',
                car:false,
                duty:'',
                warnShowList:'',
                sercurityPerson:false,
                dateRange:'',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
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
                    }]
                    // {
                    //     text: '最近三个月',
                    //     onClick(picker) {
                    //         const end = new Date();
                    //         const start = new Date();
                    //         start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    //         picker.$emit('pick', [start, end]);
                    //     }
                    // }]
                },
                speed:'0',
                deviceName:'',
                deviceNum:'',
                mobileNum:'',
                mapTitle:'',
                selectedCasts:[],
                statusCurrent:''
            }
        },
        components: {
            HistoryMap
        },
        watch:{

            selectedCastContent(news,olds){  //监听选择的广播
                console.log(news,'!!!!!!!!!!');
                //this.selectedCasts=news;
            }
        },

        methods: {
            dateCheck(val){
                console.log(val)
                let duringDate = Math.round((new Date(val[1]).getTime() - new Date(val[0]).getTime())/(1000 * 60 ))
                if(duringDate > 30*24*60){
                    this.isInquireDisable =  true
                    this.$message.error('查询时间不能超过一个月！')
                    return
                }
                this.isInquireDisable =  false
            },
            closeHistoryDialog(){
                this.historyvisible = false
            },
            closeDialog () {
                this.$emit('closeInfoDialog')
            },
            findHistory(){
                // console.log(this.Info.gpsData)
                if(this.dateRange==''){
                    this.$message.error('请输入查询时间！')
                    return
                }

                if(this.transport){
                    var param = {
                        id:this.Info.vehicle.id,
                        from:this.dateRange[0],
                        to:this.dateRange[1]
                    }
                    this.mapTitle = '车船历史轨迹'
                    this.isvehicle = true
                    // this.historyData = [
                    //     {
                    //         id:'1',
                    //         deviceId:'2',
                    //         deviceName:'aaa',
                    //         longitude:this.Info.gpsData.longitude+(Math.random()*10)/10000,
                    //         latitude:this.Info.gpsData.latitude+(Math.random()*10)/10000
                    //     },
                    //     {
                    //         id:'1',
                    //         deviceId:'2',
                    //         deviceName:'aaa',
                    //         longitude:this.Info.gpsData.longitude+(Math.random()*10)/10000,
                    //         latitude:this.Info.gpsData.latitude+(Math.random()*10)/10000
                    //     },
                    //     {
                    //         id:'1',
                    //         deviceId:'2',
                    //         deviceName:'aaa',
                    //         longitude:this.Info.gpsData.longitude+(Math.random()*10)/10000,
                    //         latitude:this.Info.gpsData.latitude+(Math.random()*10)/10000
                    //     }
                    //
                    // ]
                    // this.historyvisible = true

                    console.log(this.Info)
                    Promise.all([this.getHistoryRoute(param)]).then(res=>{
                        console.log(res,'车船历史轨迹数据')
                        this.historyData = res[0]
                        this.historyvisible = true
                    })
                }else if(this.sercurityPerson){
                    //人员历史轨迹
                    var param = {
                        id:this.Info.id,
                        from:this.dateRange[0],
                        to:this.dateRange[1]
                    }
                    this.mapTitle = '人员历史轨迹'
                    this.isvehicle = false
                    // this.historyData = [
                    //     {
                    //         id:'1',
                    //         deviceId:'2',
                    //         deviceName:'aaa',
                    //         longitude:this.Info.gpsData.longitude+(Math.random()*10)/10000,
                    //         latitude:this.Info.gpsData.latitude+(Math.random()*10)/10000
                    //     },
                    //     {
                    //         id:'1',
                    //         deviceId:'2',
                    //         deviceName:'aaa',
                    //         longitude:this.Info.gpsData.longitude+(Math.random()*10)/10000,
                    //         latitude:this.Info.gpsData.latitude+(Math.random()*10)/10000
                    //     },
                    //     {
                    //         id:'1',
                    //         deviceId:'2',
                    //         deviceName:'aaa',
                    //         longitude:this.Info.gpsData.longitude+(Math.random()*10)/10000,
                    //         latitude:this.Info.gpsData.latitude+(Math.random()*10)/10000
                    //     }
                    //
                    // ]
                    // this.historyvisible = true
                    console.log(param)
                    Promise.all([this.getPersonHistory(param)]).then(res=>{
                        console.log(res,'人员历史轨迹数据')
                        this.historyData = res[0]
                        this.historyvisible = true
                    })
                }

                // this.historyData =[
                //     {
                //         "deviceId": "c5aec75d-5dc3-48ca-9afe-127131a59a33",
                //         "ioTDeviceId": null,
                //         "deviceName": "船602",
                //         "createTime": "2018-08-31 15:16:17",
                //         "longitude": 120.21455,
                //         "latitude": 30.1379,
                //         "altitude": null,
                //         "direction": null,
                //         "speed": 0,
                //         "telephone": null,
                //         "deviceNum": null,
                //         "coordinate": null
                //     },
                //     {
                //         "deviceId": "c5aec75d-5dc3-48ca-9afe-127131a59a33",
                //         "ioTDeviceId": null,
                //         "deviceName": "船602",
                //         "createTime": "2018-08-31 15:18:19",
                //         "longitude": 120.21468,
                //         "latitude": 30.1456,
                //         "altitude": null,
                //         "direction": null,
                //         "speed": 0,
                //         "telephone": null,
                //         "deviceNum": null,
                //         "coordinate": null
                //     },
                // ]

                // this.historyvisible = true


            },
            async getPersonHistory(param){
                return await api.user.getUserHistoryRoute(param)
            },
            async getHistoryRoute(param){
                return await api.boat.getHistoryRouteByVehicle(param)
            },
           getWifiById(){
                //假数据
                this.Info.currentConnections = Math.floor(Math.random() * 20 + 1)
                this.Info.upRate = (Math.random()*300+1).toFixed(3)
                this.Info.downRate = (Math.random()*1000+1).toFixed(3)

                setTimeout(()=>{
                    let route = this.$route.path
                    if (route.includes('controler')) {
                        this.getWifiById()
                    }
                },2000)
                // await api.wifi.getDeviceById(this.Info.id).then(res=>{
                //     // this.Info.currentConnections = res.currentConnections
                //     // this.Info.currentConnections = res.currentConnections
                //     // this.Info.upRate = res.upRate
                //     // this.Info.downRate = res.downRate
                //     // this.Info.modelName = res.modelName
                //     // this.Info.description = res.description
                //
                //     setTimeout(()=>{
                //         let route = this.$route.path
                //         if (route.includes('controler')) {
                //             this.getWifiById()
                //         }
                //     },60000)
                // })
            },
            async getTransportById(){
                await api.boat.getAllVehicleGpsById(this.Info.id).then(res=>{
                    this.speed = res[0].gpsData ? res[0].gpsData.speed :'0'
                    setTimeout(()=>{
                        let route = this.$route.path
                        if (route.includes('controler')) {
                            this.getTransportById()
                        }
                    },5000)
                })
            },
            async getPersonById(){
                await api.user.getUserGpsById(this.Info.id).then(res=>{
                    this.speed = res[0].gpsData ? res[0].gpsData.speed :'0'
                    setTimeout(()=>{
                        let route = this.$route.path
                        if (route.includes('controler')) {
                            this.getPersonById()
                        }
                    },5000)
                })
            }
        },
        mounted () {

        },
        created () {
            console.log(this.Info);
            console.log(this.Info.id);
            let route = this.$route.path
            if (route.includes('facility')) {
                this.facility=false
            }
            (this.selectedCasts).push(this.Info.id);
            if(this.Info.type==="wifi"){
                this.wifiShow=true
                this.getWifiById()
            }
            if(this.Info.type==="广播"){
                this.jsonAttr=JSON.parse(this.Info.jsonAttr)
                this.broadShow=true
                if(this.jsonAttr){
                    this.fileName=this.jsonAttr.status.fileName
                    this.volume=this.jsonAttr.status.volume

                }else {
                    this.fileName='暂未启用'
                    this.volume='0'
                };

                /*api.intelligentBox.getStartVolumn(this.selectedCasts).then(res=>{
                    console.log(res,'获取初始音量')
                    this.volume=res;
                });*/
                api.intelligentBox.getStartStatus(this.selectedCasts).then(res=>{
                    console.log(res,'获取初始状态')
                    this.volume=res.volume;
                    this.statusCurrent=res.status;

                    //this.volume=res;
                });

            }
            if(this.Info.type==="摄像头"){
                this.jsonAttr=JSON.parse(this.Info.jsonAttr)
                this.cameraShow=true
            }
            if(this.Info.type==="传感器"){
                this.jsonAttr=JSON.parse(this.Info.jsonAttr)
                if(this.jsonAttr){
                    this.name=this.jsonAttr.name
                    this.temp=this.jsonAttr.temp
                    this.moisture=this.jsonAttr.moisture
                    this.pm25=this.jsonAttr.pm25
                    this.negativeOxygenIons=this.jsonAttr.negativeOxygenIons
                    this.windSpeed=this.jsonAttr.windSpeed
                    this.rainfall=this.jsonAttr.rainfall
                }else {
                    this.name=''
                    this.temp='0℃'
                    this.moisture='0%RH'
                    this.pm25='0ug/m3'
                    this.negativeOxygenIons='0个/cm3'
                    this.windSpeed='0m/s'
                    this.rainfall='0mm/h'
                }
                this.facility=false
                this.environment=true
            }
            if(this.Info.type==="卫生间"){
                this.Info.description=this.Info.toiletBean.description
                this.facility=false
            }
            if(this.Info.type==="停车场"){
                this.Info.description=this.Info.parkingBean.description
                for (let i = 0; i < this.parking.length; i++) {
                    if(this.parking[i].id==this.Info.id){
                        this.Info.parkingAll=this.parking[i].parkingAll
                        this.Info.useParking=this.parking[i].useParking
                        this.Info.remainParking=this.parking[i].parkingAll-this.parking[i].useParking
                    }
                }
                this.park=true
                this.facility=false
            }
            if(this.Info.type==="建筑"){
                this.Info.description=this.Info.building.description
                this.facility=false
            }
            if(this.Info.type==="商圈"){
                this.Info.description=this.Info.businessBean.description
                this.facility=false
            }
            if(this.Info.type==="景点"){
                this.Info.description=this.Info.scenicspotBean.description
                this.facility=false
            }
            if(this.Info.type==="垃圾桶"){
                this.Info.description=this.Info.dustbinBean.description
                this.facility=false
            }
            if(this.Info.type==="植物"){
                this.Info.description=this.Info.plant.description
                this.facility=false
            }
            if(this.Info.type==="指示牌"){
                this.Info.description=this.Info.signboardBean.description
                this.facility=false
            }

            if(!this.Info.regionName || this.Info.regionName==null){
                this.Info.regionName='未知片区设备'
            }
            if(this.Info.type==="warn"){
                this.facility=false
                this.warnShowList=true
                this.Info.name=this.Info.serialNum
            }

            if(this.Info.type == "transport"){
                if(this.Info.driver==null){
                    this.deviceName=''
                    this.deviceNum=''
                }else {
                    this.deviceName=this.Info.driver.name
                    this.deviceNum=this.Info.driver.phone
                }
                if(this.Info.gpsData==null){
                    this.speed='0'
                }else {
                    this.speed=this.Info.gpsData.speed
                }
                this.facility=false
                this.transport = true

                this.getTransportById()
            }
            if(this.Info.type == "security"){

                if(this.Info.gpsData==null){
                    this.speed='0'
                }else {
                    this.speed=this.Info.gpsData.speed
                }
                this.mobileNum = this.Info.data.mobileNum
                this.facility=false
                this.sercurityPerson = true

                this.getPersonById()
            }

        },
        computed: {

        },
    }
</script>
<style lang="scss">
    .controlDialog{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 100%;
        }
        .el-dialog--center{
            padding: 0;
            /*height: rem(300);*/
        }
        .el-dialog__header{
            padding: rem(10) rem(20);
            text-align: left;
            border-bottom: 1px solid #ccc;
        }
        .el-dialog__title{
            font-size: rem(16);
        }
        .el-dialog__headerbtn {
            top: rem(12);
            i{
                font-size: rem(20);
            }
        }
        .el-dialog__body{
            padding: rem(10) rem(20);
            box-sizing: border-box;
            font-size: rem(14);
            min-height: rem(150);
        }
        .el-input__prefix {
            left: rem(135);
        }
        .el-dialog__footer{
            padding: 0;
            padding: rem(5) 0;
        }
        .el-dialog--center .el-dialog__footer{
            text-align: right;
            padding-right: rem(15);
            border-top: 1px solid #ccc;
            margin-top: rem(15);
        }
        .el-date-editor,.el-input,.el-input--prefix,.el-input--suffix,.el-date-editor--date{
            margin-top: rem(-2);
        }
        .el-date-editor,.el-input,.el-input--prefix,.el-input--suffix,.el-date-editor--date .el-input__inner{
            border: none;
            height: rem(30);
            line-height: rem(30);
        }
        .el-date-editor,.el-input,.el-input--prefix,.el-input--suffix,.el-date-editor--date .el-input__icon{
            line-height: rem(30);
        }
        .el-select .el-input,.el-input--suffix{
            margin-top: rem(-3);
        }
        .data .el-input__inner{
            padding-left: rem(10);
        }
        .el-input__inner{
            border: none;
            height: rem(30);
            line-height: rem(30);
            font-size: rem(12);
            padding: 0;
            padding-left: rem(10);
            width:80%;
        }
        .el-input{
            width: rem(160);
            padding-left: rem(5);
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .controlDialog{
        .card{
            width: 100%;
            height: 100%;
            .park{
                span{
                    color: #f60;
                    font-size: 22px;
                    line-height: rem(40);
                }
            }
            .personCardContent ,.boatCardContent {
                width: 100%;
                height: 100%;
                position: relative;
                p{
                    margin-top: rem(8);
                    /*border-bottom: 1px solid #ccc;*/
                    font-size: rem(14);
                    line-height:rem(32) ;
                    text-align: left;
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                        font-size: rem(12);
                        padding-left: rem(10);
                    }
                    select{
                        border: none;
                        outline: none;
                        width: rem(100);
                        font-size: rem(12);
                        option{
                            appearance:none;
                            list-style: none;
                            border: none;
                            width: 100%;
                            outline: none;
                            padding: 0;
                            margin: 0;
                            /*border:  1px solid #ccc;*/
                            background: #fff;

                        }
                    }
                    i {
                        display: inline-block;
                        font-size: rem(16);
                        vertical-align: middle;
                        cursor: pointer;
                    }
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(3);
                        box-sizing: border-box;
                        border-radius: rem(5);
                    }
                }
                .person-driv{
                    display:none;
                }
                .ms{
                    span{
                        width:rem(66)
                    }
                    div{
                        width:70%
                    }
                }
                .textarea{
                    border-bottom: 1px solid transparent;
                }
                .basicType{
                    text-align: center;
                }
                .img{
                    width: rem(100);
                    height: rem(60);
                    position: absolute;
                    top: rem(0);
                    right: rem(-20);
                    background: #fff;
                    img{
                        width: rem(55);
                        height: rem(55);
                        display: inline-block;
                        border-radius: 50%;
                        margin-left: rem(18);
                    }
                }
            }
            .cardFooter {
                text-align: right;
                width: 100%;
                padding: rem(5) rem(10);
                box-sizing: border-box;
                border-top: 1px solid #ccc;
                .el-button{
                    padding: 0;
                    padding: rem(4) rem(6);
                }
            }

        }
        .map {
            width: rem(400);
            height: rem(400);
        }
    }
</style>
