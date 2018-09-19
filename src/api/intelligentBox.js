import axios from '@/http'
import {getUrl} from './path'

const intelligentBox = {
    createMusics(forms){  //上传歌曲
        console.log(forms,'格式');
        return axios({
            method: 'POST',
            url:getUrl('/smartspeaker/upload?from=web'),
            processData : false,
            contentType : false,
            data:forms,
        })
    },
    getAllSongs(){  //获取所有歌曲
        return axios({
            method: 'GET',
            //url: getUrl('/resource')
            url:getUrl('/broadcast/getAllMusicFiles')

        })
    },
    getStartVolumn(){
        /*return axios({
            method: 'GET',
            url: getUrl('/iot/services/broadcast')

        })*/
    },
    postMusicVoice(flag,value){  //传递音量
        console.log(flag,value,'22222');
        return axios ({
            method:'POST',
            url:getUrl('/device/broadcast'),
            data:{
                "deviceId":flag,
                "action":"SETVOLUME",
                "value":value

            }
        })

    },
    startHanhua(flag){  //开始喊话
        return axios ({
            method:'POST',
            url:getUrl('/device/broadcast'),
            data:{
                "deviceId":flag,
                "action":"BRODCAST",
                "value":''

            }
        })
    },
    stopHanhua(flag){  //停止喊话
        return axios ({
            method:'POST',
            url:getUrl('/device/broadcast'),
            data:{
                "deviceId":flag,
                "action":"STOP",
                "value":''

            }
        })
    },
    postTextCast(flag,text){
        return axios ({
            method:'POST',
            url:getUrl('/device/broadcast'),
            data:{
                "deviceId":flag,
                "action":"TTSBRODCAST",
                "value":text

            }
        })
    },
    postSongName(flag,songName){
        let str=songName.toString();
        console.log(str,'666666');
        return axios ({
            method:'POST',
            url:getUrl('/device/broadcast'),
            data:{
                "deviceId":flag,
                "action":"TTSBRODCAST",
                "value":str

            }
        })
    },
    postMusicInfo(form){  //传递编辑的音乐信息
        console.log(form,'音乐form表单里的好东西');
        return axios ({
            method:'POST',
            //url:getUrl('/smartspeaker/play/bgm'),
            url:'/smartspeaker/play/bgm',
            data:{
                /*"id": 123,*/
                "speakers":form.transmsg,
                "albums": {
                    "name": "album",
                    "description": "简单的一首歌",
                    "songs":form.transmusics,
                },
                "startDate":form.date1,
                "endDate": form.date2,
                "startTime":form.time1,
                "endTime":form.time2,
                "playOrder": form.frequency,
                "playtimetype": form.playtype

            }
        })
    },

    getAllBoxInfo(){  //获取所有智能音箱
        return axios ({
            method: 'GET',
            url:getUrl('/smartspeaker/speaker')
            //url:'/speaker'

        })
    },
    goplaystream(params){  //要播放的广播内容
        console.log(params,'要播放的流参数');
        return axios({
            method: 'POST',
            url:getUrl('/smartspeaker/play/stream'),
            data:{
                "speakers": params.speaktemps,
                "audioStream": {
                    "id": "x001",
                    "url": params.name
                },
                "priority":params.level
            }
        })
    }

}
export default intelligentBox
