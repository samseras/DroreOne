<template>
    <div class="funHeader">
        <div class="searchInfo">
            <input type="text" placeholder="请输入搜索内容">
            <i class="el-icon-search"></i>
        </div>
        <div class="funcBtn">
            <el-button size="mini"plain @click="uploadFile" v-if="!(getSelectFileList.length > 0)"><img src="./../../../../static/img/uploadFiles.svg" alt="">上传文件</el-button>
            <el-button size="mini"plain @click="createdFloder" v-if="!(getSelectFileList.length > 0)"><img src="./../../../../static/img/newfile.svg" alt="">新建文件夹</el-button>
            <el-button size="mini"plain @click="" v-if="getSelectFileList.length === 1"><img src="./../../../../static/img/fixfile.svg" alt="">编辑</el-button>
            <el-button size="mini"plain @click="" v-if="isShowDownlodFile"><img src="./../../../../static/img/downloadfile.svg" alt="">下载</el-button>
            <el-button size="mini"plain @click=""  v-if="getSelectFileList.length > 0"><img src="./../../../../static/img/moveFile.svg" alt="">移动</el-button>
            <el-button size="mini"plain @click="deleteFile"  v-if="getSelectFileList.length > 0"><i class="el-icon-delete"></i>删除</el-button>
        </div>
        <div class="page">
            <span>当前第1页/共1页</span>
            <span class="upPage"><</span>
            <span class="downPage">></span>
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
            }
        },
        methods: {
            ...mapMutations(['DELET_FILE_LIST']),
            createdFloder () {
                this.$emit('createdFloder')
            },
            deleteFile () {
                this.$store.commit('DELET_FILE_LIST', new Date().getTime())
            },
            uploadFile () {
                this.$emit('uploadFile')
            }
        },
        watch: {
            getSelectFileList () {
                if (this.getSelectFileList.length > 0) {
                    this.getSelectFileList.forEach(item => {
                        if (item.type === 0) {
                            this.isShowDownlodFile = false
                        } else {
                            this.isShowDownlodFile = true
                        }
                    })
                }
            }
        },
        created() {
        },
        computed: {
            ...mapGetters(['getSelectFileList'])
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
