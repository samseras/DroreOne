/*
 广播模块api
 * */
import axios from '@/http'
import {getUrl} from "./path";


const broadcast={
    getAllBroadcast(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=1')
        })
    },

    updateBroadcast(params){
        return axios({
            method:'PUT',
            url:getUrl('/device'),
            data:{
                type:1,
                devices:params
            }
        })
    },
    createBroadcast(params){
        return axios({
            method:'POST',
            url:getUrl('/device'),
            data:{
                type:1,
                devices:params
            }
        })
    },
    deleteBroadcast(par){
        return axios({
            method:'DELETE',
            url:getUrl('/device'),
            data:{
                type:1,
                ids:par
            }
        })
    }

}
export default broadcast
