<template>
    <div class="person">
        <div class="pro_content">
            <el-menu default-active="/person/personType" router
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     :default-openeds="openeds">
                <ScrollContainer>
                    <template v-for="item in items">
                        <template v-if="item.subs">
                            <el-submenu :index="item.index">
                                <template slot="title"><img :src="item.icon" alt="">{{ item.title }}</template>
                                <el-menu-item v-for="(subItem,i) in getJobTypeList" :key="i" :index="'/person/' + subItem.id">
                                    <img :src="imgUrl(subItem.id)" alt="">
                                    {{ subItem.name }}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item :index="item.index">
                                <img :src="item.icon" alt="">{{ item.title }}
                            </el-menu-item>
                        </template>
                    </template>
                </ScrollContainer>
            </el-menu>

            <div class="content">
                <ScrollContainer>
                    <router-view></router-view>
                </ScrollContainer>
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import api from '@/api'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "property",
        data() {
            return {
                openeds:['2'],
                isActive: false,
                items: [
                {
                    icon: './../../static/img/peopleType.svg',
                    index: '/person/personType',
                    title: '职业',
                },
                {
                    icon: './../../static/img/peopleInfo.svg',
                    index: '2',
                    title: '人员',
                    subs: []
                },
            ]
            }
        },
        watch: {
            '$route'(){
            }
        },
        methods: {
            ...mapActions([
                'getJobType'
            ]),
            imgUrl (id) {
                switch (id) {
                    case '1': {
                        return './../../static/img/driver.svg';
                        break
                    }
                    case '2': {
                        return './../../static/img/seaman.svg';
                        break
                    }
                    case '3': {
                        return './../../static/img/safe.svg';
                        break
                    }
                    case '4': {
                        return './../../static/img/clearer.svg';
                        break
                    }
                    case '5': {
                        return './../../static/img/saleticket.svg';
                        break
                    }
                    case '6': {
                        return './../../static/img/teller.svg';
                        break
                    }
                    case '7':{
                        return './../../static/img/keepServe.svg';
                    }
                    default:{
                        return './../../static/img/peopleInfo.svg';
                    }
                }
            }
        },
        async created () {
            this.getJobType()
        },
        components: {
            ScrollContainer
        },
        computed:{
            ...mapGetters([
                'getJobTypeList'
            ])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .person .el-submenu .el-menu-item:hover{
        background-color:#283446;
    }
    .person .el-submenu .el-menu-item {
        width: 100%;
        height: rem(40);
        line-height: rem(40);
        padding: rem(0) !important;
        padding-left: rem(20) !important;
        font-size: rem(14);color:#999ca2;
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
    .person .el-submenu__title{
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
    .person .el-menu-item {
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

    .person .el-menu .el-menu--inline {
        width: 100%;
        background: #434e5c;
        box-sizing: border-box;
        text-align: left;
        font-size: rem(14);
    }
    .person .el-menu{
        background-color: #485462;
    }
</style>
<style lang="scss" type="text/scss" scoped>
    .person {
        width: 100%;
        height: 100%;
        .pro_content{
            width: 100%;
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
    }
</style>
