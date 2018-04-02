/*
 广播模块api
 * */

import axios from '@/http'


const broadcast={
    getAllBroadcast(){
        return axios({
            methods:'GET',
            url:'/droreone/device?deviceType=1'
        })
    },

    updateBroadcast(params){
        return axios({
            methods:'PUT',
            url:'/droreone/device?deviceType=1',
            params
        })
    },
    createBroadcast(params){
        return axios({
            methods:'POST',
            url:'/droreone/device?deviceType=1',
            params
        })
    },
    deleteBroadcast(par){
        return axios({
            methods:'DELETE',
            url:'/droreone/device?deviceType=1',
            data:{
                id:par.id()
            }
        })
    }

}
export default broadcast
