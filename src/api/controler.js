/*
* wifi模块api
* */

import axios from '@/http'
import {getUrl} from "./path";

const controler={
    getAllControler(){
        return axios({
            method:'GET',
            url: getUrl('/menuswitch')
        })
    },
    getSearchFacility(params){
        return axios ({
            method: 'POST',
            url: getUrl('/searchfacility'),
            data: params
        })
    },
    getSearchPeople(params){
        return axios ({
            method: 'POST',
            url: getUrl('/searchuser'),
            data: params
        })
    },
}

export default controler

