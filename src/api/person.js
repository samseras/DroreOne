/*
这是人员接口api
* */
import axios from '@/http'
import {getUrl} from './path'


const person = {
    getAllPerson () {
        return axios ({
            method: 'GET',
            url: getUrl('/person')
        })

    },
    updatePerson  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/person'),
            params
        })
    },
    createPerson  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/person'),
            params
        })
    },
    deletePerson (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/person'),
            data:{
                id: par
            }
        })
    },
    getJob () {
        return axios({
            method: 'GET',
            url: getUrl('/job')
        })
    }
}

export default person
