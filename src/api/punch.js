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
            data:JSON.stringify(param)
        })
    }
}

export default punch
