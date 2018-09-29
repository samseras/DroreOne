<template>
    <div class="controler">
        <div class="map">
            <Map></Map>
        </div>
        <div class="menu">
            <div class="left" v-if="isShowControler && getSearchState">
                <router-view/>
            </div>
            <div class="right">
                <i class="el-icon-d-arrow-right" v-if="exhibition" @click="packUpHidden(1)"></i>
                <i class="el-icon-d-arrow-left" v-if="!exhibition" @click="packUpHidden(0)"></i>
                <ul>
                    <li v-for="(item, index) in controler" v-if="item.enable" :class="activeIndex === index? 'active':''" @click="goControlModule(index)">
                        <router-link :to="item.route"><img :src="item.img" :alt="item.desc" :title="item.desc">
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Map from '@/components/map'
    import {mapGetters,mapMutations} from 'vuex'
    import api from '@/api'
    import _ from 'lodash'


    export default {
        data() {
            return {
                title: [
                    {names:'CAMERA',route: '/controler/camera', img: '../../../static/img/camera.svg', desc: "摄像头",controlShow:false},
                    {names:'BROADCAST',route: '/controler/broad', img: '../../../static/img/broadcast.svg', desc: "广播",controlShow:false},
                    {names:'WIFI',route: '/controler/wifi', img: '../../../static/img/wifi.svg', desc: "WIFI",controlShow:false},
//                    {names:'MONITORS',route: '/controler/environment', img: '../../../static/img/detection.svg', desc: "环境检测传感器",controlShow:false},
                    {enable: true,names:'WARN',route: '/controler/warn', img: '../../../static/img/warn.svg', desc: "告警",controlShow:true},
                    {names:'LED',route: '/controler/screen', img: '../../../static/img/led.svg', desc: "LED大屏",controlShow:false},
                    // {enable: true,names:'PERSON',route: '/controler/person', img: '../../../static/img/dmis.svg', desc: "个人定位",controlShow:true},
                    {names:'LIGHT',route: '/controler/light', img: '../../../static/img/light.svg', desc: "路灯",controlShow:false},
                    {names:'SECURITY',route: '/controler/security', img: '../../../static/img/security.svg', desc: "巡检计划",controlShow:false},
                    // {route: '/controler/other', img: '../../../static/img/else.png', desc: "其他"}
                ],
                isShowControler: false,
                exhibition: true,
                activeIndex: 1,
                isSearch: false,
                controler:[
                    {enable: true,names:'CAR',route: '/controler/car', img: '../../../static/img/boatCar.svg', desc: "车船调度",controlShow:true},
                    {enable: true,names:'WARN',route: '/controler/warn', img: '../../../static/img/warn.svg', desc: "告警",controlShow:true},
                    {enable: false,names:'PERSON',route: '/controler/person', img: '../../../static/img/dmis.svg', desc: "个人定位",controlShow:true},
                    {enable: true,names:'SECURITY',route: '/controler/security', img: '../../../static/img/security.svg', desc: "巡检计划",controlShow:true},

                ],
                controlShow:true,
                CAMERA:false,
                BROADCAST:false,
                WIFI:false,
                MONITORS:false,
                WARN:false,
                LED:false,
                PERSON:false,
                CAR:false,
                LIGHT:false
            }
        },
        components: {
            Map
        },
        created () {
            let route = this.$route.path;
            if (route.includes('camera')){
                this.activeIndex = 4
            }
            if (route.includes('broad')){
                this.activeIndex = 5
            }
            if (route.includes('wifi')){
                this.activeIndex = 0
            }
            if (route.includes('environment')){
                this.activeIndex = 1
            }
            if (route.includes('warn')){
                this.activeIndex = 6
            }
            if (route.includes('screen')){
                this.activeIndex = 3
            }
            if (route.includes('person')){
                this.activeIndex = 8
            }
            if (route.includes('car')){
                this.activeIndex = 7
            }
            if (route.includes('light')){
                this.activeIndex = 2
            }
            if (this.getSearchInfo.id) {
                this.isShowControler = true
            }
            if (this.getSearchState) {
                this.isShowControler = true
            }
            this.getAllControler()
        },
        methods: {
            ...mapMutations(['SHOW_SEARCH']),
            packUpHidden () {
                this.isShowControler = !this.isShowControler
                this.exhibition = !this.exhibition
                this.$store.commit('SHOW_SEARCH', this.isShowControler)
            },
            goControlModule (index) {
                if(this.isShowControler){
                    if(this.activeIndex ==index){
                        this.isShowControler = false
                    }
                }else {
                    this.isShowControler = true
                }
                this.$store.commit('SHOW_SEARCH', this.isShowControler)
                this.activeIndex = index
            },
            async getAllControler(){
                await api.lib.getAllDeviceType().then((res)=>{
                    console.log(res,'这是请求回来的数据')
                    // for(let i=0;i< this.controler.length;i++){
                    //     for(let j=0;j< this.title.length;j++){
                    //         if(this.title[j].name===this.controler[i].name){
                    //             if(this.controler[i].value==="ON"){
                    //                 this.title[j].controlShow= true
                    //             }else if(this.controler[i].value==="OFF"){
                    //                 this.title[j].controlShow= false
                    //             }
                    //         }
                    //     }
                    // }
                    res.forEach(item => {
                        this.title.forEach(item1 => {
                            if (item1.desc.includes(item.name)) {
                                item = {...item,...item1}
                                this.controler.unshift(item)
                            }
                        })
                    })
                    console.log(this.controler, '这个是终极合并')
                    // this.controler = _.uniqBy(this.controler, 'name')
                }).catch((err)=>{
                    console.log(err)
                })

            }
        },
        watch: {
            getSearchInfo () {
                this.isShowControler = true
                this.isSearch = true
            }
        },
        computed: {
            ...mapGetters(['getSearchInfo','getSearchState','getTreeState'])
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    .controler{
        width: 100%;
        height: 100%;
        display: flex;
        .menu{
            /*width: rem(300);*/
            height: 100%;
            display: flex;
            position: fixed;
            right: 0px;
            top:0px;
            padding-top: rem(60);
            box-sizing: border-box;
            .right{
                width: rem(50);
                height: 100%;
                float: right;
                display: flex;
                flex-direction: column;
                i{
                    display: inline-block;
                    width: 100%;
                    height: rem(40);
                    text-align: center;
                    line-height: rem(40);
                    font-size: rem(20);
                    cursor: pointer;
                    background: #fff;
                }
                ul{
                    width: 100%;
                    flex: 1;
                    padding-top: rem(40);
                    box-sizing: border-box;
                    background: #f2f2f2;
                    li{
                        width: 100%;
                        height: rem(60);
                        cursor: pointer;
                        a{
                            display: block;
                            width: 100%;
                            text-align: center;
                            height: 100%;
                            line-height: rem(60);
                            img{
                                vertical-align: middle;
                                width: rem(22);
                            }
                        }
                    }
                    .active{
                        background: #ccc;
                    }
                }
            }
            .left{
                width: rem(250);
                height: 100%;
                background: #fff;
            }
        }
        .map{
            flex: 1;
            height: 100%;
            background: #000;

        }
    }

</style>
