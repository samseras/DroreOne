<template>
    <div class="alarmRuleDialog">
        <el-dialog
            :visible="visible"
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
                <div v-if="route.includes('alarmcolumn') && !isBatchEdit"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='alarmcolumnInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="status">报&nbsp;&nbsp;警&nbsp;&nbsp;柱：
                        <el-select  v-model="alarmcolumnInfo.relatedDevices" size="mini" class="" :disabled='isReadonly' multiple placeholder="请选择">
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
                        <el-select v-model="alarmcolumnInfo.relatedManager" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
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
                        <textarea name="" v-model='alarmcolumnInfo.description' cols="30"
                                  rows="5" placeholder="请输入描述信息" :disabled='isReadonly'></textarea >
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
                <div v-if="route.includes('firefighting') && !isBatchEdit"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='firefightingInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>

                    <p class="severityName">严重等级：
                        <el-select  v-model="firefightingInfo.severityId" @change="ownerChange" size="mini" class="" placeholder="请选择" :disabled='isReadonly'>
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
                        <el-select v-model="firefightingInfo.relatedManager" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
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
                        <textarea name="" v-model='firefightingInfo.description' cols="30"
                                  rows="5" placeholder="请输入描述信息" :disabled='isReadonly'></textarea >
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
                <div v-if="route.includes('crossborder') && !isBatchEdit"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='crossborderInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>

                    <p class="severityName">严重等级：
                        <el-select  v-model="crossborderInfo.severityId" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
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
                        <el-select v-model="crossborderInfo.relatedManager" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
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
                        <textarea name="" v-model='crossborderInfo.description' cols="30"
                                  rows="5" placeholder="请输入描述信息" :disabled='isReadonly'></textarea >
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
                <div v-if="route.includes('offtrack') && !isBatchEdit"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='offtrackInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="relatedSchedule">关联计划：
                        <el-select  v-model="offtrackInfo.relatedSchedule" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="severityName">严重等级：
                        <el-select  v-model="offtrackInfo.severityId" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
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
                        <el-select v-model="offtrackInfo.relatedManager" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
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
                        <textarea name="" v-model='offtrackInfo.description' cols="30"
                                  rows="5" placeholder="请输入描述信息" :disabled='isReadonly'></textarea >
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
                <div v-if="route.includes('overlimit') && !isBatchEdit"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='overlimitInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="relatedDevice">关联设备：
                        <el-select  v-model="overlimitInfo.relatedDevice" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="severityName">严重等级：
                        <el-select  v-model="overlimitInfo.severityId" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
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
                        <el-select v-model="overlimitInfo.relatedManager" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
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
                        <textarea name="" v-model='overlimitInfo.description' cols="30"
                                  rows="5" placeholder="请输入描述信息" :disabled='isReadonly'></textarea >
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
                <div v-if="route.includes('waterlevel') && !isBatchEdit"  class="alarmContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        <el-input type="text" v-model='waterlevelInfo.name' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="relatedDevice">关联设备：
                        <el-select  v-model="waterlevelInfo.relatedDevice" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="severityName">严重等级：
                        <el-select  v-model="waterlevelInfo.severityId" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
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
                        <el-select v-model="waterlevelInfo.relatedManager" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
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
                        <textarea name="" v-model='waterlevelInfo.description' cols="30"
                                  rows="5" placeholder="请输入描述信息" :disabled='isReadonly'></textarea >
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
                <div v-if="route.includes('condition') && !isBatchEdit"  class="alarmContent">
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
                        <el-select  v-model="conditionInfo.envDataSource" size="mini" class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in source"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="relatedDevice">关联设备：
                        <el-select  v-model="conditionInfo.relatedDevice" size="mini" multiple class="" placeholder="请选择" :disabled='isReadonly'>
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
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
                    <p class="upperThreshold">阈值上限：
                        <el-input type="text" v-model='conditionInfo.upperThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="lowerThreshold">阈值下限：
                        <el-input type="text" v-model='conditionInfo.lowerThreshold' class="inputText" :maxlength="15" :disabled='isReadonly'></el-input>
                    </p>
                    <p class="relatedManager">管&nbsp;理&nbsp;&nbsp;者：
                        <el-select v-model="conditionInfo.relatedManager" size="mini" multiple placeholder="请选择" :disabled='isReadonly'>
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
                        <textarea name="" v-model='conditionInfo.description' cols="30"
                                  rows="5" placeholder="请输入描述信息" :disabled='isReadonly'></textarea >
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
        props: ['visible','title','isReadonly','isBatchEdit','choseInfos','Info'],
        data () {
            return{
                route:'',
                batchEdit:{
                    level:''
                },
                alarmcolumnInfo:{
                    id:'',
                    batchEdit:{
                        batchEdit:''
                    },
                    name:'',
                    relatedDevices:[],
                    severityId:'',
                    severityName:'',
                    deviceScope:'',
                    securityScope:'',
                    relatedManager:'',
                    relatedManagerName:'',
                    description:'',
                    isEnabled:false
                },
                firefightingInfo:{
                    id:'',
                    name:'',
                    severityId:'',
                    severityName:'',
                    deviceScope:'',
                    securityScope:'',
                    relatedManager:[],
                    description:'',
                    isEnabled:false
                },
                crossborderInfo:{
                    id:'',
                    name:'',
                    severityId:'',
                    severityName:'',
                    deviceScope:'',
                    securityScope:'',
                    relatedManager:[],
                    description:'',
                    isEnabled:false
                },
                speedingInfo:{

                },
                offtrackInfo:{
                    id:'',
                    name:'',
                    severityId:'',
                    severityName:'',
                    relatedSchedule:'',
                    extendThreshold:'',
                    upperThreshold:'',
                    relatedManager:[],
                    description:'',
                    isEnabled:false
                },
                overlimitInfo:{
                    id:'',
                    name:'',
                    relatedDevice:[],
                    severityId:'',
                    severityName:'',
                    upperThreshold:'',
                    relatedManager:[],
                    description:'',
                    isEnabled:false
                },
                waterlevelInfo:{
                    id:'',
                    name:'',
                    relatedDevice:[],
                    severityId:'',
                    severityName:'',
                    upperThreshold:'',
                    lowerThreshold:'',
                    relatedManager:[],
                    description:'',
                    isEnabled:false
                },
                conditionInfo:{
                    id:'',
                    name:'',
                    envTypeId:'',
                    envTypeName:'',
                    envDataSource:'',
                    relatedDevice:[],
                    severityId:'',
                    severityName:'',
                    upperThreshold:'',
                    lowerThreshold:'',
                    relatedManager:[],
                    description:'',
                    isEnabled:false
                },
                policeInfo:[],
                levelInfo:[
                    {
                        id:'1',
                        name:'高'
                    },
                    {
                        id:'2',
                        name:'中'
                    },{
                        id:'3',
                        name:'低'
                    }
                ],
                envType:[
                    {
                        id:'1',
                        name:'PM2.5'
                    },
                    {
                        id:'2',
                        name:'温度'
                    },
                    {
                        id:'3',
                        name:'湿度'
                    },
                    {
                        id:'4',
                        name:'风力'
                    }
                ],
                source:[
                    {
                        id:'0',
                        name:'外部系统'
                    },
                    {
                        id:'1',
                        name:'内部设备'
                    }

                ],
                ownerInfo:[
                    {
                        id:'0',
                        name:'aaa'
                    },
                    {
                        id:'1',
                        name:'bbb'
                    },{
                        id:'2',
                        name:'ccc'
                    }
                ],
                personInfo:[],
                isShowLoading: false
            }
        },
        methods: {
            closeDialog () {
                this.$emit('closeDialog')
            },
            severityId2Name(severityId){
                let name = '';
                this.levelInfo.forEach((item)=>{
                    if(severityId  == item.id){
                        name = item.name;
                    }
                })
                return name;
            },
            saveDialog(){
                let objArray = [];
                let newInfo = {};
                if (this.route.includes('alarmcolumn')){
                    if(this.isBatchEdit){   //批量编辑
                        console.log(this.choseInfos);

                        objArray = this.choseInfos;
                        if(!this.batchEdit.level){
                            return;
                        }
                        objArray.forEach((item)=>{
                            item.severityId = this.batchEdit.level;
                            item.severityName = this.severityId2Name(item.severityId)
                        })

                        console.log(objArray)

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看或新增
                        console.log(this.alarmcolumnInfo);
                        newInfo = this.alarmcolumnInfo;
                        newInfo.severityName = this.severityId2Name(newInfo.severityId)

                        newInfo.relatedManager = newInfo.relatedManager.join(",")
                        console.log(newInfo,"返回的数据")
                        if (newInfo.id) {  //编辑或查看
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else { //新增
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }else if(this.route.includes('firefighting')){
                    if(this.isBatchEdit){   //批量编辑
                        console.log(this.choseInfos);

                        objArray = this.choseInfos;
                        if(!this.batchEdit.level){
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                            item.severityName = this.severityId2Name(item.severityId)
                        })

                        console.log(objArray)

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        console.log(this.firefightingInfo);
                        newInfo = this.firefightingInfo;
                        newInfo.severityName = this.severityId2Name(newInfo.severityId)
                        newInfo.relatedManager = newInfo.relatedManager.join(",")
                        if (newInfo.id) {
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }else if(this.route.includes('crossborder')){
                    if(this.isBatchEdit){   //批量编辑
                        console.log(this.choseInfos);

                        objArray = this.choseInfos;
                        if(!this.batchEdit.level){
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                            item.severityName = this.severityId2Name(item.severityId)
                        })

                        console.log(objArray)
                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        console.log(this.crossborderInfo);
                        newInfo = this.crossborderInfo;
                        newInfo.severityName = this.severityId2Name(newInfo.severityId)
                        newInfo.relatedManager = newInfo.relatedManager.join(",")
                        if (newInfo.id) {
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }else if(this.route.includes('offtrack')){
                    if(this.isBatchEdit){   //批量编辑
                        console.log(this.choseInfos);

                        objArray = this.choseInfos;
                        if(!this.batchEdit.level){
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                            item.severityName = this.severityId2Name(item.severityId)
                        })

                        console.log(objArray)

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        console.log(this.offtrackInfo);
                        newInfo = this.offtrackInfo;
                        newInfo.severityName = this.severityId2Name(newInfo.severityId)
                        newInfo.relatedManager = newInfo.relatedManager.join(",")
                        if (newInfo.id) {
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }else if(this.route.includes('overlimit')){
                    if(this.isBatchEdit){   //批量编辑
                        console.log(this.choseInfos);

                        objArray = this.choseInfos;
                        if(!this.batchEdit.level){
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                            item.severityName = this.severityId2Name(item.severityId)
                        })

                        console.log(objArray)

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        console.log(this.overlimitInfo);
                        newInfo = this.overlimitInfo;
                        newInfo.severityName = this.severityId2Name(newInfo.severityId)
                        newInfo.relatedManager = newInfo.relatedManager.join(",")
                        if (newInfo.id) {
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }else if(this.route.includes('waterlevel')){
                    if(this.isBatchEdit){   //批量编辑
                        console.log(this.choseInfos);

                        objArray = this.choseInfos;
                        if(!this.batchEdit.level){
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                            item.severityName = this.severityId2Name(item.severityId)
                        })

                        console.log(objArray)

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        console.log(this.waterlevelInfo);
                        newInfo = this.waterlevelInfo;
                        newInfo.severityName = this.severityId2Name(newInfo.severityId)
                        newInfo.relatedManager = newInfo.relatedManager.join(",")
                        if (newInfo.id) {
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }else if(this.route.includes('condition')){
                    if(this.isBatchEdit){   //批量编辑
                        console.log(this.choseInfos);

                        objArray = this.choseInfos;
                        if(!this.batchEdit.level){
                            return;
                        }
                        objArray.forEach((item,index)=>{
                            item.severityId = this.batchEdit.level;
                            item.severityName = this.severityId2Name(item.severityId)
                        })

                        console.log(objArray)

                        this.$emit('saveEditInfo',objArray);

                    }else{  //单个编辑或查看
                        console.log(this.conditionInfo);
                        newInfo = this.conditionInfo;
                        newInfo.severityName = this.severityId2Name(newInfo.severityId)
                        newInfo.relatedManager = newInfo.relatedManager.join(",")
                        this.envType.forEach((item)=>{
                            if(newInfo.envTypeId == item.id){
                                newInfo.envTypeName = item.name;
                            }
                        })

                        this.source.forEach((item)=>{
                            if(newInfo.envDataSource == item.id){
                                newInfo.envDataSourceName = item.name;
                            }
                        })

                        if (newInfo.id) {
                            objArray.push(newInfo)
                            this.$emit('saveEditInfo',objArray)
                        } else {
                            this.$emit('saveInfo',newInfo)
                        }
                    }
                }

            },
            async getSeverityType(){
                await api.alarm.getSeverityType().then(res => {
                    console.log(res, '查询严重等级成功')
                    this.levelInfo = res
                }).catch(err => {
                    console.log(err, '查询严重等级失败')
                })
            },
            async getEnvType(){
                await api.alarm.getEnvType().then(res => {
                    console.log(res, '查询环境类型成功')
                    this.envType = res
                }).catch(err => {
                    console.log(err, '查询环境类型失败')
                })
            },
            async getPersonInfo(){
                // let personInfo = [];
                let r1 = await this.getPerson(3);
                let r2 = await this.getPerson(8);

                console.log(r1,'severity');
                console.log(r2,'manager');
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
                    console.log(res, '请求成功')
                    personInfo = res;
                }).catch(err => {
                    console.log(err, '请求失败')
                })
                return personInfo;
            },
            async getPoliceDevice(){
                await api.police.getAllPolice().then(res => {
                    console.log(res, '请求成功')
                    this.policeInfo = res.devices;
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            init(){
                //获取人员数据
                this.getPersonInfo();
                //获取报警柱设备数据
                this.getPoliceDevice();
            }


        },
        async created () {
            this.init();
            this.route = this.$route.path
            console.log(this.Info,'  Info')
            if (this.route.includes('alarmcolumn')) {
                this.alarmcolumnInfo = this.Info;
            } else if(this.route.includes('firefighting')) {
                // this.getAllBroadcast()
                this.firefightingInfo = this.Info;

                this.timeSelect = this.broadList.broadcastSchedule.watchTime
            } else if(this.route.includes('crossborder')) {
                // this.getAllLight()
                this.crossborderInfo = this.Info;

            } else if(this.route.includes('speeding')) {
                // this.getAllPurifierPerson()
                // this.getAllRegion()
                this.speedingInfo = this.Info;

            } else if(this.route.includes('offtrack')) {
                this.offtrackInfo = this.Info;
            } else if(this.route.includes('overlimit')){
                this.overlimitInfo = this.Info;
            } else if(this.route.includes('waterlevel')){
                this.waterlevelInfo = this.Info;
            } else if(this.route.includes('condition')){
                this.conditionInfo = this.Info;
                // this.getEnvType();
            }
        },
        watch:{

        },
        components : {
             // 'a-player': VueAplayer
        },
         mounted () {
            //异步加载，先加载出player再使用
            //  this.init();
            // this.init();
            // console.log(this.$refs.aplayer, '这是啥')
            // let aplayer = this.$refs.aplayer;
            // // aplayer.play();
            // console.log(aplayer.musicList, '这是当前的music')
            //  this.playMusicList.push(this.currentMusic);
            // console.log(this.playMusicList)
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
