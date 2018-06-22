<template>
    <div class="alarmEventDialog">
        <el-dialog
            :visible="visible"
            :close-on-click-modal = false
            title="告警事件处理"
            :before-close="closeEventDialog"
            width="580px"
            :class="isBatchEdit ? 'batchHeight' : 'normalHeight'"
            center>
                <div class="alarmEventContent">
                    <!--批量编辑-->
                    <ScrollContainer>
                        <div class="alarmContent" v-if="isBatchEdit">
                            <p class="level">严重等级：
                            <el-select  v-model="batchlevel" size="mini" class="" placeholder="请选择">
                                <el-option
                                    v-for="item in levelInfo"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </p>
                            <p class="status">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 态：
                                <el-select  v-model="batchstatus" size="mini" class="" placeholder="请选择">
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
                            <p class="serialNum">
                                <span>编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 号：</span>
                                <el-input type="text" v-model='eventInfo.serialNum' class="inputText" :maxlength="15" :disabled="true"></el-input>
                            </p>
                            <p class="type">
                                <span>指标类型：</span>
                                <el-input type="text" v-model='eventInfo.rule.alarmTypeName' class="inputText" :maxlength="15" :disabled='true'></el-input>
                            </p>
                            <p class="sourceDevice">
                                <span>来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 源：</span>
                                <el-input type="text"  v-model='eventInfo.device.name' class="inputText" :maxlength="15" :disabled='true'></el-input>
                            </p>
                            <p class="occurenceTime">
                                <span>发生时间：</span>
                                <el-input type="text"  v-model='eventInfo.occurenceTime' class="inputText" :maxlength="15" :disabled='true'></el-input>
                            </p>
                            <p class="alarmRule">
                                <span>关联规则：</span>
                                <!--<el-input type="text" v-model='eventInfo.alarmRuleName' class="inputText" :maxlength="15" :readonly='true'></el-input>-->
                                <span class="inputText el-input showRuleDetail" @click="showRuleDetail">{{eventInfo.rule.name}}</span>
                                <!--<div class="inputText el-input"></div>-->
                            </p>
                            <p class="level">
                                <span>严重等级：</span>
                                <el-select  v-model="eventInfo.severity.id" size="mini" class="" placeholder="请选择" :disabled="readOnly">
                                    <el-option
                                        v-for="item in levelInfo"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </p>
                            <p class="owner">
                                <span>负责人员：</span>
                                <el-select  v-model="eventInfo.owner.id" @change="ownerChange" size="mini" class="" placeholder="请选择" :disabled="readOnly">
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

                            <p v-if="ruleInfo.alarmTypeId == '5'" class="name">
                                <span>实际时长阈值：</span>
                                <el-input type="text" v-model='eventInfo.acturalExtendValue' class="inputText" :maxlength="15" :disabled='true'></el-input>
                                (千米/小时)
                            </p>
                            <p v-if="ruleInfo.alarmTypeId == '5'" class="name">
                                <span>实际最高速度：</span>
                                <el-input type="text" v-model='eventInfo.actualValue' class="inputText" :maxlength="15" :disabled='true'></el-input>
                                (千米/小时)
                            </p>

                            <p class="tel">
                                <span>电话号码：</span>
                                <el-input type="text" v-model="eventInfo.owner.phone" class="inputText" :maxlength="15" :disabled="true"></el-input>
                            </p>
                            <p class="status">
                                <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 态:</span>
                                <el-select  v-model="eventInfo.status.id" size="mini" class="" placeholder="请选择" :disabled="readOnly">
                                    <el-option
                                        v-for="item in statusInfo"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </p>
                            <p class="description textArea">
                                <span>处理备注：</span>
                                <el-input type="textarea" :rows='5' :cols="30" placeholder="请输入描述信息" v-model="handleDescription" :disabled="readOnly" :maxlength="140"></el-input>
                            </p>
                            <div class="attachment">
                                <span>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</span>
                                <div class="showFilelist" >
                                    <div class="uploadlist" v-for="item in fileList">
                                        <el-checkbox v-model="item.checked" class="checkBoxBtn"></el-checkbox>
                                        <span v-if="item.path" class="downloadThis" @click="downloadFile(item)">{{item.title}}</span>
                                        <span v-else>{{item.title}}</span>
                                    </div>
                                </div>
                                <div class="uploadContent">
                                    <el-button size="mini" class="hold" @click="$refs.uploadFile.click()" :disabled="readOnly">上传附件</el-button>
                                     <el-button size="mini" class="hold" @click="deleteFile" :disabled="readOnly || emptyFile">删除文件</el-button>
                                    <input type="file" ref="uploadFile" class="multiFile"  multiple="multiple" @change="selectFile">
                                </div>
                            </div>

                            <div class="processLog">
                                <span>处理记录：</span>
                                <div class="processDiv" v-for="(item, index) in orderByTime">
                                    <div class="processTime">{{item.submitTime}}</div>
                                    <img :src="getStatusPng(item.alarmStatusId,index)" alt="">
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

                    <div slot="footer" v-if="!readOnly || isBatchEdit" class="dialog-footer cardFooter">
                        <el-button size="mini" class="hold" @click='saveDialog'>提交</el-button>
                        <el-button size="mini" @click = 'closeEventDialog'>取消</el-button>
                    </div>
                </div>
        </el-dialog>
        <AlarmDetail  v-if="ruleVisible"
                      :ruleVisible="ruleVisible"
                      @closeDialog ="closeDialog"
                      :alarmRuleId="eventInfo.rule.id"
                      :isReadonly="isReadonly">
        </AlarmDetail>
    </div>

