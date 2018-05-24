/*
告警模块api请求
* */
import axios from '@/http'
import {getUrl} from "./path";



const alarm = {
    createFile (params) {
        console.log(params, 'formdata')
        return axios({
            method: 'POST',
            url: getUrl('/resource/music'),
            processData : false,
            contentType : false,
            data:params,
        })
    },
    getAllFile () {
        return axios ({
            method: 'GET',
            url: getUrl('/resource?type=2')
        })
    },
    deletFile (params) {
        return axios ({
            method: 'DELETE',
            url: getUrl('/resource'),
            data:{
                ids:params
            }

        })
    },
    getScenarioMapData (id) {
        return axios ({
            method: 'GET',
            url: `/analysis/service/v1/scenario/${id}/result4dashboard`
        })
    },

}

export default alarm
