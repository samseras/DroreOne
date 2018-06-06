
/*
* 登录认证模块api
* */

import axios from '@/http'
import {getUrl} from "./path";

const login={
    userLogin(params){
        console.log(params, '这是传过来的')
        return axios({
            method:'GET',
            url: getUrl('/security/login'),
            headers:{
                "Authorization": params,
                "x-ajax": true
            }
        })
    },
    userLogout (params) {
        return axios({
            methods: 'GET',
            url: getUrl('/security/logout'),
            headers:{
                "Authorization": params,
                "x-ajax": true
            }
        })
    },
    getUserRoles (params) {
        return axios({
            methods: 'GET',
            url: getUrl(`/security/user/roles/${params}`)
        })
    }
}

export default login
