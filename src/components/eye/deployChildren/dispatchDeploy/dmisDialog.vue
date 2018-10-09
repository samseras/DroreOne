<template>
    <div class="dmisDialog">
        <el-dialog
            :title="title"
            :visible="visible"
            :close-on-click-modal = false
            :before-close="closeDialog"
            width="600px"
            class="dialog echatDialog"
            center>
            <ScrollContainer>
                <div class="card">
                    <!--巡更路线-->
                    <div class="personCardContent" v-if="route.includes('security')">
                        <div class="row">
                            <span class="dmisTitle">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：</span>
                            <el-input type="text"v-model="security.inspectionSchedule.name"class="inputText" :maxlength="15" :disabled='isDisabled'></el-input>
                        </div>
                        <div class="row">
                            <span class="dmisTitle">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：</span>
                            <el-checkbox-group v-model="filterList" @change="selectDays" :disabled='isDisabled'>
                                <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                            </el-checkbox-group>
                            <el-checkbox label="自定义" @change="weekCustom(security.inspectionSchedule.customizedDays)" v-model="security.inspectionSchedule.customizedDays" :disabled='isDisabled'></el-checkbox>
                        </div>
                        <div class="row" v-if="security.inspectionSchedule.customizedDays">
                            <span class="dmisTitle">选择时间：</span>
                            <el-date-picker
                                v-model="daySelect"
                                size ="mini"
                                :disabled='isDisabled'
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="row">
                            <span class="Hardware dmisTitle">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 次：</span>
                            <el-checkbox-group v-model="classesList" @change="security.inspectionSchedule.customizedShift = false" :disabled='isDisabled'>
                                <el-checkbox v-for="item in classes" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                            </el-checkbox-group>
                            <el-checkbox label="自定义" @change="dayCustom(security.inspectionSchedule.customizedShift)" v-model="security.inspectionSchedule.customizedShift" :disabled='isDisabled'></el-checkbox>
                            <!--<el-time-picker v-if="security.inspectionSchedule.customizedShift"-->
                                            <!--is-range-->
                                            <!--v-model="timeSelect"-->
                                            <!--range-separator="至"-->
                                            <!--:disabled='isDisabled'-->
                                            <!--start-placeholder="开始时间"-->
                                            <!--end-placeholder="结束时间"-->
                                            <!--placeholder="选择时间范围">-->
                            <!--</el-time-picker>-->
                        </div>
                        <div class="Hardware row"  v-if="security.inspectionSchedule.customizedShift">
                            <span class="dmisTitle">选择时间：</span>
                            <el-time-picker
                                            is-range
                                            v-model="timeSelect"
                                            range-separator="至"
                                            :disabled='isDisabled'
                                            start-placeholder="开始时间"
                                            end-placeholder="结束时间"
                                            placeholder="选择时间范围">
                            </el-time-picker>
                        </div>
                        <div class="row">
                            <span class="dmisTitle">岗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 位：</span>
                            <el-select v-model="jobName" size="mini" class="" multiple placeholder="请选择" :disabled='isDisabled' @change="getJobNameList">
                                <el-option
                                    v-for="item in jobList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="relateVehicle">
                            <div class="dmisTitle">关联人员：</div>
                            <div class="dmisContent">
                                <table>
                                    <thead>
                                    <tr>
                                        <th class="headCar">人员信息</th>
                                        <th class="headPerson">GPS信息</th>
                                        <th class="headAdd" @click="addSecurityRow"><i class="el-icon-plus"></i></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(dataObj,index) in security.iScheduleMaps" :key="index">
                                        <td class="person">
                                            <el-select @change="personChange" v-model="dataObj.securityId" placeholder="请选择" :disabled="isDisabled" :maxlength="15">
                                                <el-option
                                                    v-for="item in personList"
                                                    :key="item.id"
                                                    :label="item.cnName"
                                                    :value="item.id"
                                                    :disabled="item.disabled">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td class="gps">
                                            <el-select @change="gpsChange" v-model="dataObj.gpsId" placeholder="请选择" :disabled="isDisabled" :maxlength="15">
                                                <el-option
                                                    v-for="item in gpsOption"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id"
                                                    :disabled="item.disabled">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td class="delete" @click="deleteSecurityRow(dataObj)">
                                            <i class="el-icon-close"></i>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="uploadText row">
                            <span class="updataTitle dmisTitle">线路绘制：</span>
                            <!--<input type="text"v-model="security.location" class="location">-->
                            <el-select v-model="security.inspectionSchedule.routeId" placeholder="请选择" :disabled='isDisabled'>
                                <el-option
                                    v-for="ite in options"
                                    :key="ite.id"
                                    :label="ite.name"
                                    :value="ite.id">
                                </el-option>
                            </el-select>
                            <i class="el-icon-location-outline" @click="showMapDialog"></i>
                        </div>
                        <div class="textArea row">
                            <span class="description dmisTitle">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                            <el-input type="textarea"  v-model="security.inspectionSchedule.description" :disabled="isDisabled" ></el-input>
                        </div>
                    </div>
                    <!--广播-->
                    <div class="personCardContent" v-if="route.includes('broadcast')">
                        <p class="sex"><span class="dmisTitle"> 名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：</span>
                            <el-input type="text"v-model="broadList.broadcastSchedule.name" class="inputText" :maxlength="15" :disabled='isDisabled'></el-input>
                        </p>
                        <p class="time">
                            <span class="dmisTitle">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：</span>
                            <el-checkbox-group v-model="filterList" @change="selectDays" :disabled='isDisabled'>
                                <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                            </el-checkbox-group>
                            <el-checkbox label="自定义" @change="weekCustom(broadList.broadcastSchedule.customizedDays)" v-model="broadList.broadcastSchedule.customizedDays" :disabled='isDisabled'></el-checkbox>
                        </p>
                        <p class="time" v-if="broadList.broadcastSchedule.customizedDays">
                            <span class="dmisTitle">选择时间：</span>
                            <el-date-picker
                                v-model="daySelect"
                                size ="mini"
                                :disabled='isDisabled'
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </p>
                        <p class="Hardware">
                            <span class="dmisTitle">执行时间：</span>
                            <el-time-picker is-range
                                            v-model="timeSelect"
                                            :disabled='isDisabled'
                                            range-separator="至"
                                            start-placeholder="开始时间"
                                            end-placeholder="结束时间"
                                            placeholder="选择时间范围">
                            </el-time-picker>
                        </p>
                        <p class="name">
                            <span class="dmis">关联广播：</span>
                            <el-tree
                                :data="options"
                                show-checkbox
                                node-key="id"
                                :default-expanded-keys='regionIdList'
                                :default-checked-keys="broadList.broadcastIds"
                                @check="handleCheckChange">
                            </el-tree>
                        </p>
                        <p class="uploadText"><span class="updataTitle dmisTitle">定义内容：</span>
                            <!--<input type="text"v-model="broadList.musicIds" class="inputText">-->
                            <span v-for="item in broadList.musics" :key="item.id">{{item.title}}</span>
                            <el-button slot="trigger" size="small" type="primary" @click="showBroadcastDialog" v-if='!isDisabled'>曲目编辑</el-button>
                        </p>
                        <p class="type textArea">
                            <span class="description dmisTitle">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                            <el-input type="textarea"  v-model="broadList.broadcastSchedule.description" :disabled="isDisabled" ></el-input>
                        </p>
                    </div>
                    <!--路灯-->
                    <div class="personCardContent" v-if="route.includes('lamppost')">
                        <p class="sex">
                            <span class="dmisTitle">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：</span>
                            <el-input type="text" v-model="lamppost.lightSchedule.name" class="inputText" :maxlength="15" :disabled='isDisabled'></el-input>
                        </p>
                        <p class="time">
                            <span class="dmisTitle">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：</span>
                            <!--<el-checkbox-group v-model="filterList" @change="lamppost.lightSchedule.customizedDays = false" :disabled='isDisabled'>-->
                            <el-checkbox-group v-model="filterList" @change="selectDays" :disabled='isDisabled'>
                                <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                            </el-checkbox-group>
                            <el-checkbox label="自定义" @change="weekCustom(lamppost.lightSchedule.customizedDays)" v-model="lamppost.lightSchedule.customizedDays" :disabled='isDisabled'></el-checkbox>
                        </p>
                        <p class="time" v-if="lamppost.lightSchedule.customizedDays">
                            <span class="dmisTitle">选择时间：</span>
                            <el-date-picker
                                v-model="daySelect"
                                size ="mini"
                                :disabled='isDisabled'
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </p>
                        <p class="Hardware">
                            <span class="dmisTitle">执行时间：</span>
                            <el-time-picker is-range
                                            v-model="timeSelect"
                                            :disabled='isDisabled'
                                            range-separator="至"
                                            start-placeholder="开始时间"
                                            end-placeholder="结束时间"
                                            placeholder="选择时间范围">
                            </el-time-picker>
                        </p>
                        <p class="name">
                            <span class="dmis">关联路灯：</span>
                            <el-tree
                                :data="options"
                                show-checkbox
                                node-key="id"
                                :default-expanded-keys='regionIdList'
                                :default-checked-keys="lamppost.lightIds"
                                @check="handleCheckChange">
                            </el-tree>
                        </p>
                        <p class="type textArea">
                            <span class="description dmisTitle">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                            <el-input type="textarea"  v-model="lamppost.lightSchedule.description" :disabled="isDisabled" ></el-input>
                        </p>
                    </div>
                    <!--保洁-->
                    <div class="personCardContent" v-if="route.includes('purifier')">
                        <p class="sex">
                            <span class="dmisTitle">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：</span>
                            <el-input type="text"v-model="purifier.cleanSchedule.name"class="inputText" :maxlength="15" :disabled='isDisabled'></el-input>
                        </p>
                        <p class="time">
                            <span class="dmisTitle">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：</span>
                            <el-checkbox-group v-model="filterList" @change="selectDays" :disabled='isDisabled'>
                                <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                            </el-checkbox-group>
                            <el-checkbox label="自定义" @change="weekCustom(purifier.cleanSchedule.customizedDays)" v-model="purifier.cleanSchedule.customizedDays":disabled='isDisabled' ></el-checkbox>
                        </p>
                        <p class="time" v-if="purifier.cleanSchedule.customizedDays">
                            <span class="dmisTitle">选择时间：</span>
                            <el-date-picker
                                v-model="daySelect"
                                size ="mini"
                                type="daterange"
                                :disabled='isDisabled'
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </p>
                        <p class="time">
                            <span class="dmisTitle">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 次：</span>
                            <el-checkbox-group v-model="classesList" @change="purifier.cleanSchedule.customizedShift = false" :disabled='isDisabled'>
                                <el-checkbox v-for="item in classes" :label="item.id" :key="item.id" >{{item.type}}</el-checkbox>
                            </el-checkbox-group>
                            <el-checkbox label="自定义" @change="dayCustom(purifier.cleanSchedule.customizedShift)" v-model="purifier.cleanSchedule.customizedShift" :disabled='isDisabled'></el-checkbox>
                            <el-time-picker v-if="purifier.cleanSchedule.customizedShift"
                                            is-range
                                            v-model="timeSelect"
                                            range-separator="至"
                                            :disabled='isDisabled'
                                            start-placeholder="开始时间"
                                            end-placeholder="结束时间"
                                            placeholder="选择时间范围">
                            </el-time-picker>
                        </p>
                        <p class="name">
                            <span class="dmisTitle">岗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 位：</span>
                            <el-select v-model="jobName" size="mini" class="" multiple placeholder="请选择" :disabled='isDisabled' @change="getJobNameList">
                                <el-option
                                    v-for="item in jobList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </p>
                        <p class="name">
                            <span class="dmisTitle">人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 员：</span>
                            <el-select v-model="purifier.cleanerIds" size="mini" class="" multiple placeholder="请选择" :disabled='isDisabled'>
                                <el-option
                                    v-for="item in personList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </p>
                        <!--<p class="idNum">重复调度：-->
                        <!--<el-radio v-model="radio" label="1">是</el-radio>-->
                        <!--<el-radio v-model="radio" label="0">否</el-radio>-->
                        <!--</p>-->
                        <p class="name">
                            <span class="dmisTitle">片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 区：</span>
                            <el-select v-model="regionId" size="mini" class="" multiple placeholder="请选择" :disabled='isDisabled'>
                                <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </p>
                        <p class="type textArea">
                            <span class="description dmisTitle">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                            <el-input type="textarea"  v-model="purifier.cleanSchedule.description" :disabled="isDisabled" ></el-input>
                        </p>
                    </div>
                    <!--LED-->
                    <div class="personCardContent" v-if="route.includes('screen')">
                        <p class="sex">
                            <span class="dmisTitle">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：</span>
                            <el-input type="text"v-model="screen.ledSchedule.name" class="inputText" :disabled="isDisabled" :maxlength="15"></el-input>
                        </p>
                        <p class="time">
                            <span class="dmisTitle">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：</span>
                            <el-checkbox-group v-model="filterList" @change="selectDays" :disabled='isDisabled'>
                                <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                            </el-checkbox-group>
                            <el-checkbox label="自定义" @change="weekCustom(screen.ledSchedule.customizedDays)" v-model="screen.ledSchedule.customizedDays" :disabled='isDisabled'></el-checkbox>
                        </p>
                        <p class="time" v-if="screen.ledSchedule.customizedDays">
                            <span class="dmisTitle">选择时间：</span>
                            <el-date-picker
                                v-model="daySelect"
                                size ="mini"
                                type="daterange"
                                :disabled='isDisabled'
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </p>
                        <p class="Hardware">
                            <span class="dmisTitle">执行时间：</span>
                            <el-time-picker is-range
                                            v-model="timeSelect"
                                            :disabled='isDisabled'
                                            range-separator="至"
                                            start-placeholder="开始时间"
                                            end-placeholder="结束时间"
                                            placeholder="选择时间范围">
                            </el-time-picker>
                        </p>
                        <p class="name">
                            <span class="dmis">关联大屏：</span>
                            <el-tree
                                :data="options"
                                show-checkbox
                                node-key="id"
                                :default-expanded-keys='regionIdList'
                                :default-checked-keys="screen.ledIds"
                                @check="handleCheckChange">
                            </el-tree>
                        </p>
                        <!--<p class="idNum">重复调度：-->
                        <!--<el-radio v-model="radio" label="1">是</el-radio>-->
                        <!--<el-radio v-model="radio" label="0">否</el-radio>-->
                        <!--</p>-->
                        <p class="uploadText"><span class="updataTitle dmisTitle">定义内容：</span>
                            <span v-for="item in screen.contents" :key="item.id">{{item.content}}</span>
                            <el-button slot="trigger" size="small" type="primary" @click = "showScreenDialog" v-if="!isDisabled" >定义内容</el-button>
                        </p>
                        <p class="type textArea">
                            <span class="description dmisTitle">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                            <el-input type="textarea"  v-model="screen.ledSchedule.description" :disabled="isDisabled" ></el-input>
                        </p>
                    </div>
                    <!--车船调度-->
                    <div class="personCardContent" v-if="route.includes('transport')">
                        <div class="row">
                            <span class="dmisTitle">调度类型：</span>
                            <el-select v-model="transport.type" @change = "typeChange" placeholder="请选择" :disabled="isDisabled" :maxlength="15">
                                <el-option
                                    v-for="item in toolType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="row">
                            <span class="dmisTitle">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：</span>
                            <el-input type="text"v-model="transport.name" class="inputText" :disabled="isDisabled" :maxlength="15"></el-input>
                        </div>
                        <div class="row">
                            <span class="dmisTitle">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：</span>
                            <el-checkbox-group v-model="filterList" @change="selectDays" :disabled='isDisabled'>
                                <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                            </el-checkbox-group>
                            <el-checkbox label="自定义" @change="weekCustom(transport.customizedDays)" v-model="transport.customizedDays" :disabled='isDisabled'></el-checkbox>
                        </div>
                        <div class="row" v-if="transport.customizedDays">
                            <span class="dmisTitle">选择时间：</span>
                            <el-date-picker
                                v-model="daySelect"
                                size ="mini"
                                type="daterange"
                                :disabled='isDisabled'
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="Hardware row">
                            <span class="dmisTitle">执行时间：</span>
                            <el-time-picker is-range
                                            v-model="timeSelect"
                                            :disabled='isDisabled'
                                            range-separator="至"
                                            start-placeholder="开始时间"
                                            end-placeholder="结束时间"
                                            placeholder="选择时间范围">
                            </el-time-picker>
                        </div>
                        <div class="row">
                            <span class="dmisTitle">岗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 位：</span>
                            <el-select v-model="jobName" size="mini" class="" multiple placeholder="请选择" :disabled='isDisabled' @change="getJobNameList">
                                <el-option
                                    v-for="item in jobList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="relateVehicle">
                            <div class="dmisTitle">关联车船：</div>
                            <div class="dmisContent">
                                <table>
                                    <thead>
                                    <tr>
                                        <th class="headCar">车船信息</th>
                                        <th class="headPerson">人员信息</th>
                                        <th class="headAdd" @click="addRow"><i class="el-icon-plus"></i></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(dataObj,index) in transport.vDriverMaps" :key="index">
                                        <td class="vehicle">
                                            <el-select @change="vehicleChange" v-show="transport.type == '0'" v-model="dataObj.vehicleId" placeholder="请选择" :disabled="isDisabled" :maxlength="15">
                                                <el-option
                                                    v-for="item in cars"
                                                    :key="item.id"
                                                    :label="item.label"
                                                    :value="item.id"
                                                    :disabled="item.disabled">
                                                </el-option>
                                            </el-select>
                                            <el-select @change="vehicleChange" v-show="transport.type == '1'" v-model="dataObj.vehicleId" placeholder="请选择" :disabled="isDisabled" :maxlength="15">
                                                <el-option
                                                    v-for="item in boats"
                                                    :key="item.id"
                                                    :label="item.label"
                                                    :value="item.id"
                                                    :disabled="item.disabled">
                                                </el-option>
                                            </el-select>

                                        </td>
                                        <td class="person">
                                            <el-select @change="personChange" v-model="dataObj.driverId" placeholder="请选择" :disabled="isDisabled" :maxlength="15">
                                                <el-option
                                                    v-for="item in personList"
                                                    :key="item.id"
                                                    :label="item.cnName"
                                                    :value="item.id"
                                                    :disabled="item.disabled">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td class="delete" @click="deleteRow(dataObj)">
                                            <i class="el-icon-close"></i>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="uploadText row">
                            <div class="updataTitle dmisTitle">绘制路线：</div>
                            <el-select v-model="transport.routeId" placeholder="请选择" :disabled='isDisabled'>
                                <el-option
                                    v-for="ite in lineOptions"
                                    :key="ite.id"
                                    :label="ite.name"
                                    :value="ite.id">
                                    <template slot-scope="scope">
                                        <span style="float: left">{{ ite.name }}</span>
                                        <span style="float: right;" @click="deleteRouteLine(ite.id)">
                                                <i class="el-icon-close"></i>
                                        </span>
                                    </template>
                                </el-option>
                            </el-select>

                            <i class="el-icon-location-outline" @click="showSiteMap"></i>
                        </div>
                        <div class="row textArea">
                            <div class="description dmisTitle">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</div>
                            <el-input type="textarea" v-model="transport.description" :disabled="isDisabled" ></el-input>
                        </div>
                    </div>
                </div>
            </ScrollContainer>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="addNewInfo" :disabled="isDisabled">保存</el-button>
                <el-button size="mini" @click = 'closeDialog' :disabled='isDisabled'>取消</el-button>
            </div>
        </el-dialog>
        <MapDialog v-if="mapVisible" :visible="mapVisible" class="map" @closeMapDialog = 'closeMapDialog'></MapDialog>
        <broadcastDialog v-if="broadcastVisible" :visible="broadcastVisible" :broadList="broadList.musics" class="broadcastContent" @closeBroadcastDialog = 'closeBroadcastDialog' @saveMusicList = "musicList"></broadcastDialog>
        <ScreenDialog v-if="screenVisible" :visible="screenVisible" :screenContentList="screen.contents" class="screenContent" @closeScreenDialog = 'closeScreenDialog' @saveContent="saveContent"></ScreenDialog>
        <SiteMap v-if="siteMapVisible" :visible="siteMapVisible" :type="transport.type" class="map" @closeMapDialog = 'closeSiteMapDialog' :isDisabled="isDisabled"></SiteMap>
    </div>
