/*
* 报警柱模块api
* */

import axios from '@/http'
import {getUrl} from "./path";

const police={
    getPoliceType(){
      return axios({
          method:'GET',
          url:'/info/device/model?type=8'
      })
    },
    getAllPolice(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=8')
        })
    },
    updatePolice(params){
        return axios({
            method:'PUT',
            url:getUrl('/device'),
            data:{
                type:8,
                devices:params
            }
        })
    },
    createPolice(params){
        return axios({
            method:'POST',
            url:getUrl('/device'),
            data:{
                type:8,
                devices:params
            }
        })
    },
    deletePolice(par){
        return axios({
            method:'DELETE',
            url:getUrl('/device'),
            data:{
                type:8,
                ids:par
            }
        })
    }

}

export default police
