/*
* 闸机模块API
* */

import axios from '@/http'

const gate={
    getAllGate(){
        return axios({
            methods:'GET',
            url:'/droreone/device?deviceType=3'
        })
    },
    updateGate(params){
        return axios({
            methods:'PUT',
            url:'/droreone/device?deviceType=3',
            params
        })
    },
    createGate(params){
        return axios({
            methods:'POST',
            url:'/droreone/device?deviceType=3',
            params
        })
    },
    deleteGate(par){
        return axios({
            methods:'DELETE',
            url:'/droreone/device?deviceType=3',
            par
        })
    }
}
export default gate
