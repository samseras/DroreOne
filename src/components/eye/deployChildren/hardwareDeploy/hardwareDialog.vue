<template>
    <div class="hardwareDialog">
        <el-dialog
            :title="title"
            :visible="visible"
            :before-close="closeDialog"
            width="25%"
            class="dialog echatDialog"
            center>
            <div class="card">
                <!--摄像头-->
                <div class="cameraCard popCard" v-if="route.includes('camera')">
                    <p class="cameraType">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="camera.positionType">
                            <option value="0">室内</option>
                            <option value="1">室外</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="camera.name"> </p>
                    <p class="manufacturer">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        <select name="" v-model="camera.manufactor">
                            <option value="海康">海康</option>
                            <option value="卓锐">卓锐</option>
                        </select>
                    </p>
                    <p class="IP">I P 地 址：<input type="text" v-model="camera.ip"></p>
                    <p class="port">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  口：<input type="text" v-model="camera.port"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="camera.location"></p>
                    <p class="area">所属片区：<input type="text" v-model="camera.regionId"></p>
                    <p class="description">描&nbsp; 述：
                        <textarea v-model="camera.description" cols="40" rows="8">
                                {{camera.description}}
                        </textarea>
                    </p>
                    <div class="img">
                        <img src="../../../../../static/img/cameras.png" alt="">
                    </div>
                </div>
                <!--广播-->
                <div class="cameraCard popCard" v-if="route.includes('broadcast')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="broadCast.positionType">
                            <option value="0">室内</option>
                            <option value="1">室外</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="broadCast.name"> </p>
                    <p class="home">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        <select name="" v-model="broadCast.manufactor">
                            <option value="海康">海康</option>
                            <option value="卓锐">卓锐</option>
                        </select>
                    </p>
                    <p class="IP">I P 地 址：<input type="text" v-model="broadCast.ip"></p>
                    <p class="host">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  口：<input type="text" v-model="broadCast.port"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="broadCast.location"></p>
                    <p class="area">所属区域：<input type="text" v-model="broadCast.regionId"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="broadCast.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--LED-->
                <div class="cameraCard popCard" v-if="route.includes('led')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="led.positionType">
                            <option value="0">室内</option>
                            <option value="1">室外</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="led.name"> </p>
                    <p class="width">屏幕宽高：<input type="text" v-model="led.area"></p>
                    <p class="IP">I P 地 址：<input type="text" v-model="led.ip"></p>
                    <p class="host">设备编号：<input type="text" v-model="led.serialNum"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="led.location"></p>
                    <p class="area">所属片区：<input type="text" v-model="led.regionId"></p>
                    <p class="describe">描&nbsp;&nbsp;&nbsp;述：
                        <textarea v-model="led.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--Wifi-->
                <div class="cameraCard popCard" v-if="route.includes('wifi')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="wifi.positionType">
                            <option value="0">室内</option>
                            <option value="1">室外</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="wifi.name"> </p>
                    <p class="version">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" v-model="wifi.model"></p>
                    <p class="IP">设备I P ：<input type="text" v-model="wifi.ip"></p>
                    <p class="mac">M a c：<input type="text" v-model="wifi.mac"></p>
                    <p class="host">设备编号：<input type="text" v-model="wifi.serialNum"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="wifi.location"></p>
                    <p class="area">所属片区：<input type="text" v-model="wifi.regionId"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="wifi.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--传感器-->
                <div class="cameraCard popCard" v-if="route.includes('monitors')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="monitors.sensorType">
                            <option value="1">温度</option>
                            <option value="2">湿度</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="monitors.name"> </p>
                    <p class="version">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        <select name="" v-model="monitors.manufactor">
                            <option value="卓锐">卓锐</option>
                            <option value="室外">天气</option>
                        </select>
                    </p >
                    <p class="IP">设备I P ：<input type="text" v-model="monitors.ip"></p>
                    <p class="host">设备编号：<input type="text" v-model="monitors.serialNum"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="monitors.location"></p>
                    <p class="area">所属片区：<input type="text" v-model="monitors.regionId"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="monitors.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--灯光-->
                <div class="cameraCard popCard" v-if="route.includes('Light')">
                    <p class="status">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:
                        <select name="" v-model="Light.lightStatus">
                            <option value="true">通电</option>
                            <option value="false">断电</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="Light.name"> </p>
                    <p class="home">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  家：
                        <select name="" v-model="Light.manufactor">
                            <option value="0">卓锐</option>
                            <option value="1">西安</option>
                        </select>
                    </p>
                    <p class="num">路灯编号：<input type="text" v-model="Light.serialNum"></p>
                    <p class="version">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" v-model="Light.model"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="Light.location"></p>
                    <p class="area">所属片区：<input type="text" v-model="Light.regionId"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="Light.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--闸机-->
                <div class="cameraCard popCard" v-if="route.includes('gate')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="gate.gateType">
                            <option value="1">翼闸</option>
                            <option value="2">摆闸</option>
                            <option value="3">三锟闸</option>
                            <option value="4">平移闸</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="gate.name"> </p>
                    <p class="version">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" v-model="gate.model"></p>
                    <p class="IP">设备I P ：<input type="text" v-model="gate.ip"></p>
                    <p class="num">设备编号：<input type="text" v-model="gate.serialNum"></p>
                    <p class="name">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;口：<input type="text" v-model="gate.port"> </p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="gate.location"></p>
                    <p class="area">所属片区：<input type="text" v-model="gate.regionId"></p>
                    <p class="describe">描&nbsp;&nbsp;&nbsp;&nbsp; 述：
                        <textarea v-model="gate.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--报警柱-->
                <div class="cameraCard popCard" v-if="route.includes('police')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="police.sensorType">
                            <option value="10">报警柱</option>
                            <option value="11">越界</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="police.name"> </p>
                    <p class="version">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家:
                        <select name="" v-model="police.manufactor">
                            <option value="报警">报警柱</option>
                            <option value="越界">越界</option>
                        </select>
                    </p>
                    <p class="host">设备编号：<input type="text" v-model="police.serialNum"></p>
                    <p class="IP">设备I P ：<input type="text" v-model="police.ip"></p>

                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="police.location"></p>
                    <p class="area">所属片区：<input type="text" v-model="police.regionId"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="police.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
            </div>

            <div slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" @click="addNewInfo" :disabled="isDisabled">保存</el-button>
                <el-button size="mini" type="primary" @click="closeDialog" :disabled="isDisabled">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
   export default{
       props:['visible','Info','title','isDisabled'],
       data(){
           return{
              camera:{
                  positionType:'',
                  name:'',
                  manufactor:'',
                  ip:'',
                  port:'',
                  regionId:'',
                  description:'',
                  location:''
              },
               broadCast:{
                   positionType:'',
                   name:'',
                   manufactor:'',
                   ip:'',
                   port:'',
                   location:'',
                   regionId:'',
                   description:''
               },
               led:{
                   positionType:'',
                   name:'',
                   area:'',
                   ip:'',
                   serialNum:'',
                   location:'',
                   regionId:'',
                   description:''
               },
               wifi:{
                   positionType:'',
                   name:'',
                   model:'',
                   ip:'',
                   mac:'',
                   serialNum:'',
                   location:'',
                   regionId:'',
                   description:''
               },
               monitors:{
                   sensorType:'',
                   name:'',
                   manufactor:'',
                   ip:'',
                   serialNum:'',
                   location:'',
                   regionId:'',
                   description:''
               },
               Light:{
                   lightStatus:'',
                   name:'',
                   manufactor:'',
                   serialNum:'',
                   model:'',
                   location:'',
                   regionId:'',
                   description:''
               },
               gate:{
                   gateType:'',
                   name:'',
                   model:'',
                   ip:'',
                   serialNum:'',
                   port:'',
                   location:'',
                   regionId:'',
                   description:''
               },
               police:{
                   sensorType:'',
                   name:'',
                   manufactor:'',
                   serialNum:'',
                   ip:'',
                   location:'',
                   regionId:'',
                   description:''
               },

               route:''
           }
       },
       methods:{
           closeDialog(){
               this.$emit('closeInfoDialog')
           },
           addNewInfo(){
               let newInfo={ }
               if(this.route.includes('camera')){
                   newInfo=this.camera
               }else if(this.route.includes('broadcast')){
                   newInfo=this.broadCast
               }else if(this.route.includes('led')) {
                   newInfo = this.led
               }else if(this.route.includes('wifi')) {
                   newInfo = this.wifi
               }else if(this.route.includes('monitors')) {
                   newInfo = this.monitors
               }else if(this.route.includes('Light')) {
                   newInfo = this.Light
               }else if(this.route.includes('gate')) {
                   newInfo = this.gate
               }else if(this.route.includes('police')) {
                   newInfo = this.police
               }
               newInfo.status=true
               newInfo.checked=false

               if(this.Info.id){
                   newInfo.id=this.Info.id
                   this.$emit('fixInfo',newInfo)
               }else{
                   this.$emit('addNewInfo',newInfo)
               }
               this.closeDialog()
           }
       },
       created(){
           this.route=this.$route.path
           if(this.route.includes('camera')){
               this.camera=this.Info
           }else if(this.route.includes('broadcast')){
               this.broadCast=this.Info
           }else if(this.route.includes('led')){
               this.led=this.Info
           }else if(this.route.includes('wifi')){
               this.wifi=this.Info
           }else if(this.route.includes('monitors')){
               this.monitors=this.Info
           }else if(this.route.includes('Light')){
               this.Light=this.Info
           }else if(this.route.includes('gate')){
               this.gate=this.Info
           }else if(this.route.includes('police')){
               this.police=this.Info
           }
       }
   }

