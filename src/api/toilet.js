/*
这是洗手间接口api
* */
import axios from '@/http'



const toilet = {
    getAllToilet () {
        return axios ({
            method: 'GET',
            url: '/droreone/toilet'
        })

    },
    updateToilet  (params) {
        return axios ({
            method: 'PUT',
            url: '/droreone/toilet',
            params
        })
    },
    createToilet  (params) {
        return axios ({
            method: 'POST',
            url: '/droreone/toilet',
            params
        })
    },
    deleteToilet  (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: '/droreone/toilet',
            data:{
                id: par.id
            }
        })
    }
}

export default toilet
