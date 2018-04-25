/*
 调度路灯api请求
* */
import axios from '@/http'



const lamppost = {
    getLamppostList () {
        return axios ({
            method: 'GET',
            url: '/schedule/light'
        })
    },
    addLamppost () {
        return axios ({
            method: 'POST',
            url: '/schedule/light'
        })
    },
    deletLamppost(){
        return axios ({
            method: 'DELETE',
            url: '/schedule/light'
        })
    },
    updataLamppost(){
        return axios ({
            method: 'PUT',
            url: '/schedule/light'
        })
    },
    searchLamppost(par){
        return axios ({
            method: 'GET',
            url: '/schedule/light',
            data:{
                ids: par
            }
        })
    }
}

export default lamppost
