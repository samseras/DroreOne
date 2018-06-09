/*
告警模块api请求
* */
import axios from '@/http'
import {getUrl} from "./path";



const alarm = {
    createAlarmRule(param){
        console.log(JSON.stringify(param), 'newdata')
        return axios({
            method: 'POST',
            url: getUrl('/alarm/rule'),
            data:JSON.stringify(param),
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
            data:JSON.stringify(param),
        })
    },

    getAlarmRuleById (id) {
        return axios ({
            method: 'GET',
            url: getUrl('/alarm/rule?id='+id)
        })
    },

    exportAlarmRules(typeId){
        return axios ({
            method: 'GET',
            url: getUrl('/alarm/rule/export?alarmTypeId='+typeId)
        })
    },
    exportSelectedAlarmRules(ids,typeId){
        return axios ({
            method: 'PUT',
            url: getUrl('/alarm/rule/export?alarmTypeId='+typeId),
            data:JSON.stringify(ids)
        })
    },
    getAlarmRulesByParameters(id) {
        return axios ({
            method: 'GET',
            url: getUrl('/alarm/rule?alarmTypeId='+id)
        })
    },
    getAllAlarmTypes(){
        return axios ({
            method: 'GET',
            url: getUrl('/alarm/type')
        })
    },
    getSeverityType(){
        return axios ({
            method: 'GET',
            url: getUrl('/alarm/severity')
        })
    },

    getEnvType(){
        return axios ({
            method: 'GET',
            url: getUrl('/alarm/environment/type')
        })
    },

    createAlarmEvent(param){
        return axios ({
            method: 'GET',
            url: getUrl('/alarm/event'),
            data:JSON.stringify(param)
        })
    },

    deleteAlarmEvent(params){
        console.log(params, 'ids')
        return axios({
            method: 'DELETE',
            url: getUrl('/alarm/event'),
            data:{
                ids: params
            }
        })
    },
    updateAlarmEvent(params){
        console.log(params, 'newdata')
        return axios({
            method: 'PUT',
            url: getUrl('/alarm/event'),
            data:JSON.stringify(params),
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
            url: getUrl('/alarm/status')
        })
    },

    uploadAttachments(params){
        console.log(params, 'formdata')
        return axios ({
            method: 'POST',
            url: getUrl('/resource/other'),
            processData : false,
            contentType : false,
            data:params
        })
    },
    deleteUploadAttachments(param){
        return axios ({
            method: 'DELETE',
            url: getUrl('/resource'),
            data:JSON.stringify(param)
        })
    }




}

export default alarm
