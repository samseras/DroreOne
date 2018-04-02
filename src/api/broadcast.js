/*
 广播模块api
 * */

import axios from '@/http'
import {getUrl} from "./path";


const broadcast={
    getAllBroadcast(){
        return axios({
            methods:'GET',
            url:getUrl('/device?deviceType=1')
        })
    },

    updateBroadcast(params){
        return axios({
            methods:'PUT',
            url:getUrl('/device?deviceType=1'),
            params
        })
    },
    createBroadcast(params){
        return axios({
            methods:'POST',
            url:getUrl('/device?deviceType=1'),
            params
        })
    },
    deleteBroadcast(par){
        return axios({
            methods:'DELETE',
            url:getUrl('/device?deviceType=1'),
            data:{
                id:par.id()
            }
        })
    }

}
export default broadcast
