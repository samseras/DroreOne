/*
摄像头模块api
* */
import axios from '@/http'
import {getUrl} from "./path";


const camera={
    getAllCamera(){
        return axios({
            method:'GET',
            url:getUrl('/device?deviceType=2')
        })
    },
    updateCamera(params){
        return axios({
            methods:'PUT',
            url:getUrl('/device?deviceType=2'),
            params
        })
    },
    createCamera(params){
        return axios({
            methods:'POST',
            url:getUrl('/device?deviceType=2'),
            params
        })
    },
    deleteCamera(par){
        console.log(par,'传递的id')
        return axios({
            methods:'DELETE',
            url:getUrl('/device?deviceType=2'),
            data:{
                id:par.id
            }
        })
    }

}
export default camera
