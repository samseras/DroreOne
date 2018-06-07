<template>
    <div class="alarmEventDialog">
        <el-dialog
            :visible="visible"
            :close-on-click-modal = false
            title="告警事件处理"
            :before-close="closeEventDialog"
            width="500px"
            class="dialog edit_Dialog"
            center>

                <div class="alarmEventContent">
                    <!--批量编辑-->
                    <ScrollContainer>
                        <div class="alarmContent" v-if="isBatchEdit">
                            <p class="level">严重等级：
                            <el-select  v-model="batchEdit.level" size="mini" class="" placeholder="请选择">
                                <el-option
                                    v-for="item in levelInfo"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </p>
                            <p class="status">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 态：
                                <el-select  v-model="batchEdit.status" size="mini" class="" placeholder="请选择">
                                    <el-option
                                        v-for="item in statusInfo"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </p>
                        </div>

                        <div  v-if="!isBatchEdit"  class="alarmContent">
                            <p class="serialNum">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 号：
                                <el-input type="text" v-model='eventInfo.serialNum' class="inputText" :maxlength="15" :readonly="true"></el-input>
                            </p>
                            <p class="type">指标类型：
                                <el-input type="text" v-model='eventInfo.rule.alarmTypeName' class="inputText" :maxlength="15" :readonly='true'></el-input>
                            </p>
                            <p class="sourceDevice">来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 源：
                                <el-input type="text"  v-model='eventInfo.device.name' class="inputText" :maxlength="15" :readonly='true'></el-input>
                            </p>
                            <p class="occurenceTime">发生时间：
                                <el-input type="text"  v-model='eventInfo.occurenceTime' class="inputText" :maxlength="15" :readonly='true'></el-input>
                            </p>
                            <p class="alarmRule">关联规则：
                                <!--<el-input type="text" v-model='eventInfo.alarmRuleName' class="inputText" :maxlength="15" :readonly='true'></el-input>-->
                                <span class="inputText el-input showRuleDetail" @click="showRuleDetail">{{eventInfo.rule.name}}</span>
                                <!--<div class="inputText el-input"></div>-->
                            </p>
                            <p class="level">严重等级：
                                <el-select  v-model="eventInfo.severity.id" size="mini" class="" placeholder="请选择" :disabled="isReadonly">
                                    <el-option
                                        v-for="item in levelInfo"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </p>
                            <p class="owner">负责人员：
                                <el-select  v-model="eventInfo.owner.id" @change="ownerChange" size="mini" class="" placeholder="请选择" :disabled="isReadonly">
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
                            <p class="tel">电话号码：
                                <el-input type="text" v-model="eventInfo.owner.phone" class="inputText" :maxlength="15" :disabled="true"></el-input>
                            </p>
                            <p class="status">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 态:
                                <el-select  v-model="eventInfo.status.id" size="mini" class="" placeholder="请选择" :disabled="isReadonly">
                                    <el-option
                                        v-for="item in statusInfo"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </p>
                            <p class="description">处理备注：<br>
                                <textarea name="" v-model='handleDescription' cols="30"
                                          rows="5" placeholder="请输入描述信息" :disabled="isReadonly"></textarea >
                            </p>
                            <div class="attachment">附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：
                                <div v-loading="isShowLoading" class="showFilelist" >
                                    <div class="uploadlist" v-for="item in fileList">
                                        <el-checkbox v-model="item.checked" class="checkBoxBtn"></el-checkbox>
                                        <span class="downloadThis" @click="downloadFile(item.title)">{{item.title}}</span>
                                    </div>
                                </div>
                                <div class="uploadContent">
                                    <el-button size="mini" class="hold" @click="$refs.uploadFile.click()" :disabled="isReadonly">上传附件</el-button>
                                     <el-button size="mini" class="hold" @click="deleteFile" :disabled="isReadonly || emptyFile">删除文件</el-button>
                                    <input type="file" ref="uploadFile" class="multiFile"  multiple="multiple" @change="selectFile">
                                </div>
                            </div>

                            <div class="processLog">
                                <p>处理记录：</p>
                                <div class="processDiv" v-for="item in eventInfo.handleRecords">
                                    <div class="processTime">{{item.submitTime}}</div>
                                    <div class="processContent">
                                        编辑人：{{item.submitter}}<br>
                                        <div>{{item.modifiedFields}}
                                        </div>
                                        {{item.handleDescription}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollContainer>

                    <div slot="footer" class="dialog-footer cardFooter">
                        <el-button size="mini" class="hold" @click='saveDialog'>提交</el-button>
                        <el-button size="mini" @click = 'closeEventDialog'>取消</el-button>
                    </div>
                </div>

        </el-dialog>
        <AlarmDetail  v-if="ruleVisible"
                      :ruleVisible="ruleVisible"
                      @closeDialog ="closeDialog"
                      :alarmRuleId="eventInfo.alarmRuleId">

        </AlarmDetail>
    </div>

</template>

<script>
     import VueAplayer from 'vue-aplayer'
     import ScrollContainer from '@/components/ScrollContainer'
     import api from '@/api'
     import AlarmDetail from '../alarmRule/alarmRuleDialog'
    export default {
        props: ['visible','isReadonly','isBatchEdit','choseInfoId','Info'],
        data () {
            return{
                eventInfo:{},
                batchEdit:{
                    level:'',
                    status:''
                },
                levelInfo:[],
                statusInfo:[],
                isShowLoading: false,
                fileAddList:[],
                fileDelList:[],
                personInfo:[],
                ruleVisible:false,
                emptyFile:false,
                initFileList:[],
                fileList:[],
                fileAddIds:[],
                modifiedFields:'',
                handleDescription:''
            }
        },
        methods: {
            closeDialog () {
                this.ruleVisible = false
            },
            showRuleDetail(){
                console.log(this.eventInfo.alarmRuleId)
                console.log(this.eventInfo.alarmRuleName)
                this.ruleVisible = true;
            },
            ownerChange(val){
                console.log(val);
                console.log(this.eventInfo);
                this.getTelById(val);
            },
            getTelById(id){
                if(this.personInfo.length > 0){
                    this.personInfo.forEach((item)=>{
                        if(item.options.id == id){
                            this.eventInfo.ownerTel =  item.options.phone;
                            this.eventInfo.ownerName = item.options.name;
                        }
                    });
                }
            },
            downloadFile(val){
                console.log(val)
            },
            closeEventDialog () {
                this.$emit('closeDialog')
            },
            async saveDialog(){
                let objArray = [];
                let newInfo = {};
                if(this.isBatchEdit){    //批量编辑
                    console.log(this.choseInfoId);

                    if(!this.batchEdit.level && !this.batchEdit.status){
                        return;
                    }

                    // objArray = this.choseInfos;
                    objArray = this.choseInfos.map((item)=>{
                        var obj = {
                            id:item.id,
                            ownerId:item.owner.id,
                            statusId:item.status.id,
                            severityId:item.severity.id,
                            attachmentIds:item.attachmentIds,
                            handleRecord:{
                                modifiedFields:item.modifiedFields,
                                handleDescription: item.handleDescription
                            }
                        }
                        return obj
                    });

                    objArray.forEach((item)=>{
                        if(this.batchEdit.level){
                            item.severityId = this.batchEdit.level;
                        }
                        if(this.batchEdit.status){
                            item.statusId = this.batchEdit.status;
                        }
                    })
                    console.log(objArray)
                    this.$emit('saveEditInfo',objArray);
                }else{  //单个编辑或查看

                    if(!this.eventInfo.severity.id){
                        this.$message.error('请选择严重性等级')
                        return;
                    }
                    if(!this.eventInfo.status.id){
                        this.$message.error('请选择状态')
                        return;
                    }

                    // //TODO 判断删除，新增的文件
                    await this.deleteUpload();

                    await this.addUpload();

                    let ids = this.fileList.map((item)=>{
                                if(this.initFileList.includes(item)){
                                    return item.id
                                }
                              })
                    console.log(this.fileAddIds)
                    ids.concat(this.fileAddIds)

                    //监听变化
                    if(this.Info.severity.id != this.eventInfo.severity.id){
                        this.modifiedFields += '严重等级：'+this.Info.severity.name+'->'+this.getServityNameById(this.eventInfo.severity.id)+ " "
                    }
                    if(this.Info.owner.id != this.eventInfo.owner.id){
                        this.modifiedFields += '负责人：'+this.Info.owner.name+'->'+this.getOwnerNameById(this.eventInfo.owner.id)+ " "
                    }
                    if(this.Info.status.id != this.eventInfo.status.id){
                        this.modifiedFields += '状态：'+this.Info.status.name+'->'+this.getStatusNameById(this.eventInfo.status.id)
                    }

                    newInfo = {
                        id:this.eventInfo.id,
                        ownerId:this.eventInfo.owner.id,
                        statusId:this.eventInfo.status.id,
                        severityId:this.eventInfo.severity.id,
                        // attachmentIds:ids.concat(this.fileAddIds),
                        handleRecord:{
                            modifiedFields:this.modifiedFields,
                            handleDescription: this.handleDescription
                        }
                    }

                     //编辑或查看
                    objArray.push(newInfo)

                    //保存修改
                    this.$emit('saveEditInfo',objArray)
                }

            },
            guid() {
                 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                     var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                     return v.toString(16);
                 });
            },
            selectFile (e) {

                console.log(e.target.files[0], 'opopopopopops')
                // this.fileAddList = this.fileAddList.concat(e.target.files)
                let fileObjs = []
                for(let i = 0,j=e.target.files.length;i<j;i++){
                    let id = this.guid()
                    fileObjs.push({
                        title:e.target.files[i].name,
                        id:id,
                        checked:false
                    })

                    e.target.files[i].id = id
                    this.fileAddList.push(e.target.files[i])
                }

                if(fileObjs.length >0) {
                    fileObjs.forEach((item)=>{
                        this.fileList.push(item)
                    })
                }
            },
            deleteFile(){
                console.log(this.fileList);
                let isSelect = false;
                this.fileList.forEach((item)=>{
                    if(item.checked){
                        isSelect = true;
                    }
                })
                if(!isSelect){
                    this.$message.error('请选择要删除的文件！');
                    return;
                }

                this.fileList = this.fileList.filter((item)=> !item.checked)
                this.fileAddList  = this.fileAddList.filter((item)=> {
                    if(this.fileList.includes(item.id)){
                       return item
                    }
                })
                this.$message.success('删除成功')

            },
            init () {
                this.getPersonInfo();
                this.getSeverityType();
                this.getAlarmEventStatus();
            },
            async addUpload(){
                if(this.fileAddList.length >0){
                    var data = new FormData();
                    this.fileAddList.forEach((item)=>{
                        data.append('f1',item);
                    })
                    await api.alarm.uploadAttachments(data).then(res => {
                        console.log(res, '上传成功')
                        this.fileAddIds = res
                    }).catch(err => {
                        console.log(err, '上传失败')
                    })
                }
            },
            async deleteUpload(){
                if(this.initFileList.length > 0){
                    let removeFile = this.initFileList.filter(item=>!this.fileList.includes(item))

                    let removeIds = removeFile.map(item=>item.id)

                    //调删除接口
                    await api.alarm.deleteUploadAttachments({ids:removeIds}).then(res => {
                        console.log(res, '删除成功')
                    }).catch(err => {
                        console.log(err, '删除失败')
                    })
                }
            },
            getServityNameById(id){
               let result =  this.levelInfo.filter((item)=>item.id == id)
                return result[0].name
            },
            getStatusNameById(id){
                let result =  this.statusInfo.filter((item)=>item.id == id)
                return result[0].name
            },
            getOwnerNameById(id){
                console.log(this.personInfo)
                let personArray = []
                this.personInfo.forEach((item)=>{
                    item.options.forEach(t=>personArray.push(t))

                })
                let result = personArray.filter((item)=>item.id == id)
                return result[0].name
            },
            async getSeverityType(){
                await api.alarm.getSeverityType().then(res => {
                    console.log(res, '查询严重等级成功')
                    this.levelInfo = res
                }).catch(err => {
                    console.log(err, '查询严重等级失败')
                })
            },
            async getAlarmEventStatus(){
                await api.alarm.getAlarmEventStatus().then(res => {
                    console.log(res, '查询告警事情状态成功')
                    this.statusInfo = res
                }).catch(err => {
                    console.log(err, '查询告警事情状态失败')
                })
            },
            async getPersonInfo(){
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
            }
        },
        async created () {
            this.init();
            console.log(this.Info);
            this.initFileList = JSON.parse(JSON.stringify(this.Info.fileList))
            this.fileList = JSON.parse(JSON.stringify(this.Info.fileList));
            this.eventInfo = JSON.parse(JSON.stringify(this.Info));
            // this.fileDelList = this.eventInfo.fileList
            // if(this.eventInfo.ownerId && this.eventInfo.ownerId != ""){
            //     this.getNameById(this.eventInfo.ownerId);
            // }

        },
        components : {
            AlarmDetail,
            ScrollContainer
        },
         mounted () {
        }
    }
