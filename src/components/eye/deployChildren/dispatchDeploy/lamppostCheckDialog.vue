<template>
    <div class="lamppostDialog">
        <el-dialog
            :title="title"
            :visible="visible"
            :before-close="lastInfo"
            width="600px"
            class="dialog echatDialog"
            center>
            <div class="lamppostCheck">
                <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 称：{{checkInfo.lightSchedule.name}}</p>
                <p class="time" v-if="checkInfo.lightSchedule.customizedDays">调度时间：{{checkInfo.lightSchedule.startDate}}~{{checkInfo.lightSchedule.endDate}}</p>
                <p class="time" v-if="!checkInfo.lightSchedule.customizedDays">调度时间：{{checkInfo.lightSchedule.days | weekFilter}}</p>
                <p class="Hardware">执行时间：{{checkInfo.lightSchedule.startTime}}~{{checkInfo.lightSchedule.endTime}}</p>
                <p class="name">关联路灯：<span v-for="item in LightName">{{item.name}}</span>
                </p>
                <p class="type">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：
                    <textarea name="" v-model="checkInfo.lightSchedule.description" cols="70"
                              rows="5" placeholder="请输入描述信息"></textarea></p>
            </div>
            <div class="" slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="lastInfo">上一步</el-button>
                <el-button size="mini" class="hold" :disabled='isDisabled'>保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/api'

    export default {
        name: "lamppost-check-dialog",
        props: ['visible', 'checkInfo', 'isDisabled', 'title'],
        data() {
            return {
                hardware: {
                    name: '',
                    sex: '',
                    idNum: '',
                    type: '广播',
                    phone: '',
                    people: '',

                },
                LightName: []
            }
        },
        methods: {
            lastInfo() {
                this.$emit('closeInfoDialog')
            }
        },
        async created() {
            await api.light.getAllLight().then(res => {
                console.log(res, 'opiiouhnjk')
                let list = res.devices
                this.LightName = list.filter(item => {
                    for (let i = 0; i < this.checkInfo.lightIds.length; i++) {
                        if (item.id === this.checkInfo.lightIds[i]) {
                            return item.name
                        }
                    }
                })
            }).catch(err => {
                console.log(err, '请求失败')
                this.isShowLoading = false
            })
            console.log(this.checkInfo, '这是传过来的信息')
        }
    }
</script>
<style lang="scss">
    .lamppostDialog {
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center {
            width: 100%;
        }
        .el-dialog--center {
            padding: 0;
            /*height: rem(300);*/
        }
        .el-dialog__header {
            padding: rem(10) 0 rem(5) rem(20);
            text-align: left;
            border-bottom: 1px solid #ccc;
            background: #fafafa;
        }
        .el-dialog__title {
            font-size: rem(14);
        }
        .el-dialog__headerbtn {
            top: rem(12);
        }
        .el-dialog__body {
            padding: rem(10) rem(20) 0 rem(20);
            box-sizing: border-box;
            font-size: rem(12);
            min-height: rem(150);
            background: #fff;
            .el-select {
                width: rem(475);
                .el-input--suffix .el-input__inner {
                    border: none;
                }
                .el-tag__close.el-icon-close {
                    top: rem(-2);
                }
            }
            .el-checkbox-group {
                display: inline-block;
                padding-right: rem(10);
            }
            .el-range-editor--mini.el-input__inner {
                width: rem(475);
                border: none;
                padding: 0 rem(10);
                height: rem(24);
                line-height: rem(24);
                .el-range-separator {
                    line-height: rem(24);
                }
            }
            .el-date-editor--timerange {
                border: none;
                float: right;
                width: rem(250);
                padding: 0 rem(10);
                height: rem(24);
                line-height: rem(24);
            }
            .Hardware .el-date-editor--timerange {
                float: inherit;
            }
            .el-date-editor {
                .el-range-input, .el-range-separator {
                    font-size: rem(12);
                }
                .el-range__icon, .el-range-separator {
                    height: rem(24);
                    line-height: rem(24);
                }
            }
            .el-radio {
                .el-radio__input {
                    /*.el-radio__inner{*/
                    /*width: rem(12);*/
                    /*height: rem(12);*/
                    /*}*/
                }
                .el-radio__label {
                    font-size: rem(12);
                }
            }
            .el-tag--mini {
                line-height: rem(21);

            }
            .inputText {
                width: rem(400);
            }
            .upload-demo {
                display: inline-block;
                width: rem(470);
                height: rem(22);
                line-height: rem(22);
                overflow: hidden;
                .el-upload {
                    float: right;
                    .el-button--small, .el-button--small.is-round {
                        padding: rem(4) rem(10);
                    }
                }
            }
        }
        .el-dialog__footer {
            padding: 0;
            padding: rem(5) 0;
        }
        .el-dialog--center .el-dialog__footer {
            text-align: right;
            padding-right: rem(15);
            border-top: 1px solid #ccc;
            margin-top: rem(15);
        }
    }

    .el-select-dropdown__item span {
        font-size: rem(12);
    }
</style>
<style lang="scss" scoped type="text/scss">
    .lamppostDialog{
        .lamppostCheck {
            p {
                textarea {
                    resize: none;
                    outline: none;
                    padding: rem(5);
                    box-sizing: border-box;
                    border-radius: rem(5);
                    border: 1px solid #ccc;
                    height: rem(60);
                    line-height: rem(25);
                    overflow-y: auto;
                    margin-top: rem(15);
                    margin-left: rem(15);
                    background: #fafafa;
                }
                span{
                    margin-right: rem(10);
                }
            }
        }
    }
</style>
