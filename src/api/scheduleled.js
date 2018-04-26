/*
 调度路灯api请求
* */
import axios from '@/http'



const scheduleled = {
    getscreenList () {
        return axios ({
            method: 'GET',
            url: '/schedule/led'
        })

    },
}

export default scheduleled
