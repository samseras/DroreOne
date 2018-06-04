<template>
    <div class="gis">
        <el-container>
            <el-header>
                <el-row :gutter="10" class="gisTop">
                    <el-col :xs="6" :sm="7" :md="7" :lg="5" :xl="4">
                        <img src="../../../static/img/gis.svg"/>GIS管理平台
                    </el-col>
                    <el-col :xs="15" :sm="14" :md="14" :lg="16" :xl="17">
                        <div></div>

                    </el-col>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                        <el-menu  class="el-menu-demo" mode="horizontal" router>
                            <el-submenu index="">
                                <template slot="title">
                                    <span class="Admin">{{getUserInfo}}</span>
                                    <img src="./../../../static/img/peopleInfo.svg" alt="">
                                </template>
                                <el-menu-item index="">个人中心</el-menu-item>
                                <el-menu-item index="/droreone">返回主页</el-menu-item>
                                <el-menu-item @click="logout" index="">退出</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-header>
            <div class="gis">
                <el-menu  router>
                    <ScrollContainer>
                        <!--<el-submenu index="1">-->
                        <!--<template slot="title">-->
                        <!--<i class="el-icon-location"></i>-->
                        <!--<span>地图管理</span>-->
                        <!--</template>-->
                        <!--<el-menu-item index="1-1">地图主数据</el-menu-item>-->
                        <!--</el-submenu>-->
                        <!--<el-submenu index="2">-->
                        <!--<template slot="title">-->
                        <!--<i class="el-icon-location"></i>-->
                        <!--<span>标签管理</span>-->
                        <!--</template>-->
                        <!--<el-menu-item index="2-1">标签库</el-menu-item>-->
                        <!--</el-submenu>-->
                        <!--<el-submenu index="3">-->
                        <!--<template slot="title">-->
                        <!--<i class="el-icon-location"></i>-->
                        <!--<span>风格管理</span>-->
                        <!--</template>-->
                        <!--<el-menu-item index="3-1">标签风格库</el-menu-item>-->
                        <!--</el-submenu>-->

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

        </el-container>
    </div>
</template>


<script>

    import ScrollContainer from '@/components/ScrollContainer'
    import { mapGetters,mapActions} from 'vuex'


    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-location',
                        index: '1',
                        title: '地图管理',
                        subs: [
                            {
                                index: '/mapManage/mapData',
                                title: '地图主数据'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-location',
                        index: '2',
                        title: '标签管理',
                        subs: [
                            {
                                index: '/labelManage/labelLibrary',
                                title: '标签库'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-location',
                        index: '3',
                        title: '风格管理',
                        subs: [
                            {
                                index: '/styleManage/styleLibrary',
                                title: '风格标签库'
                            }
                        ]
                    },
                ]
            }
        },

        filters: {

        },
        methods: {
            ...mapActions(['logout']),
            goModule(item, index) {
                console.log(item,'opo')
                this.activeIndex = index;
                switch (item) {
                    case 'message.homePage':
                        this.$router.push({path: '/homePage'});
                        break;
                    case 'message.control':
                        this.$router.push({path: '/controler'});
                        break;
                    case 'message.facility':
                        this.$router.push({path: '/facility'});
                        break;
                    case 'message.analyze':
                        this.$router.push({path: '/analyze'});
                        break;
                    case 'message.deploy':
                        this.$router.push({path: '/deploy'});
                        break;
                }
            },
            logout() {
                let data = JSON.parse(localStorage.getItem('token'))
                this.$store.dispatch('logout',data).then(() => {
                    this.$message.success('登出成功')
                    location.reload()
                })
            }

        },
        components: {
                ScrollContainer
        },
        compute: {
            ...mapGetters(['getUserInfo'])
        }
    }
</script>

<style lang="scss">
    .gis{
        width: 100%;
        height: 100%;
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
        .el-menu--horizontal{
            border-bottom: none;
        }
        .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
            border-bottom-color: transparent;
        }
        .el-submenu.is-active .el-submenu__title{
            border-bottom-color: transparent;
        }
        .el-container{
            width: 100%;
            height: 100%;
            min-width: rem(1120);
        }
        .el-header {
            width: 100%;
            height: rem(60) !important;
        }

        .el-row{
            width: 100%;
            margin: 0 !important;
        }
        .el-main {
            padding: 0 !important;
        }
    }

</style>
<style lang="scss" scoped type="text/scss">
    .gis{
        width: 100%;
        height: 100%;
        i {
            font-family: iconfont;
            font-style: normal;
            font-size: 26px;
        }

        a {
            text-decoration: none;
            color: #fff;
        }


        body > .el-container {
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .el-header {
            background: #2c3b47;
            display: flex;
            color: #fff;
            padding-left: 20px;
            box-sizing: border-box;
        }

        .el-col {
            height: 100%;
            line-height: 60px;
            display: flex;
        }

         .el-col:first-child img {
            margin-top: 15px;
            width: 60px;
            height: 30px;
            padding-right: 10px;
            vertical-align: middle;
        }
        .gis{
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


        .gisTop .el-col:first-child {
            font-size: 22px;
            position: relative;
        }
    }
</style>
