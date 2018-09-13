<template>
    <div class="set-area">
        <div class="top">
            <div class="left">
                <Map></Map>
                <!--<ul class="status-show">
                    <li>嘿嘿</li>
                    <li>哈哈</li>
                    <li>哈哈</li>
                    <li>哈哈</li>
                    <li>哈哈</li>
                </ul>-->
            </div>
            <div class="right">
                <div class="title">
                    <p class="text">广播区</p>
                    <div class="icon">
                        <!--<i class="el-icon-delete"></i>
                        <i class="el-icon-delete"></i>
                        <i class="el-icon-delete"></i>-->
                    </div>
                </div>
                <div class="broadcast-group">
                    <el-checkbox-group v-model="checkList" class="box-list"  @change="selectBox">
                        <div v-for="item in allBoxStatus"><el-checkbox :label="item">{{item.id}}</el-checkbox>  <span class="status">{{item.playStatus}}</span></div>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="input-group">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="输入">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="优先等级">
                        <el-select v-model="form.level" placeholder="">
                            <el-option label="高级" value="emergency"></el-option>
                            <el-option label="低级" value="common"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn">
                <div class="btn-wrap">
                    <img src="../../../static/img/intelligentbox/bo.png" alt="" @click="play">
                    <!--<img src="../../../static/img/intelligentbox/stream.png" alt="" @click="handleaudio">-->
                </div>
            </div>
        </div>
        <audio autoplay id="testaud"></audio>
    </div>
