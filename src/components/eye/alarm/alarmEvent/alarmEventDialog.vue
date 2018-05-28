<template>
    <div class="alarmEventDialog">
        <el-dialog
            :visible="visible"
            :close-on-click-modal = false
            title="告警事件处理"
            :before-close="closeDialog"
            width="40%"
            class="dialog edit_Dialog"
            center>
            <div class="alarmEventContent">
                <!--批量编辑-->
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

                <div v-else  class="alarmContent">
                    <p class="serialNum">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 号：
                        <el-input type="text" v-model='eventInfo.serialNum' class="inputText" :maxlength="15" :readonly="true"></el-input>
                    </p>
                    <p class="type">指标类型：
                        <el-input type="text" v-model='eventInfo.envTypeName' class="inputText" :maxlength="15" :readonly='true'></el-input>
                    </p>
                    <p class="sourceDevice">来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 源：
                        <el-input type="text"  v-model='eventInfo.sourceDeviceName' class="inputText" :maxlength="15" :readonly='true'></el-input>
                    </p>
                    <p class="occurenceTime">发生时间：
                        <el-input type="text"  v-model='eventInfo.occurenceTime' class="inputText" :maxlength="15" :readonly='true'></el-input>
                    </p>
                    <p class="alarmRule">关联规则：
                        <el-input type="text" v-model='eventInfo.alarmRuleName' class="inputText" :maxlength="15" :readonly='true'></el-input>
                    </p>
                    <p class="level">严重等级：
                        <el-select  v-model="eventInfo.severityId" size="mini" class="" placeholder="请选择" :disabled="isReadonly">
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
                            <el-option
                                v-for="item in ownerInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="tel">电话号码：
                        <el-input type="text" v-model="eventInfo.tel" class="inputText" :maxlength="15" :disabled="isReadonly"></el-input>
                    </p>
                    <p class="status">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 态:
                        <el-select  v-model="eventInfo.statusId" size="mini" class="" placeholder="请选择" :disabled="isReadonly">
                            <el-option
                                v-for="item in statusInfo"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="description">处理备注：<br>
                        <textarea name="" v-model='eventInfo.description' cols="30"
                                  rows="5" placeholder="请输入描述信息" :disabled="isReadonly"></textarea >
                    </p>
                    <div class="attachment">附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：
                        <div v-loading="isShowLoading" class="showFilelist" >
                            <div class="uploadlist" v-for="(item,idx) in fileList" :id="item.id" :key="item.id">
                                <el-checkbox v-model="item.checked" @change="checked(item.id)" class="checkBoxBtn"></el-checkbox>
                                <span class="downloadThis" @click="downloadFile(item.title)">{{item.title}}</span>
                            </div>
                        </div>
                        <div class="uploadContent">
                            <el-button size="mini" class="hold" @click="$refs.uploadFile.click()" :disabled="isReadonly">上传附件</el-button>
                             <el-button size="mini" class="hold" @click="deleteFile" :disabled="isReadonly">删除文件</el-button>
                            <input type="file" ref="uploadFile" class="multiFile" @change="selectFile">
                        </div>
                    </div>

                    <div class="processLog">
                        <p>处理记录：</p>
                        <div class="processDiv">
                            <div class="processTime">2018-05-09 14:34:09</div>
                            <div class="processContent">
                                编辑人：溜冰<br>
                                flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
                                浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
                            </div>
                        </div>
                    </div>
                </div>


                <div slot="footer" class="dialog-footer cardFooter">
                    <el-button size="mini" class="hold" @click='saveDialog'>提交</el-button>
                    <el-button size="mini" @click = 'closeDialog'>取消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
     import VueAplayer from 'vue-aplayer'
     import api from '@/api'
    export default {
        props: ['visible','isReadonly','isBatchEdit','choseInfoId','Info'],
        data () {
            return{
                eventInfo:{
                    serialNum:'',
                    envTypeId:'',
                    envTypeName:'',
                    sourceDeviceId:'',
                    sourceDeviceName:'',
                    occurenceTime:'',
                    alarmRuleId:'',
                    alarmRuleName:'',
                    severityId:'',
                    severityName:'',
                    statusId:'',
                    statusName :'',
                    owner:[
                        {
                            id:'',
                            name:''
                        },
                        {
                            id:'',
                            name:''
                        }
                    ],
                    tel:'',
                    description:''
                },
                batchEdit:{
                    level:'',
                    status:''
                },
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
                statusInfo:[
                    {
                        id:'1',
                        name:'新告警'
                    },
                    {
                        id:'2',
                        name:'处理中'
                    },{
                        id:'3',
                        name:'已解决'
                    }
                ],
                ownerInfo:[
                    {
                        id:'1',
                        name:'aaa',
                        tel:'111'

                    },
                    {
                        id:'2',
                        name:'bbb',
                        tel:'222'
                    },{
                        id:'3',
                        name:'ccc',
                        tel:'333'
                    }
                ],
                isShowLoading: false,
                fileList:[
                    {
                        id:'1',
                        title:'1235555552.jpg'
                    },
                    {
                        id:'2',
                        title:'sdfsgdfhfdhdfdf.jpg'
                    },
                    {
                        id:'3',
                        title:'121233546435643564.jpg'
                    },
                    {
                        id:'4',
                        title:'12124565463.jpg'
                    },
                    {

                        id:'5',
                        title:'12123.jpg'
                    },
                    {
                        id:'6',
                        title:'121fgfdgdfg23.jpg'
                    },
                    {
                        id:'7',
                        title:'12123dfgdfgdfgdfg.jpg'
                    },
                    {
                        id:'8',
                        title:'12123dfgdfgdfgdfg.jpg'
                    },
                    {
                        id:'9',
                        title:'12123dfgdfgdfgdfg.jpg'
                    }
                ],
                selectFileList:[]

            }
        },
        methods: {
            ownerChange(val){
                console.log(val);
                console.log(this.eventInfo);
                this.ownerInfo.forEach((item,index)=>{
                    if(item.id == val){
                        this.eventInfo.tel =  item.tel;
                    }
                });
            },
            downloadFile(val){
                console.log(val)
            },
            closeDialog () {
                this.$emit('closeDialog')
            },
            saveDialog(){
                let objArray = [];
                let newInfo = {};
                if(this.isBatchEdit){    //批量编辑
                    console.log(this.choseInfoId);

                    objArray = this.choseInfos;

                    objArray.forEach((item)=>{
                        if(!this.batchEdit.level){
                            item.severityId = this.batchEdit.level;
                            item.severityName = this.severityId2Name(item.severityId);
                        }
                        if(!this.batchEdit.status){
                            item.statusId = this.batchEdit.status;

                            this.statusInfo.forEach((item)=>{
                                if(item.statusId == item.id){
                                    item.statusName = item.name;
                                }
                            })
                        }
                    })
                    console.log(objArray)
                    this.$emit('saveEditInfo',objArray);
                }else{  //单个编辑或查看

                    newInfo = this.eventInfo;
                    this.statusInfo.forEach((item)=>{
                        if(newInfo.statusId == item.id){
                            newInfo.statusName = item.name;
                        }
                    })

                    this.levelInfo.forEach((item)=>{
                        if(newInfo.severityId == item.id){
                            newInfo.severityName = item.name;
                        }
                    })

                    if (newInfo.id) {  //编辑或查看
                        objArray.push(newInfo)
                        this.$emit('saveEditInfo',objArray)
                    } else { //新增
                        this.$emit('saveInfo',newInfo)
                    }
                }

            },
            checked (id) {
                console.log(id)
                console.log(this.selectFileList)
                this.fileList = this.fileList.filter(item => {
                    if (item.id === id) {
                        item.checked = item.checked
                    }
                    return item
                })
                if (this.selectFileList.includes(id)) {
                    this.selectFileList = this.selectFileList.filter((item) =>{
                        return item !== id
                    })
                } else {
                    this.selectFileList.push(id)
                }
                console.log(this.selectFileList)

            },
            selectFile (e) {
                console.log(e.target.files[0], 'opopopopopops')
                let file = e.target.files[0]
                var obj = {
                    id:'123',
                    title:file.name
                }
                this.fileList.push(obj);
                // if (!file.type.includes('jpg')) {
                //     this.$message.error('请上传jpg格式文件，谢谢！');
                //     return
                // } else {
                //     var form = new FormData();
                //     form.append('f1',file);
                //     console.log(form, 'opopopopoppopop')
                //     api.alarm.createFile(form).then(res => {
                //         console.log(res, '上传成功')
                //     }).catch(err => {
                //         this.$message.error('上传失败，请稍后重试')
                //         console.log(err, '上传失败')
                //     })
                // }
            },
            deleteFile(){
                console.log(this.selectFileList);
                console.log(this.fileList);
                if(this.selectFileList.length > 0){

                        var ids = this.selectFileList.map(function(val){
                            return val.id;
                        });
                        let idList = this.fileList.map((item,index)=>{
                            return item.id;
                        })
                        this.selectFileList.forEach((item,index)=>{
                            if(this.idList.includes(item)){

                            }
                        });
                        // api.alarm.deletFile(ids).then(res => {
                        //     console.log(res, '删除成功')
                        //     this.$message.success('删除成功')
                        //     this.fileList = this.fileList.filter(item => {
                        //         return item.id !== id
                        //     })
                        // }).catch(err => {
                        //     this.$message.error('删除失败，请稍后重试')
                        //     console.log(err)
                        //     this.choseInfoId = []
                        // })

                }else{
                    this.$message.error('请选择要删除的文件！');
                }
            },
            init () {
                // let that = this;
                // that.fileList.forEach(function(item){
                //     if(item.checked){
                //         if(that.selectFileList.indexOf(item.title) === -1 ){
                //             // console.log(that.selectFileList.indexOf(item.title))
                //             that.selectFileList.push(item.title)
                //             that.playMusicList.push(item);
                //         }
                //     }
                // })
                // that.fileList.forEach(function(item){
                //     that.songNameList.push(item.title);
                // })
            },
            async getAllFile () {
                this.isShowLoading = true
                await api.alarm.getAllFile().then(res => {
                    this.isShowLoading = false
                    console.log(res, '请求成功')
                    this.fileList = res
                    this.fileList.forEach(item => {
                        let endNum = item.path.lastIndexOf('_')
                        let startNum = item.path.lastIndexOf('/') + 1
                        item.src = item.path
                        item.title = item.path.substring(startNum,endNum)
                        item.checked =false
                    })
                }).catch(err => {
                    this.isShowLoading = false
                    console.log(err, '请求失败')
                })
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
            }



        },
        watch:{

        },
        async created () {
            console.log(this.Info);
            this.eventInfo = this.Info;

        },
        components : {

        },
         mounted () {
            //异步加载
             this.init();

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
                     span{
                         background: #f0f2f5;
                         color: #909399;
                     }
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
