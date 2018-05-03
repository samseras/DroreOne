/*
 调度路灯api请求
* */
import axios from '@/http'
import {getUrl} from "./path";


const lamppost = {
    getLamppostList () {
        return axios ({
            method: 'GET',
            url: getUrl('/schedule/light')
        })
    },
    addLamppost (item) {
        return axios ({
            method: 'POST',
            url: getUrl('/schedule/light'),
            data:item

        })
    },
    deletLamppost(item){
        return axios ({
            method: 'DELETE',
            url: getUrl('/schedule/light'),
            data:{
                ids:item
            }

        })
    },
    updataLamppost(info){
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/light'),
            data:info
        })
    },
    searchLamppost(par){
        return axios ({
            method: 'GET',
            url: getUrl('/schedule/light'),
            data:par
        })
    }
}

export default lamppost
