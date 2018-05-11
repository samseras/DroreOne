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
                        <!--{{currTime | timeFiler}} ({{currTime | weekFiler}})-->
                        <!--<div @click="changeLanguage" v-if="false">切换语言</div>-->
                        <div class="search">
                            <div class="searchInput">
                                <input type="text" v-model="searchContent" @blur="noSearch" placeholder="请输入设备,设施,安保人员名称" @keyup="search"><button class="btn " @click="goPosition"><i class="el-icon-search"></i></button>
                            </div>
                            <div class="searchContent" v-if="searchList.length>0" v-loading="isShowloading">
                                <ul ref="dev">
                                    <li
                                        v-for="(item,index) in searchList"
                                        :class="searchIndex === index? 'active': ''"
                                        :ref="isCur(index) && 'searchContent'"
                                        @click="position(item)">
                                        {{item.name}}-（{{item.entityType | searchTypeFilter}}）</li>
                                </ul>
                            </div>
                        </div>
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
    import api from '@/api'
    import {mapMutations} from 'vuex'

    export default {
        data() {
            return {
                manage: [ 'message.control', 'message.facility', 'message.analyze', 'message.deploy'],
                currTime: new Date(),   //当前时间
                title: ["&#xe8c0;", "&#xe627;", "&#xe647;"],
                activeIndex: 1,
                isshowHead:true,
                searchList: [],
                standby: [],
                searchContent: '',
                searchIndex: 0,
                isShowloading: false
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
            },
            searchTypeFilter (item) {
                if (item == 1) {
                    return '建筑'
                }
                if (item == 2) {
                    return '商圈'
                }if (item == 301) {
                    return '广播'
                }
                if (item == 302) {
                    return '摄像头'
                }
                if (item == 303) {
                    return '闸机'
                }
                if (item == 304) {
                    return 'LED大屏'
                }
                if (item == 305) {
                    return '路灯'
                }
                if (item == 306) {
                    return '传感器'
                }
                if (item == 307) {
                    return 'wifi'
                }
                if (item == 308) {
                    return '报警柱'
                }
                if (item == 309) {
                    return 'GPS'
                }
                if (item == 4) {
                    return '垃圾箱'
                }
                if (item == 5) {
                    return '停车场'
                }
                if (item == 6) {
                    return '景点'
                }
                if (item == 7) {
                    return '人员'
                }
                if (item == 8) {
                    return '植物'
                }
                if (item == 9) {
                    return '指示牌'
                }
                if (item == 10) {
                    return '卫生间'
                }
                if (item == 11) {
                    return '车船'
                }
                if (item == 12) {
                    return '路网'
                }
                if (item == 13) {
                    return '巡更路线'
                }
                if (item == 14) {
                    return '片区'
                }

            }
        },
        methods: {
            ...mapMutations(['SEARCH_INFO']),
            changeLanguage () {// 语言切换
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
            },
            isCur(index) {
                return index === this.activeIndex
            },
            noSearch () {
                this.searchList = []
            },
            search (e) {
                let isRefish = true
                if (e.keyCode === 38 || e.keyCode === 40) {
                    isRefish = false
                }
                if (this.searchContent && this.searchContent.trim() !== '' && isRefish) {
                    console.log(this.searchContent, '-=-=-=-=-=-=-=')
                    this.isShowloading = true
                    api.publi.getSearch(this.searchContent).then(res => {
                        this.isShowloading = false
                        console.log(res)
                        this.searchList = res
                        this.standby = this.searchList
                    }).catch(err => {
                        this.isShowloading = false
                        console.log(err,'搜索失败')
                    })
                } else if (isRefish){
                    this.searchList =[]
                } else if (e.keyCode === 38) {// 上
                    if (this.searchIndex > 0) {
                        this.searchIndex--;
                        if (this.searchList.length > 4) {
                            console.log(90000)
                            this.$refs.dev.style.top = (-this.searchIndex * 24)+ 'px'
                        }
                        if (this.searchIndex > this.searchList.length - 4 && this.searchList.length > 4) {
                            console.log(8000)
                            this.$refs.dev.style.top = (-(this.searchList.length - 4) * 24)+ 'px'
                        }
                        this.searchContent = this.searchList[this.searchIndex].name
                    }
                } else if (e.keyCode === 40) {//下
                    if (this.searchIndex < this.searchList.length - 1) {
                        console.log(this.searchIndex, '*********',this.searchList.length)
                        this.searchIndex++;
                        if (this.searchList.length > 4) {
                            this.$refs.dev.style.top = (-this.searchIndex * 24)+ 'px'
                        }
                        if (this.searchIndex > this.searchList.length - 4 && this.searchList.length > 4) {
                            this.$refs.dev.style.top = (-(this.searchList.length - 4) * 24)+ 'px'
                        }
                    } else {
                        this.searchIndex = this.searchList.length - 1
                    }
                    this.searchContent = this.searchList[this.searchIndex].name
                }
                if (e.keyCode === 13) {
                    let info = this.searchList[this.searchIndex]
                    this.position(info)
                }
            },
            goPosition () {
                if (this.standby.length > 0) {
                    let info = this.standby[this.searchIndex]
                    this.position(info)
                }
            },
            position (item) {
                console.log(item, '[][][][]]]')
                this.searchContent = item.name
                this.$store.commit('SEARCH_INFO', item)
                this.searchList = []
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
            /*line-height: 60px;*/
            cursor: pointer;
        }

        #getTime {
            line-height: 0px;
            font-size: 16px;
            text-align: center;
        }

        .alleye > .el-col:last-child div {
            line-height: 60px;
            margin: 0 10px;
        }

        .alleye > .el-col:last-child div a {
            display: block;
            /*line-height: 60px;*/
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
        .search{
            width: 100%;
            height: 100%;
            position: relative;
            .searchInput{
                width: 100%;
                height: rem(60);
                padding: rem(18) 0;
                box-sizing: border-box;
                display: inline-block;
                overflow: hidden;
                input{
                    width: 70%;
                    height: 100%;
                    outline: none;
                    padding: rem(2) rem(5);
                    box-sizing: border-box;
                    font-size: rem(12);
                    border: none;
                    border-radius: rem(2) 0 0 rem(2);
                    display: inline-block;
                    line-height: rem(20);
                }
                .btn{
                    display: inline-block;
                    width: rem(30);
                    /*border: none;*/
                    border:2px solid #fff;
                    outline: none;
                    height: 100%;
                    border-radius: 0 rem(2) rem(2) 0;
                    background: #fff;
                    vertical-align: middle;
                    i{
                        font-size: rem(14);
                    }
                }
            }
            .searchContent{
                position: absolute;
                width: 80%;
                background: rgba(161, 187, 79, 0.6);
                border-bottom-left-radius: rem(5);
                border-bottom-right-radius: rem(5);
                z-index: 9;
                top: rem(42);
                left: rem(30);
                height: rem(100);
                overflow-y: auto;
                &::-webkit-scrollbar {
                    width: 11px;
                    height: 11px;
                }
                &::-webkit-scrollbar-track {
                    background-color: #F5F5F5;
                }
                &::-webkit-scrollbar-thumb {
                    min-height: 36px;
                    border: 2px solid transparent;
                    border-top: 3px solid transparent;
                    border-bottom: 3px solid transparent;
                    background-clip: padding-box;
                    border-radius: 7px;
                    background-color: #C4C4C4;
                }
                ul{
                    width: 100%;
                    /*height: 100%;*/
                    position: absolute;
                    li{
                        width: 100%;
                        height: rem(24);
                        font-size: rem(12);
                        text-align: left;
                        padding: rem(3) rem(5);
                        box-sizing: border-box;
                        line-height: rem(24);
                        cursor: pointer;
                        &:hover{
                            background: rgba(58,142,230,.6);
                            color: #fff;
                        }
                    }
                    .active{
                        background: rgba(58,142,230,.6);
                        color: #fff;
                    }

                }
            }
        }
    }
</style>
