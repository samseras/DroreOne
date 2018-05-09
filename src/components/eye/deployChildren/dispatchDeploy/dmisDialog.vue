<template>
    <div class="dmisDialog">
        <el-dialog
            :title="title"
            :visible="visible"
            :before-close="closeDialog"
            width="600px"
            class="dialog echatDialog"
            center>
            <div class="card">
                <!--巡更路线-->
                <div class="personCardContent" v-if="route.includes('security')">
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：<input type="text"v-model="security.inspectionSchedule.name"class="inputText"></p>
                    <p class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：
                        <el-checkbox-group v-model = "filterList" @change="security.inspectionSchedule.customizedDays = false">
                            <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="weekCustom(security.inspectionSchedule.customizedDays)" v-model="security.inspectionSchedule.customizedDays"></el-checkbox>
                    </p>
                    <p class="time" v-if="security.inspectionSchedule.customizedDays">选择时间：
                        <el-date-picker
                            v-model="security.inspectionSchedule.time"
                            size ="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                    <p class="time">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 次：
                        <el-checkbox-group v-model="classesList" @change="security.inspectionSchedule.customizedShift = false">
                            <el-checkbox v-for="item in classes" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="dayCustom(security.inspectionSchedule.customizedShift)" v-model="security.inspectionSchedule.customizedShift"></el-checkbox>
                        <el-time-picker v-if="security.inspectionSchedule.customizedShift"
                            is-range
                            v-model="security.inspectionSchedule.classTime"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </p>
                    <p class="name">人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 员：
                        <el-select v-model="security.securityIds" size="mini" class="" multiple placeholder="请选择">
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
                    <p class="phoneNum">线路绘制：
                        <!--<input type="text"v-model="security.location" class="location">-->
                        <el-select v-model="security.inspectionSchedule.routeId" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <i class="el-icon-location-outline" @click="showMapDialog"></i>
                    </p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="security.inspectionSchedule.description" cols="30"
                                                                               rows="5" placeholder="请输入描述信息" style="background: #fafafa"></textarea>
                    </p>
                </div>
                <!--广播-->
                <div class="personCardContent" v-if="route.includes('broadcast')">
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：<input type="text"v-model="broadList.broadcastSchedule.name" class="inputText"></p>
                    <p class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：
                        <el-checkbox-group v-model="filterList" @change="broadList.broadcastSchedule.customizedDays = false">
                            <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="weekCustom(broadList.broadcastSchedule.customizedDays)" v-model="broadList.broadcastSchedule.customizedDays"></el-checkbox>
                    </p>
                    <p class="time" v-if="broadList.broadcastSchedule.customizedDays">选择时间：
                        <el-date-picker
                            v-model="broadList.broadcastSchedule.time"
                            size ="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                    <p class="Hardware">执行时间：
                        <el-time-picker is-range
                                        v-model="broadList.broadcastSchedule.watchTime"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                        </el-time-picker>
                    </p>
                    <p class="name">关联广播：
                        <el-select v-model="broadList.broadcastIds" size="mini" multiple placeholder="请选择">
                            <el-option
                                v-for="item in options"
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
                    <p class="uploadText">定义内容：
                        <!--<input type="text"v-model="broadList.musicIds" class="inputText">-->
                        <span v-for="item in broadList.musics" :key="item.id">{{item.title}}</span>
                        <el-button slot="trigger" size="small" type="primary" @click="showBroadcastDialog" :disabled='isDisabled'>曲目编辑</el-button>
                    </p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="broadList.broadcastSchedule.description" cols="30"
                                                                               rows="5" placeholder="请输入描述信息"></textarea>
                    </p>
                </div>
                <!--路灯-->
                <div class="personCardContent" v-if="route.includes('lamppost')">
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：<input type="text" v-model="lamppost.lightSchedule.name" class="inputText"></p>
                    <p class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：
                        <el-checkbox-group v-model="filterList" @change="lamppost.lightSchedule.customizedDays = false">
                            <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="weekCustom(lamppost.lightSchedule.customizedDays)" v-model="lamppost.lightSchedule.customizedDays"></el-checkbox>
                    </p>
                    <p class="time" v-if="lamppost.lightSchedule.customizedDays">选择时间：
                        <el-date-picker
                            v-model="lamppost.lightSchedule.time"
                            size ="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                    <p class="Hardware">执行时间：
                        <el-time-picker is-range
                                        v-model="lamppost.lightSchedule.watchTime"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                        </el-time-picker>
                    </p>
                    <p class="name">关联路灯：
                        <el-select v-model="lamppost.lightIds" size="mini" multiple placeholder="请选择">
                            <el-option
                                v-for="light in options"
                                :label="light.name"
                                :key="light.id"
                                :value="light.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="lamppost.lightSchedule.description" cols="30"
                                                                               rows="5" placeholder="请输入描述信息"></textarea>
                    </p>
                </div>
                <!--保洁-->
                <div class="personCardContent" v-if="route.includes('purifier')">
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：<input type="text"v-model="purifier.cleanSchedule.name"class="inputText"></p>
                    <p class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：
                        <el-checkbox-group v-model="filterList" @change="purifier.cleanSchedule.customizedDays = false">
                            <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="weekCustom(purifier.cleanSchedule.customizedDays)" v-model="purifier.cleanSchedule.customizedDays"></el-checkbox>
                    </p>
                    <p class="time" v-if="purifier.cleanSchedule.customizedDays">选择时间：
                        <el-date-picker
                            v-model="purifier.cleanSchedule.time"
                            size ="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                    <p class="time">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 次：
                        <el-checkbox-group v-model="classesList" @change="purifier.cleanSchedule.customizedShift = false">
                            <el-checkbox v-for="item in classes" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="dayCustom(purifier.cleanSchedule.customizedShift)" v-model="purifier.cleanSchedule.customizedShift"></el-checkbox>
                        <el-time-picker v-if="purifier.cleanSchedule.customizedShift"
                                        is-range
                                        v-model="purifier.cleanSchedule.classTime"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                        </el-time-picker>
                    </p>
                    <p class="name">人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 员：
                        <el-select v-model="purifier.cleanerIds" size="mini" class="" multiple placeholder="请选择">
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
                    <p class="name">片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 区：
                        <el-select v-model="purifier.regionIds" size="mini" class="" multiple placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="purifier.cleanSchedule.description" cols="30"
                                                                               rows="5" placeholder="请输入描述信息" style="background: #fafafa"></textarea>
                    </p>
                </div>
                <!--LED-->
                <div class="personCardContent" v-if="route.includes('screen')">
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：<input type="text"v-model="screen.ledSchedule.name" class="inputText"></p>
                    <p class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：
                        <el-checkbox-group v-model="filterList" @change="screen.ledSchedule.customizedDays = false">
                            <el-checkbox v-for="item in week" :label="item.id" :key="item.id">{{item.type}}</el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="weekCustom(screen.ledSchedule.customizedDays)" v-model="screen.ledSchedule.customizedDays"></el-checkbox>
                    </p>
                    <p class="time" v-if="screen.ledSchedule.customizedDays">选择时间：
                        <el-date-picker
                            v-model="screen.ledSchedule.time"
                            size ="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                    <p class="Hardware">执行时间：
                        <el-time-picker is-range
                                        v-model="screen.ledSchedule.watchTime"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                        </el-time-picker>
                    </p>
                    <p class="name">关联大屏：
                        <el-select v-model="screen.ledIds" size="mini" multiple placeholder="请选择">
                            <el-option
                                v-for="item in options"
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
                    <p class="uploadText">定义内容：
                        <span v-for="item in screen.contents" :key="item.id">{{item.content}}</span>
                        <el-button slot="trigger" size="small" type="primary" @click = "showScreenDialog" :disabled='isDisabled'>定义内容</el-button>
                    </p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="screen.ledSchedule.description" cols="30"
                                                                               rows="5" placeholder="请输入描述信息"></textarea>
                    </p>
                </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="addNewInfo" :disabled='isDisabled'>保存</el-button>
                <el-button size="mini" @click = 'closeDialog' :disabled='isDisabled'>取消</el-button>
            </div>
        </el-dialog>
        <MapDialog v-if="mapVisible" :visible="mapVisible" class="map" @closeMapDialog = 'closeMapDialog'></MapDialog>
        <broadcastDialog v-if="broadcastVisible" :visible="broadcastVisible" class="broadcastContent" @closeBroadcastDialog = 'closeBroadcastDialog' @saveMusicList = "musicList"></broadcastDialog>
        <ScreenDialog v-if="screenVisible" :visible="screenVisible" class="screenContent" @closeScreenDialog = 'closeScreenDialog' @saveContent="saveContent"></ScreenDialog>
    </div>
