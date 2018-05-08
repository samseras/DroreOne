/*
基础路网信息api
* */

import axios from '@/http'
import {getUrl} from './path'

const deployRoad = {
    getAllRoute () {
        return axios ({
            method: 'GET',
            url: getUrl('/roadnetwork')
        })

    },
    updateRoute  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/roadnetwork'),
            data: params
        })
    },
    createRoute  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/roadnetwork'),
            data: params
        })
    },
    deleteRoute (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/roadnetwork'),
            data:{
                ids: par
            }
        })
    },
}

export default deployRoad
