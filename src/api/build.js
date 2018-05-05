/*
这是建筑接口api
* */
import axios from '@/http'
import {getUrl} from './path'


const build = {
    getAllBuild () {
        return axios ({
            method: 'GET',
            url: getUrl('/building')
        })

    },
    updateBuild  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/building'),
            data: params
        })
    },
    createBuild  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/building'),
            data: params
        })
    },
    deleteBuild (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/building'),
            data:{
                ids: par
            }
        })
    },
}

export default build
