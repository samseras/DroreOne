<template>
    <div class="visualization">
        <img src="../../static/img/visualLT.png" alt="" class="visualLT">
        <img src="../../static/img/visualRT.png" alt="" class="visualRT">
        <img src="../../static/img/visualLB.png" alt="" class="visualLB">
        <img src="../../static/img/visualRB.png" alt="" class="visualRB">
        <nav class="visualHead">
                <div class="time">
                    {{currTime | timeFiler}} ({{currTime | weekFiler}})
                </div>
                <div class="visualList">
                    <el-menu default-active="guide" router>
                        <el-menu-item v-for="(item,i) in listDataL" :key="i" :index="item.index" :class="activeIndex === i?'active':''">
                        <!--<el-menu-item v-for="(item,i) in listDataL" :key="i" :index="item.index">-->
                            {{item.title}}
                        </el-menu-item>
                    </el-menu>
                </div>
            <!--</div>-->
            <div class="visualCenter">
                <img src="../../static/img/visualHead.png" alt="">
                <p>运河数据分析平台</p>
            </div>
                <div class="visualHome"  @click="returnHome">
                    <img src="../../static/img/visualHome.png" alt=""> 主页
                </div>
                <div class="visualExit" @click="logout">
                    <img src="../../static/img/visualExit.png" alt=""> 退出
                </div>
            <!--</div>-->
        </nav>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import screenfull from 'screenfull'
    import {mapActions} from 'vuex'
    export default {
        name: "data-visualization",
        data(){
            return{
                isFullscreen: false,
                activeIndex:3,
                currTime: new Date(),   //当前时间
                listDataL:[
                    {title:'客流量分析',index:'passengerFlow'},
                    {title:'票务数据分析',index:'ticket'},
                    {title:'停车场数据分析',index:'parking'},
                    {title:'客源地分析',index:'originTrip'},
                    {title:'景区景点热力图',index:'scenicHeaTMap'}
                ],
            }
        },
        methods:{
            ...mapActions(['logout']),
            logout() {
                this.exitFullScreen()
                let data = JSON.parse(localStorage.getItem('token'))
                this.$store.dispatch('logout',data).then(() => {
                    this.$message.success('登出成功')
                    location.reload()
                })
            },
            exitFullScreen(){
                // if (!screenfull.enabled) {// 如果不允许进入全屏，发出不允许提示
                //     this.$message({
                //         message: '不支持全屏',
                //         type: 'warning'
                //     })
                //     return false
                // }
                screenfull.exit()
            },
            returnHome(){
                this.exitFullScreen()
                this.$router.push('/droreone')
            }
        },
        filters:{
            timeFiler(item) {
                // console.log(item, '9090')
                return moment(item).format('YYYY.MM.DD')
            },
            weekFiler(item) {
                let arr = ['天', '一', '二', '三', '四', '五', '六']
                let day = item.getDay()
                let week = arr.filter((item, index) => {
                    return index === day
                })
                return `周${week[0]}`
            },
        },
        mounted(){

        },
        created(){

        }
    }
</script>
<style lang="scss" type="text/scss">
    .visualization{
        .el-menu{
            border: none;
            display: flex;
            background: none;
            .el-menu-item{
                color: #02d2ec;
                text-align: center;
                line-height: 100px;
                font-size: 16px;
            }
             .active{
                margin-left: 95%;
            }
        }
        .el-menu-item:focus, .el-menu-item:hover{
            background: none;
            color: #f9ca1a;
        }

    }

</style>
<style lang="scss" type="text/scss">
    .visualization{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: url("../../static/img/visualizationBg.png");
        position: relative;
        .visualLT{
            position: absolute;
            top: 10px;
            left: 10px;
        }
        .visualRT{
            position: absolute;
            top: 10px;
            right: 10px;
        }
        .visualLB{
            position: absolute;
            bottom: 10px;
            left:10px;
        }
        .visualRB{
            position: absolute;
            right: 10px;
            bottom: 10px;
        }
        .visualHead{
            width: 100%;
            height: 80px;
            color: #02d2ec;
            display: flex;
            padding-left: 50px;
            box-sizing: border-box;
                .time{
                    width: 150px;
                    line-height: 100px;
                    color: #fff;
                    text-align: center;
                }
                .visualList{
                    width: 75%;
                    display: flex;
                    line-height: 100px;
                    margin-left: 50px;
                    div{
                        color: #02d2ec;
                        text-align: center;
                        margin: 0 25px;
                    }
                }
                .visualExit{
                    width: 100px;
                    height: 100px;
                    margin-top: 42px;
                    z-index: 10;
                }
                .visualHome{
                    width: 100px;
                    height: 100px;
                    margin-top: 40px;
                    z-index: 10;
                }
            .visualCenter{
                flex: 1;
                position: absolute;
                left: 36%;
                p{
                    position: absolute;
                    width: 100%;
                    text-align: center;
                    font-size: 26px;
                    color: #12eefc;
                    top: 15px;
                    text-align: center;
                }
            }

        }
        .content{
           flex: 1;
            margin: 0 45px 45px;
        }
    }
</style>
