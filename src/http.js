// import httpConfig from '@/constant/http-config'
import axios from 'axios'
// import store from './store'
// axios.defaults.timeout = httpConfig.TIMEOUT


// 此处为axios配置请求头，
axios.interceptors.request.use(
    config => {
        // 此处做请求拦截，如果有需要
        config.headers = {}
        return config
    },
    err => {
        console.log(err)
        return Promise.reject(err)
    }
)
//响应拦截器即异常处理
axios.interceptors.response.use(
    response => {
        if (response.status === 200 && response.request.status === 200) {//成功判断
            // console.log(response, 'opoppopopopop')
            // if (response.data) {
                return response.data
            // } else {
            //     return response
            // }

        }
        return response
    },
    error => {//失败判断
        if (error.response.data.code === 401 || error.request.status === 201) {
            store.dispatch('logout').then(() => location.reload())
        }
        return Promise.reject(error)
    }
)


export default axios
