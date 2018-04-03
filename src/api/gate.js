/*
* 闸机模块API
* */

import axios from '@/http'
import {getUrl} from "./path";

const gate={
    getAllGate(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=3')
        })
    },
    updateGate(params){
        return axios({
            method:'PUT',
            url:getUrl('/device?deviceType=3'),
            params
        })
    },
    createGate(params){
        return axios({
            method:'POST',
            url:getUrl('/device?deviceType=3'),
            params
        })
    },
    deleteGate(par){
        return axios({
            method:'DELETE',
            url:getUrl('/device?deviceType=3'),
            par
        })
    }
}
export default gate
