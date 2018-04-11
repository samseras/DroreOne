/*
这是商圈接口api
* */
import axios from '@/http'
import {getUrl} from './path'


const shop = {
    getAllShop () {
        return axios ({
            method: 'GET',
            url: getUrl('/business')
        })

    },
    updateShop  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/business'),
            data: params
        })
    },
    createShop  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/business'),
            data: params
        })
    },
    deleteShop (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/business'),
            data:{
                ids: par
            }
        })
    },
    getBusinesstype () {
        return axios({
            methods:'GET',
            url: getUrl('/businesstype')
        })
    }
}

export default shop
