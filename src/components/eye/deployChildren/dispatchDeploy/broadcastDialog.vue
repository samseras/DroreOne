<template>
    <div class="broadcastDialog">
        <el-dialog
            :visible="visible"
            title="播放编辑"
            :before-close="closeBroadcastDialog"
            width="40%"
            class="dialog broadcast_Dialog"
            center>
            <div class="broadcastContent">
                <div class="broadcastTop">
                    <!--<div class="music">-->
                        <!--<i class="el-icon-service"></i>-->
                        <!--<p>信仰</p>-->
                    <!--</div>-->
                    <a-player ref="aplayer" id="aplayer" class="aplayer-withlist"
                              :show-lrc="true"
                              :music="playMusicList[0]"
                              :mode="mode"
                              @ended="musicEnd"
                              :list="playMusicList"
                              @play="playMusic"
                              autoPlay>
                    </a-player>
                  <!--<div class="aplayer" v-show="playList.length>0">-->
                      <!--<div class="aplayer-button"></div>-->
                  <!--</div>-->
                </div>
                <div class="broadcastBottom">
                    <ul>
                        <li v-for="(item,idx) in songList" :id="item.id" :musicSrc="item.src" :key="item.id">
                            <el-checkbox v-model="item.checked" @change="checked(item,idx)" class="checkBoxBtn"></el-checkbox>
                            <p @click="selectPlayMusic(item)">{{item.title}}</p>
                            <i class="el-icon-close" @click="deleteMuisc(item.id)"></i>
                        </li>
                    </ul>
                </div>
                <!--<el-upload-->
                    <!--class="upload-demo"-->
                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                    <!--multiple-->
                    <!--:limit="3">-->
                <div class="el-upload">
                    <i size="small" type="primary" class="el-icon-message" @click="$refs.uploadMusic.click()"></i>
                    <input type="file" ref="uploadMusic" class="musicFile" @change="selectMusic">
                </div>
                <!--</el-upload>-->
            </div>
            <div class=""slot="footer" class="dialog-footer cardFooter">
                <el-button size="mini" class="hold" @click="saveBroadMusicList">保存</el-button>
                <el-button size="mini" @click = 'closeBroadcastDialog'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
     import VueAplayer from 'vue-aplayer'
     import api from '@/api'
    export default {
        props: ['visible'],
        name: "map-dialog",
        data () {
            return{
                songList:[],//播放列表
                songNameList:[],
                selectNameList:["信仰"],
                flag:false,
                autoPlay:false,
                playMusicList:[
                    {
                        id:3,
                        checked:true,
                        title:"请选择要播放的音乐",
                        artist:"drore",
                        src:"../../../../../static/信仰.mp3",
                        pic:""
                    }
                ],
                playing:false, //是否播放
                mode:"order",
                num:0

            }
        },
        methods: {
            selectMusic (e) {
                console.log(e.target.files[0], 'opopopopopops')
                let file = e.target.files[0]
                if (!file.type.includes('mp3')) {
                    this.$message.error('请上传MP3格式文件，谢谢！');
                    return
                } else {
                    var form = new FormData();
                    form.append('f1',file);
                    console.log(form, 'opopopopoppopop')
                    api.schedulebroadcast.createMusic(form).then(res => {
                        console.log(res, '上传成功')
                    }).catch(err => {
                        this.$message.error('上传失败，请稍后重试')
                        console.log(err, '上传失败')
                    })
                }
            },
            musicEnd () {
                console.log('ende')
            },
            playMusic(){
                this.autoPlay = true;
                  console.log(this.autoPlay)
            },
            checked (item,idx) {
                console.log(this.num)
                if(this.num > 0){
                    this.playMusicList.splice(0,1);
                }
                if(item.checked){
                    if(this.selectNameList.indexOf(item.title) === -1){
                        item.checked = true;
                        this.selectNameList.push(item.title)
                        this.playMusicList.push(item)
                    }
                }else {
                    if(this.selectNameList.indexOf(item.title) !== -1){
                        item.checked = false;
                        let index = this.selectNameList.indexOf(item.title);
                        this.selectNameList.splice(index,1);
                        this.playMusicList.splice(index,1);
                    }
                }
                // console.log(item.checked)
                // console.log(idx)
                 console.log(this.playMusicList)
            },
             init () {
                let that = this;
                 that.songList.forEach(function(item){
                    if(item.checked){
                        if(that.selectNameList.indexOf(item.title) === -1 ){
                            // console.log(that.selectNameList.indexOf(item.title))
                            that.selectNameList.push(item.title)
                            that.playMusicList.push(item);
                        }
                    }
                })
                 that.songList.forEach(function(item){
                    that.songNameList.push(item.title);
                })
                    // //因为是异步请求，所以一开始播放器中是没有歌曲的，所有给了个v-if不然会插件默认会先生成播放器，导致报错(这个很重要)
                    //  //this.flag = true;
                     console.log(that.selectNameList)
                     console.log(that.playMusicList)
                     console.log(that.songNameList)
                },
            selectPlayMusic(item){
                this.num++
                if(this.num === 1){
                    this.playMusicList.unshift(item);
                }else {
                    this.playMusicList.splice(0,1);
                    this.playMusicList.unshift(item);
                }
                //this.playMusicList.unshift(item);
                this.playMusic();
                console.log(this.playMusicList)
                console.log(this.num)
            },
            closeBroadcastDialog () {
                this.$emit('closeBroadcastDialog')
            },
            deleteMuisc(id){
                if (id) {
                    this.choseInfoId = [id]
                }
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.schedulebroadcast.deletMusic([id]).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                           this.songList = this.songList.filter(item => {
                               return item.id !== id
                           })
                        }).catch(err => {
                            this.$message.error('删除失败，请稍后重试')
                            console.log(err)
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
            },
            saveBroadMusicList(){
                let musicList = this.playMusicList;
                this.$emit('saveMusicList',musicList)
                console.log(musicList)
            },
            async getAllMusic () {
                await api.schedulebroadcast.getAllMusic().then(res => {
                    console.log(res, '请求成功')
                    this.songList = res
                    this.songList.forEach(item => {
                        item.src = item.path
                        item.title = item.path.substring(16,25)
                        item.checked =false
                        item.pic = ''
                        item.artist = 'drore'
                    })
                }).catch(err => {
                    console.log(err, '请求失败')
                })
            }
        },
        watch:{

        },
        async created () {
            this.getAllMusic()
        },
        components : {
             'a-player': VueAplayer
        },
         mounted () {
            //异步加载，先加载出player再使用
             this.init();
            // this.init();
            // console.log(this.$refs.aplayer, '这是啥')
            // let aplayer = this.$refs.aplayer;
            // // aplayer.play();
            // console.log(aplayer.musicList, '这是当前的music')
            //  this.playMusicList.push(this.currentMusic);
            // console.log(this.playMusicList)
        }
    }
