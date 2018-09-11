/*这个是公共模块api
* */
import axios from '@/http'
import {getUrl} from './path'


const lib = {
    updateJobType  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/job'),
            data:params
        })
    },
    updateFacilityType  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/facility/types'),
            data:params
        })
    },
    getAllFacilityType  () {
        return axios ({
            method: 'GET',
            url: getUrl('/facility/types'),
        })
    },
    updateDeviceType  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/device/types'),
            data:params
        })
    },
    getAllDeviceType  () {
        return axios ({
            method: 'GET',
            url: getUrl('/device/types'),
        })
    },
    updatauserInfo  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/uc/currentuser'),
            data:params
        })
    },
    getUserInfo  () {
        return axios ({
            method: 'GET',
            url: getUrl(`/uc/currentuser`),
        })
    },

}

export default lib
