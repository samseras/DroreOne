/*
 调度广播api请求
* */
import axios from '@/http'
import {getUrl} from "./path";



const schedulebroadcast = {
    getAllBroadcast () {
        return axios ({
            method: 'GET',
            url: getUrl('/schedule/broadcast')
        })

    },
    createdBroadcast (item) {
        return axios ({
            method: 'POST',
            url: getUrl('/schedule/broadcast'),
            data:item

        })
    },
    deleteBroadcast(item){
        return axios ({
            method: 'DELETE',
            url: getUrl('/schedule/broadcast'),
            data:{
                ids:item
            }

        })
    },
    updataBroadcast(info){
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/broadcast'),
            data:info
        })
    },
    createMusic (params) {
        console.log(params, 'formdata')
        return axios({
            method: 'POST',
            url: getUrl('/resource/music'),
            processData : false,
            contentType : false,
            data:params,
        })
    },
    getAllMusic () {
        return axios ({
            method: 'GET',
            url: getUrl('/resource?type=2')
        })
    },
    deletMusic (params) {
        return axios ({
            method: 'DELETE',
            url: getUrl('/resource'),
            data:{
                ids:params
            }

        })
    },
}

export default schedulebroadcast
