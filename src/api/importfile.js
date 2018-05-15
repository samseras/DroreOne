/*
导入模块api
* */
import axios from '@/http'

const importfile={
    importFileData(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:'/device/import/file?type='+params.type,
            processData : false,
            contentType : false,
            data:params.fileParam
        })
    }
}
export default importfile
