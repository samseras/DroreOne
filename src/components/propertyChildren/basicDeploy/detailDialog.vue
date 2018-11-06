<template>
    <div class="detailDialog">
        <el-dialog
            :title="title"
            :close-on-click-modal = false
            :visible="visible"
            :before-close="closeDialog"
            width="23%"
            class="dialog echatDialog"
            center>
            <div class="card">
                <!--车船-->
                <div class="personCardContent boatCardContent" v-if="route.includes('boat')">
                    <p class="name wrapstyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select v-model="boatCar.vehicle.type" placeholder="请选择" @change="selectePerson(boatCar.vehicle.type)" :disabled="isDisabled">
                            <el-option label="船只" :value="1"></el-option>
                            <el-option label="车辆" :value="0"></el-option>
                        </el-select>
                    </p>
                    <p class="sex">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text"v-model="boatCar.vehicle.serialNum" :maxlength="15" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="type wrapstyle">
                        <span>维护状态：</span>
                        <el-select v-model="boatCar.vehicle.maintenanceStatus" placeholder="请选择" :disabled="isDisabled">
                            <el-option label="异常" :value="1"></el-option>
                            <el-option label="正常" :value="0"></el-option>
                        </el-select>
                    </p>
                    <p class="idNum">
                        <span>核载人数：</span>
                        <el-input type="text"v-model="boatCar.vehicle.capacity" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="phoneNum data wrapstyle">购买时间：
                        <!--<input type="text"v-model="boatCar.vehicle.purchaseDate">-->
                        <el-date-picker
                            v-model="boatCar.vehicle.purchaseDate"
                            type="date"
                            :disabled="isDisabled"
                            placeholder="选择日期">
                        </el-date-picker>
                    </p>
                    <p class="phoneNum data wrapstyle">
                        <span>维护时间：</span>
                        <el-date-picker
                            v-model="boatCar.vehicle.maintenanceDate"
                            type="date"
                            :disabled="isDisabled"
                            placeholder="选择日期">
                        </el-date-picker>
                    </p>
                    <!--<p class="phoneNum person-driv">驾驶人员：
                        <el-select v-model="boatCar.driverId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in driverList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>-->
                    <!--目前车船人员不显示，暂时隐藏-->
                    <p class="phoneNum " v-if="false">
                        <span>联系电话：</span>
                        <!--<p class="phoneNum person-driv" v-if="isDisabled">联系电话：-->
                        <el-input type="text"v-model="boatCar.driverPhone" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="phoneNm">
                        <span>序列号码：</span>
                        <el-input type="text"v-model="boatCar.vehicle.model" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="gps wrapstyle">关联GPS：
                        <el-select v-model="boatCar.vehicle.gpsDeviceId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in gpsOption"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="boatCar.vehicle.description" :maxlength="140" :disabled="isDisabled" ></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(boatCar.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(boatCar.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--指示牌-->
                <div class="personCardContent boatCardContent" v-if="route.includes('indicator')">
                    <p class="name selectstyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select v-model="indicator.signboardBean.type" placeholder="请选择" :disabled="isDisabled">
                            <el-option label="标语类" :value="0"></el-option>
                            <el-option label="路线类" :value="1"></el-option>
                            <el-option label="设施类" :value="2"></el-option>
                        </el-select>
                    </p>
                    <p class=" selectstyle">
                        <span>所属片区：</span>
                        <el-select v-model="indicator.regionId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="phoneNum">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span :class="{ps:isDisabled}">{{indicator.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="indicator.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(indicator.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(indicator.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--垃圾桶-->
                <div class="personCardContent boatCardContent" v-if="route.includes('trash')">
                    <p class="name selectstyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select v-model="trash.dustbinBean.type" placeholder="请选择" :disabled="isDisabled">
                            <el-option label="临时" :value="1"></el-option>
                            <el-option label="固定" :value="0"></el-option>
                        </el-select>
                    </p>
                    <p class="sex">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text"v-model="trash.dustbinBean.name" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="type" v-if="false">
                        <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                        <el-select v-model="trash.status" placeholder="请选择" :disabled="isDisabled">
                            <el-option label="充裕" value="充裕"></el-option>
                            <el-option label="已满" value="已满"></el-option>
                        </el-select>
                    </p>
                    <p class="idNum">
                        <span>个&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：</span>
                        <el-input type="text"v-model="trash.dustbinBean.dustbinCount" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="phoneNum">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置:</span>
                        <span :class="{ps:isDisabled}">{{trash.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="wrapstyle selectstyle">
                        <span>所属片区：</span>
                        <el-select v-model="trash.regionId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="trash.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(trash.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(trash.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--景点-->
                <div class="personCardContent boatCardContent" v-if="route.includes('scenic')">
                    <p class="name">
                        <span>景点名称：</span>
                        <el-input type="text"v-model="scenic.scenicspotBean.name" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="sex selectstyle">
                        <span>所属片区：</span>
                        <el-select v-model="scenic.regionId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>

                    </p>
                    <p class="type" v-if="isDisabled">
                        <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                        <el-select v-model="scenic.scenicspotBean.statu" placeholder="请选择" :disabled="isDisabled">
                            <el-option label="充裕" value="充裕"></el-option>
                            <el-option label="已满" value="已满"></el-option>
                        </el-select>
                    </p>
                    <p class="idNum">
                        <span>容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</span>
                        <el-input type="text"v-model="scenic.scenicspotBean.capacity" :disabled="isDisabled"></el-input>
                    </p>

                    <!--<p class="phoneNum">当前人数：
                        <el-input type="text"v-model="scenic.scenicspotBean.currentNum" :disabled="isDisabled"></el-input>
                    </p>-->
                    <p class="phoneNum">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span :class="{ps:isDisabled}">{{scenic.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="scenic.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(scenic.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(scenic.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--商圈-->
                <div class="personCardContent boatCardContent" v-if="route.includes('shop')">
                    <p class="name selectstyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select v-model="shop.businessBean.businessTypeId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in businesstype"
                                :key="item.businessType.id"
                                :label="item.businessType.name"
                                :value="item.businessType.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="sex">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text"v-model="shop.businessBean.name" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="type wrapstyle selectstyle" v-if="isDisabled">
                        <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                        <el-select v-model="shop.businessBean.state" placeholder="请选择" :disabled="isDisabled">
                            <el-option label="充裕" value="充裕"></el-option>
                            <el-option label="已满" value="已满"></el-option>
                        </el-select>
                    </p>
                    <p class="idNum">
                        <span>容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</span>
                        <el-input type="text"v-model="shop.businessBean.capacity" :disabled="isDisabled" ></el-input>
                    </p>

                    <!--<p class="phoneNum">当前人数：
                        <el-input type="text"v-model="shop.businessBean.currentNum" :disabled="isDisabled"></el-input>
                    </p>-->
                    <p class="phoneNum">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span :class="{ps:isDisabled}">{{shop.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="wrapstyle selectstyle">
                        <span>所属片区：</span>
                        <el-select v-model="shop.regionId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="shop.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(shop.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(shop.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--停车场-->
                <div class="personCardContent boatCardContent" v-if="route.includes('park')">
                    <p class="name selectstyle">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select v-model="park.parkingBean.type" placeholder="请选择" :disabled="isDisabled">
                            <el-option label="室外" :value="0"></el-option>
                            <el-option label="室内" :value="1"></el-option>
                        </el-select>
                    </p>
                    <p class="sex">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text"v-model="park.parkingBean.name" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="type" v-if="isDisabled">
                        <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                        <el-input type="text"v-model="park.parkingBean.state" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="phoneNum">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span :class="{ps:isDisabled}">{{park.location}}</span>
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="wrapstyle selectstyle">
                        <span>所属片区：</span>
                        <el-select v-model="park.regionId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="park.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(park.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(park.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--卫生间-->
                <div class="personCardContent boatCardContent" v-if="route.includes('toilet')">
                    <p class="sex">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text"v-model="toilet.toiletBean.name" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class=" selectstyle">
                        <span>所属片区：</span>
                        <el-select v-model="toilet.regionId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="type" v-if="isDisabled">
                        <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                        <el-select v-model="toilet.state" placeholder="请选择" :disabled="isDisabled">
                            <el-option label="正常" value="正常"></el-option>
                            <el-option label="紧张" value="紧张"></el-option>
                        </el-select>
                    </p>
                    <p class="phoneNum">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span :class="{ps:isDisabled}">{{toilet.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="toilet.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(toilet.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(toilet.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--片区-->
                <div class="personCardContent boatCardContent" v-if="route.includes('area')">
                    <p class="sex">
                        <span>片区名称：</span>
                        <el-input type="text" v-model="area.name" required="required" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="phoneNum" v-if="false">所在景区：
                        <el-input type="text"v-model="area.placeScenic" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="phoneNum">
                        <span>位置范围：</span>
                        <span class="ps">{{area.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea" :rows="3" v-model="area.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                </div>
                <!--路网-->
                <div class="personCardContent boatCardContent" v-if="route.includes('roat')">
                    <p class="sex">
                        <span>路线名称：</span>
                        <el-input type="text"v-model="roat.name" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="phoneNum">
                        <span>位置范围：</span>
                        <span class="ps">{{roat.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="type wrapstyle">
                        <span>路线类型：</span>
                        <el-select v-model="roat.type" placeholder="请选择" :disabled="isDisabled">
                            <el-option label="水路" :value="1"></el-option>
                            <el-option label="公交道路" :value="2"></el-option>
                            <el-option label="步行道路" :value="3"></el-option>
                            <el-option label="驾车路线" :value="4"></el-option>
                        </el-select>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea" :rows="3" v-model="roat.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                </div>
                <!--设施类行-->
                <div class="personCardContent boatCardContent" v-if="route.includes('basictype')">
                    <p class="basicType">设施类行：
                        <el-select v-model="basicType.type" placeholder="请选择">
                            <el-option label="片区" value="片区"></el-option>
                            <el-option label="车船" value="车船"></el-option>
                            <el-option label="卫生间" value="卫生间"></el-option>
                            <el-option label="商圈" value="商圈"></el-option>
                            <el-option label="景点" value="景点"></el-option>
                            <el-option label="停车场" value="停车场"></el-option>
                        </el-select>
                    </p>
                </div>
                <!--人员类型-->
                <div class="personCardContent boatCardContent" v-if="route.includes('personType')">
                    <p class="basicType">人员类型：
                        <el-input type="text"v-model="job.name"></el-input>
                    </p>
                </div>
                <!--植物-->
                <div class="personCardContent boatCardContent" v-if="route.includes('plant-deploy')">
                    <p class="sex">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text"v-model="tree.plant.name" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="name">
                        <span>科&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目：</span>
                        <el-input type="text"v-model="tree.plant.genera" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="name">
                        <s>高&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度(m)：</s>
                        <el-input type="number"v-model="tree.plant.height"  min = "0" placeholder="请输入树木高度（数字）" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="name wrapstyle selectstyle">
                        <span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代：</span>
                        <el-date-picker
                            v-model="tree.plant.plantYear"
                            :disabled="isDisabled"
                            type="year"
                            placeholder="选择年代">
                        </el-date-picker>
                    </p>
                    <p class=" wrapstyle selectstyle">
                        <span>所属片区：</span>
                        <el-select v-model="tree.regionId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="phoneNum">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span :class="{ps:isDisabled}">{{tree.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea" :rows="3" v-model="tree.plant.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(tree.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(tree.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--建筑-->
                <div class="personCardContent boatCardContent" v-if="route.includes('construction')">
                    <p class="sex">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text"v-model="build.building.name" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="name">
                        <s>层&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高(m)：</s>
                        <el-input type="number" min="0" v-model="build.building.layers"  placeholder="请输入建筑层高（数字）" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="name">
                        <s>高&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度(m)：</s>
                        <el-input type="number" min="0" v-model="build.building.height"  placeholder="请输入建筑层高（数字）" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="name">
                        <span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;代：</span>
                        <el-date-picker
                            v-model="build.building.buildYear"
                            :disabled="isDisabled"
                            type="year"
                            placeholder="选择年代">
                        </el-date-picker>
                    </p>
                    <p class="phone">
                        <span>所属片区：</span>
                        <el-select v-model="build.regionId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="phoneNum">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span :class="{ps:isDisabled}">{{build.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea" :rows="3"  v-model="build.building.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(build.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(build.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--站点-->
                <div class="personCardContent boatCardContent" v-if="route.includes('station')">
                    <p class="type">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
                        <el-select v-model="station.type" @change = "stationTypeChange" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in siteType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="sex">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text"v-model="station.name" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="phone">
                        <span>所属片区：</span>
                        <el-select v-model="station.regionId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="sex">
                        <span>站点容量：</span>
                        <el-input type="text"v-model="station.capacity" :disabled="isDisabled"></el-input>
                    </p >
                    <p class="phoneNum">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span :class="{ps:isDisabled}">{{station.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea" :rows="3"  v-model="station.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(station.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(station.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>

                <!--打卡点-->
                <div class="personCardContent boatCardContent" v-if="route.includes('punch')">
                    <p class="sex">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input type="text"v-model="punch.name" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="sex">
                        <span>卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                        <el-input type="text"v-model="punch.cardNumber" :disabled="isDisabled" :maxlength="50"></el-input>
                    </p>
                    <p class="phone">
                        <span>所属片区：</span>
                        <el-select v-model="punch.regionId" placeholder="请选择" :disabled="isDisabled">
                            <el-option
                                v-for="item in regions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="phoneNum">
                        <span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：</span>
                        <span :class="{ps:isDisabled}">{{punch.location}}</span><i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="textarea ms">
                        <span class="des">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea" :rows="3"  v-model="punch.description" :disabled="isDisabled" :maxlength="140"></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(punch.picturePath)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(punch.picturePath)"  @error="imgError" class="rounded-circle" />
                        </label>
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
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="addNewInfo" :disabled='isDisabled'>保存</el-button>
                <el-button size="mini" @click = 'closeDialog' :disabled='isDisabled'>取消</el-button>
            </div>
        </el-dialog>
        <MapDialog v-if="mapVisible" :visible="mapVisible" class="map" @closeMapDialog = 'closeMapDialog' @saveLocation = "saveLocation"></MapDialog>
    </div>
</template>

<script>
    import MapDialog from './mapDialog'
    import Cropper from 'cropperjs'
    import FileUpload from 'vue-upload-component'
    import api from '@/api'
    import { mapGetters,mapMutations} from 'vuex'
    export default {
        name: "person-detail",
        props: ['visible', 'Info','isDisabled','title'],
        data () {
            return {
                files: [],
                driverList: [],
                edit: false,
                cropper: false,
                src: {},
                isShowMapDialog: false,
                mapVisible: false,
                basicType: {
                    type:'片区'
                },
                sex: '',
                boatCar: {
                    /*driverId: '',*/
                    driverPhone: '',
                    boatCarName:'',
                    vehicle: {
                        capacity:'',
                        /*driverId: "",*/
                        gpsDeviceId: "",
                        maintenanceDate:"",
                        maintenanceStatus:'',
                        model: "",
                        purchaseDate:"",
                        serialNum:"",
                        type: '',
                        description:''
                    },
                },
                trash: {
                    dustbinBean: {
                        type: '',
                        name: '',
                        state: '',
                        dustbinCount: '',
                    },
                    location: '',
                    regionId: '',
                    description:''
                },
                indicator: {
                    signboardBean: {
                        type: '',
                    },
                    regionId: '',
                    location: '',
                    description:''
                },
                scenic: {
                    scenicspotBean: {
                        capacity: '',
                        /* currentNum: '',*/
                        name: '',
                    },
                    regionId: '',
                    state: '',
                    location: '',
                    description:''
                },
                shop: {
                    businessBean: {
                        capacity: '',
                        /*currentNum: '',*/
                        name: '',
                        state: '',
                        businessTypeId: ''
                    },
                    location: '',
                    regionId: '',
                    description:''
                },
                park: {
                    parkingBean: {
                        type: '',
                        name: '',
                        state: '',
                        currentNum: ''
                        /*surplusNum: '',
                        capacity: '',*/
                    },
                    location: '',
                    regionId: '',
                    description:''
                },
                toilet: {
                    toiletBean: {
                        name:'',
                        plantYear: '',
                        height: '',
                        genera: '',
                    },
                    state:'',
                    location:'',
                    regionId: '',
                    description:''
                },
                area: {
                    name: '',
                    placeScenic: '',//所在景区
                    location: '',
                    description: '',
                },
                roat: {
                    name: '',
                    location: '',
                    description: '',
                    type: ''
                },
                tree: {
                    plant:{
                        name: '',
                        genera: '',
                        height: '',
                        plantYear: '',
                        description: ''
                    },
                    location:'',
                    regionId: '',
                },
                build: {
                    building:{
                        name: '',
                        height: '',
                        layers: '',
                        buildYear: '',
                        description: ''
                    },
                    location:'',
                    regionId: ''
                },
                station: {
                    typeId:'1',
                    name: '',
                    description: '',
                    location:'',
                    regionId: '',
                },
                punch: {
                    name: '',
                    cardNumber:'',
                    description: '',
                    location:'',
                    regionId: '',
                },
                siteType:[
                    {
                        id:'0',
                        name:'车站'
                    },
                    {
                        id:'1',
                        name:'码头'
                    }
                ],

                job: {
                    name: ''
                },
                options: [],
                gpsOption:[],
                route: '',
                file: {},
                src:'',
                businesstype: [],
                regions: []
            }
        },
        methods: {
            stationTypeChange(val){
                this.$store.commit('TRANSPORT_TYPE', val)
            },
            ad () {
                console.log(9999999999)
            },
            ...mapMutations(['LOCATION_ID']),
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null || url === undefined) {
                    let imgSrc
                    if (this.$route.params.id) {
                        switch (this.$route.params.id) {
                            case '1': {
                                imgSrc = './../../../static/img/driveCard.png';
                                break
                            }
                            case '2': {
                                imgSrc = './../../../static/img/boatCard.png';
                                break
                            }
                            case '3': {
                                imgSrc = './../../../static/img/clearCard.png';
                                break
                            }
                            case '4': {
                                imgSrc = './../../../static/img/clearCard.png';
                                break
                            }
                            case '5': {
                                imgSrc = './../../../static/img/saleTrickCard.png';
                                break
                            }
                            case '6': {
                                imgSrc = './../../../static/img/trickCard.png';
                                break
                            }
                            case '7':{
                                imgSrc = './../../../static/img/person.png';
                                break
                            }
                            case '8':{
                                imgSrc = './../../../static/img/person.png';
                                break
                            }
                        }
                    } else {
                        let route = this.$route.path
                       if (route.includes('shop')) {//商铺
                            if(this.shop.businessBean.businessTypeId == "2"){
                                imgSrc = './../../../../static/img/supermarket.png'
                            } else if(this.shop.businessBean.businessTypeId == "3"){
                                imgSrc = './../../../../static/img/restaurant.png'
                            } else if(this.shop.businessBean.businessTypeId == "4"){
                                imgSrc = './../../../../static/img/hotel.png'
                            } else if(this.shop.businessBean.businessTypeId == "5"){
                                imgSrc = './../../../../static/img/kursaal.png'
                            } else if(this.shop.businessBean.businessTypeId == "6"){
                                imgSrc = './../../../../static/img/cafe.png'
                            } else if(this.shop.businessBean.businessTypeId == "7"){
                                imgSrc = './../../../../static/img/teahouse.png'
                            } else{
                               imgSrc = './../../../../static/img/businesCard.png'
                            }

                       }else if (route.includes('park')) {//停车
                           imgSrc = './../../../../static/img/parkCard.png'
                       }else if (route.includes('toilet')) {//卫生间
                           imgSrc = './../../../../static/img/toiletCard.png'
                       }else if (route.includes('scenic')) {//景点
                           imgSrc = './../../../../static/img/scenicCard.png'
                       }else if (route.includes('trash')) {//垃圾桶
                           imgSrc = './../../../../static/img/wasteCard.png'
                       }else if (route.includes('indicator')) {//指示牌
                           imgSrc = './../../../../static/img/indicatorCard.png'
                       }else if (route.includes('plant')) {//植物
                           imgSrc = './../../../../static/img/botanyCard.png'
                       }else if (route.includes('construction')) {//建筑
                           imgSrc = './../../../../static/img/bulidCard.png'
                       } else if (route.includes('boat')) {//车船
                           if(this.boatCar.vehicle.type == 0){
                               imgSrc = './../../../static/img/carPic.png';
                           }else{
                               imgSrc = './../../../static/img/boatPic.png';
                           }
                       } else if (route.includes('station')) {// 站点码头
                           console.log(this.station)
                           if(!this.station.type || this.station.type == "0"){
                               imgSrc = './../../../../static/img/stationCard.svg'
                           }else if(this.station.type == "1"){
                               imgSrc = './../../../../static/img/landingCard.svg'
                           }
                        } else if (route.includes('punch')){
                           imgSrc = './../../../../static/img/punch_deploy.png'
                       }
                    }
                    return imgSrc
                } else {
                    return url
                }
            },
            saveLocation () {
                let locationString
                let regionLocationStr
                let roatLocationStr
                if (this.getLocation.length > 0) {
                    locationString = `${this.getLocation[0]},${this.getLocation[1]}`
                }
                if (this.getRegionLocation.length > 0) {
                    regionLocationStr = this.getRegionLocation
                }
                if (this.getRoatLocation.length > 0) {
                    roatLocationStr = this.getRoatLocation
                }
                if(this.route.includes('trash')) {
                    this.trash.location = locationString
                } else if(this.route.includes('indicator')) {
                    this.indicator.location = locationString
                } else if(this.route.includes('scenic')) {
                    this.scenic.location = locationString
                } else if(this.route.includes('shop')) {
                    this.shop.location = locationString
                } else if(this.route.includes('park')) {
                    this.park.location = locationString
                } else if(this.route.includes('toilet')) {
                    this.toilet.location = locationString
                } else if (this.route.includes('area')) {
                    this.area.location = regionLocationStr
                } else if (this.route.includes('roat')) {
                    this.roat.location = roatLocationStr
                } else if (this.route.includes('plant-deploy')) {
                    this.tree.location = locationString
                } else if (this.route.includes('construction')) {
                    this.build.location = locationString
                } else if (this.route.includes('wharf')) {
                    this.wharf.location = locationString
                } else if (this.route.includes('station')){
                    this.station.location = locationString
                } else if (this.route.includes('punch')){
                    this.punch.location = locationString
                }
                this.mapVisible = false
            },
            closeDialog () {
                console.log(this.src)
                this.$emit('closeInfoDialog')
            },
            addNewInfo () {
                let newInfo = {}
                let  myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;   //电话号码校验
                let intreg = /^[1-9]\d*$/; //非零正整数校验
                let integerreg = /^(0|[1-9][0-9]*)$/; //大于等于0正整数
                if(this.route.includes('boat')) {
                    newInfo = this.boatCar;
                    console.log(newInfo);
                    if(!(newInfo.vehicle.hasOwnProperty("type") && integerreg.test(newInfo.vehicle.type)) ||
                        !(newInfo.vehicle.serialNum && newInfo.vehicle.serialNum.trim() !== '')   //编号改为名称
//                        !(newInfo.vehicle.hasOwnProperty("maintenanceStatus") && integerreg.test(newInfo.vehicle.maintenanceStatus)) ||
                    /* !(newInfo.vehicle.maintenanceDate && newInfo.vehicle.maintenanceDate !== '') ||*/
                    //!(newInfo.driverId  && newInfo.driverId !== '') ||   //驾驶员信息
//                        !(newInfo.vehicle.model && newInfo.vehicle.model.trim() !== '')
                    ){

                        this.$message.error('请输入完整信息')
                        return
                    }

                } else if(this.route.includes('trash')) {
                    newInfo = this.trash
                    if(!(newInfo.dustbinBean.hasOwnProperty("type") && integerreg.test(newInfo.dustbinBean.type)) ||
                        !(newInfo.dustbinBean.name && newInfo.dustbinBean.name.trim() !== '') ||
                        !(newInfo.regionId && newInfo.regionId !== '') ||
                        // !(newInfo.status && newInfo.status !== '') ||
                        !(newInfo.location && newInfo.location !== '')
                    ){

                        this.$message.error('请输入完整信息')
                        return
                    }
                } else if(this.route.includes('indicator')) {
                    newInfo = this.indicator
                    if(!(newInfo.signboardBean.hasOwnProperty("type") && integerreg.test(newInfo.signboardBean.type)) ||
                        !(newInfo.regionId && newInfo.regionId !== '') ||
                        !(newInfo.location && newInfo.location !== '')

                    ){

                        this.$message.error('请输入完整信息')
                        return
                    }
                } else if(this.route.includes('scenic')) {
                    newInfo = this.scenic
                    if(!(newInfo.scenicspotBean.name && newInfo.scenicspotBean.name.trim() !== '') ||
                        !(newInfo.regionId && newInfo.regionId !== '') ||
                        !(newInfo.location && newInfo.location !== '')

                    ){

                        this.$message.error('请输入完整信息')
                        return
                    }


                } else if(this.route.includes('shop')) {
                    newInfo = this.shop
                    console.log(newInfo)
                    if(!(newInfo.businessBean.hasOwnProperty("businessTypeId") && integerreg.test(newInfo.businessBean.businessTypeId)) ||
                        !(newInfo.businessBean.name && newInfo.businessBean.name.trim() !== '') ||
                        // !(newInfo.businessBean.state && newInfo.businessBean.state !== '') ||
                        !(newInfo.location && newInfo.location !== '') ||
                        !(newInfo.regionId && newInfo.regionId !== '')
                    ){
                        this.$message.error('请输入完整信息')
                        return
                    }


                } else if(this.route.includes('park')) {
                    newInfo = this.park
                    console.log(newInfo);
                    if(!(newInfo.parkingBean.hasOwnProperty("type") && integerreg.test(newInfo.parkingBean.type)) ||
                        !(newInfo.parkingBean.name && newInfo.parkingBean.name.trim() !== '') ||
                        // !(newInfo.parkingBean.state && newInfo.parkingBean.state !== '') ||
                        !(newInfo.location && newInfo.location !== '') ||
                        !(newInfo.regionId && newInfo.regionId !== '')
                    ){

                        this.$message.error('请输入完整信息')
                        return
                    }

                } else if(this.route.includes('toilet')) {
                    newInfo = this.toilet
                    if(!(newInfo.toiletBean.name && newInfo.toiletBean.name.trim() !== '') ||
                        !(newInfo.regionId && newInfo.regionId !== '') ||
                        // !(newInfo.state && newInfo.state !== '') ||
                        !(newInfo.location && newInfo.location !== '')
                    ){

                        this.$message.error('请输入完整信息')
                        return
                    }

                } else if(this.route.includes('area')) {
                    newInfo = this.area;
                    if(!(newInfo.name && newInfo.name.trim() !== '') ||
                        !(newInfo.location && newInfo.location !== '')
                    // !(newInfo.placeScenic && newInfo.placeScenic !== '') ||
                    ){

                        this.$message.error('请输入完整信息')
                        return
                    }
                } else if (this.route.includes('roat')) {
                    newInfo = this.roat
                    console.log(newInfo)
                    if(!(newInfo.name && newInfo.name.trim() !== '') ||
                        !(newInfo.location && newInfo.location !== '') ||
                        !(newInfo.type && newInfo.type !== '')
                    ){

                        console.log(newInfo.type);
                        this.$message.error('请输入完整信息')
                        return
                    }

                } else if (this.route.includes('personType')) {
                    newInfo = this.job
                } else if (this.route.includes('plant-deploy')) {
                    newInfo = this.tree
                    if(!(newInfo.plant.name && newInfo.plant.name.trim() !== '') ||
                        !(newInfo.plant.genera && newInfo.plant.genera !== '') ||
                        !(newInfo.location && newInfo.location !== '') ||
                        !(newInfo.regionId && newInfo.regionId !== '')
                    ){

                        this.$message.error('请输入完整信息')
                        return
                    }

                } else if (this.route.includes('construction')) {
                    newInfo = this.build

                    if(!(newInfo.building.name && newInfo.building.name.trim() !== '') ||
                        !(newInfo.location && newInfo.location !== '') ||
                        !(newInfo.regionId && newInfo.regionId !== '')
                    ){

                        this.$message.error('请输入完整信息')
                        return
                    }
                } else if (this.route.includes('station')) {
                    newInfo = this.station
                    if (!(newInfo.name && newInfo.name.trim() !== '') ||
                        !(newInfo.location && newInfo.location !== '') ||
                        !(newInfo.regionId && newInfo.regionId !== '')
                    ) {
                        this.$message.error('请输入完整信息')
                        return
                    }
                } else if (this.route.includes('punch')) {
                    newInfo = this.punch
                    if (!(newInfo.name && newInfo.name.trim() !== '') ||
                        !(newInfo.cardNumber && newInfo.cardNumber !== '') ||
                        !(newInfo.location && newInfo.location !== '') ||
                        !(newInfo.regionId && newInfo.regionId !== '')
                    ) {
                        this.$message.error('请输入完整信息')
                        return
                    }
                }
                newInfo.status = true
                newInfo.checked = false
                newInfo.imgUrl = this.src

                if (this.Info.id) {
                    newInfo.id = this.Info.id
                    this.$emit('fixInfo', newInfo)
                } else {
                    this.$emit('addNewInfo', newInfo)
                }
            },
            showMapDialog () {
                this.mapVisible  = true
            },
            closeMapDialog () {
                this.mapVisible = false
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
            selectePerson (type) {
                let jobId
                if (type == 0){
                    jobId = 1
                } else if(type == 1) {
                    jobId = 2
                }
                api.person.getJobPerson(jobId).then(res => {
                    console.log(res, '成功')
                    this.driverList = res
                    this.driverList.forEach(item => {
                        item.id = item.personBean.id
                        item.name = item.personBean.name
                    })
                }).catch(err => {
                    console.log(err, '失败')
                })
            },
            async getGpsOption(){
                await api.gps.getAllGps().then((res)=>{
                    console.log(res,'这是GPS')
                    this.gpsOption=res.devices
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        created () {
            api.area.getAllRegion().then(res => {
                console.log(res, '所有片区')
                this.regions = res
            })
            this.route = this.$route.path
            console.log(this.Info,'  opopop')
            if (this.route.includes('person') && this.$route.params.id) {
                let jobId = this.$route.params.id
                api.person.getJob().then(res => {
                    console.log(res, '所有工种')
                    this.options = res
                })
                this.person = this.Info
                this.sex = this.person.gender
                this.person.jobId = jobId
            } else if(this.route.includes('boat')) {
                this.getGpsOption()
                this.boatCar = this.Info
            } else if(this.route.includes('trash')) {
                console.log(this.Info, '909090909090')
                this.trash = this.Info
            } else if(this.route.includes('indicator')) {
                this.indicator = this.Info
            } else if(this.route.includes('scenic')) {
                console.log(this.Info, '[][][][][[][][][')
                this.scenic = this.Info
            } else if(this.route.includes('shop')) {
                api.shop.getBusinesstype().then(res => {
                    console.log(res, '所有商铺类型')
                    this.businesstype = res
                })
                this.shop = this.Info
            } else if(this.route.includes('park')) {
                this.park = this.Info
            } else if(this.route.includes('toilet')) {
                this.toilet = this.Info
            } else if (this.route.includes('area')) {
                this.area = this.Info
            } else if (this.route.includes('roat')) {
                this.roat = this.Info
            } else if (this.route.includes('personType')) {
                this.job = this.Info
            } else if (this.route.includes('plant-deploy')) {
                this.tree = this.Info
            }  else if (this.route.includes('construction')) {
                this.build = this.Info
            } else if (this.route.includes('station')) {
                this.station = this.Info
                if(this.Info.id){
                    this.$store.commit('TRANSPORT_TYPE', this.Info.type)
                }
            }else if (this.route.includes('punch')) {
                this.punch = this.Info
            }
            if (this.Info.id) {
                console.log(this.Info.id, '这是拿到的Id')
                this.$store.commit('LOCATION_ID', this.Info.id)
            }else {
                this.$store.commit('LOCATION_ID', '')
            }
        },
        components: {
            FileUpload,
            MapDialog
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
        filters: {
            sexFilter (item) {
                if (item) {
                    return '男'
                } else {
                    return '女'
                }
            }
        },
        mounted () {
        },
        computed: {
            ...mapGetters([
                'getLocation',
                'getRegionLocation',//片区
                'getRoatLocation'//路网
            ])
        },
    }
</script>
<style>
    .detailDialog .sex .el-input__suffix,.detailDialog .type .el-input__suffix,.detailDialog .selectstyle .el-input__suffix{
        right:-5px;
    }
    .detailDialog .wrapstyle .el-select,.detailDialog .wrapstyle .el-select .el-input,.detailDialog .wrapstyle .el-date-editor{
        width:15.2rem;
    }
    .detailDialog .wrapstyle .el-date-editor .el-input__prefix{
        left:14.3rem
    }
</style>
<style lang="scss" type="text/scss">
    .detailDialog{
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
            padding-left: rem(10);
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
    }
</style>
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
<style lang="scss" scoped type="text/scss">
    .detailDialog{
        .card{
            width: 100%;
            height: 100%;
            .personCardContent ,.boatCardContent {
                width: 100%;
                height: 100%;
                position: relative;
                p{
                    margin-top: rem(8);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(12);
                    overflow: hidden;
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                        font-size: rem(12);
                        padding-left: rem(10);
                    }
                    span{
                        display: inline-block;
                        /*width: rem(200);*/
                        /*overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;*/
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
                        float:right
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
                .phoneNum{
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
