<template>
    <div class="detailDialog">
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
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：<input type="text"v-model="person.sex"class="inputText"></p>
                    <p class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：
                        <el-checkbox-group v-model="filterList" @change="weekDay">
                            <el-checkbox v-for="item in week" :label="item.type"></el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="weekCustom" v-model="weekcustom"></el-checkbox>
                    </p>
                    <p class="time" v-if="weekTime">选择时间：
                        <el-date-picker
                            v-model="definedDay"
                            size ="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                    <p class="time">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 次：
                        <el-checkbox-group v-model="classesList" @change="classesDay">
                            <el-checkbox v-for="item in classes" :label="item.type"></el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="dayCustom" v-model="daycustom"></el-checkbox>
                        <el-time-picker v-if="dayTime"
                            is-range
                            v-model="definedTime"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </p>
                    <p class="name">人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 员：
                        <el-select v-model="person.people" size="mini" class="" multiple placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.type"
                                :label="item.type"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="idNum">重复调度：
                        <el-radio v-model="radio" label="1">是</el-radio>
                        <el-radio v-model="radio" label="0">否</el-radio>
                    </p>
                    <p class="phoneNum">线路绘制：<input type="text"v-model="hardware.location" class="location" @click="showMapDialog"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="person.describe" cols="30"
                                                                               rows="5" placeholder="请输入描述信息" style="background: #fafafa"></textarea>
                    </p>
                </div>
                <!--广播-->
                <div class="personCardContent" v-if="route.includes('broadcast')">
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：<input type="text"v-model="hardware.sex" class="inputText"></p>
                    <p class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：
                        <el-checkbox-group v-model="filterList" @change="weekDay">
                            <el-checkbox v-for="item in week" :label="item.type"></el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="weekCustom" v-model="weekcustom"></el-checkbox>
                    </p>
                    <p class="time" v-if="weekTime">选择时间：
                        <el-date-picker
                            v-model="definedDay"
                            size ="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                    <p class="Hardware">执行时间：
                        <el-time-picker is-range
                                        v-model="definedTime"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                        </el-time-picker>
                    </p>
                    <p class="name">关联广播：
                        <el-select v-model="hardware.associatedradio" size="mini" multiple placeholder="请选择">
                            <el-option
                                v-for="item in broadcast"
                                :key="item.type"
                                :label="item.type"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="idNum">重复调度：
                        <el-radio v-model="radio" label="1">是</el-radio>
                        <el-radio v-model="radio" label="0">否</el-radio>
                    </p>
                    <!--<p class="upload" v-if="upload">定义曲风：-->
                        <!--<el-upload-->
                            <!--class="upload-demo"-->
                            <!--ref="upload"-->
                            <!--:limit="2"-->
                            <!--:action="importFileUrl"-->
                            <!--:file-list="fileList"-->
                            <!--:auto-upload="false">-->
                            <!--<el-button slot="trigger" size="small" type="primary" @click="showBroadcastDialog">曲目编辑</el-button>-->
                        <!--</el-upload>-->
                    <!--</p>-->
                    <p class="uploadText">定义内容：
                        <input type="text"v-model="hardware.uploadText" class="inputText">
                        <el-button slot="trigger" size="small" type="primary" @click="showBroadcastDialog">曲目编辑</el-button>

                    </p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="hardware.describe" cols="30"
                                                                               rows="5" placeholder="请输入描述信息"></textarea>
                    </p>
                </div>
                <!--路灯-->
                <div class="personCardContent" v-if="route.includes('lamppost')">
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：<input type="text"v-model="hardware.sex" class="inputText"></p>
                    <p class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：
                        <el-checkbox-group v-model="filterList" @change="weekDay">
                            <el-checkbox v-for="item in week" :label="item.type"></el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="weekCustom" v-model="weekcustom"></el-checkbox>
                    </p>
                    <p class="time" v-if="weekTime">选择时间：
                        <el-date-picker
                            v-model="definedDay"
                            size ="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                    <p class="Hardware">执行时间：
                        <el-time-picker is-range
                                        v-model="definedTime"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                        </el-time-picker>
                    </p>
                    <p class="name">关联路灯：
                        <el-select v-model="hardware.associatedradio" size="mini" multiple placeholder="请选择">
                            <el-option
                                v-for="item in broadcast"
                                :key="item.type"
                                :label="item.type"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="idNum">重复调度：
                        <el-radio v-model="radio" label="1">是</el-radio>
                        <el-radio v-model="radio" label="0">否</el-radio>
                    </p>
                    <!--<p class="upload" v-if="upload">定义曲风：-->
                        <!--<el-upload-->
                            <!--class="upload-demo"-->
                            <!--ref="upload"-->
                            <!--:limit="2"-->
                            <!--:action="importFileUrl"-->
                            <!--:file-list="fileList"-->
                            <!--:auto-upload="false">-->
                            <!--<el-button slot="trigger" size="small" type="primary">曲目编辑</el-button>-->
                        <!--</el-upload>-->
                    <!--</p>-->
                    <!--<p class="uploadText" v-if="uploadText">定义内容：-->
                        <!--<input type="text"v-model="hardware.uploadText" class="inputText">-->
                    <!--</p>-->
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="hardware.describe" cols="30"
                                                                               rows="5" placeholder="请输入描述信息"></textarea>
                    </p>
                </div>
                <!--保洁-->
                <div class="personCardContent" v-if="route.includes('purifier')">
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：<input type="text"v-model="person.sex"class="inputText"></p>
                    <p class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：
                        <el-checkbox-group v-model="filterList" @change="weekDay">
                            <el-checkbox v-for="item in week" :label="item.type"></el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="weekCustom" v-model="weekcustom"></el-checkbox>
                    </p>
                    <p class="time" v-if="weekTime">选择时间：
                        <el-date-picker
                            v-model="definedDay"
                            size ="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                    <p class="time">班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 次：
                        <el-checkbox-group v-model="classesList" @change="classesDay">
                            <el-checkbox v-for="item in classes" :label="item.type"></el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="dayCustom" v-model="daycustom"></el-checkbox>
                        <el-time-picker v-if="dayTime"
                                        is-range
                                        v-model="definedTime"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                        </el-time-picker>
                    </p>
                    <p class="name">人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 员：
                        <el-select v-model="person.people" size="mini" class="" multiple placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.type"
                                :label="item.type"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="idNum">重复调度：
                        <el-radio v-model="radio" label="1">是</el-radio>
                        <el-radio v-model="radio" label="0">否</el-radio>
                    </p>
                    <p class="name">片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 区：
                        <el-select v-model="person.people" size="mini" class="" multiple placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.type"
                                :label="item.type"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="person.describe" cols="30"
                                                                               rows="5" placeholder="请输入描述信息" style="background: #fafafa"></textarea>
                    </p>
                </div>
                <!--LED-->
                <div class="personCardContent" v-if="route.includes('screen')">

                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：<input type="text"v-model="hardware.sex" class="inputText"></p>
                    <p class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 间：
                        <el-checkbox-group v-model="filterList" @change="weekDay">
                            <el-checkbox v-for="item in week" :label="item.type"></el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox label="自定义" @change="weekCustom" v-model="weekcustom"></el-checkbox>
                    </p>
                    <p class="time" v-if="weekTime">选择时间：
                        <el-date-picker
                            v-model="definedDay"
                            size ="mini"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </p>
                    <p class="Hardware">执行时间：
                        <el-time-picker is-range
                                        v-model="definedTime"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        placeholder="选择时间范围">
                        </el-time-picker>
                    </p>
                    <p class="name">关联广播：
                        <el-select v-model="hardware.associatedradio" size="mini" multiple placeholder="请选择">
                            <el-option
                                v-for="item in broadcast"
                                :key="item.type"
                                :label="item.type"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="idNum">重复调度：
                        <el-radio v-model="radio" label="1">是</el-radio>
                        <el-radio v-model="radio" label="0">否</el-radio>
                    </p>
                    <!--<p class="upload" v-if="upload">定义曲风：-->
                        <!--<el-upload-->
                            <!--class="upload-demo"-->
                            <!--ref="upload"-->
                            <!--:limit="2"-->
                            <!--:action="importFileUrl"-->
                            <!--:file-list="fileList"-->
                            <!--:auto-upload="false">-->
                            <!--<el-button slot="trigger" size="small" type="primary">曲目编辑</el-button>-->
                        <!--</el-upload>-->
                    <!--</p>-->
                    <p class="uploadText">定义内容：
                        <input type="text"v-model="hardware.uploadText" class="inputText">
                        <el-button slot="trigger" size="small" type="primary" @click = "showScreenDialog">定义内容</el-button>
                    </p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="hardware.describe" cols="30"
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
        <broadcastDialog v-if="broadcastVisible" :visible="broadcastVisible" class="broadcastContent" @closeBroadcastDialog = 'closeBroadcastDialog'></broadcastDialog>
        <ScreenDialog v-if="screenVisible" :visible="screenVisible" class="screenContent" @closeScreenDialog = 'closeScreenDialog'></ScreenDialog>
    </div>
