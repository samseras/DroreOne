<template>
    <div class="hardwareMenu">
        <el-menu default-active="/hard-property"
                 text-color="#fff"
                 active-text-color="#ffd04b" router>

            <ScrollContainer>
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title">
                                <img :src="item.icon" alt="">{{ item.title }}
                            </template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" v-if="subItem.enable">
                                <img :src="subItem.icon" alt="">
                                {{ subItem.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-if="!item.subs && getUserRole === 'ADMIN'">
                        <el-menu-item :index="item.index">
                            <img :src="item.icon" alt="">{{ item.title }}
                        </el-menu-item>
                    </template>
                </template>
            </ScrollContainer>
        </el-menu>

        <div class="content">
            <ScrollContainer>
                <router-view v-if="isRouterAlive"></router-view>
            </ScrollContainer>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import { mapGetters, mapActions} from 'vuex'
    import _ from 'lodash'
    export default {
        name: "hard-ware-menu",
        provide(){
            return {
                reload:this.reload
            }
        },
        data () {
            return{
                isRouterAlive:true,
                items: [
                    {
                        icon: './../../../static/img/hardwareType.svg',
                        index: '/hard-property/deviceType' ,
                        title: '设备类型',
                    },
                    {
                        icon: './../../../static/img/hardwareType.svg',
                        index:'1' ,
                        title: '设备型号',
                         subs: []
                    },
                    {
                        icon: './../../../static/img/hardwareInfo.svg',
                        index: '2',
                        title: '设备信息',
                        subs: []
                    }
                ],
                deviceType: [
                    {
                        icon:'./../../../static/img/camera.svg',
                        index: '/hard-property/cameraType',
                        title: '摄像头'
                    },
                    {
                        icon:'./../../../static/img/wifi.svg',
                        index: '/hard-property/wifitype',
                        title: 'WIFI'
                    },
                    {
                        icon:'./../../../static/img/broadcast.svg',
                        index:  '/hard-property/broadcastType',
                        title: '广播'
                    },
                    {
                        icon:'./../../../static/img/led.svg',
                        index: '/hard-property/ledType',
                        title: 'LED大屏'
                    },
                    {
                        icon:'./../../../static/img/detection.svg',
                        index:'/hard-property/monitorType',
                        title:'传感器'
                    },
                    {
                        icon:'./../../../static/img/machine.svg',
                        index:'/hard-property/gateType',
                        title:'闸机'
                    },
                    {
                        icon:'./../../../static/img/light.svg',
                        index:'/hard-property/lightType',
                        title:'路灯'
                    },
                    {
                        icon:'./../../../static/img/wring.svg',
                        index:'/hard-property/policeType',
                        title:'报警柱'
                    },
                    {
                        icon:'./../../../static/img/gps.svg',
                        index:'/hard-property/gpsType',
                        title:'GPS'
                    },

                ],
                deviceInfo: [
                    {
                        icon:'./../../../static/img/camera.svg',
                        index: '/hard-property/camera-Hware',
                        title: '摄像头'
                    },
                    {
                        icon:'./../../../static/img/broadcast.svg',
                        index: '/hard-property/broadcast-Hware',
                        title: '广播'
                    },
                    {
                        icon:'./../../../static/img/detection.svg',
                        index: '/hard-property/monitors-Hware',
                        title: '环境监测传感器'
                    },
                    {
                        icon:'./../../../static/img/wring.svg',
                        index: '/hard-property/police-Hware',
                        title: '报警柱传感器'
                    },
                    {
                        icon:'./../../../static/img/led.svg',
                        index: '/hard-property/led-Hware',
                        title: 'LED大屏'
                    },
                    {
                        icon:'./../../../static/img/wifi.svg',
                        index: '/hard-property/wifi-Hware',
                        title: 'WIFI'
                    },
                    {
                        icon:'./../../../static/img/machine.svg',
                        index: '/hard-property/gate-Hware',
                        title: '闸机'
                    },
                    {
                        icon:'./../../../static/img/light.svg',
                        index: '/hard-property/lampLight-Hware',
                        title: '路灯'
                    },
                ],
            }
        },
        methods: {
            ...mapActions(['getDeviceType']),
            reload(){
                this.isRouterAlive = false
                this.$nextTick(()=>{
                        this.isRouterAlive = true
                })
            }
        },
        created() {
          this.getDeviceType()
            // if (this.getDeviceTypeMenu.length > 0) {
            //     let route = ''
            //     this.deviceInfo.forEach(item => {
            //         if (item.title.includes(this.getDeviceTypeMenu[0].name)) {
            //             route = item.index
            //             return
            //         }
            //     })
            //     this.$router.push(route)
            // }
            if (this.getDeviceTypeMenu.length > 0) {
                let route = ''
                let enableState = false
                this.deviceInfo.forEach(item => {
                    this.getDeviceTypeMenu.forEach(item1 => {
                        if (item.title.includes(item1.name) && item1.enable) {
                            route = item.index
                            enableState = true
                            return
                        }
                    })
                })
                if (enableState){
                    this.$router.push(route)
                } else {
                    this.$router.push('/hard-property')
                }
            }
        },
        components: {
            ScrollContainer
        },
        watch: {
            getDeviceTypeMenu (){
                this.items[1].subs = []
                this.items[2].subs = []
                this.getDeviceTypeMenu.forEach(item => {
                    this.deviceInfo.forEach(item1 => {
                        if (item1.title.includes(item.name)) {
                            item = {...item,...item1}
                            this.items[2].subs.push(item)
                        }
                    })
                })
                this.getDeviceTypeMenu.forEach(item => {
                    this.deviceType.forEach(item2 => {
                        if (item2.title.includes(item.name)) {
                            item = {...item,...item2}
                            this.items[1].subs.push(item)
                        }
                    })
                })
                this.items[2].subs = _.uniqBy(this.items[2].subs, 'id')
            }
        },
        computed: {
            ...mapGetters(['getUserRole', 'getDeviceTypeMenu'])
        }

    }
</script>

<style lang="scss" type="text/scss">
    .hardwareMenu .el-submenu .el-menu-item:hover{
        background-color:#283446;
    }
    .hardwareMenu .el-submenu .el-menu-item {
        width: 100%;
        height: rem(40);
        line-height: rem(40);
        padding: rem(0) !important;
        padding-left: rem(20) !important;
        font-size: rem(14);
        color:#999ca2;
        background-color:#485462;
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
    .hardwareMenu .el-submenu__title{
        background-color:#434e5c;
        border-top: 1px solid #4e5b6b;
        color:#fff;
        img{
            width: rem(25);
            height: rem(25);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(10);
        }
    }
    .hardwareMenu .el-menu-item {
        width: 100%;
        height: rem(55);
        line-height: rem(55);
        border-bottom:1px solid #4e5b6b;
        img{
            width: rem(25);
            height: rem(25);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(10);
        }
    }

    .hardwareMenu .el-menu .el-menu--inline {
        width: 100%;
        background: #434e5c;
        box-sizing: border-box;
        text-align: left;
        /*padding-left: rem(8);*/
        font-size: rem(14);
    }
    .hardwareMenu .el-menu{
        background-color: #485462;
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
