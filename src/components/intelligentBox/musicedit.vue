<template>
    <div class="box-edit">
        <audio id="audio" >
            <source  id="audiosource" src=""></source>
        </audio>

        <el-dialog
            title="播放设置"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="music-edit-content">
                <div class="video-show">
                    <div class="play-audio">
                        <div class="left">
                            <div class="song-icon">
                                <img src="../../../static/img/intelligentbox/music.png" alt="">
                            </div>
                            <div class="song-name">
                                <div class="title" id="title"></div>
                            </div>
                        </div>
                        <div class="right">
                            <!--<div class="button" @click="fastback"><img src="../../../static/img/intelligentbox/tui.png" alt=""></div>-->
                            <div class="button" @click="fastback"><img src="../../../static/img/intelligentbox/tui1.png" alt=""></div>
                            <div class="button play-button" @click="playaudio"><img :src="playurl" alt=""></div>
                            <!--<div class="button" @click="fastgo"><img src="../../../static/img/intelligentbox/jin.png" alt=""></div>-->
                            <div class="button" @click="fastgo"><img src="../../../static/img/intelligentbox/jin1.png" alt=""></div>
                            <div class="button last-button" @mousedown="startHanhua" @mouseup="stopHanhua">
                                <img src="../../../static/img/intelligentbox/hanhua.png" alt="" id="hanhua">
                            </div>
                        </div>
                    </div>
                    <div class="play-bar">
                        <el-slider v-model="progressnumber" @change="changeProgerss"></el-slider>
                        <div class="play-time">{{playtime}}</div>
                        <div class="volumn-btn">

                            <div class="btn">
                                <div class="image"><img @click="suijiPlay" id="anyone" src="../../../static/img/intelligentbox/nosuiji.png" alt="" title="随机播放"></div>
                                <div class="image">
                                    <img src="../../../static/img/intelligentbox/wenjian.png" alt="" @click="$refs.uploadMusics.click()" title="上传音乐">

                                    <input type="file" ref="uploadMusics" class="musicsFile" @change="selectMusics">
                                </div>
                                <div class="image" @click="danquloop"><img :src="loopurl" alt="" title="单曲循环"></div>
                            </div>
                            <div class="voice-number">{{voicenumber}}</div>
                            <div class="sound">
                                <el-slider v-model="voicenumber" @change="changeVolumn"></el-slider>
                            </div>
                            <div class="voice-icon"><img src="../../../static/img/intelligentbox/guangbo.png" alt=""></div>
                        </div>
                    </div>
                    <div class="play-list">
                        <div class="header">

                            <div class="search">
                                <el-input placeholder="请输入内容" v-model="searchflag" class="">
                                    <el-button slot="append" icon="el-icon-search" @click="gosearch"></el-button>
                                </el-input>
                            </div>
                            <div class="allsel">
                                <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
                            </div>
                            <div class="del">
                                <!--<i class="el-icon-delete"></i><span>删除</span>-->
                            </div>
                        </div>
                        <div class="content">
                            <el-checkbox-group v-model="checkedmusics"  @change="handleCheckedmusicsChange">
                                <el-checkbox v-for="music in musics" :label="music" :key="music">
                                    <span class="all-name">
                                        <!--{{music.title}}</span><span class="all-time">{{music.artist}}-->
                                        {{music}}
                                    </span>
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>

                </div>
                <div class="form-show">
                    <div class="form-box">

                        <div v-if="isGroup" class="hasSelect" v-for="(item,i) in selectedCast">
                            <img src="../../../static/img/broadcast.svg" alt="">
                            {{item.label}}
                        </div>
                        <div v-if="!isGroup" class="hasSelect">
                            <img src="../../../static/img/broadcast.svg" alt="">
                            {{Infos.name}}
                        </div>

                    </div>
                </div>
                <div class="text-show">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入广播文字"
                        v-model="broadcastText">
                    </el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>

    /*const musicOptions = [
        {
            name:'心雨',
            author:'杨钰莹',
            url:'http://music.163.com/song/media/outer/url?id=317151.mp3'
        },
        {

    ];*/
    import api from '@/api'
    import Bus from '@/api/bus.js'
    export default{
        name:'boxEdit',
        props:['dialogisshow','selectedCast','Infos','isGroup'],
        data(){
            return{

                sourceurl:'',
                progressnumber:0,
                voicenumber:30,
                loopurl:'../../../static/img/intelligentbox/danquxunhuan.png',
                audioObj:'',
                alltime:0,
                currenttime:0,
                currentflag:0,
                playtime:'',
                form: {
                    /*week:[],*/
                    frequency:'',
                    playtype:'0',
                    date1: '',
                    date2: '',
                    time1:'',
                    time2:'',
                    operatetime: '',
                    number:1,
                    transmsg:[]
                },
                //tempmsg:[],
                checkAll: false,
                checkedmusics: [],
                transmusics:[],
                songurllist:[],
                songnamelist:[],
                firstmusics:[],
                musics: [],
                suijiflag:0,
                shunxuflag:0,
                isIndeterminate: true,
                searchflag:'',
                dialogVisible:false,
                //playurl:'../../../static/img/intelligentbox/bo.png',
                playurl:'../../../static/img/intelligentbox/bo1.png',
                broadcastText:'',
                finalSelectedCast:[],
                idFlag:[],
                stopId:'',
                hanhuaFlag:[],
                hanhuaId:'',

            }
        },
        created(){
        },
        mounted(){

            this.init();

            this.audioObj=document.getElementById('audio');

            let that=this;
            Bus.$on('txt',function(msg){//监听first组件的txt事件
                //alert(msg);
                let tempmsg=[];
                msg.forEach(item=>{
                    tempmsg.push({
                        'speakerId':item,
                    });
                })

                console.log(tempmsg,'监听兄弟页面的数据');
                that.form.transmsg=tempmsg;
            });
        },
        watch:{
            isGroup(news,olds){  //判断是否是组
                if(news===true){
                    console.log('组打开的页面');
                }
            },
            dialogisshow(news,olds){   //监听弹框
                this.dialogVisible=news;
                if(this.dialogVisible===true){
                    this.audioObj=document.getElementById('audio');
                    //获取状态
                    var that=this;
                    let arrCurrentSelect=[];
                    if(this.Infos.id){  //单个广播打开时
                        arrCurrentSelect.push(this.Infos.id);
                        console.log(this.Infos,'当前选择的广播');
                        api.intelligentBox.getStartStatus(arrCurrentSelect).then(res=>{
                            that.voicenumber=res.volume;
                        });
                    }
                }
            },
            selectedCast(news,olds){  //监听选择的广播
                console.log(news,'@@@@@@@@@@');
                this.finalSelectedCast=news;
                /*let arrStatus=[];
                arrStatus.push(((this.finalSelectedCast)[0]).id);*/


            }
        },
        methods:{
            startHanhua(){
                hanhua.src='../../../static/img/intelligentbox/hanhuaing.png';
                this.hanhuaFlag=[];
                if(this.isGroup===true){
                    this.finalSelectedCast.forEach(item=>{
                        console.log(item.id,'选择的广播Id');
                        this.hanhuaFlag.push(item.id);

                    });
                }else if(this.isGroup===false){
                    this.hanhuaFlag.push(this.Infos.id)
                }

                console.log(this.hanhuaFlag,'喊话的广播组');
                api.intelligentBox.startHanhua(this.hanhuaFlag).then(res=>{
                    this.hanhuaId=res;
                    console.log('传递声音完毕')
                })

            },
            stopHanhua(){
                hanhua.src='../../../static/img/intelligentbox/hanhua.png';

                api.intelligentBox.stopHanhua(this.hanhuaFlag,this.hanhuaId).then(res=>{
                    console.log('停止喊话')
                })
            },
            gosearch(){
                if (this.searchflag.trim() === '') {
                    this.musics=this.firstmusics;
                } else {
                    this.musics = this.musics.filter(item => {
                        if (item.includes(this.searchflag)) {
                            return item
                        }
                    })
                }
            },
            handleCheckAllChange(val) {  //全选或不选歌曲
                this.checkedmusics = val ? this.musics : [];
                this.isIndeterminate = false;
            },
            handleCheckedmusicsChange(value) {  //选择播放歌曲
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.musics.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.musics.length;
                let tempUrl;
                if(window.location.host.includes('localhost')||window.location.host.includes('127.0.0.1')){
                    tempUrl='http://192.168.0.150:8090'
                }else{
                    tempUrl="http://"+window.location.host;    //截取后添加到src上再次加上http前缀
                };
                this.songurllist=[];
                this.songnamelist=[];
                this.checkedmusics.forEach((item,i)=>{
                    this.songurllist.push(tempUrl+item.src)
                    this.songnamelist.push(item.title)
                })
                console.log(this.songurllist);
                console.log(this.songnamelist);
                console.log(this.checkedmusics,'选择的音乐对象');
            },
            save(){  //保存设置

                if(this.isGroup===true){  //广播组操作
                    //传递音量
                    let textFlag=[];
                    this.finalSelectedCast.forEach(item=>{
                        console.log(item.id,'选择的广播Id');
                        let flag=[];
                        flag.push(item.id);
                        textFlag.push(item.id);
                        api.intelligentBox.postMusicVoice(flag,this.voicenumber).then(res=>{
                            console.log(res);
                            console.log('传递声音完毕')
                        })
                    });
                    //传递文本信息
                    console.log(textFlag,'传递文本的广播id');
                    api.intelligentBox.postTextCast(textFlag,this.broadcastText).then(res=>{
                        console.log(res);
                        console.log('传递文本完毕')
                    })
                    //传递歌曲名字
                    api.intelligentBox.postSongName(textFlag,this.checkedmusics).then(res=>{
                        console.log('传递歌曲完毕');
                    })

                }else{
                    this.saveSignal();   //单个广播操作
                }






            },
            saveSignal(){
                let idSignalFlag=[];
                idSignalFlag.push(this.Infos.id);
                api.intelligentBox.postMusicVoice(idSignalFlag,this.voicenumber).then(res=>{
                    console.log(res);
                    console.log('传递单个声音完毕')
                });
                api.intelligentBox.postTextCast(idSignalFlag,this.broadcastText).then(res=>{
                    console.log(res);
                    console.log('传递单个文本完毕')
                });


            },
            fastback(){  //上一首
                /*if(this.suijiflag===1||this.audioObj.loop===true){
                    this.playaudio();
                }else{
                    this.shunxuflag-=1;
                    (this.shunxuflag<0)&&(this.shunxuflag=0);
                    document.getElementById('audio').src = this.songurllist[this.shunxuflag];
                    document.getElementById('audiosource').src = this.songurllist[this.shunxuflag];
                    document.getElementById('audio').load();
                    document.getElementById('title').innerText = this.songnamelist[this.shunxuflag];
                    this.audioObj.play();
                }*/
            },
            fastgo(){  //下一首
                //alert('5555');
                //this.audioObj.currentTime=this.audioObj.duration;
                /*if(this.suijiflag===1||this.audioObj.loop===true){
                    this.playaudio();
                }else{
                    this.shunxuflag+=1;
                    (this.shunxuflag>=this.checkedmusics.length)&&(this.shunxuflag=0);
                    document.getElementById('audio').src = this.songurllist[this.shunxuflag];
                    document.getElementById('audiosource').src = this.songurllist[this.shunxuflag];
                    document.getElementById('audio').load();
                    document.getElementById('title').innerText = this.songnamelist[this.shunxuflag];
                    this.audioObj.play();
                }*/
            },
            progress(){  //播放进度条
                let that=this;
                setInterval(function(){
                    that.currenttime=that.audioObj.currentTime;
                    that.currentflag=that.currenttime/that.alltime*100;
                    that.progressnumber=that.currentflag;
                },1000)
            },
            playaudio(){  //播放
                if(this.checkedmusics.length<1){
                    this.$message({
                        showClose: true,
                        message: '请选择歌曲',
                        type: 'warning'
                    });
                    return
                }
                if(this.playurl.includes('/bo1')){

                    /***************/
                    this.idFlag=[];
                    if(this.isGroup===true){

                        this.finalSelectedCast.forEach(item=>{
                            console.log(item.id,'选择的广播Id');
                            let flag=[];
                            flag.push(item.id);
                            this.idFlag.push(item.id);

                        });
                    }else if(this.isGroup===false){
                        this.idFlag.push(this.Infos.id);
                    }


                    api.intelligentBox.postSongName(this.idFlag,this.checkedmusics).then(res=>{
                        console.log(res);
                        this.stopId=res;
                        console.log('传递播放歌曲完毕');
                    })
                    /***************/


                    /*if(this.suijiflag===1){  //随机播放
                        let randomBgIndex = Math.round( Math.random() * (this.songurllist.length-1) );
                        document.getElementById('audio').src = this.songurllist[randomBgIndex];
                        document.getElementById('audiosource').src = this.songurllist[randomBgIndex];
                        document.getElementById('audio').load();
                        document.getElementById('title').innerText = this.songnamelist[randomBgIndex];
                    }else{  //默认按顺序播放
                        document.getElementById('audio').src = this.songurllist[0];
                        document.getElementById('audiosource').src = this.songurllist[0];
                        document.getElementById('audio').load();
                        document.getElementById('title').innerText = this.songnamelist[this.shunxuflag];
                    }
                    this.audioObj.play();
                    this.showtime();
                    this.progress();
                    this.audioObj.loop = false;//禁止循环，否则无法触发ended事件
                    this.audioObj.addEventListener('ended', playEndedHandler, false);
                    let that=this;
                    function playEndedHandler(){  //一首歌播完触发
                        if(that.suijiflag===1){
                            console.log(that.songurllist);
                            let randomBgIndex = Math.round( Math.random() * (that.songurllist.length-1) );
                            document.getElementById('audio').src = that.songurllist[randomBgIndex];
                            document.getElementById('audiosource').src = that.songurllist[randomBgIndex];
                            document.getElementById('audio').load();
                            document.getElementById('title').innerText = that.songnamelist[randomBgIndex];
                        }else{
                            that.shunxuflag+=1;
                            (that.shunxuflag===that.songurllist.length)&&(that.shunxuflag=0);
                            document.getElementById('audio').src = that.songurllist[that.shunxuflag];
                            document.getElementById('audiosource').src = that.songurllist[that.shunxuflag];
                            document.getElementById('audio').load();
                            document.getElementById('title').innerText = that.songnamelist[that.shunxuflag];
                        }
                        that.audioObj.play();
                        that.showtime();
                        that.progress();
                        console.log(that.songurllist.length);
                        !that.songurllist.length && that.audioObj.removeEventListener('ended',playEndedHandler,false);//只有一个元素时解除绑定
                    }
                    this.progress();*/
                    //this.playurl='../../../static/img/intelligentbox/stop.png';
                    this.playurl='../../../static/img/intelligentbox/stop1.png';

                }else{
                    /*this.audioObj.pause();*/
                    //this.playurl='../../../static/img/intelligentbox/bo.png'
                    this.playurl='../../../static/img/intelligentbox/bo1.png';
                    /***************/

                    api.intelligentBox.stopSongName(this.stopId,this.idFlag).then(res=>{
                        console.log('停止单个歌曲完毕');
                    })
                    /***************/
                }
            },
            suijiPlay(){  //选择随机播放
                if(this.suijiflag===0){
                    document.getElementById('anyone').src="../../../static/img/intelligentbox/suiji.png";
                    this.suijiflag=1;
                    this.audioObj.loop = false;
                    this.loopurl='../../../static/img/intelligentbox/danquxunhuan.png';
                }else{
                    document.getElementById('anyone').src="../../../static/img/intelligentbox/nosuiji.png";
                    this.suijiflag=0;
                }
            },
            danquloop(){  //选择单曲循环
                if(this.audioObj.loop===false){
                    this.audioObj.loop = true;
                    this.loopurl='../../../static/img/intelligentbox/danquxunhuannow.png';
                    this.suijiflag=0;
                    document.getElementById('anyone').src="../../../static/img/intelligentbox/nosuiji.png";
                }else{
                    this.audioObj.loop = false;
                    this.loopurl='../../../static/img/intelligentbox/danquxunhuan.png';
                }
            },
            selectMusics(e){  //选择上传的歌曲
                console.log(e.target.files, 'opopopopopops')
                let file = e.target.files[0]
                console.log(file,'!!!!!!!!');
                if (!file.type.includes('mp3')) {
                    this.$message.error('请上传MP3格式文件，谢谢！');
                    return
                } else {
                    let forms = new FormData();
                    forms.append('f1',file);
                    //forms.append('from','web');
                    //forms.from='web';
                    console.log(forms.get("f1"), 'opopopopoppopop')
                    api.intelligentBox.createMusics(forms).then(res => {
                        console.log(res, '上传成功')
                        this.$message.success('上传音频成功')
                        this.getAllMusics()
                    }).catch(err => {
                        this.$message.error('上传音频失败，请稍后重试')
                        console.log(err, '上传失败')
                    })
                }
            },
            async getVolumn(){
                /*await api.intelligentBox.getStartVolumn().then(res=>{

                })*/
            },
            async getAllMusics(){
                /*let arr1=[{name:'xiaoming'},{name:'xiaoqiang'}];
                let arr2=arr1.slice(0);
                arr2=arr2.map(item=>{
                    return {
                        name:item.name,
                        age:23
                    }
                });
                console.log(arr1,arr2);*/
                await api.intelligentBox.getAllSongs().then(res=>{
                    // console.log(res,'传回来的所有歌曲1');
                    this.musics=res;
                    this.firstmusics=res;
                    /*this.musics=this.firstmusics.slice(0);  //排除数组地址传递的相互影响
                    this.musics.forEach(item => {
                        let endNum = item.path.lastIndexOf('_')
                        let startNum = item.path.lastIndexOf('/') + 1
                        // console.log(, 'ioioioioi')
                        item.src = item.path
                        item.title = item.path.substring(startNum,endNum)
                        item.checked =false
                        item.pic = ''
                        item.artist = 'drore'
                        /!*if (this.broadList && this.broadList.length > 0) {
                            console.log(this.broadList, 'opopoppopoopopopopop')
                            this.broadList.forEach(item1 => {
                                if (item.id === item1.id) {
                                    item.checked = true
                                }
                                this.checked(item1.id)
                            })
                        }*!/
                    })*/
                })
                //console.log(this.musics,'处理过后的歌曲单子1');
            },
            showtime(){  //显示当前歌曲总时间
                let that=this;
                this.audioObj.ondurationchange= function () {
                    that.playtime='';
                    that.alltime=that.audioObj.duration;
                    if(that.alltime > -1){
                        var hour = Math.floor(that.alltime/3600);
                        var min = Math.floor(that.alltime/60) % 60;
                        console.log(min);
                        var sec = Math.floor(that.alltime % 60);
                        console.log(sec);
                        if(min < 10){that.playtime += "0";}
                        that.playtime += min + ":";
                        if(sec < 10){that.playtime += "0";}
                        that.playtime += sec;
                    };
                }
            },
            changeVolumn(){  //音量控制进度条
                this.audioObj.volume=(this.voicenumber)/100;
                console.log(this.voicenumber,'音量的大小');
            },
            changeProgerss(){
                this.audioObj.currentTime=this.progressnumber/100*(this.audioObj.duration);
            },
            init(){
                this.getAllMusics();
                this.getVolumn();
            },

            handleClose(done) {  //关闭弹框
                this.audioObj.pause();
                this.playurl='../../../static/img/intelligentbox/bo1.png';
                this.$emit('closeDialog');
                //alert(3333);
                if(this.stopId!==''){
                    api.intelligentBox.stopSongName(this.stopId,this.idFlag).then(res=>{
                        console.log('停止单个歌曲完毕');
                    })
                }
            },

        }

    }
