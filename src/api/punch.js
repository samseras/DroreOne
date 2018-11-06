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
    createPunch (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/clockstation'),
            data:params
        })
    },
    updatePunch  (params) {
        return axios ({
            method: 'PUT',
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
    },
    getAllPunchRecord(params){
        return axios ({
            method: 'POST',
            url: getUrl('/clockin'),
            data:params
        })
    },

    removeErrPunch(param){
        return axios ({
            method: 'DELETE',
            url: getUrl('/clocklack'),
            data:param
        })
    }
}

export default punch
