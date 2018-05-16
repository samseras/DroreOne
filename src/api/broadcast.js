/*
 广播模块api
 * */
import axios from '@/http'
import {getUrl} from "./path";


const broadcast={
    getBroadcastType(){
      return axios({
          method:'GET',
          url:'/info/device/model?type=1'
      })
    },
    // exportAllBroadcast(){
    //     return axios({
    //         method:'GET',
    //         url:'/device/export/file?deviceType=1',
    //     })
    // },
    // exportBroadcast(par){
    //     return axios({
    //         method:'POST',
    //         url:'/device/export/file',
    //         data:{
    //             ids:par
    //         }
    //     })
    // },

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
    },

}
export default broadcast
