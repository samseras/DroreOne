/*
路网信息api
* */

import axios from '@/http'
import {getUrl} from './path'

const roat = {
    getAllRoat () {
        return axios ({
            method: 'GET',
            url: getUrl('/route')
        })

    },
    updateRoat  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/route'),
            data: params
        })
    },
    createRoat  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/route'),
            data: params
        })
    },
    deleteRoat (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/route'),
            data:{
                ids: par
            }
        })
    },
    getTransportRoat (type) {
        return axios ({
            method: 'GET',
            url: getUrl('/route?type='+type)
        })

    },
    getRouteNameById (id) {
        return axios ({
            method: 'GET',
            url: getUrl('/route?id='+id)
        })
    },
    getRouteById(id){
        return axios ({
            method: 'GET',
            url: getUrl('/route/'+id)
        })
    }

}

export default roat