</template>

<script>
     import ScrollContainer from '@/components/ScrollContainer'
     import api from '@/api'
     import AlarmDetail from '../alarmRule/alarmRuleDialog'
    export default {
        props: ['visible','readOnly','isBatchEdit','choseInfoId','Info','choseInfos'],
        data () {
            return{
                eventInfo:{},
                batchlevel:'',
                batchstatus:'',
                levelInfo:[],
                statusInfo:[],
                fileAddList:[],
                fileDelList:[],
                personInfo:[],
                ruleVisible:false,
                emptyFile:false,
                initFileList:[],
                fileList:[],
                fileAddIds:[],
                modifiedFields:'',
                handleDescription:'',
                isReadonly:false,
                ruleInfo:{}
            }
        },
        computed:{
          orderByTime(){
              return this.eventInfo.handleRecords.reverse()
          }
        },
        methods: {
            getStatusPng(statusId,index){
                let imgSrc
                if(index == 0){
                    switch (statusId) {
                        case "1":
                            imgSrc = "./../../../../../static/img/alarm/start.png"
                            break
                        case "2":
                            imgSrc = "./../../../../../static/img/alarm/process.png"
                            break
                        case "3":
                            imgSrc = "./../../../../../static/img/alarm/end.png"
                    }
                }else{
                    switch (statusId) {
                        case "1":
                            imgSrc = "./../../../../../static/img/alarm/start_gray.png"
                            break
                        case "2":
                            imgSrc = "./../../../../../static/img/alarm/process_gray.png"
                        case "3":
                            imgSrc = "./../../../../../static/img/alarm/end_gray.png"
                    }
                }
                return imgSrc
            },
            closeDialog () {
                this.ruleVisible = false
            },
            showRuleDetail(){
                console.log(this.eventInfo.rule.id)
                this.ruleVisible = true;
                this.isReadonly = true;
            },
            ownerChange(id){
                console.log(id);
                if(this.personInfo.length > 0){
                    this.personInfo.forEach((item)=>{
                        item.options.forEach((obj)=>{
                            if(obj.id == id){
                                this.eventInfo.owner.phone = obj.phone
                            }
                        })
                    });
                }
            },
            downloadFile(val){
                window.location.href = 'http://192.168.0.150:8090/'+val.path
            },
            closeEventDialog () {
                this.$emit('closeDialog')
            },
            async saveDialog(){
                let objArray = [];
                let newInfo = {};
                if(this.isBatchEdit){    //批量编辑
                    console.log(this.choseInfoId);
                    if(!this.batchlevel && !this.batchstatus){
                        return;
                    }

                    objArray = this.choseInfos.map((item)=>{
                        let attachmentIds = item.attachments.map(item=>item.id)
                        var obj = {
                            id:item.id,
                            ownerId:item.owner.id,
                            statusId:item.status.id,
                            severityId:item.severity.id,
                            attachmentIds:attachmentIds,
                            handleRecord:{
                                modifiedFields:item.modifiedFields,
                                handleDescription: item.handleDescription
                            }
                        }
                        return obj
                    });

                    objArray.forEach((item)=>{
                        if(this.batchlevel){
                            if(item.handleRecord.modifiedFields && item.handleRecord.modifiedFields != ""){
                                item.handleRecord.modifiedFields += this.getServityNameById(item.severityId)+"->"+this.getServityNameById(this.batchlevel)+' '
                            }else{
                                item.handleRecord.modifiedFields ='严重等级：'+this.getServityNameById(item.severityId)+"->"+this.getServityNameById(this.batchlevel)+' '
                            }

                            item.severityId = this.batchlevel;
                        }
                        if(this.batchstatus){
                            if(item.handleRecord.modifiedFields && item.handleRecord.modifiedFields!= ""){
                                item.handleRecord.modifiedFields += this.getStatusNameById(item.statusId)+"->"+this.getStatusNameById(this.batchstatus)+' '
                            }else{
                                item.handleRecord.modifiedFields = '状态：'+this.getStatusNameById(item.statusId)+"->"+this.getStatusNameById(this.batchstatus)+' '
                            }

                            item.statusId = this.batchstatus;
                        }
                    })
                    let param = {
                        data:objArray
                    }
                    this.$emit('saveEditInfo',param);
                }else{  //单个编辑或查看

                    if(!this.eventInfo.severity.id){
                        this.$message.error('请选择严重性等级')
                        return;
                    }

                    if(!this.eventInfo.status.id){
                        this.$message.error('请选择状态')
                        return;
                    }
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

                    let  idArray = this.initFileList.map(item=>item.id)
                    let ids = []
                    this.fileList.forEach((item)=>{
                        if(idArray.includes(item.id)){
                            ids.push(item.id)
                        }
                    })

                    newInfo = {
                        id:this.eventInfo.id,
                        ownerId:this.eventInfo.owner.id,
                        statusId:this.eventInfo.status.id,
                        severityId:this.eventInfo.severity.id,
                        attachmentIds:ids,
                        handleRecord:{
                            modifiedFields:this.modifiedFields,
                            handleDescription: this.handleDescription
                        }
                    }
                    objArray.push(newInfo)
                    await this.deleteUpload();
                    let param = {
                        data : objArray,
                        fileAddList : this.fileAddList
                    }
                    await this.$emit('saveEditInfo',param)
                }
            },
            guid() {
                 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                     var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                     return v.toString(16);
                 });
            },
            selectFile (e) {
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
            async deleteUpload(){
                if(this.initFileList.length > 0){
                    let fileIDs = this.fileList.map(item=>item.id)
                    let removeFile = this.initFileList.filter((item)=>!fileIDs.includes(item.id))
                    console.log(removeFile,'removeFile')
                    if(removeFile.length >0){
                        let removeIds = removeFile.map(item=>item.id)

                        //调删除接口
                        await api.alarm.deleteUploadAttachments({ids:removeIds}).then(res => {
                            console.log(res, '删除成功')
                        }).catch(err => {
                            console.log(err, '删除失败')
                        })
                    }

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
            },
            async getAlarmRuleById(alarmRuleId){
                //调查询rule接口
                await api.alarm.getAlarmRuleById(alarmRuleId).then(res => {
                    if(res instanceof Array && res.length == 1){
                        this.ruleInfo = res[0]
                    }
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
        },
        async created () {
            this.init();
            console.log(this.Info);
            if(this.Info.fileList instanceof Array && this.Info.fileList.length > 0){
                this.initFileList = JSON.parse(JSON.stringify(this.Info.fileList))
                this.fileList = JSON.parse(JSON.stringify(this.Info.fileList));
            }
            this.eventInfo = JSON.parse(JSON.stringify(this.Info));
            this.getAlarmRuleById(this.eventInfo.rule.id)
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
        .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner{
            background-color:transparent;
        }
        .batchHeight{
            .el-dialog--center{
                height: rem(300);
            }
            .el-dialog__body{
                height: rem(220);
                min-height: rem(150);
            }
        }
        .normalHeight{
            .el-dialog--center{
                height: rem(530);
            }
            .el-dialog__body{
                height: rem(450);
                min-height: rem(150);
            }

        }
        .el-dialog--center{
            padding: 0;
            /*height: rem(530);*/
            text-align: left;
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
            /*height: rem(450);*/
            box-sizing: border-box;
            font-size: rem(12);
            /*min-height: rem(150);*/
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
        .textArea .el-textarea{
            font-size: rem(12);
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
                         justify-content:flex-start;
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
                     img{
                         display: inline-block;
                         float:left;
                         margin-right: rem(30);
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
                     span{
                         display: inline-block;
                         line-height: rem(15);
                         overflow: hidden;
                         padding-bottom: rem(-1);
                     }
                 }
                .textArea{
                    border-bottom: none;
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
