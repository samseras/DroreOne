/*
这是站点接口api
* */
import axios from '@/http'
import {getUrl} from './path'


const station = {
    getAllStation () {
        return axios ({
            method: 'GET',
            url: getUrl('/station')
        })

    },
    updateStation  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/station'),
            data:params
        })
    },
    createStation (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/station'),
            data:params
        })
    },
    deleteStation (par) {
        return axios ({
            method: 'DELETE',
            url: getUrl('/station'),
            data:{
                ids: par
            }
        })
    }
}

export default station
