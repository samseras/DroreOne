/*
* 报警柱模块api
* */

import axios from '@/http'
import {getUrl} from "./path";

const police={
    getAllPolice(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=8')
        })
    },
    updatePolice(params){
        return axios({
            method:'PUT',
            url:getUrl('/device?deviceType=8'),
            data:params
        })
    },
    createLight(params){
        return axios({
            method:'POST',
            url:getUrl('/device?deviceType=8'),
            data:params
        })
    },
    deleteLight(par){
        return axios({
            method:'DELETE',
            url:getUrl('/device?deviceType=8'),
            data:{
                type:8,
                ids:par
            }
        })
    }

}

export default police
