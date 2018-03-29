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
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="camera.type">
                            <option value="室内">室内</option>
                            <option value="室外">室外</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="camera.name"> </p>
                    <p class="home">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        <select name="" v-model="camera.home">
                            <option value="海康">海康</option>
                            <option value="卓锐">卓锐</option>
                        </select>
                    </p>
                    <p class="IP">I P 地 址：<input type="text" v-model="camera.IP"></p>
                    <p class="host">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  口：<input type="text" v-model="camera.host"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="camera.place"></p>
                    <p class="area">所属片区：<input type="text" v-model="camera.area"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="camera.describe" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                        <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--广播-->
                <div class="cameraCard popCard" v-if="route.includes('broadcast')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="broadCast.type">
                            <option value="室内">室内</option>
                            <option value="室外">室外</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="broadCast.name"> </p>
                    <p class="home">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        <select name="" v-model="broadCast.home">
                            <option value="海康">海康</option>
                            <option value="卓锐">卓锐</option>
                        </select>
                    </p>
                    <p class="IP">I P 地 址：<input type="text" v-model="broadCast.ip"></p>
                    <p class="host">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  口：<input type="text" v-model="broadCast.host"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="broadCast.place"></p>
                    <p class="area">所属片区：<input type="text" v-model="broadCast.area"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="broadCast.describe" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--LED-->
                <div class="cameraCard popCard" v-if="route.includes('led')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="led.type">
                            <option value="室内">室内</option>
                            <option value="室外">室外</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="led.name"> </p>
                    <p class="width">屏幕宽高：<input type="text" v-model="led.width"></p>
                    <p class="IP">I P 地 址：<input type="text" v-model="led.ip"></p>
                    <p class="host">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  口：<input type="text" v-model="led.host"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="led.place"></p>
                    <p class="area">所属片区：<input type="text" v-model="led.area"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="led.describe" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--Wifi-->
                <div class="cameraCard popCard" v-if="route.includes('wifi')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="wifi.type">
                            <option value="室内">室内</option>
                            <option value="室外">室外</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="wifi.name"> </p>
                    <p class="version">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" v-model="wifi.version"></p>
                    <p class="IP">设备I P ：<input type="text" v-model="wifi.ip"></p>
                    <p class="mac">M a c：<input type="text" v-model="wifi.Mac"></p>
                    <p class="host">设备编号：<input type="text" v-model="wifi.host"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="wifi.place"></p>
                    <p class="area">所属片区：<input type="text" v-model="wifi.area"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="wifi.describe" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--传感器-->
                <div class="cameraCard popCard" v-if="route.includes('monitors')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="monitors.type">
                            <option value="室内">空气</option>
                            <option value="室外">天气</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="monitors.name"> </p>
                    <p class="version">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        <select name="" v-model="monitors.home">
                            <option value="卓锐">卓锐</option>
                            <option value="室外">天气</option>
                        </select>
                    </p >
                    <p class="IP">设备I P ：<input type="text" v-model="monitors.ip"></p>
                    <p class="host">设备编号：<input type="text" v-model="monitors.host"></p>
                    <p class="area">所属片区：<input type="text" v-model="monitors.area"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="monitors.describe" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>
                <!--灯光-->
                <div class="cameraCard popCard" v-if="route.includes('Light')">
                    <p class="status">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:<input type="text" v-model="Light.status"></p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="Light.name"> </p>
                    <p class="home">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  家：
                        <select name="" v-model="Light.home">
                            <option value="室内">室内</option>
                            <option value="室外">室外</option>
                        </select>
                    </p>
                    <p class="num">路灯编号：<input type="text" v-model="Light.num"></p>
                    <p class="version">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" v-model="Light.version"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="Light.place"></p>
                    <p class="area">所属片区：<input type="text" v-model="Light.area"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="Light.describe" cols="40" rows="8">

                        </textarea>
                    </p>
                    <!--<div class="chart">-->
                    <!--<img src="../../../../../static/img/camera.png" alt="">-->
                    <!--</div>-->
                </div>

                <!--闸机-->
                <div class="cameraCard popCard" v-if="route.includes('gate')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <select name="" v-model="gate.type">
                            <option value="室内">室内</option>
                            <option value="室外">室外</option>
                        </select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="gate.name"> </p>
                    <p class="version">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" v-model="gate.version"></p>
                    <p class="IP">设备I P ：<input type="text" v-model="gate.ip"></p>
                    <p class="host">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" v-model="gate.host"></p>

                    <p class="num">设备编号：<input type="text" v-model="gate.num"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="gate.place"></p>
                    <p class="area">所属片区：<input type="text" v-model="gate.area"></p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="gate.describe" cols="40" rows="8">

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
                  name:'',
                  type:'',
                  area:'',
                  home:'',
                  IP:'',
                  host:'',
                  place:'',
                  describe:'',
              },
               broadCast:{
                    type:'',
                   name:'',
                   home:'',
                   ip:'',
                   host:'',
                   place:'',
                   area:'',
                   describe:''
               },
               led:{
                   type:'',
                   name:'',
                   width:'',
                   ip:'',
                   num:'',
                   place:'',
                   area:'',
                   describe:''
               },
               wifi:{
                   type:'',
                   name:'',
                   version:'',
                   ip:'',
                   host:'',
                   Mac:'',
                   area:'',
                   describe:''
               },
               monitors:{
                   type:'',
                   name:'',
                   home:'',
                   ip:'',
                   host:'',
                   place:'',
                   area:'',
                   describe:''
               },
               Light:{
                   status:'',
                   name:'',
                   home:'',
                   num:'',
                   version:'',
                   place:'',
                   area:'',
                   describe:''
               },
               gate:{
                   type:'',
                   name:'',
                   version:'',
                   num:'',
                   ip:'',
                   host:'',
                   place:'',
                   area:'',
                   describe:''
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
                    margin-top: rem(5);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(14);
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
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
                        display: inline-block;
                        background: red;
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


