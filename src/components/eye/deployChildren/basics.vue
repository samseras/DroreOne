<template>
    <div class="basics">
            <div class="b_name">基础信息</div>
            <div>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="人员信息" name="person">
                        <v-person></v-person>
                    </el-tab-pane>
                    <el-tab-pane label="车船" name="boat">车船</el-tab-pane>
                    <el-tab-pane label="路网" name="way">路网</el-tab-pane>
                    <el-tab-pane label="卫生间" name="toilet">卫生间</el-tab-pane>
                    <el-tab-pane label="停车场" name="park">停车场</el-tab-pane>
                </el-tabs>
            </div>
    </div>
</template>

<script>
    import vPerson from './person.vue'


    export default {
        data(){
            return{
                activeName:'person'
            }
        },
        components:{
            vPerson
        }
    }

</script>

<style lang="scss" type="text/scss" scoped>

</style>
