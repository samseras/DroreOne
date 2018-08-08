<template>
    <div class="createdFileDialog">
        <el-dialog
            :title="title"
            :close-on-click-modal = false
            :visible="visible"
            :before-close="closeDialog"
            width="23%"
            class="dialog echatDialog"
            center>
            <div class="card">
               <div class="createdFloder">
                   <p class="name">
                       <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                       <el-input v-model="name":maxlength="20"></el-input>
                   </p>
                   <p class="textarea ms ms-person">
                       <span class="des-person">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                       <el-input type="textarea"  v-model="description" ></el-input>
                   </p>
               </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="saveHandler">保存</el-button>
                <el-button size="mini" @click="closeDialog">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "created-file-dialog",
        props: ['visible', 'title'],
        data () {
            return {
                name: '',
                description: ''
            }
        },
        methods: {
            closeDialog () {
                this.$emit('closeDialog')
            },
            saveHandler () {
                let obj = {
                    name: this.name,
                    description: this.description
                }
                this.$emit('saveAsFloder', obj)
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    .createdFileDialog{
        width: 100%;
        height: 100%;
        .name{
            width: 100%;
            .el-input{
                width: calc(100% - 80px);
                right: 0;
            }
            .el-input__inner{
                border-color: transparent;
                border-bottom-color: #ccc;
                border-radius: rem(0);
            }
        }

    }
</style>
<style scoped lang="scss" type="text/scss">
    .createdFileDialog{
        width: 100%;
        height: 100%;
        .card{
            width: 100%;
            height: 100%;
            min-height: rem(200);
            div{
                p{
                    margin-bottom: rem(10);
                    span{
                        margin-bottom: rem(10);
                        display: inline-block;
                    }
                }
            }
        }
    }
</style>
