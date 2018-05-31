<template>
    <div class="broadcastDialog">
        <el-dialog
            :visible="visible"
            :close-on-click-modal = false
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
                <div class="broadcastBottom" v-loading="isShowLoading">
                    <ul>
                        <li>
                            <div class="funcHeader">
                                <input type="text" v-model="musicName" placeholder="请输入音频名称" @keyup="searchMusic">
                                <el-checkbox v-model="ischecked" @change="selectAllMusic">全选</el-checkbox>
                                <el-button size="mini"plain  @click="deleteInfo()"><i class="el-icon-delete"></i>删除</el-button>
                            </div>
                        </li>
                        <li v-for="(item,idx) in songList" :id="item.id" :musicSrc="item.src" :key="item.id">
                            <el-checkbox small v-model="item.checked" @change="checked(item.id)" class="checkBoxBtn"></el-checkbox>
                            <p @click="selectPlayMusic(item)">{{item.title}}</p>
                            <i class="el-icon-close" @click="deleteInfo(item.id)"></i>
                        </li>
                    </ul>
                </div>
                <!--<el-upload-->
                    <!--class="upload-demo"-->
                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                    <!--multiple-->
                    <!--:limit="3">-->
                <div class="el-upload">
                    <!--<i size="small" type="primary" class="el-icon-message" ></i>-->
                    <img src="./../../../../../static/img/uploadFile.svg" alt="" @click="$refs.uploadMusic.click()">
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
        props: ['visible','broadList'],
        name: "map-dialog",
        data () {
            return{
                songList:[],//播放列表
                songNameList:[],
                choseInfoId:[],
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
                num:0,
                isShowLoading: false,
                musicName: '',
                ischecked: false,
                checkList : []
            }
        },
        methods: {
            searchMusic () {
                if (this.musicName.trim() === '') {
                    this.songList = this.checkList
                } else {
                    this.songList = this.checkList.filter(item => {
                        if (item.title.includes(this.musicName)) {
                            return item
                        }
                    })
                }
            },
            selectAllMusic () {
                console.log(this.ischecked, 'opoppopopo')
                if (this.ischecked) {
                    this.choseInfoId = this.songList.map(item => {
                        item.checked = true
                        return item.id
                    })
                } else {
                    this.choseInfoId = []
                    this.songList.forEach(item => {
                        item.checked = false
                    })
                }
            },
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
                    this.isShowLoading = true
                    api.schedulebroadcast.createMusic(form).then(res => {
                        this.isShowLoading = false
                        console.log(res, '上传成功')
                        this.$message.success('上传音频成功')
                        this.getAllMusic()
                    }).catch(err => {
                        this.$message.error('上传音频失败，请稍后重试')
                        this.isShowLoading = false
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
            checked (id) {
                this.songList = this.songList.filter(item => {
                    if (item.id === id) {
                        item.checked = item.checked
                    }
                    return item
                })
                if (this.choseInfoId.includes(id)) {
                    this.choseInfoId = this.choseInfoId.filter((item) =>{
                        return item !== id
                    })
                } else {
                    this.choseInfoId.push(id)
                }
                if (this.choseInfoId.length > 0 && this.choseInfoId.length === this.songList.length) {
                    this.ischecked = true
                } else {
                    this.ischecked = false
                }
               console.log(this.choseInfoId, 'lskdjcasdfckasdfcahsdfhasdlfakjhsdljkfh')

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
            deleteInfo(id){
                if (id) {
                    this.choseInfoId = [id]
                }
                console.log(this.choseInfoId, 'asdxasxasxa')
                debugger
                if (this.choseInfoId.length > 0) {
                    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        api.schedulebroadcast.deletMusic(this.choseInfoId).then(res => {
                            console.log(res, '删除成功')
                            this.$message.success('删除成功')
                            this.choseInfoId = []
                            this.getAllMusic()
                        }).catch(err => {
                            this.$message.error('删除失败，请稍后重试')
                            console.log(err)
                            this.choseInfoId = []
                        })
                    }).catch(() => {
                        this.$message.info('取消删除')
                    })
                } else {
                    this.$message.error('请选择删除的音频数据')
                }
            },
            saveBroadMusicList(){
                let musicList
                for (let i = 0; i < this.choseInfoId.length; i++) {
                    musicList = this.songList.filter((item, index) => {
                        if (item.id === this.choseInfoId[i]){
                            this.songList[index].status = true
                        }
                        return item.status === true
                    })
                }
                this.$emit('saveMusicList',musicList)
                console.log(musicList)
            },
            async getAllMusic () {
                this.isShowLoading = true
                await api.schedulebroadcast.getAllMusic().then(res => {
                    this.isShowLoading = false
                    console.log(res, '请求成功')
                    this.songList = res
                    this.songList.forEach(item => {
                        let endNum = item.path.lastIndexOf('_')
                        let startNum = item.path.lastIndexOf('/') + 1
                        // console.log(, 'ioioioioi')
                        item.src = item.path
                        item.title = item.path.substring(startNum,endNum)
                        item.checked =false
                        item.pic = ''
                        item.artist = 'drore'
                        if (this.broadList && this.broadList.length > 0) {
                            console.log(this.broadList, 'opopoppopoopopopopop')
                            this.broadList.forEach(item1 => {
                                if (item.id === item1.id) {
                                    item.checked = true
                                }
                                this.checked(item1.id)
                            })
                        }

                    })
                    this.checkList = this.songList
                }).catch(err => {
                    this.isShowLoading = false
                    console.log(err, '请求失败')
                })
            }
        },
        watch:{

        },
        async created () {
            this.getAllMusic()
            console.log(this.choseInfoId, 'jkasdhcdscs')
        },
        components : {
             'a-player': VueAplayer
        },
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
                img{
                    display: inline-block;
                    width:  rem(17);
                    vertical-align: middle;
                    margin-top: rem(3);
                }
                .musicFile{
                    width: 0;
                    height: 0;
                    display: none;
                }
            }
        }
        .funcHeader{
            width: 100%;
            input{
                display: inline-block;
                width: 70%;
                margin-right: rem(40);
                height: rem(28);
                font-size: rem(12);
                border-radius: rem(3);
                padding: rem(3) rem(5);
                box-sizing: border-box;
                border: 1px solid #3a8ee6;
            }
            .el-button{
                background: transparent;
                border: none;
                .el-icon-delete{
                    margin-right: rem(5);
                }
            }
            .el-checkbox__label{
                padding-left: rem(3);
                font-size: rem(13);
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
                        margin: 2% auto 2%;
                        border-radius: rem(5);
                        background: #efefef;
                        overflow-y: auto;
                        li{
                            margin: 0 rem(15);
                            display: flex;
                            line-height: rem(35);
                            border-bottom: 1px dashed #b1b1b1 ;
                            cursor: pointer;
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
