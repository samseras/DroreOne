<template>
    <div class="analyze">
        <div class="analyzeHeader" v-show="isshowHead">
            <el-container>
                <el-header  v-show = "isshowHead">
                    <el-row :gutter="10" class="alleye">
                        <el-col :xs="19" :sm="19" :md="21" :lg="21" :xl="21" >
                            <router-link to="/droreone">
                                <img src="../../static/img/eye.png"/>分析
                            </router-link>
                        </el-col>
                        <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="3" class="control">
                            <div class="func">
                                <el-menu  class="el-menu-demo" mode="horizontal" router>
                                    <el-submenu index="">
                                        <template slot="title">
                                            <span class="Admin"v-if="getUserDetailMsg.nickname">{{getUserDetailMsg.nickname}}</span>
                                            <span class="Admin"v-if="!getUserDetailMsg.nickname">{{getUserDetailMsg.username}}</span>
                                            <img :src="getUrl(getUserDetailMsg.picturePath)" alt="" @error="imgError">
                                        </template>
                                        <el-menu-item index=""  @click="visible = true">个人中心</el-menu-item>
                                        <el-menu-item index="/droreone">返回主页</el-menu-item>
                                        <el-menu-item @click="logout" index="">退出</el-menu-item>
                                    </el-submenu>
                                </el-menu>
                            </div>
                        </el-col>
                    </el-row>
                </el-header>
            </el-container>
        </div>
        <div class="analyzeDetails">
            <div class="analyzeConfirm" v-if="confirmErr">
                <div class="analyzeMenu" v-if="hideList">
                    <ul>
                        <li v-for="(item,index) in sidebarList" @click="isShowAnalyze(item.dashboard_id,index,item.refresh_interval,item.template_type,item.name)"  :class="activeIndex === index?'active':''" :id="item.id" :listName = "item.name" >
                            {{item.name}}
                        </li>
                    </ul>
                </div>
                <div class="analyzeContent" >
                    <div class="conTentHead">
                        <p>{{dashboradName}}</p>
                        <div>
                            <button class="publish" @click="showSubheading">发布</button>
                            <button class="publish" @click="sharedLinks">分享</button>
                        </div>
                        <div class="subheading" v-if="showTile">
                            <div>
                                <label for="">公司名称 ：</label><input type="text" id="subheading" placeholder="卓锐科技股份有限公司"/>
                                <button @click="requestFullScreen" class="confirmBtn"><router-link :to="{ path:'/screen/'+currenId}" class="confirmScreen">确定</router-link></button>
                                <button @click="cancelRequest">取消</button>
                            </div>
                        </div>
                        <div class="subheading subLink" v-if="showLink">
                            <div>
                                <label for="" style="marginTop: 20px">大屏链接：</label><input type="text" style="marginTop: 25px" :value="screenHrefVal"/>
                                <button :data-clipboard-text = "screenHrefVal" @click="copy" class="screenLink">复制链接</button>
                                <button @click="cancelLink" class="cancelLink">取消</button>
                            </div>
                        </div>
                    </div>
                    <router-view @hideList = "hideLists" :typeTemp = "type" class="routerContent" :confirmErrs = "confirmErr"></router-view>
                </div>
            </div>
            <err-list v-else :echatListErrs = "echatListErr"></err-list>
        </div>
        <UserInfoDialog
            v-if="visible"
            :visible="visible"
            @closeInfoDialog="visible = false">
        </UserInfoDialog>

    </div>

</template>

