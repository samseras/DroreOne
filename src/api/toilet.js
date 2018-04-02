/*
这是洗手间接口api
* */
import axios from '@/http'
import {getUrl} from './path'


const toilet = {
    getAllToilet () {
        return axios ({
            method: 'GET',
            url: getUrl('/toilet')
        })

    },
    updateToilet  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/toilet'),
            params
        })
    },
    createToilet  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/toilet'),
            params
        })
    },
    deleteToilet  (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/toilet'),
            data:{
                id: par
            }
        })
    }
}

export default toilet
