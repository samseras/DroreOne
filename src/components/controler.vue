<template>
    <div class="controler">
        <div class="map">
            <Map></Map>
        </div>

        <div class="menu">
            <div class="left" v-if="isShowControler">
                <router-view/>
            </div>
            <div class="right">
                <p v-if="exhibition" @click="packUpHidden(1)">《</p>
                <p v-if="!exhibition" @click="packUpHidden(0)">》</p>
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
    // import dataId from "../../static/xxsd_map.json"
    // import Map from "../../static/js/droreMap.js"
    // import mapLabe from "../../static/js/mapLabelInformationChildrenForm.js"
    // import masterDataGrid1 from "../../static/js/masterDataGrid1.js"
    import Map from '@/components/map'


    export default {
        data() {
            return {
                title: [
                    {route: '/controler/camera', img: '../../../static/img/camera.png', desc: "摄像头"},
                    {route: '/controler/broad', img: '../../../static/img/broadcast.png', desc: "广播"},
                    {route: '/controler/wifi', img: '../../../static/img/WiFi.png', desc: "WiFi"},
                    {route: '/controler/environment', img: '../../../static/img/enviroMon.png', desc: "环境检测"},
                    {route: '/controler/warn', img: '../../../static/img/warn.png', desc: "警告"},
                    {route: '/controler/screen', img: '../../../static/img/screen.png', desc: "大屏"},
                    {route: '/controler/person', img: '../../../static/img/personLocation.png', desc: "个人定位"},
                    {route: '/controler/car', img: '../../../static/img/car.png', desc: "车船调度"},
                    {route: '/controler/other', img: '../../../static/img/else.png', desc: "其他"}
                ],
                isShowControler: false,
                exhibition: true,
                activeIndex: 1
            }
        },
        components: {
            Map
        },
        methods: {
            //该事件是显示对应的标识
            // show: function (index) {
            //     this.isShow.forEach((item, idx) => {
            //         this.$set(this.isShow, idx, (idx == index ? true : false),
            //             Map.unShowAllLayer(),
            //             // Map.showLayer(dataId.data[idx].id)
            //         )
            //     })
            // },
            packUpHidden () {
                this.isShowControler = !this.isShowControler
                this.exhibition = !this.exhibition
            },
            goControlModule (index) {
                this.activeIndex = index
            }
        }
        // mounted() {
        //     Map.init();
        // }
    }
</script>

<style lang="scss" scoped>
    .controler{
        width: 100%;
        height: 100%;
        display: flex;
        .menu{
            /*width: rem(300);*/
            height: 100%;
            display: flex;
            float: right;
            .right{
                width: rem(50);
                height: 100%;
                float: right;
                display: flex;
                flex-direction: column;
                p{
                    width: 100%;
                    height: rem(50);
                    text-align: center;
                    line-height: rem(50);
                    cursor: pointer;
                }
                ul{
                    width: 100%;
                    flex: 1;
                    padding-top: rem(50);
                    box-sizing: border-box;
                    background: #EFF7F2;
                    li{
                        width: 100%;
                        height: rem(50);
                        cursor: pointer;
                        a{
                            display: block;
                            width: 100%;
                            text-align: center;
                            height: 100%;
                            line-height: rem(50);
                            img{
                                vertical-align: middle;
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
            }
        }
        .map{
            flex: 1;
            height: 100%;
            background: yellowgreen;
        }
    }

</style>
