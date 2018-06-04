<template>
    <div class="device-card">
        <el-row class="myrow">
            <el-col :span="8" v-for="(o, index) in 11" :key="o"   class="mycol">
                <el-card   class="mycard">
                    <img src="../../../static/img/iot/shebeitest.png" class="image">
                    <div style="padding: 14px;">
                        <span>XX设备</span>
                        <div class="bottom ">
                            <time class="time">{{ currentDate }}</time>

                        </div>
                        <div class="more">
                            <template>
                                <el-button type="text" @click="outerVisible = true">更多</el-button>

                                <el-dialog title="" :visible.sync="outerVisible">
                                    <div class="top-part clearfix">
                                        <div class="equipment">
                                            <div class="small-title clearfix">
                                                <div class="photo">
                                                    <img src="../../../static/img/iot/shebeitest.png" alt="">
                                                </div>
                                                <div class="name">
                                                    <h2>xx设备</h2>
                                                    <h5>xx景区</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="data-flow">

                                        </div>
                                    </div>


                                    <el-dialog
                                        width="30%"
                                        title="内层 Dialog"
                                        :visible.sync="innerVisible"
                                        append-to-body>
                                    </el-dialog>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="outerVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
                                    </div>
                                </el-dialog>
                            </template>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>

    export default {
        name: "deviceCard",
        data() {
            return {
                route: '',
                currentDate: new Date(),
                outerVisible: false,
                innerVisible: false
            }
        },
        created () {
            this.route = this.$route.path
        },
        watch: {
            '$route'(){
                this.route = this.$route.path
            }
        },
        components: {

        },
        methods:{

        }
    }
</script>
<style lang="scss" type="text/scss">
    .device-card{
        .myrow{
            .mycol{
                width:32.3333%;
                padding-top:1rem;
                margin-right:1%;

            }
        }
        .time {
            font-size: 13px;
            color: #999;
        }
        .bottom {
            margin-top: 13px;
            line-height: 12px;
        }
        .button {
            padding: 0;
            /*float: right;*/
        }
        .image {
            width: 100%;
            display: block;
        }
        .more{
            padding-top:1rem;
            padding-bottom:1rem;
            .el-dialog{
                width:78%;
                background-color:#eee;
            }
            .top-part{
                width:100%;
                height:300px;
                border:1px solid red;
                .equipment{
                    float:left;
                    width:30%;
                    border:1px solid greenyellow;
                    height:300px;
                    background-color: #fff;
                    .small-title{
                        padding-bottom:1rem;
                        border-bottom:1px solid #eee;
                        .photo{
                            width:45%;
                            float:left;
                            height:5rem;

                            img{
                                width:100%;
                                height:100%;
                                border-radius:6px;
                            }
                        }
                        .name{
                            width: 51%;
                            float: right;
                            padding-left: 4%;
                            padding-top: 1rem;
                            h2{
                                font-weight:600;
                                font-size:1rem;
                                margin-bottom: 0.5rem;
                            }
                        }
                    }
                }
                .data-flow{
                    width:62%;
                    float:right;
                    border:1px solid greenyellow;
                    height:300px;
                }
            }
        }

    }
</style>
