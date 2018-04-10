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
            data: params
        })
    },
    createPerson  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/person'),
            data: params
        })
    },
    deletePerson (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/person'),
            data:{
                ids: par
            }
        })
    },
    getJob () {
        return axios({
            method: 'GET',
            url: getUrl('/job')
        })
    },
    updataAvatar (params) {
        console.log(params, 'formdata')
        return axios({
            method: 'POST',
            url: '/multipart-upload/haha',
            // headers:{
            //     "Accept-Charset": "utf-8",
            //     'Content-Type':'application/x-www-form-urlencoded',
            // },
            processData : false,
            contentType : false,
            data:params,
        })
    }
}

export default person
