<template>
    <div class="property">
        <div class="pro_menu">
            <div class="pro_title">
                <img src="" alt=""> Drore One智慧旅游云数据中心
            </div>
            <div class="pro_router">
                <router-link to="/basic-property" :class="route.includes('basic')? 'active' : ''">设施</router-link>
                <span class="line">|</span>
                <router-link to="/hard-property" :class="route.includes('hard')? 'active' : ''">设备</router-link>
                <span class="line">|</span>
                <router-link to="/person" :class="route.includes('person')? 'active' : ''">人员</router-link>
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
            height: rem(40);
            color: #fff;
            line-height: rem(40);
            box-sizing: border-box;
            display: flex;
            div {
                display: inline-block;
            }
            .pro_title {
                width: rem(200);
                text-align: center;
                background: #2E3D5F;
                img{
                    display: inline-block;
                    width: rem(20);
                    height: rem(20);
                    vertical-align: middle;
                    background: red;
                    margin-left: rem(-35);
                    margin-right: rem(5);
                }
            }
            .pro_router{
                flex: 1;
                background: #203f70;
                padding: 0 rem(15);
                box-sizing: border-box;
                a{
                    color: #fff;
                    margin-right: rem(10);
                }
                .active{
                    color: #0086b3;
                }
                span{
                    color: #2c3b47;
                    margin-right: rem(10);
                }
            }
        }
        .pro_content{
            width: 100%;
            height: calc(100% - 2.5rem);
            display: flex;
            .el-menu {
                width: rem(200);
            }
            .content {
                flex: 1;
                height: 100%;
                padding: 0;
            }
        }
    }
</style>
