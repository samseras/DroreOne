<template>
    <div class="hardwareDialog">
        <el-dialog
            :title="title"
            :visible="visible"
            :close-on-click-modal = false
            :before-close="closeDialog"
            width="25%"
            class="dialog echatDialog"
            center>
            <div class="card">
                <!--摄像头-->
                <div class="cameraCard popCard" v-if="route.includes('camera')">
                    <p class="type selectstyle equipmentStyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select name="" v-model="camera.positionType" :disabled="isDisabled">
                            <el-option label='室内' :value="0"></el-option>
                            <el-option label='室外' :value="1"></el-option>
                        </el-select>
                    </p>
                    <p class="sex title">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text" v-model="camera.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="manufacturer wrapstyle selectstyle">
                        <span>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                        <el-select name="" v-model="camera.model" @change="choseModel(camera.model)":disabled="isDisabled">
                            <el-option v-for="item in modelType"
                                       :key="item.id"
                                       :value="item.id"
                                       :label="item.name">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="IP">
                        <span>I&nbsp;P&nbsp;地&nbsp;&nbsp;址：</span>
                        <el-input type="text" v-model="camera.ip" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="port">
                        <span>端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;口：</span>
                        <el-input type="text" v-model="camera.port" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="area place ps wrapstyle selectstyle" >
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span>{{camera.location}}</span>
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="wrapstyle selectstyle">
                        <span>所属片区：</span>
                        <el-select name="" v-model="camera.regionId" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :value="item.id"
                                :label="item.name">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="description ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea" :rows='5' v-model="camera.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(camera.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(camera.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--广播-->
                <div class="cameraCard popCard" v-if="route.includes('broadcast')">
                    <p class="type selectstyle equipmentStyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select name="" v-model="broadCast.positionType" :disabled="isDisabled">
                            <el-option label='室内' :value="0"></el-option>
                            <el-option label='室外' :value="1"></el-option>
                        </el-select>
                    </p>
                    <p class="name">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text" v-model="broadCast.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="manufacturer wrapstyle selectstyle">
                        <span>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>

                        <el-select name="" v-model="broadCast.model" :disabled="isDisabled">
                            <el-option v-for="item in modelType"
                                       :key="item.id"
                                       :value="item.id"
                                        :label="item.name">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="IP">
                        <span>IP&nbsp;&nbsp;地&nbsp;&nbsp;址：</span>
                        <el-input type="text" v-model="broadCast.ip" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="host">
                        <span>端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;口：</span>
                        <el-input type="text" v-model="broadCast.port" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="area place ps wrapstyle selectstyle">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span>{{broadCast.location}}</span>
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="wrapstyle selectstyle">
                        <span>所属区域：</span>
                        <el-select name="" v-model="broadCast.regionId" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :key="item.id"
                                :label="item.name">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="description ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea" :rows="5" v-model="broadCast.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(broadCast.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(broadCast.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--LED-->
                <div class="cameraCard popCard" v-if="route.includes('led')">
                    <p class="type equipmentStyle selectstyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select name="" v-model="led.positionType" :disabled="isDisabled">
                            <el-option label='室内' :value="0"></el-option>
                            <el-option label='室外' :value="1"></el-option>
                        </el-select>
                    </p>
                    <p class="name">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text" v-model="led.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="home wrapstyle selectstyle">
                        <span>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                        <el-select v-model="led.model" :disabled="isDisabled">
                            <el-option v-for="item in modelType"
                                       :key="item.id"
                                       :value="item.id"
                                       :label="item.name">
                            </el-option>
                        </el-select>
                    </p>
                    <!--<p class="width">屏幕宽高(cm)：-->
                        <!--<el-input type="text" v-model="led.area" :disabled="isDisabled" placeholder="例：22,33"></el-input>-->
                    <!--</p>-->
                    <!--<p class="IP">IP&nbsp;&nbsp;地&nbsp;&nbsp;址:
                        <el-input type="text" v-model="led.ip" :disabled="isDisabled"></el-input>
                    </p>-->
                    <p class="width">
                        <span>屏幕宽(cm)：</span>
                        <el-input type="text" v-model="led.screenWidth" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="width">
                        <span>屏幕高(cm)：</span>
                        <el-input type="text" v-model="led.screenHeight" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="port">
                        <sapn>设备端口：</sapn>
                        <el-input type="text" v-model="led.port" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="host">
                        <span>设备编号：</span>
                        <el-input type="text" v-model="led.serialNum" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="mac">
                        <span>M&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;C：</span>
                        <el-input type="text" v-model="led.mac" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="place ps area">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span><span>{{led.location}}</span>
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class=" wrapstyle selectstyle">
                        <span>所属片区：</span>

                        <el-select name="" v-model="led.regionId" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :key="item.id"
                                :label="item.name">
                            </el-option>
                        </el-select>

                    </p>
                    <p class="describe textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>

                        <el-input type="textarea" :rows="5" v-model="led.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(led.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(led.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--Wifi-->
                <div class="cameraCard popCard" v-if="route.includes('wifi')">
                    <p class="type equipmentStyle selectstyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select name="" v-model="wifi.positionType" :disabled="isDisabled">
                            <el-option :value="0" label="室内"></el-option>
                            <el-option :value="1" label="室外"></el-option>
                        </el-select>
                    </p>
                    <p class="name">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text" v-model="wifi.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="version wrapstyle selectstyle">
                        <span>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                        <el-select name="" v-model="wifi.model" @change="choseModel(wifi.model)" :disabled="isDisabled">
                            <el-option v-for="item in modelType"
                                       :key="item.id"
                                       :value="item.id"
                                       :label="item.name">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="model" v-if="modelExtend" v-for="item in extend" :key="item.name">
                        {{item.label}}:
                        <input type="text" v-bind:class="item.name" v-model="item.value" v-if="item.type === 'STRING'">
                        <el-select name="" v-model="item.value" v-if="item.type === 'BOOLEAN'" v-bind:class="item.name">
                            <el-option value='是' label="是"></el-option>
                            <el-option value='否' label="否"></el-option>
                        </el-select>
                    </p>
                    <!--<p class="IP">设&nbsp;&nbsp;备&nbsp;&nbsp;IP:
                        <el-input type="text" v-model="wifi.ip" :disabled="isDisabled"></el-input>
                    </p>-->

                    <p class="IP">
                        <span>设备端口：</span>
                        <el-input type="text" v-model="wifi.port" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="mac">
                        <span>M&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;C：</span>
                        <el-input type="text" v-model="wifi.mac" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="host">
                        <span>设备编号：</span>
                        <el-input type="text" v-model="wifi.serialNum" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="place ps area">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span>{{wifi.location}}</span>
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class=" wrapstyle selectstyle">
                        <span>所属片区：</span>

                        <el-select v-model="wifi.regionId" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :key="item.id"
                                :label="item.name"></el-option>
                        </el-select>
                    </p>
                   <p class="describe ms">
                       <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>

                        <el-input type="textarea" :rows="5" v-model="wifi.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(wifi.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(wifi.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--传感器-->
                <div class="cameraCard popCard" v-if="route.includes('monitors')">
                    <p class="type equipmentStyle selectstyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select name="" v-model="monitors.sensorType" :disabled="isDisabled">
                            <el-option :value="1" label="温度"></el-option>
                            <el-option :value="2" label="湿度"></el-option>
                        </el-select>
                    </p>
                    <p class="name">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text" v-model="monitors.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="version wrapstyle selectstyle">
                        <span>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                        <el-select name="" v-model="monitors.model" :disabled="isDisabled">
                            <el-option v-for="item in modelType"
                                       :key="item.id"
                                       :value="item.id"
                                       :label="item.name">
                            </el-option>
                        </el-select>
                    </p >
                    <!--<p class="IP">设&nbsp;&nbsp;备&nbsp;&nbsp;IP:
                        <el-input type="text" v-model="monitors.ip" :disabled="isDisabled"></el-input>
                    </p>-->
                    <p class="host">
                        <span>设备编号：</span>
                        <el-input type="text" v-model="monitors.serialNum" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="mac">
                        <span>M&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;C：</span>
                        <el-input type="text" v-model="monitors.mac" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="host">
                        <span>设备端口：</span>
                        <el-input type="text" v-model="monitors.port" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="place ps area">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span>{{monitors.location}}</span>
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="wrapstyle selectstyle">
                        <span>所属片区：</span>

                        <el-select v-model="monitors.regionId" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :key="item.id"
                                :label="item.name"></el-option>
                        </el-select>
                    </p>
                    <p class="describe ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>

                        <el-input type="textarea" :rows="5" v-model="monitors.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(monitors.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(monitors.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--灯光-->
                <div class="cameraCard popCard" v-if="route.includes('Light')">
                    <p class="status equipmentStyle selectstyle">
                        <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                        <el-select name="" v-model="Light.lightStatus":disabled="isDisabled" >
                            <el-option :value="true" label="通电"></el-option>
                            <el-option :value="false" label="断电"></el-option>
                        </el-select>
                    </p>
                    <p class="name">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text" v-model="Light.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="port">
                        <span>路灯端口：</span>
                        <el-input type="text" v-model="Light.port" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="num">
                        <span>路灯编号：</span>
                        <el-input type="text" v-model="Light.serialNum" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="version wrapstyle selectstyle">
                       <span> 型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                        <el-select  v-model="Light.model" :disabled="isDisabled">
                            <el-option v-for="item in modelType"
                                       :key="item.id"
                                       :value="item.id"
                                       :label="item.name">
                            </el-option>
                        </el-select>
                    </p >
                    <p class="place ps area">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span>{{Light.location}}</span>
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class=" wrapstyle selectstyle">
                        <span>所属片区：</span>
                        <el-select name="" v-model="Light.regionId" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :key="item.id"
                                :label="item.name">

                            </el-option>
                        </el-select>
                    </p>
                    <p class="describe ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>

                        <el-input type="textarea" :rows='5' v-model="Light.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(Light.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(Light.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--闸机-->
                <div class="cameraCard popCard" v-if="route.includes('gate')">
                    <p class="type equipmentStyle selectstyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select name="" v-model="gate.gateType" :disabled="isDisabled">
                            <el-option :value="1" label="翼闸"></el-option>
                            <el-option :value="2" label="摆闸"></el-option>
                            <el-option :value="3" label="三角闸"></el-option>
                            <el-option :value="4" label="平移闸"></el-option>
                        </el-select>
                    </p>
                    <p class="name">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text" v-model="gate.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="version wrapstyle selectstyle">
                        <span> 型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                        <el-select  v-model="gate.model" :disabled="isDisabled">
                            <el-option v-for="item in modelType"
                                       :key="item.id"
                                       :value="item.id"
                                       :label="item.name">
                            </el-option>
                        </el-select>
                    </p>
                    <!--<p class="IP">设&nbsp;&nbsp;备&nbsp;&nbsp;IP:
                        <el-input type="text" v-model="gate.ip" :disabled="isDisabled"></el-input>
                    </p>-->
                    <p class="num">
                        <span>设备编号：</span>
                        <el-input type="text" v-model="gate.serialNum" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="mac">
                        <span>M&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;C：</span>
                        <el-input type="text" v-model="gate.mac" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="name">
                        <span>端&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;口：</span>
                        <el-input type="text" v-model="gate.port" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="place ps area">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span>{{gate.location}}</span>
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class=" wrapstyle selectstyle">
                        <span>所属片区：</span>
                        <el-select name="" v-model="gate.regionId" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :key="item.id"
                                :label="item.name"></el-option>
                        </el-select>
                    </p>
                    <p class="describe ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea" :rows="5" v-model="gate.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(gate.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(gate.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--报警柱-->
                <div class="cameraCard popCard" v-if="route.includes('police')">
                    <p class="type equipmentStyle selectstyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select name="" v-model="police.sensorType" :disabled="isDisabled">
                            <el-option :value="10" label="报警柱"></el-option>
                            <el-option :value="11" label="越界"></el-option>
                        </el-select>
                    </p>
                    <p class="name">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text" v-model="police.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="version wrapstyle selectstyle">
                        <span>型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                        <el-select name="" v-model="police.model" :disabled="isDisabled">
                            <el-option v-for="item in modelType"
                                       :key="item.id"
                                        :value="item.id"
                                        :label="item.name">

                            </el-option>
                        </el-select>
                    </p>
                    <p class="host">
                        <span>设备编号：</span>
                        <el-input type="text" v-model="police.serialNum" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="port">
                        <span>设备端口：</span>
                        <el-input type="text" v-model="police.port" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="mac">
                        <span>M&nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;C：</span>
                        <el-input type="text" v-model="police.mac" :disabled="isDisabled"></el-input>
                    </p>
                    <!--<p class="IP">设&nbsp;&nbsp;备&nbsp;&nbsp;IP:
                        <el-input type="text" v-model="police.ip" :disabled="isDisabled"></el-input>
                    </p>-->

                    <p class="place ps area">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span>{{police.location}}</span>
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class=" wrapstyle selectstyle">
                       <span>所属片区：</span>
                        <el-select name="" v-model="police.regionId" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :value="item.id"
                                :key="item.id"
                                :label="item.name"></el-option>
                        </el-select>
                    </p>
                    <p class="describe ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>

                        <el-input type="textarea" :rows="5" v-model="police.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(police.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(police.picturePath)"  @error="imgError" class="rounded-circle" />
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
                <el-button size="mini" @click="closeDialog" :disabled="isDisabled">取消</el-button>
            </div>
        </el-dialog>
        <MapDialog v-if="mapVisible" :visible="mapVisible" class="map" @closeMapDialog="closeMapDialog"@saveLocation = "saveLocation"></MapDialog>
    </div>
