<template>
    <div class="checkFileDialog">
        <el-dialog
            title=""
            :close-on-click-modal = false
            :visible="visible"
            :before-close="closeDialog"
            width="100%"
            class="dialog echatDialog"
            top="0"
            center>
            <div class="card" v-loading="isShowFilePreviewLoading">
                <div class="image">
                    <img :src="getFileUrl(getCheckFileRow.path)" alt="" v-if="isShowImage">
                    <textarea class="text"  cols="30" rows="10" v-model="text" v-if="!isShowImage" ></textarea>
                </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
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
                isShowFilePreviewLoading: false,
                isShowImage: false,
                text: ''
            }
        },
        created () {
            this.getFileText()
            this.getCheckw()
        },
        methods: {
            closeDialog () {
                this.$emit('closeCheckFileDialog')
            },
            getFileUrl (url) {
                return `/file${url.substring(5, url.length)}`
            },
            getFileText () {
                this.isShowFilePreviewLoading = true
                api.file.previewFile(this.getCheckFileRow.id).then(res => {
                    console.log(res, 'djsjj')
                    this.text = res
                    // this.$refs.preview.innerHTML = res
                    this.isShowFilePreviewLoading = false
                }).catch(err => {
                    console.log(err, '这个是失败的请求')
                })
            },
            getCheckw () {
                let types = ['jpg', 'png', 'svg', 'gif']
                if (types.includes(this.getCheckFileRow.fileType)) {
                    this.isShowImage = true
                } else {
                    this.isShowImage = false
                }
            }
        },
        watch: {
        },
        computed: {
            ...mapGetters(['getCheckFileRow'])
        }
    }
</script>

<style lang="scss" type="text/scss">
    .checkFileDialog{
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
        .el-dialog,.el-dialog--center{
            width: 100%;
            height: 100%;
            margin: 0;
            background: rgba(0 , 0, 0, .5);
        }
        .el-dialog__body{
            width: 100%;
            height: 95%;
            padding: 0;
        }
        .el-dialog__footer{
            display: none;
        }
        .el-dialog__header{
            height: 0;
            .el-dialog__headerbtn{
                background: rgba(171, 171, 171, 0.5);
                border-radius: 50%;
                z-index: 99;
                i{
                    font-size: rem(35);
                }
            }
        }
    }
</style>
<style scoped lang="scss" type="text/scss">
    .checkFileDialog{
        width: 100%;
        height: 100%;
        .card{
            width: 100%;
            height: 100%;
            position: relative;
            .image{
                width: 90%;
                height: 90%;
                overflow: hidden;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                img{
                    display: inline-block;
                    max-width: 100%;
                    /*display: none;*/
                }
                .text{
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    background: rgba(0, 0, 0, .5);
                    overflow: auto;
                    border: none;
                    resize: none;
                    outline: none;
                    padding-left: rem(20);
                    box-sizing: border-box;
                    font-size: rem(16);
                }
            }

        }
    }
</style>
