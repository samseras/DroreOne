/*
这是商圈接口api
* */
import axios from '@/http'



const shop = {
    getAllShop () {
        return axios ({
            method: 'GET',
            url: '/droreone/shop'
        })

    },
    updateShop  (params) {
        return axios ({
            method: 'PUT',
            url: '/droreone/shop',
            params
        })
    },
    createShop  (params) {
        return axios ({
            method: 'POST',
            url: '/droreone/shop',
            params
        })
    },
    deleteShop (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: '/droreone/shop',
            data:{
                id: par.id
            }
        })
    }
}

export default shop
