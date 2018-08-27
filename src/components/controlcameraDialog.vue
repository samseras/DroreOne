<template>
    <div class="controlcameraDialog">
        <el-dialog
            :title="title"
            :close-on-click-modal = false
            :visible="visible"
            :before-close="closeDialog"
            width="1140px"
            class="dialog echatDialog"
            center>
            <div class="Supcontal">
                <div class="playback"  v-if="playback">
                    <el-button class="on playView" @click="playView()">预览</el-button>
                    <el-button class="playBackButtom" @click="playBackButtom()">回放</el-button>
                    <el-button type="success" @click="clickCapturePic()">抓图</el-button>
                    <div class="ptz" v-if="ptz">
                        <fieldset>
                            <legend>云台控制</legend>
                            <div class="ptzedit">
                                <div class="ptzDirection">
                                    <input type="button" class="button" value="左上" @mousedown="mouseDownPTZControl(5);" @mouseup="mouseUpPTZControl();" />
                                    <input type="button" class="button" value="上" @mousedown="mouseDownPTZControl(1);" @mouseup="mouseUpPTZControl();" />
                                    <input type="button" class="button" value="右上" @mousedown="mouseDownPTZControl(7);" @mouseup="mouseUpPTZControl();" />
                                    <input type="button" class="button" value="左" @mousedown="mouseDownPTZControl(3);" @mouseup="mouseUpPTZControl();" />
                                    <input type="button" class="button" value="自动" @click="mouseDownPTZControl(9);" >
                                    <input type="button" class="button" value="右" @mousedown="mouseDownPTZControl(4);" @mouseup="mouseUpPTZControl();" />
                                    <input type="button" class="button" value="左下" @mousedown="mouseDownPTZControl(6);" @mouseup="mouseUpPTZControl();" />
                                    <input type="button" class="button" value="下" @mousedown="mouseDownPTZControl(2);" @mouseup="mouseUpPTZControl();" />
                                    <input type="button" class="button" value="右下" @mousedown="mouseDownPTZControl(8);" @mouseup="mouseUpPTZControl();" />
                                </div>
                                <div class="ptzButton">
                                    <input type="button" class="button" value="云台复位" @click="clickGoPreset();" >
                                    <input type="button" class="button" value="放大" @mousedown="PTZZoomIn()" @mouseup="PTZZoomStop()">
                                    <input type="button" class="button" value="缩小" @mousedown="PTZZoomout()" @mouseup="PTZZoomStop()">
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="datetimerange" v-if="datetimerange">
                        <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="Time"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']"
                        >
                        </el-date-picker>
                        <el-button type="primary" @click="clickRecordSearch();">开始回放</el-button>
                    </div>
                </div>
                <div id="obj" style="width:650px;">
                    <object id="DPSDK_OCX" classid="CLSID:D3E383B6-765D-448D-9476-DFD8B499926D" style="width: 100%; height: 100%" codebase="DpsdkOcx.cab#version=1.0.0.0"></object>
                </div>
                <div class="clearfix"></div>
            </div>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="480px" center top="10vh">
            系统未检测到控件，请先安装控件！<a style="color:#d52424;cursor:pointer;" @click="cmsocxDown();">点击此处</a>进行下载
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "supcontol",
        props: ['iStreamType', 'iChannelID','visible', 'Info','title','width'],
        data () {
            return {
                obj:'',
                g_iWndIndex: '0',
                g_iWndIndexTwo: '1',
                g_bPTZAuto:false,
                szIP: '10.2.0.1',
                szPort: '9000',
                szUsername: 'drore',
                szPassword: 'drore789',
                playback:true,
                channel:'1',
                Time:'',
                dialogVisible:false,
                datetimerange:false,
                ptz:false,
                gWndId:'0',
                nWndCount:'1',
                channel:'1000022$1$0$0',
                nStreamType:'1',
                nMediaType:'1',
                nTransType:'1',
                nRecordSource:2,
            }
        },
        methods: {
            closeDialog () {
                let nWndNo =this.obj.DPSDK_GetSelWnd(this.gWndId)
                this.obj.DPSDK_StopRealplayByWndNo(this.gWndId, nWndNo)
                this.obj.DPSDK_Logout()
                this.$emit('closeInfoDialog')
            },
            cmsocxDown(){
                let host=window.location.host,
                    protocol = window.location.protocol;
                window.open(protocol+'//'+host+"/static/template/DPSDK_OCX.exe");
            },
            init(){
                if(this.Info.channel==null && this.Info.channel==undefined){
                    // this.playback=false
                }else {
                    this.channel=this.Info.channel
                }
            },
            initViedo () {
                this.obj = document.getElementById("DPSDK_OCX");
                this.gWndId = this.obj.DPSDK_CreateSmartWnd(0, 0, 100, 100);
                this.obj.DPSDK_SetWndCount(this.gWndId, this.nWndCount);
                this.obj.DPSDK_SetSelWnd(this.gWndId, 0);
                this.login()
            },
            login () {
                let nRet = this.obj.DPSDK_Login(this.szIP, this.szPort, this.szUsername, this.szPassword);
                if(nRet == 0)
                {
                    this.playView()
                }else {
                    this.playView()
                }
            },
            dateFormat(oDate, fmt) {
                var o = {
                    "M+": oDate.getMonth() + 1, //月份
                    "d+": oDate.getDate(), //日
                    "h+": oDate.getHours(), //小时
                    "m+": oDate.getMinutes(), //分
                    "s+": oDate.getSeconds(), //秒
                    "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
                    "S": oDate.getMilliseconds()//毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            },
            playView(){
                $('.playBackButtom').removeClass('on')
                $('.playView').addClass('on')
                this.datetimerange=false
                // this.ptz=true
                let nWndNo = this.obj.DPSDK_GetSelWnd(this.gWndId);
                let nRet = this.obj.DPSDK_StartRealplayByWndNo(this.gWndId, nWndNo, this.channel, this.nStreamType, this.nMediaType, this.nTransType);
                if(nRet == 0)
                {
                }
            },
            playBackButtom(){
                var szCurTime = this.dateFormat(new Date(), "yyyy-MM-dd");
                this.Time=[szCurTime + " 00:00:00",szCurTime + " 23:59:59"];
                this.datetimerange=true
                // this.ptz=false
                $('.playView').removeClass('on')
                $('.playBackButtom').addClass('on')
                this.obj.DPSDK_LoadDGroupInfo()
            },
            clickCapturePic(){
                let nWndNo = this.obj.DPSDK_GetSelWnd(this.gWndId);
                let mydate=new Date();
                let reg=new RegExp(":","g");
                let path="c:\\dahuaphoto\\"+mydate.toLocaleString().replace(" ","").replace("年","").replace("月","").replace("日","").replace(reg,"")+".bmp";
                let nRet = this.obj.DPSDK_CapturePictureByWndNo(this.gWndId, nWndNo,path);
                if(nRet == 0) {
                    this.$message.success('抓图成功！请去本地文件夹'+ path +'查看');
                }
            },
            mouseDownPTZControl(iPTZIndex) {
                let oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex),
                    iPTZSpeed = 1;

                if (oWndInfo != null) {
                    if (9 == iPTZIndex && this.g_bPTZAuto) {
                        iPTZSpeed = 0;// 自动开启后，速度置为0可以关闭自动
                    } else {
                        this.g_bPTZAuto = false;// 点击其他方向，自动肯定会被关闭
                    }
                    WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
                        iPTZSpeed: iPTZSpeed,
                        success: function (xmlDoc) {
                            if (9 == iPTZIndex) {
                                this.g_bPTZAuto = !this.g_bPTZAuto;
                            }
                            this.$message.success('开启云台成功！');
                        },
                        error: function () {
                            this.$message.error('开启云台失败！');
                        }
                    });
                }
            },
            // 方向PTZ停止
            mouseUpPTZControl() {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(1, true, {
                        success: function (xmlDoc) {
                            this.$message.success('停止云台成功！');
                        },
                        error: function () {
                            this.$message.error('停止云台失败！');
                        }
                    });
                }
            },
            // 调用预置点
            clickGoPreset() {
                let oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
                if (oWndInfo != null) {
                    WebVideoCtrl.I_GoPreset(1, {
                        success: function (xmlDoc) {
                            this.$message.success('调用预置点成功！');
                        },
                        error: function () {
                            this.$message.error('调用预置点失败！');
                        }
                    });
                }
            },
            PTZZoomIn() {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(10, false, {
                        iWndIndex: this.g_iWndIndex,
                        success: function (xmlDoc) {
                            this.$message.success('放大成功！');
                        },
                        error: function () {
                            this.$message.error('放大失败！');
                        }
                    });
                }
            },
            PTZZoomout() {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(11, false, {
                        iWndIndex: this.g_iWndIndex,
                        success: function (xmlDoc) {
                            this.$message.success('缩小成功！');
                        },
                        error: function () {
                            this.$message.error('缩小失败！');
                        }
                    });
                }
            },
            PTZZoomStop() {
                var oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex);
                if (oWndInfo != null) {
                    WebVideoCtrl.I_PTZControl(11, true, {
                        iWndIndex: this.g_iWndIndex,
                        success: function (xmlDoc) {
                            this.$message.success('调焦停止成功！');
                        },
                        error: function () {
                            this.$message.error('调焦停止失败！');
                        }
                    });
                }
            },
            clickRecordSearch() {
                if (this.Time==null) {
                    this.$message.error('请选择回放时间再开始回放！');
                    return;
                }
                let szStartTime = new Date((this.Time[0]).replace(new RegExp("-","gm"),"/")).getTime()/1000,
                    szEndTime = new Date((this.Time[1]).replace(new RegExp("-","gm"),"/")).getTime()/1000;
                let nWndNo = this.obj.DPSDK_GetSelWnd(this.gWndId);
                let nRet = this.obj.DPSDK_StartTimePlaybackByWndNo(this.gWndId, nWndNo, this.channel, this.nRecordSource, szStartTime,szEndTime)
                if(nRet == 0) {
                }
            },
        },
        mounted () {
            this.init()
            setTimeout(() => {
                this.initViedo()
            },500)
        },
        created () {
        },
        computed: {

        },
    }
