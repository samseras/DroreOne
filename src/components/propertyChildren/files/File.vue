<template>
    <div class="fileDocument">
        <div class="title">
            <p v-for="(item, index) in crumbList" :key="index" @click="getCrumbItem(item, index)">
                <span>{{item.name}}</span>
                <span v-if="index !== crumbList.length - 1"> > </span>
            </p>
        </div>
        <div class="personContent">
            <div class="funcTitle">
                <FileHeader
                    @createdFloder="createdFloder"
                    @moveFile="moveFile"
                    @batchFile="saveFileHandler"
                    @fixFile="fixFile"
                    @uploadFile="uploadFile">
                </FileHeader>
            </div>
            <div class="personList judge-title">
                <Document
                    @fixFileContent="fixFileContent"
                    @fixFolderContent="fixFolderContent">
                </Document>
            </div>
        </div>
        <CreatedFileDialog
            v-if="createdVisible"
            :visible="createdVisible"
            :title="title"
            @closeDialog="closeDialog"
            @SaveFixFile="SaveFixFileHandler"
            @saveAsFloder="saveAsFloder">
        </CreatedFileDialog>
        <UploadFileDialog
            v-if="uploadFileVisible"
            :visible="uploadFileVisible"
            :title="uploadTitle"
            @closeFileDialog="closeFileDialog"
            @SaveFixFile="SaveFixFileHandler"
            @saveFileHandler="saveFileHandler">
        </UploadFileDialog>
        <MoveFileDialog
            v-if="moveFileVisible"
            :visible="moveFileVisible"
            @closeMoveFileDialog="closeMoveFileDialog"
            @moveFileHandler="moveFileHandler">
        </MoveFileDialog>
        <CheckFileDialog
            v-if="checkFileVisible"
            :visible="checkFileVisible"
            @closeCheckFileDialog="closeCheckFileDialog">
        </CheckFileDialog>
    </div>
</template>

