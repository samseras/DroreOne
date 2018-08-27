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
                <div class="personCardContent">
                    <p class="name">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：
                        {{this.Info.name}}
                    </p>
                    <p class="name">所属片区：
                        {{this.Info.regionName}}
                    </p>
                    <p class="name" v-if="wifiShow">当前连接数：
                        {{this.Info.currentConnections}}
                    </p>
                    <p class="name" v-if="wifiShow">上行速率：
                        {{this.Info.upRate}}
                    </p>
                    <p class="name" v-if="wifiShow">下行速率：
                        {{this.Info.downRate}}
                    </p>
                    <p class="name" v-if="facility">厂&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家：
                        {{this.Info.modelName}}
                    </p>
                    <p class="name">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：
                        {{this.Info.description}}
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
                wifiShow:false,
                facility:true,
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
            if(this.Info.type==="wifi"){
                this.wifiShow=true
            }
            if(this.Info.type==="卫生间"){
                this.Info.description=this.Info.toiletBean.description
                this.facility=false
            }
            if(this.Info.type==="停车场"){
                this.Info.description=this.Info.parkingBean.description
                this.facility=false
            }
            if(this.Info.type==="建筑"){
                this.Info.description=this.Info.building.description
                this.facility=false
            }
            if(this.Info.type==="商圈"){
                this.Info.description=this.Info.businessBean.description
                this.facility=false
            }
            if(this.Info.type==="景点"){
                this.Info.description=this.Info.scenicspotBean.description
                this.facility=false
            }
            if(this.Info.type==="垃圾桶"){
                this.Info.description=this.Info.dustbinBean.description
                this.facility=false
            }
            if(this.Info.type==="植物"){
                this.Info.description=this.Info.plant.description
                this.facility=false
            }
            if(this.Info.type==="指示牌"){
                this.Info.description=this.Info.signboardBean.description
                this.facility=false
            }
            if(this.Info.regionName==null){
                this.Info.regionName="未知片区设备"
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
                    text-align: left;
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
