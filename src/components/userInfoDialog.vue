<template>
    <div class="userInfoDialog">
        <el-dialog
            title="个人信息"
            :close-on-click-modal = false
            :visible="visible"
            :before-close="closeDialog"
            width="23%"
            class="dialog echatDialog"
            center>
            <div class="userInfoCard" v-loading="isShowLoading">
                <div class="userInfo">
                    <p class="userName">
                        <span class="titleText">
                            登&nbsp;&nbsp;录&nbsp;&nbsp;名：
                        </span>
                        <el-input v-model="info.name"></el-input>
                    </p>
                    <p class="nickName">
                        <span class="titleText">
                            姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
                        </span>
                        <el-input v-model="info.cnName" placeholder="请输入昵称"></el-input>
                    </p>
                    <p class="userPhone">
                        <span class="titleText">
                            手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：
                        </span>
                        <el-input v-model="info.mobileNum" placeholder="请输入手机号码"></el-input>
                    </p>
                    <p class="oldPassword" v-if="showFixPsd">
                        <span class="titleText">
                            旧&nbsp;&nbsp;密&nbsp;&nbsp;码：
                        </span>
                        <el-input type="password" v-model="oldPassword" placeholder="请输入旧密码"></el-input>
                    </p>
                    <p class="oldPassword" v-if="showFixPsd">
                        <span class="titleText">
                            新&nbsp;&nbsp;密&nbsp;&nbsp;码：
                        </span>
                        <el-input type="password" v-model="newPassword" placeholder="请输入新密码"></el-input>
                    </p>
                    <p class="oldPassword" v-if="showFixPsd">
                        <span class="titleText">
                            确认密码：
                        </span>
                        <el-input type="password" v-model="surePassword" placeholder="请确认新密码"></el-input>
                    </p>
                    <el-button class='showPsdBtn'type="primary" round v-if="!showFixPsd" @click="fixPsd">修改密码</el-button>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : getUrl(info.iconId)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <div class="text-center p-2">
                    <file-upload
                        extensions="gif,jpg,jpeg,png,webp"
                        accept="image/png,image/gif,image/jpeg,image/webp"
                        name="avatar"
                        class="btn btn-primary"
                        :drop="!edit"
                        v-model="files"
                        @input-filter="inputFilter"
                        @input-file="inputFile"
                        ref="upload">
                    </file-upload>
                </div>
                <div class="avatar-edit" v-show="files.length && edit">
                    <div class="avatar-edit-image" v-if="files.length">
                        <img ref="editImage" :src="files[0].url" />
                    </div>
                    <!--<div class="text-center p-4">-->
                        <!--<button type="button" class="btn btn-secondary" @click.prevent="$refs.upload.clear">取消</button>-->
                        <!--<button type="submit" class="btn btn-primary" @click.prevent="editSave">保存</button>-->
                    <!--</div>-->
                </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" @click = 'closeDialog'>取消</el-button>
                <el-button size="mini" class="hold" @click="updataUserInfo">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Cropper from 'cropperjs'
    import FileUpload from 'vue-upload-component'
    import api from '@/api'
    import {mapGetters, mapMutations} from 'vuex'
    let Base64 = require('js-base64').Base64;
    export default {
        name: "user-info-dialog",
        props:['visible'],
        data(){
            return{
                info:{
                    id: '',
                    name: '',
                    cnName: '',
                    mobileNum: '',
                    iconId: '',
                },
                file: {},
                src:'',
                edit: false,
                cropper: false,
                files: [],
                isDisabled: false,
                isShowLoading : false,
                showFixPsd: false,
                oldPassword: '',
                newPassword: '',
                surePassword: ''
            }
        },
        methods: {
            ...mapMutations(['SET_USER_DETAIL_INFO']),
            fixPsd () {
              this.showFixPsd = true
            },
            closeDialog () {
                console.log(this.src)
                this.$refs.upload.clear
                this.$emit('closeInfoDialog')
            },
            imgError (e) {
                e.target.src = this.getUrl(null)
            },
            getUrl (url) {
                if (url === null || url === undefined) {
                    return './../../static/img/defult.png'
                } else {
                    return url
                }
            },
            editSave() {
                this.edit = false
                let oldFile = this.files[0]
                console.log(this.files[0] ,'4567890')
                let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
                let arr = new Uint8Array(binStr.length)
                for (let i = 0; i < binStr.length; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }
                let file = new File([arr], oldFile.name, { type: oldFile.type })
                this.$refs.upload.update(oldFile.id, {
                    file,
                    type: file.type,
                    size: file.size,
                    active: true,
                })
                console.log(file, '这是截取后的图片')
                var form = new FormData();
                form.append('f1',file);
                this.src = form
            },
            alert(message) {
                alert(message)
            },
            inputFile(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    this.$nextTick(function () {
                        this.edit = true
                    })
                }
                if (!newFile && oldFile) {
                    this.edit = false
                }
            },
            inputFilter(newFile, oldFile, prevent) {
                if (newFile && !oldFile) {
                    if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                        this.alert('Your choice is not a picture')
                        return prevent()
                    }
                }
                if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                    newFile.url = ''
                    let URL = window.URL || window.webkitURL
                    if (URL && URL.createObjectURL) {
                        newFile.url = URL.createObjectURL(newFile.file)
                    }
                }
            },
            async updataUserInfo () {
                // let userReg = /^[a-zA-Z]([-_a-zA-Z0-9]{1,19})+$/
                if (this.cropper.getCroppedCanvas) {
                    this.editSave()
                }
                let obj = {...this.info}
                // if (!userReg.test(obj.name)) {
                //     this.$message.error('请输入符合要求的登录名')
                //     return
                // }
                if (this.showFixPsd) {
                    if (!(this.oldPassword.trim()=== '' && this.newPassword.trim()==='' && this.surePassword.trim()==='')) {
                        if (this.oldPassword.trim() === '') {
                            this.$message.error('请填写原始密码')
                            return
                        }
                        if (this.newPassword.trim() === '') {
                            this.$message.error('请填写新密码')
                            return
                        }
                        if (this.surePassword.trim() === '') {
                            this.$message.error('请确认新密码')
                            return
                        }
                        if(this.newPassword !== this.surePassword) {
                            this.$message.error('确认密码不相等,请重新输入')
                            return
                        }
                        obj.oldPassword = this.oldPassword
                        obj.password = this.surePassword
                    }
                }
                if (this.src !== '') {
                    await api.person.updataAva(this.src).then(res => {
                        console.log(res, '上传成功')
                        obj.iconId = res.path
                    }).catch(err => {
                        console.log(err, '上传失败')
                        this.$message.error('上传失败，其请稍后重试')
                        return
                    })
                }
                if (this.info.iconId && this.src === '') {
                    obj.iconId = this.info.iconId
                }
                for (let i in obj) {
                    if (obj[i] === null || obj[i] === '') {
                        delete obj[i]
                    }
                }
                await api.lib.updatauserInfo(JSON.stringify(obj)).then(res => {
                    console.log(res, '更新成功')
                    this.$message.success('修改用户信息成功')
                    // if(this.showFixPsd && obj.password) {
                    //     localStorage.setItem('token',JSON.stringify(`BASIC ${Base64.encode(obj.username +  ":"+ this.surePassword)}`))
                    // }
                    this.getUserDetailInfo()
                }).catch(err => {
                    console.log(err, '请求失败')
                    this.$message.error(err.message)
                })
            },
            async getUserDetailInfo () {
                this.isShowLoading = true
                await api.lib.getUserInfo().then(res => {
                    this.isShowLoading = false
                    console.log(res, '这是请求回来的用户信息')
                    this.$store.commit('SET_USER_DETAIL_INFO', res[0])
                    this.showFixPsd = false
                    this.oldPassword = ''
                    this.newPassword = ''
                    this.surePassword = ''
                    this.info = res[0]
                    console.log(this.info, 'lplplplplplplpplplpkoikojj')
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            }

        },
        created() {
            this.getUserDetailInfo()
        },
        watch: {
            edit(value) {
                if (value) {
                    this.$nextTick(function () {
                        if (!this.$refs.editImage) {
                            return
                        }
                        let cropper = new Cropper(this.$refs.editImage, {
                            aspectRatio: 1 / 1,
                            viewMode: 1,
                        })
                        this.cropper = cropper
                    })
                } else {
                    if (this.cropper) {
                        this.cropper.destroy()
                        this.cropper = false
                    }
                }
            }
        },
        computed: {
            ...mapGetters(['getUserInfo'])
        },
        components:{
            FileUpload,
        }
    }
