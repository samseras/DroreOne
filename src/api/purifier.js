/*
这是保洁接口api
* */
import axios from '@/http'
import {getUrl} from "./path";

const purifier = {
     getAllPurifier(){
         return axios ({
             method: 'GET',
             url: getUrl('/schedule/clean')
         })
     },
    updatePurifier  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/clean'),
            data: params
        })
    },
    createPurifier  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/schedule/clean'),
            data: params
        })
    },
    deletePurifier  (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/schedule/clean'),
            data:{
                ids: par
            }
        })
    },
    checkLookPurifier(par){
        console.log(par, '这是传递的id')
        return axios ({
            method: 'GET',
            url: getUrl('/schedule/clean'),
            data:{
                ids: par
            }
        })
    }
}
export default purifier
