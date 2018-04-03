/*
* 监测传感器api
* */

import axios from '@/http'
import {getUrl} from "./path";

const monitor={
    getAllMonitor(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=6')
        })
    },
    updateMonitor(params){
        return axios({
            method:'PUT',
            url:getUrl('/device?deviceType=6'),
            params
        })
    },
    createMonitors(params){
        return axios({
            method:'POST',
            url:getUrl('/device?deviceType=6'),
            params
        })
    },
    deleteMonitors(par){
        console.log(par,'传递的id')
        return axios({
            method:'DELETE',
            url:getUrl('/device?deviceType=6'),
            data:{
                id:par.id
            }
        })
    }

}

export default monitor


