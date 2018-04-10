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
            url:getUrl('/device'),
            data:{
                type:5,
                devices:params
            }
        })
    },
    createLight(params){
        return axios({
            method:'POST',
            url:getUrl('/device'),
            data:{
                type:5,
                devices:params
            }
        })
    },
    deleteLight(par){
        return axios({
            method:'DELETE',
            url:getUrl('/device'),
            data:{
                type:5,
                ids:par
            }
        })
    }
}

export default light