</script>

<style lang="scss">
    .alarmEventDialog{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 100%;
        }
        .el-dialog--center{
            padding: 0;
            height: rem(530);
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
            height: rem(450);
            box-sizing: border-box;
            font-size: rem(12);
            min-height: rem(150);
            .el-select{
                width:rem(390);
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
                width: rem(380);
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
    .alarmEventDialog{
        .alarmEventContent{
            width: 100%;
            height: 100%;
            .alarmContent {
                 width: 100%;
                 height: 100%;
                 position: relative;
                 .uploadContent{
                     text-align: right;
                     .multiFile{
                         display: none;
                     }
                 }
                .alarmRule{
                    .showRuleDetail{
                        cursor:pointer;
                        margin-left: rem(15);
                    }
                    .showRuleDetail:hover{
                        color:blue;
                        text-decoration: underline;
                    }
                }
                 .attachment{
                     .showFilelist{
                         display: flex;
                         flex-wrap: wrap;
                         justify-content:space-between;
                         div {
                             display:inline-block;
                         }
                     }
                     .downloadThis{
                         cursor:pointer;
                     }
                     .downloadThis:hover{
                         color:blue;
                         text-decoration: underline;
                     }
                 }
                 .processLog{
                     /*text-align: cente;*/
                     p{
                         border-bottom: 0;
                     }
                     .processDiv{

                     }
                     .processTime{
                         width:30%;
                         float:left;
                     }
                     .processContent{
                         overflow: hidden;
                     }
                 }
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
                     /*span{*/
                         /*background: #f0f2f5;*/
                         /*color: #909399;*/
                     /*}*/
                 }

             }
            .cardFooter {
                width: 100%;
                padding: rem(5) rem(10);
                box-sizing: border-box;
                border-top: 1px solid #ccc;
                text-align: right;
                .el-button{
                    padding: rem(4) rem(6);
                }
            }
            .uploadContent{
                .el-button{
                    padding: rem(4) rem(6);
                }
            }

        }
    }
</style>