</template>

<script>
    import MapDialog from './mapDialog'
    import SiteMap from './siteMapDialog'
    import api from '@/api'
    import broadcastDialog from './broadcastDialog'
    import ScreenDialog from './screenDialog'
    import ScrollContainer from '@/components/ScrollContainer'
    export default {
        name: "person-detail",
        props: ['visible', 'Info','isDisabled','title'],
        data () {
            return {
                tableData:[{}],
                daySelect:[],
                timeSelect: undefined,
                files: [],
                selectLight:[],
                edit: false,
                cropper: false,
                src: '',
                radio: '1',
                isShowMapDialog: false,
                mapVisible: false,
                siteMapVisible:false,
                broadcastVisible:false,
                screenVisible:false,
                broadList: {
                    broadcastSchedule:{
                        id:"",
                        name:"",
                        customizedDays:true,
                        days:[],
                        description:"",
                        time: [],
                        watchTime: []
                    },
                    broadcastIds: [],
                    musics: []
                },
                lamppost:{
                    lightSchedule: {
                        id:"",
                        name:"",
                        customizedDays:true,
                        days:[],
                        description:"",
                        time: [],
                        watchTime: []
                    },
                    lightIds:[]
                },
                label:{},
                security:{
                    inspectionSchedule: {
                        name: '',
                        id: '',
                        customizedDays: '',
                        customizedShift: '',
                        description: '',
                        classTime: [],
                        days: []
                    },
                    iScheduleMaps:[]
                },
                purifier:{
                    cleanSchedule: {
                        name: '',
                        id: '',
                        customizedDays: '',
                        customizedShift: '',
                        description: '',
                        classTime: [],
                        days: [],
                        routeId:''
                    },
                    cleanerIds: [],
                    regionIds: ''
                },
                screen:{
                    ledSchedule:{
                        id:"",
                        name:"",
                        customizedDays:true,
                        days:[],
                        description:"",
                        time: [],
                        watchTime: [],
                    },
                    ledIds: [],
                    contents: []
                },
                toolType:[
                    {
                        label:'车辆',
                        value:'0'
                    },
                    {
                        label:'船只',
                        value:'1'
                    }
                ],
                boats:[],
                cars:[],
                lineOptions:[],
                transport:{
                        id:"",
                        name:"",
                        customizedDays:true,
                        days:[],
                        description:"",
                        time: [],
                        watchTime: [],
                        vDriverMaps:[]
                },
                transObj:{
                    vId:"",
                    dId:""
                },
                options: [],
                associatedRadio:true,
                associatedScreen:false,
                associatedStreet:false,
                route: '',
                file: {},
                definedDay: [new Date(2016, 9, 10), new Date(2016, 9, 12)],
                weekcustom:false,
                weekTime:false,
                filterList:[],
                week: [
                    {type: '周一',id:'1'},
                    {type: '周二',id:'2'},
                    {type: '周三',id:'3'},
                    {type: '周四',id:'4'},
                    {type: '周五',id:'5'},
                    {type: '周六',id:'6'},
                    {type: '周日',id:'7'}
                ],
                dayTime:false,
                classesList:[],
                classes: [
                    {type: '早班',id:'1'},
                    {type: '中班',id:'2'},
                    {type: '晚班',id:'3'}
                ],
                daycustom:false,
                definedTime:[new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
                upload:true,
                importFileUrl: 'http:dtc.com/cpy/add',
                fileList:[],
                uploadText:false,
                personList: [],
                regionIdList: [],
                regionId: [],
                jobList: [],
                jobName: [],
                copyPersonList: [],
                rowNum:0,
                routeName:'',
                gpsOption:[]
            }
        },
        methods: {
            async deleteRouteLine(id){
                await api.transport.isBindScheduleByRoute(id).then(item=>{
                    if(item){
                        this.$message.error("该路线已绑定计划,无法删除！")
                    }else{
                        this.deleteLine(id)
                    }
                })
            },
            async deleteLine(id){
               await api.roat.deleteRoat([id]).then(ite=>{
                    this.lineOptions = this.lineOptions.filter(item=>{
                        return  item.id != id
                    })
                    this.transport.routeId = ""
                    this.$message.error("删除成功！")
                }).catch(err=>{
                    console.log(err)
                })
            },
            vehicleChange(val){
                if(this.transport.type == '0'){
                    this.cars.forEach(item=>{
                        if(item.id == val){
                            item.disabled = true
                        }
                    })
                }else{
                    this.boats.forEach(item=>{
                        if(item.id == val){
                            item.disabled = true
                        }
                    })
                }
            },
            personChange(val){
                this.personList.forEach(item=>{
                    if(item.id == val){
                        item.disabled = true
                    }
                })
                console.log(this.personList)
            },
            gpsChange(val){
                this.gpsOption.forEach(item=>{
                    if(item.id == val){
                        item.disabled = true
                    }
                })
            },
            addSecurityRow(){
                if(this.isDisabled){
                    return
                }
                this.security.iScheduleMaps.push({
                    securityId:'',
                    gpsId:''
                })
            },
            addRow(){
                if(this.isDisabled){
                    return
                }
                this.transport.vDriverMaps.push({
                    vehicleId:'',
                    driverId:''
                })
            },
            deleteSecurityRow(obj){
                if(this.isDisabled){
                    return
                }

                this.security.iScheduleMaps = this.security.iScheduleMaps.filter(item=>{
                    if(item.securityId != obj.securityId){
                        return true
                    }
                })

                if(obj.securityId){
                    this.personList.forEach(item=>{
                        if(item.id == obj.securityId){
                            item.disabled = false
                        }
                    })
                }
                if(obj.gpsId){
                    this.gpsOption.forEach(item=>{
                        if(item.id == obj.gpsId){
                            item.disabled = false
                        }
                    })
                }

            },
            deleteRow(obj){
                if(this.isDisabled){
                    return
                }
                this.transport.vDriverMaps = this.transport.vDriverMaps.filter(item=>{
                    if(item.vehicleId != obj.vehicleId){
                        return true
                    }
                })

                if(this.transport.type == '0'){
                    if(obj.vehicleId){
                        this.cars.forEach(item=>{
                            if(item.id == obj.vehicleId){
                                item.disabled = false
                            }
                        })
                    }
                }else{
                    if(obj.vehicleId){
                        this.boats.forEach(item=>{
                            if(item.id == obj.vehicleId){
                                item.disabled = false
                            }
                        })
                    }
                }
                if(obj.driverId){
                    this.personList.forEach(item=>{
                        if(item.id == obj.driverId){
                            item.disabled = false
                        }
                    })
                }
            },
            async typeChange(val){
                this.transport.type = val;
                this.transport.vDriverMaps = []
                this.$store.commit('TRANSPORT_TYPE', val)
                //清空线路绘制值
                this.transport.routeId = ""
                //类型改变，重新获取数据
                await this.getTransportRoat()
                await this.getAllVehicle(0);  //车辆数据
                await this.getAllVehicle(1);  //船数据
                await this.getSafePerson(); //人员
            },
            selectDays () {
                let route = this.$route.path
                if (route.includes('lamppost')) {
                    this.lamppost.lightSchedule.customizedDays = false
                } else if (route.includes('broadcast')) {
                    this.broadList.broadcastSchedule.customizedDays = false
                } else if (route.includes('screen')) {
                    this.screen.ledSchedule.customizedDays = false
                } else  if (route.includes('purifier')) {
                    this.purifier.cleanSchedule.customizedDays = false
                } else if (route.includes('security')) {
                    this.security.inspectionSchedule.customizedDays = false
                } else if(route.includes('transport')){
                    this.transport.customizedDays = false
                }
            },
            handleCheckChange (data,checked) {//此处形参data不能删除，必须使用第二个形参
                let choseId = checked.checkedKeys.filter(item => {
                    if (!this.regionIdList.includes(item)) {
                        return item
                    }
                })
                let route = this.$route.path
                if (route.includes('broadcast')) {
                    this.broadList.broadcastIds = choseId

                } else if (route.includes('lamppost')){
                    this.lamppost.lightIds = choseId
                } else if (route.includes('screen')) {
                    this.screen.ledIds = choseId
                }
            },
            musicList (list) {
                this.broadList.musics = list
                this.closeBroadcastDialog()
            },
            saveContent (info) {
                this.screen.contents = info
                this.closeScreenDialog()
            },
            closeDialog () {
                this.$emit('closeInfoDialog')
            },
            addNewInfo () {
                let newInfo = {}
                if (this.route.includes('security')) {
                    console.log(!this.security.inspectionSchedule.name, '这个是啥')

                    if(this.security.iScheduleMaps.length == 0){
                        this.$message.error('请至少添加一条人员信息')
                        return
                    }
                    if (!this.security.inspectionSchedule.name || this.security.inspectionSchedule.name === ''){
                        this.$message.error('请输入完整信息')
                        return
                    }
                    if (!this.security.inspectionSchedule.routeId || this.security.inspectionSchedule.routeId === '') {
                        this.$message.error('请选择巡更路线')
                        return
                    }
                    if(this.security.inspectionSchedule.customizedDays === undefined) {
                        if(this.filterList === [] || this.daySelect === [] || this.daySelect === undefined){
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }else {
                        if ((this.filterList.length < 1 && this.daySelect === undefined) || (this.filterList.length < 1 && this.daySelect.length < 1)) {
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }
                    if (this.security.inspectionSchedule.customizedShift === undefined ){
                        if(this.classesList === [] || this.timeSelect === [] || this.timeSelect === undefined) {
                            this.$message.error('请选择开启班次或时间')
                            return
                        }
                    }else {
                        if ((this.classesList.length < 1 && this.timeSelect === undefined) || (this.classesList.length < 1 && this.timeSelect.length < 1)) {
                            this.$message.error('请选择开启班次或时间')
                            return
                        }
                    }
                    if (!this.security.inspectionSchedule.customizedDays) {
                        this.security.inspectionSchedule.days = this.filterList.join()
                    } else {
                        this.security.inspectionSchedule.time = this.daySelect
                    }
                    if (!this.security.inspectionSchedule.customizedShift) {
                        this.security.inspectionSchedule.shifts = this.classesList.join()
                    } else {
                        this.security.inspectionSchedule.classTime = this.timeSelect
                    }
                    newInfo = this.security
                } else if(this.route.includes('broadcast')) {
                    if (!(this.broadList.broadcastSchedule.name && this.broadList.broadcastSchedule.name !== '')) {
                        this.$message.error('请输入完整信息')
                        return
                    }
                    if(this.broadList.broadcastSchedule.customizedDays === undefined) {
                        if(this.filterList === [] || this.daySelect === [] || this.daySelect === undefined){
                            this.$message.error('请选择开启日期')
                            return
                        }
                    } else {
                        if ((this.filterList.length < 1 && this.daySelect === undefined) || (this.filterList.length < 1 && this.daySelect.length < 1)) {
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }
                    if(this.timeSelect === [] || this.timeSelect === undefined) {
                        this.$message.error('请选择开启班次或时间')
                        return
                    }
                    if (!this.broadList.broadcastIds || this.broadList.broadcastIds.length < 1) {
                        this.$message.error('请选择关联的广播')
                        return
                    }
                    if(!(this.broadList.musics && this.broadList.musics)){
                        this.$message.error('请选择需要播放的音频')
                        return
                    }
                    if (!this.broadList.broadcastSchedule.customizedDays) {
                        this.broadList.broadcastSchedule.days = this.filterList.join()
                    }else {
                        this.broadList.broadcastSchedule.time = this.daySelect
                    }
                    this.broadList.broadcastSchedule.watchTime = this.timeSelect
                    newInfo = this.broadList
                } else if(this.route.includes('lamppost')) {
                    if ((!this.lamppost.lightSchedule.name || this.lamppost.lightSchedule.name === '')
                        || (!this.lamppost.lightIds || this.lamppost.lightIds.length < 1)) {
                        this.$message.error('请输入完整信息')
                        return
                    }
                    if(this.lamppost.lightSchedule.customizedDays === undefined) {
                        if(this.filterList === [] || this.daySelect === [] || this.daySelect === undefined){
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }else {
                        if ((this.filterList.length < 1 && this.daySelect === undefined) || (this.filterList.length < 1 && this.daySelect.length < 1)) {
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }
                    if(this.timeSelect === [] || this.timeSelect === undefined) {
                        this.$message.error('请选择开启时间')
                        return
                    }

                    if (!this.lamppost.lightSchedule.customizedDays) {
                        this.lamppost.lightSchedule.days = this.filterList.join()
                    }else {
                        this.lamppost.lightSchedule.time = this.daySelect
                    }
                    this.lamppost.lightSchedule.watchTime = this.timeSelect
                    newInfo = this.lamppost
                } else if(this.route.includes('purifier')) {
                    if (!(this.purifier.cleanSchedule.name && this.purifier.cleanSchedule.name !== '')) {
                        this.$message.error('请输入完整信息')
                        return
                    }
                    if(this.purifier.cleanSchedule.customizedDays === undefined) {
                        if(this.filterList === [] || this.daySelect === [] || this.daySelect === undefined){
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }else {
                        if ((this.filterList.length < 1 && this.daySelect === undefined) || (this.filterList.length < 1 && this.daySelect.length < 1)) {
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }
                    if (this.purifier.cleanSchedule.customizedShift === undefined ){
                        if(this.classesList === [] || this.timeSelect === [] || this.timeSelect === undefined) {
                            this.$message.error('请选择开启班次或时间')
                            return
                        }
                    }else {
                        if ((this.classesList.length < 1 && this.timeSelect === undefined) || (this.classesList.length < 1 && this.timeSelect.length < 1)) {
                            this.$message.error('请选择开启班次或时间')
                            return
                        }
                    }
                    if (this.purifier.cleanerIds && this.purifier.cleanerIds.length < 1) {
                        this.$message.error('请选择保洁人员')
                        return
                    }
                    if (this.purifier.regionIds && this.purifier.regionIds.length < 1) {
                        this.$message.error('请选择保洁的片区')
                        return
                    }
                    if (!this.purifier.cleanSchedule.customizedDays) {
                        this.purifier.cleanSchedule.days = this.filterList.join()
                    }else {
                        this.purifier.cleanSchedule.time = this.daySelect
                    }
                    if (!this.purifier.cleanSchedule.customizedShift) {
                        this.purifier.cleanSchedule.shifts = this.classesList.join()
                    }else {
                        this.purifier.cleanSchedule.classTime = this.timeSelect
                    }
                    newInfo = this.purifier
                    newInfo.regionIds  = this.regionId
                } else if(this.route.includes('screen')) {
                    if (!(this.screen.ledSchedule.name && this.screen.ledSchedule.name !== '')
                        || !(this.screen.ledIds && this.screen.ledIds !== [])) {
                        this.$message.error('请输入完整信息')
                        return
                    }
                    if(this.screen.ledSchedule.customizedDays === undefined) {
                        if(this.filterList === [] || this.daySelect === [] || this.daySelect === undefined){
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }else {
                        if ((this.filterList.length < 1 && this.daySelect === undefined) || (this.filterList.length < 1 && this.daySelect.length < 1)) {
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }
                    if(this.timeSelect === [] || this.timeSelect === undefined) {
                        this.$message.error('请选择开启班次或时间')
                        return
                    }
                    if(!this.screen.contents || this.screen.contents.length < 1){
                        this.$message.error('请选择需要播放的内容')
                        return
                    }
                    if (!this.screen.ledSchedule.customizedDays) {
                        this.screen.ledSchedule.days = this.filterList.join()
                    }else {
                        this.screen.ledSchedule.time= this.daySelect
                    }
                    this.screen.ledSchedule.watchTime= this.timeSelect
                    newInfo = this.screen
                } else if(this.route.includes('transport')) {

                    if(this.transport.vDriverMaps.length == 0){
                        this.$message.error('请至少添加一条车船信息')
                        return
                    }

                    if (!(this.transport.name && this.transport.name !== '')) {
                        this.$message.error('请输入完整信息')
                        return
                    }
                    if(this.transport.customizedDays === undefined) {
                        if(this.filterList === [] || this.daySelect === [] || this.daySelect === undefined){
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }else {
                        if ((this.filterList.length < 1 && this.daySelect === undefined) || (this.filterList.length < 1 && this.daySelect.length < 1)) {
                            this.$message.error('请选择开启日期')
                            return
                        }
                    }
                    if(this.timeSelect === [] || this.timeSelect === undefined) {
                        this.$message.error('请选择开启班次或时间')
                        return
                    }
                    if (!this.transport.customizedDays) {
                        this.transport.days = this.filterList.join()
                        this.transport.customizedDays = false
                    }else {
                        this.transport.time= this.daySelect
                    }
                    this.transport.watchTime= this.timeSelect

                    if(!this.transport.routeId || this.transport.routeId == "") {
                        this.$message.error('请选择路线')
                        return
                    }

                    this.transport.svDriverMaps = this.transport.vDriverMaps.map(item=>{
                        return {
                            vehicleId:item.vehicleId,
                            driverIds : new Array(item.driverId)
                        }
                    })
                    newInfo = this.transport
                }
                newInfo.status = true
                newInfo.checked = false
                if (this.Info.id) {
                    newInfo.id = this.Info.id
                    console.log(newInfo,"返回的数据")
                    this.$emit('fixInfo', newInfo)
                } else {
                    this.$emit('saveNewInfo', newInfo)
                }
            },
            weekCustom(state){
                if (state) {
                    this.filterList = [];
                }
            },
            weekDay(state){
                console.log(this.filterList)
                state = false
            },
            dayCustom(state){
                if (state) {
                    this.classesList = [];
                }
            },
            classesDay(){
                this.dayTime  = false;
                this.daycustom =false;
            },
            showMapDialog () {
                this.mapVisible  = true
            },
            showSiteMap(){
                this.siteMapVisible = true
                this.lineOptions.forEach(item=>{
                    if(this.transport.routeId && item.id == this.transport.routeId){
                        this.routeName = item.name;
                    }
                })
            },
            showBroadcastDialog () {
                this.broadcastVisible  = true
            },
            showScreenDialog () {
                this.screenVisible  = true
            },
            closeMapDialog () {
                this.mapVisible = false
                this.getAllRouteLine()
            },
            closeSiteMapDialog(){
                this.siteMapVisible = false
                this.getTransportRoat()
            },
            closeBroadcastDialog(){
                this.broadcastVisible = false
            },
            closeScreenDialog(){
                this.screenVisible = false
            },
            classFunction (list) {
                // let regionIdList = []
                let arr = []
                let idList = []
                let noRegion = {
                    label: this.$config.regionName,
                    id: 10010,
                    children:[]
                }
                list.forEach(item => {
                    item.label = item.name
                    if (item.regionId) {
                        if (!this.regionIdList.includes(item.regionId)){
                            this.regionIdList.push(item.regionId)
                            let obj = {
                                label: item.regionName,
                                id: item.regionId,
                                children:[]
                            }
                            arr.push(obj)
                        }
                        arr.forEach(item1 => {
                            if (item1.id == item.regionId){
                                if (item1.children.length< 1) {
                                    item1.children.push(item)
                                } else {
                                    item1.children.forEach(item2 => {
                                        if (!idList.includes(item2.id)){
                                            idList.push(item.id)
                                            item1.children.push(item)
                                        }
                                    })
                                }
                            }
                        })
                    } else {
                        this.regionIdList.push(10010)
                        noRegion.children.push(item)
                    }

                })
                if (noRegion.children.length > 0) {
                    arr.push(noRegion)
                }
                this.options = arr
            },
            async getAllLight (){
                await api.light.getAllLight().then(res => {
                    console.log(res, '这是请求回来所有路灯列表')
                     // this.options = res.devices;
                    res.devices.forEach(item => {
                        item.label = item.name
                        item.disabled=this.isDisabled
                    })
                    console.log(res.devices)
                    this.classFunction(res.devices)
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            async getAllBroadcast (){
                await api.broadcast.getAllBroadcast().then(res => {
                    console.log(res, '这是请求回来所有广播列表')
                    // this.options = res.devices;
                    res.devices.forEach(item => {
                        item.label = item.name
                        item.disabled=this.isDisabled
                    })
                    this.classFunction(res.devices)
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            async getAllLed (){
                await api.led.getAllLed().then(res => {
                    console.log(res, '这是请求回来所有LED列表')
                    res.devices.forEach(item => {
                        item.label = item.name
                        item.disabled=this.isDisabled
                    })
                    // this.options = res.devices;
                    this.classFunction(res.devices)
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            async getSafePerson () {
                await api.user.getUserInfo().then(res => {
                    console.log(res, '安保人员')
                    this.personList = res
                    this.copyPersonList = this.personList

                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getJobInfo () {
                await api.user.getUserJobInfo().then(res => {
                    console.log(res, '岗位列表')
                    this.jobList = res
                }).catch(err => {
                    console.log(err, '请求人员失败')
                })
            },
            getJobNameList () {
                if (this.jobName.length === 0) {
                    this.personList = this.copyPersonList
                } else {
                    this.personList = this.copyPersonList.filter(item => {
                        if (this.jobName.includes(item.jobId)) {
                            return item
                        }
                     })
                }
            },
            async getAllRegion () {
              await api.area.getAllRegion().then(res => {
                  console.log(res, '片区请求成功')
                  this.options = res
              }).catch(err => {
                  console.log(err, '请求片区失败')
              })
            },
            async getAllRouteLine () {
                await api.roat.getTransportRoat(1).then(res => {
                    this.options = res
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getTransportRoat(){
                await api.roat.getTransportRoat(this.transport.type == '0'?2:3).then(res => {
                    this.lineOptions = res
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getAllVehicle(id){
                await api.boat.getAllVehicle(id).then(res=>{
                    if(res instanceof Array && res.length>0){
                            if (id === 0) {
                                this.cars = res.map(item=>{
                                    if(item.vehicle){
                                        return {
                                            id : item.vehicle.id,
                                            label : item.vehicle.serialNum
                                        }
                                    }
                                })
                            } else if (id === 1) {
                                this.boats = res.map(item=>{
                                    if(item.vehicle){
                                        return {
                                            id : item.vehicle.id,
                                            label : item.vehicle.serialNum
                                        }
                                    }
                                })
                            }
                    }
                }).catch(err=>{
                    console.log(err)
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
        async created () {
            this.route = this.$route.path
            console.log(this.Info,'  opopop')
            if (this.route.includes('security')) {
                this.getSafePerson()
                this.getGpsOption()
                this.getJobInfo()
                this.getAllRouteLine()
                this.security = this.Info;
                if(!this.security.iScheduleMaps){
                    this.$set(this.security,"iScheduleMaps",[])
                }

                if (this.security.inspectionSchedule.customizedDays === false) {
                    this.filterList = this.security.inspectionSchedule.days;
                } else {
                    this.daySelect = this.security.inspectionSchedule.time
                }
                if (this.security.inspectionSchedule.customizedShift === false) {
                    this.classesList = this.security.inspectionSchedule.shifts
                } else {
                    this.timeSelect = this.security.inspectionSchedule.classTime
                }

                if (this.Info.id) {
                    this.$store.commit('LOCATION_ID', this.Info.id)
                }else {
                    this.$store.commit('LOCATION_ID', '')
                }

            } else if(this.route.includes('broadcast')) {
                this.getAllBroadcast()
                this.broadList = this.Info;
                if(this.broadList.broadcastSchedule.customizedDays === false) {
                    this.filterList = this.broadList.broadcastSchedule.days;
                }else {
                    this.daySelect = this.broadList.broadcastSchedule.time
                }
                this.timeSelect = this.broadList.broadcastSchedule.watchTime
            } else if(this.route.includes('lamppost')) {
                this.getAllLight()
                this.lamppost = this.Info;
                if(this.lamppost.lightSchedule.customizedDays === false) {
                    this.filterList = this.lamppost.lightSchedule.days;
                }else {
                    this.daySelect = this.lamppost.lightSchedule.time
                }
                this.timeSelect = this.lamppost.lightSchedule.watchTime
            } else if(this.route.includes('purifier')) {
                this.getSafePerson()
                this.getJobInfo()
                this.getAllRegion()
                this.purifier = this.Info;
                this.regionId = this.Info.regionIds
                if (this.purifier.cleanSchedule.customizedDays === false) {
                    this.filterList = this.purifier.cleanSchedule.days;
                }else {
                    this.daySelect = this.purifier.cleanSchedule.time
                }
                if (this.purifier.cleanSchedule.customizedShift === false) {
                    this.classesList = this.purifier.cleanSchedule.shifts
                } else {
                    this.timeSelect = this.purifier.cleanSchedule.classTime
                }
            } else if(this.route.includes('screen')) {
                this.getAllLed()
                this.screen = this.Info;
                if(this.screen.ledSchedule.customizedDays === false) {
                    this.filterList = this.screen.ledSchedule.days;
                }else {
                    this.daySelect = this.screen.ledSchedule.time
                }
                this.timeSelect = this.screen.ledSchedule.watchTime
            } else if(this.route.includes('label')){
                this.label = this.Info;
            } else if(this.route.includes('transport')){
                this.transport = this.Info;
                if(!this.transport.routeId){
                    this.$set(this.transport,"routeId", "")
                }
                console.log(this.transport.routeId)
                await this.getJobInfo();
                await this.getTransportRoat();
                await this.getAllVehicle(0);  //车辆数据
                await this.getAllVehicle(1);  //船数据
                await this.getSafePerson(); //人员

                if(this.transport.customizedDays === false) {
                    this.filterList = this.transport.days;
                }else {
                    this.daySelect = this.transport.time
                }
                this.timeSelect = this.transport.watchTime

                if (this.Info.id) {
                    this.$store.commit('LOCATION_ID', this.Info.id)
                    let vArray  = this.transport.svDriverMaps.map(item=>{
                        return {
                            vehicleId:item.vehicleId,
                            driverId:item.driverIds[0]
                        }
                    })
                    this.$set(this.transport,"vDriverMaps", vArray)
                }else {
                    this.$store.commit('LOCATION_ID', '')
                }

                this.$store.commit('TRANSPORT_TYPE', this.Info.type)
            }
        },
        components: {
            MapDialog,
            SiteMap,
            broadcastDialog,
            ScreenDialog,
            ScrollContainer
        },
        watch: {
            // edit(value) {
            //     if (value) {
            //         this.$nextTick(function () {
            //             if (!this.$refs.editImage) {
            //                 return
            //             }
            //             let cropper = new Cropper(this.$refs.editImage, {
            //                 aspectRatio: 1 / 1,
            //                 viewMode: 1,
            //             })
            //             this.cropper = cropper
            //         })
            //     } else {
            //         if (this.cropper) {
            //             this.cropper.destroy()
            //             this.cropper = false
            //         }
            //     }
            // }
        },
    }
</script>
<style lang="scss">
    .dmisDialog{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 100%;
        }
        .el-dialog--center{
            padding: 0;
            /*height: rem(300);*/
        }
        .el-input{
            top:rem(-3)
        }
        .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner{
            background-color:transparent;
        }
        .el-dialog__header{
            padding: rem(10) 0 rem(5) rem(20);
            text-align: left;
            border-bottom: 1px solid #ccc;
        }
        .el-dialog__title{
            font-size: rem(14);
        }
        .el-dialog__headerbtn {
            top: rem(12);
        }
        .el-dialog__body{
            padding: rem(10) rem(20) 0 rem(20);
            box-sizing: border-box;
            font-size: rem(12);
            min-height: rem(150);
            .card {
                max-height: rem(500);
            }
            .el-select{
                width:rem(455);
                top: rem(-3 );
                .el-input--suffix .el-input__inner{
                    border: none;
                }
                .el-tag__close.el-icon-close{
                    top:rem(-2);
                }
            }
            .relateVehicle{
                .el-select{
                    width:rem(150);
                    line-height:rem(30);
                    vertical-align:middle;
                    .el-input__inner{
                        text-align: center;
                    }
                }

            }
            .el-checkbox-group{
                display: inline-block;
                padding-right: rem(10);
            }
            .el-range-editor--mini.el-input__inner{
                width: rem(475);
                border: none;
                padding: 0 rem(10);
                height: rem(24);
                line-height: rem(24);
                .el-range-separator{
                    line-height: rem(24);
                }
            }
            .el-date-editor--timerange{
                border: none;
                float: right;
                width: rem(250);
                padding: 0 rem(10);
                height: rem(24);
                line-height: rem(24);
            }
            .Hardware .el-date-editor--timerange{
                float: inherit;
            }
            .el-date-editor{
                .el-range-input,.el-range-separator{
                    font-size: rem(12);
                }
                .el-range__icon,.el-range-separator{
                    height: rem(24);
                    line-height: rem(24);
                }
            }
            .el-radio{
                .el-radio__input{
                    /*.el-radio__inner{*/
                        /*width: rem(12);*/
                        /*height: rem(12);*/
                    /*}*/
                }
                .el-radio__label{
                    font-size: rem(12);
                }
            }
            .el-tag--mini{
                line-height: rem(21);

            }
            .inputText{
                width: rem(400);
            }
            .upload-demo{
                display: inline-block;
                width: rem(470);
                height: rem(22);
                line-height: rem(22);
                overflow: hidden;
                .el-upload{
                    float: right;
                    .el-button--small, .el-button--small.is-round{
                        padding: rem(4) rem(10);
                    }
                }
                .el-upload-list{
                    display: inline-block;
                    height: rem(24);
                    line-height: rem(24);
                    .el-upload-list__item{
                        margin-top: 0;
                        display: inline-block;
                        width: inherit;
                        margin-right: rem(10);
                        height: rem(24);
                        line-height: rem(24);
                        .el-upload-list__item-name{
                            font-size: rem(12);
                        }
                    }
                }
            }
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
        .el-checkbox__label{
            font-size: rem(12);
            padding-left: rem(7);
        }
        .el-checkbox+.el-checkbox{
            margin-left: rem(10);
        }
        .el-select-dropdown__item span{
            font-size: rem(12);
        }

        .el-input__inner{
           border: none;
            height: rem(30);
            line-height: rem(20);
        }
        .el-tree-node__children{
            /*display: inline-block;*/
            .el-tree-node,.is-focusable {
                /*display: inline-block;*/
                float: left;
            }
        }
        .el-tree-node__label {
            font-size: rem(12);
        }
         .textArea .el-textarea{
            font-size: rem(12);
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .dmisDialog{
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
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                        font-size: rem(12);
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
                    img {
                        display: inline-block;
                        width: rem(20);
                        height: rem(20);
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                    .location{
                        width: rem(470);
                    }
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(3);
                        box-sizing: border-box;
                        border-radius: rem(5);
                        border: 1px solid #ccc;
                        line-height: rem(28);
                        width: rem(490);
                    }
                    i{
                        font-size: rem(16);
                    }
                    span{
                        background: #f0f2f5;
                        color: #909399;
                    }
                    .description{
                        background: transparent;
                        color: #606266;
                    }
                    .dmisTitle{
                        display: inline-block;
                        float: left;
                        background: transparent;
                        color: #606266;
                        line-height: rem(20);
                    }
                    .dmis{
                        display: block;
                        text-align: left;
                        background: transparent;
                        color: #606266;
                        line-height: rem(20);
                    }
                }
                .row{
                    margin-top: rem(8);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(12);
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                        font-size: rem(12);
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
                    img {
                        display: inline-block;
                        width: rem(20);
                        height: rem(20);
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                    .location{
                        width: rem(470);
                    }
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(3);
                        box-sizing: border-box;
                        border-radius: rem(5);
                        border: 1px solid #ccc;
                        line-height: rem(28);
                        width: rem(490);
                    }
                    i{
                        font-size: rem(16);
                    }
                    span{
                        background: #f0f2f5;
                        color: #909399;
                    }
                    .description{
                        background: transparent;
                        color: #606266;
                    }
                    .dmisTitle{
                        display: inline-block;
                        float: left;
                        background: transparent;
                        color: #606266;
                        line-height: rem(20);
                    }
                    .dmis{
                        display: block;
                        text-align: left;
                        background: transparent;
                        color: #606266;
                        line-height: rem(20);
                    }
                }
                .relateVehicle{
                    width: 100%;
                    margin-top: rem(8);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(12);
                    display: flex;
                    flex-direction: row;
                    .dmisTitle{
                        width: 12%;
                        background: transparent;
                        color: #606266;
                    }
                    .dmisContent{
                        flex: 1;
                        background: transparent;
                        color: #606266;
                    }


                    table{
                        width: 100%;
                        border:1px solid #dcdfe6;
                        border-collapse: collapse;
                        min-height: rem(38);
                        line-height:rem(38);
                        thead{
                            tr{
                                .headCar{
                                    width:40%;
                                }
                                .headPerson{
                                    width: 40%;
                                }
                                .headAdd{
                                    width:20%;
                                    cursor: pointer;
                                }
                            }

                        }
                        tbody{
                            display:block;
                            height:rem(150);
                            overflow-y:scroll;
                        }
                        th{
                            border:1px solid #dcdfe6;
                        }
                        td{
                            text-align:center;
                            border:1px solid #dcdfe6;
                        }
                        .vehicle,.person,.gps{
                            width:40%;
                        }
                        .delete{
                            width: 20%;
                            cursor: pointer;
                        }
                    }
                    table thead, tbody tr {
                        display:table;
                        width:100%;
                        table-layout:fixed;
                    }
                    table thead{
                        width: calc( 100% - 1rem)
                    }
                }
                .textArea{
                    border-bottom: none;
                }
                .uploadText{
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-top: 0;
                    padding-top: rem(10);
                    .updataTitle {
                        background: transparent;
                        color: #606266;
                        margin-bottom: rem(5);
                        padding:0;
                    }
                    span{
                        margin-right: rem(10);
                        padding: 0 rem(5);
                        margin-bottom: rem(3);
                        float: left;
                    }
                    button{
                        margin-top: rem(-5);
                        float: right;
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
