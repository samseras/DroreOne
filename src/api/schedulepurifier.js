/*
 调度保洁api请求
* */
import axios from '@/http'
import {getUrl} from "./path";


const purifier = {
    getPurifierList () {
        return axios ({
            method: 'GET',
            url: getUrl('/schedule/clean')
        })
    },
    createdPurifier (item) {
        return axios ({
            method: 'POST',
            url: getUrl('/schedule/clean'),
            data:item

        })
    },
    deletPurifier(item){
        return axios ({
            method: 'DELETE',
            url: getUrl('/schedule/clean'),
            data:{
                ids:item
            }

        })
    },
    updataPurifier(info){
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/clean'),
            data:info
        })
    },
    stareEndPlan (id) {
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/clean/isenabled'),
            data:{
                ids:id
            }

        })
    }
}

export default purifier