<script>
  // import echarts from "../../static/js/echarts.min.js"
  import passengerFlow from "./analysisSystem/analysis/passengerFlow.vue"
  import api from "@/api"
  import errList from "./pages/err.vue"
  import { mapMutations,mapGetters,mapActions } from 'vuex'
  import UserInfoDialog from '@/components/userInfoDialog'
  import Clipboard from 'clipboard';

  export default {
      data(){
  		return{
  			isShow:[false,true,false],
  			Analyzedata:[],
            dashboradList:[],
            sidebarList:[],
            activeIndex : 0,
            hideList:true,
            isshowHead:true,
            confirmErr:true,
            currenId:null,
            type:null,
            dashboradName:null,
            showTile:false,
            showLink: false,
            echatListErr:{
                pullData:false,
                errInform:false,
            },
            visible: false
  		}
  	    },
      async created () {
        this.getUserDetailInfo(this.getUserInfo)
  	    await this.getDashboradList()
        this.$router.push({path:`/analysis/${this.sidebarList[0].dashboard_id}`});
        this.$store.commit('REFRESH_DATA_TYPE', this.sidebarList[0].refresh_interval)
      },
      components:{
  		passengerFlow,
        errList,
        UserInfoDialog
  	},
      methods:{
            ...mapMutations(['REFRESH_DATA_TYPE','COMPANY_DATA_NAME']),
            ...mapActions(['logout','getUserDetailInfo']),
            // isErr(data,data1){
            //     console.log(data,"OOOOdata")
            //     console.log(this.confirmErr,"this.confirmErrthis.confirmErr")
            // },
            cancelRequest(){
                this.showTile = false;
            },
            hideLists(data){
                this.hideList = !data.list;
                this.isshowHead = !data.head;
            },
            showSubheading(){
                this.showTile = true;
            },
            sharedLinks(){
                this.showLink = true;
                this.screenHrefVal = window.location.href.replace("analysis","screen");
            },
            copy(){
                let clipboard = new Clipboard('.screenLink');
                this.showLink = false;
                clipboard.on('success', e => {
                    this.$message.info('复制成功')
                    console.log('复制成功')
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    console.log('该浏览器不支持自动复制')
                    // 释放内存
                    clipboard.destroy()
                })
            },
            cancelLink(){
                this.showLink = false;
            },
            requestFullScreen() {
                this.showTile = false;
                let title = $("#subheading").val();
                if(title){
                    this.$store.commit('COMPANY_DATA_NAME', title);
                    sessionStorage.setItem("title",title);
                }else{
                    this.$store.commit('COMPANY_DATA_NAME', '卓锐科技股份有限公司')
                    sessionStorage.setItem("title",'卓锐科技股份有限公司');
                }
                let docElm = document.documentElement;
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
                else if (docElm.msRequestFullscreen) {
                    docElm = document.body; //overwrite the element (for IE)
                    docElm.msRequestFullscreen();
                }
                else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                }
                else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                }
            },
            isShowAnalyze (id,index,refresh,type,name) {
                this.type = type;

                this.currenId = id;
                this.dashboradName = name;
                this.$router.push({path: `/analysis/${id}`});
                this.activeIndex = index;
                this.$store.commit('REFRESH_DATA_TYPE', refresh)
            },
            async getDashboradList(){
                await api.analysis.getDashboradList().then(res => {
                    this.sidebarList = res.result;
                    this.type = this.sidebarList[0].template_type;
                    this.currenId = this.sidebarList[0].dashboard_id;
                    this.dashboradName = this.sidebarList[0].name;
                    let that = this;
                    setTimeout(function(){
                        if(that.sidebarList.length == 0){
                            that.confirmErr = false;
                            that.echatListErr.errInform = false;
                            that.echatListErr.pullData = true;
                            return
                        }else{
                            that.confirmErr = true;
                            that.echatListErr.errInform = false;
                            that.echatListErr.pullData = false;
                        }
                    },100)
                    //  this.sidebarList = this.sidebarList.map(item => {
                    //     item.refreshData = 20000
                    //     return item
                    // })
                    // console.log(this.sidebarList,"11111111111")
                }).catch(err => {
                    this.confirmErr = false;
                    this.echatListErr.errInform = true;
                    this.echatListErr.pullData = false;
                    console.log(err)
                })
            },
            logout() {
                let data = JSON.parse(sessionStorage.getItem('token'))
                this.$store.dispatch('logout',data).then(() => {
                    this.$message.success('登出成功')
                    location.reload()
                })
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
      watch: {
  	    '$route' () {
  	        clearInterval(window.SETTIMER)
        }
      },
      computed: {
          ...mapGetters(['getUserInfo', 'getUserDetailMsg'])
      }
    }

