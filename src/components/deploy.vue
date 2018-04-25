<template>
    <div class="deploy">
        <el-menu default-active="/deploy/lamppost-Dmis" router>
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
                        icon: 'el-icon-document',
                        index: '3',
                        title: '调度管理',
                        subs: [
                            {
                                index: '/deploy/broadcast-Dmis',
                                title: '广播'
                            },
                            {
                                index: '/deploy/lamppost-Dmis',
                                title: '路灯'
                            },
                            {
                                index: '/deploy/screen-Dmis',
                                title: 'LED'
                            },
                            {
                                index: '/deploy/purifier-Dmis',
                                title: '保洁'
                            },
                            {
                                index: '/deploy/security-Dmis',
                                title: '巡更路线'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '4',
                        title: '调度记录',
                        subs: [
                            {
                                index: '/deploy/dispatch-Record',
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
