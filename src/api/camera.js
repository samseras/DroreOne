/*
摄像头模块api
* */
import axios from '@/http'


const camera={
    getAllCamera(){
        return axios({
            method:'GET',
            url:'/droreone/device?deviceType=2'
        })
    },
    updateCamera(params){
        return axios({
            methods:'PUT',
            url:'/droreone/device?deviceType=2',
            params
        })
    },
    createCamera(params){
        return axios({
            methods:'POST',
            url:'/droreone/device?deviceType=2',
            params
        })
    },
    deleteCamera(par){
        console.log(par,'传递的id')
        return axios({
            methods:'DELETE',
            url:'/droreone/device?deviceType=2',
            data:{
                id:par.id
            }
        })
    }

}
export default camera
