/*
* 路灯模块api
* */

import axios from '@/http'
import {getUrl} from "./path";


const light={
    getAllLight(){
        return axios({
            methods:'GET',
            url:getUrl('/device?deviceType=5')
        })
    },
    updateLight(params){
        return axios({
            methods:'PUT',
            url:getUrl('/device?deviceType=5'),
            params
        })
    },
    createLight(params){
        return axios({
            methods:'POST',
            url:getUrl('/device?deviceType=5'),
            params
        })
    },
    deleteLight(par){
        return axios({
            methos:'DELETE',
            url:getUrl('/device?deviceType=5'),
            par
        })
    }
}

export default light
