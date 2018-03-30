/*
这是指示牌接口api
* */
import axios from '@/http'



const indicator = {
    getAllIndicator () {
        return axios ({
            method: 'GET',
            url: '/droreone/signboard'
        })

    },
    updateIndicator  (params) {
        return axios ({
            method: 'PUT',
            url: '/droreone/signboard',
            params
        })
    },
    createIndicator  (params) {
        return axios ({
            method: 'POST',
            url: '/droreone/signboard',
            params
        })
    },
    deleteIndicator (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: '/droreone/signboard',
            data:{
                id: par.id
            }
        })
    }
}

export default indicator
