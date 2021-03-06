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
    deleteJob (par) {
        return axios({
            method: 'DELETE',
            url: getUrl('/job'),
            data:{
                ids: par
            }
        })
    },
    updataJob (params) {
        return axios({
            method: 'PUT',
            url: getUrl('/job'),
            data: params
        })
    },
    createJob (params) {
        return axios({
            method: 'POST',
            url: getUrl('/job'),
            data: params
        })
    },
    updataAva (params) {
        console.log(params, 'formdata')
        return axios({
            method: 'POST',
            url: getUrl('/resource/picture'),
            processData : false,
            contentType : false,
            data:params,
        })
    },
    getJobPerson (params) {
        return axios({
            method: 'GET',
            url: getUrl(`/person/jobid?jobId=${params}`),
        })
    }
}

export default person
