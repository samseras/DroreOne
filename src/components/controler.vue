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
                    <li v-for="(item, index) in title" :class="activeIndex === index? 'active':''" @click="goControlModule(index)">
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


    export default {
        data() {
            return {
                title: [
                    {route: '/controler/camera', img: '../../../static/img/camera.svg', desc: "摄像头"},
                    {route: '/controler/broad', img: '../../../static/img/broadcast.svg', desc: "广播"},
                    {route: '/controler/wifi', img: '../../../static/img/wifi.svg', desc: "WiFi"},
                    {route: '/controler/environment', img: '../../../static/img/detection.svg', desc: "环境检测"},
                    {route: '/controler/warn', img: '../../../static/img/warn.png', desc: "警告"},
                    {route: '/controler/screen', img: '../../../static/img/led.svg', desc: "大屏"},
                    {route: '/controler/person', img: '../../../static/img/dmis.svg', desc: "个人定位"},
                    {route: '/controler/car', img: '../../../static/img/boatCar.svg', desc: "车船调度"},
                    {route: '/controler/light', img: '../../../static/img/light.svg', desc: "路灯"},
                    {route: '/controler/other', img: '../../../static/img/else.png', desc: "其他"}
                ],
                isShowControler: false,
                exhibition: true,
                activeIndex: 1,
                isSearch: false
            }
        },
        components: {
            Map
        },
        created () {
            if (this.getSearchInfo.id) {
                this.isShowControler = true
            }
        },
        methods: {
            ...mapMutations(['SHOW_SEARCH']),
            packUpHidden () {
                this.isShowControler = !this.isShowControler
                this.exhibition = !this.exhibition
                this.$store.commit('SHOW_SEARCH', this.isShowControler)
            },
            goControlModule (index) {
                this.isShowControler = true
                this.$store.commit('SHOW_SEARCH', this.isShowControler)
                this.activeIndex = index
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
            background: yellowgreen;
        }
    }

</style>
