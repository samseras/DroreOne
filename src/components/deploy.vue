<template>
    <div class="deploy">
        <el-menu default-active="/deploy/basics" router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <div class="content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/deploy/basics',
                        title: '基础信息'
                    },
                    {
                        icon: 'el-icon-date',
                        index: '2',
                        title: '硬件信息',
                        subs: [
                            {
                                index: '/deploy/camera',
                                title: '摄像头设置'
                            },
                            {
                                index: '/deploy/broadcast',
                                title: '广播配置'
                            },
                            {
                                index: '/deploy/monitoring',
                                title: '环境监测传感器'
                            },
                            {
                                index: '/deploy/street',
                                title: '路灯'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '3',
                        title: '调度管理',
                        subs: [
                            {
                                index: '/deploy/boatcart',
                                title: '车船管理'
                            },
                            {
                                index: '/deploy/watch',
                                title: '巡更管理'
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
        }
    }

</script>
<style lang="scss"  type="text/scss" scoped>
    .deploy{
        display:flex;
        position:absolute;
        width:100%;
        left:0;
        top:rem(70);
        bottom:0;
        ul{
            height:100%;
            width:15%;
        }
        .content{
            background: none repeat scroll 0 0 #fff;
            width:85%;
            padding:rem(40);
            box-sizing: border-box;
            overflow-y: scroll;
        }

        /*.el-row{*/
        /*height:100%;*/
        /*.el-col:first-child{*/
        /*height:100%;*/
        /*background-color:#f2f2f2;*/
        /*margin-right:rem(30);*/
        /*.el-menu{*/
        /*border:none;*/
        /*li{*/
        /*div{*/
        /*i{*/
        /*font-size: rem(26);*/
        /*padding-right:rem(20);*/
        /*}*/
        /*span{*/
        /*font-size: rem(18);*/
        /*color:#9b9b9b;*/
        /*}*/
        /*}*/
        /*i{*/
        /*font-size: rem(26);*/
        /*padding-right: rem(20);*/
        /*}*/
        /*span{*/
        /*font-size: rem(18);*/
        /*color:#9b9b9b;*/
        /*}*/
        /*}*/
        /*}*/
        /*}*/
        /*}*/
    }
</style>
