<template>
    <div class="mapdetailDialog">
        <el-dialog
            :title="title"
            :visible="visible"
            :before-close="closeDialog"
            width="600px"
            class="dialog echatDialog"
            center>
            <div class="card">
                <!--标签-->
                <div class="personCardContent" v-if="route.includes('label')">
                    <p class="sex">名称：<input type="text" v-model="label.name" class="inputText"></p>
                    <p class="id">编码：<input type="text" v-model="label.id" class="inputText"></p>
                    <p class="type">标签分类：
                        <el-select size="mini"  v-model="label.type" placeholder="请选择">
                            <el-option
                                v-for="item in label.options"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </p>
                    <p class="Hardware">点位图标地址（24*24）：
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :before-remove="beforeRemove"
                            :before-upload="beforeUpload"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">上传图片</el-button>
                        </el-upload>
                    </p>
                    <p class="name">标签类型地址（48*48）：
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :before-remove="beforeRemove"
                            :before-upload="beforeUpload"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">上传图片</el-button>
                        </el-upload>
                    </p>
                    <p class="sort">排序：<input type="text" v-model="label.sort" class="inputText"></p>
                    <p class="uploadText">y轴坐标偏移：
                        <input type="text"v-model="label.xAxis" class="inputText">
                    </p>
                    <p class="type">x轴坐标偏移：
                        <input type="text"v-model="label.yAxis" class="inputText">
                    </p>
                </div>

                <!--地图详情-->
                <div class="mapDataDetail" v-if="route.includes('map')">

                    <p>   <span class="sex">景区名称：<input type="text" v-model="mapData.type" class="inputText"></span></p>
                    <p>  <span class="sex">检索首字母：<input type="text" v-model="mapData.firstLetter" class="inputText"></span></p>
                    <p>  <span class="sex">高清图片路径：<input type="text" v-model="mapData.imgSrc" class="inputText"></span></p>
                    <p>  <span class="sex">webp图片路径：<input type="text" v-model="mapData.webSrc" class="inputText"></span></p>

                    <p> <span class="sex">版本：<input type="text" v-model="mapData.version" class="inputText"></span></p>
                    <p>  <span class="sex">图片高度：<input type="text" v-model="mapData.height" class="inputText"></span></p>
                    <p>  <span class="sex">图片宽度：<input type="text" v-model="mapData.width" class="inputText"></span></p>
                    <p> <span class="sex">景区地图等级：<input type="text" v-model="mapData.level" class="inputText"></span></p>

                    <p>  <span class="sex">地图匹配Google地图需要缩放：<input type="text" v-model="mapData.zoom" class="inputText"></span></p>
                    <p>  <span class="sex">初始显示等级：<input type="text" v-model="mapData.initLevel" class="inputText"></span></p>
                    <p>   <span class="sex">全景地址：<input type="text" v-model="mapData.allSrc" class="inputText"></span></p>
                    <p>   <span class="sex">地图类型：<input type="text" v-model="mapData.mapType" class="inputText"></span></p>


                    <p>   <span class="sex">鹰眼地图路径：<input type="text" v-model="mapData.eyeSrc" class="inputText"></span></p>
                    <p>  <span class="sex">路网数据：<input type="text" v-model="mapData.netData" class="inputText"></span></p>
                    <p>  <span class="sex">3d地图高度：<input type="text" v-model="mapData.dHeight" class="inputText"></span></p>
                    <p>   <span class="sex">3d宽度：<input type="text" v-model="mapData.dWidth" class="inputText"></span></p>
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

    export default {
        name: "person-detail",
        props: ['visible', 'Info','isDisabled','title'],
        data () {
            return {
                edit: false,
                mapVisible: false
            }
        },
        methods: {
            handleSuccess(response,file,fileList){
                console.log('上传文件成功', file)
            },
            beforeUpload(file){
                console.log('上传之前',file);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);

            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            closeDialog () {
                this.$emit('closeInfoDialog')
            },
            addNewInfo () {
                let newInfo = this.Info

                console.log(newInfo,"返回的数据")
                this.$emit('fixInfo', newInfo)

                this.closeDialog()
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
                    that.src = txt
                }
            }


        },
        async created () {
            this.route = this.$route.path
            console.log(this.Info,'  opopop');
            console.log(this.route);
            if (this.route.includes('label')) {
                this.label = this.Info;
            }else if(this.route.includes('map')){
                this.mapData = this.Info;
                console.log(this.mapData)
            }
        },
        components: {
        }
    }
