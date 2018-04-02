/*
* 路灯模块api
* */

import axios from '@/http'

const light={
    getAllLight(){
        return axios({
            methods:'GET',
            url:'/droreone/device?deviceType=5'
        })
    },
    updateLight(params){
        return axios({
            methods:'PUT',
            url:'/droreone/device?deviceType=5',
            params
        })
    },
    createLight(params){
        return axios({
            methods:'POST',
            url:'/droreone/device?deviceType=5',
            params
        })
    },
    deleteLight(par){
        return axios({
            methos:'DELETE',
            url:'/droreone/device?deviceType=5',
            par
        })
    }
}

export default light