</script>
<style lang="scss" type="text/scss">
    .userInfoDialog{
        .userInfo{
            .el-input{
                width: 75%;
                font-size: rem(14);
                float: left;
            }
            .el-input.is-disabled,.el-input__inner{
                border: none;
                background-color: transparent;
                color: #606266;
                height: rem(30);
                line-height: rem(26);
            }
        }
    }
</style>
<style>
    .example-avatar .avatar-upload .rounded-circle {
        width: 200px;
        height: 200px;
    }
    .example-avatar .text-center .btn {
        margin: 0 .5rem
    }
    .example-avatar .avatar-edit-image {
        max-width: 100%
    }
    .avatar-edit-image{
        height: 255px !important;
    }
    .example-avatar .drop-active {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 9999;
        opacity: .6;
        text-align: center;
        background: #000;
    }
    .example-avatar .drop-active h3 {
        margin: -.5em 0 0;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        font-size: 40px;
        color: #fff;
        padding: 0;
    }
    /*!
 * Cropper.js v1.3.3
 * https://github.com/fengyuanchen/cropperjs
 *
 * Copyright (c) 2015-2018 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-03-18T03:19:07.619Z
 */
    .cropper-container {
        direction: ltr;
        font-size: 0;
        line-height: 0;
        position: relative;
        -ms-touch-action: none;
        touch-action: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
    }

    .cropper-container img {
        display: block;
        height: 100%;
        image-orientation: 0deg;
        max-height: none !important;
        max-width: none !important;
        min-height: 0 !important;
        min-width: 0 !important;
        width: 100%
    }

    .cropper-wrap-box, .cropper-canvas, .cropper-drag-box, .cropper-crop-box, .cropper-modal {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0
    }

    .cropper-wrap-box, .cropper-canvas {
        overflow: hidden
    }

    .cropper-drag-box {
        background-color: #fff;
        opacity: 0
    }

    .cropper-modal {
        background-color: #000;
        opacity: .5
    }

    .cropper-view-box {
        display: block;
        height: 100%;
        outline-color: rgba(51, 153, 255, 0.75);
        outline: 1px solid #39f;
        overflow: hidden;
        width: 100%
    }

    .cropper-dashed {
        border: 0 dashed #eee;
        display: block;
        opacity: .5;
        position: absolute
    }

    .cropper-dashed.dashed-h {
        border-bottom-width: 1px;
        border-top-width: 1px;
        height: 33.33333%;
        left: 0;
        top: 33.33333%;
        width: 100%
    }

    .cropper-dashed.dashed-v {
        border-left-width: 1px;
        border-right-width: 1px;
        height: 100%;
        left: 33.33333%;
        top: 0;
        width: 33.33333%
    }

    .cropper-center {
        display: block;
        height: 0;
        left: 50%;
        opacity: .75;
        position: absolute;
        top: 50%;
        width: 0
    }

    .cropper-center:before, .cropper-center:after {
        background-color: #eee;
        content: ' ';
        display: block;
        position: absolute
    }

    .cropper-center:before {
        height: 1px;
        left: -3px;
        top: 0;
        width: 7px
    }

    .cropper-center:after {
        height: 7px;
        left: 0;
        top: -3px;
        width: 1px
    }

    .cropper-face, .cropper-line, .cropper-point {
        display: block;
        height: 100%;
        opacity: .1;
        position: absolute;
        width: 100%
    }

    .cropper-face {
        background-color: #fff;
        left: 0;
        top: 0
    }

    .cropper-line {
        background-color: #39f
    }

    .cropper-line.line-e {
        cursor: ew-resize;
        right: -3px;
        top: 0;
        width: 5px
    }

    .cropper-line.line-n {
        cursor: ns-resize;
        height: 5px;
        left: 0;
        top: -3px
    }

    .cropper-line.line-w {
        cursor: ew-resize;
        left: -3px;
        top: 0;
        width: 5px
    }

    .cropper-line.line-s {
        bottom: -3px;
        cursor: ns-resize;
        height: 5px;
        left: 0
    }

    .cropper-point {
        background-color: #39f;
        height: 5px;
        opacity: .75;
        width: 5px
    }

    .cropper-point.point-e {
        cursor: ew-resize;
        margin-top: -3px;
        right: -3px;
        top: 50%
    }

    .cropper-point.point-n {
        cursor: ns-resize;
        left: 50%;
        margin-left: -3px;
        top: -3px
    }

    .cropper-point.point-w {
        cursor: ew-resize;
        left: -3px;
        margin-top: -3px;
        top: 50%
    }

    .cropper-point.point-s {
        bottom: -3px;
        cursor: s-resize;
        left: 50%;
        margin-left: -3px
    }

    .cropper-point.point-ne {
        cursor: nesw-resize;
        right: -3px;
        top: -3px
    }

    .cropper-point.point-nw {
        cursor: nwse-resize;
        left: -3px;
        top: -3px
    }

    .cropper-point.point-sw {
        bottom: -3px;
        cursor: nesw-resize;
        left: -3px
    }

    .cropper-point.point-se {
        bottom: -3px;
        cursor: nwse-resize;
        height: 20px;
        opacity: 1;
        right: -3px;
        width: 20px
    }

    @media (min-width: 768px) {
        .cropper-point.point-se {
            height: 15px;
            width: 15px
        }
    }

    @media (min-width: 992px) {
        .cropper-point.point-se {
            height: 10px;
            width: 10px
        }
    }

    @media (min-width: 1200px) {
        .cropper-point.point-se {
            height: 5px;
            opacity: .75;
            width: 5px
        }
    }

    .cropper-point.point-se:before {
        background-color: #39f;
        bottom: -50%;
        content: ' ';
        display: block;
        height: 200%;
        opacity: 0;
        position: absolute;
        right: -50%;
        width: 200%
    }

    .cropper-invisible {
        opacity: 0
    }

    .cropper-bg {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC')
    }

    .cropper-hide {
        display: block;
        height: 0;
        position: absolute;
        width: 0
    }

    .cropper-hidden {
        display: none !important
    }

    .cropper-move {
        cursor: move
    }

    .cropper-crop {
        cursor: crosshair
    }

    .cropper-disabled .cropper-drag-box, .cropper-disabled .cropper-face, .cropper-disabled .cropper-line, .cropper-disabled .cropper-point {
        cursor: not-allowed
    }

</style>
<style scoped lang="scss" type="text/scss">
    .userInfoDialog {
        .userInfoCard {
            width: 100%;
            height: 100%;
            .userInfo {
                width: 100%;
                height: 100%;
                position: relative;
                p{
                    margin-top: rem(8);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(14);
                    overflow: hidden;
                    height: rem(30);
                    span{
                        float: left;
                        display: inline-block;
                        line-height: rem(26);
                    }
                }
                .showPsdBtn{
                    float: right;
                    margin-right: rem(10);
                    margin-top: rem(10);
                }
                .img{
                    width: rem(100);
                    height: rem(60);
                    position: absolute;
                    top: rem(0);
                    right: rem(-20);
                    background: #fff;
                    img{
                        width: rem(55);
                        height: rem(55);
                        display: inline-block;
                        border-radius: 50%;
                        margin-left: rem(18);
                    }
                }
            }
        }
        .cardFooter {
            width: 100%;
            padding: rem(5) rem(10);
            box-sizing: border-box;
            .el-button{
                float: right;
                padding: 0;
                padding: rem(4) rem(6);
                margin: 0 0 rem(10) rem(10);
            }
        }
    }

</style>
