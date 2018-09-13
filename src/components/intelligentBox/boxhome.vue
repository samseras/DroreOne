<template>
    <div class="box-home">
        <!--<div>
            <ul>
               <li v-for="(item,i) in arr">
                   {{item.schoolname}}
               </li>
            </ul>
        </div>-->
        <setarea></setarea>
        <el-button type="text" @click="openDialog" class="bgmusic">背景乐设置</el-button>
        <musicedit :dialogisshow="dialogVisible" @closeDialog="guanbi"></musicedit>

        <div style="width:300px;height:300px;background: #00a1f2">
            <center>
                <!-- <h1>浏览器捕捉麦克风功能测试2</h1>-->
                <hr/>
                <div>
                    <audio controls autoplay id="myvideo" width="300" height="300"></audio><br>
                    <button class="btn-start" @click="startShow">开始音频播放</button>
                    <button class="btn-end">结束音频播放</button>
                </div>
                <!-- <p class="output">点击“开始录制”按钮开始录音</p>-->
                <div id="recordingslist"></div>
                <div class="my-audio"></div>
                <a id="downloadLink" download="mediarecorder.webm" name="mediarecorder.webm" href></a>
                <a id="downloadLink1" download="mediarecorder.webm" name="mediarecorder.webm" href></a>
            </center>
        </div>
        <!-- <input type="file" accept="image/*" @change="handleFile"/>
        <br/>
        <img style="width:200px;height:200px" id="testpre">-->

    </div>
