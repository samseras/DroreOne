/*
* 监测传感器api
* */

import axios from '@/http'
import {getUrl} from "./path";

const monitor={
    getMonitorType(){
      return axios({
          method:'GET',
          url:'/info/device/model?type=6'
      })
    },
    getAllMonitor(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=6')
        })
    },
    updateMonitor(params){
        return axios({
            method:'PUT',
            url:getUrl('/device'),
            data:{
                type:6,
                devices:params
            }
        })
    },
    createMonitor(params){
        return axios({
            method:'POST',
            url:getUrl('/device'),
            data:{
                type:6,
                devices:params
            }
        })
    },
    deleteMonitor(par){
        console.log(par,'传递的id')
        return axios({
            method:'DELETE',
            url:getUrl('/device'),
            data:{
                type:6,
                ids:par
            }
        })
    }

}

export default monitor


