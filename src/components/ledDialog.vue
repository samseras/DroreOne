<template>
    <div class="ledDialog">
        <el-dialog
            :close-on-click-modal = false
            :visible="ledvisible"
            :before-close="closeDialog"
            width="50%"
            center>
           <iframe src="http://124.90.43.59:8000?user=yunhe&token=dfsdgsdgsd" frameborder="0"></iframe>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "led-dialog",
        props: ["ledvisible"],

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
    .ledDialog iframe{
        width: 100%;
        height: 100%;
    }
</style>
<style lang="scss">
    .ledDialog{
        .el-dialog .el-dialog--center{
            width: 100%;
        }
        .el-dialog--center{
            padding: 0;
        }
        .el-dialog__body{
            padding: 0;
            height:rem(600);
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

