<template>
    <div class="alarmRuleDialog">
        <el-dialog
            :visible="visible || ruleVisible"
            :close-on-click-modal = false
            :title="title"
            :before-close="closeDialog"
            width="40%"
            class="dialog edit_Dialog"
            center>
            <div class="alarmRuleContent">
                <!--批量编辑-->
                <div class="alarmContent" v-if="route.includes('alarmcolumn') && isBatchEdit">
                    <p class="name">严重等级：
                        <el-select  v-model="batchEdit.level" size="mini" class="" placeholder="请选择">
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </div>
                <div v-if="(route.includes('alarmcolumn') && !isBatchEdit) || alarmcolumnInfo.alarmTypeId == '2'"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='alarmcolumnInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="status">报&nbsp;&nbsp;警&nbsp;&nbsp;柱：
                        <el-select  v-model="alarmcolumnInfo.relatedDeviceIds" size="mini" class="" :disabled='isReadonly' multiple placeholder="请选择">
                            <el-option
                                v-for="item in policeInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="severityName">严重等级：
                        <el-select  v-model="alarmcolumnInfo.severityId" size="mini" :disabled='isReadonly' class="" placeholder="请选择">
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="deviceScope">调度范围：
                        <el-input type="text" v-model='alarmcolumnInfo.deviceScope' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (设备)
                    </p>
                    <p class="securityScope">调度范围：
                        <el-input type="text"  v-model='alarmcolumnInfo.securityScope' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (安保)
                    </p>
                    <p class="relatedManager">管&nbsp;理&nbsp;&nbsp;者：
                        <el-select v-model="alarmcolumnInfo.relatedManagerIds" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
                            <el-option-group
                                v-for="group in personInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="description">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<br>
                        <el-input type="textarea" :rows='5' :cols="30" placeholder="请输入描述信息" v-model="alarmcolumnInfo.description" :disabled="isReadonly" :maxlength="140"></el-input>
                    </p>
                </div>

                <div class="alarmContent" v-if="route.includes('firefighting') && isBatchEdit">
                    <p class="name">严重等级：
                        <el-select  v-model="batchEdit.level" size="mini" class="" placeholder="请选择">
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </div>
                <div v-if="(route.includes('firefighting') && !isBatchEdit) || firefightingInfo.alarmTypeId == '3'"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='firefightingInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>

                    <p class="severityName">严重等级：
                        <el-select  v-model="firefightingInfo.severityId" size="mini" class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="deviceScope">调度范围：
                        <el-input type="text" v-model='firefightingInfo.deviceScope' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (设备)
                    </p>
                    <p class="securityScope">调度范围：
                        <el-input type="text"  v-model='firefightingInfo.securityScope' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (安保)
                    </p>
                    <p class="relatedManager">管&nbsp;理&nbsp;&nbsp;者：
                        <el-select v-model="firefightingInfo.relatedManagerIds" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
                            <el-option-group
                                v-for="group in personInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="description">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<br>
                        <el-input type="textarea" :rows='5' :cols="30" placeholder="请输入描述信息" v-model="firefightingInfo.description" :disabled="isReadonly" :maxlength="140"></el-input>
                    </p>
                </div>

                <div class="alarmContent" v-if="route.includes('crossborder') && isBatchEdit">
                    <p class="name">严重等级：
                        <el-select  v-model="batchEdit.level" size="mini" class="" placeholder="请选择">
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </div>
                <div v-if="(route.includes('crossborder') && !isBatchEdit) || crossborderInfo.alarmTypeId == '4'"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='crossborderInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>

                    <p class="severityName">严重等级：
                        <el-select  v-model="crossborderInfo.severityId" size="mini" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="deviceScope">调度范围：
                        <el-input type="text" v-model='crossborderInfo.deviceScope' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (设备)
                    </p>
                    <p class="securityScope">调度范围：
                        <el-input type="text"  v-model='crossborderInfo.securityScope' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (安保)
                    </p>
                    <p class="relatedManager">管&nbsp;理&nbsp;&nbsp;者：
                        <el-select v-model="crossborderInfo.relatedManagerIds" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
                            <el-option-group
                                v-for="group in personInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="description">描&nbsp;&nbsp;&nbsp;&nbsp;述：<br>
                        <el-input type="textarea" :rows='5' :cols="30" placeholder="请输入描述信息" v-model="crossborderInfo.description" :disabled="isReadonly" :maxlength="140"></el-input>
                    </p>
                </div>

                <div class="alarmContent" v-if="route.includes('speeding') && isBatchEdit">
                    <p class="name">严重等级：
                        <el-select  v-model="batchEdit.level" size="mini" class="" placeholder="请选择">
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </div>
                <div v-if="(route.includes('speeding') && !isBatchEdit) || speedingInfo.alarmTypeId == '5'"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='speedingInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>

                    <p class="severityName">严重等级：
                        <el-select  v-model="speedingInfo.severityId" size="mini" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="name">交通工具：
                        <el-select  v-model="speedingInfo.relatedVehicleIds" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in vehicleInfo"
                                :key="item.id"
                                :label="item.serialNum"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>

                    <p class="name">限&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;速：
                        <el-input type="text" v-model='speedingInfo.upperThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (千米/小时)
                    </p>

                    <p class="name">超速时长阈值：
                        <el-input type="text" v-model='speedingInfo.extendThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (千米/小时)
                    </p>
                    <p class="deviceScope">调度范围：
                        <el-input type="text" v-model='speedingInfo.deviceScope' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (设备)
                    </p>
                    <p class="securityScope">调度范围：
                        <el-input type="text"  v-model='speedingInfo.securityScope' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (安保)
                    </p>
                    <p class="relatedManager">管&nbsp;理&nbsp;&nbsp;者：
                        <el-select v-model="speedingInfo.relatedManagerIds" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
                            <el-option-group
                                v-for="group in personInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="description">描&nbsp;&nbsp;&nbsp;&nbsp;述：<br>
                        <el-input type="textarea" :rows='5' :cols="30" placeholder="请输入描述信息" v-model="speedingInfo.description" :disabled="isReadonly" :maxlength="140"></el-input>
                    </p>
                </div>

                <div class="alarmContent" v-if="route.includes('offtrack') && isBatchEdit">
                    <p class="name">严重等级：
                        <el-select  v-model="batchEdit.level" size="mini" class="" placeholder="请选择">
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </div>
                <div v-if="(route.includes('offtrack') && !isBatchEdit) || offtrackInfo.alarmTypeId == '6'"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='offtrackInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="relatedSchedule">关联计划：
                        <el-select  v-model="offtrackInfo.relatedScheduleIds" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in patrolInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="severityName">严重等级：
                        <el-select  v-model="offtrackInfo.severityId" size="mini" class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="extendThreshold">偏离时长：
                        <el-input type="text" v-model='offtrackInfo.extendThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (分钟)
                    </p>
                    <p class="upperThreshold">偏离阈值：
                        <el-input type="text"  v-model='offtrackInfo.upperThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (米)
                    </p>
                    <p class="relatedManager">管&nbsp;理&nbsp;&nbsp;者：
                        <el-select v-model="offtrackInfo.relatedManagerIds" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
                            <el-option-group
                                v-for="group in personInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="description">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<br>
                        <el-input type="textarea" :rows='5' :cols="30" placeholder="请输入描述信息" v-model="offtrackInfo.description" :disabled="isReadonly" :maxlength="140"></el-input>

                    </p>
                </div>

                <div class="alarmContent" v-if="route.includes('overlimit') && isBatchEdit">
                    <p class="name">严重等级：
                        <el-select  v-model="batchEdit.level" size="mini" class="" placeholder="请选择">
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </div>
                <div v-if="(route.includes('overlimit') && !isBatchEdit) || overlimitInfo.alarmTypeId == '7'"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='overlimitInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="relatedDevice">关联设备：
                        <el-select  v-model="overlimitInfo.relatedDeviceIds" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option-group
                                v-for="group in overlimitDeviceInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="severityName">严重等级：
                        <el-select  v-model="overlimitInfo.severityId" size="mini" class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="upperThreshold">客流阈值：
                        <el-input type="text" v-model='overlimitInfo.upperThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (人)
                    </p>
                    <p class="relatedManager">管&nbsp;理&nbsp;&nbsp;者：
                        <el-select v-model="overlimitInfo.relatedManagerIds" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
                            <el-option-group
                                v-for="group in personInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="description">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<br>
                        <el-input type="textarea" :rows='5' :cols="30" placeholder="请输入描述信息" v-model="overlimitInfo.description" :disabled="isReadonly" :maxlength="140"></el-input>
                    </p>
                </div>

                <div class="alarmContent" v-if="route.includes('waterlevel') && isBatchEdit">
                    <p class="name">严重等级：
                        <el-select  v-model="batchEdit.level" size="mini" class="" placeholder="请选择">
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </div>
                <div v-if="(route.includes('waterlevel') && !isBatchEdit) || waterlevelInfo.alarmTypeId == '8'"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='waterlevelInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="relatedDevice">关联设备：
                        <el-select  v-model="waterlevelInfo.relatedDeviceIds" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option-group
                                v-for="group in waterlevelDeviceInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="severityName">严重等级：
                        <el-select  v-model="waterlevelInfo.severityId" size="mini" class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="upperThreshold">水位上限：
                        <el-input type="text" v-model='waterlevelInfo.upperThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (米)
                    </p>
                    <p class="lowerThreshold">水位下限：
                        <el-input type="text" v-model='waterlevelInfo.lowerThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (米)
                    </p>
                    <p class="relatedManager">管&nbsp;理&nbsp;&nbsp;者：
                        <el-select v-model="waterlevelInfo.relatedManagerIds" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
                            <el-option-group
                                v-for="group in personInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="description">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<br>
                        <el-input type="textarea" :rows='5' :cols="30" placeholder="请输入描述信息" v-model="waterlevelInfo.description" :disabled="isReadonly" :maxlength="140"></el-input>
                    </p>
                </div>

                <div class="alarmContent" v-if="route.includes('condition') && isBatchEdit">
                    <p class="name">严重等级：
                        <el-select  v-model="batchEdit.level" size="mini" class="" placeholder="请选择">
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                </div>
                <div v-if="(route.includes('condition') && !isBatchEdit) || conditionInfo.alarmTypeId == '9'"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='conditionInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="envType">指标类型：
                        <el-select  v-model="conditionInfo.envTypeId"  size="mini" class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in envType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="envDataSource">来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源：
                        <el-select  v-model="conditionInfo.envDataSource" @change = "sourceChange" size="mini" class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in sourceInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="relatedDevice">关联设备：
                        <el-select  v-model="conditionInfo.relatedDeviceIds" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly || deviceReadOnly'>
                            <el-option-group
                                v-for="group in conditionDeviceInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="severityName">严重等级：
                        <el-select  v-model="conditionInfo.severityId"  size="mini" class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>


                    <p class="upperThreshold" v-if = "!conditionInfo.envTypeId || conditionInfo.envTypeId == '1'">上限阈值：
                        <el-input type="text" v-model='conditionInfo.upperThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (℃)
                    </p>
                    <p class="lowerThreshold" v-if = "!conditionInfo.envTypeId || conditionInfo.envTypeId == '1'">下限阈值：
                        <el-input type="text" v-model='conditionInfo.lowerThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (℃)
                    </p>
                    <p class="upperThreshold" v-if = "conditionInfo.envTypeId == '2'">上限阈值：
                        <el-input type="text" v-model='conditionInfo.upperThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (%)
                    </p>
                    <p class="lowerThreshold" v-if = "conditionInfo.envTypeId == '2'">下限阈值：
                        <el-input type="text" v-model='conditionInfo.lowerThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (%)
                    </p>
                    <p class="upperThreshold" v-if = "conditionInfo.envTypeId == '3'">上限阈值：
                        <el-input type="text" v-model='conditionInfo.upperThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (微克/立方米)
                    </p>
                    <p class="lowerThreshold" v-if = "conditionInfo.envTypeId == '3'">下限阈值：
                        <el-input type="text" v-model='conditionInfo.lowerThreshold' class="inputText" :maxlength="15" :readonly = 'true' :disabled='true'></el-input>
                        (微克/立方米)
                    </p>
                    <p class="upperThreshold" v-if = "conditionInfo.envTypeId == '4'">上限阈值：
                        <el-input type="text" v-model='conditionInfo.upperThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (级)
                    </p>
                    <p class="lowerThreshold" v-if = "conditionInfo.envTypeId == '4'">下限阈值：
                        <el-input type="text" v-model='conditionInfo.lowerThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                        (级)
                    </p>
                    <p class="relatedManager">管&nbsp;理&nbsp;&nbsp;者：
                        <el-select v-model="conditionInfo.relatedManagerIds" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
                            <el-option-group
                                v-for="group in personInfo"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </p>
                    <p class="description">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<br>
                        <el-input type="textarea" :rows='5' :cols="30" placeholder="请输入描述信息" v-model="conditionInfo.description" :disabled="isReadonly" :maxlength="140"></el-input>
                    </p>
                </div>

                <div v-if="!isReadonly" class=""slot="footer" class="dialog-footer cardFooter">
                    <el-button size="mini" class="hold" @click='saveDialog'>保存</el-button>
                    <el-button size="mini" @click = 'closeDialog'>取消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        props: ['visible','ruleVisible','title','isReadonly','isBatchEdit','choseInfos','Info','alarmRuleId'],
        data () {
            return{
                route:'',
                batchEdit:{
                    level:''
                },
                alarmcolumnInfo:{},
                firefightingInfo:{},
                crossborderInfo:{},
                speedingInfo:{},
                offtrackInfo:{},
                overlimitInfo:{},
                waterlevelInfo:{},
                conditionInfo:{},
                policeInfo:[],
                overlimitDeviceInfo:[],
                waterlevelDeviceInfo:[],
                conditionDeviceInfo:[],
                patrolInfo:[],
                levelInfo:[],
                vehicleInfo:[],
                envType:[],
                sourceInfo:[
                    {
                        id:0,
                        name:'外部系统'
                    },
                    {
                        id:1,
                        name:'内部设备'
                    }

                ],
                personInfo:[],
                alarmType:[],
                isShowLoading: false,
                deviceReadOnly:false,
                ruleInfo:{},
            }
        },
        methods: {
            sourceChange(val){
                if(val == 0){
                    this.deviceReadOnly  = true
                    this.conditionInfo.relatedDeviceIds = []
                }else{
                    this.deviceReadOnly  = false
                }
            },
            closeDialog () {
                this.$emit('closeDialog')
            },
            saveDialog(){
                let objArray = [];
                let newInfo = {};
                let integerreg = /^(0|[1-9][0-9]*)$/; //大于等于0正整数
                let floatReg = /^\s*$|\d+(\.\d+)?$/;  // 非负浮点数
                if (this.route.includes('alarmcolumn')){
                    if(this.isBatchEdit){   //批量编辑
                        objArray = this.choseInfos.map((item)=>{
                            var obj = {
                                id: item.id,
                                name: item.name,
                                alarmTypeId: item.alarmTypeId,
                                severityId: item.severityId,
                                isEnabled: item.isEnabled,
                                isDeleted: item.isDeleted,
                                deviceScope:item.deviceScope,
                                securityScope:item.securityScope,
                                upperThreshold:item.upperThreshold,
                                lowerThreshold:item.lowerThreshold,
                                extendThreshold:item.extendThreshold,
                                envTypeId:item.envTypeId,
                                envDataSource:item.envDataSource,
                                description:item.description
                            }
                            if(item.relatedDeviceIds && item.relatedDeviceIds.length > 0){
                                obj.relatedDeviceIds = item.relatedDeviceIds
                            }
                            if(item.relatedManagerIds && item.relatedManagerIds.length > 0){
                                obj.relatedManagerIds = item.relatedManagerIds
                            }
                            if(item.relatedVehicleIds && item.relatedVehicleIds.length > 0){
                                obj.relatedVehicleIds =item.relatedVehicleIds
                            }
                            if(item.relatedScheduleIds && item.relatedScheduleIds.length > 0){
                                obj.relatedScheduleIds = item.relatedScheduleIds
                            }

                            return obj
                        });
                        if(!this.batchEdit.level){
                            this.$message.error('请选择严重性等级')
                            return;
                        }
                        objArray.forEach((item)=>{
                            item.severityId= this.batchEdit.level;
                        })

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看或新增
                        if(!this.alarmcolumnInfo.severityId){
                            this.$message.error('请选择严重性等级！')
                            return;
                        }
                        if(!this.alarmcolumnInfo.name ||this.alarmcolumnInfo.name == ""){
                            this.$message.error('请输入名称！')
                            return;
                        }

                        if( (this.alarmcolumnInfo.deviceScope && !floatReg.test(this.alarmcolumnInfo.deviceScope)) || (this.alarmcolumnInfo.securityScope && !floatReg.test(this.alarmcolumnInfo.securityScope))){
                            this.$message.error('调度范围必须为数字！')
                            return;
                        }

                        if (this.alarmcolumnInfo.id) {  //编辑或查看
                            newInfo = {
                                id: this.alarmcolumnInfo.id,
                                name: this.alarmcolumnInfo.name,
                                alarmTypeId: this.alarmcolumnInfo.alarmTypeId,
                                severityId: this.alarmcolumnInfo.severityId,
                                isEnabled: this.alarmcolumnInfo.isEnabled,
                                isDeleted: this.alarmcolumnInfo.isDeleted,
                                deviceScope:this.alarmcolumnInfo.deviceScope,
                                securityScope:this.alarmcolumnInfo.securityScope,
                                upperThreshold:this.alarmcolumnInfo.upperThreshold,
                                lowerThreshold:this.alarmcolumnInfo.lowerThreshold,
                                extendThreshold:this.alarmcolumnInfo.extendThreshold,
                                envTypeId:this.alarmcolumnInfo.envTypeId,
                                envDataSource:this.alarmcolumnInfo.envDataSource,
                                description:this.alarmcolumnInfo.description
                            }

                            if(this.alarmcolumnInfo.relatedDeviceIds && this.alarmcolumnInfo.relatedDeviceIds.length > 0){
                                newInfo.relatedDeviceIds = this.alarmcolumnInfo.relatedDeviceIds
                            }
                            if(this.alarmcolumnInfo.relatedManagerIds && this.alarmcolumnInfo.relatedManagerIds.length > 0){
                                 newInfo.relatedManagerIds = this.alarmcolumnInfo.relatedManagerIds
                            }
                            if(this.alarmcolumnInfo.relatedVehicleIds && this.alarmcolumnInfo.relatedVehicleIds.length > 0){
                                newInfo.relatedVehicleIds =this.alarmcolumnInfo.relatedVehicleIds
                            }
                            if(this.alarmcolumnInfo.relatedScheduleIds && this.alarmcolumnInfo.relatedScheduleIds.length > 0){
                                newInfo.relatedScheduleIds = this.alarmcolumnInfo.relatedScheduleIds
                            }

                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else { //新增
                            newInfo = this.alarmcolumnInfo;
                            newInfo.isEnabled =true;//默认启用
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }
                else if(this.route.includes('firefighting')){
                    if(this.isBatchEdit){   //批量编辑
                        objArray = this.choseInfos.map((item)=>{
                            var obj = {
                                id: item.id,
                                name: item.name,
                                alarmTypeId: item.alarmTypeId,
                                severityId: item.severityId,
                                isEnabled: item.isEnabled,
                                isDeleted: item.isDeleted,
                                deviceScope:item.deviceScope,
                                securityScope:item.securityScope,
                                upperThreshold:item.upperThreshold,
                                lowerThreshold:item.lowerThreshold,
                                extendThreshold:item.extendThreshold,
                                envTypeId:item.envTypeId,
                                envDataSource:item.envDataSource,
                                description:item.description
                            }
                            if(item.relatedDeviceIds && item.relatedDeviceIds.length > 0){
                                obj.relatedDeviceIds = item.relatedDeviceIds
                            }
                            if(item.relatedManagerIds && item.relatedManagerIds.length > 0){
                                obj.relatedManagerIds = item.relatedManagerIds
                            }
                            if(item.relatedVehicleIds && item.relatedVehicleIds.length > 0){
                                obj.relatedVehicleIds =item.relatedVehicleIds
                            }
                            if(item.relatedScheduleIds && item.relatedScheduleIds.length > 0){
                                obj.relatedScheduleIds = item.relatedScheduleIds
                            }

                            return obj
                        });

                        if(!this.batchEdit.level){
                            this.$message.error('请选择严重性等级')
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                        })

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        if(!this.firefightingInfo.severityId){
                            this.$message.error('请选择严重性等级！')
                            return;
                        }
                        if(!this.firefightingInfo.name ||this.firefightingInfo.name == ""){
                            this.$message.error('请输入名称！')
                            return;
                        }

                        if( (this.firefightingInfo.deviceScope && !floatReg.test(this.firefightingInfo.deviceScope)) || (this.firefightingInfo.securityScope && !floatReg.test(this.firefightingInfo.securityScope))){
                            this.$message.error('调度范围必须为数字！')
                            return;
                        }

                        if (this.firefightingInfo.id) {  //编辑或查看
                                newInfo = {
                                    id: this.firefightingInfo.id,
                                    name: this.firefightingInfo.name,
                                    alarmTypeId: this.firefightingInfo.alarmTypeId,
                                    severityId: this.firefightingInfo.severityId,
                                    isEnabled: this.firefightingInfo.isEnabled,
                                    isDeleted: this.firefightingInfo.isDeleted,
                                    deviceScope:this.firefightingInfo.deviceScope,
                                    securityScope:this.firefightingInfo.securityScope,
                                    upperThreshold:this.firefightingInfo.upperThreshold,
                                    lowerThreshold:this.firefightingInfo.lowerThreshold,
                                    extendThreshold:this.firefightingInfo.extendThreshold,
                                    envTypeId:this.firefightingInfo.envTypeId,
                                    envDataSource:this.firefightingInfo.envDataSource,
                                    description:this.firefightingInfo.description
                                }

                                if(this.firefightingInfo.relatedDeviceIds && this.firefightingInfo.relatedDeviceIds.length > 0){
                                    newInfo.relatedDeviceIds = this.firefightingInfo.relatedDeviceIds
                                }
                                if(this.firefightingInfo.relatedManagerIds && this.firefightingInfo.relatedManagerIds.length > 0){
                                    newInfo.relatedManagerIds = this.firefightingInfo.relatedManagerIds
                                }
                                if(this.firefightingInfo.relatedVehicleIds && this.firefightingInfo.relatedVehicleIds.length > 0){
                                    newInfo.relatedVehicleIds =this.firefightingInfo.relatedVehicleIds
                                }
                                if(this.firefightingInfo.relatedScheduleIds && this.firefightingInfo.relatedScheduleIds.length > 0){
                                    newInfo.relatedScheduleIds = this.firefightingInfo.relatedScheduleIds
                                }
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            newInfo = this.firefightingInfo;
                            newInfo.isEnabled =true;//默认启用
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }
                else if(this.route.includes('crossborder')){
                    if(this.isBatchEdit){   //批量编辑
                        objArray = this.choseInfos.map((item)=>{
                            var obj = {
                                id: item.id,
                                name: item.name,
                                alarmTypeId: item.alarmTypeId,
                                severityId: item.severityId,
                                isEnabled: item.isEnabled,
                                isDeleted: item.isDeleted,
                                deviceScope:item.deviceScope,
                                securityScope:item.securityScope,
                                upperThreshold:item.upperThreshold,
                                lowerThreshold:item.lowerThreshold,
                                extendThreshold:item.extendThreshold,
                                envTypeId:item.envTypeId,
                                envDataSource:item.envDataSource,
                                description:item.description
                            }
                            if(item.relatedDeviceIds && item.relatedDeviceIds.length > 0){
                                obj.relatedDeviceIds = item.relatedDeviceIds
                            }
                            if(item.relatedManagerIds && item.relatedManagerIds.length > 0){
                                obj.relatedManagerIds = item.relatedManagerIds
                            }
                            if(item.relatedVehicleIds && item.relatedVehicleIds.length > 0){
                                obj.relatedVehicleIds =item.relatedVehicleIds
                            }
                            if(item.relatedScheduleIds && item.relatedScheduleIds.length > 0){
                                obj.relatedScheduleIds = item.relatedScheduleIds
                            }

                            return obj
                        });
                        if(!this.batchEdit.level){
                            this.$message.error('请选择严重性等级')
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                        })

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        if(!this.crossborderInfo.severityId){
                            this.$message.error('请选择严重性等级！')
                            return;
                        }
                        if(!this.crossborderInfo.name ||this.crossborderInfo.name == ""){
                            this.$message.error('请输入名称！')
                            return;
                        }
                        if((this.crossborderInfo.deviceScope && !floatReg.test(this.crossborderInfo.deviceScope)) || (this.crossborderInfo.securityScope && !floatReg.test(this.crossborderInfo.securityScope))){
                            this.$message.error('调度范围必须为数字！')
                            return;
                        }

                        if (this.crossborderInfo.id) {
                            newInfo = {
                                id: this.crossborderInfo.id,
                                name: this.crossborderInfo.name,
                                alarmTypeId: this.crossborderInfo.alarmTypeId,
                                severityId: this.crossborderInfo.severityId,
                                isEnabled: this.crossborderInfo.isEnabled,
                                isDeleted: this.crossborderInfo.isDeleted,
                                deviceScope:this.crossborderInfo.deviceScope,
                                securityScope:this.crossborderInfo.securityScope,
                                upperThreshold:this.crossborderInfo.upperThreshold,
                                lowerThreshold:this.crossborderInfo.lowerThreshold,
                                extendThreshold:this.crossborderInfo.extendThreshold,
                                envTypeId:this.crossborderInfo.envTypeId,
                                envDataSource:this.crossborderInfo.envDataSource,
                                description:this.crossborderInfo.description
                            }

                            if(this.crossborderInfo.relatedDeviceIds && this.crossborderInfo.relatedDeviceIds.length > 0){
                                newInfo.relatedDeviceIds = this.crossborderInfo.relatedDeviceIds
                            }
                            if(this.crossborderInfo.relatedManagerIds && this.crossborderInfo.relatedManagerIds.length > 0){
                                newInfo.relatedManagerIds = this.crossborderInfo.relatedManagerIds
                            }
                            if(this.crossborderInfo.relatedVehicleIds && this.crossborderInfo.relatedVehicleIds.length > 0){
                                newInfo.relatedVehicleIds =this.crossborderInfo.relatedVehicleIds
                            }
                            if(this.crossborderInfo.relatedScheduleIds && this.crossborderInfo.relatedScheduleIds.length > 0){
                                newInfo.relatedScheduleIds = this.crossborderInfo.relatedScheduleIds
                            }
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            newInfo = this.crossborderInfo;
                            newInfo.isEnabled =true;//默认启用
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }
                else if(this.route.includes('speeding')){
                    if(this.isBatchEdit){   //批量编辑
                        objArray = this.choseInfos.map((item)=>{
                            var obj = {
                                id: item.id,
                                name: item.name,
                                alarmTypeId: item.alarmTypeId,
                                severityId: item.severityId,
                                isEnabled: item.isEnabled,
                                isDeleted: item.isDeleted,
                                deviceScope:item.deviceScope,
                                securityScope:item.securityScope,
                                upperThreshold:item.upperThreshold,
                                lowerThreshold:item.lowerThreshold,
                                extendThreshold:item.extendThreshold,
                                envTypeId:item.envTypeId,
                                envDataSource:item.envDataSource,
                                description:item.description
                            }
                            if(item.relatedDeviceIds && item.relatedDeviceIds.length > 0){
                                obj.relatedDeviceIds = item.relatedDeviceIds
                            }
                            if(item.relatedManagerIds && item.relatedManagerIds.length > 0){
                                obj.relatedManagerIds = item.relatedManagerIds
                            }
                            if(item.relatedVehicleIds && item.relatedVehicleIds.length > 0){
                                obj.relatedVehicleIds =item.relatedVehicleIds
                            }
                            if(item.relatedScheduleIds && item.relatedScheduleIds.length > 0){
                                obj.relatedScheduleIds = item.relatedScheduleIds
                            }

                            return obj
                        });
                        if(!this.batchEdit.level){
                            this.$message.error('请选择严重性等级')
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                        })

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        if(!this.speedingInfo.severityId){
                            this.$message.error('请选择严重性等级！')
                            return;
                        }
                        if(!this.speedingInfo.name ||this.speedingInfo.name == ""){
                            this.$message.error('请输入名称！')
                            return;
                        }
                        if((this.speedingInfo.deviceScope && !floatReg.test(this.speedingInfo.deviceScope)) || (this.speedingInfo.securityScope && !floatReg.test(this.speedingInfo.securityScope))){
                            this.$message.error('调度范围必须为数字！')
                            return;
                        }
                        if((this.speedingInfo.upperThreshold && !floatReg.test(this.speedingInfo.upperThreshold)) || (this.speedingInfo.extendThreshold && !floatReg.test(this.speedingInfo.extendThreshold))){
                            this.$message.error('限速及超速时长必须为数字！')
                            return;
                        }

                        if (this.speedingInfo.id) {
                            newInfo = {
                                id: this.speedingInfo.id,
                                name: this.speedingInfo.name,
                                alarmTypeId: this.speedingInfo.alarmTypeId,
                                severityId: this.speedingInfo.severityId,
                                isEnabled: this.speedingInfo.isEnabled,
                                isDeleted: this.speedingInfo.isDeleted,
                                deviceScope:this.speedingInfo.deviceScope,
                                securityScope:this.speedingInfo.securityScope,
                                upperThreshold:this.speedingInfo.upperThreshold,
                                lowerThreshold:this.speedingInfo.lowerThreshold,
                                extendThreshold:this.speedingInfo.extendThreshold,
                                envTypeId:this.speedingInfo.envTypeId,
                                envDataSource:this.speedingInfo.envDataSource,
                                description:this.speedingInfo.description
                            }

                            if(this.speedingInfo.relatedDeviceIds && this.speedingInfo.relatedDeviceIds.length > 0){
                                newInfo.relatedDeviceIds = this.crossborderInfo.relatedDeviceIds
                            }
                            if(this.speedingInfo.relatedManagerIds && this.speedingInfo.relatedManagerIds.length > 0){
                                newInfo.relatedManagerIds = this.speedingInfo.relatedManagerIds
                            }
                            if(this.speedingInfo.relatedVehicleIds && this.speedingInfo.relatedVehicleIds.length > 0){
                                newInfo.relatedVehicleIds =this.speedingInfo.relatedVehicleIds
                            }
                            if(this.speedingInfo.relatedScheduleIds && this.speedingInfo.relatedScheduleIds.length > 0){
                                newInfo.relatedScheduleIds = this.speedingInfo.relatedScheduleIds
                            }
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            newInfo = this.speedingInfo;
                            newInfo.isEnabled =true;//默认启用
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }
                else if(this.route.includes('offtrack')){
                    if(this.isBatchEdit){   //批量编辑
                        objArray = this.choseInfos.map((item)=>{
                            var obj = {
                                id: item.id,
                                name: item.name,
                                alarmTypeId: item.alarmTypeId,
                                severityId: item.severityId,
                                isEnabled: item.isEnabled,
                                isDeleted: item.isDeleted,
                                deviceScope:item.deviceScope,
                                securityScope:item.securityScope,
                                upperThreshold:item.upperThreshold,
                                lowerThreshold:item.lowerThreshold,
                                extendThreshold:item.extendThreshold,
                                envTypeId:item.envTypeId,
                                envDataSource:item.envDataSource,
                                description:item.description
                            }
                            if(item.relatedDeviceIds && item.relatedDeviceIds.length > 0){
                                obj.relatedDeviceIds = item.relatedDeviceIds
                            }
                            if(item.relatedManagerIds && item.relatedManagerIds.length > 0){
                                obj.relatedManagerIds = item.relatedManagerIds
                            }
                            if(item.relatedVehicleIds && item.relatedVehicleIds.length > 0){
                                obj.relatedVehicleIds =item.relatedVehicleIds
                            }
                            if(item.relatedScheduleIds && item.relatedScheduleIds.length > 0){
                                obj.relatedScheduleIds = item.relatedScheduleIds
                            }

                            return obj
                        });
                        if(!this.batchEdit.level){
                            this.$message.error('请选择严重性等级')
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                        })

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        if(!this.offtrackInfo.severityId){
                            this.$message.error('请选择严重性等级！')
                            return;
                        }
                        if(!this.offtrackInfo.name ||this.offtrackInfo.name == ""){
                            this.$message.error('请输入名称！')
                            return;
                        }
                        if(this.offtrackInfo.extendThreshold && !floatReg.test(this.offtrackInfo.extendThreshold)){
                            this.$message.error('偏离时长必须为数字！')
                            return;
                        }

                        if(this.offtrackInfo.upperThreshold && !floatReg.test(this.offtrackInfo.upperThreshold)){
                            this.$message.error('偏离阈值必须为数字！')
                            return;
                        }

                        if (this.offtrackInfo.id) {
                            newInfo = {
                                id: this.offtrackInfo.id,
                                name: this.offtrackInfo.name,
                                alarmTypeId: this.offtrackInfo.alarmTypeId,
                                severityId: this.offtrackInfo.severityId,
                                isEnabled: this.offtrackInfo.isEnabled,
                                isDeleted: this.offtrackInfo.isDeleted,
                                deviceScope:this.offtrackInfo.deviceScope,
                                securityScope:this.offtrackInfo.securityScope,
                                upperThreshold:this.offtrackInfo.upperThreshold,
                                lowerThreshold:this.offtrackInfo.lowerThreshold,
                                extendThreshold:this.offtrackInfo.extendThreshold,
                                envTypeId:this.offtrackInfo.envTypeId,
                                envDataSource:this.offtrackInfo.envDataSource,
                                description:this.offtrackInfo.description
                            }

                            if(this.offtrackInfo.relatedDeviceIds && this.offtrackInfo.relatedDeviceIds.length > 0){
                                newInfo.relatedDeviceIds = this.offtrackInfo.relatedDeviceIds
                            }
                            if(this.offtrackInfo.relatedManagerIds && this.offtrackInfo.relatedManagerIds.length > 0){
                                newInfo.relatedManagerIds = this.offtrackInfo.relatedManagerIds
                            }
                            if(this.offtrackInfo.relatedVehicleIds && this.offtrackInfo.relatedVehicleIds.length > 0){
                                newInfo.relatedVehicleIds =this.offtrackInfo.relatedVehicleIds
                            }
                            if(this.offtrackInfo.relatedScheduleIds && this.offtrackInfo.relatedScheduleIds.length > 0){
                                newInfo.relatedScheduleIds = this.offtrackInfo.relatedScheduleIds
                            }
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            newInfo = this.offtrackInfo;
                            newInfo.isEnabled =true;//默认启用
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }
                else if(this.route.includes('overlimit')){
                    if(this.isBatchEdit){   //批量编辑
                        objArray = this.choseInfos.map((item)=>{
                            var obj = {
                                id: item.id,
                                name: item.name,
                                alarmTypeId: item.alarmTypeId,
                                severityId: item.severityId,
                                isEnabled: item.isEnabled,
                                isDeleted: item.isDeleted,
                                deviceScope:item.deviceScope,
                                securityScope:item.securityScope,
                                upperThreshold:item.upperThreshold,
                                lowerThreshold:item.lowerThreshold,
                                extendThreshold:item.extendThreshold,
                                envTypeId:item.envTypeId,
                                envDataSource:item.envDataSource,
                                description:item.description
                            }
                            if(item.relatedDeviceIds && item.relatedDeviceIds.length > 0){
                                obj.relatedDeviceIds = item.relatedDeviceIds
                            }
                            if(item.relatedManagerIds && item.relatedManagerIds.length > 0){
                                obj.relatedManagerIds = item.relatedManagerIds
                            }
                            if(item.relatedVehicleIds && item.relatedVehicleIds.length > 0){
                                obj.relatedVehicleIds =item.relatedVehicleIds
                            }
                            if(item.relatedScheduleIds && item.relatedScheduleIds.length > 0){
                                obj.relatedScheduleIds = item.relatedScheduleIds
                            }
                            return obj
                        });

                        if(!this.batchEdit.level){
                            this.$message.error('请选择严重性等级')
                            return;
                        }

                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                        })
                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        if(!this.overlimitInfo.severityId){
                            this.$message.error('请选择严重性等级！')
                            return;
                        }
                        if(!this.overlimitInfo.name ||newInfo.name == ""){
                            this.$message.error('请输入名称！')
                            return;
                        }
                        if(this.overlimitInfo.upperThreshold && !floatReg.test(this.overlimitInfo.upperThreshold)){
                            this.$message.error('客流阈值必须为数字！')
                            return;
                        }

                        if (this.overlimitInfo.id) {
                            newInfo = {
                                id: this.overlimitInfo.id,
                                name: this.overlimitInfo.name,
                                alarmTypeId: this.overlimitInfo.alarmTypeId,
                                severityId: this.overlimitInfo.severityId,
                                isEnabled: this.overlimitInfo.isEnabled,
                                isDeleted: this.overlimitInfo.isDeleted,
                                deviceScope:this.overlimitInfo.deviceScope,
                                securityScope:this.overlimitInfo.securityScope,
                                upperThreshold:this.overlimitInfo.upperThreshold,
                                lowerThreshold:this.overlimitInfo.lowerThreshold,
                                extendThreshold:this.overlimitInfo.extendThreshold,
                                envTypeId:this.overlimitInfo.envTypeId,
                                envDataSource:this.overlimitInfo.envDataSource,
                                description:this.overlimitInfo.description
                            }

                            if(this.overlimitInfo.relatedDeviceIds && this.overlimitInfo.relatedDeviceIds.length > 0){
                                newInfo.relatedDeviceIds = this.overlimitInfo.relatedDeviceIds
                            }
                            if(this.overlimitInfo.relatedManagerIds && this.overlimitInfo.relatedManagerIds.length > 0){
                                newInfo.relatedManagerIds = this.overlimitInfo.relatedManagerIds
                            }
                            if(this.overlimitInfo.relatedVehicleIds && this.overlimitInfo.relatedVehicleIds.length > 0){
                                newInfo.relatedVehicleIds =this.overlimitInfo.relatedVehicleIds
                            }
                            if(this.overlimitInfo.relatedScheduleIds && this.overlimitInfo.relatedScheduleIds.length > 0){
                                newInfo.relatedScheduleIds = this.overlimitInfo.relatedScheduleIds
                            }
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            newInfo = this.overlimitInfo;
                            newInfo.isEnabled =true;//默认启用
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }
                else if(this.route.includes('waterlevel')){
                    if(this.isBatchEdit){   //批量编辑
                        objArray = this.choseInfos.map((item)=>{
                            var obj = {
                                id: item.id,
                                name: item.name,
                                alarmTypeId: item.alarmTypeId,
                                severityId: item.severityId,
                                isEnabled: item.isEnabled,
                                isDeleted: item.isDeleted,
                                deviceScope:item.deviceScope,
                                securityScope:item.securityScope,
                                upperThreshold:item.upperThreshold,
                                lowerThreshold:item.lowerThreshold,
                                extendThreshold:item.extendThreshold,
                                envTypeId:item.envTypeId,
                                envDataSource:item.envDataSource,
                                description:item.description
                            }
                            if(item.relatedDeviceIds && item.relatedDeviceIds.length > 0){
                                obj.relatedDeviceIds = item.relatedDeviceIds
                            }
                            if(item.relatedManagerIds && item.relatedManagerIds.length > 0){
                                obj.relatedManagerIds = item.relatedManagerIds
                            }
                            if(item.relatedVehicleIds && item.relatedVehicleIds.length > 0){
                                obj.relatedVehicleIds =item.relatedVehicleIds
                            }
                            if(item.relatedScheduleIds && item.relatedScheduleIds.length > 0){
                                obj.relatedScheduleIds = item.relatedScheduleIds
                            }
                            return obj
                        });
                        if(!this.batchEdit.level){
                            this.$message.error('请选择严重性等级')
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                        })

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        if(!this.waterlevelInfo.severityId){
                            this.$message.error('请选择严重性等级！')
                            return;
                        }
                        if(!this.waterlevelInfo.name ||newInfo.name == ""){
                            this.$message.error('请输入名称！')
                            return;
                        }
                        if(this.waterlevelInfo.lowerThreshold && !floatReg.test(this.waterlevelInfo.lowerThreshold)){
                            this.$message.error('水位下限必须为数字！')
                            return;
                        }
                        if(this.waterlevelInfo.upperThreshold && !floatReg.test(this.waterlevelInfo.upperThreshold)){
                            this.$message.error('水位上限必须为数字！')
                            return;
                        }

                        if (this.waterlevelInfo.id) {
                            newInfo = {
                                id: this.waterlevelInfo.id,
                                name: this.waterlevelInfo.name,
                                alarmTypeId: this.waterlevelInfo.alarmTypeId,
                                severityId: this.waterlevelInfo.severityId,
                                isEnabled: this.waterlevelInfo.isEnabled,
                                isDeleted: this.waterlevelInfo.isDeleted,
                                deviceScope:this.waterlevelInfo.deviceScope,
                                securityScope:this.waterlevelInfo.securityScope,
                                upperThreshold:this.waterlevelInfo.upperThreshold,
                                lowerThreshold:this.waterlevelInfo.lowerThreshold,
                                extendThreshold:this.waterlevelInfo.extendThreshold,
                                envTypeId:this.waterlevelInfo.envTypeId,
                                envDataSource:this.waterlevelInfo.envDataSource,
                                description:this.waterlevelInfo.description
                            }

                            if(this.waterlevelInfo.relatedDeviceIds && this.waterlevelInfo.relatedDeviceIds.length > 0){
                                newInfo.relatedDeviceIds = this.waterlevelInfo.relatedDeviceIds
                            }
                            if(this.waterlevelInfo.relatedManagerIds && this.waterlevelInfo.relatedManagerIds.length > 0){
                                newInfo.relatedManagerIds = this.waterlevelInfo.relatedManagerIds
                            }
                            if(this.waterlevelInfo.relatedVehicleIds && this.waterlevelInfo.relatedVehicleIds.length > 0){
                                newInfo.relatedVehicleIds =this.waterlevelInfo.relatedVehicleIds
                            }
                            if(this.waterlevelInfo.relatedScheduleIds && this.waterlevelInfo.relatedScheduleIds.length > 0){
                                newInfo.relatedScheduleIds = this.waterlevelInfo.relatedScheduleIds
                            }
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            newInfo = this.waterlevelInfo;
                            newInfo.isEnabled =true;//默认启用
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }
                else if(this.route.includes('condition')){
                    if(this.isBatchEdit){   //批量编辑
                        objArray = this.choseInfos.map((item)=>{
                            var obj = {
                                id: item.id,
                                name: item.name,
                                alarmTypeId: item.alarmTypeId,
                                severityId: item.severityId,
                                isEnabled: item.isEnabled,
                                isDeleted: item.isDeleted,
                                deviceScope:item.deviceScope,
                                securityScope:item.securityScope,
                                upperThreshold:item.upperThreshold,
                                lowerThreshold:item.lowerThreshold,
                                extendThreshold:item.extendThreshold,
                                envTypeId:item.envTypeId,
                                envDataSource:item.envDataSource,
                                description:item.description
                            }
                            if(item.relatedDeviceIds && item.relatedDeviceIds.length > 0){
                                obj.relatedDeviceIds = item.relatedDeviceIds
                            }
                            if(item.relatedManagerIds && item.relatedManagerIds.length > 0){
                                obj.relatedManagerIds = item.relatedManagerIds
                            }
                            if(item.relatedVehicleIds && item.relatedVehicleIds.length > 0){
                                obj.relatedVehicleIds =item.relatedVehicleIds
                            }
                            if(item.relatedScheduleIds && item.relatedScheduleIds.length > 0){
                                obj.relatedScheduleIds = item.relatedScheduleIds
                            }
                            return obj
                        });
                        if(!this.batchEdit.level){
                            this.$message.error('请选择严重性等级')
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                        })

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        if(!this.conditionInfo.severityId){
                            this.$message.error('请选择严重性等级！')
                            return;
                        }
                        if(!this.conditionInfo.name ||this.conditionInfo.name == ""){
                            this.$message.error('请输入名称！')
                            return;
                        }

                        if(this.conditionInfo.lowerThreshold && !floatReg.test(this.conditionInfo.lowerThreshold)){
                            this.$message.error('阈值下限必须为数字！')
                            return;
                        }

                        if(this.conditionInfo.upperThreshold && !floatReg.test(this.conditionInfo.upperThreshold)){
                            this.$message.error('阈值上限必须为数字！')
                            return;
                        }

                        if (this.conditionInfo.id) {
                            newInfo = {
                                id: this.conditionInfo.id,
                                name: this.conditionInfo.name,
                                alarmTypeId: this.conditionInfo.alarmTypeId,
                                severityId: this.conditionInfo.severityId,
                                isEnabled: this.conditionInfo.isEnabled,
                                isDeleted: this.conditionInfo.isDeleted,
                                deviceScope:this.conditionInfo.deviceScope,
                                securityScope:this.conditionInfo.securityScope,
                                upperThreshold:this.conditionInfo.upperThreshold,
                                lowerThreshold:this.conditionInfo.lowerThreshold,
                                extendThreshold:this.conditionInfo.extendThreshold,
                                envTypeId:this.conditionInfo.envTypeId,
                                envDataSource:this.conditionInfo.envDataSource,
                                description:this.conditionInfo.description
                            }

                            if(this.conditionInfo.relatedDeviceIds && this.conditionInfo.relatedDeviceIds.length > 0 && this.conditionInfo.envDataSource == 1){
                                newInfo.relatedDeviceIds = this.conditionInfo.relatedDeviceIds
                            }
                            if(this.conditionInfo.relatedManagerIds && this.conditionInfo.relatedManagerIds.length > 0){
                                newInfo.relatedManagerIds = this.conditionInfo.relatedManagerIds
                            }
                            if(this.conditionInfo.relatedVehicleIds && this.conditionInfo.relatedVehicleIds.length > 0){
                                newInfo.relatedVehicleIds =this.conditionInfo.relatedVehicleIds
                            }
                            if(this.conditionInfo.relatedScheduleIds && this.conditionInfo.relatedScheduleIds.length > 0){
                                newInfo.relatedScheduleIds = this.conditionInfo.relatedScheduleIds
                            }
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            newInfo = this.conditionInfo;
                            newInfo.isEnabled =true;//默认启用
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }

            },
            async getSeverityType(){
                await api.alarm.getSeverityType().then(res => {
                    this.levelInfo = res
                }).catch(err => {
                })
            },
            async getEnvType(){
                await api.alarm.getEnvType().then(res => {
                    this.envType = res
                }).catch(err => {
                })
            },
            async getPersonInfo(){
                // let personInfo = [];
                let r1 = await this.getPerson(3);
                let r2 = await this.getPerson(8);

                if(r1.length > 0){
                    this.personInfo.push(this.addPersonn(r1));
                }
                if(r2.length > 0){
                    this.personInfo.push(this.addPersonn(r2));
                }
            },
            addPersonn(array){
                let temp = array.map((item)=>{
                    return {
                        id: item.personBean.id,
                        name:item.personBean.name,
                        phone:item.personBean.phone
                    }
                })
                return {
                    label:array[0].jobName,
                    options:temp
                }
            },
            async getPerson(type){
                let personInfo = [];
                await api.person.getJobPerson(type).then(res => {
                    personInfo = res;
                }).catch(err => {
                })
                return personInfo;
            },
            async getPoliceDevice(){
                await api.police.getAllPolice().then(res => {
                    this.policeInfo = res.devices;
                }).catch(err => {
                })
            },
            async getSchedules(){
                await api.patrol.getAllPatrol().then(res => {
                    this.patrolInfo = res.map((item)=>{
                        return item.inspectionSchedule;
                    });
                }).catch(err => {
                })
            },
            async getGateDevice(){
                let gateInfo = {};
                await api.gate.getAllGate().then(res => {
                    gateInfo.label = "闸机";
                    gateInfo.options = res.devices;
                }).catch(err => {
                })
                return gateInfo;
            },
            async getCameraDevice(){
                let cameraInfo = {};
                await api.camera.getAllCamera().then(res => {
                    cameraInfo.label = "摄像头";
                    cameraInfo.options = res.devices;
                }).catch(err => {
                })
                return cameraInfo;
            },

            async getMonitorDevice(){
                let conditionInfo = {};
                await api.monitor.getAllMonitor().then(res => {
                    conditionInfo.label = "环境";
                    conditionInfo.options = res.devices;
                }).catch(err => {
                })
                return conditionInfo;
            },
            async getOverlimitDevice(){
                let r1 = await this.getCameraDevice();
                let r2 = await this.getGateDevice();

                this.overlimitDeviceInfo.push(r1)
                this.overlimitDeviceInfo.push(r2)

            },
            async getWaterlevelDevice(){
                let r1 = await this.getMonitorDevice();
                this.waterlevelDeviceInfo.push(r1);
            },
            async getConditionDevice(){
                let r1 = await this.getMonitorDevice();
                this.conditionDeviceInfo.push(r1);
            },
            async getAlarmType(){
                await api.alarm.getAllAlarmTypes().then(res => {
                    this.alarmType = res;
                }).catch(err => {
                })
            },
            async getVehicle(){
                await api.boat.getAllBoat().then(res=>{
                    this.vehicleInfo = res.map(item=>{
                        return {
                            id: item.vehicle.id,
                            serialNum: item.vehicle.serialNum
                        }
                    })
                }).catch(err=>{
                })
            },
            getAlarmRuleById(id){
                return new Promise((resolve,reject)=>{
                    api.alarm.getAlarmRuleById(id).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(reject)
                    })
                })
            },
            initData(){
                //人员
                this.getPersonInfo();
                //关联设备（报警柱）  --报警柱
                this.getPoliceDevice();
                //关联巡检计划  --偏离轨迹
                this.getSchedules();
                // 关联设备（闸机，摄像头）  --客流量
                this.getOverlimitDevice();
                // 关联设备（环境传感器）  --水位
                this.getWaterlevelDevice();
                // 关联设备（环境传感器）  --环境
                this.getConditionDevice();
                //获取严重性等级
                this.getSeverityType();
                //获取告警规则类型
                this.getAlarmType();
                //获取指标类型  --环境
                this.getEnvType();

                this.getVehicle();
            },
            initEventDialog(){
                //调查询rule接口
                 this.getAlarmRuleById(this.alarmRuleId).then(res=>{
                     this.ruleInfo = res[0]
                     console.log(this.ruleInfo);
                     switch (this.ruleInfo.alarmTypeId) {
                         case '2':
                             this.alarmcolumnInfo = this.ruleInfo;
                             this.title = '查看报警柱告警规则'
                             break
                         case '3':
                             this.firefightingInfo = this.ruleInfo;
                             this.title = '查看消防告警规则'
                             break
                         case '4':
                             this.crossborderInfo = this.ruleInfo;
                             this.title = '查看越界告警规则'
                             break
                         case '5':
                             this.speedingInfo = this.ruleInfo;
                             this.title = '查看超速告警规则'
                             break
                         case '6':
                             this.offtrackInfo = this.ruleInfo;
                             this.title = '查看偏离轨迹告警规则'
                             break
                         case '7':
                             this.overlimitInfo = this.ruleInfo;
                             this.title = '查看客流量告警规则'
                             break
                         case '8':
                             this.waterlevelInfo = this.ruleInfo;
                             this.title = '查看水位告警规则'
                             break
                         case '9':
                             this.conditionInfo = this.ruleInfo;
                             this.title = '查看环境告警规则'
                             break
                     }
                     console.log(this.alarmcolumnInfo);
                 });
            },
            initRuleDialog(){
                this.route = this.$route.path
                if (this.route.includes('alarmcolumn')) {
                    this.alarmcolumnInfo = JSON.parse(JSON.stringify(this.Info));
                    if(!this.alarmcolumnInfo.id){   //如果为新增，严重等级默认为高
                        this.alarmcolumnInfo.severityId = '1';
                    }
                } else if(this.route.includes('firefighting')) {
                    // this.getAllBroadcast()
                    this.firefightingInfo = JSON.parse(JSON.stringify(this.Info));
                    if(!this.firefightingInfo.id){
                        this.firefightingInfo.severityId = '1';
                    }
                } else if(this.route.includes('crossborder')) {
                    // this.getAllLight()
                    this.crossborderInfo = JSON.parse(JSON.stringify(this.Info));
                    if(!this.crossborderInfo.id){
                        this.crossborderInfo.severityId = '1'
                    }

                } else if(this.route.includes('speeding')) {
                    this.speedingInfo = JSON.parse(JSON.stringify(this.Info));

                } else if(this.route.includes('offtrack')) {
                    this.offtrackInfo = JSON.parse(JSON.stringify(this.Info));
                    if(!this.offtrackInfo.id){
                        this.offtrackInfo.severityId = '3';
                    }
                } else if(this.route.includes('overlimit')){
                    this.overlimitInfo = JSON.parse(JSON.stringify(this.Info));
                    if(!this.overlimitInfo.id){
                        this.overlimitInfo.severityId = '1';
                    }
                } else if(this.route.includes('waterlevel')){
                    this.waterlevelInfo = JSON.parse(JSON.stringify(this.Info));
                    if(!this.waterlevelInfo.id){
                        this.waterlevelInfo.severityId = '2';
                    }
                } else if(this.route.includes('condition')){
                    this.conditionInfo = JSON.parse(JSON.stringify(this.Info));
                    if(!this.conditionInfo.id){
                        this.conditionInfo.severityId = '3';
                    }
                    //来源为外部系统，关联设备不可用
                    if(this.conditionInfo.envDataSource == "0"){
                        this.deviceReadOnly = true;
                    }
                }
            }
        },
        async created () {
            this.initData();
            if(this.alarmRuleId){
                this.initEventDialog();
            }else{
                this.initRuleDialog();
            }
        }
    }
</script>

<style lang="scss">
    .alarmRuleDialog{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 100%;
        }
        .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner{
            background-color:transparent;
        }
        .el-dialog--center{
            padding: 0;
            /*height: rem(300);*/
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
            .el-select{
                width:rem(475);
                .el-input--suffix .el-input__inner{
                    border: none;
                }
                .el-tag__close.el-icon-close{
                    top:rem(-2);
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
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .alarmRuleDialog{
        .alarmRuleContent{
            width: 100%;
            height: 100%;
            .alarmContent {
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
                }
                .uploadText{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    height: rem(30);
                    margin-top: 0;
                    padding-top: rem(10);
                    padding-right:rem(85);
                    span{
                        margin-right: rem(10);
                    }
                    button{
                        float: right;
                        margin-right: rem(-80);
                        margin-top: rem(-5);
                    }
                }
            }
            .cardFooter {
                width: 100%;
                padding: rem(5) rem(10);
                box-sizing: border-box;
                text-align: right;
                border-top: 1px solid #ccc;
                .el-button{
                    padding: 0;
                    padding: rem(4) rem(6);
                }
            }

        }
    }
</style>
