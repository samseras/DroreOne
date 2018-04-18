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
                        <el-select name="" v-model="camera.positionType">
                            <el-option label='室内' :value="0"></el-option>
                            <el-option label='室外' :value="1"></el-option>
                        </el-select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="camera.name"> </p>
                    <p class="manufacturer">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        <el-select name="" v-model="camera.manufactor">
                            <el-option label='海康' :value="3"></el-option>
                            <el-option label='卓锐' :value="4"></el-option>
                        </el-select>
                    </p>
                    <p class="IP">I P 地 址：<input type="text" v-model="camera.ip"></p>
                    <p class="port">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  口：<input type="text" v-model="camera.port"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="camera.location">

                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="area">所属片区：
                        <el-select name="" v-model="camera.regionId">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :label="item.name">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="description">描&nbsp; 述：
                        <textarea v-model="camera.description" cols="40" rows="8">
                                {{camera.description}}
                        </textarea>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--广播-->
                <div class="cameraCard popCard" v-if="route.includes('broadcast')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：

                        <el-select name="" v-model="broadCast.positionType">
                            <el-option label='室内' :value="0"></el-option>
                            <el-option label='室外' :value="1"></el-option>
                        </el-select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="broadCast.name"> </p>
                    <p class="home">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：

                        <el-select name="" v-model="broadCast.manufactor">
                            <el-option label='海康' :value="3"></el-option>
                            <el-option label='卓锐' :value="4"></el-option>
                        </el-select>
                    </p>
                    <p class="IP">I P 地 址：<input type="text" v-model="broadCast.ip"></p>
                    <p class="host">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  口：<input type="text" v-model="broadCast.port"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="broadCast.location">
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="area">所属区域：
                        <el-select name="" v-model="broadCast.regionId">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :label="item.name">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="broadCast.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--LED-->
                <div class="cameraCard popCard" v-if="route.includes('led')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <el-select name="" v-model="led.positionType">
                            <el-option label='室内' :value="0"></el-option>
                            <el-option label='室外' :value="1"></el-option>
                        </el-select>

                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="led.name"> </p>
                    <p class="width">屏幕宽高：<input type="text" v-model="led.area"></p>
                    <p class="IP">I P 地 址：<input type="text" v-model="led.ip"></p>
                    <p class="host">设备编号：<input type="text" v-model="led.serialNum"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="led.location">
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="area">所属片区：

                        <el-select name="" v-model="led.regionId">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :label="item.name">
                            </el-option>
                        </el-select>

                    </p>
                    <p class="describe">描&nbsp;&nbsp;&nbsp;述：
                        <textarea v-model="led.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--Wifi-->
                <div class="cameraCard popCard" v-if="route.includes('wifi')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <el-select name="" v-model="wifi.positionType">
                            <el-option :value="0" label="室内"></el-option>
                            <el-option :value="1" label="室外"></el-option>
                        </el-select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="wifi.name"> </p>
                    <p class="version">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" v-model="wifi.model"></p>
                    <p class="IP">设备I P ：<input type="text" v-model="wifi.ip"></p>
                    <p class="mac">M a c：<input type="text" v-model="wifi.mac"></p>
                    <p class="host">设备编号：<input type="text" v-model="wifi.serialNum"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="wifi.location">
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="area">所属片区：

                        <el-select v-model="wifi.regionId">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :label="item.name"></el-option>
                        </el-select>
                    </p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="wifi.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--传感器-->
                <div class="cameraCard popCard" v-if="route.includes('monitors')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <el-select name="" v-model="monitors.sensorType">
                            <el-option :value="1" label="温度"></el-option>
                            <el-option :value="2" label="湿度"></el-option>
                        </el-select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="monitors.name"> </p>
                    <p class="version">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        <el-select name="" v-model="monitors.manufactor">
                            <el-option :value="3" label="卓锐"></el-option>
                            <el-option :value="4" label="天气"></el-option>
                        </el-select>
                    </p >
                    <p class="IP">设备I P ：<input type="text" v-model="monitors.ip"></p>
                    <p class="host">设备编号：<input type="text" v-model="monitors.serialNum"></p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="monitors.location">
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="area">所属片区：

                        <el-select v-model="monitors.regionId">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :label="item.name"></el-option>
                        </el-select>
                    </p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="monitors.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--灯光-->
                <div class="cameraCard popCard" v-if="route.includes('Light')">
                    <p class="status">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:
                        <el-select name="" v-model="Light.lightStatus">
                            <el-option :value="true" label="通电"></el-option>
                            <el-option :value="false" label="断电"></el-option>
                        </el-select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="Light.name"> </p>
                    <p class="home">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        <el-select name="" v-model="Light.manufactor">
                            <el-option :value="0" label="卓锐"></el-option>
                            <el-option :value="1" label="西安"></el-option>
                        </el-select>
                    </p>
                    <p class="num">路灯编号：<input type="text" v-model="Light.serialNum"></p>
                    <p class="version">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" v-model="Light.model">
                    </p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text" v-model="Light.location">
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="area">所属片区：
                        <el-select name="" v-model="Light.regionId">
                            <el-option  v-for="item in regions" :value="item.id"
                                :label="item.name">

                            </el-option>
                        </el-select>
                    </p>
                    <p class="describe">描&nbsp; &nbsp;&nbsp;&nbsp;述：
                        <textarea v-model="Light.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--闸机-->
                <div class="cameraCard popCard" v-if="route.includes('gate')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <el-select name="" v-model="gate.gateType">
                            <el-option :value="1" label="翼闸"></el-option>
                            <el-option :value="2" label="摆闸"></el-option>
                            <el-option :value="3" label="三角闸"></el-option>
                            <el-option :value="4" label="平移闸"></el-option>
                        </el-select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="gate.name"> </p>
                    <p class="version">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" v-model="gate.model"></p>
                    <p class="IP">设备I P ：<input type="text" v-model="gate.ip"></p>
                    <p class="num">设备编号：<input type="text" v-model="gate.serialNum"></p>
                    <p class="name">端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;口：<input type="text" v-model="gate.port"> </p>
                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="gate.location">
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="area">所属片区：
                        <el-select name="" v-model="gate.regionId">
                            <el-option  v-for="item in regions" :value="item.id"
                                :label="item.name"></el-option>
                        </el-select>
                    </p>
                    <p class="describe">描&nbsp;&nbsp;&nbsp;&nbsp; 述：
                        <textarea v-model="gate.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--报警柱-->
                <div class="cameraCard popCard" v-if="route.includes('police')">
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  型：
                        <el-select name="" v-model="police.sensorType">
                            <el-option :value="10" label="报警柱"></el-option>
                            <el-option :value="11" label="越界"></el-option>
                        </el-select>
                    </p>
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text" v-model="police.name"> </p>
                    <p class="version">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家:
                        <el-select name="" v-model="police.manufactor">
                            <el-option :value="报警" label="报警柱"></el-option>
                            <el-option :value="越界" label="越界"></el-option>
                        </el-select>
                    </p>
                    <p class="host">设备编号：<input type="text" v-model="police.serialNum"></p>
                    <p class="IP">设备I P ：<input type="text" v-model="police.ip"></p>

                    <p class="place">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  置：<input type="text" v-model="police.location">
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="area">所属片区：
                        <el-select name="" v-model="police.regionId">
                            <el-option  v-for="item in regions" :value="item.id"
                                :label="item.name"></el-option>
                        </el-select>
                    </p>
                    <p class="describe">描&nbsp; 述：
                        <textarea v-model="police.description" cols="40" rows="8">

                        </textarea>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
            </div>
            <div class="text-center p-2">
                <file-upload
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png,image/gif,image/jpeg,image/webp"
                    name="avatar"
                    class="btn btn-primary"
                    :drop="!edit"
                    v-model="files"
                    @input-filter="inputFilter"
                    @input-file="inputFile"
                    ref="upload">
                </file-upload>
            </div>
            <div class="avatar-edit" v-show="files.length && edit">
                <div class="avatar-edit-image" v-if="files.length">
                    <img ref="editImage" :src="files[0].url" />
                </div>
                <div class="text-center p-4">
                    <button type="button" class="btn btn-secondary" @click.prevent="$refs.upload.clear">取消</button>
                    <button type="submit" class="btn btn-primary" @click.prevent="editSave">保存</button>
                </div>
            </div>
            <div slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" @click="addNewInfo" :disabled="isDisabled">保存</el-button>
                <el-button size="mini" type="primary" @click="closeDialog" :disabled="isDisabled">取消</el-button>
            </div>
        </el-dialog>
        <MapDialog v-if="mapVisible" :visible="mapVisible" class="map" @closeMapDialog="closeMapDialog"></MapDialog>
    </div>