</template>
<script>
    import api from '@/api'
    import Bus from '@/api/bus.js'
    import Map from '@/components/map'
    export default {
        name:'setArea',
        data(){
            return {
                form:{
                    name:'',
                    level:'emergency',
                },
                checkList:[],
                allBoxStatus:[],
                tempspeakers:[],
                websock: null,
                tempstream:null,
            }
        },
        components: {
            Map
        },
        created(){

        },
        destroyed() {

        },
        mounted(){
            this.getAllIntelligentBoxStatus();
        },
        methods:{
            selectBox(){
                console.log(this.checkList,'888888');
                let speakers=[]
                this.checkList.forEach(item=>{
                    this.allBoxStatus.forEach(one=>{
                        if(item.name===one.name){
                            speakers.push(one.id)
                        }
                    })
                })
                console.log(speakers);
                Bus.$emit('txt',speakers);
                //Bus.$emit('txt',this.checkList);
                //this.msg='';
                let speaktemps=[];
                speakers.forEach(item=>{
                    speaktemps.push({speakerId:item,groupId:1})
                })
                console.log(speaktemps,'@@@@@@@');
                this.form.speaktemps=speaktemps;
            },
            async getAllIntelligentBoxStatus(){
                this.allBoxStatus=[
                    {createTime
                            :
                            "2018-08-02 17:09:58",
                        creator
                            :
                            "admin",
                        currentConnections
                            :
                            null,
                        description
                            :
                            "smart speaker device",
                        downRate
                            :
                            null,
                        gateType
                            :
                            null,
                        id
                            :
                            "speaker_7bd92e",
                        ip
                            :
                            null,
                        jsonAttr
                            :
                            null,
                        latitude
                            :
                            null,
                        lightStatus
                            :
                            null,
                        longitude
                            :
                            null,
                        mac
                            :
                            null,
                        manufactor
                            :
                            null,
                        model
                            :
                            "10000010000102",
                        modelName
                            :
                            "立方停车场1.1",
                        modifier
                            :
                            "admin",
                        modifyTime
                            :
                            "2018-08-02 17:09:58",
                        name
                            :
                            "speaker_7bd92e",
                        pictureId
                            :
                            null,
                        picturePath
                            :
                            null,
                        port
                            :
                            null,
                        positionType
                            :
                            null,
                        regionId
                            :
                            null,
                        regionName
                            :
                            null,
                        screenHeight
                            :
                            null,
                        screenWidth
                            :
                            null,
                        sensorType
                            :
                            null,
                        serialNum
                            :
                            null,
                        status
                            :
                            null,
                        typeId
                            :
                            10,
                        upRate
                            :
                            null},
                    {createTime
                            :
                            "2018-08-02 17:26:50",
                        creator
                            :
                            "admin",
                        currentConnections
                            :
                            null,
                        description
                            :
                            "smart speaker device",
                        downRate
                            :
                            null,
                        gateType
                            :
                            null,
                        id
                            :
                            "speaker2_7bd92e",
                        ip
                            :
                            null,
                        jsonAttr
                            :
                            null,
                        latitude
                            :
                            null,
                        lightStatus
                            :
                            null,
                        longitude
                            :
                            null,
                        mac
                            :
                            null,
                        manufactor
                            :
                            null,
                        model
                            :
                            "10000010000102",
                        modelName
                            :
                            "立方停车场1.1",
                        modifier
                            :
                            "admin",
                        modifyTime
                            :
                            "2018-08-02 17:26:50",
                        name
                            :
                            "speaker2_7bd92e",
                        pictureId
                            :
                            null,
                        picturePath
                            :
                            null,
                        port
                            :
                            null,
                        positionType
                            :
                            null,
                        regionId
                            :
                            null,
                        regionName
                            :
                            null,
                        screenHeight
                            :
                            null,
                        screenWidth
                            :
                            null,
                        sensorType
                            :
                            null,
                        serialNum
                            :
                            null,
                        status
                            :
                            null,
                        typeId
                            :
                            10,
                        upRate
                            :
                            null},
                    {
                        createTime
                            :
                            "2018-08-02 17:27:28",
                        creator
                            :
                            "admin",
                        currentConnections
                            :
                            null,
                        description
                            :
                            "smart speaker device",
                        downRate
                            :
                            null,
                        gateType
                            :
                            null,
                        id
                            :
                            "speaker3_7bd92e",
                        ip
                            :
                            null,
                        jsonAttr
                            :
                            null,
                        latitude
                            :
                            null,
                        lightStatus
                            :
                            null,
                        longitude
                            :
                            null,
                        mac
                            :
                            null,
                        manufactor
                            :
                            null,
                        model
                            :
                            "10000010000102",
                        modelName
                            :
                            "立方停车场1.1",
                        modifier
                            :
                            "admin",
                        modifyTime
                            :
                            "2018-08-02 17:27:28",
                        name
                            :
                            "speaker3_7bd92e",
                        pictureId
                            :
                            null,
                        picturePath
                            :
                            null,
                        port
                            :
                            null,
                        positionType
                            :
                            null,
                        regionId
                            :
                            null,
                        regionName
                            :
                            null,
                        screenHeight
                            :
                            null,
                        screenWidth
                            :
                            null,
                        sensorType
                            :
                            null,
                        serialNum
                            :
                            null,
                        status
                            :
                            null,
                        typeId
                            :
                            10,
                        upRate
                            :
                            null,
                    }
                ]
                /*await api.intelligentBox.getAllBoxInfo().then(res=>{
                    console.log(res,'这是传回来的所有智能音箱的状态');

                    this.allBoxStatus=res;

                }).catch(err=>{
                    console.log(err,'失败')
                })*/
            },
            async play(){
                await api.intelligentBox.goplaystream(this.form).then(res=>{
                    console.log(res,'!!!!!!!!!!');
                    //this.allBoxStatus=res;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            },




            /********音频操作开始********/
            handleaudio(){
                //this.initWebSocket();
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({
                        audio: true
                    },function (stream) {
                        console.log(stream,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                        /*this.tempstream=stream;
                        console.log(this.tempstream,'@@@@@@@@@@@@');
                        console.log(window.URL.createObjectURL(this.tempstream));*/
                        let audio=document.getElementById('testaud')
                        audio.src = window.URL.createObjectURL(stream);
                        console.log(audio.src,'吱吱吱')
                        // do whatever you want with the video
                        audio.play();
                    },function(err){})
                }
            },
            initWebSocket(){ //初始化weosocket
                const wsuri = "ws://127.0.0.1:8080";
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen(){ //连接建立之后执行send方法发送数据
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({
                        audio: true
                    },function (stream) {

                        this.tempstream=stream;
                        console.log(this.tempstream,'@@@@@@@@@@@@');
                        console.log(window.URL.createObjectURL(this.tempstream));
                    },function(err){})
                }
                console.log(this.tempstream,'66666');

                let that=this;
                setInterval(function () {
                    that.websocketsend(JSON.stringify(that.tempstream));
                },200)
                //this.websocketsend(JSON.stringify(actions));
            },
            websocketonerror(){//连接建立失败重连
                this.initWebSocket();
            },
            websocketonmessage(e){ //数据接收
                const redata = JSON.parse(e.data);
            },
            websocketsend(Data){//数据发送
                this.websock.send(Data);
            },
            websocketclose(e){  //关闭
                console.log('断开连接',e);
            },


            /********音频操作结束********/
        }
    }
</script>
<style lang="scss" type="text/scss">
    .set-area{
        width: 96%;
        height: 96%;
        padding: 2% 2%;
        padding-bottom:rem(0);
        display:flex;
        flex-direction: column;
        .top{
            height:75%;
            display:flex;
            flex-direction: row;
            justify-content:space-between;
            .left{
                width:74%;
                //background:url(../../../static/img/intelligentbox/baseimg.jpg) no-repeat;
                //background-size: 100% 100%;
                position: relative;
                .status-show{
                    position:absolute;
                    top:rem(12);
                    right:rem(32);
                    width:30%;
                    height:rem(30);
                    background-color:#ecf0e4;
                    border-radius:rem(4);
                    display:flex;
                    flex-direction: row;
                    justify-content: space-around;
                    li{
                        width:18%;
                        text-align: center;
                        line-height:rem(30);
                    }
                }
            }
            .right{
                width:25%;
                //background:#e4353c;
                border:1px solid #e5e5e5;
                display:flex;
                flex-direction: column;
                .title{
                    width:100%;
                    height:rem(50);
                    background-color:#e5e5e5;
                    display:flex;
                    flex-direction:row;
                    .text{
                        width:60%;
                        line-height:rem(50);
                        text-indent:rem(16);
                    }
                    .icon{
                        width:40%;
                        line-height:rem(50);
                        img{
                            width:30%;
                        }
                    }

                }
                .broadcast-group{
                    height:70%;
                    width:100%;
                    overflow: auto;
                    //background-color:#00b5ea;
                    .box-list{
                        .el-checkbox{
                            width:80%;
                        }
                        div{
                            padding:rem(8) rem(8);
                            .status{
                                font-size:rem(14);

                            }
                        }
                    }
                }

            }
        }
        .bottom{
            height:25%;
            //background:#00B83F;
            display:flex;
            flex-direction: row;
            .input-group{
                width:50%;
                height:100%;
                .el-form{
                    margin-top:rem(32);
                    .el-input__inner{
                        background-color:#eee;
                    }
                }
            }
            .btn{
                width:50%;
                height:100%;
                .btn-wrap{
                    cursor:pointer;
                    margin-top:rem(58);
                    margin-left:rem(64);
                    img:last-child{
                        margin-left:rem(32)
                    }
                }
            }
        }
    }
</style>
