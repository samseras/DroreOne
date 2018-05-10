/*
 gis地图api请求
* */
import axios from '@/http'
import {getUrl} from "./path";



const gisMap = {
    getAllMapData () {
        return axios ({
            method: 'GET',
            url: getUrl('/gis/map')
        })

    },
    createdMapData (item) {
        return axios ({
            method: 'POST',
            url: getUrl('/schedule/broadcast'),
            data:item

        })
    },
    deleteMapData(item){
        return axios ({
            method: 'DELETE',
            url: getUrl('/schedule/broadcast'),
            data:{
                ids:item
            }

        })
    },
    updateMapData(info){
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/broadcast'),
            data:info
        })
    },
    createLabel (params) {
        console.log(params, 'formdata')
        return axios({
            method: 'POST',
            url: getUrl('/resource/music'),
            processData : false,
            contentType : false,
            data:params,
        })
    },
    getAllLabel () {
        return axios ({
            method: 'GET',
            url: getUrl('/resource?type=2')
        })
    },
    deleteLabel (params) {
        return axios ({
            method: 'DELETE',
            url: getUrl('/resource'),
            data:{
                ids:params
            }

        })
    },
    updateLabel(info){
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/broadcast'),
            data:info
        })
    },
}

export default gisMap
