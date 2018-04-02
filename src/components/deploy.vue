<template>
    <div class="deploy">
        <el-menu default-active="/deploy/person-deploy" router>
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
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    export default{
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/deploy/person-deploy',
                        title: '基础信息',
                        subs: [
                            {
                                index: '/deploy/person-deploy',
                                title: '人员信息'
                            },
                            {
                                index: '/deploy/boat-deploy',
                                title: '车船'
                            },
                            {
                                index: '/deploy/roat-deploy',
                                title: '路网'
                            },
                            {
                                index: '/deploy/area-deploy',
                                title: '片区'
                            },
                            {
                                index: '/deploy/toilet-deploy',
                                title: '卫生间'
                            },
                            {
                                index: '/deploy/park-deploy',
                                title: '停车场'
                            },
                            {
                                index: '/deploy/shop-deploy',
                                title: '商圈'
                            },
                            {
                                index: '/deploy/scenic-deploy',
                                title: '景点'
                            },

                            {
                                index: '/deploy/trash-deploy',
                                title: '垃圾桶'
                            },
                            {
                                index: '/deploy/indicator-deploy',
                                title: '指示牌'
                            },
                            {
                                index: '/deploy/other-deploy',
                                title: '其他'
                            },

                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '2',
                        title: '硬件信息',
                        subs: [
                            {
                                index: '/deploy/camera-Hware',
                                title: '摄像头'
                            },
                            {
                                index: '/deploy/broadcast-Hware',
                                title: '广播'
                            },
                            {
                                index: '/deploy/monitors-Hware',
                                title: '环境监测传感器'
                            },
                            {
                                index: '/deploy/led-Hware',
                                title: 'LED大屏'
                            },
                            {
                                index: '/deploy/wifi-Hware',
                                title: 'WIFI'
                            },
                            {
                                index: '/deploy/voice-Hware',
                                title: '音响'
                            },
                            {
                                index: '/deploy/gate-Hware',
                                title: '闸机'
                            },
                            {
                                index: '/deploy/lampLight-Hware',
                                title: '灯光'
                            },

                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '3',
                        title: '调度管理',
                        subs: [
                            {
                                index: '/deploy/hardware-Dmis',
                                title: '硬件调度'
                            },
                            {
                                index: '/deploy/personnel-Dmis',
                                title: '人员调度'
                            },
                            {
                                index: '/deploy/stat-Dmis',
                                title: '调度统计'
                            }
                        ]
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace();
            }
        },
        components: {
            ScrollContainer
        }
    }

</script>

<style lang="scss">
    .deploy .el-submenu .el-menu-item{
        width: 100%;
        height: rem(30);
        line-height: rem(30);
        padding: rem(0)!important;
        padding-left: rem(20)!important;
        font-size: rem(14);
        img{
            display: inline-block;
            width: rem(20);
            height: rem(20);
            vertical-align: middle;
            background: red;
            margin-right: rem(5);
        }
    }
    .deploy .el-menu-item{
        width: 100%;
        height: rem(30);
        line-height: rem(30);
        /*border-bottom: 1px solid #ccc;*/
    }
    .deploy .el-menu .el-menu--inline{
        width: 100%;
        background: #eee;
        box-sizing: border-box;
        text-align: left;
        /*padding-left: rem(8);*/
        font-size: rem(14);
    }
</style>
<style lang="scss"  type="text/scss" scoped>
    .deploy{
        display:flex;
        width:100%;
        height: 100%;
        .el-menu{
            width: rem(200);
        }
        .content{
            flex: 1;
            height: 100%;
        }

    }
</style>
