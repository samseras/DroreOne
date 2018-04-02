/*
* wifi模块api
* */

import axios from '@/http'

const wifi={
    getAllWifi(){
        return axios({
            methods:'GET',
            url:'/droreone/device?deviceType=7'
        })
    },
    updateWifi(params){
        return axios({
            methods:'PUT',
            url:'/droreone/device?deviceType=7',
            params
        })
    },
    createWifi(params){
      return axios({
          methods:'POST',
          url:'/droreone/device?deviceType=7',
          params
      })
    },
    deleteWifi(par){
        console.log(par,'传递的id')
        return axios({
            methods:'DELETE',
            url:'/droreone/device?deviceType=7',
            data:{
                id:par.id
            }
        })
    }

}

export default wifi

