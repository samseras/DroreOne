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
                       <el-input v-model="name" :maxlength="20" @blur="checkFileName" ref="createFile"></el-input>
                   </p>
                   <p class="textarea ms ms-person name">
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
    import {mapGetters} from 'vuex'
    export default {
        name: "created-file-dialog",
        props: ['visible', 'title'],
        data () {
            return {
                name: '',
                description: '',
                fileObj: {}
            }
        },
        created () {
            if (this.title.includes('修改')) {
                this.fileObj = this.getFixFile
                this.name = this.getFixFile.name
                this.description = this.getFixFile.description
            }
        },
        methods: {
            checkFileName () {
                console.log(this.getFileList, 'lplplpkokojojoiokok')
                if (this.getFileList.length > 0 && this.getFileList.includes(this.name)) {
                    this.$message.error('该文件名已在此文件夹下存在，请重新填写')
                    this.$refs.createFile.focus()
                    return
                }
            },
            closeDialog () {
                this.$emit('closeDialog')
            },
            saveHandler () {
                if (this.fileObj.id) {
                    this.fileObj.name = this.name
                    this.fileObj.description = this.description
                    this.$emit('SaveFixFile', this.fileObj)
                } else {
                    if (this.getFileList.length > 0 && this.getFileList.includes(this.name)) {
                        this.$message.error('该文件名已在此文件夹下存在，请重新填写')
                        this.$refs.createFile.focus()
                        return
                    }
                    let obj = {
                        name: this.name,
                        description: this.description
                    }
                    this.$emit('saveAsFloder', obj)
                }
            }
        },
        computed: {
            ...mapGetters(['getFixFile', 'getFileList'])
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
            .textarea span {
                float: left;
                margin-left: rem(1);
            }
        }
    }
</style>