</script>
<style scoped lang="scss" type="text/scss">
    .Supcontal{
        width: 100%;
        height: 100%;
        #obj{
            height: 480px;
        }
        .plugin{
            width: rem(600);
            height: 100%;
            display: inline-block;
            float: left;
        }
        .playback{
            text-align: left!important;
            margin-left: rem(5);
            margin-bottom: rem(5);
            float: right;
            width: rem(420);
            .playView{
                width: rem(120);
            }
            .playBackButtom{
                width: rem(120);
            }
            .on{
                color: #fff;
                background-color: #409EFF;
                border-color: #409EFF;
            }
            .datetimerange{
                display: inline-block;
                margin-top: rem(10);
                button{
                    margin-top: rem(10);
                }
            }
            .ptz{
                margin-top: rem(20);
                legend{
                    font-size: rem(16);
                    padding: 0 rem(5);
                    margin-left: rem(10);
                }
                .ptzedit{
                    margin: rem(20) rem(10) rem(10);
                    .button{
                        width:rem(70);
                        margin-bottom: rem(15);
                        text-align: center;
                        margin-left: rem(10);
                        display: inline-block;
                        line-height: 1;
                        white-space: nowrap;
                        cursor: pointer;
                        background: #fff;
                        border: 1px solid #dcdfe6;
                        border-color: #dcdfe6;
                        color: #606266;
                        -webkit-appearance: none;
                        text-align: center;
                        box-sizing: border-box;
                        outline: none;
                        transition: .1s;
                        font-weight: 500;
                        -moz-user-select: none;
                        -webkit-user-select: none;
                        -ms-user-select: none;
                        padding: 12px 20px;
                        font-size: 14px;
                        border-radius: 4px;
                    }
                    .ptzDirection{
                        width: rem(250);
                        display: inline-block;
                    }
                    .ptzButton{
                        width: rem(120);
                        display: inline-block;
                        float: right;
                        .button{
                            width: rem(100);
                        }
                    }
                }
            }
        }

    }

</style>
