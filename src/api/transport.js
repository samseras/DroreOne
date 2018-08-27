/*
车船调度模块api请求
* */
import axios from '@/http'
import {getUrl} from "./path";



const transport = {
    getTransport (params) {
        return axios ({
            method: 'GET',
            url: getUrl('/schedule/vehicle'),
            data:params
        })
    },

    updateTransport  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/vehicle'),
            data: params
        })
    },
    createTransport  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/schedule/vehicle'),
            data: params
        })
    },
    deleteTransport  (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/schedule/vehicle'),
            data:{
                ids: par
            }
        })
    },
    isBindScheduleByRoute  (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'GET',
            url: getUrl('/schedule/vehicle?routeId='+par)
        })
    },
    startPlan(id){
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/start'),
            data:{
                ids:id
            }

        })
    },
    stopPlan(id){
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/stop'),
            data:{
                ids:id
            }

        })
    },


}

export default transport