</script>

<style lang="scss" type="text/scss">
    .hardwareDialog{
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
            padding: rem(5) 0 0 rem(5);
            text-align: left;
            border-bottom: 1px solid #ccc;
        }
        .el-dialog__title{
            font-size: rem(14);
        }
        .el-dialog__headerbtn {
            top: rem(7);
        }
        .el-dialog__body{
            padding: rem(10) rem(15) 0 rem(15);
            box-sizing: border-box;

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
    }
</style>

<style lang="scss" scoped type="text/scss">
    .hardwareDialog{
        .card{
            width: 100%;
            height: 100%;
            .cameraCard , .popCard{
                width: 100%;
                height: 100%;
                position: relative;

                p{
                    margin-top: rem(8);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(12);
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                        font-size:rem(12)
                    }
                    select{
                        border: none;
                        outline: none;
                        width: rem(100);
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
                    img {
                        display: inline-block;
                        width: rem(20);
                        height: rem(20);
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(3);
                        box-sizing: border-box;
                    }
                }
                .img{
                        width: rem(100);
                        height: rem(60);
                        position: absolute;
                        top: rem(0);
                        right: rem(0);
                        background: #fff;
                        img{
                            width: rem(55);
                            height: rem(55);
                            border:1px solid #988E83;
                            display: inline-block;
                            border-radius: 50%;
                            margin-left: rem(25);
                        }
                    }
            }
            .cardFooter {
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
    }

</style>


