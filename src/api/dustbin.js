/*
这是垃圾桶接口api
* */
import axios from '@/http'
import {getUrl} from './path'



const dustbin = {
    getAllDustbin () {
        return axios ({
            method: 'GET',
            url: getUrl('/dustbin')
        })

    },
    updateDustbin  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/dustbin'),
            data: params
        })
    },
    createDustbin  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/dustbin'),
            data: params
        })
    },
    deleteDustbin  (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/dustbin'),
            data:{
                ids: par
            }
        })
    }
}

export default dustbin