</script>

<style lang="scss">
    .broadcastDialog{
        position: relative;
        .el-dialog__body {
            padding: rem(3) rem(3) 0 rem(3);
        }
        .ol-overlaycontainer-stopevent{
            /*display: none;*/
            position: absolute;
            top: rem(10);
            left: rem(20);
        }
        .ol-overlaycontainer-stopevent .ol-zoom,.ol-control .ol-zoom-in{
            width: rem(20);
            height: rem(20);
            border-radius: 50%;
            opacity: .8;
            transform: scale(1.5);
        }
        .ol-overlaycontainer-stopevent .ol-zoom,.ol-control .ol-zoom-out{
            width: rem(20);
            height: rem(20);
            border-radius: 50%;
            opacity: .8;
            margin-top: rem(15);
            transform:scale(1.5);
        }
        .ol-rotate{
            display: none;
        }
        .ol-attribution{
            display: none;
        }
        .broadcastContent{
            .aplayer{
                width: 97.5%;
                height: 90%;
                margin-right: rem(5);
                /*padding-right: rem(30);*/
                box-sizing: border-box;
                .aplayer-body{
                    width: 100%;
                    height: rem(75);
                    background: #efefef;
                    box-sizing: border-box;
                    /*padding: rem(10);*/
                    .aplayer-pic{
                        width: rem(80);
                        height: rem(72);
                    }
                    .aplayer-info{
                        width: rem(240);
                        height: rem(72);
                        padding-right: rem(20);
                        .aplayer-music{
                            .aplayer-author{
                                margin-left: rem(15);
                            }
                        }
                        .aplayer-title{
                            display: inline-block;
                            line-height: rem(30);
                        }
                        .aplayer-icon-menu{
                            display: none!important;
                        }
                        .aplayer-lrc{
                            display: none;
                        }
                    }
                }
                .aplayer-list{
                    width: 100%;
                    height: rem(260)!important;
                    border-bottom-right-radius: rem(5);
                    border-bottom-left-radius: rem(5);
                    display: none;
                    ol{
                        width: 97%;
                        height: rem(260)!important;
                        box-sizing: border-box;
                        margin: 4% 1.5% 0;
                        background: #efefef;
                        overflow-y: auto;
                        border-radius: rem(5);
                        li{
                            line-height: rem(35);
                            border-bottom: 1px dashed #b1b1b1 ;
                            margin: 0 rem(15);
                        }
                    }
                }

            }
            .el-upload{
                position: absolute;
                top: rem(80);
                right: rem(40);
                .musicFile{
                    width: 0;
                    height: 0;
                    display: none;
                }
            }
        }
    }
