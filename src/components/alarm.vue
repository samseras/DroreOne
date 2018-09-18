<template>
    <div class="alarm">
        <el-menu default-active="/deploy/lamppost-Dmis" router>
            <ScrollContainer>
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title"><img :src="item.icon" alt="">{{ item.title }}</template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
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
                items: [
                    {
                        icon: './../../static/img/alarm/alarmRule.svg',
                        index: '1',
                        title: '告警规则',
                        subs: [
                            {
                                icon: './../../static/img/alarm/alarmcolumnRule.svg',
                                index: '/alarm/alarmcolumn-Rule',
                                title: '报警柱'
                            },
                            {
                                icon: './../../static/img/alarm/firefightingRule.svg',
                                index: '/alarm/firefighting-Rule',
                                title: '消防'
                            },
                            {
                                icon: './../../static/img/alarm/crossborderRule.svg',
                                index: '/alarm/crossborder-Rule',
                                title: '越界'
                            },
                            {
                                icon: './../../static/img/alarm/speedingRule.svg',
                                index: '/alarm/speeding-Rule',
                                title: '超速'
                            },
                            {
                                icon: './../../static/img/alarm/offtrackRule.svg',
                                index: '/alarm/offtrack-Rule',
                                title: '偏离轨迹'
                            },
                            {
                                icon: './../../static/img/alarm/overlimitRule.svg',
                                index: '/alarm/overlimit-Rule',
                                title: '客流量超限'
                            },
                            {
                                icon: './../../static/img/alarm/waterlevelRule.svg',
                                index: '/alarm/waterlevel-Rule',
                                title: '水位'
                            },
                            {
                                icon: './../../static/img/alarm/conditionRule.svg',
                                index: '/alarm/condition-Rule',
                                title: '环境'
                            }


                        ]
                    },
                    {
                        icon: './../../static/img/alarm/alarmEvent.svg',
                        index: '/alarm/warning-Event',
                        title: '告警事件'
                    },
                    {
                        icon: './../../static/img/alarm/patrolAlarm.svg',
                        index: '/alarm/patrol-Event',
                        title: '巡检事件'
                    }
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
    .alarm .el-submenu .el-menu-item{
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
    .alarm .el-submenu__title{
        img{
            width: rem(25);
            height: rem(25);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(10);
        }
    }
    .alarm .el-menu-item{
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
    .alarm .el-menu .el-menu--inline{
        width: 100%;
        background: #eee;
        box-sizing: border-box;
        text-align: left;
        /*padding-left: rem(8);*/
        font-size: rem(14);
    }
</style>
<style lang="scss"  type="text/scss" scoped>
    .alarm{
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
