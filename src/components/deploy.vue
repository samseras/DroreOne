<template>
    <div class="deploy">
        <el-menu :default-active="route" router>
            <ScrollContainer>
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title"><img :src="item.icon" alt="">{{ item.title }}</template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index"
                            :class="subItem.index === route?'active':''">
                                <img :src="subItem.icon" alt="">
                                {{ subItem.title }}
                            </el-menu-item>
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
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    export default{
        data() {
            return {
                route: this.$route.path,
                items: [
                    {
                        icon: './../../static/img/dmis.svg',
                        index: '3',
                        title: '调度管理',
                        subs: [
                            // {
                            //     icon: './../../static/img/broadcast.svg',
                            //     index: '/deploy/broadcast-Dmis',
                            //     title: '广播'
                            // },
                            // {
                            //     icon: './../../static/img/light.svg',
                            //     index: '/deploy/lamppost-Dmis',
                            //     title: '路灯'
                            // },
                            // {
                            //     icon: './../../static/img/led.svg',
                            //     index: '/deploy/screen-Dmis',
                            //     title: 'LED'
                            // },
                            // {
                            //     icon: './../../static/img/clearer.svg',
                            //     index: '/deploy/purifier-Dmis',
                            //     title: '保洁'
                            // },
                            {
                                icon: './../../static/img/security.svg',
                                index: '/deploy/security-Dmis',
                                title: '巡检计划'
                            },
                            {
                                icon: './../../static/img/boatCar.svg',
                                index: '/deploy/transport-Dmis',
                                title: '车船调度'
                            }
                        ]
                    },
                     {
                         icon: './../../static/img/record.svg',
                         index: '4',
                         title: '调度统计',
                         subs: [
//                             {
//                                 index: '/deploy/dispatch-Record',
//                                 title: '调度统计'
//                             }
                             {
                                 icon: './../../static/img/securityPunch.svg',
                                 index: '/deploy/punch-Record',
                                 title: '巡更打卡'
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
        created () {
            // let route = this.$route.path
            // console.log(route, 'opopopopopopopo')
            // if (route) {
            //
            // }
        },
        watch: {
          '$route' () {
              this.route = this.$route.path
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
            width: rem(18);
            height: rem(18);
            vertical-align: middle;
            margin-right: rem(5);
            margin-left: rem(5);
            margin-top: rem(-4);
        }
    }
    .deploy .el-submenu__title{
        img{
            width: rem(25);
            height: rem(25);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(10);
        }
    }
    .deploy .el-menu-item{
        width: 100%;
        height: rem(30);
        line-height: rem(30);
        /*border-bottom: 1px solid #ccc;*/
        img{
            width: rem(25);
            height: rem(25);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(10);
        }
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
        .active{
            /*background: #0086b3;*/
            color: #409EFF;
        }

    }
</style>
