/*
告警模块api请求
* */
import axios from '@/http'
import {getUrl} from "./path";



const file = {
    getFileType () {
        return axios({
            method: 'get',
            url: getUrl(`/document/type`)
        })
    },
    updataFileType (params) {
        return axios({
            method: 'PUT',
            url: getUrl(`/document/type`),
            data: params
        })
    }

}

export default file
