/*
这是植物接口api
* */
import axios from '@/http'
import {getUrl} from './path'


const plant = {
    getAllPlant () {
        return axios ({
            method: 'GET',
            url: getUrl('/plant')
        })

    },
    updatePlant  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/plant'),
            data: params
        })
    },
    createPlant  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/plant'),
            data: params
        })
    },
    deletePlant (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/plant'),
            data:{
                ids: par
            }
        })
    },
}

export default plant
