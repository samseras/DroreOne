<template>
    <div class="person">
        <div class="pro_menu">
            <div class="pro_title">
                <img src="" alt="">人员管理平台
            </div>
            <div class="pro_router">
                <!--<router-link to="/basic-property" :class="isActive? 'active' : ''">设施类型</router-link>-->
                <!--<span class="line">|</span>-->
                <!--<router-link to="/hard-property" :class="isActive? '' : 'active'">设备类型</router-link>-->
            </div>
        </div>
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
                    title: '人员类型',
                },
                {
                    icon: 'el-icon-setting',
                    index: '2',
                    title: '人员信息',
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


<style lang="scss" type="text/scss" scoped>
    .person {
        width: 100%;
        height: 100%;
        .pro_menu {
            width: 100%;
            height: rem(40);
            color: #fff;
            line-height: rem(40);
            box-sizing: border-box;
            display: flex;
            div {
                display: inline-block;
            }
            .pro_title {
                width: rem(200);
                text-align: center;
                background: #2E3D5F;
                img{
                    display: inline-block;
                    width: rem(20);
                    height: rem(20);
                    vertical-align: middle;
                    background: red;
                    margin-left: rem(-35);
                    margin-right: rem(5);
                }
            }
            .pro_router{
                flex: 1;
                background: #203f70;
                padding: 0 rem(15);
                box-sizing: border-box;
                a{
                    color: #fff;
                    margin-right: rem(10);
                }
                .active{
                    color: #0086b3;
                }
                span{
                    color: #2c3b47;
                    margin-right: rem(10);
                }
            }
        }
        .pro_content{
            width: 100%;
            height: calc(100% - 2.5rem);
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
    }
</style>
