<template>
    <div class="eye" @click="closeSearch">
        <el-container>
            <el-header  v-show = "isshowHead">
                <el-row :gutter="10" class="alleye">
                    <el-col :xs="6" :sm="7" :md="6" :lg="5" :xl="4">
                        <router-link to="/droreone">
                            <img src="../../../static/img/eye.png"/>全视之眼
                        </router-link>
                    </el-col>
                    <el-col :xs="3" :sm="3" :md="5" :lg="6" :xl="6" class="control">
                        <div v-for="(item,index) in manage" @click="goModule(item.index, index)" v-if="getUserRole.includes(item.id) || getUserRole[0] == 1"
                             :class="activeIndex === index? 'active':''">{{$t(item.index)}}
                        </div>
                    </el-col>
                    <el-col :xs="5" :sm="5" :md="5" :lg="6" :xl="7" id="getTime">
                        <!--{{currTime | timeFiler}} ({{currTime | weekFiler}})-->
                        <!--<div @click="changeLanguage" v-if="false">切换语言</div>-->
                        <div class="search">
                            <div class="searchInput" ref="searchInput">
                                <input type="text" v-model="searchContent" @blur="noSearch" placeholder="请输入设备,设施,安保人员名称" @keyup="search" class="searchBox" res="searchBox"><button class="btn " @click="goPosition"><i class="el-icon-search"></i></button>
                                <button class="closeSearch" @click.stop = "hideSearch"><i class="el-icon-close"></i></button>
                            </div>
                            <div class="searchContent" v-if="searchList.length>0" v-loading="isShowloading">
                                <ul ref="dev">
                                    <li
                                        v-for="(item,index) in searchList"
                                        :class="searchIndex === index? 'active': ''"
                                        :ref="isCur(index) && 'searchContent'"
                                        @click.stop="position(item)">
                                        {{item.name}}-（{{item.entityType | searchTypeFilter}}）</li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="7" :sm="6" :md="5" :lg="4" :xl="3">
                        <button @click="showSearch" class="hitSearch" ref="hitSearch">
                            <i class="el-icon-search showSearch"></i>
                        </button>
                        <el-badge :value="badge" :max="99" class="item alarmBadge">
                            <button @click="warnListShow=!warnListShow" class="alarmBadgebuttom">
                                <i>&#xe8c0</i>
                            </button>
                        </el-badge>
                        <button>
                            <i>&#xe627</i>
                        </button>
                        <button>
                            <i>&#xe647</i>
                        </button>
                        <!--<div v-for="item in title">-->
                            <!--<a href="#">-->
                                <!--<i v-html="item"></i>-->
                            <!--</a>-->
                        <!--</div>-->
                    </el-col>
                    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" class="control">
                        <div class="func">
                            <el-menu  class="el-menu-demo" mode="horizontal" router>
                                <el-submenu index="">
                                    <template slot="title">
                                        <span class="Admin"v-if="getUserDetailMsg.cnName">{{getUserDetailMsg.cnName}}</span>
                                        <span class="Admin"v-if="!getUserDetailMsg.cnName">{{getUserDetailMsg.name}}</span>
                                        <img :src="getUrl(getUserDetailMsg.iconId)" alt="" @error="imgError">
                                    </template>
                                    <el-menu-item @click='visible = true' index="">个人中心</el-menu-item>
                                    <el-menu-item index="/droreone">返回主页</el-menu-item>
                                    <el-menu-item @click="logout" index="">退出</el-menu-item>
                                </el-submenu>
                            </el-menu>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <router-view @hideHead = "hideData"/>
            </el-main>
            <div v-if="warnListShow" class="warnListShow">
                <div class="warnli">
                    <div v-for="(item) in warnList" @click="warnShow(item)" class="warnListShowimg">
                        <img :src="item.icon" alt=""><label>{{item.serialNum}}</label>
                    </div>
                </div>
                <button @click="alarmBadge">更多告警</button>
            </div>
        </el-container>
        <UserInfoDialog
            v-if="visible"
            :visible="visible"
            @closeInfoDialog="visible = false">
        </UserInfoDialog>
    </div>
