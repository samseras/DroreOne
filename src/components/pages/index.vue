<template>
    <div id="entrence">
        <header>
            <!--<img src="../../../static/img/tts-logo.png"/>-->
            <p>Drore One 智慧旅游 · 云平台</p>
            <router-link class="indexExit" to="/login" ></router-link>
            <div class="user" v-if="getUserDetailMsg.cnName">{{getUserDetailMsg.cnName}}</div>
            <div class="user" v-if="!getUserDetailMsg.cnName">{{getUserDetailMsg.name}}</div>
            <img class="userAvatar" :src="getUrl(getUserDetailMsg.iconId)" alt="" @error="imgError">
            <div id="getTime">
                {{currTime | timeFiler}} ({{currTime | weekFiler}})
            </div>
            <!--<img class="userAvatar" :src="../../../static/img/user.png" alt="">-->
        </header>
        <div class="main">
            <div class="search">
                <input type="text" placeholder="请输入关键字" v-model="searchContent" @focus="searchAnything" @blur="noSearch" @keyup="importAnything">
                <button @click="search">搜索</button>

                <div class="searchContent" v-if="searchList.length > 0" >
                    <ul ref="dev">
                        <li class="cont"
                            v-for="(item,index) in searchList"
                            :class="activeIndex === index? 'active': ''"
                            :ref="isCur(index) && 'searchContent'"
                            @click="goPage(item.route)">
                            {{item.title}}
                        </li>
                    </ul>

                </div>

            </div>
            <el-carousel indicator-position="outside" trigger="click" class="" height="500px" :autoplay="false" arrow="never">
                <el-carousel-item>
                    <div id="top" class="entrence-cont">
                        <ul>
                            <li class="one">
                                <div class="change estate invalid">
                                    <a href="javascript:;" >物业管理>><img src="../../../static/img/estate.png"/></a>
                                </div>
                                <div class="list">
                                    <div  class="listO change invalid"><a href="javascript:;">第三方应用<img src="../../../static/img/threeSoft.png"/></a></div>
                                    <div  class="listT change" @click="getUserCenter">
                                        <a  href="javascript:;" >用户中心>><img src="../../../static/img/settion.png" /></a>
                                    </div>
                                </div>
                            </li>
                            <li class="two">
                                <div class="bigData">
                                    <div class="change invalid">
                                        <a href="javascript:;" @click="slsjqProperty">大数据分析>><img src="../../../static/img/bagData.png"/></a>
                                    </div>
                                    <div class="dataCenter change" id="dataCenter">
                                        <a href="javascript:;" @click="slsjq">数据中心>><img src="../../../static/img/dataCenter.png"/></a>
                                    </div>
                                </div>
                                <div class="eye">
                                    <div class="change" id="eye">
                                        <a href="javascript:;" @click="gqjq">全视之眼>><img src="../../../static/img/eye.png"/></a>
                                    </div>
                                    <!---->
                                    <div class="change invalid">
                                        <a href="javascript:;" @click="requestFullScreen" >数据可视化>><img src="../../../static/img/sentiment.png"/></a>
                                    </div>
                                </div>
                            </li>
                            <li class="change invalid" id="bee" @click="qtxgjqProperty"><a>物联网>><img src="../../../static/img/ZigBee.png"/></a></li>
                        </ul>
                    </div>
                    <div id="bottom" class="entrence-cont">
                        <ul>
                            <li class="change invalid" @click="qtxgjq">
                                <!--<router-link to="/gisMap">-->
                                <div id="GIS">
                                    <a>
                                    GIS地图<img src="../../../static/img/GIS.png"/>
                                    </a>
                                </div>
                                <!--</router-link>-->
                            </li>
                            <li class="change invalid"><a>官网门户>><img src="../../../static/img/home.png"/></a></li>
                            <li class="change invalid"><a>电子票务>><img src="../../../static/img/elecTicket.png"/></a></li>
                            <li class="change invalid"><a>电子商圈>><img src="../../../static/img/elecBusiness.png"/></a></li>
                            <li class="change invalid"><a>微信公众号>><img src="../../../static/img/weixin.png"/></a></li>
                        </ul>
                    </div>
                </el-carousel-item>
                <el-carousel-item>
                    <div class="conversion">
                        <!--<router-link to="/property">资产>><img src="../../../static/img/eye.png"/></router-link>-->

                    </div>
                </el-carousel-item>
                <el-carousel-item>
                    <div class="conversion"></div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <footer>版权所属：浙江卓锐科技股份有限公司</footer>
    </div>

