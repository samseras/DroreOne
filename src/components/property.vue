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
                                <span class="Admin" v-if="getUserDetailMsg.nickname">{{getUserDetailMsg.nickname}}</span>
                                <span class="Admin" v-if="!getUserDetailMsg.nickname">{{getUserDetailMsg.username}}</span>
                                <img :src="getUrl(getUserDetailMsg.picturePath)" alt="" @error="imgError">
                            </template>
                            <el-menu-item index="" @click="showUserDialog">个人中心</el-menu-item>
                            <el-menu-item index="/droreone">返回主页</el-menu-item>
                            <el-menu-item @click="logout"index="">退出</el-menu-item>
                        </el-submenu>
                    </el-menu>
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
                visible: false
            }
        },
       async created () {
            this.route = this.$route.path
            this.getUserRoles(this.getUserInfo)
            this.getUserDetailInfo(this.getUserInfo)
            await this.getFacilityType()
           await this.getDeviceType()
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
            ...mapActions(['logout','getUserRoles','getUserDetailInfo','getFacilityType','getDeviceType']),
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
                    return './../../static/img/peopleInfo.svg'
                } else {
                    return url
                }
                return './../../static/img/peopleInfo.svg'
            },
        },
        computed: {
            ...mapGetters(['getUserInfo','getUserDetailMsg'])
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
            width: rem(30);
            height: rem(30);
            border-radius: 50%;
            vertical-align: middle;
            margin-top: rem(0);
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
