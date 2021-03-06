/*
* 闸机模块API
* */
import axios from '@/http'
import {getUrl} from "./path";

const gate={
    getGateType(){
      return axios({
          method:'GET',
          url:'/info/device/model?type=3'
      })
    },
    getAllGate(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=3')
        })
    },
    updateGate(params){
        return axios({
            method:'PUT',
            url:getUrl('/device'),
            data:{
                type:3,
                devices:params
            }
        })
    },
    createGate(params){
        return axios({
            method:'POST',
            url:getUrl('/device'),
            data:{
                type:3,
                devices:params
            }
        })
    },
    deleteGate(par){
        return axios({
            method:'DELETE',
            url:getUrl('/device'),
            data:{
                type:3,
                ids:par
            }
        })
    }
}
export default gate
