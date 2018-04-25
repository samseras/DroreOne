<template>
    <div class="basicMenu">
        <el-menu default-active="/basic-property/basictype" router>
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
        name: "basic-menu",
        data () {
            return{
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/basic-property/basictype',
                        title: '设施类型',
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '2',
                        title: '设施信息',
                        subs: [
                            // {
                            //     index: '/basic-property/person-deploy',
                            //     title: '人员信息'
                            // },
                            {
                                index: '/basic-property/boat-deploy',
                                title: '车船'
                            },
                            {
                                index: '/basic-property/roat-deploy',
                                title: '路网'
                            },
                            {
                                index: '/basic-property/area-deploy',
                                title: '片区'
                            },
                            {
                                index: '/basic-property/toilet-deploy',
                                title: '卫生间'
                            },
                            {
                                index: '/basic-property/park-deploy',
                                title: '停车场'
                            },
                            {
                                index: '/basic-property/shop-deploy',
                                title: '商圈'
                            },
                            {
                                index: '/basic-property/scenic-deploy',
                                title: '景点'
                            },

                            {
                                index: '/basic-property/trash-deploy',
                                title: '垃圾桶'
                            },
                            {
                                index: '/basic-property/indicator-deploy',
                                title: '指示牌'
                            },
                            {
                                index: '/basic-property/other-deploy',
                                title: '其他'
                            },

                        ]
                    },
                    // {
                    //     icon: 'el-icon-date',
                    //     index: '2',
                    //     title: '硬件信息',
                    //     subs: [
                    //         {
                    //             index: '/property/camera-Hware',
                    //             title: '摄像头'
                    //         },
                    //         {
                    //             index: '/property/broadcast-Hware',
                    //             title: '广播'
                    //         },
                    //         {
                    //             index: '/property/monitors-Hware',
                    //             title: '环境监测传感器'
                    //         },
                    //         {
                    //             index: '/property/police-Hware',
                    //             title: '报警柱传感器'
                    //         },
                    //         {
                    //             index: '/property/led-Hware',
                    //             title: 'LED大屏'
                    //         },
                    //         {
                    //             index: '/property/wifi-Hware',
                    //             title: 'WIFI'
                    //         },
                    //         {
                    //             index: '/property/voice-Hware',
                    //             title: '音响'
                    //         },
                    //         {
                    //             index: '/property/gate-Hware',
                    //             title: '闸机'
                    //         },
                    //         {
                    //             index: '/property/lampLight-Hware',
                    //             title: '灯光'
                    //         },
                    //
                    //     ]
                    // }
                ]
            }
        },
        components: {
            ScrollContainer
        }
    }
</script>

<style lang="scss">
    .basicMenu .el-submenu .el-menu-item {
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

    .basicMenu .el-menu-item {
        width: 100%;
        height: rem(30);
        line-height: rem(30);
        /*border-bottom: 1px solid #ccc;*/
    }

    .basicMenu .el-menu .el-menu--inline {
        width: 100%;
        background: #eee;
        box-sizing: border-box;
        text-align: left;
        /*padding-left: rem(8);*/
        font-size: rem(14);
    }
</style>
<style scoped type="text/scss" lang="scss">
    .basicMenu{
        width: 100% ;
        height: 100%;
        display: flex;
        .el-menu {
            width: rem(200);
        }
        .content {
            flex: 1;
            height: 100%;
            padding: 0;
        }
    }
</style>
