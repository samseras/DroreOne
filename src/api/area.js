/*
这是片区接口api
* */
import axios from '@/http'
import {getUrl} from "./path";


const area = {
    getAllRegion () {
        return axios ({
            method: 'GET',
            url: getUrl('/region')
        })

    },
    updateRegion  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/region'),
            params
        })
    },
    createRegion  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/region'),
            params
        })
    },
    deleteRegion  (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/region'),
            data:{
                id: par
            }
        })
    }
}

export default area
