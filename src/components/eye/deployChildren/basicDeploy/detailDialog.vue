<template>
    <div class="detailDialog">
        <el-dialog
            :title="title"
            :visible="visible"
            :before-close="closeDialog"
            width="23%"
            class="dialog echatDialog"
            center>
            <div class="card">
                <!--人员-->
                <div class="personCardContent" v-if="route.includes('person')">
                    <p class="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<input type="text"v-model="person.name"></p>
                    <p class="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：<input type="text"v-model="person.sex"></p>
                    <p class="type">
                        人员角色： <select name="" v-model="person.jobName">
                        <option v-for="item in options" :value="item.jobId">{{item.jobName}}</option>
                        </select>
                    </p>
                    <p class="idNum">身份证号：<input type="text"v-model="person.idNum"></p>
                    <p class="phoneNum">电话号码：<input type="text"v-model="person.phone"></p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--车船-->
                <div class="personCardContent boatCardContent" v-if="route.includes('boat')">
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：
                        <select name="" v-model="boatCar.type">
                            <option  value="船只">船只</option>
                            <option  value="车辆">车辆</option>
                        </select>
                    </p>
                    <p class="sex">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text"v-model="boatCar.serNum"></p>
                    <p class="type">
                        维护状态： <select name="" v-model="boatCar.safeStatus">
                        <option  value="正常">正常</option>
                        <option  value="异常">异常</option>
                    </select>
                    </p>
                    <p class="idNum">核载人数：<input type="text"v-model="boatCar.loadNum"></p>
                    <p class="phoneNum">购买时间：<input type="text"v-model="boatCar.buyTime"></p>
                    <p class="phoneNum">维护时间：<input type="text"v-model="boatCar.safeTime"></p>
                    <p class="phoneNum">驾驶人员：<input type="text"v-model="boatCar.driver"></p>
                    <p class="phoneNum">联系电话：<input type="text"v-model="boatCar.phone"></p>
                    <p class="phoneNum">设备号码：<input type="text"v-model="boatCar.facilityNum"></p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--指示牌-->
                <div class="personCardContent boatCardContent" v-if="route.includes('indicator')">
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：<input type="text"v-model="indicator.type"></p>
                    <p class="phoneNum">所属片区：<input type="text"v-model="indicator.area"></p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="indicator.location"><img src="" alt="" @click="showMapDialog"></p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--垃圾桶-->
                <div class="personCardContent boatCardContent" v-if="route.includes('trash')">
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：
                        <select name="" v-model="trash.type">
                            <option  value="充裕">充裕</option>
                            <option  value="已满">已满</option>
                        </select>
                    </p>
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text"v-model="trash.name"></p>
                    <p class="type">
                        状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态： <select name="" v-model="trash.status">
                        <option  value="充裕">充裕</option>
                        <option  value="已满">已满</option>
                    </select>
                    </p>
                    <p class="idNum">个&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：<input type="text"v-model="trash.dustbinCount"></p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="trash.location"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="phoneNum">所属片区：<input type="text"v-model="trash.area"></p>
                    <div class="img">
                        <!--<img src="" alt="">-->
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--景点-->
                <div class="personCardContent boatCardContent" v-if="route.includes('scenic')">
                    <p class="name">景点名称：<input type="text"v-model="scenic.name"></p>
                    <p class="sex">所属片区：<input type="text"v-model="scenic.area"></p>
                    <p class="type">
                        状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态： <select name="" v-model="scenic.state">
                        <option  value="正常">充裕</option>
                        <option  value="异常">已满</option>
                    </select>
                    </p>
                    <p class="idNum">容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：<input type="text"v-model="scenic.capacity"></p>

                    <p class="phoneNum">当前人数：<input type="text"v-model="trash.nowPeopleNum"></p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="scenic.location"><img src="" alt="" @click="showMapDialog"></p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--商圈-->
                <div class="personCardContent boatCardContent" v-if="route.includes('shop')">
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：
                        <select name="" v-model="shop.type">
                            <option  v-for="item in businesstype" :value="item.type"></option>
                        </select>
                    </p>
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text"v-model="shop.name"></p>
                    <p class="type">
                        状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态： <select name="" v-model="shop.state">
                        <option  value="充裕">充裕</option>
                        <option  value="已满">已满</option>
                    </select>
                    </p>
                    <p class="idNum">容&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：<input type="text"v-model="shop.capacity"></p>

                    <p class="phoneNum">当前人数：<input type="text"v-model="shop.currentNum"></p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="shop.location"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="phoneNum">所属片区：
                        <select name="" v-model="shop.area">
                            <option  v-for="item in regions" :value="item.id">{{item.name}}</option>
                        </select>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--停车场-->
                <div class="personCardContent boatCardContent" v-if="route.includes('park')">
                    <p class="name">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：<input type="text"v-model="park.type"></p>
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text"v-model="park.name"></p>
                    <p class="type">
                        状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态： <select name="" v-model="park.state">
                        <option  value="充裕">充裕</option>
                        <option  value="已满">已满</option>
                        <option  value="紧张">紧张</option>
                    </select>
                    </p>
                    <p class="idNum">空余车位：<input type="text"v-model="park.residuePark"></p>

                    <p class="phoneNum">车位总数：<input type="text"v-model="park.allPark"></p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="park.location"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="phoneNum">所属片区：
                        <select name="" v-model="park.area">
                            <option  v-for="item in regions" :value="item.id">{{item.name}}</option>
                        </select>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--洗手间-->
                <div class="personCardContent boatCardContent" v-if="route.includes('toilet')">
                    <p class="sex">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<input type="text"v-model="toilet.name"></p>
                    <p class="phoneNum">所属片区：
                        <select name="" v-model="toilet.area">
                            <option  v-for="item in regions" :value="item.id">{{item.name}}</option>
                        </select>
                    </p>
                    <p class="type">
                        状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态： <select name="" v-model="toilet.state">
                        <option  value="正常">正常</option>
                        <option  value="紧张">紧张</option>
                    </select>
                    </p>
                    <p class="phoneNum">位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置：<input type="text"v-model="toilet.location"><img src="" alt="" @click="showMapDialog"></p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--片区-->
                <div class="personCardContent boatCardContent" v-if="route.includes('area')">
                    <p class="sex">片区名称：<input type="text"v-model="area.name"></p>
                    <p class="phoneNum">所在景区：<input type="text"v-model="area.placeScenic"></p>
                    <p class="phoneNum">位置范围：<input type="text"v-model="area.location"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name="" v-model="area.describe" cols="30"
                                                                               rows="5" placeholder="请输入描述信息"></textarea>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
                        </label>
                    </div>
                </div>
                <!--路网-->
                <div class="personCardContent boatCardContent" v-if="route.includes('roat')">
                    <p class="sex">路线名称：<input type="text"v-model="roat.name"></p>
                    <p class="phoneNum">所在景区：<input type="text"v-model="roat.placeScenic"></p>
                    <p class="phoneNum">位置范围：<input type="text"v-model="roat.location"><img src="" alt="" @click="showMapDialog"></p>
                    <p class="type">
                        描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<textarea name=""v-model="roat.describe" cols="30"
                                                                               rows="5" placeholder="请输入描述信息"></textarea>
                    </p>
                    <div class="img">
                        <label for="avatar">
                            <img :src="files.length ? files[0].url : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
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
        <MapDialog v-if="mapVisible" :visible="mapVisible" class="map" @closeMapDialog = 'closeMapDialog'></MapDialog>
    </div>
