/*
 调度路灯api请求
* */
import axios from '@/http'



const schedulebroadcast = {
    getbroadcastList () {
        return axios ({
            method: 'GET',
            url: '/schedule/broadcast'
        })

    },
}

export default schedulebroadcast
