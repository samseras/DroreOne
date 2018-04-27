/*
* 设备型号信息
* */

import axios from '@/http'

const types ={
    getAllmodelType (id){
        return axios({
            method:'GET',
            url:`/info/device/model?type=${id}`
        })
    }

}

export default types