</template>

<script>
    import MapDialog from './mapDialog'
    import Cropper from 'cropperjs'
    import FileUpload from 'vue-upload-component'
    import api from '@/api'
    export default {
        name: "person-detail",
        props: ['visible', 'Info','isDisabled','title'],
        data () {
            return {
                files: [],
                edit: false,
                cropper: false,
                src: '',
                isShowMapDialog: false,
                mapVisible: false,
                person: {
                    name:'',
                    gender:'',
                    idNum:'',
                    jobId: '',
                    jobName: '',
                    phone:'',
                    picAddress: ''
                },
                boatCar: {
                    type: '',
                    serNum: '',
                    safeStatus: '',
                    loadNum: '',
                    buyTime: '',
                    safeTime: '',
                    driver: '',
                    phone: '',
                    facilityNum:'',
                    picAddress: ''
                },
                trash: {
                    type: '',
                    name: '',
                    state: '',
                    dustbinCount: '',
                    location: '',
                    area: '',
                    picAddress: ''
                },
                indicator: {
                    type: '',
                    area: '',
                    location: '',
                    picAddress: ''
                },
                scenic: {
                    name: '',
                    area: '',
                    state: '',
                    capacity: '',
                    nowPeopleNum: '',
                    location: '',
                    picAddress: ''
                },
                shop: {
                    type: '',
                    name: '',
                    state: '',
                    capacity: '',
                    currentNum: '',
                    location: '',
                    area: '',
                    picAddress: ''
                },
                park: {
                    type:'',
                    name:'',
                    state:'',
                    residuePark:'',
                    allPark:'',
                    location:'',
                    area:'',
                    picAddress: ''
                },
                toilet: {
                    name:'',
                    area:'',
                    state:'',
                    location:'',
                    picAddress: ''
                },
                area: {
                    name: '',
                    placeScenic: '',//所在景区
                    location: '',
                    describe: '',
                    picAddress: ''
                },
                roat: {
                    name: '',
                    placeScenic: '',//所在景区
                    location: '',
                    describe: '',
                    picAddress: ''
                },
                options: [],
                route: '',
                file: {},
                src:'',
                businesstype: [],
                regions: []
            }
        },
        methods: {
            addfile() {
                this.$refs.fileUpload.click()
            },
            fi (e) {
                this.file = e.target.files[0]
            },
            select () {
                console.log(this.type, 'klklkl')
            },
            closeDialog () {
                console.log(this.src)
                this.$emit('closeInfoDialog')
            },
            addNewInfo () {
                let newInfo = {}
                if (this.route.includes('person')) {
                    newInfo = this.person
                } else if(this.route.includes('boat')) {
                    newInfo = this.boatCar
                } else if(this.route.includes('trash')) {
                    newInfo = this.trash
                } else if(this.route.includes('indicator')) {
                    newInfo = this.indicator
                } else if(this.route.includes('scenic')) {
                    newInfo = this.scenic
                } else if(this.route.includes('shop')) {
                    newInfo = this.shop
                } else if(this.route.includes('park')) {
                    newInfo = this.park
                } else if(this.route.includes('toilet')) {
                    newInfo = this.toilet
                } else if(this.route.includes('area')) {
                    newInfo = this.area
                } else if (this.route.includes('roat')) {
                    newInfo = this.roat
                }
                newInfo.status = true
                newInfo.checked = false
                if (this.Info.id) {
                    newInfo.id = this.Info.id
                    this.$emit('fixInfo', newInfo)
                } else {
                    this.$emit('addNewInfo', newInfo)
                }
                this.closeDialog()
            },
            showMapDialog () {
                this.mapVisible  = true
            },
            closeMapDialog () {
                this.mapVisible = false
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
                let that = this
                let reader = new FileReader();
                reader.readAsDataURL(file);
                this.src = reader.onload = function(event){
                    let txt = event.target.result;
                    console.log(txt, 'opopoppo')
                    that.src = txt
                }
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
            }
        },
        created () {
            api.area.getAllRegion().then(res => {
                console.log(res, '所有片区')
                this.regions = res
            })
            this.route = this.$route.path
            console.log(this.Info,'  opopop')
            if (this.route.includes('person')) {
                api.person.getJob().then(res => {
                    console.log(res, '所有工种')
                    this.options = res
                })
                this.person = this.Info
            } else if(this.route.includes('boat')) {
                this.boatCar = this.Info
            } else if(this.route.includes('trash')) {
                this.trash = this.Info
            } else if(this.route.includes('indicator')) {
                this.indicator = this.Info
            } else if(this.route.includes('scenic')) {
                this.scenic = this.Info
            } else if(this.route.includes('shop')) {
                api.shop.getBusinesstype().then(res => {
                    console.log(res, '所有商铺类型')
                    this.businesstype = res
                })
                this.shop = this.Info
            } else if(this.route.includes('park')) {
                this.park = this.Info
            } else if(this.route.includes('toilet')) {
                this.toilet = this.Info
            } else if (this.route.includes('area')) {
                this.area = this.Info
            } else if (this.route.includes('roat')) {
                this.roat = this.Info
            }
        },
        components: {
            FileUpload,
            MapDialog
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
        mounted () {
            console.log(document.getElementsByClassName('card'), 'p[p[p[p[p[')
            // console.log(this.$refs.test)
        }
    }
</script>
<style lang="scss">
    .detailDialog{
        width: 100%;
        height: 100%;
        .el-dialog .el-dialog--center{
            width: 100%;
        }
        .el-dialog--center{
            padding: 0;
            /*height: rem(300);*/
        }
        .el-dialog__header{
            padding: rem(5) 0 0 rem(5);
            text-align: left;
            border-bottom: 1px solid #ccc;
        }
        .el-dialog__title{
            font-size: rem(14);
        }
        .el-dialog__headerbtn {
            top: rem(7);
        }
        .el-dialog__body{
            padding: rem(10) rem(20) 0 rem(20);
            box-sizing: border-box;
            font-size: rem(12);
            min-height: rem(150);
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
    .detailDialog{
        .card{
            width: 100%;
            height: 100%;
            .personCardContent ,.boatCardContent {
                width: 100%;
                height: 100%;
                position: relative;
                p{
                    margin-top: rem(8);
                    border-bottom: 1px solid #ccc;
                    font-size: rem(12);
                    input{
                        border: none;
                        list-style: none;
                        outline: none;
                        font-size: rem(12);
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
                            /*border:  1px solid #ccc;*/
                            background: #fff;

                        }
                    }
                    img {
                        display: inline-block;
                        width: rem(20);
                        height: rem(20);
                        border-radius: 50%;
                        background: red;
                        vertical-align: middle;
                    }
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(3);
                        box-sizing: border-box;
                    }
                }
                .img{
                    width: rem(100);
                    height: rem(60);
                    position: absolute;
                    top: rem(0);
                    right: rem(0);
                    background: #fff;
                    img{
                        width: rem(55);
                        height: rem(55);
                        display: inline-block;
                        background: red;
                        border-radius: 50%;
                        margin-left: rem(25);
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
        .map {
            width: rem(400);
            height: rem(400);
        }
    }
</style>