</script>
<style lang="scss">
    .mapdetailDialog{
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
            padding: rem(10) 0 rem(5) rem(20);
            text-align: left;
            border-bottom: 1px solid #ccc;
        }
        .el-dialog__title{
            font-size: rem(14);
        }
        .el-dialog__headerbtn {
            top: rem(12);
        }
        .el-dialog__body{
            padding: rem(10) rem(20) 0 rem(20);
            box-sizing: border-box;
            font-size: rem(12);
            min-height: rem(150);
            .el-select{
                width:rem(475);
                .el-input--suffix .el-input__inner{
                    border: none;
                }
                .el-tag__close.el-icon-close{
                    top:rem(-2);
                }
            }
            .el-checkbox-group{
                display: inline-block;
                padding-right: rem(10);
            }
            .el-range-editor--mini.el-input__inner{
                width: rem(475);
                border: none;
                padding: 0 rem(10);
                height: rem(24);
                line-height: rem(24);
                .el-range-separator{
                    line-height: rem(24);
                }
            }
            .el-date-editor--timerange{
                border: none;
                float: right;
                width: rem(250);
                padding: 0 rem(10);
                height: rem(24);
                line-height: rem(24);
            }
            .Hardware .el-date-editor--timerange{
                float: inherit;
            }
            .el-date-editor{
                .el-range-input,.el-range-separator{
                    font-size: rem(12);
                }
                .el-range__icon,.el-range-separator{
                    height: rem(24);
                    line-height: rem(24);
                }
            }
            .el-radio{
                .el-radio__input{
                    /*.el-radio__inner{*/
                        /*width: rem(12);*/
                        /*height: rem(12);*/
                    /*}*/
                }
                .el-radio__label{
                    font-size: rem(12);
                }
            }
            .el-tag--mini{
                line-height: rem(21);

            }
            .inputText{
                width: rem(400);
            }
            .upload-demo{
                display: inline-block;
                width: rem(470);
                height: rem(22);
                line-height: rem(22);
                overflow: hidden;
                .el-upload{
                    float: right;
                    .el-button--small, .el-button--small.is-round{
                        padding: rem(4) rem(10);
                    }
                }
                .el-upload-list{
                    display: inline-block;
                    height: rem(24);
                    line-height: rem(24);
                    .el-upload-list__item{
                        margin-top: 0;
                        display: inline-block;
                        width: inherit;
                        margin-right: rem(10);
                        height: rem(24);
                        line-height: rem(24);
                        .el-upload-list__item-name{
                            font-size: rem(12);
                        }
                    }
                }
            }
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
    .el-select-dropdown__item span{
        font-size: rem(12);
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
    .mapdetailDialog{
        .map{
            flex: 1;
            height: 100%;
            width:100%;
            background: yellowgreen;
        }
        .card{
            width: 100%;
            height: 100%;

            .personCardContent{
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
                    .location{
                        width: rem(470);
                    }
                    textarea{
                        resize: none;
                        outline: none;
                        padding: rem(3);
                        box-sizing: border-box;
                        border-radius: rem(5);
                        border: 1px solid #ccc;
                        line-height: rem(28);
                        width: rem(490);
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
            .mapDataDetail {
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
<style lang="scss">
    .el-checkbox__label{
        font-size: rem(12);
        padding-left: rem(7);
    }
    .el-checkbox+.el-checkbox{
        margin-left: rem(10);
    }
</style>
