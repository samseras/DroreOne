<template>
    <div class="buildingMenu">
        <el-menu default-active="/building/buildType" router>
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
        name: "building-menu",
        data () {
            return{
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/building/buildType',
                        title: '建筑类型',
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '2',
                        title: '建筑',
                        subs: [
                            {
                                index: '/building/landmarkBuild',
                                title: '地标型建筑'
                            },
                            {
                                index: '/building/serviceBuild',
                                title: '服务型建筑'
                            },

                        ]
                    },
                ]
            }
        },
        components: {
            ScrollContainer
        }
    }
</script>

<style lang="scss">
    .buildingMenu .el-submenu .el-menu-item {
        width: 100%;
        height: rem(40);
        line-height: rem(40);
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

    .buildingMenu .el-menu-item {
        width: 100%;
        height: rem(55);
        line-height: rem(55);
        border-bottom: 1px solid #e0e0e0;
    }

    .buildingMenu .el-menu .el-menu--inline {
        width: 100%;
        background: #f2f2f2;
        box-sizing: border-box;
        text-align: left;
        font-size: rem(14);
    }
    .buildingMenu .el-submenu{
        border-bottom: 1px solid #e0e0e0;
    }
</style>
<style scoped type="text/scss" lang="scss">
    .buildingMenu{
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
