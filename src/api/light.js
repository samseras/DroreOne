/*
* 路灯模块api
* */

import axios from '@/http'
import {getUrl} from "./path";


const light={
    getAllLight(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=5')
        })
    },
    updateLight(params){
        return axios({
            method:'PUT',
            url:getUrl('/device?deviceType=5'),
            data:params
        })
    },
    createLight(params){
        return axios({
            method:'POST',
            url:getUrl('/device?deviceType=5'),
            data:params
        })
    },
    deleteLight(par){
        return axios({
            method:'DELETE',
            url:getUrl('/device?deviceType=5'),
            data:{
                type:5,
                ids:par
            }
        })
    }
}

export default light
