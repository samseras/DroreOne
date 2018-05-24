/*
 调度LEDapi请求
* */
import axios from '@/http'
import {getUrl} from "./path";



const scheduleled = {
    getAllScerrnLed () {
        return axios ({
            method: 'GET',
            url: getUrl('/schedule/led')
        })
    },
    createdScreenLed (item) {
        return axios ({
            method: 'POST',
            url: getUrl('/schedule/led'),
            data:item

        })
    },
    deleteScreenLed(item){
        return axios ({
            method: 'DELETE',
            url: getUrl('/schedule/led'),
            data:{
                ids:item
            }

        })
    },
    updataScreenLed(info){
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/led'),
            data:info
        })
    },

    getAllContent () {
        return axios ({
            method: 'GET',
            url: getUrl('/ledcontent')
        })
    },
    createdContent (item) {
        return axios ({
            method: 'POST',
            url: getUrl('/ledcontent'),
            data:item

        })
    },
    deleteContent(item){
        return axios ({
            method: 'DELETE',
            url: getUrl('/ledcontent'),
            data:{
                ids:item
            }

        })
    },
    stareEndPlan (id) {
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/led/isenabled'),
            data:{
                ids:id
            }

        })
    }
}

export default scheduleled
