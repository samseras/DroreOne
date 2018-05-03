<template>
    <div class="property">
        <div class="pro_menu">
            <div class="pro_title">
                <img src="./../../static/img/data.png" alt="">
            </div>
            <div class="pro_router">
                <router-link to="/basic-property" :class="route.includes('basic')? 'active' : ''">设施</router-link>
                <router-link to="/hard-property" :class="route.includes('hard')? 'active' : ''">设备</router-link>
                <router-link to="/person" :class="route.includes('person')? 'active' : ''">人员</router-link>
                <router-link to="/building" :class="route.includes('build')? 'active' : ''">建筑</router-link>
                <router-link to="">植物</router-link>
            </div>
        </div>
        <div class="pro_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'

    export default {
        name: "property",
        data() {
            return {
                route: ''
            }
        },
        created () {
            this.route = this.$route.path
        },
        watch: {
          '$route'(){
              this.route = this.$route.path
          }
        },
        components: {
            ScrollContainer
        }
    }
</script>


<style lang="scss" type="text/scss" scoped>
    .property {
        width: 100%;
        height: 100%;
        .pro_menu {
            width: 100%;
            height: rem(60);
            color: #fff;
            line-height: rem(60);
            box-sizing: border-box;
            display: flex;
            div {
                display: inline-block;
            }
            .pro_title {
                width: 15%;
                text-align: center;
                background: #34495E;
                img{
                    display: inline-block;
                    width: rem(140);
                    height: rem(35);
                    vertical-align: middle;
                    margin-left: rem(-35);
                    margin-right: rem(10);
                }
            }
            .pro_router{
                flex: 1;
                background: #2D3E50;
                padding: 0 rem(35);
                box-sizing: border-box;
                a{
                    display: inline-block;
                    color: #fff;
                    padding: 0 rem(15);
                }
                .active{
                    color: #74cef2;
                }
            }
        }
        .pro_content{
            width: 100%;
            height: calc(100% - 3.75rem);
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