</template>

<script>
    import MapDialog from './mapDialog.vue'
    import api from '@/api'
    import FileUpload from 'vue-upload-component'
    import Cropper from 'cropperjs'
   export default{
       props:['visible','Info','title','isDisabled'],
       data(){
           return{
               files: [],
               isShowMapDialog:false,
               mapVisible:false,
               regions: [],
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
               route:'',
               file: {},
               src:'',
               edit: false,
               cropper: false,
               src: {},
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
               newInfo.imgUrl = this.src
//               if(this.src.trim() ===''){
//                   newInfo.imgUrl =''
//               }else{
//                   newInfo.imf
//               }

               if(this.Info.id){
                   newInfo.id=this.Info.id
                   this.$emit('fixInfo',newInfo)
               }else{
                   this.$emit('addNewInfo',newInfo)
               }
               this.closeDialog()
           },
           showMapDialog(){
               this.mapVisible=true;
           },
           closeMapDialog(){
               this.mapVisible=false
           },
           editSave() {
               this.edit = false
               let oldFile = this.files[0]
               console.log(this.files[0] ,'4567890')
               let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
               let arr = new Uint8Array(binStr.length)
               for (let i = 0; i < binStr.length; i++) {
                   arr[i] = binStr.charCodeAt(i)
               }
               let file = new File([arr], oldFile.name, { type: oldFile.type })
               this.$refs.upload.update(oldFile.id, {
                   file,
                   type: file.type,
                   size: file.size,
                   active: true,
               })
               console.log(file, '这是截取后的图片')
               var form = new FormData();
               form.append('f1',file);
               this.src = form
           },
           alert(message) {
               alert(message)
           },
           inputFile(newFile, oldFile, prevent) {
               if (newFile && !oldFile) {
                   this.$nextTick(function () {
                       this.edit = true
                   })
               }
               if (!newFile && oldFile) {
                   this.edit = false
               }
           },
           inputFilter(newFile, oldFile, prevent) {
               if (newFile && !oldFile) {
                   if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                       this.alert('Your choice is not a picture')
                       return prevent()
                   }
               }
               if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                   newFile.url = ''
                   let URL = window.URL || window.webkitURL
                   if (URL && URL.createObjectURL) {
                       newFile.url = URL.createObjectURL(newFile.file)
                   }
               }
           },
       },
       created(){
           api.area.getAllRegion().then(res => {
               console.log(res, '所有片区')
               this.regions = res
           })
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
       },
       watch: {
           edit(value) {
               if (value) {
                   this.$nextTick(function () {
                       if (!this.$refs.editImage) {
                           return
                       }
                       let cropper = new Cropper(this.$refs.editImage, {
                           aspectRatio: 1 / 1,
                           viewMode: 1,
                       })
                       this.cropper = cropper
                   })
               } else {
                   if (this.cropper) {
                       this.cropper.destroy()
                       this.cropper = false
                   }
               }
           }
       },
       components:{
           MapDialog,
           FileUpload
       },
   }

