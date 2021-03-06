/*
* wifi模块api
* */

import axios from '@/http'
import {getUrl} from "./path";

const wifi={
    getWifiType(){
        return axios({
            method:'GET',
            url:'/info/device/model?type=7'
        })
    },


    getAllWifi(){
        return axios({
            method:'GET',
            url: getUrl('/device?deviceType=7')
        })
    },
    getDeviceById(id){
        return axios({
            method:'GET',
            url: getUrl(`/device/${id}`)
        })
    },
    updateWifi(params){
        return axios({
            method:'PUT',
            url: getUrl('/device'),
            data:{
                type:7,
                devices:params
            }
        })
    },
    createWifi(params){
      return axios({
          method:'POST',
          url: getUrl('/device'),
          data:{
              type:7,
              devices:params
          }
      })
    },
    deleteWifi(par){
        console.log(par,'传递的id')
        return axios({
            method:'DELETE',
            url: getUrl('/device'),
            data:{
                type:7,
                ids:par
            }
        })
    }

}

export default wifi

