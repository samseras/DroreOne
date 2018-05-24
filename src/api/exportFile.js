/*
导出模块api
 */
import axios from '@/http'
import {getUrl} from './path'


const exportFile ={
    exportAll(type){
        return axios({
            method:'GET',
            url:getUrl(`/device/export/file?deviceType=${type}`)
        })
    },
    exportSingle(par){
        console.log(par, '-=-=-=-==-=-=-=-=-=-=-=-')
        return axios({
            method:'POST',
            url:getUrl('/device/export/file'),
            data:{
                ids:par
            }
        })
    },
    exportAllBasic(type){
        return axios({
            method:'GET',
            url:getUrl(`/${type}/export`)
        })
    },
    exportSingleBasic(params,type){
        return axios({
            method:'POST',
            url:getUrl(`/${type}/export`),
            data:{
                ids:params
            }
        })
    },
    // 人员导出
    exportAllPerson(par){
        return axios({
            method:'GET',
            url:getUrl(`/person/export?type=${par}`)
        })
    },
    exportSinglePerson(params){
        return axios({
            method:'POST',
            url:getUrl('/person/export'),
            data:{
                ids:params
            }
        })
    }


}

export default exportFile