</script>
<style>
    .example-avatar .avatar-upload .rounded-circle {
        width: 200px;
        height: 200px;
    }
    .example-avatar .text-center .btn {
        margin: 0 .5rem
    }
    .example-avatar .avatar-edit-image {
        max-width: 100%
    }
    .avatar-edit-image{
        height: 255px !important;
    }
    .example-avatar .drop-active {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 9999;
        opacity: .6;
        text-align: center;
        background: #000;
    }
    .example-avatar .drop-active h3 {
        margin: -.5em 0 0;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        font-size: 40px;
        color: #fff;
        padding: 0;
    }
    /*!
 * Cropper.js v1.3.3
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2015-2018 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-03-18T03:19:07.619Z
 */
    .cropper-container {
        direction: ltr;
        font-size: 0;
        line-height: 0;
        position: relative;
        -ms-touch-action: none;
        touch-action: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
    }

    .cropper-container img {
        display: block;
        height: 100%;
        image-orientation: 0deg;
        max-height: none !important;
        max-width: none !important;
        min-height: 0 !important;
        min-width: 0 !important;
        width: 100%
    }

    .cropper-wrap-box, .cropper-canvas, .cropper-drag-box, .cropper-crop-box, .cropper-modal {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0
    }

    .cropper-wrap-box, .cropper-canvas {
        overflow: hidden
    }

    .cropper-drag-box {
        background-color: #fff;
        opacity: 0
    }

    .cropper-modal {
        background-color: #000;
        opacity: .5
    }

    .cropper-view-box {
        display: block;
        height: 100%;
        outline-color: rgba(51, 153, 255, 0.75);
        outline: 1px solid #39f;
        overflow: hidden;
        width: 100%
    }

    .cropper-dashed {
        border: 0 dashed #eee;
        display: block;
        opacity: .5;
        position: absolute
    }

    .cropper-dashed.dashed-h {
        border-bottom-width: 1px;
        border-top-width: 1px;
        height: 33.33333%;
        left: 0;
        top: 33.33333%;
        width: 100%
    }

    .cropper-dashed.dashed-v {
        border-left-width: 1px;
        border-right-width: 1px;
        height: 100%;
        left: 33.33333%;
        top: 0;
        width: 33.33333%
    }

    .cropper-center {
        display: block;
        height: 0;
        left: 50%;
        opacity: .75;
        position: absolute;
        top: 50%;
        width: 0
    }

    .cropper-center:before, .cropper-center:after {
        background-color: #eee;
        content: ' ';
        display: block;
        position: absolute
    }

    .cropper-center:before {
        height: 1px;
        left: -3px;
        top: 0;
        width: 7px
    }

    .cropper-center:after {
        height: 7px;
        left: 0;
        top: -3px;
        width: 1px
    }

    .cropper-face, .cropper-line, .cropper-point {
        display: block;
        height: 100%;
        opacity: .1;
        position: absolute;
        width: 100%
    }

    .cropper-face {
        background-color: #fff;
        left: 0;
        top: 0
    }

    .cropper-line {
        background-color: #39f
    }

    .cropper-line.line-e {
        cursor: ew-resize;
        right: -3px;
        top: 0;
        width: 5px
    }

    .cropper-line.line-n {
        cursor: ns-resize;
        height: 5px;
        left: 0;
        top: -3px
    }

    .cropper-line.line-w {
        cursor: ew-resize;
        left: -3px;
        top: 0;
        width: 5px
    }

    .cropper-line.line-s {
        bottom: -3px;
        cursor: ns-resize;
        height: 5px;
        left: 0
    }

    .cropper-point {
        background-color: #39f;
        height: 5px;
        opacity: .75;
        width: 5px
    }

    .cropper-point.point-e {
        cursor: ew-resize;
        margin-top: -3px;
        right: -3px;
        top: 50%
    }

    .cropper-point.point-n {
        cursor: ns-resize;
        left: 50%;
        margin-left: -3px;
        top: -3px
    }

    .cropper-point.point-w {
        cursor: ew-resize;
        left: -3px;
        margin-top: -3px;
        top: 50%
    }

    .cropper-point.point-s {
        bottom: -3px;
        cursor: s-resize;
        left: 50%;
        margin-left: -3px
    }

    .cropper-point.point-ne {
        cursor: nesw-resize;
        right: -3px;
        top: -3px
    }

    .cropper-point.point-nw {
        cursor: nwse-resize;
        left: -3px;
        top: -3px
    }

    .cropper-point.point-sw {
        bottom: -3px;
        cursor: nesw-resize;
        left: -3px
    }

    .cropper-point.point-se {
        bottom: -3px;
        cursor: nwse-resize;
        height: 20px;
        opacity: 1;
        right: -3px;
        width: 20px
    }

    @media (min-width: 768px) {
        .cropper-point.point-se {
            height: 15px;
            width: 15px
        }
    }

    @media (min-width: 992px) {
        .cropper-point.point-se {
            height: 10px;
            width: 10px
        }
    }

    @media (min-width: 1200px) {
        .cropper-point.point-se {
            height: 5px;
            opacity: .75;
            width: 5px
        }
    }

    .cropper-point.point-se:before {
        background-color: #39f;
        bottom: -50%;
        content: ' ';
        display: block;
        height: 200%;
        opacity: 0;
        position: absolute;
        right: -50%;
        width: 200%
    }

    .cropper-invisible {
        opacity: 0
    }

    .cropper-bg {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC')
    }

    .cropper-hide {
        display: block;
        height: 0;
        position: absolute;
        width: 0
    }

    .cropper-hidden {
        display: none !important
    }

    .cropper-move {
        cursor: move
    }

    .cropper-crop {
        cursor: crosshair
    }

    .cropper-disabled .cropper-drag-box, .cropper-disabled .cropper-face, .cropper-disabled .cropper-line, .cropper-disabled .cropper-point {
        cursor: not-allowed
    }

</style>
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
        .el-input__inner{
            border: none;
            height: rem(30);
            line-height: rem(30);
            font-size: rem(12);
            padding: 0;
            padding-left: rem(10);

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
                        font-size:rem(12);
                        padding-left:rem(10);
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
                    i {
                        display: inline-block;
                        /*width: rem(20);*/
                        /*height: rem(20);*/
                        border-radius: 50%;
                        font-size: rem(16);
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
                        width: rem(120);
                        height: rem(60);
                        position: absolute;
                        top: rem(0);
                        right: rem(-5);
                        background: #fff;
                        img{
                            width: rem(55);
                            height: rem(55);
                            border:1px solid #988E83;
                            display: inline-block;
                            background:red;
                            border-radius: 50%;
                            margin-left: rem(40);
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
        .map{
            width:rem(400);
            height:rem(400);
        }
    }

</style>


