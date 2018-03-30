<template>
    <el-container>
        <el-header>
            <el-row :gutter="10" class="alleye">
                <el-col :xs="6" :sm="7" :md="7" :lg="5" :xl="4">
                    <img src="../../../static/img/eye.png"/>Workbench
                </el-col>
                <el-col :xs="6" :sm="6" :md="7" :lg="11" :xl="12" class="control">
                    <div v-for="(item,index) in manage" @click="goModule(item,index)"
                         :class="activeIndex === index? 'active':''">{{item}}
                    </div>
                </el-col>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="6" id="getTime">
                    {{currTime | timeFiler}} ({{currTime | weekFiler}})
                </el-col>
                <el-col :xs="7" :sm="6" :md="5" :lg="3" :xl="2">
                    <div v-for="item in title">
                        <a href="#">
                            <i v-html="item"></i>
                        </a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>

    </el-container>
</template>


<script>
    import moment from 'moment'
    // import api from '@/api'

    export default {
        data() {
            return {
                manage: ['主页', '管控', '设施', '分析', '配置'],
                currTime: new Date(),   //当前时间
                title: ["&#xe8c0;", "&#xe627;", "&#xe647;"],
                activeIndex: 1
            }
        },
        // created () {
        //     api.analyze.getControlData().then((res)=>{
        //         console.log(res, 'ioioioioioooo')
        //     })
        // },
        filters: {
            timeFiler(item) {
                console.log(item, '9090')
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
            goModule(item, index) {
                this.activeIndex = index
                switch (item) {
                    case '主页':
                        this.$router.push({path: '/homePage'});
                        break;
                    case '管控':
                        this.$router.push({path: '/controler'});
                        break;
                    case '设施':
                        this.$router.push({path: '/facility'});
                        break;
                    case '分析':
                        this.$router.push({path: '/analyze'});
                        break;
                    case '配置':
                        this.$router.push({path: '/deploy'});
                        break;
                }
            }
        },
        components: {}
    }
</script>

<style lang="scss">
    .el-container,.is-vertical{
        width: 100%;
        height: 100%;
        min-width: rem(1120);
    }
    .el-header {
        width: 100%;
        height: rem(70) !important;
    }
    .el-row{
        width: 100%;
        margin: 0 !important;
    }
    .el-main{
        padding: 0 !important;
    }
</style>
<style lang="scss" scoped>
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
        line-height: 70px;
        display: flex;
    }

    .alleye .el-col:first-child {
        font-size: 22px;
        position: relative;
    }

    .alleye .el-col:first-child img {
        margin-top: 15px;
        width: 65px;
        height: 40px;
        padding-right: 10px;
        vertical-align: middle;
    }

    .control div {
        margin: 0 5px;
        line-height: 70px;
        cursor: pointer;
    }

    #getTime {
        line-height: 70px;
        font-size: 16px;
        text-align: center;
    }

    .alleye > .el-col:last-child div {
        line-height: 70px;
        margin: 0 10px;
    }

    .alleye > .el-col:last-child div a {
        display: block;
        line-height: 70px;
    }

    .el-main {
        flex: 1;
    }

    .element {
        width: 100%;
        height: 100%;
    }
    .active{
        color: #0086b3;
    }
</style>
