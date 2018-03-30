/*
这是停车场接口api
* */
import axios from '@/http'



const park = {
    getAllPark () {
        return axios ({
            method: 'GET',
            url: '/droreone/parking'
        })

    },
    updatePark  (params) {
        return axios ({
            method: 'PUT',
            url: '/droreone/parking',
            params
        })
    },
    createPark  (params) {
        return axios ({
            method: 'POST',
            url: '/droreone/parking',
            params
        })
    },
    deletePark (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: '/droreone/parking',
            data:{
                id: par.id
            }
        })
    }
}

export default park