</style>
<style lang="scss" scoped type="text/scss">
    .broadcastDialog {
        width: 100%;
        height: rem(300);
        .broadcast_Dialog{
            width: 100%;
            height: 100%;
            .broadcastContent{
                width: 100%;
                height: rem(400);
                padding: rem(15);
                box-sizing: border-box;
                border-radius: rem(5);
                position: relative;
                .broadcastTop{
                    height: rem(100);
                    background: #efefef;
                    position: relative;
                    box-sizing: border-box;
                    padding: rem(10);
                    position: relative;
                    .music{
                        width: 100%;
                        height: rem(100);
                        box-sizing: border-box;
                        /*display: flex;*/
                        border: 1px solid #e0e0e0;
                        border-radius: rem(5);
                        /*i{*/
                        /*width: 20%;*/
                        /*line-height: rem(60);*/
                        /*font-size: rem(40);*/
                        /*text-align: center;*/
                        /*background: #e0e0e0;*/
                        /*}*/
                        /*p{*/
                        /*width: 80%;*/
                        /*background: #fff;*/
                        /*text-indent: rem(20);*/
                        /*font-size: rem(18);*/
                        /*padding-top: rem(5);*/
                        /*border-bottom-right-radius: rem(5);*/
                        /*border-top-right-radius: rem(5);*/
                        /*}*/
                    }
                    audio{
                        position: absolute;
                        width: 100%;
                        top: rem(90);
                    }

                }
                .broadcastBottom{
                    height: rem(270);
                    border:1px solid #e0e0e0;
                    border-bottom-right-radius: rem(5);
                    border-bottom-left-radius: rem(5);
                    ul{
                        width: 97%;
                        height: 90%;
                        box-sizing: border-box;
                        margin: 4% auto 2%;
                        border-radius: rem(5);
                        background: #efefef;
                        overflow-y: auto;
                        li{
                            margin: 0 rem(15);
                            display: flex;
                            line-height: rem(35);
                            border-bottom: 1px dashed #b1b1b1 ;
                            p{
                                width: 90%;
                                margin-left: rem(10);
                            }
                            i{
                                font-size: rem(14);
                                font-weight: 600;
                                line-height: rem(35);
                            }
                        }
                    }
                }

            }

        }
    }
</style>
