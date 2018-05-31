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
            url:'/security/login',
            headers:{
                "Authorization":"BASIC " + params
            }
        })
    }
}

export default login
