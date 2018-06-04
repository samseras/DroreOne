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
}

export default controler

