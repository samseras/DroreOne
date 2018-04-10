/*
景点配置模块api
* */
import axios from '@/http'
import {getUrl} from './path'



const scenic = {
    getAllScenic () {
        return axios ({
            method: 'GET',
            url: getUrl('/scenicspot')
        })

    },
    updateScenic (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/scenicspot '),
            data:params
        })
    },
    createScenic (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/scenicspot'),
            data:params
        })
    },
    deleteScenic (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/scenicspot'),
            data:{
                ids: par
            }
        })
    }
}

export default scenic
