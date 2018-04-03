/*
* wifi模块api
* */

import axios from '@/http'
import {getUrl} from "./path";

const wifi={
    getAllWifi(){
        return axios({
            method:'GET',
            url: getUrl('/device?deviceType=7')
        })
    },
    updateWifi(params){
        return axios({
            method:'PUT',
            url: getUrl('/device?deviceType=7'),
            params
        })
    },
    createWifi(params){
      return axios({
          method:'POST',
          url: getUrl('/device?deviceType=7'),
          params
      })
    },
    deleteWifi(par){
        console.log(par,'传递的id')
        return axios({
            method:'DELETE',
            url: getUrl('/device?deviceType=7'),
            data:{
                id:par.id
            }
        })
    }

}

export default wifi

