<template>
    <div class="person">
        <div class="pro_content">
            <el-menu default-active="/person/personType" router>
                <ScrollContainer>
                    <template v-for="item in items">
                        <template v-if="item.subs">
                            <el-submenu :index="item.index">
                                <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                                <el-menu-item v-for="(subItem,i) in getJobTypeList" :key="i" :index="'/person/' + subItem.id">
                                    <img src="" alt="">
                                    {{ subItem.name }}
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
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "property",
        data() {
            return {
                isActive: false,
                items: [
                {
                    icon: 'el-icon-setting',
                    index: '/person/personType',
                    title: '职业',
                },
                {
                    icon: 'el-icon-setting',
                    index: '2',
                    title: '人员',
                    subs: []
                },
            ]
            }
        },
        watch: {
            '$route'(){
            }
        },
        methods: {
            ...mapActions([
                'getJobType'
            ])
        },
        async created () {
            this.getJobType()
        },
        components: {
            ScrollContainer
        },
        computed:{
            ...mapGetters([
                'getJobTypeList'
            ])
        }
    }
</script>

<style lang="scss">
    .person .el-submenu .el-menu-item {
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

    .person .el-menu-item {
        width: 100%;
        height: rem(55);
        line-height: rem(55);
        border-bottom: 1px solid #e0e0e0;
    }

    .person .el-menu .el-menu--inline {
        width: 100%;
        background: #f2f2f2;
        box-sizing: border-box;
        text-align: left;
        font-size: rem(14);
    }
    .person .el-submenu{
        border-bottom: 1px solid #e0e0e0;
    }
</style>
<style lang="scss" type="text/scss" scoped>
    .person {
        width: 100%;
        height: 100%;
        .pro_content{
            width: 100%;
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
    }
</style>
