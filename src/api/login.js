/*
* 登录认证模块api
* */

import axios from '@/http'

const login={
    userLogin(params){
        console.log(params, '这是传过来的')
        return axios({
            method:'GET',
            url:'/security/login',
            headers:{
                "Authorization":"BASIC " + params,
                "x-ajax":true,
                "Cache-Control":"no-cache"
            }
        })
    },
    userLogout () {
        return axios( {
            methods: 'GET',
            url: '/security/logout',
        })
    }
}

export default login
