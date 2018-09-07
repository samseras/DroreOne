<template>
    <div class="person">
        <div class="pro_content">
            <div class="menuList">
                <div class="userInfo">
                    <img :src="getUrl(getUserDetailMsg.iconId)" alt="" @error="imgError">
                    <p class="text">
                        您好{{getUserDetailMsg.cnName? getUserDetailMsg.cnName : getUserDetailMsg.name}}!欢迎登陆
                    </p>
                </div>
                <el-menu default-active='/person'router
                         text-color="#fff"
                         active-text-color="#ffd04b"
                         :default-openeds="openeds">
                    <ScrollContainer>
                        <template v-for="item in items">
                            <!--<template v-if="item.subs">-->
                                <!--<el-submenu :index="item.index">-->
                                    <!--<template slot="title"><img :src="item.icon" alt="">{{ item.title }}</template>-->
                                    <!--<el-menu-item v-for="(subItem,i) in getJobTypeList" :key="i" :index="'/person/' + subItem.id" v-if="subItem.enable">-->
                                        <!--<img :src="imgUrl(subItem.id)" alt="">-->
                                        <!--{{ subItem.name }}-->
                                    <!--</el-menu-item>-->
                                <!--</el-submenu>-->
                            <!--</template>-->
                            <template>
                                <el-menu-item :index="item.index">
                                    <img :src="item.icon" alt="">{{ item.title }}
                                </el-menu-item>
                            </template>
                        </template>
                    </ScrollContainer>
                </el-menu>
            </div>

            <div class="content">
                <ScrollContainer>
                    <router-view v-if="isRouterAlive"></router-view>
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
        provide(){
            return {
                reload:this.reload
            }
        },
        data() {
            return {
                isRouterAlive:true,
                openeds:['2'],
                isActive: false,
                items: [
                    {
                        icon: './../../static/img/department.png',
                        index: '/person/department',
                        title: '部门管理',
                    },
                    {
                        icon: './../../static/img/post.png',
                        index: '/person/post',
                        title: '岗位管理',
                    },
                    {
                        icon: './../../static/img/roleDep.png',
                        index: '/person/role',
                        title: '角色管理',
                    },
                    {
                        icon: './../../static/img/personDep.png',
                        index: '/person/users',
                        title: '人员信息',
                    },
            ]
            }
        },
        watch: {
            '$route'(){
            },
        },
        methods: {
            ...mapActions([
                'getJobType',
            ]),
            reload(){
                this.isRouterAlive = false
                this.$nextTick(()=>{
                    this.isRouterAlive = true
                })
            },
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null || url === undefined) {
                    return './../../static/img/bigusercenter.png'
                } else {
                    return url
                }
            },
        },
        async created () {
            // await this.getJobType()
            // if (this.getJobTypeList.length > 0) {
            //     console.log(this.getJobTypeList, 'hitSearchsdjfvckjsdbr')
            //     let enableState = false
            //     let id = ''
            //     this.getJobTypeList.forEach(item => {
            //         if (item.enable) {
            //             enableState = true
            //             id = item.id
            //             return
            //         }
            //     })
            //     if (enableState) {
            //         await this.$router.push(`/person/${id}`)
            //
            //     } else {
            //         this.$router.push('/person')
            //     }
            // }
        },
        mounted () {
        },
        components: {
            ScrollContainer
        },
        computed:{
            ...mapGetters([
                'getJobTypeList',
                'getUserDetailMsg'
            ])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .person .el-submenu .el-menu-item:hover{
        background-color:#2C4155;
    }
    .person .el-submenu .el-menu-item {
        width: 100%;
        height: rem(40);
        line-height: rem(40);
        padding: rem(0) !important;
        padding-left: rem(20) !important;
        font-size: rem(14);
        color:#615d85 !important;
        background-color: transparent;
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
    .person .el-submenu__title{
        background-color: transparent;
        border-top: 1px solid transparent;
        color: #615d85 !important;
        font-size: rem(14);
        font-weight: 600;
        img{
            width: rem(16);
            height: rem(16);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(15);
        }
    }
    .person .el-menu-item {
        width: 100%;
        height: rem(55);
        line-height: rem(55);
        border-bottom: 1px solid transparent;
        color:#615d85 !important;
        font-size: rem(16);
        font-weight: 600;
        img{
            width: rem(20);
            height: rem(20);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(15);
            margin-top: rem(-3);
        }
        &:hover{
            color: #35CCB5 !important;
            background: rgba(57, 159, 154, .3);
        }
    }
    .person .el-menu-item.is-active {
        color: #35CCB5 !important;
        background: rgba(57, 159, 154, .3);
        position: relative;
        &:before{
            position: absolute;
            top: 0;
            left: 0;
            width: rem(3);
            height: 100%;
            content: "";
            background-color: #35CCB5;
        }
    }

    .person .el-menu .el-menu--inline {
        width: 100%;
        background: transparent;
        box-sizing: border-box;
        text-align: left;
        font-size: rem(14);
    }
    .person .el-menu{
        background-color: transparent;
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
            .menuList{
                width: 15%;
                height: 100%;
                background-color: #282844;
                .userInfo{
                    width: 100%;
                    height: rem(200);
                    img{
                        height: rem(100);
                        width: rem(100);
                        display: block;
                        border: 3px solid #615d85;
                        border-radius: 50%;
                        margin: rem(20) auto;
                    }
                    p{
                        text-align: center;
                        font-size: rem(18);
                        color: #35CCB5;
                    }
                }
                .el-menu {
                    width: 100%;
                }
            }
            .content {
                flex: 1;
                height: 100%;
                padding: rem(15);
                background: #f2f2f2;
                box-sizing: border-box;
            }
        }
    }
</style>
