<template>
    <div class="originzation">
        <div class="pro_menu">
            <div class="pro_title">
                <router-link to="/droreone">
                    <img src="./../../static/img/userlogo.png" alt="">
                </router-link>
            </div>
            <div class="pro_router">
                <div class="func">
                    <el-menu  class="el-menu-demo" mode="horizontal" router>
                        <el-submenu index="">
                            <template slot="title">
                                <img :src="getUrl(getUserDetailMsg.iconId)" alt="" @error="imgError">
                                <span class="Admin"v-if="getUserDetailMsg.cnName">{{getUserDetailMsg.cnName}}</span>
                                <span class="Admin"v-if="!getUserDetailMsg.cnName">{{getUserDetailMsg.name}}</span>
                            </template>
                            <el-menu-item index="" @click="showUserDialog">
                                <img src="./../../static/img/myself.png" alt="" class="imageTitlt">
                                个人中心
                            </el-menu-item>
                            <el-menu-item index="/droreone">
                                <img src="./../../static/img/homepage.png" alt="" class="imageTitlt">
                                返回主页
                            </el-menu-item>
                            <el-menu-item @click="logout"index="">
                                <img src="./../../static/img/back.png" alt="" class="imageTitlt">
                                退出
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
                <div class="helps">
                    <img src="./../../static/img/help.png" alt="">
                    <span>帮助</span>
                </div>
            </div>
        </div>
        <div class="pro_content">
            <router-view></router-view>
        </div>
        <UserInfoDialog
            v-if="visible"
            :visible="visible"
            @closeInfoDialog="visible = false">
        </UserInfoDialog>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import { mapGetters,mapActions } from 'vuex'
    import UserInfoDialog from '@/components/userInfoDialog'

    export default {
        name: "property",
        data() {
            return {
                route: '',
                visible: false,
            }
        },
        async created () {
            await this.$store.dispatch('getUserDetailInfo').then(res => {
                console.log(res, '[][][][][][')
            })
            this.route = this.$route.path
        },
        watch: {
            '$route'(){
                this.route = this.$route.path
            }
        },
        components: {
            ScrollContainer,
            UserInfoDialog
        },
        methods:{
            ...mapActions(['logout','getUserDetailInfo']),
            logout() {
                let data = JSON.parse(localStorage.getItem('token'))
                this.$store.dispatch('logout',data).then(() => {
                    this.$message.success('登出成功')
                    location.reload()
                })
            },
            showUserDialog () {
                this.visible = true
            },
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null || url === undefined) {
                    return './../../static/img/userCenter.png'
                } else {
                    return url
                }
            },
        },
        computed: {
            ...mapGetters(['getUserInfo','getUserDetailMsg'])
        }
    }
</script>

<style lang="scss">
    .originzation{
        .checkoutMap{
            width: rem(110);
            float: right;
            margin-right: 10px;
            .el-select{
                /*margin-left: rem(5);*/
                .el-input .el-input__inner{
                    background: #2D3E50;
                    color: #fff;
                    border: none;
                    padding-left: rem(5);
                    padding-right:rem(20);
                }
            }
        }
        .el-menu-demo,.el-menu--horizontal,.el-menu{
            background-color: transparent;
        }
        /*.el-menu-demo,.el-menu--horizontal,.el-menu:hover{*/
        /*background-color: transparent;*/
        /*}*/
        .el-menu--horizontal>.el-submenu .el-submenu__title{
            color: #fff;
        }
        .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
            background-color: transparent;
        }
        .func .el-submenu__title span {
            color: #6E6698;
        }
        .func .el-submenu__title img{
            display: inline-block;
            width: rem(40);
            height: rem(40);
            border-radius: 50%;
            vertical-align: middle;
            margin-top: rem(0);
            margin-left: rem(5);
        }
        .func .imageTitlt{
            display: inline-block;
            width: rem(16);
            height: rem(16);
            vertical-align: middle;
        }
        .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
            border-bottom-color: transparent;
        }
        .el-submenu.is-active .el-submenu__title{
            border-bottom-color: transparent;
        }
    }

</style>
<style lang="scss" type="text/scss" scoped>
    .originzation {
        width: 100%;
        height: 100%;
        .pro_menu {
            width: 100%;
            height: rem(60);
            color: #fff;
            line-height: rem(60);
            box-sizing: border-box;
            display: flex;
            div {
                display: inline-block;
            }
            .pro_title {
                width: 15%;
                text-align: center;
                background: #35CCB5;
                font-family: '微软雅黑';
                a{
                    color: #fff;
                }
                img{
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: rem(5);
                    margin-top: rem(-3);
                }
            }
            .pro_router{
                flex: 1;
                background: #fff;
                padding: 0 rem(35);
                box-sizing: border-box;
                .helps{
                    width: rem(100);
                    height: 100%;
                    display: inline-block;
                    float: right;
                    position: relative;
                    img{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    span{
                        color: #6e6698;
                        font-size: rem(14);
                        font-weight: 600;
                    }
                    &:after{
                        content: "";
                        position: absolute;
                        width: 1px;
                        height: 50%;
                        background: #6f7dbc;
                        right: rem(10);
                        top: 50%;
                        transform: translateY(-50%);
                        opacity: .4;
                    }
                }
                a{
                    display: inline-block;
                    color: #fff;
                    padding: 0 rem(15);
                }
                .active{
                    color: #74cef2;
                }
                .func{
                    display: inline-block;
                    float: right;
                    margin-right: rem(20);
                }
            }
        }
        .pro_content{
            width: 100%;
            height: calc(100% - 3.75rem);
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