</template>

<script>
    import MapDialog from './mapDialog'
    import api from '@/api'
    import moment from 'moment'
    import broadcastDialog from './broadcastDialog'
    import ScreenDialog from './screenDialog'
    import Cropper from 'cropperjs'
    import FileUpload from 'vue-upload-component'
    export default {
        name: "person-detail",
        props: ['visible', 'Info','isDisabled','title'],
        data () {
            return {
                files: [],
                selectLight:[],
                edit: false,
                cropper: false,
                src: '',
                radio: '1',
                isShowMapDialog: false,
                mapVisible: false,
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
                    securityIds: []
                },
                purifier:{
                    cleanSchedule: {
                        name: '',
                        id: '',
                        customizedDays: '',
                        customizedShift: '',
                        description: '',
                        classTime: [],
                        days: []
                    },
                    cleanerIds: [],
                    regionIds: []
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
                options: [
                ],
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
                personList: []
            }
        },
        methods: {
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
                    if (!this.security.inspectionSchedule.customizedDays) {
                        this.security.inspectionSchedule.days = this.filterList.join()
                    }
                    if (!this.security.inspectionSchedule.customizedShift) {
                        this.security.inspectionSchedule.shifts = this.classesList.join()
                    }
                    newInfo = this.security
                } else if(this.route.includes('broadcast')) {
                    if (!this.broadList.broadcastSchedule.customizedDays) {
                        this.broadList.broadcastSchedule.days = this.filterList.join()
                    }
                    newInfo = this.broadList
                } else if(this.route.includes('lamppost')) {
                    if (!this.lamppost.lightSchedule.customizedDays) {
                        this.lamppost.lightSchedule.days = this.filterList.join()
                    }
                    newInfo = this.lamppost
                } else if(this.route.includes('purifier')) {
                    if (!this.purifier.cleanSchedule.customizedDays) {
                        this.purifier.cleanSchedule.days = this.filterList.join()
                    }
                    if (!this.purifier.cleanSchedule.customizedShift) {
                        this.purifier.cleanSchedule.shifts = this.classesList.join()
                    }
                    newInfo = this.purifier
                } else if(this.route.includes('screen')) {
                    if (!this.screen.ledSchedule.customizedDays) {
                        this.screen.ledSchedule.days = this.filterList.join()
                    }
                    newInfo = this.screen
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
                this.closeDialog()
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
            showBroadcastDialog () {
                this.broadcastVisible  = true
            },
            showScreenDialog () {
                this.screenVisible  = true
            },
            closeMapDialog () {
                this.mapVisible = false
            },
            closeBroadcastDialog(){
                this.broadcastVisible = false
            },
            closeScreenDialog(){
                this.screenVisible = false
            },
            async getAllLight (){
                await api.light.getAllLight().then(res => {
                    console.log(res, '这是请求回来所有路灯列表')
                     this.options = res.devices;
                    console.log(res.devices)
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            async getAllBroadcast (){
                await api.broadcast.getAllBroadcast().then(res => {
                    console.log(res, '这是请求回来所有广播列表')
                    this.options = res.devices;
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            async getAllLed (){
                await api.led.getAllLed().then(res => {
                    console.log(res, '这是请求回来所有LED列表')
                    this.options = res.devices;
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.isShowLoading = false
                })
            },
            async getSafePerson () {
                let jobId = 3
                await api.person.getJobPerson(jobId).then(res => {
                    console.log(res, '安保人员')
                    this.personList = res;
                    this.personList.forEach(item => {
                        item.id = item.personBean.id
                        item.name = item.personBean.name
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            async getAllPurifierPerson () {
                let jobId = 4;
                await api.person.getJobPerson(jobId).then(res => {
                    console.log(res, '保洁人员')
                    this.personList = res
                    this.personList.forEach(item => {
                        item.id = item.personBean.id
                        item.name = item.personBean.name
                    })
                }).catch(err => {
                    console.log(err, '请求人员失败')
                })
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
                await api.roat.getAllRoat().then(res => {
                    console.log(res, '请求成功')
                    this.options = res
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            }
        },
        async created () {
            this.route = this.$route.path
            console.log(this.Info,'  opopop')
            if (this.route.includes('security')) {
                await this.getSafePerson()
                await this.getAllRouteLine()
                this.security = this.Info;
                if (this.security.inspectionSchedule.customizedDays === false) {
                    this.filterList = this.security.inspectionSchedule.days;
                }
                if (this.security.inspectionSchedule.customizedShift === false) {
                    this.classesList = this.security.inspectionSchedule.shifts
                }
            } else if(this.route.includes('broadcast')) {
                this.getAllBroadcast()
                this.broadList = this.Info;
                if(this.broadList.broadcastSchedule.customizedDays === false) {
                    this.filterList = this.broadList.broadcastSchedule.days;
                }
            } else if(this.route.includes('lamppost')) {
                this.getAllLight()
                this.lamppost = this.Info;
                if(this.lamppost.lightSchedule.customizedDays === false) {
                    this.filterList = this.lamppost.lightSchedule.days;
                }
            } else if(this.route.includes('purifier')) {
                this.getAllPurifierPerson()
                this.getAllRegion()
                this.purifier = this.Info;
                if (this.purifier.cleanSchedule.customizedDays === false) {
                    this.filterList = this.purifier.cleanSchedule.days;
                }
                if (this.purifier.cleanSchedule.customizedShift === false) {
                    this.classesList = this.purifier.cleanSchedule.shifts
                }
            } else if(this.route.includes('screen')) {
                this.getAllLed()
                this.screen = this.Info;
                if(this.screen.ledSchedule.customizedDays === false) {
                    this.filterList = this.screen.ledSchedule.days;
                }
            } else if(this.route.includes('label')){
                this.label = this.Info;
            }
        },
        components: {
            FileUpload,
            MapDialog,
            broadcastDialog,
            ScreenDialog
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
<style lang="scss">

</style>
