<template>
    <div class="orginizadialog">
        <el-dialog
            :title="title"
            :close-on-click-modal = false
            :visible="visible"
            :before-close="closeDialog"
            width="460px"
            class="dialog echatDialog"
            center>
            <div class="card">
                <!--人员信息-->
                <div class="personCardContent" v-if="route.includes('users')">
                    <p class="inputName">
                        <span>登&nbsp;&nbsp;录&nbsp;&nbsp;名：</span>
                        <el-input type="text"v-model="person.name" :disabled="isDisabled" placeholder="请输入6至20位，以字母开头，可包含字母、数字、减号、下划线"></el-input>
                    </p>
                    <p class="name inputName">
                        <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
                        <el-input v-model="person.cnName" :disabled="isDisabled" :maxlength="15" placeholder="请输入姓名" ></el-input>
                    </p>
                    <p class="sex">
                        <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                        <el-select v-model="person.gender" placeholder="请选择性别" :disabled="isDisabled">
                            <el-option label="男" :value="1"></el-option>
                            <el-option label="女" :value="0"></el-option>
                        </el-select>
                    </p>
                    <p class="sex">
                        <span>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：</span>
                        <el-select v-model="person.departmentId" placeholder="请选择部门" :disabled="isDisabled">
                            <el-option
                                v-for="item in departmentList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="sex roles">
                        <span>岗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</span>
                        <el-select v-model="person.jobId" placeholder="请选择岗位" :disabled="isDisabled">
                            <el-option
                                v-for="item in postList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="sex roles">
                        <span>角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</span>
                        <el-select v-model="person.roleId" placeholder="请选择角色" :disabled="isDisabled">
                            <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="phone">
                        <span>固定电话：</span>
                        <el-input type="text"v-model="person.fixedPhoneNum" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="phone">
                        <span>手机号码：</span>
                        <el-input type="text"v-model="person.mobileNum" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="idNum">
                        <span>办公地点：</span>
                        <el-input type="text"v-model="person.workAddress" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="idNum">
                        <span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
                        <el-input type="text"v-model="person.email" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="idNum">
                        <span>身份证号：</span>
                        <el-input type="text"v-model="person.idCardNum" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="idNum">
                        <span>用户密码：</span>
                        <el-input type="password"v-model="person.password" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="idNum">
                        <span>确认密码：</span>
                        <el-input type="password"v-model="person.confirmPassword" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="textarea ms ms-person">
                        <span class="des-person">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="person.description" :disabled="isDisabled" ></el-input>
                    </p>
                    <div class="img">
                        <img :src="getUrl(person.iconId)" alt="" v-if="isDisabled" @error="imgError">
                        <label for="avatar" v-if="!isDisabled">
                            <img :src="files.length ? files[0].url : getUrl(person.iconId)"  @error="imgError" class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--部门信息-->
                <div class="personCardContent" v-if="route.includes('department')">
                    <p class="name">
                        <span>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
                        <el-input v-model="department.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="sex">
                        <span>编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
                        <el-input v-model="department.code" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="sex">
                        <span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编：</span>
                        <el-input v-model="department.postCode" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="sex">
                        <span>联&nbsp;&nbsp;系&nbsp;&nbsp;人：</span>
                        <el-input v-model="department.contactPerson" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="idNum">
                        <span>联系电话：</span>
                        <el-input type="text"v-model="department.contactPhone" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="sex">
                        <span>传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真：</span>
                        <el-input v-model="department.fax" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="phone">
                        <span>办公地点：</span>
                        <el-input type="text"v-model="department.address" :disabled="isDisabled"></el-input>
                    </p>
                    <p class="sex">
                        <span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
                        <el-input v-model="department.email" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="textarea ms ms-person">
                        <span class="des-person">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="department.description" :disabled="isDisabled" ></el-input>
                    </p>
                </div>

                <!--岗位信息-->
                <div class="personCardContent" v-if="route.includes('post')">
                    <p class="name">
                        <span>岗位名称：</span>
                        <el-input v-model="personPost.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>
                    <p class="textarea ms ms-person">
                        <span class="des-person">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="personPost.description" :disabled="isDisabled" ></el-input>
                    </p>
                </div>

                <!--角色信息-->
                <div class="personCardContent" v-if="route.includes('role')">
                    <p class="name">
                        <span>角色名称：</span>
                        <el-input v-model="role.name" :disabled="isDisabled" :maxlength="15"></el-input>
                    </p>

                    <p class="textarea ms ms-person">
                        <span class="des-person">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：</span>
                        <el-input type="textarea"  v-model="role.description" :disabled="isDisabled" ></el-input>
                    </p>
                    <p class="roleTree">
                        <span class="dmis">权限选择：</span>
                        <el-tree
                            :data="treeList"
                            show-checkbox
                            node-key="id"
                            ref="trees"
                            :default-checked-keys="role.rolesIds"
                            @check="handleCheckChange">
                        </el-tree>
                    </p>
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
                    <div class="text-center p-4">
                        <button type="button" class="btn btn-secondary" @click.prevent="$refs.upload.clear">取消</button>
                        <button type="submit" class="btn btn-primary" @click.prevent="editSave">保存</button>
                    </div>
                </div>
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="addNewInfo" :disabled='isDisabled'>保存</el-button>
                <el-button size="mini" @click = 'closeDialog' :disabled='isDisabled'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Cropper from 'cropperjs'
    import FileUpload from 'vue-upload-component'
    import api from '@/api'
    import { mapGetters,mapMutations} from 'vuex'
    export default {
        name: "person-detail",
        props: ['visible', 'Info','isDisabled','title'],
        data () {
            return {
                files: [],
                edit: false,
                cropper: false,
                src: {},
                sex: '',
                person: {
                    description:'',
                    name:'',
                    cnName: '',
                    departmentId: '',
                    gender:'',
                    idCardNum:'',
                    mobileNum:'',
                    fixedPhoneNum: '',
                    jobId: '',
                    workAddress: '',
                    email: '',
                    confirmPassword: '',
                    password: ''
                },
                role: {
                    name: '',
                    description: '',
                    rolesIds: []
                },
                department: {
                    name: '',
                    description: '',
                    contactPerson: '',
                    contactPhone: '',
                    email: '',
                    postCode: '',
                    address: '',
                    fax: '',
                    code: ''
                },
                personPost: {
                    name: '',
                    description: '',
                },
                options: [],
                route: '',
                file: {},
                src:'',
                treeList: [],
                children: {},
                departmentList: [],
                postList: [],
                roleList: []
            }
        },
        methods: {
            ...mapMutations(['LOCATION_ID']),
            imgError (e) {
                e.target.src = this.getUrl(null);
            },
            getUrl (url) {
                if (url === null || url === undefined) {
                    let imgSrc = './../../../static/img/defult.png'
                    return imgSrc
                } else {
                    return url
                }
            },
            closeDialog () {
                console.log(this.src)
                this.$emit('closeInfoDialog')
            },
            addNewInfo () {
                let newInfo = {}
                let  myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;   //电话号码校验
                let intreg = /^[1-9]\d*$/; //非零正整数校验
                let integerreg = /^(0|[1-9][0-9]*)$/; //大于等于0正整数
                // let userReg = /^[a-zA-Z]([-_a-zA-Z0-9]{1,19})+$/
                if (this.route.includes('role')) {
                    newInfo = this.role
                    if (!(newInfo.name && newInfo.name.trim() !== '')) {
                        this.$message.error('请填写角色名称')
                        return
                    }
                    if (!(newInfo.rolesIds && newInfo.rolesIds.length > 0)) {
                        this.$message.error('请选择角色权限')
                        return
                    }
                }
                if (this.route.includes('department')) {
                    newInfo = this.department
                    if (!(newInfo.name && newInfo.name.trim() !== '')) {
                        this.$message.error('请填写部门名称')
                        return
                    }
                }
                if (this.route.includes('post')) {
                    newInfo = this.personPost
                    if (!(newInfo.name && newInfo.name.trim() !== '')) {
                        this.$message.error('请填写岗位名称')
                        return
                    }
                }
                if (this.route.includes('users')) {
                    newInfo = this.person
                    console.log(newInfo, './././././././.')
                    if (!(newInfo.name && newInfo.name.trim() !== '')) {
                        this.$message.error('请输入用登录账号')
                        return
                    }
                    // else if (newInfo.name && newInfo.name.trim() !== '') {
                    //     if (!userReg.test(newInfo.name)) {
                    //         this.$message.error('请输入符合要求的登录账号')
                    //         return
                    //     }
                    // }
                    if (newInfo.password && newInfo.password.trim() !== '') {
                        if (!(newInfo.confirmPassword && newInfo.confirmPassword.trim() !== '')) {
                            this.$message.error('请确认密码')
                            return
                        } else if (newInfo.confirmPassword !== newInfo.password) {
                            this.$message.error('两次输入密码不一致，请重新输入')
                            return
                        }
                    }
                }
                console.log(this.src)
                if (this.src !== '') {
                    newInfo.imgUrl = this.src
                }
                if (this.Info.id) {
                    newInfo.id = this.Info.id
                    this.$emit('fixInfo', newInfo)
                } else {
                    this.$emit('addNewInfo', newInfo)
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
            async getUserPermission () {
                await api.user.getUserPermission().then(res => {
                    console.log(res, '这个是用户权限树形结构')
                    if (res.children.length > 0) {
                        this.treeList = res.children
                        this.treeList.forEach(item => {
                            item.label = item.permission.module
                            item.id = item.permission.id
                            item.disabled =  this.isDisabled
                            if (item.children.length > 0) {
                                item.children.forEach(item1 => {
                                    item1.label = item1.permission.module
                                    item1.id = item1.permission.id
                                    item1.disabled =  this.isDisabled
                                })
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err, '请求树形结构失败')
                })
            },
            handleCheckChange (data,checked) {//此处形参data不能删除，必须使用第二个形参
                console.log(data, checked, 'opopopo')
                let arr = []
                checked.checkedKeys.forEach(item => {
                    arr.push({ id: item })

                })
                this.role.rolesIds = arr
            },
            showDialogInfo () {
                console.log(this.Info, 'this is new Info')
                if (this.route.includes('role')) {
                    this.role = this.Info
                } else if (this.route.includes('department')) {
                    this.department = this.Info
                } else if (this.route.includes('post')) {
                    this.personPost = this.Info
                } else if (this.route.includes('user')) {
                    this.person = this.Info
                }
            },
            async getDepartment () {
                await api.user.getUserDepartment().then(res => {
                    console.log(res, 'this is departmentList')
                    this.departmentList = res
                    this.departmentList.forEach(item => {
                        item.label = item.name
                        item.value = item.name
                    })
                }).catch(err => {
                    console.log(err, '获取Department失败')
                })
            },
            async getJobList () {
                await api.user.getUserJobInfo().then(res => {
                    console.log(res, 'this is joblist')
                    this.postList = res
                    this.postList.forEach(item => {
                        item.label = item.name
                        item.value = item.name
                    })
                }).catch(err => {
                    console.log(err, '获取job失败')
                })
            },
            async getRoleList () {
                await api.user.getUserRoleInfo().then(res => {
                    console.log(res, 'this Rolelist')
                    this.roleList = res
                    this.roleList.forEach(item => {
                        item.label = item.name
                        item.value = item.name
                    })
                }).catch(err => {
                    console.log(err, '获取Role失败')
                })
            }
        },
        async created () {
            this.route = this.$route.path
            await this.showDialogInfo()
            if (this.route.includes('role')) {
                await this.getUserPermission()
            }
            if (this.route.includes('users')) {
                await this.getJobList()
                await this.getDepartment()
                await this.getRoleList()
            }
        },
        components: {
            FileUpload
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
        filters: {
            sexFilter (item) {
                if (item) {
                    return '男'
                } else {
                    return '女'
                }
            }
        },
        mounted () {
        },
        computed: {
            ...mapGetters([
            ])
        },
    }
</script>

<style lang="scss" type="text/scss">
    .orginizadialog{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 100%;
            border-radius: rem(5);
        }
        .el-dialog--center{
            padding: 0;
            text-align: left;
        }
        .el-dialog__header{
            padding: rem(8) 0 0 rem(12);
            text-align: left;
            border-bottom: 1px solid #ccc;
            background: #f2f2f2;
            border-top-right-radius: rem(5);
            border-top-left-radius: rem(5);
            padding-left: rem(15);
            box-sizing: border-box;
        }
        .el-dialog__title{
            font-size: rem(14);
        }
        .el-dialog__headerbtn {
            top: rem(8);
        }
        .el-dialog__body{
            padding: rem(10) rem(20) 0 rem(20);
            box-sizing: border-box;
            font-size: rem(12);
            min-height: rem(150);
        }
        .el-input__prefix {
            left: rem(135);
        }
        .el-dialog__footer{
            padding: 0;
            padding: rem(5) 0;
        }
        .el-dialog--center .el-dialog__footer{
            text-align: right;
            padding-right: rem(15);
            border-top: 1px solid #ccc;
            margin-top: rem(15);
        }
        .el-date-editor,.el-input,.el-input--prefix,.el-input--suffix,.el-date-editor--date{
            margin-top: rem(-2);
            top: rem(-2);
        }
        .el-date-editor,.el-input,.el-input--prefix,.el-input--suffix,.el-date-editor--date .el-input__inner{
            height: rem(30);
            line-height: rem(30);
        }
        .el-date-editor,.el-input,.el-input--prefix,.el-input--suffix,.el-date-editor--date .el-input__icon{
            line-height: rem(30);
        }
        .el-select .el-input,.el-input--suffix{
            margin-top: rem(-3);
        }
        .data .el-input__inner{
            padding-left: rem(10);
        }
        .el-input__inner{
            width: 100%;
            height: rem(30);
            line-height: rem(30);
            font-size: rem(12);
            padding: 0;
            padding-left: rem(10);
            background-color: #fafafa;
        }
        .el-input{
            width: calc(100% - 80px);
            padding-left: rem(5);
        }
        .inputName{
            .el-input{
                width: calc(100% - 210px);
                padding-left: rem(5);
            }
        }
        .ms-person .el-textarea__inner{
            font-size:.75rem;
            font-family: Arial;
        }
        .el-textarea__inner{
            background-color: #fafafa;
        }
        .el-select {
            width: calc(100% - 130px);
        }
        .roles {
            .el-select {
                width: calc(100% - 80px);
                .el-input--suffix{
                    width: 100%;
                }
            }
        }
        .el-tree{
            padding-left: rem(60);
            box-sizing: border-box;
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
<style lang="scss" scoped type="text/scss">
    .orginizadialog{
        .card{
            width: 100%;
            height: 100%;
            .personCardContent ,.boatCardContent {
                width: 100%;
                height: 100%;
                position: relative;
                .roleTree,p{
                    margin-top: rem(10);
                    font-size: rem(12);
                    span{
                        display: inline-block;
                        line-height: rem(15);
                        overflow: hidden;
                        padding-bottom: rem(-1);

                    }
                    .ps{
                        color:#c0c4cc;
                        width: rem(203.2);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .el-icon-location-outline{
                        float:right
                    }
                    s{
                        text-decoration: none;
                        line-height: 0.9375rem;
                        float: left;
                    }
                    select{
                        border: none;
                        outline: none;
                        width: rem(100);
                        font-size: rem(12);
                        option{
                            appearance:none;
                            list-style: none;
                            border: none;
                            width: 100%;
                            outline: none;
                            padding: 0;
                            margin: 0;
                            background: #fff;

                        }
                    }
                    i {
                        display: inline-block;
                        font-size: rem(16);
                        vertical-align: middle;
                        cursor: pointer;
                        margin-left:1rem
                    }
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(3);
                        box-sizing: border-box;
                        border-radius: rem(5);
                    }
                    .dmis{
                        display: inline-block;
                        text-align: left;
                        background: transparent;
                        color: #606266;
                        line-height: rem(20);
                    }
                }
                .roleTree{
                    span{
                        display: inline-block;
                    }
                }
                .ms{
                    margin-left: rem(-1);
                    span{
                        width:rem(69)
                    }
                    .des-person{
                        float:left;
                    }
                    .des{
                        float:left
                    }
                    div{
                        width:15.3rem
                    }
                }
                .phoneNum{
                    height: rem(30);
                    s{
                        line-height: rem(26);
                    }
                    span{
                        line-height: rem(26);
                    }
                    i{
                        margin-top: rem(3);
                    }
                }
                .ms-person{
                    div{
                        width:15.3rem;
                    }
                }
                .textarea{
                    border-bottom: 1px solid transparent;
                }
                .basicType{
                    text-align: center;
                }
                .img{
                    width: rem(115);
                    height: rem(135);
                    position: absolute;
                    top: rem(0);
                    right: rem(-20);
                    background: #fff;
                    img{
                        width:100%;
                        height: 100%;
                        display: inline-block;
                        margin-left: rem(-35);
                        border-radius: rem(5);
                    }
                }
            }
            .cardFooter {
                width: 100%;
                padding: rem(5) rem(10);
                box-sizing: border-box;
                border-top: 1px solid #ccc;
                .el-button{
                    padding: 0;
                    padding: rem(4) rem(6);
                }
            }

        }
    }
</style>
