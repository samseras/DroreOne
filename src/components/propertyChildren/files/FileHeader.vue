<template>
    <div class="funHeader">
        <div class="searchInfo">
            <input type="text" placeholder="请输入搜索内容" v-model="searchContent">
            <i class="el-icon-search" @click="startSearch"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini"plain @click="uploadFile" v-if="(!(getSelectFileList.length > 0)) && getCrumbsList.length > 1"><img src="./../../../../static/img/uploadFiles.svg" alt="">上传文件</el-button>
            <el-button size="mini"plain @click="$refs.batchUpload.click()" v-if="(!(getSelectFileList.length > 0)) && getCrumbsList.length > 1"><img src="./../../../../static/img/uploadFiles.svg" alt="">批量上传</el-button>
            <el-button size="mini"plain @click="createdFloder" v-if="!(getSelectFileList.length > 0)"><img src="./../../../../static/img/newfile.svg" alt="">新建文件夹</el-button>
            <el-button size="mini"plain @click="fixFile" v-if="getSelectFileList.length === 1"><img src="./../../../../static/img/fixfile.svg" alt="">编辑</el-button>
            <el-button size="mini"plain @click="downloadFile" v-if="isShowDownlodFile"><img src="./../../../../static/img/downloadfile.svg" alt="">下载</el-button>
            <el-button size="mini"plain @click="moveFileHandler"  v-if="getSelectFileList.length > 0"><img src="./../../../../static/img/moveFile.svg" alt="">移动</el-button>
            <el-button size="mini"plain @click="deleteFile"  v-if="getSelectFileList.length > 0"><i class="el-icon-delete"></i>删除</el-button>
            <input type="file" class="fileInput" ref="batchUpload" @change="uploadFileHandler" style="FILTER: alpha(opacity=0); moz-opacity: 0; opacity: 0;width: 0px;height: 0px;" multiple>
        </div>
        <div class="page">
            <span>当前第{{currentPageNum}}页/共{{pageAllNum}}页</span>
            <span class="upPage"@click="previousPage"><</span>
            <span class="downPage" @click="nextPage">></span>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        data() {
            return {
                isShowDownlodFile: false,
                index: 0,
                pageAllNum: 1,
                currentPageNum: 1,
                searchContent: ''
            }
        },
        methods: {
            ...mapMutations(['DELET_FILE_LIST', 'GET_FILE_PAGE_NUMBER', 'SEARCH_FILE_LIST']),
            createdFloder () {
                this.$emit('createdFloder')
            },
            deleteFile () {
                this.$store.commit('DELET_FILE_LIST', new Date().getTime())
            },
            uploadFile () {
                this.$emit('uploadFile')
            },
            moveFileHandler () {
                this.$emit('moveFile')
            },
            uploadFileHandler (e) {
                let fileList = [...e.target.files]
                console.log(fileList)
                var form = new FormData()
                fileList.forEach((item, index) => {
                    form.append(`f${index}`, item)
                })
                this.$emit('batchFile', form)
            },
            fixFile () {
                this.$emit('fixFile')
            },
            downloadFileHandler (item, name) {
                api.file.downloadFile(item).then(res => {
                    console.log(res, '下載成功')
                    const content = res
                    const blob = new Blob([content])
                    const fileName = name
                    if ('download' in document.createElement('a')) {
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                        this.index += 1
                        this.downloadFile()
                    }
                }).catch(err => {
                    console.log(err, 'oppopopop')
                })
            },
            downloadFile () {
                console.log(this.getSelectFileList, '下載')
                let ids = this.getSelectFileList.map(item => {
                    return item.id
                })
                let fileNames = this.getSelectFileList.map(item => {
                    if (item.name.includes('.')) {
                        return item.name
                    } else {
                        return `${item.name}.${item.fileType}`
                    }
                })
                if (!(this.index > ids.length - 1)) {
                    this.downloadFileHandler(ids[this.index], fileNames[this.index])
                } else {
                    this.index = 0
                }
            },
            previousPage() {//上一页
                this.currentPageNum--
                if (this.currentPageNum < 1) {
                    this.currentPageNum = 1
                    return
                }
                let obj = {
                    page: this.currentPageNum,
                    time: new Date().getTime()
                }
                this.$store.commit('GET_FILE_PAGE_NUMBER', obj)
            },
            nextPage() {//下一页
                this.currentPageNum++
                if (this.currentPageNum > this.pageAllNum) {
                    this.currentPageNum = this.pageAllNum
                    return
                }
                let obj = {
                    page: this.currentPageNum,
                    time: new Date().getTime()
                }
                this.$store.commit('GET_FILE_PAGE_NUMBER', obj)
            },
            startSearch () {
                if (this.searchContent.trim() === '') {
                    this.$message.error('请输入要搜索的内容！')
                    return
                }
                let obj = {
                    content: this.searchContent,
                    time: new Date().getTime()
                }
                this.$store.commit('SEARCH_FILE_LIST', obj)
            }
        },
        watch: {
            getSelectFileList () {
                if (this.getSelectFileList.length > 0) {
                    this.getSelectFileList.forEach(item => {
                        if (item.type === 0) {
                            this.isShowDownlodFile = false
                            return
                        } else {
                            this.isShowDownlodFile = true
                        }
                    })
                } else {
                    this.isShowDownlodFile = false
                }
            },
            getFileListLength () {
                console.log(this.getFileListLength, '這個是請求回來的數據的長度')
                if (this.getFileListLength.length > 0) {
                    this.pageAllNum = Math.ceil(this.getFileListLength.length / 15)
                }
            },
            getCrumbsList () {
                // this.pageAllNum = 1
                this.currentPageNum = 1
            },
            '$route' () {
                this.pageAllNum = 1
                this.currentPageNum = 1
                this.searchContent = ''
            }
        },
        created() {
        },
        computed: {
            ...mapGetters(['getSelectFileList', 'getCrumbsList', 'getFileListLength'])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .funHeader{
        .el-checkbox__label{
            padding-left: rem(5);
            font-size: rem(12);
        }
        .el-checkbox__inner{
            margin-top: rem(2);
            margin-right: rem(2);
        }
        .importFile{
            width: 0;
            height: 0;
            display: none;
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .funHeader{
        width: 100%;
        height: 100%;
        div{
            display: inline-block;
        }
        .searchInfo{
            input{
                border: none;
                outline:medium;
                border-bottom: 1px solid #ccc;
                font-size: rem(12);
                padding: rem(3) rem(4);
            }
            i{
                font-size: rem(13);
                margin-left: rem(-15);
                cursor: pointer;
            }
        }
        .funcBtn{
            margin-left: rem(20);
            margin-top: rem(3);
            button{
                border: none;
                font-weight: 500;
                img{
                    display: inline-block;
                    width: rem(16);
                    vertical-align: bottom;
                    margin-right: rem(3);
                }
                i{
                    margin-right: rem(3);
                }
            }
            .el-button.selectedAll{
                padding-bottom: rem(0);
            }
            .el-button {
                padding: rem(5) rem(5);
                margin: 0;
            }
        }
        .page{
            margin-left: rem(20);
            font-size: rem(12);
            float: right;
            margin-top: rem(3);
            span{
                display: inline-block;
                cursor: pointer;
                margin-left: rem(5);
            }
            .upPage,downPage,listForm,cardForm{
                padding: rem(5);
                box-sizing: border-box;
            }
            .cardForm{
                i{
                    color: #e44b4e;
                }
            }
        }
    }
</style>
