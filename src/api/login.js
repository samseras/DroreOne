/*
* 登录认证模块api
* */

import axios from '@/http'
import {getUrl} from "./path";

const login={
    userLogin(params){
        return axios({
            method:'GET',
            url:getUrl('/security/login'),
            data: params
        })
    }
}

export default login
