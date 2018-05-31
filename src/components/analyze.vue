<template>
    <div class="analyze">
        <div class="analyzeHeader" v-show="isshowHead">
            <el-container>
                <el-header  v-show = "isshowHead">
                    <el-row :gutter="10" class="alleye">
                        <el-col :xs="8" :sm="8" :md="6" :lg="6" :xl="6" >
                            <img src="../../static/img/eye.png"/>数据可视化汇总
                        </el-col>
                        <el-col :xs="9" :sm="9" :md="13" :lg="13" :xl="13" class="control">
                             <p>内容</p>
                        </el-col>
                        <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="3" class="control">
                            <div class="func">
                                <el-menu  class="el-menu-demo" mode="horizontal" router>
                                    <el-submenu index="">
                                        <template slot="title">
                                            <span class="Admin">Admin</span>
                                            <img src="./../../static/img/peopleInfo.svg" alt="">
                                        </template>
                                        <el-menu-item index="">个人中心</el-menu-item>
                                        <el-menu-item index="/droreone">返回主页</el-menu-item>
                                        <el-menu-item index="/login">退出</el-menu-item>
                                    </el-submenu>
                                </el-menu>
                            </div>
                        </el-col>
                        <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" class="control">
                            <!--<button class="publish" ><router-link :to="'/screen/'+currenId">发布</router-link></button>-->
                            <button class="publish" @click="requestFullScreen"><router-link :to="{ path:'/screen/'+currenId, params: {'n': type} }" >发布</router-link></button>

                        </el-col>
                    </el-row>
                </el-header>
            </el-container>
        </div>
        <div class="analyzeDetails">
            <div class="analyzeConfirm" v-if="confirmErr">
                <div class="analyzeMenu" v-if="hideList">
                    <ul>
                        <li v-for="(item,index) in sidebarList" @click="isShowAnalyze(item.dashboard_id,index,item.refresh_interval,item.template_type)"  :class="activeIndex === index?'active':''" :id="item.id" :listName = "item.name" >
                            {{item.name}}`
                        </li>
                    </ul>
                </div>
                <div class="analyzeContent" >
                    <router-view @hideList = "hideLists" :typeTemp = "type"></router-view>
                </div>
            </div>
            <err-list v-else :echatListErrs = "echatListErr"></err-list>
        </div>

    </div>

</template>

<script>
  // import echarts from "../../static/js/echarts.min.js"
  import passengerFlow from "./analysisSystem/analyze/passengerFlow.vue"
  import api from "@/api"
  import errList from "./pages/err.vue"
  import { mapMutations } from 'vuex'
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
            echatListErr:{
                pullData:false,
                errInform:false,
            }
  		}
  	},
    async created () {
  	  await this.getDashboradList()
      this.$router.push({path:`/analyze/${this.sidebarList[0].dashboard_id}`});
      this.$store.commit('REFRESH_DATA_TYPE', this.sidebarList[0].refresh_interval)
    },
  	components:{
  		passengerFlow,
        errList
  	},
    methods:{
        ...mapMutations(['REFRESH_DATA_TYPE']),
        hideLists(data){
               this.hideList = !data.list;
               this.isshowHead = !data.head;
              // this.$emit('hideHead',hideData);
        },
        requestFullScreen() {
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
        isShowAnalyze (id,index,refresh,type) {
            // console.log(this.$router,"this.$router.path")
              this.type = type;
              console.log(this.type,"this.type")
              this.currenId = id;
	          this.$router.push({path: `/analyze/${id}`});
	          this.activeIndex = index;
              this.$store.commit('REFRESH_DATA_TYPE', refresh)
        },
        async getDashboradList(){
           await api.analyze.getDashboradList().then(res => {
                this.sidebarList = res.result;
                console.log(this.sidebarList,"!!!!!!@@@@@@@")
               this.type = this.sidebarList[0].template_type;
                console.log(this.type,"_____")
               this.currenId = this.sidebarList[0].dashboard_id;
               if(this.sidebarList.length == 0){
                   this.confirmErr = false;
                   this.echatListErr.errInform = false;
                   this.echatListErr.pullData = true;
                   return
               }else{
                   this.confirmErr = true;
                   this.echatListErr.errInform = false;
                   this.echatListErr.pullData = false;
               }
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
        }
      },
      watch: {
  	    '$route' () {
  	        clearInterval(window.SETTIMER)
        }
      },
    mounted(){

      }
    }


</script>
<style lang="scss">
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
                img{
                    width: rem(60);
                    height: rem(30);
                    padding-right: rem(10);
                    vertical-align: middle;
                }
            }
            .publish{
                width: rem(60);
                height: rem(60);
                outline: none;
                border: none;
                background: none;
                a{
                    display: inline-block;
                    width: rem(60);
                    height: rem(60);
                    color: #fff;
                }
            }
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
                            padding: rem(8) rem(10) rem(8) rem(40);
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
                }
            }

        }
    }

</style>