</template>

<script>
    import moment from 'moment'
    import ScrollContainer from '@/components/ScrollContainer'
    import { mapGetters,mapActions} from 'vuex'
    import screenfull from 'screenfull'
	export default {
		data() {
	        return {
                currTime: new Date(),  //当前时间
                searchContent: '',
                searchList: [],
                routeList: [],
                list: [
                    {title: '全视之眼', route: '/eye'},
                    {title: '数据中心', route: '/property'},
                    {title: '大数据分析', route: ''},
                    {title: 'GIS地图', route: '/gisMap'},
                    {title: '物业管理', route: ''},
                    {title: '第三方应用', route: ''},
                    {title: '系统配置', route: ''},
                    {title: '数据可视化', route: '/analysis'},
                    {title: '物联网', route: '/basicStruc'},
                    {title: '官网门户', route: ''},
                    {title: '电子票务', route: ''},
                    {title: '微信公众号', route: ''},
                    {title: '电子商圈', route: ''},
                ],
                activeIndex: 0
			}
	   },
        filters: {
            timeFiler(item) {
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
            ...mapActions(['getUserDetailInfo']),
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null || url === undefined) {
                    return '../../../static/img/user.png'
                } else {
                    return url
                }
            },
            gqjq(){
                if (this.getUserRole.includes('01') || this.getUserRole[0] == 1) {
                    this.$router.push('/eye')
                }else {
                    this.$message.error('此模块暂不为您开放，请联系管理员开放权限！')
                }
            },
            qtxgjq(){
                // if (this.getUserRole[0] == 1) {
                //     this.$router.push('/gisMap')
                // }else {
                //     this.$message.error('此模块暂不为您开放，请联系管理员开放权限！')
                // }
            },
            slsjq(){
                if (this.getUserRole.includes('04') || this.getUserRole[0] == 1) {
                    this.$router.push('/Property')
                }else {
                    this.$message.error('此模块暂不为您开放，请联系管理员开放权限！')
                }

            },
            requestFullScreen(){
                // if (this.getUserRole.includes('03') || this.getUserRole[0] == 1) {
                //     this.$router.push('analysis')
                // } else {
                //     this.$message.error('此模块暂不为您开放，请联系管理员开放权限！')
                // }
            },
            getUserCenter () {
                if (this.getUserRole.includes('06') || this.getUserRole[0] == 1) {
                    this.$router.push('/organization')
                } else {
                    this.$message.error('此模块暂不为您开放，请联系管理员开放权限！')
                }
            },
            qtxgjqProperty(){
                // if (this.getUserRole.includes('05') || this.getUserRole[0] == 1) {
                //     this.$router.push('/basicStruc')
                // } else {
                //     this.$message.error('此模块暂不为您开放，请联系管理员开放权限！')
                // }
            },
            slsjqProperty(){
            },

            isCur(index) {
                return index === this.activeIndex
            },
            noSearch () {
                this.searchList = []
            },
		    search (e) {
            },
            analysisHref(){
                window.open(this.$config.analysisHref);
            },
            searchAnything () {
                if (this.searchContent.trim() !== ''){
                    this.importAnything()
                } else {
                    this.searchList = this.list
                }
            },
            importAnything (e) {
                this.searchList = this.list.filter(item => {
                    if (item.title.includes(this.searchContent)) {
                        return item
                    }
                    this.activeIndex = 0
                })
                if (e.keyCode === 38) {//上
                    e.preventDefault()
                    e.stopPropagation()
                    if (this.activeIndex > 0) {
                        this.activeIndex--;
                        if (this.searchList.length > 4) {
                            this.$refs.dev.style.top = (-this.activeIndex * 24)+ 'px'
                        }
                        if (this.activeIndex > this.searchList.length - 4) {
                            this.$refs.dev.style.top = (-(this.searchList.length - 4) * 24)+ 'px'
                        }
                    }
                    console.log(this.$refs.dev.style.top, 'opopoppoppp')
                }
                if (e.keyCode === 40) {//下
                    e.preventDefault()
                    e.stopPropagation()
                    if (this.activeIndex < this.searchList.length - 1) {
                        console.log(this.activeIndex, '*********',this.searchList.length)
                        this.activeIndex++;
                        if (this.searchList.length > 4) {
                            this.$refs.dev.style.top = (-this.activeIndex * 24)+ 'px'
                        }
                        if (this.activeIndex > this.searchList.length - 4 && this.searchList.length > 4) {
                            console.log(8888)
                            this.$refs.dev.style.top = (-(this.searchList.length - 4) * 24)+ 'px'
                        }
                    } else {
                        this.activeIndex = this.searchList.length - 1
                    }
                }
                if (e.keyCode === 13) {
                    e.preventDefault()
                    e.stopPropagation()
                    let info = this.searchList.filter((item,index)=> {
                       if(index === this.activeIndex) {
                           return item
                       }
                    })
                    this.goPage(info[0].route)
                }

            },
            goPage (url) {
                console.log(333)
                if (url.includes('http')) {
                    window.location.href = url
                } else {
                    this.$router.push(url)
                }
            },
        },
        components: {
            ScrollContainer
        },
        async created () {
		    await this.getUserDetailInfo()
        },
        computed: {
            ...mapGetters(['getUserInfo','getUserDetailMsg','getUserRole'])
        }

	}
