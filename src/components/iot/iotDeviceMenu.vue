
<template>
    <div class="iotDeviceMenu">
        <el-menu default-active=""
                 text-color="#fff"
                 :collapse="isCollapse"
                 active-text-color="#ffd04b" router>
            <ScrollContainer>
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title">
                                <img :src="item.icon" alt="">{{ item.title }}
                            </template>
                            <template v-for="(subItem,i) in item.subs" >
                                <template v-if="subItem.isShow===true">
                                    <template v-if="subItem.sonSubs">
                                        <el-submenu   :index="subItem.index">
                                            <template slot="title">
                                                <img :src="'../../../static/img/iot/'+subItem.index+'.svg'" alt="">{{ subItem.title }}
                                            </template>
                                            <el-menu-item v-for="(sonSubItem,r) in subItem.sonSubs"  :index="'/basicStruc'+sonSubItem.index">
                                                <img :src="'../../../static/img/iot/'+sonSubItem.mark+'.svg'" alt="">{{sonSubItem.title}}
                                            </el-menu-item>
                                        </el-submenu>
                                    </template>
                                    <template v-else>
                                        <el-menu-item :index="subItem.index">
                                            <img :src="subItem.icon" alt="">{{ subItem.title }}
                                        </el-menu-item>
                                    </template>
                                </template>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index">
                            <img :src="item.icon" alt="">{{ item.title }}
                        </el-menu-item>
                    </template>
                </template>
            </ScrollContainer>
        </el-menu>
        <div class="content">
            <ScrollContainer>
                <router-view></router-view>
            </ScrollContainer>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    export default {
        name: "iot-device-menu",
        data () {
            return{
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
                        index: '/basicStruc/iotLog/systemLog',
                        title: '系统日志',
                        /*subs: [
                            {
                                isShow:true,
                                icon:'../../../static/img/camera.svg',
                                index: '',
                                title: '系统日志'
                            },
                            {
                                isShow:true,
                                icon:'../../../static/img/broadcast.svg',
                                index: '/basicStruc/iotLog/nowStatus',
                                title: '实时状态'
                            }
                        ]*/
                    }
                ]
            }
        },
        components: {
            ScrollContainer
        },
        methods:{
            getIotMenu(){
                api.iotHome.getIotMenu().then(res=>{
                    console.log(res,'这是传回来的Iotmenu菜单')
                    this.items[1].subs=res;
                }).catch(err=>{
                    console.log(err,'失败')
                })
            }
        },
        created(){
            this.getIotMenu();
        }

    }
</script>

<style lang="scss" type="text/scss">
    .iotDeviceMenu .el-submenu .el-menu-item:hover{
        background-color:#808080;
    }
    .iotDeviceMenu .el-submenu .el-menu-item {
        width: 100%;
        height: rem(40);
        line-height: rem(40);
        padding: rem(0) !important;
        padding-left: rem(20) !important;
        font-size: rem(14);
        color:#999ca2;
        background-color:#485462;
        text-align:center;
        img{
            display: inline-block;
            width: rem(18);
            height: rem(18);
            vertical-align: middle;
            margin-right: rem(5);
            margin-left: rem(5);
            margin-top: rem(-4);

        }
    }
    .iotDeviceMenu .el-submenu__title{
        background-color:#434e5c;
        color:#fff;
        img{
            width: rem(25);
            height: rem(25);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(10);
        }
    }
    .iotDeviceMenu .el-menu-item {
        width: 100%;
        height: rem(55);
        line-height: rem(55);
        border-bottom:1px solid #4e5b6b;
        background-color:#434e5c;
        img{
            width: rem(25);
            height: rem(25);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(10);
        }
    }

    .iotDeviceMenu .el-menu .el-menu--inline {
        width: 100%;
        background: #434e5c;
        box-sizing: border-box;
        text-align: left;
        /*padding-left: rem(8);*/
        font-size: rem(14);
    }
</style>
<style scoped type="text/scss" lang="scss">
    .iotDeviceMenu{
        width: 100% ;
        height: 100%;
        display: flex;
        .el-menu {
            width: 15%;
        }
        .content {
            flex: 1;
            height: 100%;
            padding: 0;
            background-color:#eee;
        }
    }
</style>