</template>


<script>
    import moment from 'moment'
    import api from '@/api'
    import { mapMutations, mapGetters, mapActions} from 'vuex'
    import UserInfoDialog from '@/components/userInfoDialog'

    export default {
        data() {
            return {
                manage: [
                    {id: '0101',
                        index: 'message.control'
                    },
                    {id: '0102',
                        index:  'message.facility'
                    },
                    {id: '0103',
                        index: 'message.deploy'
                    },
                    {id: '0104',
                        index: 'message.alarm'
                    }],
                currTime: new Date(),   //当前时间
                title: ["&#xe8c0;", "&#xe627;", "&#xe647;"],
                activeIndex: 1,
                isshowHead:true,
                searchList: [],
                standby: [],
                searchContent: '',
                searchIndex: 0,
                isShowloading: false,
                facilityType: [
                    {type: 1,route: '/facility/build'},//建筑
                    {type: 2,route: '/facility/shop'},//商圈
                    {type: 4,route: '/facility/trash'},//垃圾桶
                    {type: 5,route: '/facility/park'},//停车场
                    {type: 6,route: '/facility/scenic'},//景点
                    {type: 8,route: '/facility/plant'},//植物
                    {type: 9,route: '/facility/indicator'},//指示牌
                    {type: 10,route: '/facility/toilet'},//卫生间
                    {type: 12,route: '/facility/road'},//路网
                    {type: 14,route: '/facility/road'},//片区
                    {type: 301,route: '/controler/broad'},//广播
                    {type: 302,route: '/controler/camera'},//摄像头
                    {type: 303,route: '/controler/broad'},//闸机
                    {type: 304,route: '/controler/screen'},//大屏
                    {type: 305,route: '/controler/light'},//路灯
                    {type: 306,route: '/controler/environment'},//传感器
                    {type: 307,route: '/controler/wifi'},//wifi
                    {type: 308,route: '/controler/broad'},//告警
                    {type: 309,route: '/controler/broad'},//gps
                    {type: 7,route: '/controler/person'},//人
                    {type: 11,route: '/controler/car'},//车船
                ],
                visible: false,
                checkoutMapShow:true,
                badge:'0',
                alarmList:[],
                warnListShow:false,
                warnList:[],
            }
        },
        created () {
            this.getUserDetailInfo()
            if (this.getUserRole.includes('0101') || this.getUserRole[0] == 1) {
                this.$router.push('/controler')
            } else if (this.getUserRole.includes('0102')) {
                this.$router.push('/facility')
            } else if (this.getUserRole.includes('0103')) {
                this.$router.push('/deploy')
            } else if (this.getUserRole.includes('0104')) {
                this.$router.push('/alarm')
            }
            let route = this.$route.path;
            if (route.includes('deploy')){
                this.activeIndex = 2
            }
            if (route.includes('alarm/')){
                this.activeIndex = 3
            }
            if (route.includes('controler')){
                this.activeIndex = 0
            }
            if (route.includes('facility')){
                this.activeIndex = 1
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
            ...mapMutations(['SEARCH_INFO','SHOW_SEARCH']),
            ...mapActions(['logout','getUserDetailInfo']),
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
            showSearch(e){
                console.log('显示搜索')
                this.$refs.searchInput.style.opacity = "1";
                this.$refs.hitSearch.style.opacity = "0";
            },
            hideSearch(){
                console.log('隐藏搜索')
                this.$refs.searchInput.style.opacity = "0";
                this.$refs.hitSearch.style.opacity = "1";
            },
            goModule(item, index) {
                this.visible = false;
                console.log(item,'opo')
                this.$store.commit('SHOW_SEARCH', false)
                this.activeIndex = index;
                switch (item) {
                    case 'message.control':
                        if (this.getUserRole.includes('0101') || this.getUserRole[0] == 1) {
                            this.$router.push({path: '/controler'});
                        }
                        break;
                    case 'message.facility':
                        if (this.getUserRole.includes('0102') || this.getUserRole[0] == 1) {
                            this.$router.push({path: '/facility'});
                        }
                        break;
                    case 'message.deploy':
                        if (this.getUserRole.includes('0103') || this.getUserRole[0] == 1) {
                            this.$router.push({path: '/deploy'});
                        }
                        break;
                    case 'message.alarm':
                        if (this.getUserRole.includes('0104') || this.getUserRole[0] == 1) {
                            this.$router.push({path: '/alarm'});
                        }
                        break;
                }
            },
            isCur(index) {
                return index === this.activeIndex
            },
            closeSearch (e) {
                //showSearch
                // 需注意ie浏览器使用e.target, 拿不到最底下一层
                this.searchList = []
                if (e.target.className.includes('showSearch') || e.target.className === 'searchBox' || e.target.className === 'hitSearch') {
                    this.showSearch()
                } else {
                    this.hideSearch()
                }
            },
            noSearch () {
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
                this.$store.commit('SHOW_SEARCH', true)
                this.searchList = []
                for (let i = 0; i<this.facilityType.length; i++) {
                    if (item.entityType === this.facilityType[i].type ) {
                        this.$router.push(this.facilityType[i].route)
                        if (this.facilityType[i].route.includes('facility')) {
                            this.activeIndex = 1
                        } else {
                            this.activeIndex = 0
                        }
                    }
                }
                console.log(item, '[][][][]]]')
                this.searchContent = item.name
                this.$store.commit('SEARCH_INFO', item)
                this.searchList = []
            },
            logout() {
                let data = JSON.parse(localStorage.getItem('token'))
                this.$store.dispatch('logout',data).then(() => {
                    this.$message.success('登出成功')
                    location.reload()
                })
            },
            async getAllAlarmEventbadge () {
                await api.alarm.getAllAlarmEventundone().then(res => {
                    this.alarmList=res
                    let alarmList = []
                    this.warnList=[]
                    this.alarmList.forEach(item => {
                        if(item.status.id=="1"){
                            if (!alarmList.includes(item.id)) {
                                alarmList.push(item.id)
                            }
                            // if(item.rule.alarmTypeId =="2") {
                            //     item.longitude=item.longitude-0.004567198366942193
                            //     item.latitude=item.latitude+0.0031051178912733235
                            // }
                            if(this.warnList.length<6){
                                if(item.rule!=null){
                                    if(item.rule.alarmTypeId =="1"){
                                        if(item.device.typeId =="1"){
                                            item.icon = '../../../static/img/broadcast_danage.svg'
                                        }else if(item.device.typeId =="2"){
                                            item.icon = '../../../static/img/camera_danage.svg'
                                        }else  if(item.device.typeId =="3") {
                                            item.icon = '../../../static/img/machine_danage.svg'
                                        }else  if(item.device.typeId =="4") {
                                            item.icon = '../../../static/img/led_danage.svg'
                                        }else  if(item.device.typeId =="5") {
                                            item.icon = '../../../static/img/light_danage.svg'
                                        }else  if(item.device.typeId =="6") {
                                            item.icon = '../../../static/img/detection_danage.svg'
                                        }else  if(item.device.typeId =="7") {
                                            item.icon = '../../../static/img/wifi_danage.svg'
                                        }else  if(item.device.typeId =="8") {
                                            item.icon = '../../../static/img/wring_danage.svg'
                                        }else  if(item.device.typeId =="9") {
                                            item.icon = '../../../static/img/gps_danage.svg'
                                        }
                                    }else if(item.rule.alarmTypeId =="2") {
                                        item.icon = '../../../static/img/alarm/alarmcolumnRule_one.svg'
                                    }else if(item.rule.alarmTypeId =="3") {
                                        item.icon = '../../../static/img/alarm/firefightingRule_one.svg'
                                    }else if(item.rule.alarmTypeId =="4") {
                                        item.icon = '../../../static/img/alarm/crossborderRule_one.svg'
                                    }else if(item.rule.alarmTypeId =="5") {
                                        item.icon = '../../../static/img/alarm/speedingRule_one.svg'
                                    }else if(item.rule.alarmTypeId =="6") {
                                        item.icon = '../../../static/img/alarm/offtrackRule_one.svg'
                                    }else if(item.rule.alarmTypeId =="7") {
                                        item.icon = '../../../static/img/alarm/overlimitRule_one.svg'
                                    }else if(item.rule.alarmTypeId =="8") {
                                        item.icon = '../../../static/img/alarm/waterlevelRule_one.svg'
                                    }else if(item.rule.alarmTypeId =="9") {
                                        item.icon = '../../../static/img/alarm/conditionRule_one.svg'
                                    }
                                } else {
                                    item.icon = '../../../static/img/alarm/pollingIconRule_one.svg'
                                }
                                this.warnList.push(item)
                            }
                        }
                    })
                    this.badge=alarmList.length
                    setTimeout(() => {
                        let route = this.$route.path
                        if (route.includes('controler')||route.includes('facility')||route.includes('deploy')||route.includes('alarm')) {
                            this.getAllAlarmEventbadge();//长轮询
                        }
                    },10000)
                }).catch(err =>{
                    console.log(err)
                })
            },
            alarmBadge(){
                this.warnListShow=false
                this.activeIndex = 0
                this.$store.commit('SHOW_SEARCH', true)
                this.$router.push('/controler/warn')
            },
            warnShow(index){
                this.warnListShow=false
                this.activeIndex = 0
                this.$router.push('/controler/warn')
                this.$store.commit('SEARCH_INFO',index)
                this.$store.commit('SHOW_SEARCH', true)
            }
        },
        mounted(){
            this.getAllAlarmEventbadge();//告警事件列表
        },
        components: {
            UserInfoDialog
        },
        computed: {
            ...mapGetters(['getUserInfo', 'getUserDetailMsg', 'getUserRole'])
        }
    }
</script>

<style lang="scss">
    .eye{
        width: 100%;
        height: 100%;
        .el-container{
            width: 100%;
            height: 100%;
            /*position: relative;*/
            min-width: rem(1120);
        }
        .el-header {
            width: 100%;
            height: rem(60) !important;
            padding-right: 0;
            position: relative;
            z-index: 9;
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
            /*border: none;*/
        }
        .func .el-menu{
            border: none;
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
            vertical-align: middle;
            margin-top: rem(0);
            border-radius: 50%;
            margin-left: rem(5);
        }
        .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
            border-bottom-color: transparent;
        }
        .el-submenu.is-active .el-submenu__title{
            border-bottom-color: transparent;
        }
        .alarmBadge{
            button{
                cursor: pointer;
                height: rem(60);
            }
            .el-badge__content.is-fixed{
                right:rem(38);
                top:rem(17);
                background: #f00;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .eye{
        width: 100%;
        height: 100%;
        .warnListShow{
            position: fixed;
            top:rem(60);
            right: rem(320);
            z-index: 10;
            background: #fff;
            border-top:none;
            border: 1px solid #eee;
            .warnli{
                padding: 0px 5px;
                width:rem(200);
                .warnListShowimg{
                    line-height: rem(34);
                    height: rem(34);
                    margin-left: 5px;
                    border-bottom: 1px solid #eee;
                    width:rem(190);
                    overflow: hidden;
                    font-size: 14px;
                    color: #666;
                    cursor: pointer;
                    img{
                        width:rem(18);
                        vertical-align: top;
                        margin-right: rem(5);
                        margin-top: rem(8);
                        display: inline-block;
                    }
                    label{
                        line-height: rem(34);
                        height: rem(34);
                        overflow: hidden;
                        display: inline-block;
                        width: rem(165);
                        cursor: pointer;
                    }
                }
            }
            button{
                background: #eee;
                width:rem(210);
                border: none;
                line-height: rem(34);
                text-align: center;
                font-size: 16px;
                color: #333;
                cursor: pointer;
                outline:none
            }
        }
        i {
            font-family: iconfont;
            font-style: normal;
            font-size: rem(26);
        }

        a {
            text-decoration: none;
            color: #fff;
        }

        body > .el-container {
            height: 100%;
            display: flex;
            flex-direction: column;
            /*position: relative;*/

        }

        .el-header {
            background: #2c3b47;
            display: flex;
            color: #fff;
            padding-left: rem(20);
        }

        .el-col {
            height: 100%;
            line-height: rem(60);
            display: flex;

        }

        .alleye .el-col:first-child {
            font-size: rem(22);
            position: relative;
        }

        .alleye .el-col:first-child img {
            padding-right: rem(10);
            vertical-align: middle;
        }
        .alleye .el-col:nth-child(2) div{
            padding:0 rem(10);
        }

        .alleye .el-col:nth-child(4) button{
            padding-right: rem(10);
            padding-left: rem(10);
            background: #2c3b47;
            border: none;
            color: #fff;
            outline: none;
            padding-top: rem(-14);
            border: 1px solid #2c3b47;
            box-sizing: border-box;
            z-index: 31;
        }
        .alleye .el-col:nth-child(4) div{
            padding-right: rem(10);
            padding-left: rem(10);
        }
        .alleye .el-col:last-child{
            box-sizing: border-box;
            /*margin-left: rem(50);*/
        }
        .control div {
            margin: 0 rem(5);
            /*line-height: 60px;*/
            cursor: pointer;
        }
        #getTime {
            line-height: 0px;
            font-size: rem(16);
            text-align: center;
        }

        .alleye > .el-col:last-child div {
            line-height: rem(60);
            margin: 0 rem(10);
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
                padding-left: rem(30);
                box-sizing: border-box;
                display: inline-block;
                overflow: hidden;
                position: relative;
                opacity: 0;
                input{
                    width: 60%;
                    height: 100%;
                    outline: none;
                    padding: rem(2) rem(5);
                    box-sizing: border-box;
                    font-size: rem(12);
                    border: none;
                    border-radius: rem(2) 0 0 rem(2);
                    /*display: inline-block;*/
                    float: left;
                    z-index: 31;
                    line-height: rem(20);text-indent: rem(40);
                }
                .closeSearch{
                    position: absolute;
                    left: rem(40);
                    color: black;

                    display: inline-block;
                    border:none;
                    height: rem(24);
                    outline: none;
                    border-radius: 0 rem(2) rem(2) 0;
                    background: #fff;
                    cursor: pointer;
                    i{
                        font-size: rem(16);
                    }
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
                    float: left;
                    cursor: pointer;
                    i{
                        top:rem(23);
                        left: rem(340);
                        font-size: rem(14);
                    }
                }
            }
            .searchContent{
                position: absolute;
                width: 62%;
                background: rgba(161, 187, 79, 0.6);
                border-bottom-left-radius: rem(5);
                border-bottom-right-radius: rem(5);
                z-index: 9;
                top: rem(42);
                left: rem(30);
                height: rem(100);
                overflow-y: auto;
                &::-webkit-scrollbar {
                    width: rem(11);
                    height: rem(11);
                }
                &::-webkit-scrollbar-track {
                    background-color: #F5F5F5;
                }
                &::-webkit-scrollbar-thumb {
                    min-height: rem(36);
                    border: 2px solid transparent;
                    border-top: 3px solid transparent;
                    border-bottom: 3px solid transparent;
                    background-clip: padding-box;
                    border-radius: rem(7);
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
