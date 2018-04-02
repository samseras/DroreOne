/*
* LED模块api
* */

import axios from '@/http'
import {getUrl} from "./path";

const led={
    getAllLed(){
        return axios({
            methods:'GET',
            url:getUrl('/device?deviceType=4')
        })
    },
    updateLed(params){
        return axios({
            methods:'PUT',
            url:getUrl('/device?deviceType=4'),
            params
        })
    },
    createLed(params){
        return axios({
            methods:'POST',
            url:getUrl('/device?deviceType=4'),
            params
        })
    },
    deleteLed(par){
        return axios({
            methods:'DELETE',
            url:getUrl('/device?deviceType=4'),
            par
        })
    }

}

export default led




