/*
这是一些公共的api
* */
import axios from '@/http'
import {getUrl} from "./path";

const publi = {
    getSearch (prams){
        return axios({
            method:'GET',
            url: getUrl('/search?key='+ prams)
        })
    },

}

export default publi
