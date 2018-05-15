/*
导出模块api
 */
import axios from '@/http'

const exportFile ={
    exportAll(type){
        return axios({
            method:'GET',
            url:`/device/export/file?deviceType=${type}`
        })
    },
    exportSingle(par){
        console.log(par, '-=-=-=-==-=-=-=-=-=-=-=-')
        return axios({
            method:'POST',
            url:'/device/export/file',
            data:{
                ids:par
            }
        })
    },
}

export default exportFile
