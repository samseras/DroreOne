/*
导入模块api
* */
import axios from '@/http'
import {getUrl} from "./path";

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
    },

    importShop(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/business/import'),
            processData : false,
            contentType : false,
            data:params
        })
    },

    importDustbin(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/dustbin/import'),
            processData : false,
            contentType : false,
            data:params
        })
    },

    importPark(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/parking/import'),
            processData : false,
            contentType : false,
            data:params
        })
    },

    importPerson(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/person/import'),
            processData : false,
            contentType : false,
            data:params
        })
    },

    importIndicator(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/signboard/import'),
            processData : false,
            contentType : false,
            data:params
        })
    },

    importScenic(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/scenicspot/import'),
            processData : false,
            contentType : false,
            data:params
        })
    },
    importToilet(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/toliet/import'),
            processData : false,
            contentType : false,
            data:params
        })
    },
    importScenic(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/scenicspot/import'),
            processData : false,
            contentType : false,
            data:params
        })
    },
    importBoat(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/vehicle/import'),
            processData : false,
            contentType : false,
            data:params
        })
    },
    importConstruction(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/building/import'),
            processData : false,
            contentType : false,
            data:params
        })
    },
    importPlant(params){
        console.log(params, 'formdata')
        return axios({
            method:'POST',
            url:getUrl('/plant/import'),
            processData : false,
            contentType : false,
            data:params
        })
    }
}
export default importfile
