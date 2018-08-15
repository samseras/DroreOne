<template>
    <div class="UploadFileDialog">
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
                    <p class="uploadFileBtn">
                        <span>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</span>
                        <span @click="uploadFileClick">上传</span>
                        <input type="file" class="fileInput" ref="uploadFile" @change="uploadFile" style="FILTER: alpha(opacity=0); moz-opacity: 0; opacity: 0;width: 0px;height: 0px;">
                    </p>
                    <p class="image">
                        <span v-if="imgUrl.includes('/')">
                            <img :src="imgUrl" alt="">
                            <span class="closeFile el-icon-circle-close-outline" @click="closeFile" v-if="isDisabled"></span>
                        </span>
                    </p>
                </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="saveFileHandler">提交</el-button>
                <el-button size="mini" @click="closeDialog">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "upload-file-dialog",
        props: ['visible', 'title'],
        data () {
            return {
                name: '',
                description: '',
                file: {},
                imgUrl: '',
                fileObj: {},
                isDisabled: true
            }
        },
        methods: {
            closeDialog () {
                this.$emit('closeFileDialog')
            },
            uploadFileClick () {
                if (this.isDisabled) {
                    this.$refs.uploadFile.click()
                }
            },
            saveFileHandler () {
                if (this.fileObj.id) {
                    this.fileObj.name = this.name
                    this.fileObj.description = this.description
                    this.$emit('SaveFixFile', this.fileObj)
                } else {
                    var form = new FormData()
                    form.append('z1', this.file)
                    form.append('name', this.name)
                    form.append('description', this.description)
                    form.append('documentType', this.$route.params.id)
                    this.$emit('saveFileHandler', form)
                }
            },
            uploadFile (e) {
                this.file = e.target.files[0]
                if (this.file.type.includes('image/')) {
                    if (this.file.type.includes('jpeg')) {
                        this.imgUrl = './../../../../static/img/jpg.svg'
                    }
                    if (this.file.type.includes('png')) {
                        this.imgUrl = './../../../../static/img/png.svg'
                    }
                    if (this.file.type.includes('svg')) {
                        this.imgUrl = './../../../../static/img/svg.svg'
                    }
                } else if (this.file.name.includes('.txt')) {
                    this.imgUrl = './../../../../static/img/txt.svg'
                } else if (this.file.name.includes('.doc')) {
                    this.imgUrl = './../../../../static/img/word.svg'
                } else if (this.file.name.includes('.xl')) {
                    this.imgUrl = './../../../../static/img/excel.svg'
                } else if (this.file.name.includes('.csv')) {
                    this.imgUrl = './../../../../static/img/excel.svg'
                } else if (this.file.name.includes('.ppt')) {
                    this.imgUrl = './../../../../static/img/ppt.svg'
                } else if (this.file.name.includes('.pdf')) {
                    this.imgUrl = './../../../../static/img/PDF.svg'
                } else {
                    this.imgUrl = './../../../../static/img/file.svg'
                }
            },
            closeFile (e) {
                console.log(e.target.files[0], 'opopopopopo')
                this.file = {}
                this.imgUrl = ''
            }
        },
        created () {
            console.log(this.getFixFile, '这个是要修改的文件')
            if (this.title.includes('修改')) {
                this.fileObj = this.getFixFile
                this.name = this.getFixFile.name
                this.description = this.getFixFile.description
                this.isDisabled = false
                let fileType = this.getFixFile.fileType
                if (fileType.includes('doc')) {
                    this.imgUrl = './../../../../static/img/word.svg'
                } else if (fileType.includes('xl')) {
                    this.imgUrl = './../../../../static/img/word.svg'
                } else if (fileType.includes('ppt')) {
                    this.imgUrl = './../../../../static/img/ppt.svg'
                } else if (fileType.includes('pdf')) {
                    this.imgUrl = './../../../../static/img/PDF.svg'
                } else if (fileType.includes('txt')) {
                    this.imgUrl = './../../../../static/img/txt.svg'
                }else if (fileType.includes('csv')) {
                    this.imgUrl = './../../../../static/img/excel.svg'
                }else if (fileType.includes('jpg')) {
                    this.imgUrl = './../../../../static/img/jpg.svg'
                }else if (fileType.includes('png')) {
                    this.imgUrl = './../../../../static/img/png.svg'
                }else if (fileType.includes('svg')) {
                    this.imgUrl = './../../../../static/img/svg.svg'
                } else {
                    this.imgUrl = './../../../../static/img/file.svg'
                }
            }
        },
        watch: {
        },
        computed: {
            ...mapGetters(['getFixFile'])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .UploadFileDialog{
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
    .UploadFileDialog{
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
                .uploadFileBtn{
                    span:nth-of-type(2){
                        float: right;
                        display: inline-block;
                        padding: rem(2) rem(10);
                        border-radius: rem(3);
                        background: #3a8ee6;
                        color: #fff;
                        cursor: pointer;
                    }
                }
                .image{
                    margin-left: rem(20);
                    span{
                        display: inline-block;
                        padding: rem(12);
                        border: 1px solid #ccc;
                        border-radius: rem(5);
                        position: relative;
                        &:hover .closeFile{
                            display: inline-block;
                        }
                        img{
                            width: rem(30);
                            height: rem(30);
                            display: inline-block;
                        }
                        .closeFile{
                            position: absolute;
                            font-size: rem(16);
                            width: rem(10);
                            height: rem(10);
                            right: rem(6);
                            top: rem(3);
                            border: none;
                            padding: 0;
                            cursor: pointer;
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>
