<template>
    <div class="stationDialog">
        <el-dialog
            :close-on-click-modal = false
            :visible="stationShow"
            :before-close="closeDialog"
            :title="stationInfo.name"
            width="50%"
            center>
           <!--<iframe src="http://124.90.43.59:8000?user=yunhe&token=dfsdgsdgsd" frameborder="0"></iframe>-->
            <iframe src="http://localhost:8080/station" frameborder="0"></iframe>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "station-dialog",
        props: ["stationShow",'stationInfo'],

        data () {
            return {}
        },
        methods: {
            closeDialog () {
                this.$emit('closeDialog')
            }
        },
        mounted () {

        },
        created () {

        },
        computed: {

        },
    }
</script>

<style lang="scss" scoped type="text/scss">
    .stationDialog iframe{
        width: 100%;
        height: 100%;
    }
</style>
<style lang="scss">
    .stationDialog{
        .el-dialog .el-dialog--center{
            width: 100%;
        }
        .el-dialog--center{
            padding: 0;
            text-align: left;
        }
        .el-dialog__body{
            padding: 0;
            height:rem(700);
        }
        .el-dialog__headerbtn {
            top: rem(8);
            right: rem(10);
            i{
                font-size: rem(20);
            }
        }
    }
</style>