<script>
    import ScrollContainer from '@/components/ScrollContainer'
    import FileHeader from '@/components/propertyChildren/files/FileHeader'
    import Document from '@/components/propertyChildren/files/Document'
    import CreatedFileDialog from '@/components/propertyChildren/files/createdFileDialog'
    import UploadFileDialog from '@/components/propertyChildren/files/uploadFileDialog'
    import MoveFileDialog from '@/components/propertyChildren/files/moveFileDialog'
    import CheckFileDialog from '@/components/propertyChildren/files/checkFileDialog'
    import api from '@/api'
    import {mapMutations, mapGetters, mapActions} from 'vuex'
    import _ from 'lodash'
    export default {
        name: 'file-document',
        data(){
            return{
                createdVisible: false,
                title: '',
                crumbList: [],
                uploadFileVisible: false,
                moveFileVisible: false,
                uploadTitle: '',
                checkFileVisible: false
            }
        },
        created () {
            this.getCrumbsList()
        },
        methods: {
            ...mapMutations(['SET_CREATED_STATUS', 'SET_CLICK_CRUMBS', 'SET_CRUMBS', 'CRUMBS_LIST', 'UPLOAD_FILE_SUCCESS', 'MOVE_FILE_SUCCESS', 'SET_FIX_FILE']),
            ...mapActions(['getFileType']),
            getCrumbsList () {
                let router = this.$route.params.id
                this.getFileType().then(res => {
                    res.forEach(item => {
                        item.name = item.type
                        if (router == item.id) {
                            // this.crumbList.push(item)
                            this.$store.commit('SET_CRUMBS', item)
                        }
                    })
                })
            },
            createdFloder () {
                this.createdVisible = true
                this.title = '创建文件夹'
            },
            fixFile () {
                if (this.getSelectFileList[0].type === 0) {
                    this.fixFolderContent()
                } else {
                    this.fixFileContent()
                }
                this.$store.commit('SET_FIX_FILE', this.getSelectFileList[0])
            },
            fixFileContent () {
                this.uploadTitle = '修改文件信息'
                this.uploadFileVisible = true
            },
            fixFolderContent () {
                this.createdVisible = true
                this.title = '修改文件夹'
            },
            uploadFile () {
                this.uploadTitle = '上传文件'
                this.uploadFileVisible = true
            },
            moveFile () {
                this.moveFileVisible = true
            },
            closeDialog () {
                this.createdVisible = false
            },
            closeFileDialog () {
                this.uploadFileVisible = false
            },
            closeMoveFileDialog () {
                this.moveFileVisible = false
            },
            closeCheckFileDialog () {
                this.checkFileVisible = false
            },
            saveAsFloder (obj) {
                if (this.crumbList.length > 1) {
                    obj.pid = this.crumbList[this.crumbList.length - 1].id
                } else {
                    obj.pid = ''
                }
                obj.documentType = this.$route.params.id
                api.file.createdFloder(JSON.stringify(obj)).then(res => {
                    console.log(res, '成功')
                    this.$store.commit('SET_CREATED_STATUS', new Date().getTime())
                })
                this.closeDialog()
            },
            saveFileHandler (file) {
                file.append('folderId', this.crumbList[this.crumbList.length - 1].id)
                api.file.uploadFile(file).then(res => {
                    console.log(res, '上传成功')
                    this.uploadFileVisible = false
                    this.$store.commit('UPLOAD_FILE_SUCCESS', new Date().getTime())
                }).catch(err => {
                    console.log(err, '上传失败')
                })
            },
            SaveFixFileHandler (row) {
                console.log(row, '这个失修改的文件夹')
                delete row.checked
                delete row.time
                api.file.editeFile(JSON.stringify(row)).then(res => {
                    console.log(res, '文件修改成功')
                    this.$message.success('修改文件成功')
                    this.$store.commit('UPLOAD_FILE_SUCCESS', new Date().getTime())
                    this.uploadFileVisible = false
                    this.createdVisible = false
                }).catch(err => {
                    console.log(err, '修改失败')
                })
            },
            moveFileHandler (id) {
                console.log('move')
                let selectList = this.getSelectFileList.map(item => {
                    return item.id
                })
                let obj = {
                    documentIds: selectList,
                    folderId: id
                }
                api.file.moveFile(JSON.stringify(obj)).then(res => {
                    console.log(res, 'opopopopopopo')
                    this.$message.success('文件移动成功')
                    this.$store.commit('MOVE_FILE_SUCCESS', new Date().getTime())
                    this.moveFileVisible = false
                }).catch(err => {
                    console.log(err, '移动文件失败')
                    this.$message.error('文件移动失败')
                })
            },
            getCrumbItem (item, index) {
                if (index === this.crumbList.length - 1 && this.crumbList.length > 1) {
                    return
                }
                this.crumbList = this.crumbList.slice(0, index + 1)
                item.time = new Date().getTime()
                this.$store.commit('SET_CLICK_CRUMBS', item)
            }
        },
        components: {
            ScrollContainer,
            FileHeader,
            Document,
            CreatedFileDialog,
            UploadFileDialog,
            MoveFileDialog,
            CheckFileDialog
        },
        watch: {
            '$route' () {
                this.crumbList = []
                this.getCrumbsList()
            },
            getCrumbs () {
                this.crumbList.push(this.getCrumbs)
            },
            crumbList () {
                this.$store.commit('CRUMBS_LIST', this.crumbList)
            },
            getCheckFileRow () {
                if (this.getCheckFileRow.id) {
                    this.checkFileVisible = true
                }
            }
        },
        computed: {
            ...mapGetters(['getCrumbs', 'getSelectFileList', 'getCheckFileRow'])
        }
    }

</script>
<style lang="scss" type="text/scss">
</style>
<style lang="scss" scoped type="text/scss">
    .fileDocument{
        width: 100%;
        height: 100%;
        .title{
            width: 100%;
            padding: rem(16) 0 rem(17) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #26bbf0;
            border-bottom:  1px solid #ccc;
            p{
                display: inline-block;
                margin-right: rem(5);
                cursor: pointer;
            }
        }
        .personContent{
            width: 100%;
            height: calc(100% - 70px);
            padding: 0 rem(15);
            box-sizing: border-box;
            .funcTitle {
                width: 100%;
                height: rem(30);
                margin-top: rem(10);
                border-bottom: 2px solid #e44b4e;
            }
            .personList{
                width: 100%;
                height: calc(100% - 50px);
                padding: rem(20) 0 rem(10) 0;
                box-sizing: border-box;
            }
        }
    }

</style>

