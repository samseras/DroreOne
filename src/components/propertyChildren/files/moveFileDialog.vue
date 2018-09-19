<template>
    <div class="moveFileDialog">
        <el-dialog
            title="文件移动"
            :close-on-click-modal = false
            :visible="visible"
            :before-close="closeDialog"
            width="23%"
            class="dialog echatDialog"
            center>
            <div class="card">
                <span>选择文件夹：</span>
                <el-tree
                    :data="folderList"
                    :props="defaultProps"
                    accordion
                    lazy
                    show-checkbox
                    :check-strictly="true"
                    :load="loadNode1"
                    @check="getCurrentNode"
                    @node-click="handleCheckChange">
                </el-tree>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="saveMoveFile">提交</el-button>
                <el-button size="mini" @click="closeDialog">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/api'
    import {mapGetters} from 'vuex'
    export default {
        name: "upload-file-dialog",
        props: ['visible'],
        data () {
            return {
                selectNodeId: '',
                folderList: [],
                defaultProps: {
                    label: 'name',
                    children: 'name'
                },
                filterText: 0,
            }
        },
        async created () {
            let route = this.$route.params.id
            await this.getFileList(route)
        },
        methods: {
            async getFileList (id) {
                await api.file.getFloderList(id).then(res => {
                    console.log(res, '請求成功')
                    this.folderList = res
                    this.folderList = this.folderList.filter(item => {
                        return item.id !== this.getSelectFileList[0].id
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            closeDialog () {
                this.$emit('closeMoveFileDialog')
            },
            saveMoveFile () {
                if (this.selectNodeId === '') {
                    this.$message.error('请选择移动到文件夹')
                } else {
                    this.$emit('moveFileHandler', this.selectNodeId)
                }
            },
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            loadNode1 (node, resolve) {
                let id  = node.data.id
                console.log(id)
                api.file.getMoreFile(id).then(res => {
                    res = res.filter(item => {
                        return item.type === 0 && item.id !== this.getSelectFileList[0].id
                    })
                    resolve(res)
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            },
            getCurrentNode (data) {
               this.selectNodeId = data.id
            }
        },
        computed: {
            ...mapGetters(['getSelectFileList'])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .moveFileDialog{
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
    .moveFileDialog{
        width: 100%;
        height: 100%;
        .card{
            width: 100%;
            height: 100%;
            min-height: rem(200);
            div{
            }
        }
    }
</style>