</template>

<script>
    import MapDialog from './mapDialog'
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
                edit: false,
                cropper: false,
                src: '',
                radio: '1',
                isShowMapDialog: false,
                mapVisible: false,
                broadcastVisible:false,
                screenVisible:false,
                person: {
                    name:'',
                    sex:'',
                    idNum:'',
                    type: '',
                    phone:'',
                    people:'',
                },
                hardware: {
                    name:'',
                    sex:'',
                    idNum:'',
                    type: '广播',
                    // associatedradio:[],
                    // associatedscreen:[],
                    // associatedstreet:[],
                    phone:'',
                    people:'',
                },
                options: [
                    { type: '安保'},
                    { type: '售票'},
                    { type: '保洁'},
                    { type: '检票'}
                ],
                indicatorType: [
                    {type: '广播'},
                    {type: 'LED'},
                    {type: '路灯'}
                ],
                associatedRadio:true,
                broadcast: [
                    {type: 'A-GB001'},
                    {type: 'A-GB002'},
                    {type: 'A-GB003'},
                    {type: 'A-GB004'},
                    {type: 'A-GB005'},
                    {type: 'A-GB006'}
                ],
                associatedScreen:false,
                screen: [
                    {type: 'A-DP001'},
                    {type: 'A-DP002'},
                    {type: 'A-DP003'},
                    {type: 'A-DP004'},
                    {type: 'A-DP005'},
                    {type: 'A-DP006'}
                ],
                associatedStreet:false,
                lamppost: [
                    {type: 'A-LD001'},
                    {type: 'A-LD002'},
                    {type: 'A-LD003'},
                    {type: 'A-LD004'},
                    {type: 'A-LD005'},
                    {type: 'A-LD006'}
                ],
                route: '',
                file: {},
                definedDay: '',
                weekcustom:false,
                weekTime:false,
                filterList:[],
                week: [
                    {type: '周一'},
                    {type: '周二'},
                    {type: '周三'},
                    {type: '周四'},
                    {type: '周五'},
                    {type: '周六'},
                    {type: '周日'}
                ],
                dayTime:false,
                classesList:[],
                classes: [
                    {type: '早班'},
                    {type: '中班'},
                    {type: '晚班'}
                ],
                daycustom:false,
                definedTime:'',
                upload:true,
                importFileUrl: 'http:dtc.com/cpy/add',
                fileList:[],
                uploadText:false,
            }
        },
        methods: {
            addfile() {
                this.$refs.fileUpload.click()
            },
            fi (e) {
                this.file = e.target.files[0]
            },
            select () {
                console.log(this.type, 'klklkl')
            },
            closeDialog () {
                this.$emit('closeInfoDialog')
            },
            addNewInfo () {
                let newInfo = {}
                if (this.route.includes('person')) {
                    newInfo = this.person
                } else if(this.route.includes('boat')) {
                    newInfo = this.boatCar
                } else if(this.route.includes('trash')) {
                    newInfo = this.trash
                } else if(this.route.includes('indicator')) {
                    newInfo = this.indicator
                } else if(this.route.includes('scenic')) {
                    newInfo = this.scenic
                } else if(this.route.includes('shop')) {
                    newInfo = this.shop
                } else if(this.route.includes('park')) {
                    newInfo = this.park
                } else if(this.route.includes('toilet')) {
                    newInfo = this.toilet
                } else if(this.route.includes('area')) {
                    newInfo = this.area
                } else if (this.route.includes('roat')) {
                    newInfo = this.roat
                }
                newInfo.status = true
                newInfo.checked = false
                if (this.Info.id) {
                    newInfo.id = this.Info.id
                    this.$emit('fixInfo', newInfo)
                } else {
                    this.$emit('addNewInfo', newInfo)
                }
                this.closeDialog()
            },
            weekCustom(){
                if(this.weekTime === true){
                    this.weekTime  = false;
                }else {
                    this.weekTime  = true;
                    this.filterList = [];
                }
            },
            weekDay(){
                this.weekTime  = false;
                this.weekcustom =false;
            },
            dayCustom(){
                if(this.dayTime === true){
                    this.dayTime  = false;
                }else {
                    this.dayTime  = true;
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
                let that = this
                let reader = new FileReader();
                reader.readAsDataURL(file);
                this.src = reader.onload = function(event){
                    let txt = event.target.result;
                    that.src = txt
                }
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
            hardwareType(vId){
                if(vId === '广播'){
                    this.upload = true;
                    this.uploadText = false;
                    this.associatedRadio = true;
                    this.associatedScreen = false;
                    this.associatedStreet = false;
                }else if(vId === 'LED'){
                    this.upload = false;
                    this.uploadText = true;
                    this.associatedRadio = false;
                    this.associatedScreen = true;
                    this.associatedStreet = false;
                }else if(vId === '路灯'){
                    this.upload = false;
                    this.uploadText = false;
                    this.associatedRadio = false;
                    this.associatedScreen = false;
                    this.associatedStreet = true;
                }
            }
        },
        created () {
            this.route = this.$route.path
            console.log(this.Info,'  opopop')
            if (this.route.includes('person')) {
                this.person = this.Info
            } else if(this.route.includes('boat')) {
                this.boatCar = this.Info
            } else if(this.route.includes('trash')) {
                this.trash = this.Info
            } else if(this.route.includes('indicator')) {
                this.indicator = this.Info
            } else if(this.route.includes('scenic')) {
                this.scenic = this.Info
            } else if(this.route.includes('shop')) {
                this.shop = this.Info
            } else if(this.route.includes('park')) {
                this.park = this.Info
            } else if(this.route.includes('toilet')) {
                this.toilet = this.Info
            } else if (this.route.includes('area')) {
                this.area = this.Info
            } else if (this.route.includes('roat')) {
                this.roat = this.Info
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
    .detailDialog{
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
    }
    .el-select-dropdown__item span{
        font-size: rem(12);
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
                        background: red;
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
        .map {
            width: rem(400);
            height: rem(400);
        }
    }
</style>
<style lang="scss">
    .el-checkbox__label{
        font-size: rem(12);
        padding-left: rem(7);
    }
    .el-checkbox+.el-checkbox{
        margin-left: rem(10);
    }
</style>
