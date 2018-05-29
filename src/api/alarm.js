/*
告警模块api请求
* */
import axios from '@/http'
import {getUrl} from "./path";



const alarm = {
    createAlarmRule(param){
        console.log(param, 'newdata')
        return axios({
            method: 'POST',
            url: getUrl('/alarm/rule'),
            data:param,
        })
    },
    deleteAlarmRule(params){
        console.log(params, 'ids')
        return axios({
            method: 'DELETE',
            url: getUrl('/alarm/rule'),
            data:{
                ids: params
            }
        })
    },
    updateAlarmRule(param){
        console.log(param, 'newdata')
        return axios({
            method: 'PUT',
            url: getUrl('/alarm/rule'),
            data:param,
        })
    },

    getAllAlarmRule () {
        return axios ({
            method: 'GET',
            url: getUrl('/alarm/rule')
        })
    },

    getAllAlarmRule (id) {
        return axios ({
            method: 'GET',
            url: getUrl('/alarm/rule?id='+id)
        })
    },
    getAlarmType(name){
        return axios ({
            method: 'GET',
            url: getUrl('alarm/type?name='+name)
        })
    },
    getSeverityType(){
        return axios ({
            method: 'GET',
            url: getUrl('alarm/severity')
        })
    },

    getEnvType(){
        return axios ({
            method: 'GET',
            url: getUrl('alarm/environment/type')
        })
    },

    createAlarmEvent(param){
        return axios ({
            method: 'GET',
            url: getUrl('alarm/event'),
            data:param
        })
    },

    updateAlarmEvent(params){
        console.log(params, 'newdata')
        return axios({
            method: 'PUT',
            url: getUrl('/alarm/event'),
            data:params,
        })
    },

    getAllAlarmEvent () {
        return axios ({
            method: 'GET',
            url: getUrl('/alarm/event')
        })
    },

    getAlarmEventStatus(){
        return axios ({
            method: 'GET',
            url: getUrl('alarm/event/status')
        })
    }

}

export default alarm
