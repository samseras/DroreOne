/*
这是打卡点接口api
* */
import axios from '@/http'
import {getUrl} from './path'


const punch = {
    getAllPunch () {
        return axios ({
            method: 'GET',
            url: getUrl('/clockstation')
        })

    },
    updatePunch  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/clockstation'),
            data:params
        })
    },
    createPunch (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/clockstation'),
            data:params
        })
    },
    deletePunch (par) {
        return axios ({
            method: 'DELETE',
            url: getUrl('/clockstation'),
            data:{
                ids: par
            }
        })
    }
}

export default punch
