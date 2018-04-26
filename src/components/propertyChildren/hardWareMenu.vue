<template>
    <div class="hardwareMenu">
        <el-menu default-active="/hard-property/hardwaretype" router>
            <ScrollContainer>
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                                <img src="" alt="">
                                {{ subItem.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index">
                            <i :class="item.icon"></i>{{ item.title }}
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
    export default {
        name: "hard-ware-menu",
        data () {
            return{
                items: [
                    {
                        icon: 'el-icon-setting',
                        index:'1' ,
                        title: '设备型号',
                         subs: [
                             {
                                index: '/hard-property/cameraType',
                                 title: '摄像头'
                             },
                             {
                                 index: '/hard-property/wifitype',
                                 title: 'WIFI'
                             },
                             {
                                 index:  '/hard-property/broadcastType',
                                 title: '广 播'
                             },
                             {
                                 index: '/hard-property/ledType',
                                 title: 'LED'
                             },
                             {
                                index:'/hard-property/monitorType',
                                title:'传感器'
                             },
                             {
                                 index:'/hard-property/gateType',
                                 title:'闸 机'
                             },
                             {
                                 index:'/hard-property/lightType',
                                 title:'路 灯'
                             },
                             {
                                 index:'/hard-property/policeType',
                                 title:'报警柱'
                             },
                             {
                                 index:'/hard-property/gpsType',
                                 title:'GPS'
                             },

                         ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '2',
                        title: '设备信息',
                        subs: [
                            {
                                index: '/hard-property/camera-Hware',
                                title: '摄像头'
                            },
                            {
                                index: '/hard-property/broadcast-Hware',
                                title: '广播'
                            },
                            {
                                index: '/hard-property/monitors-Hware',
                                title: '环境监测传感器'
                            },
                            {
                                index: '/hard-property/police-Hware',
                                title: '报警柱传感器'
                            },
                            {
                                index: '/hard-property/led-Hware',
                                title: 'LED大屏'
                            },
                            {
                                index: '/hard-property/wifi-Hware',
                                title: 'WIFI'
                            },
                            {
                                index: '/hard-property/voice-Hware',
                                title: '音响'
                            },
                            {
                                index: '/hard-property/gate-Hware',
                                title: '闸机'
                            },
                            {
                                index: '/hard-property/lampLight-Hware',
                                title: '灯光'
                            },

                        ]
                    }
                ]
            }
        },
        components: {
            ScrollContainer
        }

    }
</script>

<style lang="scss">
    .hardwareMenu .el-submenu .el-menu-item {
        width: 100%;
        height: rem(30);
        line-height: rem(30);
        padding: rem(0) !important;
        padding-left: rem(20) !important;
        font-size: rem(14);
        img {
            display: inline-block;
            width: rem(20);
            height: rem(20);
            vertical-align: middle;
            background: red;
            margin-right: rem(5);
        }
    }

    .hardwareMenu .el-menu-item {
        width: 100%;
        height: rem(30);
        line-height: rem(30);
        /*border-bottom: 1px solid #ccc;*/
    }

    .hardwareMenu .el-menu .el-menu--inline {
        width: 100%;
        background: #eee;
        box-sizing: border-box;
        text-align: left;
        /*padding-left: rem(8);*/
        font-size: rem(14);
    }
</style>
<style scoped type="text/scss" lang="scss">
    .hardwareMenu{
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
        }
    }
</style>
