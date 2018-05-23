<template>
    <div class="property">
        <div class="pro_menu">
            <div class="pro_title">
                <img src="./../../static/img/logo.svg" alt="">
                <span>云数据中心</span>
            </div>
            <div class="pro_router">
                <router-link to="/person" :class="route.includes('person')? 'active' : ''">人员</router-link>
                <router-link to="/basic-property" :class="route.includes('basic')? 'active' : ''">设施</router-link>
                <router-link to="/hard-property" :class="route.includes('hard')? 'active' : ''">设备</router-link>

                <!--<router-link to="/building" :class="route.includes('build')? 'active' : ''">建筑</router-link>-->
                <!--<router-link to="">植物</router-link>-->
                <div class="func">
                    <el-menu  class="el-menu-demo" mode="horizontal" router>
                        <el-submenu index="">
                            <template slot="title">
                                <span class="Admin">Admin</span>
                                <img src="./../../static/img/peopleInfo.svg" alt="">
                            </template>
                            <el-menu-item index="">个人中心</el-menu-item>
                            <el-menu-item index="/droreone">返回主页</el-menu-item>
                            <el-menu-item @click="logout"index="/login">退出</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </div>
        </div>
        <div class="pro_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'

    export default {
        name: "property",
        data() {
            return {
                route: ''
            }
        },
        created () {
            this.route = this.$route.path
        },
        watch: {
          '$route'(){
              this.route = this.$route.path
          }
        },
        components: {
            ScrollContainer
        },
        methods:{
            logout() {
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="scss">
    .property{
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
        .func .el-submenu__title img{
            display: inline-block;
            width: rem(20);
            height: rem(20);
            vertical-align: middle;
            margin-top: rem(-4);
            margin-left: rem(5);
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
    .property {
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
                background: #34495E;
                font-family: '微软雅黑';
                img{
                    display: inline-block;
                    width: rem(140);
                    height: rem(35);
                    vertical-align: middle;
                    margin-left: rem(-35);
                    margin-right: rem(-25);
                }
            }
            .pro_router{
                flex: 1;
                background: #2D3E50;
                padding: 0 rem(35);
                box-sizing: border-box;
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
