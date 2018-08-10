/*
portal页面api
* */

import axios from '@/http'
import {getUrl} from './path'

const portal = {
    getAllportal () {
        return axios ({
            method: 'GET',
            url: './../static/portal(1).json'
        })

    },
}

export default portal
