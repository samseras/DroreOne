<template>
    <div class="basicMenu">
        <el-menu default-active="/basic-property" router
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :default-openeds="openeds">
            <ScrollContainer>
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title"><img :src="item.icon" alt="">{{ item.title }}</template>
                            <el-menu-item v-for="(subItem,i) in facilityMenu" :key="i" :index="subItem.index" v-if="subItem.enable">
                                <img :src="subItem.icon" alt="">
                                {{ subItem.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-if="!item.subs"><!--用户鉴权显示-->
                        <el-menu-item :index="item.index">
                            <img :src="item.icon" alt="">{{ item.title }}
                        </el-menu-item>
                    </template>
                </template>
            </ScrollContainer>
        </el-menu>

        <div class="content">
            <ScrollContainer>
                <router-view v-if="isRouterAlive"></router-view>
            </ScrollContainer>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import { mapGetters, mapActions} from 'vuex'
    export default {
        name: "basic-menu",
        provide(){
            return {
                reload:this.reload
            }
        },
        data () {
            return{
                isRouterAlive:true,
                openeds:['2'],
                items: [
                    {
                        icon: './../../../static/img/basictype.svg',
                        index: '/basic-property/basictype',
                        title: '设施类型',
                    },
                    {
                        icon: './../../../static/img/basicInfo.svg',
                        index: '2',
                        title: '设施信息',
                        subs: []
                    },
                ],
                subs: [
                    {
                        icon: './../../../static/img/area.svg',
                        index: '/basic-property/area-deploy',
                        title: '片区'
                    },
                    {
                        icon: './../../../static/img/roat.svg',
                        index: '/basic-property/roat-deploy',
                        title: '路网'
                    },
                    {
                        icon: './../../../static/img/boatCar.svg',
                        index: '/basic-property/boat-deploy',
                        title: '车船'
                    },

                    {
                        icon: './../../../static/img/toilet.svg',
                        index: '/basic-property/toilet-deploy',
                        title: '卫生间'
                    },
                    {
                        icon: './../../../static/img/park.svg',
                        index: '/basic-property/park-deploy',
                        title: '停车场'
                    },
                    {
                        icon: './../../../static/img/shop.svg',
                        index: '/basic-property/shop-deploy',
                        title: '商圈'
                    },
                    {
                        icon: './../../../static/img/scenic.svg',
                        index: '/basic-property/scenic-deploy',
                        title: '景点'
                    },

                    {
                        icon: './../../../static/img/trash.svg',
                        index: '/basic-property/trash-deploy',
                        title: '垃圾桶'
                    },
                    {
                        icon: './../../../static/img/indicator.svg',
                        index: '/basic-property/indicator-deploy',
                        title: '指示牌'
                    },
                    {
                        icon: './../../../static/img/plant.svg',
                        index: '/basic-property/plant-deploy',
                        title: '植物'
                    },
                    {
                        icon: './../../../static/img/build.svg',
                        index: '/basic-property/construction-deploy',
                        title: '建筑'
                    },
                    {
                        icon: './../../../static/img/station_menu.svg',
                        index: '/basic-property/station-deploy',
                        title: '站点'
                    },
                    {
                        icon: './../../../static/img/punch_menu.svg',
                        index: '/basic-property/punch-deploy',
                        title: '打卡点'
                    }
                ],
                facilityMenu: []
            }
        },
        methods: {
            ...mapActions(['getFacilityType']),
            reload(){
                this.isRouterAlive = false
                this.$nextTick(()=>{
                    this.isRouterAlive = true
                })
            }
        },
        created () {
            this.getFacilityType()
            if (this.getFacilitTypeMenu.length > 0) {
                let route = ''
                let enableState = false
                this.subs.forEach(item => {
                    this.getFacilitTypeMenu.forEach(item1 => {
                        if (item.title === item1.name && item1.enable) {
                            route = item.index
                            enableState = true
                            return
                        }
                    })
                })
                if (enableState){
                    this.$router.push(route)
                } else {
                    this.$router.push('/basic-property')
                }
            }
        },
        watch: {
            getFacilitTypeMenu () {
                this.facilityMenu = []
                this.getFacilitTypeMenu.forEach(item => {
                    this.subs.forEach(item1 => {
                        if (item.name === item1.title) {
                            item = {...item,...item1}
                            this.facilityMenu.push(item)
                        }
                    })
                })
            }
        },
        components: {
            ScrollContainer
        },
        computed: {
            ...mapGetters([ 'getFacilitTypeMenu'])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .basicMenu .el-submenu .el-menu-item:hover{
        background-color:#283446;
    }
    .basicMenu .el-submenu .el-menu-item {
        width: 100%;
        height: rem(40);
        line-height: rem(40);
        padding: rem(0) !important;
        padding-left: rem(20) !important;
        font-size: rem(14);
        color:#999ca2;
        background-color:#485462;
        img{
            display: inline-block;
            width: rem(18);
            height: rem(18);
            vertical-align: middle;
            margin-right: rem(5);
            margin-left: rem(5);
            margin-top: rem(-4);
        }
    }
    .basicMenu .el-submenu__title{
        background-color:#434e5c;
        border-top: 1px solid #4e5b6b;
        color:#fff;
        img{
            width: rem(25);
            height: rem(25);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(10);
        }
    }
    .basicMenu .el-menu-item {
        width: 100%;
        height: rem(55);
        line-height: rem(55);
        border-bottom: 1px solid #4e5b6b;
        img{
            width: rem(25);
            height: rem(25);
            display: inline-block;
            vertical-align: middle;
            margin-right: rem(10);
        }
    }

    .basicMenu .el-menu .el-menu--inline {
        width: 100%;
        background: #f2f2f2;
        box-sizing: border-box;
        text-align: left;
        font-size: rem(14);
    }
    /*.basicMenu .el-submenu{*/
        /*border-bottom: 1px solid #e0e0e0;*/
    /*}*/
    .basicMenu .el-menu{
        background-color: #485462;
    }
</style>
<style scoped type="text/scss" lang="scss">
    .basicMenu{
        width: 100% ;
        height: 100%;
        display: flex;
        .el-menu {
            width: 15%;
        }
        .content {
            flex: 1;
            height: 100%;
            padding: 0;
        }
    }
</style>
