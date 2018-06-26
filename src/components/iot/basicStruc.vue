<template>
    <div class="home">
        <div class="pro_menu">
            <div class="pro_title">
                <!--<img src="../../../static/img/logo.svg" alt="">-->
                <span>卓锐IOT平台</span>
            </div>
            <div class="search-head">
                <el-form :inline="true"  class="demo-form-inline">
                    <el-form-item label="">
                        <el-input  placeholder="search..." ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onHeadSubmit"><i class="el-icon-search"></i></el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="func">
                <el-menu  class="el-menu-demo" mode="horizontal" default-active="sss" >
                    <el-submenu index="" class="bell">
                        <template slot="title">
                            <el-badge :value="12" class="item">
                                <img src="../../../static/img/iot/lingdang.png" alt="">
                            </el-badge>
                        </template>
                        <el-menu-item v-for="(item,index) in msgPushData" index="" class="">
                            <span >{{item.from}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="itemtime">{{item.time}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="pro_router">
                <div class="func">
                    <el-menu  class="el-menu-demo" mode="horizontal" router>
                        <el-submenu index="2">
                            <template slot="title">
                                <img src="../../../static/img/iot/portrait.jpg" alt="" class="portrait">
                                <span class="Admin">Drore</span>
                            </template>
                            <el-menu-item index="/droreone">返回主页</el-menu-item>
                            <el-menu-item @click="logout"index="/login">退出</el-menu-item>

                        </el-submenu>
                    </el-menu>
                </div>
            </div>
        </div>
        <div class="pro_content">
            <IotDeviceMenu></IotDeviceMenu>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import IotDeviceMenu from '@/components/iot/iotDeviceMenu'
    export default {
        name: "home",
        data() {
            return {
                isCollapse: false,
                items: [
                    {
                        icon: '../../../static/img/iot/iot-index.svg',
                        index: '/basicStruc/iotHome',
                        title: '首页'
                    },
                    {
                        icon: '../../../static/img/iot/iot-equipment.svg',
                        index:'1',
                        title: 'IoT设备',
                        subs:[]
                    },
                    {
                        icon: '../../../static/img/iot/iot-system-manage.svg',
                        index: '2',
                        title: '系统监控',
                        subs: [
                            {
                                isShow:true,
                                icon:'../../../static/img/camera.svg',
                                index: '/basicStruc/iotLog/systemLog',
                                title: '系统日志'
                            },
                            {
                                isShow:true,
                                icon:'../../../static/img/broadcast.svg',
                                index: '/basicStruc/iotLog/nowStatus',
                                title: '实时状态'
                            }
                        ]
                    }
                ],
                route: '',
                msgPushData: [
                    {
                        from: '监控系统',
                        time: '2018-5-1',
                        message: '监控设备已离线/上线！'
                    },
                    {
                        from: '报警系统',
                        time: '2018-6-1',
                        message: '报警设备已离线/上线！'
                    },
                    {
                        from: '安防系统',
                        time: '2018-7-1',
                        message: '安防设备已离线/上线！'
                    },
                    {
                        from: '检测系统',
                        time: '2018-8-1',
                        message: '检测设备已离线/上线！'
                    },
                    {
                        from: '配置系统',
                        time: '2018-9-1',
                        message: '配置设备已离线/上线！'
                    }
                ]
            }
        },
        created () {
            this.route = this.$route.path;
        },
        watch: {
            '$route'(){
                this.route = this.$route.path
            }
        },
        components: {
            ScrollContainer,
            IotDeviceMenu

        },
        methods:{
            onHeadSubmit(){
                console.log('11111');
            },
            logout() {
                this.$router.push('/login')
            },

        }
    }
</script>
<style lang="scss" type="text/scss">
    .home{
        .bell{
            .item{
                top:rem(3.2)
            }
        }
        .search-head{
            .el-input__inner{
                border:1px solid transparent;
            }
            .el-form--inline .el-form-item__content{
                vertical-align: middle;
            }
            .el-button--primary{
                color:#606266;
                background-color:transparent ;
                border-color: transparent;
            }
            //margin-right: 52%;
            margin-right: 59%;
            .el-form-item__content{
                line-height:rem(60);
            }
        }
        .el-menu--horizontal>.bell .el-submenu__icon-arrow{
            display:none
        }
        .el-submenu__title{
            padding:0 rem(7);
        }
        .el-badge__content {
            background-color: #14B9D6;
            border-radius: rem(16);
            color: #fff;
            font-size: rem(10);
            height: rem(16);
            width: rem(17.6);
            line-height: rem(17);
            padding:0;
        }
        .el-menu--horizontal>.el-submenu .el-submenu__title{
            line-height:rem(57.6);
        }
        .el-badge__content.is-fixed{
            top: rem(16);
            right: rem(12.8);
        };
        .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
            background-color: transparent;
        }
        .func .el-submenu__title img{
            display: inline-block;
            width: rem(24);
            height: rem(24);
            vertical-align: middle;
            margin-top: rem(-4);
            margin-left: rem(5);
        }
        .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
            border-bottom-color: transparent;
        }
        .el-submenu.is-active .el-submenu__title{
            border-bottom-color: transparent;
        }
    }

</style>
<style lang="scss" type="text/scss" scoped>
    .home {
        width: 100%;
        height: 100%;
        .pro_menu {
            width: 100%;
            height: rem(60);
            color: #fff;
            line-height: rem(60);
            box-sizing: border-box;
            display: flex;
            /*.el-menu--popup{
                min-width:1rem;
                li{
                    min-width:1rem;
                }
            }*/
            div {
                display: inline-block;
                /* background-color:#2D3E50;*/
            }
            .pro_title {
                width: 15%;
                text-align: center;
                background: #14B9D6;
                font-family: '微软雅黑';
                img{
                    display: inline-block;
                    width: rem(140);
                    height: rem(35);
                    vertical-align: middle;
                    margin-left: rem(-35);
                    margin-right: rem(-25);
                }
            }
            .pro_router{
                /*flex: 1;*/
                /*background: #2D3E50;*/
                /*padding: 0 rem(35);*/
                box-sizing: border-box;
                .portrait{
                    width: rem(36);
                    height: rem(36);
                    border-radius: rem(16);

                }
                a{
                    display: inline-block;
                    color: #fff;
                    padding: 0 rem(15);
                }
                .active{
                    color: #74cef2;
                }
                .func{
                    display: inline-block;
                    float: right;
                    margin-right: rem(20);

                }
            }
        }
        .pro_content{
            width: 100%;
            height: calc(100% - 3.75rem);
            display: flex;
            .el-menu {
                width: 15%;
            }
            .content {
                flex: 1;
                height: 100%;
                padding: 0;
            }
        }
    }
</style>
