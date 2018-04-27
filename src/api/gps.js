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
    }
}

export default gps
