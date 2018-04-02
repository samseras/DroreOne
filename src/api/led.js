/*
* LED模块api
* */

import axios from '@/http'

const led={
    getAllLed(){
        return axios({
            methods:'GET',
            url:'/droreone/device?deviceType=4'
        })
    },
    updateLed(params){
        return axios({
            methods:'PUT',
            url:'/droreone/device?deviceType=4',
            params
        })
    },
    createLed(params){
        return axios({
            methods:'POST',
            url:'/droreone/device?deviceType=4',
            params
        })
    },
    deleteLed(par){
        return axios({
            methods:'DELETE',
            url:'/droreone/device?deviceType=4',
            par
        })
    }

}

export default led




