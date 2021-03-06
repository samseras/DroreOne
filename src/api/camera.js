/*
摄像头模块api
* */
import axios from '@/http'
import {getUrl} from "./path";

const camera={
    getCameraType(){
      return axios({
          method:'GET',
          url:'/info/device/model?type=2'
      })
    },


    getAllCamera(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=2')
        })
    },
    updateCamera(params){
        return axios({
            method:'PUT',
            url:getUrl('/device'),
            data: {
                type:2,
                devices:params
            }
        })
    },
    createCamera(params){
        return axios({
            method:'POST',
            url:getUrl('/device'),
            data: {
                type:2,
                devices:params
            }
        })
    },
    deleteCamera(par){
        console.log(par,'传递的id')
        return axios({
            method:'DELETE',
            url:getUrl('/device'),
            data:{
                // type: 2,
                ids: par
            }
        })
    }

}
export default camera
