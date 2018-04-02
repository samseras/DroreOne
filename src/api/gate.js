/*
* 闸机模块API
* */

import axios from '@/http'
import {getUrl} from "./path";

const gate={
    getAllGate(){
        return axios({
            methods:'GET',
            url:getUrl('/device?deviceType=3')
        })
    },
    updateGate(params){
        return axios({
            methods:'PUT',
            url:getUrl('/device?deviceType=3'),
            params
        })
    },
    createGate(params){
        return axios({
            methods:'POST',
            url:getUrl('/device?deviceType=3'),
            params
        })
    },
    deleteGate(par){
        return axios({
            methods:'DELETE',
            url:getUrl('/device?deviceType=3'),
            par
        })
    }
}
export default gate
