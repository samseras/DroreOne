/*
* GPS模块
* */
import axios from '@/http'
import {getUrl} from "./path"

const gps ={
    getGpsType(){
        return axios({
            method:'GET',
            url:'/info/device/model?type=9'
        })
    },

    getAllGps(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=9')
        })
    },
    updateGps(params){
        return axios({
            method:'PUT',
            url:getUrl('/device'),
            data:{
                type:9,
                devices:params
            }
        })
    },
    createGps(params){
        return axios({
            method:'POST',
            url:getUrl('/device'),
            data:{
                type:9,
                devices:params
            }
        })
    },
    deleteGps(par){
        console.log(par,'传递的id')
        return axios({
            method:'DELETE',
            url:getUrl('/device'),
            data:{
                type:9,
                ids:par
            }
        })
    }
}

export default gps
