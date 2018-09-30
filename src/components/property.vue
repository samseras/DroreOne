<template>
    <div class="property">
        <div class="pro_menu">
            <div class="pro_title">
                <router-link to="/droreone">
                    <img src="./../../static/img/logo.svg" alt="">云数据中心
                </router-link>
            </div>
            <div class="pro_router">
                <router-link to="/basic-property" :class="route.includes('basic')? 'active' : ''" v-if="getUserRole.includes('0402') || getUserRole[0] == 1" >设施</router-link>
                <router-link to="/hard-property" :class="route.includes('hard')? 'active' : ''" v-if="getUserRole.includes('0403') || getUserRole[0] == 1">设备</router-link>
                <router-link to="/floder" :class="route.includes('file')? 'active' : ''" v-if="getUserRole.includes('0401') || getUserRole[0] == 1">文件</router-link>
                <!--<router-link to="/building" :class="route.includes('build')? 'active' : ''">建筑</router-link>-->
                <!--<router-link to="">植物</router-link>-->
                <div class="func">
                    <el-menu  class="el-menu-demo" mode="horizontal" router>
                        <el-submenu index="">
                            <template slot="title">
                                <span class="Admin" v-if="getUserDetailMsg.cnName">{{getUserDetailMsg.cnName}}</span>
                                <span class="Admin" v-if="!getUserDetailMsg.cnName">{{getUserDetailMsg.name}}</span>
                                <img :src="getUrl(getUserDetailMsg.iconId)" alt="" @error="imgError">
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
           this.getUserDetailInfo()
           if (this.getUserRole.includes('0402') || this.getUserRole[0] == 1) {
               this.$router.push('/basic-property')
           } else if (this.getUserRole.includes('0403')) {
               this.$router.push('/hard-property')
           } else if (this.getUserRole.includes('0401')) {
               this.$router.push('/floder')
           }
           this.route = this.$route.path
            await this.getFacilityType()
           await this.getDeviceType()
           await this.getFileType()
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
            ...mapActions(['logout','getUserDetailInfo','getFacilityType','getDeviceType', 'getFileType']),
            logout() {
                let data = JSON.parse(sessionStorage.getItem('token'))
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
            },
        },
        computed: {
            ...mapGetters(['getUserInfo','getUserDetailMsg', 'getUserRole'])
        }
    }
</script>

<style lang="scss">
    .property{
        .el-menu-demo,.el-menu--horizontal{
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