</template>
<script>
    import api from '@/api'
    import setarea from '@/components/intelligentBox/setarea'
    import musicedit from '@/components/intelligentBox/musicedit'
    export default{
        name:'musicEdit',
        data(){
            return{
                dialogVisible:false,
                websocket:null,
                /*arr:
                    [
                    {
                        "id": "1",
                        "practitionerid": "1",
                        "schoolname": "内蒙古师范",
                        "number": "118"
                    },
                    {
                        "id": "2",
                        "practitionerid": "1",
                        "schoolname": "内蒙古科技",
                        "number": "95"
                    },
                    {
                        "id": "3",
                        "practitionerid": "1",
                        "schoolname": "内蒙古大学",
                        "number": "78"
                    },
                    {
                        "id": "4",
                        "practitionerid": "1",
                        "schoolname": "内蒙古财经",
                        "number": "47"
                    },
                    {
                        "id": "5",
                        "practitionerid": "1",
                        "schoolname": "呼伦贝尔学",
                        "number": "45"
                    },
                    {
                        "id": "6",
                        "practitionerid": "1",
                        "schoolname": "内蒙古职业",
                        "number": "40"
                    },
                    {
                        "id": "7",
                        "practitionerid": "1",
                        "schoolname": "内蒙古农业",
                        "number": "37"
                    },
                    {
                        "id": "8",
                        "practitionerid": "1",
                        "schoolname": "包头师范学",
                        "number": "27"
                    },
                    {
                        "id": "9",
                        "practitionerid": "1",
                        "schoolname": "内蒙古旅游",
                        "number": "24"
                    },
                    {
                        "id": "10",
                        "practitionerid": "1",
                        "schoolname": "赤峰学院",
                        "number": "2"
                    }
                ],*/
            }
        },
        components:{
            setarea,
            musicedit
        },
        created(){


        },
        destroyed() {
            //页面销毁时关闭长连接
            this.websocketclose();
        },
        mounted(){


        },
        methods:{
            initWebSocket(){ //初始化weosocket
                const wsuri = "ws://192.168.0.135:8080/websocket";
                //const wsuri = "ws://121.40.165.18:8800";
                this.websocket = new WebSocket(wsuri);
                this.websocket.onopen = this.websocketonopen;
                this.websocket.onerror = this.websocketonerror;
                this.websocket.onmessage = this.websocketonmessage;
                //this.websocket.onclose = this.websocketclose;
            },
            websocketonopen() {
                console.log("WebSocket连接成功");
                //设置发信息送类型为：ArrayBuffer
                this.websocket.binaryType = "arraybuffer";
                this.zhibo();  //直播
            },
            websocketonmessage(e){ //数据接收
                console.log(e.data,'这是websocket返回的结果');
                /*const redata = JSON.parse(e.data);
                //注意：长连接我们是后台直接1秒推送一条数据，
                //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
                //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
                console.log(redata.value);*/
            },
            websocketonerror(e) { //错误
                console.log("WebSocket连接发生错误");
                this.initWebSocket();  //这个函数在这里之所以再次调用，是为了解决视频传输的过程中突发的连接断开问题
            },
            websocketclose(e){ //关闭
                //console.log("connection closed (" + e.code + ")");
                //this.websocket=null;
                this.websocket.close();
            },
            startShow(){
                this.initWebSocket();
                console.log('启动websocket');
            },
            zhibo(){
                //录音并播放开始
                // 封装$
                var $ = function(className){return document.querySelector(className)};
                var videoElement=document.getElementById('myvideo')
                var mediaRecorder,chunks=[],mediaStreamTrack;
                // feature detection
                var that=this;
                if (!navigator.getUserMedia)
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia;
                if (navigator.getUserMedia){
                    navigator.getUserMedia({audio:true}, success, function(e) {
                        console.log('err函数...');
                    });
                    function success(e){//上面的success函数
                        if (typeof MediaRecorder.isTypeSupported == 'function'){
                            if (MediaRecorder.isTypeSupported("audio/invalid")) {
                                var options = {mimeType: "audio/invalid"};
                                alert(1);
                            } else if (MediaRecorder.isTypeSupported("audio/ogg")) {
                                var options = {mimeType: "audio/ogg"};
                                alert(2);
                            } else  if (MediaRecorder.isTypeSupported("audio/webm;codecs=vorbis")) {
                                var options = {mimeType: "audio/webm;codecs=vorbis"};
                                alert(3);
                            }else  if (MediaRecorder.isTypeSupported("audio/webm;codecs=pcm")) {
                                var options = {mimeType: "audio/webm;codecs=pcm"};
                                //alert(6);
                            }else  if (MediaRecorder.isTypeSupported("audio/webm")) {
                                var options = {mimeType: "audio/webm"};
                                alert(4);
                            }else  if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
                                var options = {mimeType: "audio/webm;codecs=opus"};
                                alert(5);
                            }
                            mediaRecorder = new MediaRecorder(e, options);
                        }else{
                            log('isTypeSupported is not supported, using default codecs for browser');
                            mediaRecorder = new MediaRecorder(e);
                        }
                        mediaRecorder.start(10);
                        var url = window.URL || window.webkitURL;
                        videoElement.src = url ? url.createObjectURL(e) : e;
                        videoElement.play();
                        mediaStreamTrack = e;  //暂存流，做停止动作
                        mediaRecorder.ondataavailable = function(e) {
                            //console.log(e.data);
                            //console.log(e.data.type);
                            //console.log(e);
                            chunks.push(e.data);
                            var reader = new FileReader();
                            reader.addEventListener("loadend", function() {
                                //reader.result是一个含有视频数据流的Blob对象
                                var buf = new Uint8Array(reader.result);  //8位无符号整数的视图数组
                                console.log(reader.result);//二进制ArrayBuffer
                                console.log(buf,'无拉拉拉');
                                if(reader.result.byteLength > 0){        //过滤空数据
                                    console.log(new Date().getTime(),'哈哈哈哈哈');
                                    that.websocket.send(buf);
                                }
                            });
                            reader.readAsArrayBuffer(e.data);
                        };
                        mediaRecorder.onstop = function(){
                            var blob = new Blob(chunks, {type: "video/webm"});  //也可以直接生成wav
                            chunks = [];
                            var videoURL = window.URL.createObjectURL(blob);
                            downloadLink.href = videoURL;
                            videoElement.src = videoURL;
                            downloadLink.innerHTML = 'Download video file';
                            var rand =  Math.floor((Math.random() * 10000000));
                            var name  = "video_"+rand+".webm" ;
                            downloadLink.setAttribute( "download", name);
                            downloadLink.setAttribute( "name", name);
                        };
                    }
                } else{alert('不支持getUserMedia')} ;
                $('.btn-end').addEventListener('click', function(e){
                    //结束录制
                    mediaRecorder.stop();  //关闭录制
                    mediaStreamTrack.getTracks().forEach(function (track) {  //仅停止流
                        track.stop();
                    });
                    that.websocket.close();//关闭websocket
                });
            },
            guanbi(){
                this.dialogVisible=false;
            },
            openDialog(){
                this.dialogVisible = true
            }
        }
    }
</script>
<style lang="scss" type="text/scss">
    .box-home{
        width:100%;
        height:90%;
        .bgmusic{
            margin-left:rem(32);
            background-color: #eee;
            padding: .5rem;
            position: relative;
            top:rem(-32);
        }
    }
</style>
