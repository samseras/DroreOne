/*
portal页面api
* */

import axios from '@/http'
import {getUrl} from './path'

const portal = {
    getAllportal () {
        return axios ({
            method: 'GET',
            url: getUrl('/config/portal')
        })

    },
}

export default portal
