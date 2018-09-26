<template>
    <div class="pageination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="35"
            :total="getTotalNum">
        </el-pagination>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    export default {
        name: 'pagination',
        data () {
            return {
                currentPage: 1
            }
        },
        methods: {
            ...mapMutations(['CURRENT_NUM']),
            handleSizeChange () {
            },
            handleCurrentChange (val) {
                console.log(val, 'currentChange')
                let date = new Date().getTime()
                let obj = {
                    currentNum: val
                }
                obj[date] = new Date().getTime()
                this.$store.commit('CURRENT_NUM', obj)
            },
        },
        computed: {
            ...mapGetters(['getTotalNum']),
        }

    }
</script>

<style lang="scss">
    .el-pagination__rightwrapper{
        display: none;
    }
</style>
<style scoped lang="scss" type="text/scss">
    .pagination{
        width: 100%;
        height: 100%;
    }
</style>
