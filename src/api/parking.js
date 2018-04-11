/*
这是停车场接口api
* */
import axios from '@/http'
import {getUrl} from './path'


const park = {
    getAllPark () {
        return axios ({
            method: 'GET',
            url: getUrl('/parking')
        })

    },
    updatePark  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/parking'),
            data:params
        })
    },
    createPark  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/parking'),
            data:params
        })
    },
    deletePark (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/parking'),
            data:{
                ids: par
            }
        })
    }
}

export default park
