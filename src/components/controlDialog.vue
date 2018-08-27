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
                    </div>
                    <div v-if="cameraShow" class="cameraShow">
                        <p class="name">媒体编码：
                            {{this.indexCode}}
                        </p>
                        <p class="name">媒体地址：
                            {{this.ipAddr}}
                        </p>
                        <p class="name">媒体端口：
                            {{this.port}}
                        </p>
                        <p class="name">设备名称：
                            {{this.networkname}}
                        </p>
                        <p class="name">设备编码：
                            {{this.networkindexCode}}
                        </p>
                        <p class="name">设备地址：
                            {{this.networkAddr}}
                        </p>
                        <p class="name">设备端口：
                            {{this.networkPort}}
                        </p>
                        <p class="name">设备账号：
                            {{this.userName}}
                        </p>
                        <p class="name">设备密码：
                            {{this.userPwd}}
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
                    <div v-if="car" class="car">
                        <p class="name">当前速度：
                            <span>{{this.duty}}Km/h</span>
                        </p>
                        <p class="name">司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：
                            <span>{{this.Info.driver}}</span>
                        </p>
                        <p class="name">手机号码：
                            <span>{{this.Info.telephone}}</span>
                        </p>
                        <p class="name">车牌号码：
                            <span>{{this.Info.vehicle_ship_id}}</span>
                        </p>
                    </div>

                    <div v-if="subtype='car'" class="car">
                        <p class="name">编号：
                            <span>{{this.duty}}Km/h</span>
                        </p>
                        <p class="name">司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：
                            <span>{{this.Info.driver}}</span>
                        </p>
                        <p class="name">手机号码：
                            <span>{{this.Info.telephone}}</span>
                        </p>
                        <p class="name">班次：
                            <span>{{this.Info.vehicle_ship_id}}</span>
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
                                align="right">
                            </el-date-picker>
                        </p>
                    </div>
                    <!--<div v-if="subtype='boat'" class="car">-->
                        <!--<p class="name">当前速度：-->
                            <!--<span>{{this.duty}}Km/h</span>-->
                        <!--</p>-->
                        <!--<p class="name">司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：-->
                            <!--<span>{{this.Info.driver}}</span>-->
                        <!--</p>-->
                        <!--<p class="name">手机号码：-->
                            <!--<span>{{this.Info.telephone}}</span>-->
                        <!--</p>-->
                        <!--<p class="name">车牌号码：-->
                            <!--<span>{{this.Info.vehicle_ship_id}}</span>-->
                        <!--</p>-->
                    <!--</div>-->
                    <p class="name" v-if="facility">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        {{this.Info.modelName}}
                    </p>
                    <p class="name">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：
                        {{this.Info.description}}
                    </p>
                </div>
                <div v-if="type='transport'"class=""slot="footer" class="dialog-footer cardFooter">
                    <el-button size="mini" class="hold">保存</el-button>
                    <el-button size="mini" @click = 'closeDialog'>取消</el-button>
                </div>

            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "control-dialog",
        props: ['visible', 'Info','title'],
        data () {
            return {
                route:'',
                wifiShow:false,
                facility:true,
                park:false,
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
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
        methods: {
            closeDialog () {
                this.$emit('closeInfoDialog')
            },
        },
        mounted () {

        },
        created () {
            if(this.Info.type==="wifi"){
                this.wifiShow=true
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
                }
            }
            if(this.Info.type==="摄像头"){
                this.jsonAttr=JSON.parse(this.Info.jsonAttr)
                this.cameraShow=true
                if(this.jsonAttr){
                    this.indexCode=this.jsonAttr.vrmServer.indexCode
                    this.ipAddr=this.jsonAttr.vrmServer.ipAddr
                    this.port=this.jsonAttr.vrmServer.port
                    this.networkname=this.jsonAttr.device.name
                    this.networkindexCode=this.jsonAttr.device.indexCode
                    this.networkAddr=this.jsonAttr.device.networkAddr
                    this.networkPort=this.jsonAttr.device.networkPort
                    this.userName=this.jsonAttr.device.userName
                    this.userPwd=this.jsonAttr.device.userPwd
                }else {
                    this.indexCode=''
                    this.ipAddr=''
                    this.port=''
                    this.networkname=''
                    this.networkindexCode=''
                    this.networkAddr=''
                    this.networkPort=''
                    this.userName=''
                    this.userPwd=''
                }
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
            if(this.Info.type==="车辆"){
                console.log(this.Info);
                this.car=true
                this.facility=false
                if(this.Info.gpsData.duty!=null){
                    this.duty=this.Info.gpsData.duty
                }else {
                    this.duty='0'
                }
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

            if(this.Info.regionName==null){
                this.Info.regionName=this.$config.regionName
            }
            if(this.Info.type==="warn"){
                this.facility=false
                this.warnShowList=true
                this.Info.name=this.Info.serialNum
            }

            if(this.Info.type = "transport"){
                this.Info.description=this.Info.transport.description
                this.facility=false
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