</script>
<style lang="scss">
    .analyze {
        .analyzeHeader{
            width: 100%;
            height: rem(60);
            .el-container{
                width: 100%;
                height: rem(60);
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
                height: rem(60);
                margin: 0 !important;
                .el-col{
                    color: #fff;
                }
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
                border-radius: 50%;
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
    }
</style>
<style lang="scss" type="text/scss" scoped>
    .analyze{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        .analyzeHeader{
            width: 100%;
            height: rem(60);
            background: #2c3b47;
            line-height: rem(60);
            .el-col:first-child{
                padding-right: rem(10);
                color: #fff;
                a{
                    color: #fff;
                }
                img{
                    width: rem(60);
                    height: rem(30);
                    padding-right: rem(10);
                    padding-left: rem(50);
                    vertical-align: middle;
                }
            }
            /*.publish{*/
            /*width: rem(60);*/
            /*height: rem(60);*/
            /*outline: none;*/
            /*border: none;*/
            /*background: none;*/
            /*a{*/
            /*display: inline-block;*/
            /*width: rem(60);*/
            /*height: rem(60);*/
            /*color: #fff;*/
            /*}*/
            /*}*/
        }

        .analyzeDetails{
            width: 100%;
            flex: 1;
            .analyzeConfirm{
                width: 100%;
                height: 100%;
                display: flex;
                .analyzeMenu{
                    width: rem(200);
                    height: 100%;
                    background: #f2f2f2;
                    ul{
                        width: 100%;
                        height: 100%;
                        li{
                            width: rem(200);
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            height: rem(60);
                            padding: rem(15) rem(10) rem(8) rem(40);
                            box-sizing: border-box;
                            text-align: left;
                            cursor: pointer;
                            img{
                                display: inline-block;
                                width: rem(20);
                                height: rem(20);
                                background: red;
                                vertical-align: middle;
                                margin-right: rem(5);
                            }
                        }
                    }
                    .active{
                        background: #fff;
                        color: #52c4f2;
                    }
                }
                .analyzeContent{
                    flex: 1;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    .routerContent{
                        flex: 1;
                    }
                    .conTentHead{
                        width: 100%;
                        height: rem(60);
                        line-height: rem(60);
                        background: #e7e7e7;
                        position: relative;
                        p{
                            width: 100%;
                            text-align: left;
                            font-size: rem(20);
                            text-indent: rem(50);
                        }
                        div{
                            position:absolute;
                            right: 0;
                            top: 0;
                            width: rem(250);
                            margin-left: rem(200);
                            .publish{
                                width: rem(40);
                                height: rem(60);
                                line-height: rem(60);
                                outline: none;
                                border: none;
                                background: none;
                                a{
                                    display: inline-block;
                                    width: rem(40);
                                    height: rem(60);
                                }
                            }
                        }
                        .subheading{
                            position: fixed;
                            width: 100%;
                            height: 100%;
                            background: rgba(0,0,0,0.5);
                            z-index: 1000;
                            div{
                                top: 50%;
                                left: 50%;
                                margin-left: rem(-250);
                                margin-top: rem(-50);
                                width: rem(500);
                                height: rem(100);
                                background: #fff;
                                z-index: 100;
                                position: relative;
                                border-radius: rem(3);
                                label{
                                    margin-left: rem(40);
                                }
                                input{
                                    width:rem(300);
                                    height:rem(25);
                                    text-indent: rem(20);
                                }
                                button{
                                    position: absolute;
                                    top: rem(60);
                                    width: rem(50);
                                    height: rem(30);
                                    right: rem(110);
                                    border: none;
                                }
                                .confirmBtn{
                                    background: #3a8ee6;
                                    color: #fff;
                                }
                                button:last-child{
                                    right: rem(40);
                                    color: #bbbbbb;
                                }
                                .confirmScreen{
                                    color: #fff!important;
                                }
                            }
                        }
                        .subLink{
                            div{
                                height: rem(120);
                                input{
                                    width: rem(330);
                                    text-indent: rem(5);
                                }
                                .screenLink{
                                    position: absolute;
                                   top:rem(75);
                                    right: rem(80);
                                    width: rem(70);
                                    height: rem(30);
                                    text-align: center;
                                    background: #3a8ee6;
                                    border: none;
                                    color: #fff;
                                }
                                .cancelLink{
                                    position: absolute;
                                    top: rem(75);
                                    right: rem(20)!important;
                                    text-align: center;
                                    /*background: #3a8ee6;*/
                                    border: none;
                                    color: #bbbbbb;
                                }
                            }
                        }

                    }
                }
            }

        }
    }

</style>