</script>
<style lang="scss" type="text/scss">
    .box-edit{
        /*滚动条样式*/
        ::-webkit-scrollbar
        {
            width: rem(8);
            height: rem(8);
            background-color: #aaaaaa;
        }

        /*定义滚动条轨道 内阴影+圆角*/
        ::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 rem(6) rgba(0,0,0,0.3);
            border-radius: rem(8);
            background-color: #F5F5F5;
        }

        /*定义滑块 内阴影+圆角*/
        ::-webkit-scrollbar-thumb
        {
            border-radius: rem(8);
            -webkit-box-shadow: inset 0 0 rem(6) rgba(0,0,0,.3);
            background-color: #aaa;
        }

        width:100%;
        //height:100%;
        .el-dialog{
            margin-top:10vh;
            //height:63%;
            height:80%;
            .el-dialog__body{
                border-top:1px solid #ddd;
                height:77%;
                padding:rem(20) rem(20);
                padding-bottom:rem(0);
                //background-color:#00a1f2;
                .music-edit-content{
                    height:100%;
                    display:flex;
                    flex-direction: column;
                    .video-show{
                        border-top-left-radius:rem(12);
                        border-top-right-radius:rem(12);
                        height:64%;
                        //background-color:#e4353c;
                        display:flex;
                        flex-direction: column;
                        .play-audio{
                            border-top-left-radius:rem(8);
                            border-top-right-radius:rem(8);
                            //height:23%;
                            height:30%;
                            background-color:#efefef;
                            display:flex;
                            justify-content: space-around;
                            align-items: center;
                            .left{
                                border-radius:rem(4);
                                width:48%;
                                height:70%;
                                border:1px solid #ddd;
                                display:flex;
                                align-items: center;
                                .song-icon{
                                    width:30%;
                                    height:100%;
                                    text-align: center;
                                    background:linear-gradient(top,#f2f1f2,#bcbbb9);
                                    img{
                                        margin-top:7%;
                                    }
                                }
                                .song-name{
                                    width:70%;
                                    height:100%;
                                    background-color:#fff;
                                    .title{
                                        margin-top:4%;
                                        margin-left:5%;
                                    }
                                }


                            }
                            .right{
                                width:48%;
                                height:70%;
                                //  border:1px solid #ddd;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                .button{
                                    width:20%;
                                    text-align: center;
                                    line-height:70%;
                                    img{
                                        cursor:pointer;
                                        width:90%;
                                    }
                                }
                                .play-button{
                                    width:30%;
                                }
                                .last-button{
                                    width:30%;
                                }
                            }
                        }
                        .play-bar{
                            height:13%;
                            //background-color:#000;
                            display:flex;
                            justify-content: space-around;
                            align-items: center;
                            .el-slider{
                                width:45%;
                                .el-slider__bar{
                                    background-color:#26bbf0;
                                }
                                .el-slider__button{
                                    width:rem(12);
                                    height:rem(12);
                                    background-color:#26bbf0;
                                    border:none;
                                }
                            }

                            .play-time{width:3%;}
                            .volumn-btn{
                                width:48%;
                                height:80%;
                                //background:#00B83F;
                                display:flex;
                                align-items: center;
                                .voice-number{
                                    width:5%;
                                }
                                .btn{
                                    width:45%;
                                    height:100%;
                                    //background:#0000ff;
                                    display:flex;
                                    align-items: center;
                                    justify-content: space-around;
                                    .image{
                                        width:32%;
                                        display:flex;
                                        align-items: center;
                                        justify-content: center;
                                        .musicsFile{
                                            width:0;
                                            height:0;
                                            display:none;
                                        }
                                        img{
                                            cursor:pointer;
                                        }
                                    }
                                }
                                .sound{
                                    width:40%;
                                    padding:0 rem(8);
                                    height:100%;
                                    display:flex;
                                    align-items:center;
                                    .el-slider{
                                        width:80%;
                                    }
                                    .el-slider__bar{
                                        background-color:#26bbf0;
                                    }
                                    .el-slider__button{
                                        width:rem(12);
                                        height:rem(12);
                                        background-color:#26bbf0;
                                        border:none;
                                    }
                                }
                                .voice-icon{
                                    width:10%;
                                    display: flex;
                                    align-items: center;
                                }
                            }
                        }
                        .play-list{
                            height:64%;
                            background:#efefef;
                            display:flex;
                            flex-direction: column;
                            .header{
                                width:98%;
                                margin:rem(6) auto;
                                height:16%;
                                //background:#0000ff;
                                display:flex;
                                align-items: center;
                                justify-content: space-around;
                                .search{
                                    width:64%;
                                    height:100%;
                                    .el-input-group{
                                        height:100%;
                                        .el-input__inner{
                                            height:100%;
                                            border-radius: rem(0);
                                        }
                                        .el-input-group__append, .el-input-group__prepend{
                                            border-radius: rem(0);
                                        }
                                    }
                                }
                                .allsel{
                                    width:18%;
                                    //background:#00c7ff;
                                    height:100%;
                                    display:flex;
                                    justify-content: center;
                                    align-items: center;
                                }
                                .del{
                                    width:18%;
                                    height:100%;
                                    display:flex;
                                    justify-content: center;
                                    align-items: center;
                                    span{
                                        padding-left:rem(10);
                                    }
                                }
                            }
                            .content{
                                width:98%;
                                height:90%;
                                overflow:auto;
                                margin:rem(0) auto;
                                .all-name{
                                    display:inline-block;
                                    width:rem(192);
                                }
                                .all-time{
                                    //margin-right:-50%;
                                }
                                .el-checkbox{
                                    display:block;
                                    padding:rem(8) rem(0);
                                    border-top:rem(0.5) dashed #ddd;
                                    border-bottom:rem(0.5) dashed #ddd;
                                }
                                .el-checkbox+.el-checkbox{
                                    margin-left:0;
                                }
                            }
                        }
                    }
                    .form-show{
                        height:12%;
                        .form-box{

                            width:98%;
                            height:100%;
                            overflow-y: auto;
                            border:1px solid #eee;
                            margin-top:rem(16);
                            display:flex;
                            flex-direction: row;
                            flex-wrap: wrap;
                            .hasSelect{
                                width:33.33333333%;
                                height:56%;
                                font-size:rem(13);
                                img{
                                    width:rem(20);
                                    vertical-align: bottom;
                                }
                            }

                        }
                    }
                    .text-show{
                        height:13%;
                        width:98%;
                        border:1px solid transparent;
                        margin-top:rem(32);
                        overflow-y: auto;
                    }
                }
            }
            .dialog-footer{
                .el-button{
                    padding:rem(8) rem(20);
                }
            }
        }
    }
</style>
