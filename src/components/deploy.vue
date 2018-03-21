<template>
                    <div class="deploy">
                        <v-sidebar></v-sidebar>
                        <div class="deployContent">
                            <div class="d_name">基础信息</div>
                            <div>
                                <el-tabs v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane label="人员信息" name="first">
                                        <v-person></v-person>
                                    </el-tab-pane>
                                    <el-tab-pane label="车船" name="second">
                                        <v-boatcar></v-boatcar>
                                    </el-tab-pane>
                                    <el-tab-pane label="路网" name="third">路网</el-tab-pane>
                    <el-tab-pane label="卫生间" name="fourth">卫生间</el-tab-pane>
                    <el-tab-pane label="停车场" name="five">停车场</el-tab-pane>
                </el-tabs>
             </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import vSidebar from "./eye/deployChildren/Sidebar.vue"
    import vPerson from "./eye/deployChildren/basicsPerson.vue"
    import vBoatcar from "./eye/deployChildren/boatCarts.vue"
    export default{
        data(){
            return{

            }
        },
        created(){
            this.$router.push()
        },
        components:{
            vSidebar,
            vPerson,
            vBoatcar
        }
    }

</script>
<style lang="scss" scoped type="text/scss">
    .deployContent{
        background: none repeat scroll 0 0 #fff;
        position: absolute;
        left: rem(250);
        right: 0;
        top: rem(70);
        bottom:0;
        width: auto;
        padding:rem(40);
        box-sizing: border-box;
        overflow-y: scroll;
    }
</style>
