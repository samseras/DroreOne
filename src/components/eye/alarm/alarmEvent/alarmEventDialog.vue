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
                    <p class="level">等&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 级：
                    <el-select  v-model="eventInfo.level" size="mini" class="" placeholder="请选择">
                        <el-option
                            v-for="item in levelInfo"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                    <p class="status">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 态：
                        <el-select  v-model="eventInfo.status" size="mini" class="" placeholder="请选择">
                            <el-option
                                v-for="item in statusInfo"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                </div>

                <div v-else  class="alarmContent">
                    <p class="sex">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 号：
                        <el-input type="text" v-model='eventInfo.id' class="inputText" :maxlength="15" :readonly="true"></el-input>
                    </p>
                    <p class="type">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 型：
                        <el-input type="text" v-model='eventInfo.type' class="inputText" :maxlength="15" :readonly='true'></el-input>
                    </p>
                    <p class="source">来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 源：
                        <el-input type="text"  v-model='eventInfo.source' class="inputText" :maxlength="15" :readonly='true'></el-input>
                    </p>
                    <p class="time">发生时间：
                        <el-input type="text"  v-model='eventInfo.occurTime' class="inputText" :maxlength="15" :readonly='true'></el-input>
                    </p>
                    <p class="role">告警规则：
                        <el-input type="text" v-model='eventInfo.role' class="inputText" :maxlength="15" :readonly='true'></el-input>
                    </p>
                    <p class="level">等&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：
                        <el-select  v-model="eventInfo.level" size="mini" class="" placeholder="请选择" :readonly="isReadonly">
                            <el-option
                                v-for="item in levelInfo"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="owner">负责人：
                        <el-select  v-model="eventInfo.owner.name" @change="ownerChange" size="mini" class="" placeholder="请选择" :readonly="isReadonly">
                            <el-option
                                v-for="item in eventInfo.owner"
                                :key="item.val"
                                :label="item.name"
                                :value="item.val">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="tel">电话号码：
                        <el-input type="text" v-model="eventInfo.tel" class="inputText" :maxlength="15" :readonly="isReadonly"></el-input>
                    </p>
                    <p class="status">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 态：
                        <el-select  v-model="eventInfo.status" size="mini" class="" placeholder="请选择" :readonly="isReadonly">
                            <el-option
                                v-for="item in statusInfo"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="description">描述：
                        <textarea name="" v-model='eventInfo.description' cols="30"
                                  rows="5" placeholder="请输入描述信息" :readonly="isReadonly"></textarea >
                    </p>

                </div>
                <div class=""slot="footer" class="dialog-footer cardFooter">
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
        props: ['visible','isReadonly','isBatchEdit','choseInfoId'],
        data () {
            return{
                levelInfo:[
                    {
                        value:'1',
                        label:'高'
                    },
                    {
                        value:'2',
                        label:'中'
                    },{
                        value:'3',
                        label:'低'
                    }
                ],
                statusInfo:[
                    {
                        value:'1',
                        label:'新告警'
                    },
                    {
                        value:'2',
                        label:'处理中'
                    },{
                        value:'3',
                        label:'已解决'
                    }
                ],
                ownerInfo:[
                    {
                        value:'0',
                        label:'aaa'
                    },
                    {
                        value:'1',
                        label:'bbb'
                    },{
                        value:'2',
                        label:'ccc'
                    }
                ],
                isShowLoading: false,
                eventInfo:{
                    id:'',
                    type:'',
                    source:'',
                    occurTime:'',
                    role:'',
                    level:'',
                    owner:[
                        {
                            val:'1',
                            name:'aaa',
                            tel:'111'
                        },
                        {
                            val:'2',
                            name:'bbb',
                            tel:'222'
                        }
                    ],
                    tel:'',
                    status:'',
                    description:''
                }
            }
        },
        methods: {
            ownerChange(val){
                console.log(val);
                console.log(this);
                let vm = this;
                // switch(val){
                //     case 0:
                //         vm.
                // }
            },
            closeDialog () {
                this.$emit('closeDialog')
            },
            saveDialog(){
                //批量编辑
                if(this.isBatchEdit){
                    console.log(this.choseInfoId);
                    console.log(this.level);
                    console.log(this.status);
                    this.$emit('addAlarmEvent');

                }else{  //单个编辑或查看
                    this.$emit('addAlarmEvent');
                }

                // let musicList
                // for (let i = 0; i < this.selectNameList.length; i++) {
                //     musicList = this.songList.filter((item, index) => {
                //         if (item.id === this.selectNameList[i]){
                //             this.songList[index].status = true
                //         }
                //         return item.status === true
                //     })
                // }
                // this.$emit('saveMusicList',musicList)
                // console.log(musicList)
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
    }
</style>
