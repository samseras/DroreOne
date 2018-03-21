<template>
    <div class="echat">
        <el-dialog
            :visible="visible"
            :before-close="closeDialog"
            width="90%"
            class="dialog echatDialog"
            center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "echats",
        props: ['visible','echatData'],
        data () {
            return {
                // centerDialogVisible: false
            }
        },
        methods:{
            closeDialog () {
                this.$emit('closeEchatsDialog')
            }

        }
    }
</script>
<style lang="scss" type="text/scss">
    .echat{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 90%;
        }
        .el-dialog--center .el-dialog__body{
            padding: 0;
            height: rem(500);
        }
    }
</style>
<style lang="scss" scoped>

</style>
