<template>
    <div class="controlDialog">
        <el-dialog
            :title="title"
            :close-on-click-modal = false
            :visible="visible"
            :before-close="closeDialog"
            width="480px"
            class="dialog echatDialog"
            center>
            <div class="card">
                <!--路灯-->
                <div class="personCardContent" v-if="route.includes('light')">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        {{this.LightList.name}}
                    </p>
                    <p class="name">所属片区：
                        {{this.LightList.regionName}}
                    </p>
                    <p class="name">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        {{this.LightList.modelName}}
                    </p>
                    <p class="name">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：
                        {{this.LightList.description}}
                    </p>
                </div>
                <!--传感器-->
                <div class="personCardContent" v-if="route.includes('environment')">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        {{this.Monitors.name}}
                    </p>
                    <p class="name">所属片区：
                        {{this.Monitors.regionName}}
                    </p>
                    <p class="name">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        {{this.Monitors.modelName}}
                    </p>
                    <p class="name">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：
                        {{this.Monitors.description}}
                    </p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "control-dialog",
        props: ['visible', 'Info','title'],
        data () {
            return {
                route:'',
                LightList:[],
                Monitors:[],
            }
        },
        methods: {
            closeDialog () {
                this.$emit('closeInfoDialog')
            },
        },
        mounted () {

        },
        created () {
            this.route = this.$route.path
            if(this.route.includes('light')) {
                this.LightList = this.Info
            }else if(this.route.includes('environment')) {
                this.Monitors = this.Info
            }
        },
        computed: {

        },
    }
</script>
<style lang="scss">
    .controlDialog{
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
            padding: rem(10) rem(20);
            text-align: left;
            border-bottom: 1px solid #ccc;
        }
        .el-dialog__title{
            font-size: rem(16);
        }
        .el-dialog__headerbtn {
            top: rem(12);
            i{
                font-size: rem(20);
            }
        }
        .el-dialog__body{
            padding: rem(10) rem(20);
            box-sizing: border-box;
            font-size: rem(14);
            min-height: rem(150);
        }
        .el-input__prefix {
            left: rem(135);
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
        .el-date-editor,.el-input,.el-input--prefix,.el-input--suffix,.el-date-editor--date{
            margin-top: rem(-2);
        }
        .el-date-editor,.el-input,.el-input--prefix,.el-input--suffix,.el-date-editor--date .el-input__inner{
            border: none;
            height: rem(30);
            line-height: rem(30);
        }
        .el-date-editor,.el-input,.el-input--prefix,.el-input--suffix,.el-date-editor--date .el-input__icon{
            line-height: rem(30);
        }
        .el-select .el-input,.el-input--suffix{
            margin-top: rem(-3);
        }
        .data .el-input__inner{
            padding-left: rem(10);
        }
        .el-input__inner{
            border: none;
            height: rem(30);
            line-height: rem(30);
            font-size: rem(12);
            padding: 0;
            padding-left: rem(10);
        }
        .el-input{
            width: rem(160);
            padding-left: rem(5);
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .controlDialog{
        .card{
            width: 100%;
            height: 100%;
            .personCardContent ,.boatCardContent {
                width: 100%;
                height: 100%;
                position: relative;
                p{
                    margin-top: rem(8);
                    /*border-bottom: 1px solid #ccc;*/
                    font-size: rem(14);
                    line-height:rem(32) ;
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                        font-size: rem(12);
                        padding-left: rem(10);
                    }
                    span{
                        display: inline-block;
                        width: rem(180);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        line-height: rem(15);
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
                    i {
                        display: inline-block;
                        font-size: rem(16);
                        vertical-align: middle;
                        cursor: pointer;
                    }
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(3);
                        box-sizing: border-box;
                        border-radius: rem(5);
                    }
                }
                .person-driv{
                    display:none;
                }
                .ms{
                    span{
                        width:rem(66)
                    }
                    div{
                        width:70%
                    }
                }
                .textarea{
                    border-bottom: 1px solid transparent;
                }
                .basicType{
                    text-align: center;
                }
                .img{
                    width: rem(100);
                    height: rem(60);
                    position: absolute;
                    top: rem(0);
                    right: rem(-20);
                    background: #fff;
                    img{
                        width: rem(55);
                        height: rem(55);
                        display: inline-block;
                        border-radius: 50%;
                        margin-left: rem(18);
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
