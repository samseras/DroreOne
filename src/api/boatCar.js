/*
这是车船接口api
* */
import axios from '@/http'
import {getUrl} from './path'



const boat = {
    getAllBoat () {
        return axios ({
            method: 'GET',
            url: getUrl('/vehicle')
        })

    },
    updateBoat  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/vehicle'),
            data: params
        })
    },
    createBoat  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/vehicle'),
            data: params
        })
    },
    deleteBoat  (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/vehicle'),
            data:{
                ids: par
            }
        })
    }
}

export default boat
