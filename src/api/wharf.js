/*
这是码头接口api
* */
import axios from '@/http'
import {getUrl} from './path'


const wharf = {
    getAllWharf () {
        return axios ({
            method: 'GET',
            url: getUrl('/wharf')
        })

    },
    updateWharf  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/wharf'),
            data:params
        })
    },
    createWharf  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/wharf'),
            data:params
        })
    },
    deleteWharf (par) {
        return axios ({
            method: 'DELETE',
            url: getUrl('/wharf'),
            data:{
                ids: par
            }
        })
    }
}

export default wharf
