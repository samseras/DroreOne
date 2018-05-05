<template>
    <div class="eye">
        <el-container>
            <el-header  v-show = "isshowHead">
                <el-row :gutter="10" class="alleye">
                    <el-col :xs="6" :sm="7" :md="7" :lg="5" :xl="4">
                        <img src="../../../static/img/eye.png"/>全视之眼
                    </el-col>
                    <el-col :xs="3" :sm="3" :md="4" :lg="8" :xl="9" class="control">
                        <div v-for="(item,index) in manage" @click="goModule(item,index)"
                             :class="activeIndex === index? 'active':''">{{$t(item)}}
                        </div>
                    </el-col>
                    <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="6" id="getTime">
                        {{currTime | timeFiler}} ({{currTime | weekFiler}})
                        <div @click="changeLanguage" v-if="false">切换语言</div>
                    </el-col>

                    <el-col :xs="7" :sm="6" :md="5" :lg="3" :xl="2">
                        <div v-for="item in title">
                            <a href="#">
                                <i v-html="item"></i>
                            </a>
                        </div>
                    </el-col>
                    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="control">
                        <div class="func">
                            <el-menu  class="el-menu-demo" mode="horizontal" router>
                                <el-submenu index="">
                                    <template slot="title">
                                        <span class="Admin">Admin</span>
                                        <img src="./../../../static/img/peopleInfo.svg" alt="">
                                    </template>
                                    <el-menu-item index="">个人中心</el-menu-item>
                                    <el-menu-item index="/droreone">返回主页</el-menu-item>
                                    <el-menu-item index="/login">退出</el-menu-item>
                                </el-submenu>
                            </el-menu>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view @hideHead = "hideData"/>
            </el-main>

        </el-container>
    </div>
</template>


<script>
    import moment from 'moment'
    // import api from '@/api'

    export default {
        data() {
            return {
                manage: [ 'message.control', 'message.facility', 'message.analyze', 'message.deploy'],
                currTime: new Date(),   //当前时间
                title: ["&#xe8c0;", "&#xe627;", "&#xe647;"],
                activeIndex: 1,
                isshowHead:true
            }
        },
        created () {
            let route = this.$route.path;
            if (route.includes('deploy/')){
                this.activeIndex = 3
            }
            if (route.includes('controler/')){
                this.activeIndex = 0
            }
            if (route.includes('facility/')){
                this.activeIndex = 1
            }
            if (route.includes('analyze/')){
                this.activeIndex = 2
            }
        },
        filters: {
            timeFiler(item) {
                // console.log(item, '9090')
                return moment(item).format('YYYY年MM月DD日')
            },
            weekFiler(item) {
                let arr = ['天', '一', '二', '三', '四', '五', '六']
                let day = item.getDay()
                let week = arr.filter((item, index) => {
                    return index === day
                })
                return `星期${week[0]}`
            }
        },
        methods: {
            changeLanguage () {
                if (this.$i18n.locale === 'CN'){
                    this.$i18n.locale = 'EN'
                } else {
                    this.$i18n.locale = 'CN'
                }
            },
            hideData(hideData){
                 this.isshowHead = hideData;
            },
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
            }
        },
        components: {}
    }
</script>

<style lang="scss">
    .eye{
        width: 100%;
        height: 100%;
        .el-container{
            width: 100%;
            height: 100%;
            min-width: rem(1120);
        }
        .el-header {
            width: 100%;
            height: rem(60) !important;
            padding-right: 0;
        }
        .el-row{
            width: 100%;
            margin: 0 !important;
        }
        .el-main{
            padding: 0 !important;
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
<style lang="scss" scoped>
    .eye{
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
        }

        .el-col {
            height: 100%;
            line-height: 60px;
            display: flex;
        }

        .alleye .el-col:first-child {
            font-size: 22px;
            position: relative;
        }

        .alleye .el-col:first-child img {
            margin-top: 15px;
            width: 60px;
            height: 30px;
            padding-right: 10px;
            vertical-align: middle;
        }
        .alleye .el-col:nth-child(2) div{
            padding:0 rem(7);
        }
        .control div {
            margin: 0 5px;
            line-height: 60px;
            cursor: pointer;
        }

        #getTime {
            line-height: 60px;
            font-size: 16px;
            text-align: center;
        }

        .alleye > .el-col:last-child div {
            line-height: 60px;
            margin: 0 10px;
        }

        .alleye > .el-col:last-child div a {
            display: block;
            line-height: 60px;
        }

        .el-main {
            flex: 1;
        }

        .element {
            width: 100%;
            height: 100%;
        }
        .active{
            /*color: #0086b3;*/
            background: rgba(115,108,108,0.5);
        }
    }
</style>