</script>
<style>
    .el-row {
        margin-bottom: 10px;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
<style scoped lang="scss" type="text/scss">
    a{text-decoration: none;color: #fff;font-size: 12px;}
    #entrence{
        width: 100%;
        height:100%;
        min-width:rem(1450);
        min-height:rem(650);
        position:relative;
        background: url('../../../static/img/index-bg.png') no-repeat;
        background-size:cover;
        display: flex;
        flex-direction: column;
        header{
            width:100%;
            height: rem(50);
            font-size: rem(20);
            color: #fff;
            background: url('../../../static/img/index-top.png') no-repeat;
            p{
                width: rem(400);
                line-height: rem(50);
                margin-left: rem(200);
                float: left;
            }
            #getTime{
                line-height: rem(50);
                font-size: rem(12);
                float: right;
                margin-right: rem(100);
            }
            .userAvatar {
                width: rem(30);
                height: rem(30);
                border-radius: 50%;
                float: right;
                margin-top: rem(10);
                margin-right: rem(20);
            }
            .user{
                float: right;
                width: rem(100);
                line-height: rem(50);
                text-indent: rem(20);
                font-size: rem(14);
                margin-left: rem(-15);
            }
            .indexExit{
                width: rem(20);
                height:rem(35);
                background: url(../../../static/img/exit.png) no-repeat;
                background-size:rem(14);
                background-position: 0 rem(15);
                line-height: rem(35);
                float: right;
                margin-right: rem(200);
            }
        }
        .main{
            width: rem(800);
            flex:1;

            margin:rem(120) auto;
            min-height: rem(268);
            .search{
                width:rem(500);
                height: rem(40);
                margin: rem(-50) auto 0;
                background: rgba(0,0,0,0.1);
                position: relative;
                border-radius: 3px;
                input{
                    width:rem(400);
                    height: rem(30);
                    margin: rem(5) rem(0) rem(5) rem(5);
                    border: none;
                    text-indent: rem(10);
                    font-size: rem(12);
                }
                button{
                    width:rem(85);
                    height: rem(30);
                    margin:rem(5) rem(5) rem(5)  0 ;
                    border:none;
                    background: #f6b75a;
                    color: #fff;
                    font-size: rem(12);
                    cursor: pointer;
                    float: right;
                }
                .searchContent {
                    background: rgba(225,225,225,.6);
                    position: absolute;
                    width: 100%;
                    height: auto;
                    height: rem(100);
                    z-index: 9;
                    border-bottom-left-radius: rem(5);
                    border-bottom-right-radius: rem(5);
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
                        // background-color: rgba(0, 0, 0, 0.2);
                        background-color: #C4C4C4;
                    }
                    ul{
                        width: 100%;
                        /*height: 100%;*/
                        padding: rem(5) rem(10);
                        box-sizing: border-box;
                        position: absolute;
                        li{
                            width: 100%;
                            height: rem(24);
                            line-height: rem(24);
                            text-align: left;
                            font-size: rem(12);
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

            .entrence-cont{
                width:rem(770);
                margin:rem(15);
                margin-top: rem(30);
                img{
                    position: absolute;
                    left: 40%;
                    top: 40%;
                    width: rem(25);
                    height: rem(25);
                }
            }
            #top{
                margin-bottom: rem(10);
                height: 60%;
                ul{
                    width: 100%;
                    display: flex;
                    height: 100%;

                    li{
                        width: 16%;
                        margin-right: rem(10);

                    }
                    li:first-child{
                        width:33%;
                    }
                    li:last-child{
                        background: #44bccd;
                        margin-right: 0;
                    }
                    .one{
                        .list{
                            display: flex;
                            justify-content: space-between;
                            height: 49%;
                            .listO{
                                width:48%;
                                background: #66d354;
                            }
                            .listT{
                                width:48%;
                                background: #6f7dbc;
                            }
                        }
                        .estate{
                            width: 100%;
                            height: 48%;
                            margin-bottom:rem(10);
                            background: #008dd4;
                        }
                    }
                    .two{
                        width: 50%;
                        display: flex;
                        flex-direction: column;
                        .bigData{
                            width:100%;
                            height: 47.8%;
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: rem(10);
                            div:first-child{
                                width:32%;
                                background: #f6b75a;
                            }
                            div:last-child{
                                width:66%;
                                background: #d9776a;
                            }
                        }
                        .eye{
                            width:100%;
                            flex:1;
                            display: flex;
                            justify-content: space-between;
                            #eye{
                                width:66%;
                                background:#3296d2;
                                img{
                                    left: 35%;
                                    width: rem(80);
                                    height: auto;
                                }
                            }
                            .change{
                                width: 31%;
                                position: relative;
                                background: #6f7dbc;
                                a{
                                    display: inline-block;
                                    width: 100%;
                                }
                            }
                        }
                    }
                    #bee img{top: 44%;}
                }
            }
            #bottom{
                margin-top: 0;
                height: 31%;
                ul{
                    width: 100%;
                    display: flex;
                    height: 100%;
                    li{
                        width: 16%;
                        margin-left: rem(10);
                        cursor: pointer;
                        -webkit-perspective: 4000px;
                        height: 100%;
                    }
                    li:first-child{
                        width: 33%;
                        background: #f6b75a;
                        margin: 0;
                    }
                    li:nth-child(2){
                        background: #44bccd;
                    }
                    li:nth-child(3){
                        background: #66d354;
                    }
                    li:nth-child(4){
                        background: #ff907f;
                    }
                    li:nth-child(5){
                        background: #3296d2;
                    }
                }


            }
        }
        footer{
            width:100%;
            height: rem(35);
            background: rgba(0,0,0,0.1);
            text-align: center;
            font-size: rem(12);
            line-height: rem(35);
            color: #fff;
        }
    }
    ul a{
        display: block;
        width: 100%;
        height: 100%;
        padding-top: rem(10);
        padding-left: rem(14);
        box-sizing: border-box;
    }
    .change{
        box-shadow:0 rem(3) rem(8) rgba(0, 0, 0, 0.3);
        position: relative;
    }
    #property img{left: 40%;}


    .change:hover{
        transform: scale(1.1);
        transition-duration: 1.5s;
        z-index: 10;
        box-shadow: 0 rem(3) rem(30) rem(2) rgba(0,0,0,0.8);
    }
    input:focus{outline: none;}
    button:focus{outline: none;}
    .conversion{
        background: red;
        width: 100%;
        height: 100%;
        margin-top: rem(30);
    }
    .grid-content{
        background: #f00;
    }
    #entrence .main .el-carousel .invalid{
        background: #C0C4CC!important;
        cursor: default;
        a{
            cursor: default;
        }
    }
    #entrence .main .el-carousel .invalid:hover{
        transform: scale(1);
        box-shadow:0 rem(3) rem(8) rgba(0, 0, 0, 0.3);
        transition-duration: 0s;
    }
</style>