</template>

<script>
    import MapDialog from './mapDialog.vue'
    import api from '@/api'
    import FileUpload from 'vue-upload-component'
    import Cropper from 'cropperjs'
    import { mapGetters,mapMutations} from 'vuex'
   export default{
       props:['visible','Info','title','isDisabled'],
       data(){
           return{
               files: [],
               isShowMapDialog:false,
               mapVisible:false,
               modelType:{},
               regions: [],
              camera:{
                  positionType:'',
                  name:'',
                  model:'',
                  ip:'',
                  port:'',
                  regionId:'',
                  description:'',
                  location:''
              },
               broadCast:{
                   positionType:'',
                   name:'',
                   model:'',
                   ip:'',
                   port:'',
                   location:'',
                   regionId:'',
                   description:''
               },
               led:{
                   mac:'',
                   positionType:'',
                   name:'',
//                   area:'',
                   screenHeight:'',
                   screenWidth:'',
                   model:'',
                   ip:'',
                   port:'',
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
                   description:'',
                   attributes:'',
                   jsonAttr:'',
                   port:''
               },
               monitors:{
                   mac:'',
                   sensorType:'',
                   name:'',
                   model:'',
                   ip:'',
                   serialNum:'',
                   location:'',
                   port:'',
                   regionId:'',
                   description:''
               },
               Light:{
                   lightStatus:'',
                   name:'',
                   serialNum:'',
                   model:'',
                   port:'',
                   location:'',
                   regionId:'',
                   description:''
               },
               gate:{
                   gateType:'',
                   name:'',
                   model:'',
                   ip:'',
                   mac:'',
                   serialNum:'',
                   port:'',
                   location:'',
                   regionId:'',
                   description:''
               },
               police:{
                   mac:'',
                   sensorType:'',
                   name:'',
                   model:'',
                   serialNum:'',
                   ip:'',
                   location:'',
                   regionId:'',
                   description:'',
                   port:''
               },
               hardwaretype: {
                   hardName: '',
                   tradeName: '',
                   type: '',
                   model: ''
               },
               route:'',
               file: {},
               src:'',
               edit: false,
               cropper: false,
               attribute:{},
               extend:{},
               content:[],
               modelExtend : false

           }
       },
       methods:{
           ...mapMutations(['LOCATION_ID']),
           imgError (e) {
               e.target.src = this.getUrl(null);
           },
           getUrl (url) {
               if (url === null || url === undefined) {
                   let imgSrc
                       console.log(this.$route.path, 'p[ppppp[p')
                       let route = this.$route.path
                       if (route.includes('camera')) {//摄像头
                           imgSrc = './../../../../static/img/cameraCard.png'
                       }else if (route.includes('broadcast')) {//广播
                           imgSrc = './../../../../static/img/broadcastCard.png'
                       }else if (route.includes('monitors')) {//环境监测
                           imgSrc = './../../../../static/img/environmentCard.png'
                       }else if (route.includes('police')) {//报警
                           imgSrc = './../../../../static/img/policeCard.png'
                       }else if (route.includes('led')) {//LED
                           imgSrc = './../../../../static/img/screenCard.png'
                       }else if (route.includes('wifi')) {//wifi
                           imgSrc = './../../../../static/img/wifiCard.png'
                       }else if (route.includes('gate')) {//闸机
                           imgSrc = './../../../../static/img/gateCard.png'
                       }else if (route.includes('lampLight')) {//灯光
                           imgSrc = './../../../../static/img/botanyCard.png'
                       }
                   console.log(imgSrc, 'opopopopopopopo')
                   return imgSrc
               } else {
                   return url
               }
           },
           choseModel (item) {
               console.log(item, '这是选择的')
               console.log(this.modelType, '所有的')
               this.attribute = this.modelType.filter(type => {
                   return type.id === item
               })
               console.log(this.attribute[0].attributes, '过滤出来的')
               this.extend = this.attribute[0].attributes
               this.modelExtend = true

               this.obj = {}
               this.extend.forEach(item => {
                   console.log(item)
                   this.obj[item.name] = item.value
               })
               console.log(this.obj, '进来')
           },
           saveLocation () {
               let locationString
               if (this.getLocation.length > 0) {
                   locationString = `${this.getLocation[0]},${this.getLocation[1]}`
               }
               if(this.route.includes('camera')){
                   this.camera.location = locationString
               }else if(this.route.includes('broadcast')){
                   this.broadCast.location = locationString
               }else if(this.route.includes('led')) {
                   this.led.location = locationString
               }else if(this.route.includes('wifi')) {
                   this.wifi.location = locationString
               }else if(this.route.includes('monitors')) {
                   this.monitors.location = locationString
               }else if(this.route.includes('Light')) {
                   this.Light.location = locationString
               }else if(this.route.includes('gate')) {
                   this.gate.location = locationString
               }else if(this.route.includes('police')) {
                   this.police.location = locationString
               }
               this.mapVisible = false
           },
           closeDialog(){
               this.$emit('closeInfoDialog')
           },
           addNewInfo(){
               let newInfo={ }
               let intreg = /^[1-9]\d*$/; //非零正整数校验
               let integerreg = /^(0|[1-9][0-9]*)$/; //大于等于0正整数
               let myip = /^(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])\.(\d|[1-9]\d|1\d{2}|2[0-5][0-5])$/; //ip校验
               let myport = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/; //端口校验
               let myMac = /([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}/
               if(this.route.includes('camera')){
                   newInfo = this.camera
                  if(!(newInfo.hasOwnProperty("positionType")&& integerreg.test(newInfo.positionType))||
                     !(newInfo.name && newInfo.name !=='') ||
                     !(newInfo.hasOwnProperty("model")&& newInfo.model) ||
                     !(newInfo.regionId && newInfo.regionId !=='') ||
                     !(newInfo.location && newInfo.location !== '')
                  ){
                       this.$message.error('请输入完整信息')
                      return
                  }
                  if(!(newInfo.ip && myip.test(newInfo.ip))){
                      this.$message.error('请输入有效ip地址')
                      return
                  }
                  if(!(newInfo.port && myport.test(newInfo.port))){
                      this.$message.error('请输入正确端口号')
                      return
                  }


               }else if(this.route.includes('broadcast')){
                   newInfo=this.broadCast
                   if(!(newInfo.hasOwnProperty("positionType")&& integerreg.test(newInfo.positionType))||
                       !(newInfo.name && newInfo.name !=='') ||
                       !(newInfo.hasOwnProperty("model")&& newInfo.model) ||
                       !(newInfo.regionId && newInfo.regionId !=='') ||
                       !(newInfo.location && newInfo.location !== '')
                   ){
                       this.$message.error('请输入完整信息')
                       return
                   }
                   if(!(newInfo.ip && myip.test(newInfo.ip))){
                       this.$message.error('请输入有效ip地址')
                       return
                   }
                   if(!(newInfo.port && myport.test(newInfo.port))){
                       this.$message.error('请输入正确端口号')
                       return
                   }

               }else if(this.route.includes('led')) {
                   newInfo = this.led
                   if(!(newInfo.hasOwnProperty("positionType")&& integerreg.test(newInfo.positionType))||
                       !(newInfo.name && newInfo.name !=='') ||
                       !(newInfo.hasOwnProperty("model")&& newInfo.model) ||
                       !(newInfo.regionId && newInfo.regionId !=='') ||
                       !(newInfo.location && newInfo.location !== '')
                   ){
                       this.$message.error('请输入完整信息')
                       return
                   }
                   /*if(!(newInfo.ip && myip.test(newInfo.ip))){
                       this.$message.error('请输入有效ip地址！')
                       return
                   }*/
                   if(!(newInfo.port && myport.test(newInfo.port))){
                       this.$message.error('请输入正确端口号')
                       return
                   }
                   if(!(newInfo.mac && myMac.test(newInfo.mac))){
                       this.$message.error('请输入正确的MAC编号')
                       return
                   }
                   /*if(!(newInfo.serialNum && intreg.test(newInfo.serialNum))){
                       this.$message.error('编号只能输入数字！')
                       return
                   }*/

               }else if(this.route.includes('wifi')) {
                   newInfo = this.wifi
                   if(!(newInfo.hasOwnProperty("positionType")&& integerreg.test(newInfo.positionType))||
                       !(newInfo.name && newInfo.name !=='') ||
                       !(newInfo.hasOwnProperty("model")&& newInfo.model) ||
                       !(newInfo.regionId && newInfo.regionId !=='') ||
                       !(newInfo.location && newInfo.location !== '')
                   ){
                       this.$message.error('请输入完整信息')
                       return
                   }
                   /*if(!(newInfo.ip && myip.test(newInfo.ip))){
                       this.$message.error('请输入有效ip地址！')
                       return
                   }*/
                   if(!(newInfo.port && myport.test(newInfo.port))){
                       this.$message.error('请输入正确端口号')
                       return
                   }
                   /*if(!(newInfo.serialNum && intreg.test(newInfo.serialNum))){
                       this.$message.error('编号只能输入数字！')
                       return
                   }*/
                   if(!(newInfo.mac && myMac.test(newInfo.mac))){
                       this.$message.error('请输入正确的MAC编号')
                       return
                   }

               }else if(this.route.includes('monitors')) {
                   newInfo = this.monitors
                   if(!(newInfo.hasOwnProperty("sensorType")&& integerreg.test(newInfo.sensorType))||
                       !(newInfo.name && newInfo.name !=='') ||
                       !(newInfo.hasOwnProperty("model")&& newInfo.model) ||
                       !(newInfo.regionId && newInfo.regionId !=='') ||
                       !(newInfo.location && newInfo.location !== '')
                   ){
                       this.$message.error('请输入完整信息')
                       return
                   }
                   /*if(!(newInfo.ip && myip.test(newInfo.ip))){
                       this.$message.error('请输入有效ip地址！')
                       return
                   }*/
                   if(!(newInfo.port && myport.test(newInfo.port))){
                       this.$message.error('请输入正确端口号')
                       return
                   }
                   /*if(!(newInfo.serialNum && intreg.test(newInfo.serialNum))){
                       this.$message.error('编号只能输入数字！')
                       return
                   }*/
                   if(!(newInfo.mac && myMac.test(newInfo.mac))){
                       this.$message.error('请输入正确的MAC编号')
                       return
                   }

               }else if(this.route.includes('Light')) {
                   newInfo = this.Light
                   if(!(newInfo.name && newInfo.name !=='') ||
                       !(newInfo.hasOwnProperty("model")&& newInfo.model) ||
                       !(newInfo.regionId && newInfo.regionId !=='') ||
                       !(newInfo.location && newInfo.location !== '')
                       /*!(newInfo.serialNum && newInfo.serialNum !== '')*/
                   ){
                       this.$message.error('请输入完整信息')
                       return
                   }
                   if(!(newInfo.port && myport.test(newInfo.port))){
                       this.$message.error('请输入正确端口号')
                       return
                   }

               }else if(this.route.includes('gate')) {
                   newInfo = this.gate
                   if(!(newInfo.hasOwnProperty("gateType")&& integerreg.test(newInfo.gateType))||
                       !(newInfo.name && newInfo.name !=='') ||
                       !(newInfo.hasOwnProperty("model")&& newInfo.model) ||
                       !(newInfo.regionId && newInfo.regionId !=='') ||
                       !(newInfo.location && newInfo.location !== '')
                   ){
                       this.$message.error('请输入完整信息')
                       return
                   }
                   /*if(!(newInfo.ip && myip.test(newInfo.ip))){
                       this.$message.error('请输入有效ip地址！')
                       return
                   }*/
                   if(!(newInfo.port && myport.test(newInfo.port))){
                       this.$message.error('请输入正确端口号')
                       return
                   }
                   if(!(newInfo.mac && myMac.test(newInfo.mac))){
                       this.$message.error('请输入正确的MAC编号')
                       return
                   }

                   /*if(!(newInfo.serialNum && intreg.test(newInfo.serialNum))){
                       this.$message.error('编号只能输入数字！')
                       return
                   }*/

               }else if(this.route.includes('police')) {
                   newInfo = this.police
                   if(!(newInfo.hasOwnProperty("sensorType")&& integerreg.test(newInfo.sensorType))||
                       !(newInfo.name && newInfo.name !=='') ||
                       !(newInfo.hasOwnProperty("model")&& newInfo.model) ||
                       !(newInfo.regionId && newInfo.regionId !=='') ||
                       !(newInfo.location && newInfo.location !== '')
                   ){
                       this.$message.error('请输入完整信息')
                       return
                   }
                   /*if(!(newInfo.ip && myip.test(newInfo.ip))){
                       this.$message.error('请输入有效ip地址！')
                       return
                   }*/
                   if(!(newInfo.port && myport.test(newInfo.port))){
                       this.$message.error('请输入正确端口号')
                       return
                   }
                   if(!(newInfo.mac && myMac.test(newInfo.mac))){
                       this.$message.error('请输入正确的MAC编号')
                       return
                   }
                   /*if(!(newInfo.serialNum && intreg.test(newInfo.serialNum))){
                       this.$message.error('编号只能输入数字！')
                       return
                   }*/
               }
               newInfo.jsonAttr = JSON.stringify(this.obj)
               newInfo.status=true
               newInfo.checked=false
               newInfo.imgUrl = this.src

                console.log(newInfo.jsonAttr)
               if(this.Info.id){
                   newInfo.id=this.Info.id
                   this.$emit('fixInfo',newInfo)
               }else{
                   this.$emit('addNewInfo',newInfo)
               }
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

           let typeId
           this.route=this.$route.path

           if(this.route.includes('camera')){
               this.camera=this.Info
               if(this.camera.model){
                   this.camera.model = Number(this.camera.model)
               }
               typeId =2
           }else if(this.route.includes('broadcast')){
               this.broadCast=this.Info
//               console.log(this.broadCast, '这是拿到我偶的')
               if(this.broadCast.model){
                   this.broadCast.model = Number(this.broadCast.model)
               }
               typeId =1
           }else if(this.route.includes('led')){
               this.led=this.Info
               if(this.led.model){
                   this.led.model = Number(this.led.model)
               }
               typeId =4
           }else if(this.route.includes('wifi')){
               this.wifi=this.Info
               if(this.wifi.model){
                   this.wifi.model = Number(this.wifi.model)
               }
               typeId =7
           }else if(this.route.includes('monitors')){
               this.monitors=this.Info
               if(this.monitors.model){
                   this.monitors.model = Number(this.monitors.model)
               }
               typeId =6
           }else if(this.route.includes('Light')){
               this.Light=this.Info
               if(this.Light.model){
                   this.Light.model = Number(this.Light.model)
               }
               typeId =5
           }else if(this.route.includes('gate')){
               this.gate=this.Info
               if(this.gate.model){
                   this.gate.model = Number(this.gate.model)
               }
               typeId =3
           }else if(this.route.includes('police')){
               this.police=this.Info
               if(this.police.model){
                   this.police.model = Number(this.police.model)
               }
               typeId =8
           }

           api.types.getAllmodelType(typeId).then(res =>{
               console.log(res,'设备所有类型')
               this.modelType = res
           })
//           this.Info.model = Number(this.Info.model)
           if (this.Info.id) {
               console.log(this.Info.id, '这是拿到的Id')
               this.$store.commit('LOCATION_ID', this.Info.id)
           }else {
               this.$store.commit('LOCATION_ID', '')
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
       computed: {
           ...mapGetters(['getLocation'])
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

<style>
    .hardwareDialog .sex .el-input__suffix,.hardwareDialog .type .el-input__suffix,.hardwareDialog .selectstyle .el-input__suffix{
        right:-5px;
    }
    .hardwareDialog .wrapstyle .el-select,.hardwareDialog .wrapstyle .el-select .el-input,.hardwareDialog .wrapstyle .el-date-editor{
        width:15.2rem;
    }
    .hardwareDialog .wrapstyle .el-date-editor .el-input__prefix{
        left:14.3rem
    }
    .hardwareDialog .card .title .el-input__inner{
        width:200px;
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
            text-align: left;
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
            padding: rem(10) rem(20) 0 rem(20);
            box-sizing: border-box;
            font-size: rem(12);
            min-height:rem(150)
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
            top: rem(-2);
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
            padding-left: rem(15);

        }
        .el-input{
            width: rem(160);
            padding-left: rem(5);
        }
        .ms-person .el-textarea__inner{
            font-size:.75rem;
            font-family: Arial;
        }
        .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner{
            background-color:transparent;
        }
        .person-jole{
            display:none;
        }
        .detailDialog .card .boatCardContent .ms .des{
            height:rem(53);
            float:left
        }


        /*.el-table__header-wrapper .has-gutter {*/
            /*background-color: #f3f3f3;*/
        /*}*/
        /*.el-table th, .el-table tr{*/
            /*background-color: transparent !important;*/
        /*}*/
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
                    margin-top: rem(6);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(12);
                    overflow: hidden;
                    /*color:#606266;*/
                    /*.el-select{*/
                        /*width:rem(140);*/
                    /*}*/
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                        font-size:rem(12);
                        padding-left:rem(10);
                    }
                    span{
                        display: inline-block;
                        /*width: rem(20);*/
                        /*overflow: hidden;*/
                        /*text-overflow: ellipsis;*/
                        /*white-space: nowrap;*/
                        line-height: rem(15);
                        overflow: hidden;
                        padding-bottom: rem(-1);
                    }
                    .ps{
                        color:#c0c4cc;
                        width: rem(203.2);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .el-icon-location-outline{
                        float:right;
                        margin:0;
                        padding-right:rem(20);
                    }
                    s{
                        text-decoration: none;
                        line-height: 0.9375rem;
                        float: left;
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
                        /*width: rem(20);*/
                        /*height: rem(20);*/
                        /*border-radius: 50%;*/
                        font-size: rem(16);
                        vertical-align: middle;
                        cursor: pointer;
                        margin-left:1rem
                    }
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(3);
                        box-sizing: border-box;
                        border-radius: rem(5);
                    }
                }
                .ms{
                    margin-left: rem(-1);
                    border-bottom: 1px solid transparent;
                    span{
                        width:rem(66)
                    }
                    .des-person{
                        float:left;
                    }
                    .des{
                        float:left
                    }
                    div{
                        width:15.3rem
                    }
                }
                .area{
                    height: rem(30);
                    s{
                        line-height: rem(26);
                    }
                    span{
                        line-height: rem(26);
                        /*margin-left: rem(16);*/
                    }
                    i{
                        margin-top: rem(3);
                    }
                }
                .ms-person{
                    div{
                        width:15.3rem;
                    }
                }
                .textarea {
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
                    right: rem(-15);
                    background: #fff;
                    img{
                        width: rem(55);
                        height: rem(55);
                        display: inline-block;
                        border-radius: 50%;
                        margin-left: rem(22);
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
<!--<style lang="scss" type="text/scss">-->
    <!--.hardwareDialog .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner{-->
            <!--background-color:transparent;-->
            <!--color:#c0c4cc;-->
        <!--}-->
    <!--.hardwareDialog .ms .el-textarea__inner{-->
            <!--font-size: rem(12);-->
            <!--font-family: '微软雅黑';-->
    <!--}-->
    <!--.hardwareDialog .popCard .selectstyle .el-input,.hardwareDialog .popCard .selectstyle .el-input__suffix{-->
        <!--right:-5px;-->
    <!--}-->
    <!--.hardwareDialog .wrapstyle .el-select,.hardwareDialog .wrapstyle .el-select .el-input,.hardwareDialog .wrapstyle .el-date-editor{-->
        <!--width:17.8rem;-->
    <!--}-->
    <!--.hardwareDialog .popCard .wrapstyle .el-select,.hardwareDialog .popCard .wrapstyle .el-select .el-input,.hardwareDialog .popCard .wrapstyle .el-date-editor{-->
        <!--width:17.5rem;-->
    <!--}-->
    <!--.hardwareDialog .popCard .wrapstyle .el-date-editor .el-input__prefix{-->
        <!--left:14.3rem-->
    <!--}-->
    <!--.hardwareDialog .equipmentStyle .el-select,.hardwareDialog .equipmentStyle .el-select .el-input{-->
        <!--width:12.5rem;-->
    <!--}-->
    <!--.hardwareDialog .popCard .equipmentStyle .el-select,.hardwareDialog .popCard .equipmentStyle .el-select .el-input{-->
        <!--width:12rem;-->
    <!--}-->
    <!--/*.hardwareDialog .cardFooter .el-button{*/-->
        <!--/*color:#c0c4cc;*/-->
        <!--/*border:1px solid #dcdfe6;*/-->
    <!--/*}*/-->
<!--</style>-->

